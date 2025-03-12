document.addEventListener("DOMContentLoaded", () => {
    // Track seen artworks in localStorage
    let seenArtworks = JSON.parse(localStorage.getItem("seenArtworks") || "[]");
    let currentArtwork = null;

    // Select random unseen artwork
    function getRandomArtwork() {
        const availableArtworks = oeuvres.filter(artwork => 
            !seenArtworks.includes(artwork.nomfichier)
        );
        
        // If we've seen all artworks, reset the seen list
        if (availableArtworks.length === 0) {
            seenArtworks = [];
            localStorage.setItem("seenArtworks", "[]");
            return oeuvres[Math.floor(Math.random() * oeuvres.length)];
        }
        
        return availableArtworks[Math.floor(Math.random() * availableArtworks.length)];
    }

    function displayArtwork() {
        currentArtwork = getRandomArtwork();
        
        // Display artwork info
        document.getElementById("artwork-author").textContent = currentArtwork.auteur;
        document.getElementById("artwork-title").textContent = currentArtwork.titre;
        document.getElementById("artwork-date").textContent = currentArtwork.date;
        
        // Display artwork image
        const artworkImage = document.getElementById("artwork-image");
        artworkImage.src = `oeuvres/${currentArtwork.nomfichier}`;
        artworkImage.alt = currentArtwork.titre;

        // Reset price reveal
        document.getElementById("price-reveal").style.display = "none";
        
        // Update button text if we've seen this artwork
        updateButtonState(false);
    }

    function updateButtonState(hasGuessed) {
        const guessButton = document.getElementById("guess-button");
        guessButton.textContent = hasGuessed ? "PROCHAINE ŒUVRE" : "DEVINER LE PRIX!";
    }

    // Initial artwork display
    displayArtwork();

    // Setup guess button
    const guessButton = document.getElementById("guess-button");
    const guessDialog = document.getElementById("guessDialog");
    const guessOverlay = document.getElementById("guessOverlay");
    const submitGuess = document.getElementById("submitGuess");
    const cancelGuess = document.getElementById("cancelGuess");
    const priceInput = document.getElementById("priceGuess");

    guessButton.addEventListener("click", () => {
        if (guessButton.textContent === "PROCHAINE ŒUVRE") {
            displayArtwork();
        } else {
            guessDialog.style.display = "block";
            guessOverlay.style.display = "block";
            priceInput.focus();
        }
    });

    submitGuess.addEventListener("click", handleGuess);
    cancelGuess.addEventListener("click", hideDialog);
    guessOverlay.addEventListener("click", hideDialog);

    priceInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleGuess();
        }
    });

    function hideDialog() {
        guessDialog.style.display = "none";
        guessOverlay.style.display = "none";
        priceInput.value = "";
    }

    function handleGuess() {
        const guessValue = parseInt(priceInput.value);
        if (guessValue) {
            hideDialog();
            
            // Calculate price difference
            const priceDifference = Math.abs(guessValue - currentArtwork.prix);
            
            // First set the content
            const priceRevealDiv = document.getElementById("price-reveal");
            priceRevealDiv.innerHTML = `
                Prix réel: <span id="actual-price">${currentArtwork.prix.toLocaleString('fr-FR')} €</span><br>
                —————————————————<br>
                <span class="price-difference">VOTRE ESTIMATION DE <span id="guess-price">${guessValue.toLocaleString('fr-FR')} €</span> EST À <span class="difference-value">${priceDifference.toLocaleString('fr-FR')} €</span> PRÈS!</span>`;
            document.getElementById("price-reveal").style.display = "block";

            // Add to seen artworks
            seenArtworks.push(currentArtwork.nomfichier);
            localStorage.setItem("seenArtworks", JSON.stringify(seenArtworks));

            // Update button
            updateButtonState(true);

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Add this inside the DOMContentLoaded event listener
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