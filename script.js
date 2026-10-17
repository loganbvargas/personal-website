console.log("JavaScript is connected!");

const projectCards = document.querySelectorAll(".project-card");
if (projectCards.length > 0) {


    projectCards.forEach(function (card) {
        card.addEventListener("click", function () {
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

    const projectsSection = document.getElementById("projects");

    if (projectsSection) {
        const projectsObserver = new IntersectionObserver(function (entries) {
            const entry = entries[0];

            if (!entry.isIntersecting && expandedCard !== null) {
                expandedCard.classList.remove("expanded", "filling");
                projectTrack.classList.remove("showcase-open");
                projectCarousel.classList.remove("has-expanded-card");

                expandedCard = null;
            }
        }, {
            threshold: 0
        });

        projectsObserver.observe(projectsSection);
    }


    nextButton.addEventListener("click", function () {
        if (isAnimating || expandedCard !== null) {
            return;
        }

        isAnimating = true;
        direction = "next";

        const cardWidth = projectCards[0].getBoundingClientRect().width;
        const gap = 20;

        projectTrack.style.transform = `translateX(-${cardWidth + gap}px)`;
    });

    projectTrack.addEventListener("transitionend", function (event) {
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

    prevButton.addEventListener("click", function () {
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
}
const emailLink = document.getElementById("email-link");
const emailFallback = document.getElementById("email-fallback");
const copyEmailButton = document.getElementById("copy-email");

if (emailLink && emailFallback && copyEmailButton) {
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
}
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});
