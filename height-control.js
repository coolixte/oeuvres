/**
 * Fichier: height-control.js
 * 
 * Description:
 * Gère le contrôle de hauteur de l'image d'œuvre d'art sur la page oeuvres.html.
 * Permet à l'utilisateur d'ajuster la taille d'affichage de l'œuvre selon ses préférences.
 * 
 * Fonctionnalités:
 * - Contrôle interactif de la hauteur de l'image via un slider
 * - Ajustement en temps réel pendant le glissement
 * - Sauvegarde de la préférence de l'utilisateur dans localStorage
 * - Restauration de la hauteur préférée lors du chargement de la page
 * 
 * Dépendances:
 * - Requiert l'élément HTML slider avec l'id "height-slider"
 * - Requiert une image dans un conteneur avec la classe ".artwork-display img"
 * - Utilise localStorage pour persister les préférences de l'utilisateur
 */


// Attend que le DOM soit chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {
    // Récupère les éléments du contrôle de hauteur et de l'image
    const heightSlider = document.getElementById("height-slider");
    const artworkImage = document.querySelector(".artwork-display img");

    // Initialise avec la valeur stockée ou la valeur par défaut
    const storedHeight = localStorage.getItem("artworkHeight") || "450";
    heightSlider.value = storedHeight;
    updateHeight(storedHeight);

    // Ajuste la hauteur en temps réel pendant le glissement
    heightSlider.addEventListener("input", (e) => {
        updateHeight(e.target.value);
    });

    // Sauvegarde la valeur dans localStorage quand l'utilisateur termine
    heightSlider.addEventListener("change", (e) => {
        localStorage.setItem("artworkHeight", e.target.value);
    });

    // Fonction pour mettre à jour la hauteur de l'image
    function updateHeight(height) {
        artworkImage.style.height = `${height}px`;
    }
}); 