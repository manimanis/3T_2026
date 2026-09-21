/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°11 - ÉVALUATION PRATIQUE N°5
 * TP Noté sur Machine : Filtrage, Éclatement & Séparation (90 min)
 * Barème : /20 points - TP5_Nom_Prenom.py
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      criteresEvaluation: [
        { niveau: "Socle (8 pts)", critere: "Act 1 : Contrôle de N in [6; 25] et allocation statique des 3 tableaux numpy", points: "4 pts" },
        { niveau: "Socle (8 pts)", critere: "Act 2 : Remplissage contrôlé des masses physiques in [100.0; 200.0] g", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 3 : Filtrage conditionnel dans Acceptes avec gestion de l'indice j1", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 4 : Transfert des rebuts dans Rejetes avec gestion de l'indice j2", points: "4 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 5 : Calcul du taux d'acceptation (%) et de la masse moyenne conforme", points: "2 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 6 : Affichage séquentiel strict des deux sous-tableaux selon j1 et j2", points: "2 pts" }
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
