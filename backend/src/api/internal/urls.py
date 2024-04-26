from django.urls import path, include

from api.internal.transport.views import (
    ChecksList,
    CheckDetail,
    ParentsList,
    ParentDetail,
    PaymentAccountsList,
    PaymentAccountDetail,
    PlacesList,
    PlaceDetail,
    PracticesList,
    PracticeDetail,
    PracticeGroupsList,
    PracticeGroupDetail,
    UsersList,
    UserDetail,
)


urlpatterns = [
    path('checks', ChecksList.as_view()),
    path('parents', ParentsList.as_view()),
    path('accounts', PaymentAccountsList.as_view()),
    path('places', PlacesList.as_view()),
    path('practices', PracticesList.as_view()),
    path('groups', PracticeGroupsList.as_view()),
    path('users', UsersList.as_view()),
    path('checks/<int:pk>', CheckDetail.as_view()),
    path('parents/<int:pk>', ParentDetail.as_view()),
    path('accounts/<int:pk>', PaymentAccountDetail.as_view()),
    path('places/<int:pk>', PlaceDetail.as_view()),
    path('practices/<int:pk>', PracticeDetail.as_view()),
    path('groups/<int:pk>', PracticeGroupDetail.as_view()),
    path('users/<int:pk>', UserDetail.as_view()),
]