/*=========================================
ECHO Music v2
=========================================*/

let songs = [];
let filteredSongs = [];

const musicGrid = document.getElementById("musicGrid");
const playlistContainer = document.getElementById("playlist");

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter");

document.addEventListener("DOMContentLoaded", init);

async function init() {

    try {

        songs = await API.getSongs();

        filteredSongs = [...songs];

        renderSongs(filteredSongs);

        renderPlaylist(filteredSongs);

        bindSearch();

        bindFilters();

    } catch (err) {

        console.error(err);

        musicGrid.innerHTML = `
            <div class="empty-card">
                <h2>خطا در دریافت اطلاعات</h2>
            </div>
        `;

    }

}
function renderSongs(list) {

    musicGrid.innerHTML = "";

    list.forEach(song => {

        const card = createSongCard(song);

        musicGrid.appendChild(card);

    });

}
function createSongCard(song) {

    console.log("CREATE CARD", song.title);

    const card = document.createElement("div");

    card.className = "song-card";

    card.innerHTML = `
        <div class="song-cover">

            <img src="${song.cover}" alt="${song.title}">

            <div class="play-overlay">

                <button class="play-song">▶</button>

                <button class="fav-btn">❤️</button>

            </div>

        </div>

        <div class="song-content">

            <P>
                 Download : 
                <a href="song.html?id=${song.id}">
                    ${song.title}
                </a>
            </P>

            <p>
                artist :
                <a href="artist.html?id=${song.artist.id}">
                    ${song.artist.name}
                </a>
            </p>

            <p>
                Album :
                <a href="album.html?id=${song.album.id}">
                    ${song.album.title}
                </a>
            </p>

            <div class="song-meta">

                <span>${song.genre}</span>

                <span>${song.duration}</span>

            </div>

        </div>
    `;

    const playBtn = card.querySelector(".play-song");

    const favBtn = card.querySelector(".fav-btn");
        /*=========================
    Play
    =========================*/

    playBtn.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        player.loadPlaylist(filteredSongs);

        const index = filteredSongs.findIndex(
            item => item.id === song.id
        );

        if (index !== -1) {

            player.play(index);

        }

    });


    /*=========================
    Favorite
    =========================*/

    favBtn.addEventListener("click", async function (e) {

        e.preventDefault();
        e.stopPropagation();

        try {

            const ok = await API.addFavorite(song.id);

            if (ok) {

                favBtn.textContent = "💚";
                favBtn.disabled = true;

            }

        } catch (err) {

            console.error(err);

        }

    });


    return card;

}
function renderPlaylist(list) {

    if (!playlistContainer) return;

    playlistContainer.innerHTML = "";

    list.forEach((song) => {

        const item = document.createElement("div");

        item.className = "play-item";

        item.dataset.id = song.id;

        item.innerHTML = `

            <img src="${song.cover}" alt="${song.title}">

            <div class="play-info">

                <h4>${song.title}</h4>

                <p>${song.artist.name}</p>

            </div>

        `;

        item.addEventListener("click", () => {

            player.loadPlaylist(filteredSongs);

            const index = filteredSongs.findIndex(

                s => s.id === song.id

            );

            if (index !== -1) {

                player.play(index);

            }

        });

        playlistContainer.appendChild(item);

    });

}
/*=========================================
Search
=========================================*/

function bindSearch() {

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const value = searchInput.value.trim().toLowerCase();

        filteredSongs = songs.filter(song => {

            return (

                song.title.toLowerCase().includes(value) ||

                song.artist.name.toLowerCase().includes(value) ||

                song.album.title.toLowerCase().includes(value)

            );

        });

        renderSongs(filteredSongs);

        renderPlaylist(filteredSongs);

    });

}


/*=========================================
Filters
=========================================*/

function bindFilters() {

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            filterButtons.forEach(b => {

                b.classList.remove("active");

            });

            btn.classList.add("active");

            const type = btn.textContent.trim().toLowerCase();

            if (type === "all") {

                filteredSongs = [...songs];

            } else {

                filteredSongs = songs.filter(song => {

                    return song.genre &&
                        song.genre.toLowerCase() === type;

                });

            }

            renderSongs(filteredSongs);

            renderPlaylist(filteredSongs);

        });

    });

}