from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

from api.models import User


class Practice(models.Model):
    price = models.DecimalField(max_digits=7, decimal_places=2)
    group = models.ForeignKey('PracticeGroup', on_delete=models.CASCADE, related_name='practices')
    attended = models.ManyToManyField('User', blank=True, related_name='practices')
    trial = models.ManyToManyField('User', blank=True, related_name='trials')
    date = models.DateTimeField()
    duration = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.date}'


@receiver(m2m_changed, sender=Practice.attended.through)
def calculate_students_balance(sender, instance, action, **kwargs):
    if action == 'pre_add':
        attended = instance.attended.values_list('pk', flat=True)
        for student_id in kwargs.get('pk_set'):
            student = User.objects.filter(pk=student_id).first()
            student.account.increase_debt(instance.price)

    if action == 'pre_remove':
        for student_id in kwargs.get('pk_set'):
            student = User.objects.filter(pk=student_id).first()
            student.account.reduce_debt(instance.price)
