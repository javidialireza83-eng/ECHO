const grid = document.getElementById("favoritesGrid");

async function loadFavorites() {

    const favorites = await API.getFavorites();

    grid.innerHTML = "";

    favorites.forEach(item => {

        const song = item.song;

        grid.innerHTML += `
            <div class="song-card">

                <img src="${song.cover}" alt="${song.title}">

                <h3>${song.title}</h3>

                <p>${song.artist.name}</p>

                <button class="play-song" data-id="${song.id}">
    ▶
</button>

<button class="remove-fav" data-id="${item.id}">
    💔
</button>

            </div>
        `;
    });

    attachPlayEvents(favorites);
    attachDeleteEvents();
    const playlist = favorites.map(item => item.song);

player.loadPlaylist(playlist);

renderPlaylist(playlist);

}

function attachPlayEvents(favorites){

    document.querySelectorAll(".play-song").forEach(btn=>{

        btn.onclick = ()=>{

            const id = Number(btn.dataset.id);

            const playlist = favorites.map(item => item.song);

            const index = playlist.findIndex(song => song.id === id);

            player.loadPlaylist(playlist);

            player.play(index);

        };

    });

}

loadFavorites();
function renderPlaylist(list){

    const playlistBox = document.getElementById("playlist");

    if(!playlistBox) return;

    playlistBox.innerHTML = "";

    list.forEach(song=>{

        playlistBox.innerHTML += `
            <div class="play-item" data-id="${song.id}">

                <img src="${song.cover}">

                <div class="play-info">

                    <h4>${song.title}</h4>

                    <p>${song.artist.name}</p>

                </div>

            </div>
        `;

    });
}
function attachDeleteEvents(){

    document.querySelectorAll(".remove-fav").forEach(btn=>{

        btn.onclick = async()=>{

            const ok = await API.removeFavorite(btn.dataset.id);

            if(ok){

                btn.closest(".song-card").remove();

            }

        };

    });

}
