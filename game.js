/**
 * Fichier: game.js
 * 
 * Description:
 * Implémente la logique principale du jeu d'estimation du prix des œuvres d'art.
 * Gère l'affichage aléatoire des œuvres, le processus de devinette et la comparaison
 * avec le prix réel.
 * 
 * Fonctionnalités:
 * - Sélection aléatoire d'œuvres d'art non encore vues
 * - Affichage dynamique des informations sur l'œuvre (auteur, titre, date)
 * - Interface de devinette avec dialogue modal
 * - Calcul de la différence entre l'estimation et le prix réel
 * - Mémorisation des œuvres déjà vues dans localStorage
 * - Navigation entre les œuvres
 * 
 * Dépendances:
 * - script.js: utilise la variable 'oeuvres' contenant la base de données des œuvres
 * - Requiert les éléments HTML spécifiques de oeuvres.html
 * - Utilise localStorage pour conserver l'historique des œuvres vues
 */


// Attend que le DOM soit chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {
    // Suivi des œuvres déjà vues dans le localStorage
    let seenArtworks = JSON.parse(localStorage.getItem("seenArtworks") || "[]");
    let currentArtwork = null;

    // Sélectionne une œuvre aléatoire non encore vue
    function getRandomArtwork() {
        const availableArtworks = oeuvres.filter(artwork => 
            !seenArtworks.includes(artwork.nomfichier)
        );
        
        // Si toutes les œuvres ont été vues, réinitialise la liste
        if (availableArtworks.length === 0) {
            seenArtworks = [];
            localStorage.setItem("seenArtworks", "[]");
            return oeuvres[Math.floor(Math.random() * oeuvres.length)];
        }
        
        return availableArtworks[Math.floor(Math.random() * availableArtworks.length)];
    }

    // Affiche l'œuvre actuelle et ses informations
    function displayArtwork() {
        currentArtwork = getRandomArtwork();
        
        // Affiche les informations de l'œuvre
        document.getElementById("artwork-author").textContent = currentArtwork.auteur;
        document.getElementById("artwork-title").textContent = currentArtwork.titre;
        document.getElementById("artwork-date").textContent = currentArtwork.date;
        
        // Affiche l'image de l'œuvre
        const artworkImage = document.getElementById("artwork-image");
        artworkImage.src = `oeuvres/${currentArtwork.nomfichier}`;
        artworkImage.alt = currentArtwork.titre;

        // Réinitialise l'affichage du prix
        document.getElementById("price-reveal").style.display = "none";
        
        // Met à jour l'état du bouton
        updateButtonState(false);
    }

    // Met à jour le texte du bouton selon l'état
    function updateButtonState(hasGuessed) {
        const guessButton = document.getElementById("guess-button");
        guessButton.textContent = hasGuessed ? "PROCHAINE ŒUVRE" : "DEVINER LE PRIX!";
    }

    // Affichage initial d'une œuvre
    displayArtwork();

    // Configuration des éléments interactifs
    const guessButton = document.getElementById("guess-button");
    const guessDialog = document.getElementById("guessDialog");
    const guessOverlay = document.getElementById("guessOverlay");
    const submitGuess = document.getElementById("submitGuess");
    const cancelGuess = document.getElementById("cancelGuess");
    const priceInput = document.getElementById("priceGuess");

    // Gestionnaire d'événement pour le bouton principal
    guessButton.addEventListener("click", () => {
        if (guessButton.textContent === "PROCHAINE ŒUVRE") {
            displayArtwork();
        } else {
            guessDialog.style.display = "block";
            guessOverlay.style.display = "block";
            priceInput.focus();
        }
    });

    // Configuration des gestionnaires d'événements pour le dialogue
    submitGuess.addEventListener("click", handleGuess);
    cancelGuess.addEventListener("click", hideDialog);
    guessOverlay.addEventListener("click", hideDialog);

    // Permet de valider avec la touche Entrée
    priceInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleGuess();
        }
    });

    // Cache le dialogue de devinette
    function hideDialog() {
        guessDialog.style.display = "none";
        guessOverlay.style.display = "none";
        priceInput.value = "";
    }

    // Traite la devinette de l'utilisateur
    function handleGuess() {
        const guessValue = parseInt(priceInput.value);
        if (guessValue) {
            hideDialog();
            
            // Calcule la différence de prix
            const priceDifference = Math.abs(guessValue - currentArtwork.prix);
            
            // Affiche le résultat
            const priceRevealDiv = document.getElementById("price-reveal");
            priceRevealDiv.innerHTML = `
                Prix réel: <span id="actual-price">${currentArtwork.prix.toLocaleString('fr-FR')} €</span><br>
                —————————————————<br>
                <span class="price-difference">VOTRE ESTIMATION DE <span id="guess-price">${guessValue.toLocaleString('fr-FR')} €</span> EST À <span class="difference-value">${priceDifference.toLocaleString('fr-FR')} €</span> PRÈS!</span>`;
            document.getElementById("price-reveal").style.display = "block";

            // Ajoute aux œuvres vues
            seenArtworks.push(currentArtwork.nomfichier);
            localStorage.setItem("seenArtworks", JSON.stringify(seenArtworks));

            // Met à jour le bouton
            updateButtonState(true);

            // Défilement doux vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Gestion de l'indicateur de défilement
    const scrollIndicator = document.getElementById("scroll-indicator");

    // Vérifie la position de défilement et affiche/masque l'indicateur
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollPosition >= documentHeight - 100) {
            scrollIndicator.classList.add("hidden");
        } else {
            scrollIndicator.classList.remove("hidden");
        }
    });

    // Défilement quand on clique sur l'indicateur
    scrollIndicator.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });
}); 