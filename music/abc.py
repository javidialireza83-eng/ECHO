from rest_framework import serializers
from .models import Artist, Album, Song,Favorite


class ArtistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Artist
        fields = "__all__"


class AlbumSerializer(serializers.ModelSerializer):

    artist = ArtistSerializer(read_only=True)

    class Meta:
        model = Album
        fields = "__all__"


class SongSerializer(serializers.ModelSerializer):

    artist = ArtistSerializer(read_only=True)
    album = AlbumSerializer(read_only=True)

    cover = serializers.SerializerMethodField()
    audio = serializers.SerializerMethodField()

    class Meta:
        model = Song
        fields = "__all__"

    def get_cover(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.cover.url)
        return obj.cover.url

    def get_audio(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.audio.url)
        return obj.audio.url
    
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
    
    
from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):

    song = SongSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = "__all__"
        
    def to_representation(self, instance):
        print("✅ FavoriteSerializer is running")
        return super().to_representation(instance)