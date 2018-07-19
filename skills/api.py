from rest_framework import viewsets, permissions

from .models import Lift, LiftByMass, UserLift, Skill, UserSkills
from .serializers import LiftSerializer, LiftBMSerializer, UserLiftSerializer, SkillSerializer, UserSkillsSerializer

class LiftViewSet(viewsets.ModelViewSet):
    queryset = Lift.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = LiftSerializer

class LiftBMViewSet(viewsets.ModelViewSet):
    queryset = LiftByMass.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = LiftBMSerializer

class UserLiftViewSet(viewsets.ModelViewSet):
    queryset = UserLift.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = UserLiftSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = SkillSerializer

class UserSkillsViewSet(viewsets.ModelViewSet):
    queryset = UserSkills.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = UserSkillsSerializer