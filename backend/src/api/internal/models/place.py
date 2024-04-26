from django.db import models


class Place(models.Model):
    address = models.CharField(max_length=150)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.address
