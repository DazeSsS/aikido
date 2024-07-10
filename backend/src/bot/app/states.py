from aiogram.fsm.state import State, StatesGroup


class Login(StatesGroup):
    email = State()
    password = State()


class Checks(StatesGroup):
    choice = State()
    validation = State()


class NewPractice(StatesGroup):
    group = State()
    date = State()
    time = State()
    duration = State()


class NewStudent(StatesGroup):
    first_name = State()
    last_name = State()
    middle_name = State()
    email = State()
    date_of_birth = State()
    gender = State()
    parent_first_name = State()
    parent_last_name = State()
    parent_middle_name = State()
    parent_contact = State()


class NewGroup(StatesGroup):
    title = State()
    place = State()


class AddToGroup(StatesGroup):
    group = State()
    student = State()
