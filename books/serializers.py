from rest_framework import serializers

from .models import Book, Author, BookNote, BookList

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name', 'full_name', 'added', )

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'genre', 'title_slug', )

class BookNoteSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    class Meta:
        model = BookNote
        fields = ('id', 'book', 'title', 'content',)

class BookListSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    class Meta:
        model = BookList
        fields = ('id', 'books', 'content' )
    


        