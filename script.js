/**
 * Fichier: script.js
 * 
 * Description:
 * Script principal du site UNE ŒUVRE · UN PRIX qui contient la base de données des œuvres,
 * la gestion des utilisateurs et des préférences visuelles (thème de couleur).
 * 
 * Fonctionnalités:
 * - Base de données des œuvres d'art avec leurs attributs (titre, auteur, prix, etc.)
 * - Système de gestion des utilisateurs avec persistance du nom dans localStorage
 * - Dialogue modal pour la saisie du nom d'utilisateur
 * - Changement de thème de couleur (clair/sombre) avec persistance de la préférence
 * - Effet de zoom sur les images lors du défilement
 * 
 * Dépendances:
 * - Utilisé par game.js pour accéder à la base de données des œuvres
 * - Interagit avec tous les fichiers HTML du site
 * - Utilise localStorage pour persister les préférences utilisateur
 */


// Base de données des œuvres d'art
const oeuvres = [
    {
        titre: "GIF-SUR-YVETTE",
        nomfichier: "gif-sur-yvette.jpg",
        prix: 487500,
        auteur: "Fernand Léger",
        date: "1919"
    },
    {
        titre: "DANS LES ROSES (MADAME LEON CLAPISSON)",
        nomfichier: "dans-les-roses.jpg",
        prix: 23528000,
        auteur: "Pierre-Auguste Renoir",
        date: "1881"
    },
    {
        titre: "THE JOKER",
        nomfichier: "the-joker.jpg",
        prix: 146250,
        auteur: "George Condo",
        date: "1990"
    },
    {
        titre: "UNTITLED (RED AND BURGANDY OVER BLUE)",
        nomfichier: "untitled-red-and-burgundy.jpg",
        prix: 10515000,
        auteur: "Mark Rothko",
        date: "1950"
    },
    {
        titre: "TÊTE",
        nomfichier: "tete-de-femme.jpg",
        prix: 70725000,
        auteur: "Amedeo Modigliani",
        date: "1919"
    },
    {
        titre: "NO.1 (ROYAL RED AND BLUE)",
        nomfichier: "n-1.jpg",
        prix: 75122500,
        auteur: "Mark Rothko",
        date: "1950"
    },
    {
        titre: "NYMPHEAS EN FLEUR",
        nomfichier: "nympheas-en-fleur.jpg",
        prix: 84687500,
        auteur: "Claude Monet",
        date: "1899"
    },
    {
        titre: "RUG",
        nomfichier: "rug.jpg",
        prix: 43750,
        auteur: "Jean Dunand",
        date: "cerca 1927"
    }
];

/**
 * @typedef {Object} UserState
 * @property {string | null} name - Le nom d'affichage de l'utilisateur
 */

/**
 * Gère l'affichage et la persistance du nom d'utilisateur
 */
class UserManager {
    /** @type {UserState} */
    #state;

