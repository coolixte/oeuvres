document.addEventListener("DOMContentLoaded", () => {
    const scrollIndicator = document.getElementById("scroll-indicator");

    // Check scroll position and hide/show indicator
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollPosition >= documentHeight - 100) { // -100 for some threshold
            scrollIndicator.classList.add("hidden");
        } else {
            scrollIndicator.classList.remove("hidden");
        }
    });

    // Optional: Scroll down when clicking the indicator
    scrollIndicator.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });
}); 