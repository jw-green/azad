from django.conf.urls import include, url
from rest_framework import routers

from .api import LiftViewSet, LiftBMViewSet, UserLiftViewSet

router = routers.DefaultRouter()
router.register('lifts', LiftViewSet)
router.register('lifts_bm', LiftBMViewSet)
router.register('user_lifts', UserLiftViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]