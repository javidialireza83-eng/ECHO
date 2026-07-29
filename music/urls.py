from django.urls import path
from .views import SongListAPIView, SongDetailAPIView,ArtistListAPIView,ArtistDetailAPIView,ArtistSongsAPIView,AlbumListAPIView,AlbumDetailAPIView,AlbumSongsAPIView,RegisterAPIView,FavoriteListAPIView,TestAuthView,FavoriteDeleteAPIView

urlpatterns = [
    path("songs/", SongListAPIView.as_view(), name="songs"),
    path("songs/<int:pk>/", SongDetailAPIView.as_view(), name="song-detail"),
    path("artists/", ArtistListAPIView.as_view()),

    path("artists/<int:pk>/", ArtistDetailAPIView.as_view()),
    path("artists/<int:pk>/songs/", ArtistSongsAPIView.as_view()),
    
    path("albums/", AlbumListAPIView.as_view()),
    path("albums/<int:pk>/", AlbumDetailAPIView.as_view()),
    path("albums/<int:pk>/songs/", AlbumSongsAPIView.as_view()),
    
    path("register/", RegisterAPIView.as_view()),
    
    path("favorites/", FavoriteListAPIView.as_view()),
    
    path("test-auth/", TestAuthView.as_view()),
    
    path("favorites/<int:pk>/", FavoriteDeleteAPIView.as_view()),
    
    
 ]
