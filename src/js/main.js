$(function () {
    // Mail
    $("#form").submit(function () {
        // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
        if (document.form.name.value == "" || document.form.email.value == "") {
            valid = false;
            console.log(error);
            return valid;
        }
        $.ajax({
            type: "POST",
            url: "php/main.php",
            data: $(this).serialize(),
        }).done(function () {
            // $("#modal_thanks").addClass("show");
            // setTimeout(function () {
            //     $("#modal_thanks")
            //         .find(".modal__dialog--thanks")
            //         .css({ transform: "scale(1)", opacity: "1" });
            // }, 100);
            // $("body").addClass("no-scroll");
            $(this).find("input").val("");
            $("#form").trigger("reset");
        });
        return false;
    });

    // Slider https://kenwheeler.github.io/slick/
    $("#introSlider").slick({
        infinite: true,
        accessibility: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        fade: true,
        cssEase: "linear",
        adaptiveHeight: false,
        centerMode: true,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    /*!
     * AOS.js
     * https://michalsnik.github.io/aos/
     */
    /* Animate On Scroll
     * ------------------------------------------------------ */
    AOS.init({
        offset: 150,
        duration: 600,
        easing: "lianer",
        delay: 100,
        // once: true,
        disable: "mobile",
    });

    // Preloader
    $(window).on("load", function () {
        // force page scroll position to top at page refresh
        $("html, body").animate({ scrollTop: 0 }, "normal");

        // will first fade out the loading animation
        $("#loader").fadeOut("slow", function () {
            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(200).fadeOut("slow");
        });
    });
});

////tabs
let tabsNavLinks = document.body.querySelectorAll("[data-tabs-target]");

for (let link of tabsNavLinks) {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        tabsNavLinks.forEach((a) => {
            a.classList.remove("active");
        });

        link.classList.add("active");

        let tabId = link.dataset.tabsTarget;

        document.body.querySelectorAll(".tabs__panel").forEach((e) => {
            e.classList.remove("active");
        });
        document.body.querySelector(`#${tabId}`).classList.add("active");
    });
}
/////////////////////////

// menu nav toggle
let menuToggleBtn = document.body.querySelector("#nav_toggle");

menuToggleBtn.addEventListener("click", (event) => {
    event.preventDefault();

    menuToggleBtn.querySelector("#nav-toggle__btn").classList.toggle("active");

    document.body.querySelector("#nav").classList.toggle("active");
});
//////////////////////////

// Smooth scroll
const navLinks = document.querySelectorAll("#nav ul a");

for (const link of navLinks) {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const href = link.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;

        scroll({
            top: offsetTop,
            behavior: "smooth",
        });

        document.body
            .querySelector("#nav-toggle__btn")
            .classList.remove("active");

        document.body.querySelector("#nav").classList.remove("active");
    });
}

// for (const link of navLinks) {
//     link.addEventListener("click", clickHandler);
// }

// function clickHandler(e) {
//     e.preventDefault();
//     const href = this.getAttribute("href");
//     const offsetTop = document.querySelector(href).offsetTop;

//     scroll({
//       top: offsetTop,
//       behavior: "smooth"
//     });
//   }


///scroll to top btn
let scrollPos = window.scrollY;
const scrollToTopBtn = document.body.querySelector("#scrollToTop");

window.addEventListener("scroll", () => {
    scrollPos = window.scrollY;

    checkScroll(scrollPos, scrollToTopBtn);
})

function checkScroll(scrollPos, btn) {
    let showPoint = document.body.querySelector("#intro").scrollHeight;

    if (scrollPos > showPoint) {
        btn.classList.add("show")
    } else {
        btn.classList.remove("show")
    }
}

scrollToTopBtn.addEventListener("click", (event) => {
    event.preventDefault();

    scroll({
        top: 0,
        behavior: "smooth",
    })
})
/////////////////////