from django.conf.urls import include, url
from rest_framework import routers

from .api import LiftViewSet, LiftBMViewSet, UserLiftViewSet, SkillViewSet, UserSkillsViewSet

router = routers.DefaultRouter()
router.register('lifts', LiftViewSet)
router.register('lifts_bm', LiftBMViewSet)
router.register('user_lifts', UserLiftViewSet)
router.register('skills', SkillViewSet)
router.register('user_skills', UserSkillsViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]