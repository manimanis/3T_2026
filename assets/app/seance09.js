/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°9 - ÉVALUATION PRATIQUE N°4
 * TP Noté sur Machine : Tableaux 1D (numpy), Cumuls & Extrema (90 min)
 * Barème : /20 points - TP4_Nom_Prenom.py
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      criteresEvaluation: [
        { niveau: "Socle (8 pts)", critere: "Act 1 : Saisie contrôlée de N in [5; 30] et allocation statique numpy.array", points: "4 pts" },
        { niveau: "Socle (8 pts)", critere: "Act 2 : Remplissage des tensions électriques réelles in [0.0; 15.0] V", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 3 : Affichage case par case avec indice (print(T) brut proscrit)", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 4 : Calcul de la somme cumulée et affichage de la tension moyenne", points: "4 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 5 : Repérage du minimum et du maximum avec conservation des indices", points: "2 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 6 : Comptage statistique des mesures aberrantes (écart > 20% de la moyenne)", points: "2 pts" }
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
