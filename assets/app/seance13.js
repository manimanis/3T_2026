/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°13 - ÉVALUATION PRATIQUE N°6
 * TP Noté sur Machine : Conception modulaire d'une application (90 min)
 * Barème : /20 points - TP6_Nom_Prenom.py
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      criteresEvaluation: [
        { niveau: "Socle (8 pts)", critere: "Act 1 : Fonction de saisie paramétrée Saisie_Taille(bornInf, bornSup)", points: "4 pts" },
        { niveau: "Socle (8 pts)", critere: "Act 2 : Procédure Afficher_Tableau(T, N) élément par élément", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 3 : Procédure Remplir_Tableau(@T, N) avec contrôles de saisie", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 4 : Fonction pure Calculer_Moyenne(T, N) avec return unique et sans print", points: "4 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 5 : Fonction sélective Compter_Superieurs(T, N, seuil)", points: "2 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 6 : Programme principal orchestrant les 5 modules et recette logicielle", points: "2 pts" }
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
