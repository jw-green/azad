# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User

from django.db import models

class Task(models.Model):
    
    title = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    owner = models.ForeignKey(User, 
                            related_name="tasks", 
                            on_delete=models.CASCADE, 
                            null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s, %s" % (self.title, self.state)
