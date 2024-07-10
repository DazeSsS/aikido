from django.conf import settings

from aiogram import Bot, Dispatcher
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties

from bot.app.handlers.main import main_router
from bot.app.handlers.login import login_router
from bot.app.handlers.checks import checks_router
from bot.app.handlers.practices import practices_router
from bot.app.handlers.students import students_router


bot = Bot(
    token=settings.TELEGRAM_TOKEN,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML)
)
dp = Dispatcher()


async def main():
    dp.include_router(main_router)
    dp.include_router(login_router)
    dp.include_router(checks_router)
    dp.include_router(practices_router)
    dp.include_router(students_router)
    await dp.start_polling(bot)
