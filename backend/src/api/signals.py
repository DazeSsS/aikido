from datetime import datetime, timedelta

from django.dispatch import receiver
from django.db.models.signals import m2m_changed, post_save, pre_delete
from calendar_client import GoogleCalendar

from api.models import User, Practice, PracticeGroup, CalendarEvent, GoogleToken


@receiver(post_save, sender=Practice)
def sync_practice_with_calendar(sender, instance, created, **kwargs):
    trainer = instance.group.trainer
    if GoogleToken.objects.filter(user=trainer).first() is None:
        return

    cal = GoogleCalendar(trainer)

    group = instance.group
    gmails = list(group.students.filter(email__contains='@gmail.com').values_list('email', flat=True))

    event_details = {
        'summary': f'Тренировка группы {group.title}',
        'location': group.place.address,
        'description': f'Место проведения: {group.place.description}',
        'start': instance.date.isoformat(),
        'end': (instance.date + timedelta(minutes=instance.duration)).isoformat(),
        'attendees': gmails,
    }

    event = cal.create_event(event_details=event_details)
    if event is not None:
        CalendarEvent.objects.create(id=event.get('id'), practice=instance, link=event.get('htmlLink'))


@receiver(m2m_changed, sender=PracticeGroup.students.through)
def sync_students_with_calendar(sender, instance, action, pk_set, **kwargs):
    if action not in ['post_add', 'post_remove']:
        return

    gmails = []
    for student_id in pk_set:
        student = User.objects.get(pk=student_id)
        if '@gmail.com' in student.email:
            gmails.append(str(student.email))

    if len(gmails) == 0:
        return

    cal = GoogleCalendar(instance.trainer)

    if action == 'post_add':
        future_practices = Practice.objects.filter(date__gte=datetime.now())
        for practice in future_practices:
            event_id = practice.event.id
            cal.add_event_attendees(event_id=event_id, new_attendees=gmails)
    
    if action == 'post_remove':
        future_practices = Practice.objects.filter(date__gte=datetime.now())
        for practice in future_practices:
            event_id = practice.event.id
            cal.remove_event_attendees(event_id=event_id, attendees_to_remove=gmails)


@receiver(pre_delete, sender=Practice)
def delete_event(sender, instance, **kwargs):
    trainer = instance.group.trainer
    if GoogleToken.objects.filter(user=trainer).first() is None:
        return

    cal = GoogleCalendar(trainer)

    if hasattr(instance, 'event'):
        cal.delete_event(instance.event.id)


@receiver(m2m_changed, sender=Practice.attended.through)
def calculate_students_balance(sender, instance, action, pk_set, **kwargs):
    if action == 'pre_add':
        for student_id in pk_set:
            student = User.objects.get(pk=student_id)
            student.account.increase_debt(instance.price)

    if action == 'pre_remove':
        for student_id in pk_set:
            student = User.objects.get(pk=student_id)
            student.account.reduce_debt(instance.price)
