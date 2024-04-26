from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from api.models import Check, Parent, PaymentAccount, Place, Practice, PracticeGroup, User
from api.serializers import (
    CheckSerializer,
    ParentSerializer,
    PaymentAccountSerializer,
    PlaceSerializer,
    PracticeSerializer,
    PracticeGroupSerializer,
    UserSerializer,
)


class ChecksList(ListAPIView):
    queryset = Check.objects.all()
    serializer_class = CheckSerializer


class CheckDetail(APIView):
    def get(self, request, pk):
        check = get_object_or_404(Check, pk=pk)
        serializer = CheckSerializer(check)
        return Response(serializer.data)


class ParentsList(ListAPIView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer


class ParentDetail(APIView):
    def get(self, request, pk):
        parent = get_object_or_404(Parent, pk=pk)
        serializer = ParentSerializer(parent)
        return Response(serializer.data)


class PaymentAccountsList(ListAPIView):
    queryset = PaymentAccount.objects.all()
    serializer_class = PaymentAccountSerializer


class PaymentAccountDetail(APIView):
    def get(self, request, pk):
        account = get_object_or_404(Check, pk=pk)
        serializer = PaymentAccountSerializer(account)
        return Response(serializer.data)


class PlacesList(ListAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer


class PlaceDetail(APIView):
    def get(self, request, pk):
        place = get_object_or_404(Place, pk=pk)
        serializer = PlaceSerializer(place)
        return Response(serializer.data)


class PracticesList(ListAPIView):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer


class PracticeDetail(APIView):
    def get(self, request, pk):
        practice = get_object_or_404(Practice, pk=pk)
        serializer = PracticeSerializer(practice)
        return Response(serializer.data)


class PracticeGroupsList(ListAPIView):
    queryset = PracticeGroup.objects.all()
    serializer_class = PracticeGroupSerializer


class PracticeGroupDetail(APIView):
    def get(self, request, pk):
        group = get_object_or_404(PracticeGroup, pk=pk)
        serializer = PracticeGroupSerializer(group)
        return Response(serializer.data)


class UsersList(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(APIView):
    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
