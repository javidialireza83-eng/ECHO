const API = {

    // BASE_URL: `${window.location.origin}/api`,
    //  BASE_URL: "http://127.0.0.1:8000/api",
    BASE_URL: "backend-9xd-echo-music.runflare.cloud",

    async getSongs() {

        const res = await fetch(`${this.BASE_URL}/songs/`);

        if (!res.ok) throw new Error("API Error");

        return await res.json();

    },

    async getSong(id) {

        const res = await fetch(`${this.BASE_URL}/songs/${id}/`);

        if (!res.ok) throw new Error("API Error");

        return await res.json();

    },

    async getArtists() {

        const res = await fetch(`${this.BASE_URL}/artists/`);

        if (!res.ok) throw new Error("API Error");

        return await res.json();

    },

    async getArtist(id) {

        const res = await fetch(`${this.BASE_URL}/artists/${id}/`);

        if (!res.ok) throw new Error("API Error");

        return await res.json();

    },

    async getArtistSongs(id) {

        const res = await fetch(`${this.BASE_URL}/artists/${id}/songs/`);

        if (!res.ok) throw new Error("API Error");

        return await res.json();

    },

    async getAlbums(){

    const res = await fetch(`${this.BASE_URL}/albums/`);

    if(!res.ok) throw new Error("API Error");

    return await res.json();

},

async getAlbum(id){

    const res = await fetch(`${this.BASE_URL}/albums/${id}/`);

    if(!res.ok) throw new Error("API Error");

    return await res.json();

},

async getAlbumSongs(id){

    const res = await fetch(`${this.BASE_URL}/albums/${id}/songs/`);

    if(!res.ok) throw new Error("API Error");

    return await res.json();

},
async addFavorite(songId){

    const token = localStorage.getItem("access");

    const res = await fetch(`${this.BASE_URL}/favorites/`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },

        body:JSON.stringify({
            song:songId
        })

    });

    const data = await res.json();

    console.log(res.status, data);

    return data;
},
async getFavorites(){

    const token = localStorage.getItem("access");

    const res = await fetch(`${this.BASE_URL}/favorites/`,{
        headers:{
            "Authorization":"Bearer " + token
        }
    });

    const data = await res.json();

    console.log("Status:", res.status);
    console.log("Favorites:", data);

    return data;
},
async removeFavorite(id){

    const token = localStorage.getItem("access");

    const res = await fetch(`${this.BASE_URL}/favorites/${id}/`,{

        method:"DELETE",

        headers:{
            "Authorization":"Bearer "+token
        }

    });

    return res.ok;

},

async downloadSong(id) {

    const token = localStorage.getItem("access");

    if (!token) {

        alert("برای دانلود ابتدا وارد حساب شوید.");

        location.href = "login.html";

        return;

    }

    const res = await fetch(
        `${this.BASE_URL}/songs/${id}/download/`,
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );

    if (res.status === 401) {

        alert("ابتدا وارد حساب شوید.");

        location.href = "login.html";

        return;

    }

    if (!res.ok) {

        alert("خطا در دانلود");

        return;

    }

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    // a.download = "";
    a.download = currentSong.title + ".mp3";

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);

},
};
console.log("API BASE =", API.BASE_URL);

