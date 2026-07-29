# from rest_framework import generics
# from .models import Song
# from .abc import SongSerializer
from rest_framework import generics
from .models import Artist, Song,Album,Favorite
from .abc import ArtistSerializer, SongSerializer,AlbumSerializer,RegisterSerializer,FavoriteSerializer

from django.contrib.auth.models import User
from rest_framework import generics

from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response

class SongListAPIView(generics.ListAPIView):
    queryset = Song.objects.all().order_by("-id")
    serializer_class = SongSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class SongDetailAPIView(generics.RetrieveAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def get_serializer_context(self):
        return {"request": self.request}

from rest_framework import generics
from .models import Artist, Song
from .abc import ArtistSerializer, SongSerializer


class ArtistListAPIView(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistDetailAPIView(generics.RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistSongsAPIView(generics.ListAPIView):

    serializer_class = SongSerializer

    def get_queryset(self):
        return Song.objects.filter(artist_id=self.kwargs["pk"])

class AlbumListAPIView(generics.ListAPIView):

    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class AlbumDetailAPIView(generics.RetrieveAPIView):

    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class AlbumSongsAPIView(generics.ListAPIView):

    serializer_class = SongSerializer

    def get_queryset(self):
        return Song.objects.filter(album_id=self.kwargs["pk"])
    
class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    
    
class FavoriteListAPIView(generics.ListCreateAPIView):

    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    


class TestAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "user": request.user.username
        })
class FavoriteDeleteAPIView(generics.DestroyAPIView):

    permission_classes = [IsAuthenticated]

    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)