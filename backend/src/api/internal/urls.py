from django.urls import path, include

from api.internal.transport.handlers import (
    CreateGroupView,
    CreatePracticeView,
    CreateStudentView,
    CreateTrainerView,
    GroupStudentsView,
    GroupView,
    MyGroupView,
    MyParentsView,
    MyPaymentAccountView,
    MyScheduleView,
    PracticeView,
    UserView,
)


urlpatterns = [
    path('trainers', CreateTrainerView.as_view()),
    path('me', UserView.as_view()),
    path('student/parents', MyParentsView.as_view()),
    path('student/account', MyPaymentAccountView.as_view()),
    path('student/group', MyGroupView.as_view()),
    path('student/schedule', MyScheduleView.as_view()),
    path('trainer/students', CreateStudentView.as_view()),
    path('trainer/groups', CreateGroupView.as_view()),
    path('trainer/groups/<int:pk>', GroupView.as_view()),
    path('trainer/groups/<int:pk>/students', GroupStudentsView.as_view()),
    path('trainer/practices', CreatePracticeView.as_view()),
    path('trainer/practices/<int:pk>', PracticeView.as_view()),
]