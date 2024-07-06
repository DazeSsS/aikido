from google.oauth2 import credentials
from google.auth.exceptions import RefreshError
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from api.models import GoogleToken


class GoogleCalendar:
    def __init__(self, user):
        self.user = user
        self.token_data = GoogleToken.objects.get(user=user)
        self.credentials = credentials.Credentials(
            token=self.token_data.access_token,
            refresh_token=self.token_data.refresh_token,
            token_uri=self.token_data.token_uri,
            client_id=self.token_data.client_id,
            client_secret=self.token_data.client_secret,
            scopes=self.token_data.scopes.split()
        )
        self.service = build('calendar', 'v3', credentials=self.credentials)

    def check_access(self):
        try:
            cal = self.service.calendars().get(calendarId='primary').execute()
            return True
        except RefreshError:
            return False

    def create_event(self, event_details):
        event = {
            'summary': event_details['summary'],
            'location': event_details['location'],
            'description': event_details['description'],
            'start': {
                'dateTime': event_details['start'],
                'timeZone': self.token_data.time_zone,
            },
            'end': {
                'dateTime': event_details['end'],
                'timeZone': self.token_data.time_zone,
            },
            'attendees': [{'email': email} for email in event_details['attendees']],
        }

        try:
            event = self.service.events().insert(calendarId='primary', body=event, sendUpdates='externalOnly').execute()
            return event
        except HttpError:
            return None

    def delete_event(self, event_id):
        try:
            self.service.events().delete(calendarId='primary', eventId=event_id).execute()
        except HttpError:
            pass

    def add_event_attendees(self, event_id, new_attendees):
        event = self.service.events().get(calendarId='primary', eventId=event_id).execute()
        
        email_list = [{'email': email} for email in new_attendees]
        if 'attendees' in event:
            event['attendees'].extend(email_list)
        else:
            event['attendees'] = email_list

        try:
            self.service.events().update(calendarId='primary', eventId=event_id, body=event, sendUpdates='externalOnly').execute()
        except HttpError:
            pass

    def remove_event_attendees(self, event_id, attendees_to_remove):
        event = self.service.events().get(calendarId='primary', eventId=event_id).execute()

        event['attendees'] = [attendee for attendee in event['attendees'] if attendee['email'] not in attendees_to_remove]

        try:
            self.service.events().update(calendarId='primary', eventId=event_id, body=event).execute()
        except HttpError:
            pass
