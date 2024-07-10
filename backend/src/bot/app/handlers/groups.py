from asgiref.sync import sync_to_async
from django.conf import settings

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, CallbackQuery, ReplyKeyboardRemove

from bot.app.states import NewGroup, AddToGroup
from bot.app.handlers.practices import get_groups

import bot.app.keyboards as kb

from bot.models import TelegramUser
from api.models import User, PracticeGroup, Place


groups_router = Router()


def get_places():
    places_list = list(Place.objects.all().values('id', 'description'))

    if len(places_list) == 0:
        return None

    places = {}
    for place in places_list:
        places[place.get('description')] = place.get('id')

    return places


@groups_router.callback_query(F.data == 'new_group')
async def groups(callback: CallbackQuery, state: FSMContext):
    await callback.answer('')

    await state.set_state(NewGroup.title)
    await callback.message.answer('<b>Введите название группы:</b>')


@groups_router.message(NewGroup.title)
async def save_title(message: Message, state: FSMContext):
    await state.update_data(title=message.text)

    places = await sync_to_async(get_places)()
    await state.update_data(places=places)

    if places is None:
        await state.clear()
        await message.answer('У вас нет ни одного места проведения')
        await message.answer('Что вы хотите сделать?', reply_markup=kb.main)
        return

    await state.set_state(NewGroup.place)
    await message.answer('<b>Выберите место проведения:</b>', reply_markup=await kb.create_reply_keyboard(places.keys()))


@groups_router.message(NewGroup.place)
async def save_group(message: Message, state: FSMContext):
    data = await state.get_data()
    places = data.get('places')
    trainer_tg = await sync_to_async(TelegramUser.objects.select_related('account').get)(chat_id=message.chat.id)

    trainer = trainer_tg.account
    title = data.get('title')
    place_id = places.get(message.text)

    await sync_to_async(PracticeGroup.objects.create)(
        trainer=trainer,
        title=title,
        place_id=place_id
    )

    await state.clear()
    await message.answer('<b>Группа успешно создана ✅</b>', reply_markup=ReplyKeyboardRemove())
    await message.answer('Что вы хотите сделать?', reply_markup=kb.main)


@groups_router.callback_query(F.data == 'add_to_group')
async def add_to_group(callback: CallbackQuery, state: FSMContext):
    await callback.answer('')

    groups = await sync_to_async(get_groups)(callback.message.chat.id)
    await state.update_data(groups=groups)

    if groups is None:
        await state.clear()
        await callback.message.answer('У вас нет ни одной группы')
        await message.answer('Что вы хотите сделать?', reply_markup=kb.main)
        return

    await state.set_state(AddToGroup.group)
    await callback.message.answer('<b>Выберите группу:</b>', reply_markup=await kb.create_reply_keyboard(groups.keys()))


@groups_router.message(AddToGroup.group)
async def save_group(message: Message, state: FSMContext):
    groups = (await state.get_data()).get('groups')
    group_id = groups.get(message.text)

    if group_id is None:
        await message.answer(
            '<b>Такой группы не существует.</b>\n'
            'Попробуйте еще раз:',
            reply_markup=await kb.create_reply_keyboard(groups.keys())
        )
        return

    await state.update_data(group_id=group_id)
    await state.set_state(AddToGroup.student)
    await message.answer('<b>Введите email ученика:</b>', reply_markup=ReplyKeyboardRemove())


@groups_router.message(AddToGroup.student)
async def save_student(message: Message, state: FSMContext):
    student_email = message.text
    student = await sync_to_async(User.objects.filter(email=student_email).first)()

    if student is None:
        await message.answer(
            '<b>Такого пользователя не существует.</b>\n'
            'Введите email ученика:'
        )
        return

    data = await state.get_data()
    group_id = data.get('group_id')

    group = await sync_to_async(PracticeGroup.objects.get)(id=group_id)
    await sync_to_async(group.students.add)(student)

    await state.clear()
    await message.answer('<b>Ученик добавлен в группу ✅</b>')
    await message.answer('Что вы хотите сделать?', reply_markup=kb.main)
