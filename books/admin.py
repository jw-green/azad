# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Book, Author, BookNote, BookList, ReadingTrack

# Register your models here.
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(BookNote)
admin.site.register(BookList)
admin.site.register(ReadingTrack)