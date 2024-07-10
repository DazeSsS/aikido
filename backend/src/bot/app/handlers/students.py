from datetime import date, time, datetime
from asgiref.sync import sync_to_async
from django.conf import settings
from django.core.mail import send_mail
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import Message, CallbackQuery, ReplyKeyboardRemove

from bot.app.states import NewStudent

import bot.app.keyboards as kb

from api.models import User, Parent


students_router = Router()


@students_router.callback_query(F.data == 'new_student')
async def students(callback: CallbackQuery, state: FSMContext):
    await callback.answer('')

    await state.set_state(NewStudent.first_name)
    await callback.message.answer('<b>Имя:</b>')


@students_router.message(NewStudent.first_name)
async def save_first_name(message: Message, state: FSMContext):
    await state.update_data(first_name=message.text)

    await state.set_state(NewStudent.last_name)
    await message.answer('<b>Фамилия:</b>')


@students_router.message(NewStudent.last_name)
async def save_last_name(message: Message, state: FSMContext):
    await state.update_data(last_name=message.text)

    await state.set_state(NewStudent.middle_name)
    await message.answer('<b>Отчество:</b>')


@students_router.message(NewStudent.middle_name)
async def save_middle_name(message: Message, state: FSMContext):
    await state.update_data(middle_name=message.text)

    await state.set_state(NewStudent.email)
    await message.answer('<b>Email:</b>')


@students_router.message(NewStudent.email)
async def save_email(message: Message, state: FSMContext):
    try:
        validate_email(message.text)
        await state.update_data(email=message.text)
    except ValidationError:
        await message.answer('<b>Неправильный формат почты 🤕</b>')
        await message.answer('<b>Email:</b>')
        return

    await state.set_state(NewStudent.date_of_birth)
    await message.answer(
        '<b>Дата рождения</b>\n'
        '<i>ГГГГ-ММ-ДД</i>'
    )


@students_router.message(NewStudent.date_of_birth)
async def save_date_of_birth(message: Message, state: FSMContext):
    try:
        date.fromisoformat(message.text)
        await state.update_data(date_of_birth=message.text)
    except ValueError:
        await message.answer('<b>Неправильный формат даты 🤕</b>')
        await message.answer(
            '<b>Дата рождения</b>\n'
            '<i>ГГГГ-ММ-ДД</i>'
        )
        return

    await state.set_state(NewStudent.gender)
    await message.answer('<b>Пол</b>', reply_markup=kb.gender)


@students_router.message(NewStudent.gender)
async def save_gender(message: Message, state: FSMContext):
    gender = 'male' if message.text.lower() == 'мужской' else 'female'
    await state.update_data(gender=gender)

    await state.set_state(NewStudent.parent_first_name)
    await message.answer('<b>Имя родителя:</b>', reply_markup=ReplyKeyboardRemove())


@students_router.message(NewStudent.parent_first_name)
async def save_parent_first_name(message: Message, state: FSMContext):
    await state.update_data(parent_first_name=message.text)

    await state.set_state(NewStudent.parent_last_name)
    await message.answer('<b>Фамилия родителя:</b>')


@students_router.message(NewStudent.parent_last_name)
async def save_parent_last_name(message: Message, state: FSMContext):
    await state.update_data(parent_last_name=message.text)

    await state.set_state(NewStudent.parent_middle_name)
    await message.answer('<b>Отчество родителя:</b>')


@students_router.message(NewStudent.parent_middle_name)
async def save_parent_middle_name(message: Message, state: FSMContext):
    await state.update_data(parent_middle_name=message.text)

    await state.set_state(NewStudent.parent_contact)
    await message.answer('<b>Контакт родителя:</b>')


@students_router.message(NewStudent.parent_contact)
async def save_parent_contact(message: Message, state: FSMContext):
    data = await state.get_data()

    role = User.STUDENT
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    middle_name = data.get('middle_name')
    email = data.get('email')
    date_of_birth = data.get('date_of_birth')
    gender = data.get('gender')
    random_password = User.objects.make_random_password(8)
    
    user = await sync_to_async(User.objects.create_user)(
        role=role,
        first_name=first_name,
        last_name=last_name,
        middle_name=middle_name,
        email=email,
        password=random_password,
        date_of_birth=date_of_birth,
        gender=gender
    )

    parent_first_name = data.get('parent_first_name')
    parent_last_name = data.get('parent_last_name')
    parent_middle_name = data.get('parent_middle_name')
    parent_contact = message.text

    parent = await sync_to_async(Parent.objects.create)(
        first_name=parent_first_name,
        last_name=parent_last_name,
        middle_name=parent_middle_name,
        contact=parent_contact
    )
    await sync_to_async(parent.childs.add)(user)

    send_mail(
        subject="Регистрация на AikiDojo",
        message=(
            'Поздравляем, ваш аккаунт был успешно зарегистрирован на AikiDojo!\n\n'
            'Данные для входа:\n'
            f'логин: {email}\n'
            f'пароль: {random_password}\n\n'
            'Если вы случайно получили это сообщение - не пугайтесь, мы просто группа студентов, '
            'которая разрабатывает веб-сервис, и мы могли случайно указать ваш email при тестировании🙂'
        ),
        html_message=(
            '<b>Поздравляем, ваш аккаунт был успешно зарегистрирован на AikiDojo!</b><br><br>'
            'Данные для входа:<br>'
            f'<i>логин:</i> {email}<br>'
            f'<i>пароль:</i> {random_password}<br><br>'
            'Если вы случайно получили это сообщение - не пугайтесь, мы просто группа студентов, '
            'которая разрабатывает веб-сервис, и мы могли случайно указать ваш email при тестировании🙂'
        ),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email, settings.EMAIL_HOST_USER]
    )

    await state.clear()
    await message.answer('Ученик создан ✅')
    await message.answer('Что вы хотите сделать?', reply_markup=kb.main)