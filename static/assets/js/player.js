/*=========================================
ECHO Player v2
=========================================*/

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const volume = document.getElementById("volume");

let isDragging = false;

const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");

const thumb = document.getElementById("progressThumb");

const currentEl = document.getElementById("current");
const durationEl =
document.getElementById("durationPlayer") ||
document.getElementById("duration");

const coverEl = document.getElementById("playerCover");
const titleEl = document.getElementById("playerTitle");
const artistEl = document.getElementById("playerArtist");

class Player{

    constructor(){

        this.list = [];

        this.index = -1;

        this.shuffle = false;

        this.repeat = false;

        this.bindEvents();

    }

    loadPlaylist(list){

    this.list = [...list];

    this.index = -1;

}
    get currentSong(){

        return this.list[this.index];

    }

     load(index){

    if(index < 0 || index >= this.list.length) return;

    this.index = index;

    const song = this.currentSong;

    audio.pause();

    audio.src = song.audio;

    coverEl.src = song.cover;

    titleEl.textContent = song.title;

    artistEl.textContent = song.artist.name;

    audio.load();

}

    play(index = this.index){

    if(index < 0) return;

    this.load(index);

    audio.play()
        .then(() => {
            playBtn.innerHTML = "❚❚";
            coverEl.classList.add("playing");
        })
        .catch(console.error);

} 

    pause(){

        audio.pause();

        playBtn.innerHTML = "▶";
        coverEl.classList.remove("playing");

    }

    toggle(){

        if(audio.paused){

            this.play();

        }else{

            this.pause();

        }

    }
    next() {

        if (this.list.length === 0) return;

        if (this.shuffle) {

            let random = Math.floor(Math.random() * this.list.length);

            while (random === this.index && this.list.length > 1) {
                random = Math.floor(Math.random() * this.list.length);
            }

            this.index = random;

        } else {

            this.index++;

            if (this.index >= this.list.length) {
                this.index = 0;
            }

        }

        this.load(this.index);
        audio.play();

    }

    prev() {

        if (this.list.length === 0) return;

        this.index--;

        if (this.index < 0) {
            this.index = this.list.length - 1;
        }

        this.load(this.index);
        audio.play();

    }

    updateProgress() {

        if(isDragging) return;

        if (!audio.duration) return;

        if (currentEl) {
            currentEl.textContent = formatTime(audio.currentTime);
        }

        if (durationEl) {
            durationEl.textContent = formatTime(audio.duration);
        }

        if (progress) {
            progress.style.width =
                (audio.currentTime / audio.duration) * 100 + "%";

                thumb.style.left = percent + "%";
        }

    }

    bindEvents() {

        audio.addEventListener("loadedmetadata", () => {

            if (durationEl) {
                durationEl.textContent = formatTime(audio.duration);
            }

        });

        audio.addEventListener("timeupdate", () => {

            this.updateProgress();

        });

        audio.addEventListener("ended", () => {

            if (this.repeat) {

                audio.currentTime = 0;
                audio.play();

            } else {

                this.next();

            }

        });

    }

}
/*=========================================
Create Player
=========================================*/

const player = new Player();

window.player = player;


/*=========================================
Play Button
=========================================*/

if (playBtn) {

    playBtn.addEventListener("click", () => {

        if (player.index === -1) {

            if (player.list.length > 0) {

                player.play(0);

            }

            return;

        }

        player.toggle();

    });

}


/*=========================================
Next
=========================================*/

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        player.next();

    });

}


/*=========================================
Previous
=========================================*/

if (prevBtn) {

    prevBtn.addEventListener("click", () => {

        player.prev();

    });

}


/*=========================================
Volume
=========================================*/

if (volume) {

    volume.addEventListener("input", () => {

        audio.volume = Number(volume.value);

    });

}


/*=========================================
Progress
=========================================*/

if (progressBar) {

    function updateSeek(e){

    if(!audio.duration) return;

    const rect = progressBar.getBoundingClientRect();

    let percent = (e.clientX - rect.left) / rect.width;

    percent = Math.max(0, Math.min(1, percent));

    progress.style.width = (percent * 100) + "%";

    thumb.style.left = percent*100 + "%";

    audio.currentTime = percent * audio.duration;

}

progressBar.addEventListener("mousedown",(e)=>{

    isDragging = true;

    updateSeek(e);

});

document.addEventListener("mousemove",(e)=>{

    if(!isDragging) return;

    updateSeek(e);

});

document.addEventListener("mouseup",()=>{

    isDragging = false;

});
}


/*=========================================
Shuffle
=========================================*/

if (shuffleBtn) {

    shuffleBtn.addEventListener("click", () => {

        player.shuffle = !player.shuffle;

        shuffleBtn.classList.toggle("active");

    });

}


/*=========================================
Repeat
=========================================*/

if (repeatBtn) {

    repeatBtn.addEventListener("click", () => {

        player.repeat = !player.repeat;

        repeatBtn.classList.toggle("active");

    });

}
/*=========================================
Highlight Playlist
=========================================*/

player.highlight = function () {

    const song = this.currentSong;

    if (!song) return;

    document.querySelectorAll(".play-item").forEach(item => {

        item.classList.remove("active");

    });

    const active = document.querySelector(
        `.play-item[data-id="${song.id}"]`
    );

    if (active) {

        active.classList.add("active");

        active.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }

};


/*=========================================
Override load()
=========================================*/

const oldLoad = player.load.bind(player);

player.load = function (index) {

    oldLoad(index);

    this.highlight();

};


/*=========================================
Keyboard
=========================================*/

document.addEventListener("keydown", e => {

    if (e.target.tagName === "INPUT") return;

    switch (e.code) {

        case "Space":

            e.preventDefault();

            player.toggle();

            break;

        case "ArrowRight":

            player.next();

            break;

        case "ArrowLeft":

            player.prev();

            break;

    }

});


/*=========================================
Remember Last Song
=========================================*/

audio.addEventListener("play", () => {

    localStorage.setItem(

        "echo-song",

        player.index

    );

});


window.addEventListener("load", () => {

    const last = localStorage.getItem("echo-song");

    if (last !== null) {

        player.index = Number(last);

    }

});