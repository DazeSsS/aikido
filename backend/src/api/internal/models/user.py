from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


def photo_upload_path(instance, filename):
    return 'users/{0}/{1}'.format(instance.email, filename)


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    TRAINER = 'trainer'
    STUDENT = 'student'
    ROLE_CHOICES = [
        (TRAINER, 'Тренер'),
        (STUDENT, 'Ученик'),
    ]

    MALE = 'male'
    FEMALE = 'female'
    UNKNOWN = 'unknown'
    GENDER_CHOICES = [
        (MALE, 'Мужской'),
        (FEMALE, 'Женский'),
        (UNKNOWN, 'Не указан'),
    ]

    username = None
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=7, choices=ROLE_CHOICES)
    gender = models.CharField(max_length=7, choices=GENDER_CHOICES, default=UNKNOWN)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(blank=True)
    rang = models.IntegerField(null=True, blank=True)
    photo = models.ImageField(upload_to=photo_upload_path, default='default/profile.png')

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
