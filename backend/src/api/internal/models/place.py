from django.db import models


class Place(models.Model):
    address = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return self.address
