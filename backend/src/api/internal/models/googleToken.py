from django.db import models

class GoogleToken(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='google_token')
    time_zone = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)
    token_uri = models.CharField(max_length=255)
    client_id = models.CharField(max_length=255)
    client_secret = models.CharField(max_length=255)
    scopes = models.TextField()

    def __str__(self):
        return self.user.email
    