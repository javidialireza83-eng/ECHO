const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {

        alert("Passwords do not match.");

        return;

    }

    try {

        const response = await fetch(`${API.BASE_URL}/register/`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                email,
                password
            })

        });

        // if (response.ok) {

        //     alert("Account created successfully 🎉");

        //     window.location.replace("login.html");

        //     return;

        // }
          if (response.ok) {

    console.log("SUCCESS");

    window.location.replace("login.html");

    return;

}
        const data = await response.json();

        let message = "";

        Object.keys(data).forEach(key => {

            message += `${key}: ${data[key]}\n`;

        });

        alert(message || "Registration failed.");

    }

    catch (err) {

        console.error(err);

        alert("Server Error");

    }

});