function isLoggedIn() {

    return localStorage.getItem("access") !== null;

}

function logout() {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    location.href = "login.html";

}

function protectPage() {

    if (!isLoggedIn()) {

        location.href = "login.html";

    }

}