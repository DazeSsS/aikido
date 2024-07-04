import google.oauth2.credentials
from googleapiclient.discovery import build

from api.models import GoogleToken


class GoogleCalendar:
    def __init__(self, user):
        self.user = user
        self.token_data = GoogleToken.objects.get(user=user)
        self.credentials = google.oauth2.credentials.Credentials(
            token=self.token_data.access_token,
            refresh_token=self.token_data.refresh_token,
            token_uri=self.token_data.token_uri,
            client_id=self.token_data.client_id,
            client_secret=self.token_data.client_secret,
            scopes=self.token_data.scopes.split()
        )
        self.service = build('calendar', 'v3', credentials=self.credentials)

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

        event = self.service.events().insert(calendarId='primary', body=event, sendUpdates='externalOnly').execute()
        return event

    def delete_event(self, event_id):
        self.service.events().delete(calendarId='primary', eventId=event_id).execute()

    def add_event_attendees(self, event_id, new_attendees):
        event = self.service.events().get(calendarId='primary', eventId=event_id).execute()
        
        email_list = [{'email': email} for email in new_attendees]
        if 'attendees' in event:
            event['attendees'].extend(email_list)
        else:
            event['attendees'] = email_list

        return self.service.events().update(calendarId='primary', eventId=event_id, body=event, sendUpdates='externalOnly').execute()

    def remove_event_attendees(self, event_id, attendees_to_remove):
        event = self.service.events().get(calendarId='primary', eventId=event_id).execute()

        event['attendees'] = [attendee for attendee in event['attendees'] if attendee['email'] not in attendees_to_remove]

        return self.service.events().update(calendarId='primary', eventId=event_id, body=event).execute()
