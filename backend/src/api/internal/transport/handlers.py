from calendar import monthrange
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
from google.auth.exceptions import RefreshError

from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

from api.models import Check, Parent, PaymentAccount, Place, Practice, PracticeGroup, User
from api.permissions import IsStudent, IsTrainer
from api.serializers import (
    CheckSerializer,
    CreateGroupSerializer,
    CreatePracticeSerializer,
    GroupSerializer,
    ParentSerializer,
    PaymentAccountSerializer,
    PlaceSerializer,
    PracticeSerializer,
    StudentSerializer,
    TrainerCheckSerializer,
    TrainerSerializer,
    TrainerPracticeSerializer,
    UserSerializer,
)


def calculate_scope(scope, offset):
    scope_start = None
    scope_end = None

    today = date.today()
    year, month, day = [today.year, today.month, today.day]
    match scope:
        case 'week':
            weekday = today.isocalendar().weekday
            offset_datetime = datetime(year, month, day) + timedelta(days=(7 * offset))
            scope_start = offset_datetime - timedelta(days=(weekday - 1))
            scope_end = offset_datetime + timedelta(days=((7 - weekday) + 1)) - timedelta(seconds=1)
        case 'month':
            offset_datetime = datetime(year, month, day) + relativedelta(months=offset)
            scope_start = offset_datetime.replace(day=1)
            scope_end = offset_datetime.replace(
                day=monthrange(offset_datetime.year, offset_datetime.month)[1],
                hour=23,
                minute=59,
                second=59
            )
        case _:
            return None
    
    return {'scope_start': scope_start, 'scope_end': scope_end}


class CreateTrainerView(CreateAPIView):
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

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
    permission_classes = [IsAuthenticated & IsTrainer]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def perform_create(self, serializer):
        return serializer.save()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        random_password = User.objects.make_random_password(8)
        data['password'] = random_password
        data['role'] = User.STUDENT

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        student = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        account = PaymentAccount.objects.create(user=student)

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
    parser_classes = [MultiPartParser, FormParser, JSONParser]

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


class CreateParentView(CreateAPIView):
    serializer_class = ParentSerializer
    permission_classes = [IsAuthenticated]


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


class MyPracticesView(ListAPIView):
    serializer_class = PracticeSerializer
    permission_classes = [IsAuthenticated & IsStudent]

    def get_queryset(self):
        user = self.request.user
        scope = self.request.query_params.get('scope', 'week')
        offset = int(self.request.query_params.get('offset', 0))
        past = self.request.query_params.get('past', 'False').lower() == 'true'

        date_range = calculate_scope(scope, offset)
        if date_range is None:
            return Practice.objects.none()

        scope_start, scope_end = [date_range.get('scope_start'), date_range.get('scope_end')]

        if not past and offset <= 0:
            scope_start = datetime.now()
        elif past and offset >= 0:
            scope_end = datetime.now()

        group = user.get_group()
        if group is None:
            return Practice.objects.none()
            
        practices = group.practices.filter(date__gte=scope_start, date__lte=scope_end)

        return practices.order_by('date')


class CreateGroupView(ListCreateAPIView):
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated & IsTrainer]

    def get_queryset(self):
        user = self.request.user
        return user.practice_groups.all()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['trainer'] = request.user.id

        serializer = CreateGroupSerializer(data=data)
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
        return Response({'message': 'success'}, status=status.HTTP_200_OK)


class GroupStudentsView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        group = get_object_or_404(PracticeGroup, pk=pk)
        students = group.students.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)


class CreatePracticeView(CreateAPIView):
    serializer_class = CreatePracticeSerializer
    permission_classes = [IsAuthenticated & IsTrainer]

    def create(self, request, pk, *args, **kwargs):
        data = request.data.copy()
        group = get_object_or_404(PracticeGroup, pk=pk)
        data['group'] = pk

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        try:
            self.perform_create(serializer)
        except RefreshError:
            return Response({'message': 'token error'}, status=status.HTTP_201_CREATED)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PracticeListView(ListAPIView):
    serializer_class = PracticeSerializer
    permission_classes = [IsAuthenticated & IsTrainer]

    def get_queryset(self):
        user = self.request.user
        scope = self.request.query_params.get('scope', 'week')
        offset = int(self.request.query_params.get('offset', 0))

        date_range = calculate_scope(scope, offset)
        if date_range is None:
            return Practice.objects.none()
        
        scope_start, scope_end = [date_range.get('scope_start'), date_range.get('scope_end')]

        groups = user.practice_groups.all().prefetch_related('practices')
        practices = Practice.objects.none()
        for group in groups:
            group_practices = group.practices.filter(date__gte=scope_start, date__lte=scope_end)
            practices = practices.union(group_practices)

        return practices.order_by('date')


class PracticeView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        practice = get_object_or_404(Practice, pk=pk)
        serializer = TrainerPracticeSerializer(practice)
        return Response(serializer.data)

    def patch(self, request, pk):
        practice = get_object_or_404(Practice, pk=pk)
        serializer = CreatePracticeSerializer(practice, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        practice = get_object_or_404(Practice, pk=pk)
        practice.delete()
        return Response({'message': 'success'}, status=status.HTTP_200_OK)



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


class CheckListView(ListAPIView):
    serializer_class = TrainerCheckSerializer
    permission_classes = [IsAuthenticated & IsTrainer]

    def get_queryset(self):
        user = self.request.user
        checks = user.get_incoming_checks()
        return checks


class CheckView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def get(self, request, pk):
        check = get_object_or_404(Check, pk=pk)
        serializer = TrainerCheckSerializer(check)
        return Response(serializer.data)

    def patch(self, request, pk):
        check = get_object_or_404(Check, pk=pk)
        serializer = TrainerCheckSerializer(check, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class CheckSetConfirmedView(APIView):
    permission_classes = [IsAuthenticated & IsTrainer]

    def post(self, request):
        confirmed_checks = request.data.get('confirmed')
        for check_id in confirmed_checks:
            check = Check.objects.filter(pk=check_id, confirmed=False).select_related('account').first()
            if check is not None:
                check.set_confirmed()
        return Response({'message': 'success'}, status=status.HTTP_200_OK)


class PlaceListView(ListAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [IsAuthenticated & IsTrainer]
