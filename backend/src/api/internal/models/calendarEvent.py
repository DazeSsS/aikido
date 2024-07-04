from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class CalendarEvent(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    practice = models.OneToOneField('Practice', on_delete=models.CASCADE, related_name='event')
    link = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.id} {self.practice.date}'
