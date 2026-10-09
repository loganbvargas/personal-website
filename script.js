console.log("JavaScript is connected!");

const projectCards = document.querySelectorAll(".project-card");


projectCards.forEach(function(card) {
    card.addEventListener("click", function() {
        if (isAnimating) {
            return;
        }
        if (expandedCard === card) {
            card.classList.remove("expanded", "filling");
            projectTrack.classList.remove("showcase-open");
            projectCarousel.classList.remove("has-expanded-card");
            expandedCard = null;
            return;
        }
        if (expandedCard !== null) {
            return;
        }

        card.classList.add("expanded", "filling");
        projectTrack.classList.add("showcase-open");
        projectCarousel.classList.add("has-expanded-card");

        expandedCard = card;
    });
});

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const projectTrack = document.querySelector(".project-track");
const projectCarousel = document.querySelector(".project-carousel");
let isAnimating = false;
let direction = "";
let expandedCard = null;

nextButton.addEventListener("click", function() {
    if (isAnimating || expandedCard !== null) {
    return;
    }

    isAnimating = true;
    direction = "next";

    const cardWidth = projectCards[0].getBoundingClientRect().width;
    const gap = 20;

    projectTrack.style.transform = `translateX(-${cardWidth + gap}px)`;
});

projectTrack.addEventListener("transitionend", function(event) {
    if (event.target !== projectTrack ||
        event.propertyName !== "transform" ||
        !isAnimating) {
        return;
    }

    if (direction === "next") {
        projectTrack.style.transition = "none";

        projectTrack.appendChild(projectTrack.firstElementChild);

        projectTrack.style.transform = "translateX(0)";

        void projectTrack.offsetWidth;

        projectTrack.style.transition = "";
    }

    direction = "";
    isAnimating = false;
});

prevButton.addEventListener("click", function() {
    if (isAnimating || expandedCard !== null) {
        return;
    }
    isAnimating = true;
    direction = "prev";

    const cardWidth = projectCards[0].getBoundingClientRect().width;
    const gap = 20;

    projectTrack.style.transition = "none";

    projectTrack.prepend(projectTrack.lastElementChild);

    projectTrack.style.transform = `translateX(-${cardWidth + gap}px)`;

    void projectTrack.offsetWidth;

    projectTrack.style.transition = "";

    projectTrack.style.transform = "translateX(0)";
});

const emailLink = document.getElementById("email-link");
const emailFallback = document.getElementById("email-fallback");
const copyEmailButton = document.getElementById("copy-email");

emailLink.addEventListener("click", () => {
    setTimeout(() => {
        emailFallback.hidden = false;
    }, 1500);
});

copyEmailButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText("contact@loganbvargas.com");
        copyEmailButton.textContent = "Copied!";
    } catch (error) {
        copyEmailButton.textContent = "Copy failed";
    }
});