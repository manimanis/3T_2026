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
        { niveau: "Socle (8 pts)", critere: "Act 1 (Ex 71) : Saisie contrôlée et validation de conformité de la trame binaire (8 bits)", points: "4 pts" },
        { niveau: "Socle (8 pts)", critere: "Act 2 (Ex 71) : Décompte des bits '1', parité impaire et génération de la trame émise (9 bits)", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 3 (Ex 69) : Contrôle de conformité de la date 'JJ/MM/AAAA' (taille 10, slashs et chiffres)", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 4 (Ex 69) : Somme récursive et réduction itérée en un chiffre de contrôle [1..9]", points: "4 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 5 (Ex 75) : Certification d'un billet via substitution alphabétique et modulo 9 = 8", points: "2 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 6 : Audit d'une liasse de N billets, décompte des conformités et alerte contrefaçon", points: "2 pts" }
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
