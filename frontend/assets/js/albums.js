const grid = document.getElementById("albumsGrid");

let albums = [];

async function init(){

    try{

        albums = await API.getAlbums();

        renderAlbums(albums);

    }catch(error){

        console.error(error);

        grid.innerHTML = `
            <h2>Failed to load albums.</h2>
        `;

    }

}

function renderAlbums(list){

    grid.innerHTML = "";

    list.forEach(album=>{

        grid.innerHTML += `

        <div class="song-card album-card"
             onclick="openAlbum(${album.id})">

            <div class="album-cover">

                <img src="${album.cover}" alt="${album.title}">

            </div>

            <div class="album-content">

                <h3>${album.title}</h3>

                <p>${album.artist.name}</p>

                <div class="album-meta">

                    <span>${album.release}</span>

                </div>

            </div>

        </div>

        `;

    });
    async function init(){

    try{

        albums = await API.getAlbums();

        console.log(albums);

        renderAlbums(albums);

    }catch(err){

        console.error(err);

    }

}

}

function openAlbum(id){

    location.href = `album.html?id=${id}`;

}

window.onload = init;