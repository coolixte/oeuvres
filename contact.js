/**
 * Fichier: contact.js
 * 
 * Description:
 * Gère les fonctionnalités du formulaire de contact sur la page contact.html.
 * 
 * Fonctionnalités:
 * - Écoute l'événement de soumission du formulaire
 * - Utilise Formspree pour traiter les données du formulaire
 * - Réinitialise les champs du formulaire après soumission
 * 
 * Dépendances:
 * - Nécessite le formulaire HTML avec la classe "contact-form"
 * - S'appuie sur le service Formspree pour l'envoi des emails
 */

// Attend que le DOM soit chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {
    // Récupère le formulaire de contact
    const contactForm = document.querySelector(".contact-form");
    
    if (contactForm) {
        // Ajoute un gestionnaire d'événements pour la soumission du formulaire
        contactForm.addEventListener("submit", (e) => {
            // Laisse le formulaire être soumis normalement à Formspree
            // Après un court délai, vide tous les champs du formulaire
            setTimeout(() => {
                const inputs = contactForm.querySelectorAll("input, textarea");
                inputs.forEach(input => input.value = "");
            }, 100);
        });
    }
}); 