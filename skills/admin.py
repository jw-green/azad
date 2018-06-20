# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Lift, LiftByMass, UserLift

# Register your models here.
admin.site.register(Lift)
admin.site.register(LiftByMass)
admin.site.register(UserLift)