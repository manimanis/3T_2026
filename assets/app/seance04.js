/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°4 - APPRENTISSAGE
 * Boucle Répéter ... Jusqu'à & Structure conditionnelle Selon (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      codeRepeterAlgo: `Répéter
  Écrire("Voulez-vous continuer (O/N) ? ")
  Lire(rep)
Jusqu'à (rep = 'O') Ou (rep = 'N')`,

      codeSelonAlgo: `Selon Choix
  1 : Ecrire("Vitesse v = ", d / t)
  2 : Ecrire("Énergie Ec = ", 0.5 * m * v * v)
  3 : Ecrire("Puissance P = ", E / dt)
  0 : Ecrire("Fin de la session.")
  Sinon Ecrire("Choix invalide !")
Fin Selon`,

      codeMatchCasePython: `match choix:
    case 1:
        print("Vitesse v =", d / t)
    case 2:
        print("Énergie Ec =", 0.5 * m * v * v)
    case 3:
        print("Puissance P =", E / dt)
    case 0:
        print("Fin de la session.")
    case _:
        print("Choix invalide !")`
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
