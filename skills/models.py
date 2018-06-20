# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

DEFAULT_LIFT = 1

class Lift(models.Model):
    def __str__(self):
        return "%s, %s" % (self.name, self.gender)

    GENDER = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=2, choices=GENDER, default='M')
    added = models.DateTimeField(auto_now_add=True)

class LiftByMass(models.Model):
    def __str__(self):
        return "%s, %s %s" % (str(self.mass), self.lift.name, self.lift.gender)

    lift = models.ForeignKey(Lift, on_delete=models.CASCADE)
    mass = models.IntegerField(default=0)
    mean = models.FloatField(default=0.0)
    std_dev = models.FloatField(default=0.0)
    # multiplier = models.FloatField(default=1.0, editable=False)

    class Meta:
        verbose_name = 'Lift by Mass'
        verbose_name_plural = 'Lifts by Mass'

def _calculate_sten(self):
    sten_value = 2 * (self.one_rep_max - self.lift.mean) / self.lift.std_dev + 5.5
    return round(sten_value, 0)

class UserLift(models.Model):

    SYSTEMS = (
        ('I', 'Imperial'),
        ('M', 'Metric'),
    )

    lift = models.OneToOneField(LiftByMass, on_delete=models.CASCADE, default=DEFAULT_LIFT)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_lift", default=0)
    one_rep_max = models.IntegerField(default=0)
    sten_value = property(_calculate_sten)
    system = models.CharField(max_length=2, choices=SYSTEMS, default='M')
    
    def __str__(self):
        return "%s, %s, %s" % (self.user, self.lift.lift.name, self.sten_value)

    def save(self, *args, **kwargs):
        if self.system == 'I':
            # Switch 1RM to metric
            self.one_rep_max = self.one_rep_max/2.2046226218
            self.one_rep_max = round(self.one_rep_max, 0)
            self.system = 'M'

        super(UserLift, self).save(*args, **kwargs)


