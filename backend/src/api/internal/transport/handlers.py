from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from api.models import Check, Parent, PaymentAccount, Place, Practice, PracticeGroup, User
from api.permissions import IsStudent, IsTrainer
from api.serializers import (
    CheckSerializer,
    GroupSerializer,
    ParentSerializer,
    PaymentAccountSerializer,
    PlaceSerializer,
    PracticeSerializer,
    StudentSerializer,
    TrainerPracticeSerializer,
    UserSerializer,
)


class CreateTrainerView(CreateAPIView):
    serializer_class = UserSerializer


class CreateStudentView(ListCreateAPIView):
    queryset = User.objects.filter(role='student')
    serializer_class = StudentSerializer
    permission_classes = [IsTrainer]


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == User.TRAINER:
            serializer = UserSerializer(user)
        elif user.role == User.STUDENT:
            serializer = StudentSerializer(user)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class MyParentsView(APIView):
    permission_classes = [IsAuthenticated & IsStudent]

    def get(self, request):
        user = request.user
        parents = user.parents.all()
        serializer = ParentSerializer(parents, many=True)
        return Response(serializer.data)


class MyPaymentAccountView(APIView):
    permission_classes = [IsAuthenticated & IsStudent]

    def get(self, request):
        user = request.user
        account = user.account
        serializer = PaymentAccountSerializer(account)
        return Response(serializer.data)


class MyGroupView(APIView):
    permission_classes = [IsAuthenticated & IsStudent]

    def get(self, request):
        user = request.user
        group = user.my_groups.all().first()
        serializer = GroupSerializer(group)
        return Response(serializer.data)


class MyScheduleView(APIView):
    permission_classes = [IsAuthenticated & IsStudent]

    def get(self, request):
        user = request.user
        group = user.my_groups.all().first()
        practices = group.practices.all()
        serializer = PracticeSerializer(practices, many=True)
        return Response(serializer.data)


class CreateGroupView(ListCreateAPIView):
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated & IsTrainer]

    def get_queryset(self):
        user = self.request.user
        return user.practice_groups.all()


class GroupView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        user = request.user
        group = get_object_or_404(PracticeGroup, pk=pk)
        serializer = GroupSerializer(group)
        return Response(serializer.data)


class GroupStudentsView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        user = request.user
        group = get_object_or_404(PracticeGroup, pk=pk)
        students = group.students.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)


class CreatePracticeView(ListCreateAPIView):
    serializer_class = PracticeSerializer
    permission_classes = [IsAuthenticated & IsTrainer]

    def get_queryset(self):
        user = self.request.user
        groups = user.practice_groups.all().prefetch_related('practices')
        practices = []
        for group in groups:
            practices.extend(group.practices.all())
        return practices


class PracticeView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        user = request.user
        practice = get_object_or_404(Practice, pk=pk)
        serializer = TrainerPracticeSerializer(practice)
        return Response(serializer.data)
