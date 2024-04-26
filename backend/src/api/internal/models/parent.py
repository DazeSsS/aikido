from django.db import models


class Parent(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150, blank=True)
    contact = models.CharField(max_length=150)
    childs = models.ManyToManyField('User', related_name='parents')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
