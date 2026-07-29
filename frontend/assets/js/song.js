const params = new URLSearchParams(location.search);

const songId = params.get("id");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const genre = document.getElementById("genre");
// const duration = document.getElementById("duration");
const songDuration = document.getElementById("duration");

const release = document.getElementById("release");
const lyrics = document.getElementById("lyrics");

const playSong = document.getElementById("playSong");
const favoriteSong = document.getElementById("favoriteSong");
const downloadSong = document.getElementById("downloadSong");

let currentSong = null;

async function init(){

    if(!songId){

        location.href = "music.html";

        return;

    }

    currentSong = await API.getSong(songId);

    showSong(currentSong);

    player.loadPlaylist([currentSong]);

    loadRelated();

}

function showSong(song){

    cover.src = song.cover;

    title.textContent = song.title;

    artist.textContent = song.artist.name;

    genre.textContent = song.genre;

    // duration.textContent = song.duration;
    songDuration.textContent = song.duration;

    release.textContent = song.release;

    lyrics.textContent = song.lyrics;

}

playSong.onclick = ()=>{

    if (!currentSong) return;

    player.loadPlaylist([currentSong]);

    player.play(0);

};

favoriteSong.onclick = async()=>{

    const ok = await API.addFavorite(currentSong.id);

    if(ok){

        favoriteSong.innerHTML="❤️ Added";

        favoriteSong.disabled=true;

    }

};
downloadSong.onclick = async () => {

    if (!currentSong) return;

    await API.downloadSong(currentSong.id);

};
async function loadRelated(){

    const songs = await API.getSongs();

    const related = songs.filter(song=>song.id!=songId);

    const grid = document.getElementById("relatedSongs");

    grid.innerHTML="";

    related.slice(0,4).forEach(song=>{

        grid.innerHTML += `

        <div class="song-card">

            <img src="${song.cover}">

            <h3>${song.title}</h3>

            <p>${song.artist.name}</p>

            <button class="play-related"

            data-id="${song.id}">

                ▶

            </button>

        </div>

        `;

    });

    attachEvents(related);

}

function attachEvents(list){

    document.querySelectorAll(".play-related").forEach(btn=>{

        btn.onclick=()=>{

            const id = Number(btn.dataset.id);

            const playlist = list;

            const index = playlist.findIndex(song=>song.id===id);

            player.loadPlaylist(playlist);

            renderPlaylist(playlist);

            player.play(index);

        };

    });

}

function renderPlaylist(list){

    const box = document.getElementById("playlist");

    if(!box) return;

    box.innerHTML="";

    list.forEach(song=>{

        box.innerHTML +=`

        <div class="play-item"

        data-id="${song.id}">

            <img src="${song.cover}">

            <div>

                <h4>${song.title}</h4>

                <p>${song.artist.name}</p>

            </div>

        </div>

        `;

    });

}

init();
// player.loadPlaylist([currentSong]);