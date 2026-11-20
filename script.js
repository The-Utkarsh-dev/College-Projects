// 1. Dark / light mode
var themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeBtn.innerText = "Light mode";
    } else {
        themeBtn.innerText = "Dark mode";
    }
};

// 2. Greeting changes with the time of day
var hour = new Date().getHours();
var greeting = "Good evening, I’m";
if (hour < 12) {
    greeting = "Good morning, I’m";
} else if (hour < 17) {
    greeting = "Good afternoon, I’m";
}
document.getElementById("greeting").innerText = greeting;

// 3. Back-to-top button shows only after scrolling down
var topBtn = document.getElementById("topBtn");
window.onscroll = function () {
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
};

// 4. Contact form validation
var form = document.getElementById("contactForm");

form.onsubmit = function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var ok = true;

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("messageError").innerText = "";
    document.getElementById("success").innerText = "";

    if (name === "") {
        document.getElementById("nameError").innerText = "Please enter your name.";
        ok = false;
    }
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        document.getElementById("emailError").innerText = "Please enter a valid email.";
        ok = false;
    }
    if (message.length < 10) {
        document.getElementById("messageError").innerText = "Message should be at least 10 characters.";
        ok = false;
    }

    if (ok) {
        document.getElementById("success").innerText = "Thanks " + name + ", your message was sent!";
        form.reset();
    }
};