const params = new URLSearchParams(location.search);

const albumId = params.get("id");

const albumCover = document.getElementById("albumCover");
const albumTitle = document.getElementById("albumTitle");
const albumArtist = document.getElementById("albumArtist");
const albumRelease = document.getElementById("albumRelease");
const tracksCount = document.getElementById("tracksCount");

const grid = document.getElementById("albumSongs");

let songs = [];

async function init(){

    if(!albumId){

        location.href = "music.html";

        return;

    }

    try{

        const album = await API.getAlbum(albumId);

        songs = await API.getAlbumSongs(albumId);

        renderAlbum(album);

        renderSongs(songs);

        renderPlaylist(songs);

    }catch(error){

        console.error(error);

    }

}

function renderAlbum(album){

    albumCover.src = album.cover;

    albumTitle.textContent = album.title;

    albumArtist.textContent = album.artist.name;

    albumRelease.textContent = album.release;

    tracksCount.textContent = songs.length;

}

function renderSongs(list){

    grid.innerHTML = "";

    list.forEach(song=>{

        grid.innerHTML += `

        <div class="song-card"
             onclick="openSong(${song.id})">

            <div class="song-cover">

                <img src="${song.cover}" alt="${song.title}">

                <div class="play-overlay">

                    <button
                        class="play-song"
                        data-id="${song.id}"
                        onclick="event.stopPropagation()">

                        ▶

                    </button>

                    <button
                        class="fav-btn"
                        data-id="${song.id}"
                        onclick="event.stopPropagation()">

                        ❤️

                    </button>

                </div>

            </div>

            <div class="song-content">

                <h3>${song.title}</h3>

                <p>${song.artist.name}</p>

                <div class="song-meta">

                    <span>${song.genre}</span>

                    <span>${song.duration}</span>

                </div>

            </div>

        </div>

        `;

    });

    attachPlayEvents();

    attachFavoriteEvents();

}

function attachPlayEvents(){

    document.querySelectorAll(".play-song").forEach(btn=>{

        btn.onclick = ()=>{

            const id = Number(btn.dataset.id);

            const index = songs.findIndex(song=>song.id===id);

            player.loadPlaylist(songs);

            renderPlaylist(songs);

            player.play(index);

        };

    });

}

function attachFavoriteEvents(){

    document.querySelectorAll(".fav-btn").forEach(btn=>{

        btn.onclick = async()=>{

            const ok = await API.addFavorite(btn.dataset.id);

            if(ok){

                btn.innerHTML = "💚";

            }

        };

    });

}

function renderPlaylist(list){

    const playlist = document.getElementById("playlist");

    if(!playlist) return;

    playlist.innerHTML = "";

    list.forEach(song=>{

        playlist.innerHTML += `

        <div class="play-item"
             data-id="${song.id}">

            <img src="${song.cover}">

            <div class="play-info">

                <h4>${song.title}</h4>

                <p>${song.artist.name}</p>

            </div>

        </div>

        `;

    });

}

function openSong(id){

    location.href = `song.html?id=${id}`;

}

init();