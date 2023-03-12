/* Hiding some posts */
// document.getElementById("article-ARTICLE_NAME").style.display = "none";
// document.getElementById("swiper-ARTICLE_NAME").style.display = "none";

let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");

toggle.addEventListener("click", function() {
    collapse.forEach(col => col.classList.toggle("collapse-toggle"));
});

new Masonry("#posts .grid", {
    itemSelector: ".grid-item",
    gutter: 20,
});

new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 10,
    autoplay: {delay: 3000},
    breakpoints: {
        "@0": {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        "@1.00": {
            slidesPerView: 6,
            spaceBetween: 10,
        },
        "@1.25": {
            slidesPerView: 8,
            spaceBetween: 10,
        },
        "@1.50": {
            slidesPerView: 10,
            spaceBetween: 10,
        },
    },
});
