# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.utils.text import slugify

from django.db import models

class Author(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)

    added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s, %s" % (self.last_name, self.first_name)

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, default=0)
    genre = models.CharField(max_length=128)
    read_by = models.ManyToManyField(User, default=0)
    title_slug = models.SlugField(null=True, editable=False)

    def __str__(self):
        return "%s" % (self.title)

    def save(self, *args, **kwargs):
        if not self.id:
            # Newly created object, so set slug
            self.title_slug = slugify(self.title)

        super(Book, self).save(*args, **kwargs)

class BookNote(models.Model):
    # At the moment, one note per book?
    book = models.ForeignKey(Book, default=1)
    title = models.TextField(default="New Note")
    content = models.TextField()
    owner = models.ForeignKey(
                                User, 
                                on_delete=models.CASCADE, 
                                null=True, 
                                related_name="book_notes"
                               )  
    added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s, %s: %s" % (self.owner.username, self.book.title, self.title)

class BookList(models.Model):
    title = models.CharField(max_length=255)
    # tags = 
    created_by = models.ForeignKey(User, null=True, related_name="book_list_created")
    shared_with = models.ForeignKey(User, null=True, related_name="book_list_shared")
    books = models.ManyToManyField(Book, default=0)
    added = models.DateTimeField(auto_now_add=True)
    title_slug = models.SlugField(null=True, editable=False)

    def __str__(self):
        return "%s" % (self.title)

    def save(self, *args, **kwargs):
        if not self.id:
            # Newly created object, so set slug
            self.title_slug = slugify(self.title)

        super(BookList, self).save(*args, **kwargs)   


