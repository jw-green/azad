from rest_framework import viewsets, permissions

from .models import Lift, LiftByMass, UserLift
from .serializers import LiftSerializer, LiftBMSerializer, UserLiftSerializer

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