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
