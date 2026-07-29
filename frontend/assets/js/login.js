const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.onsubmit = async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const res = await fetch("http://127.0.0.1:8000/api/token/", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    });

    const data = await res.json();

    if (res.ok) {

        localStorage.setItem("access", data.access); 
        localStorage.setItem("refresh", data.refresh);

        msg.innerHTML = "✅ Login Successful";

        setTimeout(() => {

            location.href = "music.html";

        }, 1000);

    } else {

        msg.innerHTML = "❌ Username or Password is incorrect";

    }

};