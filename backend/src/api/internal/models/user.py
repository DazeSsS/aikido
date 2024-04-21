from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    TRAINER = 'trainer'
    STUDENT = 'student'
    ROLE_CHOICES = [
        (TRAINER, 'Тренер'),
        (STUDENT, 'Ученик'),
    ]

    MALE = 'male'
    FEMALE = 'female'
    GENDER_CHOICES = [
        (MALE, 'Мужской'),
        (FEMALE, 'Женский'),
    ]

    role = models.CharField(max_length=7, choices=ROLE_CHOICES)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default=MALE)
    middle_name = models.CharField(max_length=150, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    rang = models.IntegerField(null=True, blank=True)
