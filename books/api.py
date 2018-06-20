from rest_framework import viewsets, permissions, generics

from rest_framework.response import Response

from knox.models import AuthToken

from .models import Book, Author, BookNote
from .serializers import AuthorSerializer, BookSerializer, BookNoteSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = BookSerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = AuthorSerializer

class BookNoteViewSet(viewsets.ModelViewSet):
    queryset = BookNote.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = BookNoteSerializer

    def get_queryset(self):
        return self.request.user.book_notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)