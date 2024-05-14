from django.db import models


class PracticeGroup(models.Model):
    title = models.CharField(max_length=150)
    trainer = models.ForeignKey('User', on_delete=models.PROTECT, related_name='practice_groups')
    place = models.ForeignKey('Place', on_delete=models.PROTECT, related_name='groups')
    students = models.ManyToManyField('User', blank=True, related_name='my_groups')

    def __str__(self):
        return self.title

    def get_payment_checks(self):
        students = self.students.all().prefetch_related("account__checks")
        checks = []
        for student in students:
            checks.extend(student.account.checks.all().order_by('-date')[:5])
        return checks
