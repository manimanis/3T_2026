/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°7 - ÉVALUATION PRATIQUE N°3
 * TP Noté sur Machine : Traitement textuel & Validation de formats (90 min)
 * Barème : /20 points - TP3_Nom_Prenom.py
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      criteresEvaluation: [
        { niveau: "Socle (8 pts)", critere: "Act 1 : Contrôle de la longueur exacte (7 caractères) via Long()", points: "4 pts" },
        { niveau: "Socle (8 pts)", critere: "Act 2 : Validation des 2 premiers caractères majuscules via Ord() ou Majus()", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 3 : Détection et validation du séparateur tiret '-' en position 2", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 4 : Extraction des 4 derniers caractères et vérification avec Estnum()", points: "4 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 5 : Conversion en entier avec Valeur() et calcul de la clé Modulo 19", points: "2 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 6 : Validation rigoureuse par 4 jeux d'essais et robustesse logicielle", points: "2 pts" }
      ]
    };
  },

  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    },

    copyCode(text, event) {
      let codeEl = null;
      let btnEl = null;
      if (event && event.currentTarget) {
        btnEl = event.currentTarget;
        const container = btnEl.closest('.code-container') || btnEl.parentNode;
        if (container) {
          codeEl = container.querySelector('code');
        }
      }
      if (window.codeClipboardInstance) {
        window.codeClipboardInstance.copyToClipboard(text, btnEl, codeEl);
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        if (typeof window.showToast === 'function') {
          window.showToast("Code copié !");
        }
      }
    },

    renderMath() {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    },

    jumpToSection(sectionId) {
      if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.showSection === 'function') {
        window.sectionDrawerInstance.showSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  },

  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.$nextTick(() => {
      if (typeof window.safeHighlightAll === 'function') {
        window.safeHighlightAll();
      } else if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }
      this.renderMath();
    });
  }
}).mount('#app');
