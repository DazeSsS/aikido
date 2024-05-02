import os
from datetime import date, datetime, timedelta

from django.core.management.base import BaseCommand
from api.models import Check, Parent, PaymentAccount, Place, Practice, PracticeGroup, User


class Command(BaseCommand):
    help = "Populates database with mock data"

    def handle(self, *args, **options):

        # Admin

        admin = User.objects.create_superuser(
            os.getenv('ADMIN_EMAIL'),
            os.getenv('ADMIN_PASSWORD')
        )

        # Trainers

        trainer_1 = User.objects.create_user(
            email="trainer1@gmail.com",
            password="trainer",
            role="trainer",
            gender="male",
            last_name="Ramsey",
            first_name="Ethan",
            middle_name="Francis",
            date_of_birth=date(1985, 6, 17),
        )


        # Students

        student_1 = User.objects.create_user(
            email="student1@gmail.com",
            password="student",
            role="student",
            gender="male",
            last_name="Reese",
            first_name="Harriet",
            middle_name="Darrell",
            date_of_birth=date(2010, 2, 11),
            rang=4
        )
        student_2 = User.objects.create_user(
            email="student2@gmail.com",
            password="student",
            role="student",
            gender="female",
            last_name="Lane",
            first_name="Alta",
            middle_name="Hattie",
            date_of_birth=date(2012, 8, 27),
            rang=1
        )
        student_3 = User.objects.create_user(
            email="student3@gmail.com",
            password="student",
            role="student",
            gender="female",
            last_name="Bowers",
            first_name="Susie",
            middle_name="Lloyd",
            date_of_birth=date(2014, 3, 5),
            rang=3
        )
        student_4 = User.objects.create_user(
            email="student4@gmail.com",
            password="student",
            role="student",
            gender="female",
            last_name="Malone",
            first_name="Mable",
            middle_name="Virgie",
            date_of_birth=date(2011, 11, 10),
            rang=6
        )
        student_5 = User.objects.create_user(
            email="student5@gmail.com",
            password="student",
            role="student",
            gender="female",
            last_name="Schneider",
            first_name="Lola",
            middle_name="Viola",
            date_of_birth=date(2010, 4, 29),
            rang=3
        )
        student_6 = User.objects.create_user(
            email="student6@gmail.com",
            password="student",
            role="student",
            gender="male",
            last_name="Knight",
            first_name="Eddie",
            middle_name="Eunice",
            date_of_birth=date(2009, 1, 7),
            rang=3
        )
        student_7 = User.objects.create_user(
            email="student7@gmail.com",
            password="student",
            role="student",
            gender="male",
            last_name="Torres",
            first_name="Duane",
            middle_name="Lettie",
            date_of_birth=date(2013, 9, 13),
            rang=5
        )
        student_8 = User.objects.create_user(
            email="student8@gmail.com",
            password="student",
            role="student",
            gender="male",
            last_name="Fitzgerald",
            first_name="Ethel",
            middle_name="Ada",
            date_of_birth=date(2012, 5, 21),
            rang=1
        )
        student_9 = User.objects.create_user(
            email="student9@gmail.com",
            password="student",
            role="student",
            gender="female",
            last_name="Wagner",
            first_name="Claudia",
            middle_name="Mathilda",
            date_of_birth=date(2011, 12, 8),
            rang=6
        )
        student_10 = User.objects.create_user(
            email="student10@gmail.com",
            password="student",
            role="student",
            gender="female",
            last_name="Leonard",
            first_name="Elizabeth",
            middle_name="Lewis",
            date_of_birth=date(2013, 2, 23),
            rang=2
        )


        # Parents

        parent_1 = Parent.objects.create(
            first_name="Micheal",
            last_name="Bush",
            middle_name="Violet",
            contact="+11111111111",
        )
        parent_2 = Parent.objects.create(
            first_name="Caleb",
            last_name="Robbins",
            middle_name="Erik",
            contact="+22222222222",
        )
        parent_3 = Parent.objects.create(
            first_name="Alexander",
            last_name="Lyons",
            middle_name="Roxie",
            contact="+33333333333",
        )
        parent_4 = Parent.objects.create(
            first_name="Jesse",
            last_name="Waters",
            middle_name="Derek",
            contact="+44444444444",
        )
        parent_5 = Parent.objects.create(
            first_name="Madge",
            last_name="Benson",
            middle_name="Noah",
            contact="+55555555555",
        )
        parent_6 = Parent.objects.create(
            first_name="Randy",
            last_name="Schultz",
            middle_name="Devin",
            contact="+66666666666",
        )
        parent_7 = Parent.objects.create(
            first_name="Tony",
            last_name="Flowers",
            middle_name="Mark",
            contact="+77777777777",
        )
        parent_8 = Parent.objects.create(
            first_name="Jean",
            last_name="Campbell",
            middle_name="Craig",
            contact="+88888888888",
        )
        parent_9 = Parent.objects.create(
            first_name="James",
            last_name="McGee",
            middle_name="Carrie",
            contact="+99999999999",
        )
        parent_10 = Parent.objects.create(
            first_name="Mathilda",
            last_name="Knight",
            middle_name="Carrie",
            contact="+00000000000",
        )

        parent_1.childs.add(student_1)
        parent_2.childs.add(student_2)
        parent_3.childs.add(student_3)
        parent_4.childs.add(student_4)
        parent_5.childs.add(student_5)
        parent_6.childs.add(student_6)
        parent_7.childs.add(student_7)
        parent_8.childs.add(student_8)
        parent_9.childs.add(student_9)
        parent_10.childs.add(student_10)


        # Payment accounts

        account_1 = PaymentAccount.objects.create(user=student_1)
        account_2 = PaymentAccount.objects.create(user=student_2)
        account_3 = PaymentAccount.objects.create(user=student_3)
        account_4 = PaymentAccount.objects.create(user=student_4)
        account_5 = PaymentAccount.objects.create(user=student_5)
        account_6 = PaymentAccount.objects.create(user=student_6)
        account_7 = PaymentAccount.objects.create(user=student_7)
        account_8 = PaymentAccount.objects.create(user=student_8)
        account_9 = PaymentAccount.objects.create(user=student_9)
        account_10 = PaymentAccount.objects.create(user=student_10)


        # Places

        place_1 = Place.objects.create(
            address="ул. Писятдва, дом 52",
            description="берешь заходишь туда сюда, делаешь бэкфлип, смотришь под подушку, и там будет проход",
        )
        place_2 = Place.objects.create(
            address="ул. Какая-то, дом 15",
            description="как же тяжело придумывать рандомную информацию",
        )
        place_3 = Place.objects.create(
            address="ул. Такая-то, дом 74",
            description="я устал",
        )


        # Groups

        group_1 = PracticeGroup.objects.create(
            title="1 группа",
            trainer=trainer_1,
            place=place_1,
        )
        group_2 = PracticeGroup.objects.create(
            title="2 группа",
            trainer=trainer_1,
            place=place_2,
        )
        group_3 = PracticeGroup.objects.create(
            title="3 группа",
            trainer=trainer_1,
            place=place_3,
        )

        group_1.students.add(student_1, student_2, student_3)
        group_2.students.add(student_4, student_5, student_6, student_7)
        group_3.students.add(student_8, student_9, student_10)


        # Practices

        practice_1 = Practice.objects.create(
            price=300,
            group=group_1,
            place=group_1.place,
            date=datetime.now() + timedelta(days=2)
        )
        practice_2 = Practice.objects.create(
            price=300,
            group=group_2,
            place=group_2.place,
            date=datetime.now() + timedelta(days=3)
        )
        practice_3 = Practice.objects.create(
            price=300,
            group=group_3,
            place=group_3.place,
            date=datetime.now() + timedelta(days=4)
        )
        practice_4 = Practice.objects.create(
            price=300,
            group=group_1,
            place=group_1.place,
            date=datetime.now() - timedelta(days=2)
        )

        practice_4.attended.add(student_1, student_2, student_3)
        practice_4.trial.add(student_3)
