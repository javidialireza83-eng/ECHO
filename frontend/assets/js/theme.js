const btn=document.getElementById("themeToggle");

function applyTheme(theme){

    if(theme==="dark"){

        document.body.classList.add("dark");

        btn.textContent="☀️";

    }else{

        document.body.classList.remove("dark");

        btn.textContent="🌙";

    }

}

// let theme=localStorage.getItem("theme") || "light";
let theme = localStorage.getItem("theme") || "dark";

applyTheme(theme);

btn.addEventListener("click",()=>{

    theme=theme==="light"?"dark":"light";

    localStorage.setItem("theme",theme);

    applyTheme(theme);

});