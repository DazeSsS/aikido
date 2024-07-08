from django.db import models
from api.models import Check


class PracticeGroup(models.Model):
    title = models.CharField(max_length=150)
    trainer = models.ForeignKey('User', on_delete=models.PROTECT, related_name='practice_groups')
    place = models.ForeignKey('Place', on_delete=models.PROTECT, related_name='groups')
    students = models.ManyToManyField('User', blank=True, related_name='my_groups')

    def __str__(self):
        return self.title

    def get_payment_checks(self):
        students = self.students.all().prefetch_related("account__checks")
        checks = Check.objects.none()
        for student in students:
            checks = checks.union(student.account.checks.filter(checked=False))
        return checks.order_by('-date')
