from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FormParser, MultiPartParser

from api.models import Check, Parent, PaymentAccount, Place, Practice, PracticeGroup, User
from api.permissions import IsStudent, IsTrainer
from api.serializers import (
    CheckSerializer,
    CreateGroupSerializer,
    GroupSerializer,
    ParentSerializer,
    PaymentAccountSerializer,
    PlaceSerializer,
    PracticeSerializer,
    StudentSerializer,
    TrainerSerializer,
    TrainerPracticeSerializer,
    UserSerializer,
)


class CreateTrainerView(CreateAPIView):
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['role'] = User.TRAINER

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CreateStudentView(ListCreateAPIView):
    queryset = User.objects.filter(role='student')
    serializer_class = StudentSerializer
    permission_classes = [IsTrainer]
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        random_password = User.objects.make_random_password(8)
        data['password'] = random_password
        data['role'] = User.STUDENT

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        user_email = serializer.data['email']
        send_mail(
            subject="Регистрация на AikiDojo",
            message=(
                'Поздравляем, ваш аккаунт был успешно зарегистрирован на AikiDojo!\n\n'
                'Данные для входа:\n'
                f'логин: {user_email}\n'
                f'пароль: {random_password}\n\n'
                'Если вы случайно получили это сообщение - не пугайтесь, мы просто группа студентов, '
                'которая разрабатывает веб-сервис, и мы могли случайно указать ваш email при тестировании🙂'
            ),
            html_message=(
                '<b>Поздравляем, ваш аккаунт был успешно зарегистрирован на AikiDojo!</b><br><br>'
                'Данные для входа:<br>'
                f'<i>логин:</i> {user_email}<br>'
                f'<i>пароль:</i> {random_password}<br><br>'
                'Если вы случайно получили это сообщение - не пугайтесь, мы просто группа студентов, '
                'которая разрабатывает веб-сервис, и мы могли случайно указать ваш email при тестировании🙂'
            ),
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user_email, settings.EMAIL_HOST_USER]
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        if user.role == User.TRAINER:
            serializer = TrainerSerializer(user)
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

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({'message': 'success'}, status=status.HTTP_200_OK)


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
    serializer_class = CreateGroupSerializer
    permission_classes = [IsAuthenticated & IsTrainer]

    def get_queryset(self):
        user = self.request.user
        return user.practice_groups.all()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['trainer'] = request.user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GroupView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        group = get_object_or_404(PracticeGroup, pk=pk)
        serializer = GroupSerializer(group)
        return Response(serializer.data)

    def patch(self, request, pk):
        group = get_object_or_404(PracticeGroup, pk=pk)
        serializer = CreateGroupSerializer(group, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        group = get_object_or_404(PracticeGroup, pk=pk)
        group.delete()
        return Response(status=status.HTTP_200_OK)


class GroupStudentsView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
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
        practice = get_object_or_404(Practice, pk=pk)
        serializer = TrainerPracticeSerializer(practice)
        return Response(serializer.data)

    def patch(self, request, pk):
        practice = get_object_or_404(Practice, pk=pk)
        serializer = PracticeSerializer(practice, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class CreateCheckView(CreateAPIView):
    serializer_class = CheckSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['account'] = request.user.account.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CheckView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        check = get_object_or_404(Check, pk=pk)
        serializer = CheckSerializer(check)
        return Response(serializer.data)


class CheckListView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request):
        user = request.user
        groups = user.practice_groups.all().prefetch_related("students")
        checks = []
        for group in groups:
            checks.extend(group.get_payment_checks())

        serializer = CheckSerializer(sorted(checks, key=lambda check: check.date, reverse=True), many=True)
        return Response(serializer.data)


class PlaceListView(ListAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [IsAuthenticated & IsTrainer]
