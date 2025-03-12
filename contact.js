document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            // Let the form submit normally to Formspree
            setTimeout(() => {
                // Clear all input fields after submission
                const inputs = contactForm.querySelectorAll("input, textarea");
                inputs.forEach(input => input.value = "");
            }, 100);
        });
    }
}); 