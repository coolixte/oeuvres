/**
 * Fichier: scroll.js
 * 
 * Description:
 * Gère l'indicateur de défilement affiché en bas à droite des pages du site.
 * Fournit une aide visuelle à l'utilisateur pour naviguer verticalement dans la page.
 * 
 * Fonctionnalités:
 * - Affiche/masque dynamiquement l'indicateur de défilement en fonction de la position
 * - Disparaît automatiquement lorsque l'utilisateur atteint le bas de la page
 * - Permet un défilement fluide d'une hauteur d'écran lors du clic sur l'indicateur
 * - Animation de rebond pour attirer l'attention (définie dans le CSS)
 * 
 * Dépendances:
 * - Requiert l'élément HTML avec l'id "scroll-indicator"
 * - Style et animation définis dans style.css
 * - Utilisé sur toutes les pages du site
 */


// Attend que le DOM soit chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {
    // Récupère l'indicateur de défilement
    const scrollIndicator = document.getElementById("scroll-indicator");

    // Vérifie la position de défilement et masque/affiche l'indicateur
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Masque l'indicateur lorsqu'on approche du bas de la page
        if (scrollPosition >= documentHeight - 100) {
            scrollIndicator.classList.add("hidden");
        } else {
            scrollIndicator.classList.remove("hidden");
        }
    });

    // Défilement automatique lors du clic sur l'indicateur
    scrollIndicator.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });
}); 