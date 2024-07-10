from typing import List, Dict
from aiogram.utils.keyboard import InlineKeyboardBuilder, ReplyKeyboardBuilder
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    ReplyKeyboardMarkup,
    KeyboardButton
)

from api.models import Check


main = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text='Запланировать тренировку 💪', callback_data='new_practice')],
        [InlineKeyboardButton(text='Добавить нового ученика 👤', callback_data='new_student')],
        [InlineKeyboardButton(text='Добавить ученика в группу 👋🏻', callback_data='add_to_group')],
        [InlineKeyboardButton(text='Создать группу 👥', callback_data='new_group')],
        [InlineKeyboardButton(text='Посмотреть новые чеки 📄', callback_data='checks')],
    ]
)

validate = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text='Принять ✅', callback_data='accept')],
        [InlineKeyboardButton(text='Отклонить ❌', callback_data='decline')],
    ]
)

gender = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text='Мужской')],
        [KeyboardButton(text='Женский')],
    ],
    resize_keyboard=True
)

async def inline_checks(new_checks: List[Dict]):
    keyboard = InlineKeyboardBuilder()
    for check in new_checks:
        keyboard.add(
            InlineKeyboardButton(text=check.date.strftime('%Y.%m.%d'), callback_data=f'check_{check.id}')
        )
    return keyboard.adjust(1).as_markup()


async def create_reply_keyboard(buttons: List[str]):
    keyboard = ReplyKeyboardBuilder()
    for button in buttons:
        keyboard.add(
            KeyboardButton(text=button)
        )
    return keyboard.adjust(1).as_markup(resize_keyboard=True)
