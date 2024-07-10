from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, CallbackQuery, ReplyKeyboardRemove

import bot.app.keyboards as kb


main_router = Router()


@main_router.message(Command('menu'))
async def menu(message: Message, state: FSMContext):
    await state.clear()
    await message.answer('Что вы хотите сделать?', reply_markup=kb.main)


@main_router.message(Command('cancel'))
async def cancel(message: Message, state: FSMContext):
    await state.clear()
    await message.answer('Действие отменено', reply_markup=ReplyKeyboardRemove())
