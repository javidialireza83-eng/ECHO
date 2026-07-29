from django.contrib import admin
from .models import Song,Artist,Album,Favorite


@admin.register(Song)
class SongAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "artist",
        "genre",
        "release",
    )

    search_fields = (
        "title",
        "artist",
    )

    list_filter = (
        "genre",
    )
admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Favorite)