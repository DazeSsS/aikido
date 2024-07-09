from datetime import date, time, datetime
from asgiref.sync import sync_to_async
from django.conf import settings

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, CallbackQuery, ReplyKeyboardRemove

from bot.app.states import NewPractice

import bot.app.keyboards as kb

from bot.models import TelegramUser
from api.models import Practice


practices_router = Router()


def get_groups(chat_id):
    user = TelegramUser.objects.select_related('account').get(chat_id=chat_id).account
    groups_list = list(user.practice_groups.all().values('id', 'title'))

    if len(groups_list) == 0:
        return None

    groups = {}
    for group in groups_list:
        groups[group.get('title')] = group.get('id')

    return groups


@practices_router.callback_query(F.data == 'practices')
async def checks(callback: CallbackQuery, state: FSMContext):
    await callback.answer('')

    groups = await sync_to_async(get_groups)(callback.message.chat.id)
    await state.update_data(groups=groups)

    if groups is None:
        await callback.message.answer('У вас нет ни одной группы')
        return

    await state.set_state(NewPractice.group)
    await callback.message.answer('<b>Выберите группу:</b>', reply_markup=await kb.create_reply_keyboard(groups.keys()))


@practices_router.message(NewPractice.group)
async def save_group(message: Message, state: FSMContext):
    groups = (await state.get_data()).get('groups')
    group_name = message.text
    group_id = groups.get(group_name)

    if group_id is None:
        await message.answer(
            '<b>Такой группы не существует.</b>\n'
            'Попробуйте еще раз:',
            reply_markup=await kb.create_reply_keyboard(groups.keys())
        )
        return
    
    await state.update_data(group_id=group_id)
    await state.set_state(NewPractice.date)
    await message.answer(
        '<b>Введите дату тренировки</b>\n'
        '<i>ГГГГ-ММ-ДД</i>',
        reply_markup=ReplyKeyboardRemove()
    )


@practices_router.message(NewPractice.date)
async def save_date(message: Message, state: FSMContext):
    try:
        date.fromisoformat(message.text)
        await state.update_data(date=message.text)
    except ValueError:
        await message.answer('<b>Неправильный формат даты 🤕</b>')
        await message.answer(
            '<b>Введите дату тренировки</b>\n'
            '<i>ГГГГ-ММ-ДД</i>'
        )
        return

    await state.set_state(NewPractice.time)
    await message.answer(
        '<b>Введите время начала тренировки:</b>\n'
        '<i>ММ:СС</i>'
    )


@practices_router.message(NewPractice.time)
async def save_time(message: Message, state: FSMContext):
    try:
        time.fromisoformat(message.text)
        await state.update_data(time=message.text)
    except ValueError:
        await message.answer('<b>Неправильный формат времени 🤕</b>')
        await message.answer(
            '<b>Введите время начала тренировки:</b>\n'
            '<i>ММ:СС</i>'
        )
        return

    await state.set_state(NewPractice.duration)
    await message.answer('<b>Введите продолжительность тренировки в минутах</b>')

import logging

@practices_router.message(NewPractice.duration)
async def save_time(message: Message, state: FSMContext):
    is_number = message.text.isdecimal()
    if not is_number:
        await message.answer('<b>Введите продолжительность тренировки в минутах</b>')
        return

    data = await state.get_data()

    price = settings.PRACTICE_BASE_PRICE
    group_id = data.get('group_id')
    date = f'{data.get("date")}T{data.get("time")}'
    duration = int(message.text)

    try:
        await sync_to_async(Practice.objects.create)(
            price=price,
            group_id=group_id,
            date=datetime.fromisoformat(date),
            duration=duration
        )
    except Exception:
        await message.answer('<b>Ошибка при создании тренировки 🤕</b>')

    await state.clear()
    await message.answer('<b>Тренировка успешно создана ✅</b>')
    await message.answer('Что вы хотите сделать?', reply_markup=kb.main)
