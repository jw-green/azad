from django.conf.urls import include, url
from rest_framework import routers

from .api import BookViewSet, AuthorViewSet, BookNoteViewSet

router = routers.DefaultRouter()
router.register('books', BookViewSet)
router.register('authors', AuthorViewSet)
router.register('book_notes', BookNoteViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]