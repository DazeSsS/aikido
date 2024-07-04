from django.db import models


class Practice(models.Model):
    price = models.DecimalField(max_digits=7, decimal_places=2)
    group = models.ForeignKey('PracticeGroup', on_delete=models.CASCADE, related_name='practices')
    attended = models.ManyToManyField('User', blank=True, related_name='practices')
    trial = models.ManyToManyField('User', blank=True, related_name='trials')
    date = models.DateTimeField()
    duration = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.date}'
