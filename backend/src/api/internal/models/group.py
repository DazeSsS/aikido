from django.db import models


class Group(models.Model):
    title = models.CharField(max_length=150)
    trainer = models.ForeignKey('User', on_delete=models.PROTECT, related_name='practice_groups')
    place = models.ForeignKey('Place', on_delete=models.PROTECT, related_name='groups')
    students = models.ManyToManyField('User', blank=True, related_name='my_groups')
