document.addEventListener("DOMContentLoaded", function () {

    const footerYear = document.querySelector("#year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    const sections = document.querySelectorAll(
        "main section, main article"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        sections.forEach(function (section) {
            section.classList.add("reveal");
            observer.observe(section);
        });
    }

    const contactForm = document.querySelector("#contact form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const subject =
                document.querySelector("#subject").value.trim() ||
                "Website enquiry";
            const message =
                document.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                alert("Please complete all required fields.");
                return;
            }

            const recipient = "REPLACE_WITH_CONFIRMED_EMAIL";

            if (recipient === "REPLACE_WITH_CONFIRMED_EMAIL") {
                alert(
                    "Your form is valid. Please configure the company's " +
                    "confirmed email address in script.js before using it."
                );
                return;
            }

            const emailSubject = encodeURIComponent(subject);
            const emailBody = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                "Message:\n" + message
            );

            window.location.href =
                "mailto:" + recipient +
                "?subject=" + emailSubject +
                "&body=" + emailBody;
        });
    }

    const topButton = document.querySelector("#backToTop");

    if (topButton) {
        window.addEventListener("scroll", function () {
            topButton.hidden = window.scrollY < 300;
        });

        topButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    console.log(
        "L Majola & Associates | Website loaded successfully."
    );

});
