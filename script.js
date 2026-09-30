const links = document.querySelectorAll(".contact-item");

links.forEach(link => {

    link.addEventListener("click", () => {

        link.style.transform = "scale(.98)";

        setTimeout(() => {
            link.style.transform = "";
        }, 120);

    });

});
"use strict";

/* ================================
   AMIR HOSSEIN PERSONAL WEBSITE
   Main JavaScript
================================ */


/* --------------------------------
   DOM ELEMENTS
-------------------------------- */

const card = document.querySelector(".card");
const avatar = document.querySelector(".avatar");
const profileImage = document.querySelector(".avatar img");

const contactLinks = document.querySelectorAll(".contact-item");

const emailLink = document.querySelector(
    '.contact-item[href^="mailto:"]'
);

const profileText = document.querySelector(".username");


/* --------------------------------
   PAGE LOAD ANIMATION
-------------------------------- */

document.body.classList.add("loading");

window.addEventListener("load", () => {

    setTimeout(() => {
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
    }, 200);

});


/* --------------------------------
   MOUSE 3D EFFECT
-------------------------------- */

if (card) {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-2px)
        `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
        `;

    });

}


/* --------------------------------
   CONTACT CLICK ANIMATION
-------------------------------- */

contactLinks.forEach((link) => {

    link.addEventListener("click", () => {

        link.classList.add("clicked");

        setTimeout(() => {
            link.classList.remove("clicked");
        }, 180);

    });

});


/* --------------------------------
   COPY EMAIL
-------------------------------- */

if (emailLink) {

    emailLink.addEventListener("click", async (event) => {

        event.preventDefault();

        const email =
            emailLink
                .getAttribute("href")
                .replace("mailto:", "");

        try {

            await navigator.clipboard.writeText(email);

            showToast("ایمیل کپی شد ✓");

        } catch (error) {

            window.location.href =
                `mailto:${email}`;

        }

    });

}


/* --------------------------------
   TOAST SYSTEM
-------------------------------- */

function showToast(message) {

    const oldToast =
        document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);


    requestAnimationFrame(() => {
        toast.classList.add("show");
    });


    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2200);

}


/* --------------------------------
   TYPING EFFECT
-------------------------------- */

const typingElement =
    document.querySelector(".typing");

const typingTexts = [

    "Greco-Roman Wrestler",

    "Developer",

    "Web Creator",

    "Python Learner"

];

let textIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement) {
        return;
    }


    const currentText =
        typingTexts[textIndex];


    if (!deleting) {

        characterIndex++;

        typingElement.textContent =
            currentText.substring(
                0,
                characterIndex
            );


        if (
            characterIndex ===
            currentText.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1400
            );

            return;
        }

    } else {

        characterIndex--;

        typingElement.textContent =
            currentText.substring(
                0,
                characterIndex
            );


        if (characterIndex === 0) {

            deleting = false;

            textIndex++;

            if (
                textIndex >=
                typingTexts.length
            ) {
                textIndex = 0;
            }

        }

    }


    const speed =
        deleting ? 45 : 80;

    setTimeout(
        typeEffect,
        speed
    );

}


typeEffect();


/* --------------------------------
   ONLINE STATUS
-------------------------------- */

function updateOnlineStatus() {

    const onlineDot =
        document.querySelector(".online");

    if (!onlineDot) {
        return;
    }


    if (navigator.onLine) {

        onlineDot.classList.add("active");

        onlineDot.title =
            "Online";

    } else {

        onlineDot.classList.remove("active");

        onlineDot.title =
            "Offline";

    }

}


window.addEventListener(
    "online",
    updateOnlineStatus
);

window.addEventListener(
    "offline",
    updateOnlineStatus
);

updateOnlineStatus();


/* --------------------------------
   CURRENT YEAR
-------------------------------- */

const yearElement =
    document.querySelector(".current-year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* --------------------------------
   PROFILE IMAGE ERROR HANDLING
-------------------------------- */

if (profileImage) {

    profileImage.addEventListener(
        "error",
        () => {

            avatar.classList.add(
                "image-error"
            );

            avatar.innerHTML = "A";

            showToast(
                "عکس پروفایل پیدا نشد"
            );

        }
    );

}


/* --------------------------------
   IMAGE LAZY LOADING
-------------------------------- */

if (profileImage) {

    profileImage.loading = "lazy";

    profileImage.decoding = "async";

}


/* --------------------------------
   KEYBOARD SHORTCUTS
-------------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        /* ESC */

        if (event.key === "Escape") {

            card?.blur();

        }


        /* C = Contact */

        if (
            event.key.toLowerCase() === "c" &&
            !event.ctrlKey &&
            !event.metaKey
        ) {

            document
                .querySelector(".contact")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);


/* --------------------------------
   SMOOTH CONTACT SCROLL
-------------------------------- */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    });


/* --------------------------------
   REDUCED MOTION SUPPORT
-------------------------------- */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}


/* --------------------------------
   PAGE VISIBILITY
-------------------------------- */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.title =
                "برگرد امیر 👀";

        } else {

            document.title =
                "Amir Hossein";

        }

    }
);


/* --------------------------------
   LOCAL STORAGE
-------------------------------- */

const visitKey =
    "amir_site_visit_count";

let visits =
    Number(
        localStorage.getItem(
            visitKey
        )
    ) || 0;

visits++;

localStorage.setItem(
    visitKey,
    visits
);


/* --------------------------------
   DEBUG
-------------------------------- */

console.log(
    "%cAMIR HOSSEIN",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Wrestler × Developer"
);

console.log(
    `Visit #${visits}`
);