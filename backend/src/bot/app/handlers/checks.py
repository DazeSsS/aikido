from asgiref.sync import sync_to_async
from django.conf import settings

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, CallbackQuery

from bot.app.states import Checks

import bot.app.keyboards as kb

from api.models import Check
from bot.models import TelegramUser

checks_router = Router()


def get_new_checks(chat_id):
    user = TelegramUser.objects.select_related('account').get(chat_id=chat_id)
    new_checks = user.account.get_incoming_checks(limit=5)
    new_checks = list(new_checks)
    return new_checks


@checks_router.callback_query(F.data == 'checks')
async def checks(callback: CallbackQuery, state: FSMContext):
    await callback.answer('')

    new_checks = await sync_to_async(get_new_checks)(callback.message.chat.id)

    if len(new_checks) == 0:
        await callback.message.answer('Новых чеков нет')
        await callback.message.answer('Что вы хотите сделать?', reply_markup=kb.main)
        return
    
    await state.set_state(Checks.choice)
    await callback.message.edit_text('Выберите чек для проверки', reply_markup=await kb.inline_checks(new_checks))


@checks_router.message(Checks.choice)
@checks_router.callback_query(F.data[:6] == 'check_')
async def checks(callback: CallbackQuery, state: FSMContext):
    await callback.answer('')

    check_id = int(callback.data[6:])
    check = await sync_to_async(Check.objects.select_related('account__user').get)(id=check_id)
    await state.update_data(check=check)

    await state.set_state(Checks.validation)
    await callback.message.answer_document(
        document=settings.SITE_URL + check.file.url,
        caption=(
            f'<b>Чек от {check.date.strftime("%Y.%m.%d")}</b>\n'
            f'<b>Сумма:</b> <i>{check.amount}</i>\n'
            f'<b>Отправитель:</b> <i>{check.account.user.get_full_name()}</i>'
        ),
        reply_markup=kb.validate
    )


@checks_router.message(Checks.validation)
@checks_router.callback_query(F.data == 'accept')
async def validate(callback: CallbackQuery, state: FSMContext):
    await callback.answer('')

    check = (await state.get_data()).get('check')
    await sync_to_async(check.set_confirmed)()

    new_checks = await sync_to_async(get_new_checks)(callback.message.chat.id)

    if len(new_checks) == 0:
        await callback.message.answer('Новых чеков нет')
        await callback.message.answer('Что вы хотите сделать?', reply_markup=kb.main)
        return
    
    await state.set_state(Checks.choice)
    await callback.message.answer('Выберите чек для проверки', reply_markup=await kb.inline_checks(new_checks))
