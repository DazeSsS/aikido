from typing import List, Dict
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder

from api.models import Check


main = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text='Посмотреть новые чеки 📄', callback_data='checks')],
    ]
)

validate = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text='Принять ✅', callback_data='accept')],
    ]
)

async def inline_checks(new_checks: List[Dict]):
    keyboard = InlineKeyboardBuilder()
    for check in new_checks:
        keyboard.add(
            InlineKeyboardButton(text=check.date.strftime('%Y.%m.%d'), callback_data=f'check_{check.id}')
        )
    return keyboard.as_markup()
