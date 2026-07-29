/*=========================================
Typing Effect
=========================================*/

const typing = document.querySelector(".typing");

if (typing) {

    const text = "Full Stack Django Developer";

    let i = 0;

    function type() {

        if (i < text.length) {

            typing.textContent += text.charAt(i);

            i++;

            setTimeout(type, 70);

        }

    }

    typing.textContent = "";

    type();

}

/*=========================================
Reveal Animation
=========================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("show");

});
/*=========================================
Counter Animation
=========================================*/

function counter(id,target){

    const el=document.getElementById(id);

    if(!el) return;

    let value=0;

    const speed=Math.ceil(target/60);

    const timer=setInterval(()=>{

        value+=speed;

        if(value>=target){

            value=target;

            clearInterval(timer);

        }

        el.textContent=value;

    },20);

}

window.addEventListener("load",()=>{

    counter("projectsCount",2);

    counter("skillsCount",3);

    counter("experienceCount",2);

    counter("coffeeCount",1200);

});