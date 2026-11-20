// sample movie data
var movies = [
    { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, poster: "poster1.jpg", desc: "A thief enters dreams to plant an idea." },
    { id: 2, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, poster: "poster2.jpg", desc: "Batman faces the Joker in Gotham." },
    { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.7, poster: "poster3.jpg", desc: "Astronauts travel through a wormhole to save humanity." },
    { id: 4, title: "Spirited Away", year: 2001, genre: "Animation", rating: 8.6, poster: "poster4.jpg", desc: "A girl gets trapped in a world of spirits." },
    { id: 5, title: "Your Name", year: 2016, genre: "Animation", rating: 8.4, poster: "poster5.jpg", desc: "Two strangers mysteriously swap bodies." },
    { id: 6, title: "Parasite", year: 2019, genre: "Thriller", rating: 8.5, poster: "poster6.jpg", desc: "A poor family slowly enters a rich family’s home." },
    { id: 7, title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3, poster: "poster7.jpg", desc: "Two prisoners build a friendship over many years." },
    { id: 8, title: "Dune", year: 2021, genre: "Sci-Fi", rating: 8.0, poster: "poster8.jpg", desc: "A young heir is sent to a dangerous desert planet." },
    { id: 9, title: "Spider-Man: Into the Spider-Verse", year: 2018, genre: "Animation", rating: 8.4, poster: "poster9.jpg", desc: "Miles Morales meets Spider-People from other worlds." },
    { id: 10, title: "The Godfather", year: 1972, genre: "Crime", rating: 9.2, poster: "poster10.jpg", desc: "The story of a powerful mafia family." },
    { id: 11, title: "3 Idiots", year: 2009, genre: "Comedy", rating: 8.4, poster: "poster11.jpg", desc: "Three friends and their journey through engineering college." },
    { id: 12, title: "Dangal", year: 2016, genre: "Drama", rating: 8.3, poster: "poster12.jpg", desc: "A father trains his daughters to become wrestlers." }
];

var favourites = [];       // list of favourite movie ids
var currentGenre = "All";

// load saved favourites from the browser (if any)
var saved = localStorage.getItem("favourites");
if (saved) {
    favourites = JSON.parse(saved);
}

// makes the html for one movie card
function makeCard(movie) {
    var isFav = favourites.indexOf(movie.id) !== -1;
    var btnText = isFav ? "♥ Saved" : "♡ Add to favourites";
    var btnClass = isFav ? "heart saved" : "heart";

    return '<div class="movie">' +
        '<div class="poster">' +
        '<img src="' + movie.poster + '" alt="' + movie.title + '">' +
        '<span class="rating">★ ' + movie.rating + '</span>' +
        '</div>' +
        '<h3>' + movie.title + '</h3>' +
        '<p class="small">' + movie.year + ' | ' + movie.genre + '</p>' +
        '<p class="desc">' + movie.desc + '</p>' +
        '<button class="' + btnClass + '" onclick="toggleFav(' + movie.id + ')">' + btnText + '</button>' +
        '</div>';
}

// all movies, with search and genre filter
function showMovies() {
    var text = document.getElementById("searchBox").value.toLowerCase();
    var html = "";

    for (var i = 0; i < movies.length; i++) {
        var m = movies[i];
        var matchName = m.title.toLowerCase().indexOf(text) !== -1;
        var matchGenre = (currentGenre === "All") || (m.genre === currentGenre);

        if (matchName && matchGenre) {
            html += makeCard(m);
        }
    }

    document.getElementById("movieGrid").innerHTML = html;
    if (html === "") {
        document.getElementById("noResult").innerText = "No movies found, try another search.";
    } else {
        document.getElementById("noResult").innerText = "";
    }
}

// favourites list
function showFavourites() {
    var html = "";
    for (var i = 0; i < movies.length; i++) {
        if (favourites.indexOf(movies[i].id) !== -1) {
            html += makeCard(movies[i]);
        }
    }
    document.getElementById("favGrid").innerHTML = html;

    if (html === "") {
        document.getElementById("favMessage").innerText = "Nothing here yet. Click the heart on a movie to save it.";
    } else {
        document.getElementById("favMessage").innerText = "";
    }
    document.getElementById("favCount").innerText = favourites.length;
}

// recommendations: same genres as the favourites, otherwise top rated
function showRecommended() {
    var favGenres = [];
    for (var i = 0; i < movies.length; i++) {
        if (favourites.indexOf(movies[i].id) !== -1) {
            favGenres.push(movies[i].genre);
        }
    }

    var list = [];
    for (var j = 0; j < movies.length; j++) {
        var m = movies[j];
        if (favourites.indexOf(m.id) === -1) {
            if (favGenres.length === 0 || favGenres.indexOf(m.genre) !== -1) {
                list.push(m);
            }
        }
    }

    // highest rating first
    list.sort(function (a, b) { return b.rating - a.rating; });
    list = list.slice(0, 4);

    var html = "";
    for (var k = 0; k < list.length; k++) {
        html += makeCard(list[k]);
    }
    document.getElementById("recGrid").innerHTML = html;

    if (favGenres.length === 0) {
        document.getElementById("recMessage").innerText = "Top rated movies to start with. Save some favourites to get better picks.";
    } else {
        document.getElementById("recMessage").innerText = "Picked because you liked: " + favGenres.join(", ");
    }
}

// add or remove a favourite
function toggleFav(id) {
    var index = favourites.indexOf(id);
    if (index === -1) {
        favourites.push(id);
    } else {
        favourites.splice(index, 1);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
    refresh();
}

// change genre filter
function setGenre(genre) {
    currentGenre = genre;
    var buttons = document.getElementsByClassName("genre");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText === genre) {
            buttons[i].classList.add("active");
        } else {
            buttons[i].classList.remove("active");
        }
    }
    showMovies();
}

function refresh() {
    showMovies();
    showFavourites();
    showRecommended();
}

// search while typing
document.getElementById("searchBox").oninput = showMovies;

refresh();
