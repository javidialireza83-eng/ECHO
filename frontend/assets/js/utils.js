// assets/js/utils.js

function formatTime(sec){

    if(isNaN(sec)) return "00:00";

    const m=Math.floor(sec/60);

    const s=Math.floor(sec%60);

    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

}

function getQuery(name){

    return new URLSearchParams(location.search).get(name);

}