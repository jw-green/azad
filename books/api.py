from rest_framework import viewsets, permissions, generics, filters

from rest_framework.response import Response

from knox.models import AuthToken

from .models import Book, Author, BookNote, BookList, ReadingTrack
from .serializers import AuthorSerializer, BookSerializer, BookNoteSerializer, BookListSerializer, ReadingTrackSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = BookSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', )

    def perform_create(self, serializer):
        serializer.save(read_by=[self.request.user,], author_id=int(self.request.data['author']))

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = AuthorSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('full_name', )

class BookNoteViewSet(viewsets.ModelViewSet):
    queryset = BookNote.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = BookNoteSerializer

    def get_queryset(self):
        queryset = self.request.user.book_notes.all()
        note_id = self.request.query_params.get('id', None)
        if note_id is not None:
            queryset = queryset.filter(book=note_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, book_id=int(self.request.data['book']))

class BookListViewSet(viewsets.ModelViewSet):
    queryset = BookList.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = BookListSerializer

    def get_queryset(self):
        return self.request.user.book_list_shared.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ReadingTrackViewSet(viewsets.ModelViewSet):
    queryset = ReadingTrack.objects.all()
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ReadingTrackSerializer