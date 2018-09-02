from django.conf.urls import include, url
from rest_framework import routers

from .api import BookViewSet, AuthorViewSet, BookNoteViewSet, BookListViewSet, ReadingTrackViewSet

router = routers.DefaultRouter()
router.register('books', BookViewSet)
router.register('authors', AuthorViewSet)
router.register('book_notes', BookNoteViewSet)
router.register('book_lists', BookListViewSet)
router.register('reading_tracks', ReadingTrackViewSet)

urlpatterns = [
    url("^", include(router.urls)),
]