/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°19 - ÉVALUATION PRATIQUE N°9
 * TP Noté sur Machine : Recherche & Tri à Bulles modulaires (90 min)
 * Barème : /20 points - TP9_Nom_Prenom.py
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      criteresEvaluation: [
        { niveau: "Socle (8 pts)", critere: "Act 1 : Saisie de N in [5; 30] et allocation statique numpy de notes réelles", points: "4 pts" },
        { niveau: "Socle (8 pts)", critere: "Act 2 : Fonction booléenne Existe_Note avec arrêt immédiat par boucle Tant Que", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 3 : Fonction Position_Note retournant l'indice exact ou -1 si absente", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 4 : Procédure Tri_Bulles_Croissant(@T, N) avec indicateur booléen d'échange", points: "4 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 5 : Tri décroissant et affichage formaté avec rang d'excellence (1er, 2e...)", points: "2 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 6 : Module de dénombrement des notes ex aequo et recette logicielle", points: "2 pts" }
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
