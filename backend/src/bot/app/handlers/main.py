from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message

import bot.app.keyboards as kb


main_router = Router()


@main_router.message(Command('menu'))
async def menu(message: Message):
    await message.answer('Что вы хотите сделать?', reply_markup=kb.main)
