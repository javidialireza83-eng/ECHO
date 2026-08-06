const params = new URLSearchParams(location.search);

const artistId = params.get("id");

const artistImage = document.getElementById("artistImage");
const artistName = document.getElementById("artistName");
const artistBio = document.getElementById("artistBio");
const songsCount = document.getElementById("songsCount");

const grid = document.getElementById("artistSongs");

let songs = [];

async function init(){

    if(!artistId){

        location.href = "music.html";

        return;

    }

    try{

        const artist = await API.getArtist(artistId);

        songs = await API.getArtistSongs(artistId);

        renderArtist(artist);

        renderSongs(songs);

        renderPlaylist(songs);

    }catch(error){

        console.error(error);

    }

}

function renderArtist(artist){

    artistImage.src = artist.image;

    artistName.textContent = artist.name;

    artistBio.textContent = artist.bio;

    songsCount.textContent = songs.length;

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

                <p>${song.genre}</p>

                <div class="song-meta">

                    <span>${song.duration}</span>

                    <span>${song.release}</span>

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