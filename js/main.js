//   hanlde navbar functionality
let showNavbar = false;

const openNavbar = () => {
  $(".slide-nav").css("left", 0);
  $("#toggleNav").children()[0].remove();
  $("#toggleNav").append(`<i class="fa-solid fa-xmark"></i>`);
};

const closeNavbar = () => {
  $(".slide-nav").css("left", -235);
  $("#toggleNav").children()[0].remove();
  $("#toggleNav").append(`<i class="fa-solid fa-align-justify"></i>`);
};

$("#toggleNav").on("click", () => {
  if (showNavbar) {
    closeNavbar();
    showNavbar = false;
  } else {
    openNavbar();
    showNavbar = true;
  }
});

//  A reusable function for fetch data from the api
const fetchData = (api) => {
  $(".loading").css("display", "flex");

  closeNavbar();
  $.get(api, (data) => {
    const movies = data.results;

    if (movies.length > 0) {
      $(".data").empty();

      movies.forEach((movie) => {
        const rates = movie.vote_average.toString().split(".");

        $(".data").append(`
            <div class="col-lg-4 col-md-6 col-sm-12 rounded overflow-hidden movie">
              <div class="movie-img overflow-hidden rounded">
                <img
                  class="w-100"
                  src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                  alt="${movie.title}"
                />
              </div>

              <div class="overlay-details">
                <h1 class="movie-name">${movie.title}</h1>
                <p class="movie-desc">
                  ${movie.overview}
                </p>
                <p class="release-data">Release Date: <span>${
                  movie.release_date
                }</span></p>
                <p class="rate">
                ${handleRates(rates)}
                  <i class="fa-solid fa-star text-warning fs-6"></i>
                  <i class="fa-solid fa-star text-warning fs-6"></i>
                  <i class="fa-solid fa-star text-warning fs-6"></i>
                </p>

                <h4 class="vote">${movie.vote_average.toFixed(1)}</h4>
            </div>
            `);
      });
    } else {
      $(".data").empty();

      $(".data").append(`<h3 class="text-center p-3">No Movies found</h3>`);
    }
  });
  $(".loading").css("display", "none");
};

const handleRates = (rates) => {
  let allRate = [];

  const rate = rates[0] - 6;

  for (let i = 0; i < rate; i++) {
    allRate.push(`<i class="fa-solid fa-star text-warning fs-6"></i>`);
  }

  return allRate.join("");
};

const getPopuler = () => {
  window.scroll(0, 0);
  fetchData(
    "https://api.themoviedb.org/3/movie/popular?api_key=7031d952904f544b4ca025b5270e9df6"
  );
};

getPopuler();

const getNowPlaying = () => {
  window.scroll(0, 0);

  fetchData(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=7031d952904f544b4ca025b5270e9df6"
  );
};

const getTopRated = () => {
  window.scroll(0, 0);

  fetchData(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=7031d952904f544b4ca025b5270e9df6"
  );
};

const getTrending = () => {
  window.scroll(0, 0);

  fetchData(
    "https://api.themoviedb.org/3/trending/all/day?api_key=7031d952904f544b4ca025b5270e9df6"
  );
};

const getUpcoming = () => {
  window.scroll(0, 0);

  fetchData(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=7031d952904f544b4ca025b5270e9df6"
  );
};

// scroll to top functionality
const handleScrollTop = () => {
  window.scroll(0, 0);
};

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 100) {
    $(".scroll-to-top").css("opacity", 1);
    $(".scroll-to-top").css("visibility", "visible");
  } else {
    $(".scroll-to-top").css("opacity", 0);
    $(".scroll-to-top").css("visibility", "hidden");
  }
});
handleScrollTop();

let isShown = false;
$(".show-password").on("click", () => {
  isShown = !isShown;
  if (isShown) {
    $("#password").attr("type", "text");
    $(".show-password").children()[0].remove();
    $(".show-password").append("<i  class='fa-solid fa-eye'></i>");
  } else {
    $("#password").attr("type", "password");
    $(".show-password").children()[0].remove();
    $(".show-password").append("<i  class='fa-solid fa-eye-slash'></i>");
  }
});

// handle search functionalty
const handleSearch = (value) => {
  if (value) {
    fetchData(
      `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=7031d952904f544b4ca025b5270e9df6`
    );
  } else {
    getPopuler();
  }
};

// form validation
const handleNameVaildation = (name) => {
  checkAreValid();

  var regex = /^[a-zA-Z]+$/;
  if (regex.test(name) && name.length < 40) {
    $("#error-name").removeClass("d-block");
    $("#name").css("border-bottom", "1px solid #ccc");
  } else {
    $("#error-name").addClass("d-block");
    $("#name").css("border-bottom", "1px solid red");
  }
};

const checkAreValid = () => {
  if ($(".error").hasClass("d-block")) {
    $("#btn-submit").addClass("btn-danger").removeClass("btn-dark");
  } else {
    $("#btn-submit").addClass("btn-dark").removeClass("btn-danger");
  }
};

const handleEmail = (email) => {
  checkAreValid();
  // Regular expression for a valid email address
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    $("#error-email").removeClass("d-block");
    $("#email").css("border-bottom", "1px solid #ccc");
  } else {
    $("#error-email").addClass("d-block");
    $("#email").css("border-bottom", "1px solid red");
  }
};

const handlePhone = (phone) => {
  checkAreValid();
  let phoneNumberRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (phoneNumberRegex.test(phone)) {
    $("#error-phone").removeClass("d-block");
    $("#phone").css("border-bottom", "1px solid #ccc");
  } else {
    $("#error-phone").addClass("d-block");
    $("#phone").css("border-bottom", "1px solid red");
  }
};

const handleAge = (age) => {
  checkAreValid();
  if (age > 15) {
    $("#error-age").removeClass("d-block");
    $("#age").css("border-bottom", "1px solid #ccc");
  } else {
    $("#error-age").addClass("d-block");
    $("#age").css("border-bottom", "1px solid red");
  }
};

let userPassword;
const handlePassword = (password) => {
  checkAreValid();
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (passwordRegex.test(password)) {
    userPassword = password;
    $("#error-password").removeClass("d-block");
    $("#password").css("border-bottom", "1px solid #ccc");
  } else {
    $("#error-password").addClass("d-block");
    $("#password").css("border-bottom", "1px solid red");
  }
};

const handleRepassword = (repassword) => {
  checkAreValid();
  if (userPassword == repassword) {
    $("#error-repassword").removeClass("d-block");
    $("#repassword").css("border-bottom", "1px solid #ccc");
  } else {
    $("#error-repassword").addClass("d-block");
    $("#repassword").css("border-bottom", "1px solid red");
  }
};
