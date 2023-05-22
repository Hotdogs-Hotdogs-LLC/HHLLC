function toggle_submenu() {
    var x = document.getElementById("sub_menu");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function toggle_menu() {
    var x = document.getElementById("nav-links");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("sub_menu").style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function checkViewport() {
    if (window.innerWidth <= 767) {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("desktop-nav").style.display = "none";
        document.getElementById("mobile-nav").style.display = "block";
    } else {
        document.getElementById("menu").style.display = "none";
        document.getElementById("desktop-nav").style.display = "block";
        document.getElementById("mobile-nav").style.display = "none";
    }
}

window.addEventListener('DOMContentLoaded', checkViewport);
window.addEventListener('resize', checkViewport);

const hamMenu = document.querySelector('#menu');
hamMenu.addEventListener('click', () => {
    toggle_menu();
});

const subMenu = document.querySelector('#sub_opener');
subMenu.addEventListener('click', () => {
    toggle_submenu();
});
