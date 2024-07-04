import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.contrib.auth import get_user_model

from api.models import GoogleToken

User = get_user_model()

class GoogleCallbackView(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        if not code:
            return Response({'error': 'Code not provided'}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            'code': code,
            'client_id': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
            'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
            'redirect_uri': settings.REDIRECT_URI,
            'grant_type': 'authorization_code'
        }
        response = requests.post('https://oauth2.googleapis.com/token', data=data)
        token_data = response.json()

        if 'error' in token_data:
            return Response({'error': token_data['error_description']}, status=status.HTTP_400_BAD_REQUEST)

        user_data = requests.get(
            'https://www.googleapis.com/oauth2/v1/userinfo',
            params={'access_token': token_data['access_token']}
        ).json()

        current_user = User.objects.get(email=user_data['email'])

        calendar_info = requests.get(
            'https://www.googleapis.com/calendar/v3/calendars/primary',
            headers={
                'Authorization': f'Bearer {token_data["access_token"]}',
            }
        ).json()
        time_zone = calendar_info.get('timeZone')

        GoogleToken.objects.update_or_create(
            user=current_user,
            defaults={
                'time_zone': time_zone,
                'access_token': token_data['access_token'],
                'refresh_token': token_data['refresh_token'],
                'token_uri': 'https://oauth2.googleapis.com/token',
                'client_id': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
                'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
                'scopes': 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email',
            }
        )

        return Response({'detail': 'Tokens saved successfully'}, status=status.HTTP_200_OK)