    constructor() {
        // Initialise l'état à partir du localStorage
        this.#state = {
            name: localStorage.getItem("userName")
        };
        this.#initializeUI();
        this.#updateDisplay();
    }

    /**
     * Initialise les éléments de l'interface utilisateur et les écouteurs d'événements
     * @private
     */
    #initializeUI() {
        // Crée le HTML du dialogue
        const dialogHTML = `
            <div class="dialog-overlay" id="dialogOverlay"></div>
            <div class="name-dialog" id="nameDialog">
                <h3>Entrez votre prénom ✦</h3>
                <input type="text" id="nameInput" class="name-input" placeholder="Votre nom">
                <div>
                    <button class="dialog-button" id="submitName">Confirmer</button>
                    <button class="dialog-button" id="cancelDialog">Annuler</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", dialogHTML);

        // Ajoute les gestionnaires d'événements
        const signInBtn = document.getElementById("sign-in-btn");
        const submitBtn = document.getElementById("submitName");
        const cancelBtn = document.getElementById("cancelDialog");
        const overlay = document.getElementById("dialogOverlay");
        const nameInput = document.getElementById("nameInput");

        signInBtn?.addEventListener("click", () => this.#showDialog());
        submitBtn?.addEventListener("click", () => this.#handleSubmit());
        cancelBtn?.addEventListener("click", () => this.#hideDialog());
        overlay?.addEventListener("click", () => this.#hideDialog());

        nameInput?.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.#handleSubmit();
            }
        });
    }

    /**
     * Met à jour l'affichage du nom d'utilisateur sur la page
     * @private
     */
    #updateDisplay() {
        const userDisplay = document.getElementById("user-display");
        const userName = document.getElementById("user-name");
        
        if (userDisplay && userName) {
            if (this.#state.name) {
                // Ajoute l'icône utilisateur quand connecté
                userName.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                    </svg>
                    ${this.#state.name.toUpperCase()}`;
            } else {
                userName.textContent = "ENREGISTREZ VOUS A DROITE";
            }
            userDisplay.style.display = "block";
        }
    }

    /**
     * Affiche le dialogue de saisie du nom
     * @private
     */
    #showDialog() {
        const dialog = document.getElementById("nameDialog");
        const overlay = document.getElementById("dialogOverlay");
        const nameInput = document.getElementById("nameInput");
        
        if (dialog && overlay && nameInput) {
            dialog.style.display = "block";
            overlay.style.display = "block";
            nameInput.value = this.#state.name || "";
            nameInput.focus();
        }
    }

    /**
     * Cache le dialogue de saisie du nom
     * @private
     */
    #hideDialog() {
        const dialog = document.getElementById("nameDialog");
        const overlay = document.getElementById("dialogOverlay");
        
        if (dialog && overlay) {
            dialog.style.display = "none";
            overlay.style.display = "none";
        }
    }

    /**
     * Gère la soumission du nom
     * @private
     */
    #handleSubmit() {
        const nameInput = document.getElementById("nameInput");
        if (nameInput) {
            const newName = nameInput.value.trim();
            if (newName) {
                this.#state.name = newName;
                localStorage.setItem("userName", newName);
                this.#updateDisplay();
                this.#hideDialog();
            }
        }
    }
}

// Change la couleur de fond du site
function changeBackgroundColor() {
    const grey = '#444444';
    const white = '#ffffff';
    
    // Récupère la couleur actuelle du localStorage ou blanc par défaut
    const currentColor = localStorage.getItem('backgroundColor') || white;
    
    // Alterne entre blanc et gris
    if (currentColor === grey) {
        document.body.style.backgroundColor = white;
        document.body.style.color = '#000000';
        localStorage.setItem('backgroundColor', white);
    } else {
        document.body.style.backgroundColor = grey;
        document.body.style.color = '#ffffff';
        localStorage.setItem('backgroundColor', grey);
    }
}

// Applique le thème de couleur stocké
function applyStoredTheme() {
    const storedColor = localStorage.getItem('backgroundColor');
    if (storedColor) {
        document.body.style.backgroundColor = storedColor;
        document.body.style.color = storedColor === '#ffffff' || storedColor === 'rgb(255, 255, 255)' || storedColor === '#444444' || storedColor === 'rgb(180, 178, 177)'
            ? '#000000' 
            : '#ffffff';
    }
}

// Initialise le gestionnaire d'utilisateur et ajoute le gestionnaire d'événement pour le bouton de changement de couleur
document.addEventListener("DOMContentLoaded", () => {
    new UserManager();
    
    // Applique le thème stocké immédiatement
    applyStoredTheme();
    
    const colorChangeBtn = document.getElementById("color-change-btn");

    if (colorChangeBtn) {
        colorChangeBtn.addEventListener("click", changeBackgroundColor);
    }

    // Ajoute l'effet de zoom sur image au défilement
    const bottomImage = document.querySelector(".bottom-image");
    if (bottomImage) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;
            const scrollPercentage = scrollPosition / maxScroll;
            
            // Applique différentes échelles de base pour différentes images
            document.querySelectorAll(".bottom-image").forEach(img => {
                const baseScale = img.classList.contains("zoomed-image") ? 1.1 : 1;
                const scaleValue = baseScale + (scrollPercentage * 0.2);
                img.style.transform = `scale(${scaleValue})`;
            });
        });
    }
});

 