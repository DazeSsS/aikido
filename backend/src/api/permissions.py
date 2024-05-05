from rest_framework.permissions import BasePermission

from .models import User


class IsTrainer(BasePermission):

    def has_permission(self, request, view):
        try:
            return request.user.role == User.TRAINER
        except:
            return False


class IsStudent(BasePermission):

    def has_permission(self, request, view):
        try:
            return request.user.role == User.STUDENT
        except:
            return False