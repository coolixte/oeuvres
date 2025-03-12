document.addEventListener("DOMContentLoaded", () => {
    const heightSlider = document.getElementById("height-slider");
    const artworkImage = document.querySelector(".artwork-display img");

    // Initialize with stored value or default
    const storedHeight = localStorage.getItem("artworkHeight") || "450";
    heightSlider.value = storedHeight;
    updateHeight(storedHeight);

    heightSlider.addEventListener("input", (e) => {
        updateHeight(e.target.value);
    });

    heightSlider.addEventListener("change", (e) => {
        // Save to localStorage when user finishes dragging
        localStorage.setItem("artworkHeight", e.target.value);
    });

    function updateHeight(height) {
        artworkImage.style.height = `${height}px`;
    }
}); 