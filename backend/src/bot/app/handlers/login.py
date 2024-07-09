from asgiref.sync import sync_to_async
from django.contrib.auth import authenticate

from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from bot.app.states import Login

import bot.app.keyboards as kb

from api.models import User
from bot.models import TelegramUser


login_router = Router()


@login_router.message(CommandStart())
async def start(message: Message, state: FSMContext):
    user = await sync_to_async(TelegramUser.objects.filter(chat_id=message.from_user.id).first)()

    if user is not None:
        await message.answer('Что вы хотите сделать?', reply_markup=kb.main)
        return

    await state.set_state(Login.email)
    await message.answer('Введите свой email:')


@login_router.message(Login.email)
async def email(message: Message, state: FSMContext):
    email = message.text
    user = await sync_to_async(User.objects.filter(email=email, role=User.TRAINER).first)()

    if user is None:
        await message.answer(
            '<b>Такого пользователя не существует.</b>\n'
            'Попробуйте еще раз:'
        )
    else:
        await state.update_data(email=email)
        await state.set_state(Login.password)
        await message.answer('Введите пароль:')


@login_router.message(Login.password)
async def password(message: Message, state: FSMContext):
    email = (await state.get_data()).get('email')
    password = message.text
    user = await sync_to_async(authenticate)(email=email, password=password)

    if user is None:
        await message.answer(
            '<b>Неправильный пароль.</b>\n'
            'Попробуйте еще раз:'
        )
    else:
        telegram_user = await sync_to_async(TelegramUser.objects.create)(
            chat_id=message.from_user.id,
            account=user
        )
        await message.answer('Что вы хотите сделать?', reply_markup=kb.main)
        await state.clear()
