from django.db import models

# Create your models here.

class Artist(models.Model):

    name = models.CharField(max_length=100)

    image = models.ImageField(upload_to="artists/")

    bio = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Song(models.Model):

    title = models.CharField(max_length=200)

    # artist = models.CharField(max_length=200)
    artist = models.ForeignKey(
    Artist,
    on_delete=models.CASCADE,
    related_name="songs"
    )

    genre = models.CharField(max_length=100)

    duration = models.CharField(max_length=10)

    release = models.DateField()

    cover = models.ImageField(upload_to="covers/")

    audio = models.FileField(upload_to="songs/")

    lyrics = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
    album = models.ForeignKey(
    'Album',
    on_delete=models.CASCADE,
    related_name="songs",
    null=True,
    blank=True
     )

    def __str__(self):
        return self.title
    
class Album(models.Model):

    title = models.CharField(max_length=150)

    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name="albums"
    )

    cover = models.ImageField(upload_to="albums/")

    release = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
from django.contrib.auth.models import User

class Favorite(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="favorites"
    )

    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name="favorites"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "song")

    def __str__(self):
        return f"{self.user.username} - {self.song.title}"