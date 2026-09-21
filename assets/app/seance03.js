/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°3 - ÉVALUATION PRATIQUE 1
 * TP Noté sur Machine : Contrôle de saisie & Boucle Tant Que (90 min - Barème /20)
 * Version sujet élève (réponses sur copie et script TP1_Nom_Prenom.py)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      // Modèles de codes pour l'évaluation pratique 1
      codeConcentrationPython: `# Saisie filtrée d'une concentration molaire C dans [0.01 ; 2.50]
C = float(input("Donner la concentration molaire (mol/L) : "))
while C < 0.01 or C > 2.50:
    print("Erreur : la concentration doit être comprise entre 0.01 et 2.50 mol/L !")
    C = float(input("Recommencez la saisie : "))`,

      codeAbsorbancePython: `# Saisie d'une série d'absorbances optiques arrêtée par une valeur négative
somme = 0.0
nb_mesures = 0
A = float(input("Donner une valeur d'absorbance (négatif pour stopper) : "))
while A >= 0:
    somme = somme + A
    nb_mesures = nb_mesures + 1
    A = float(input("Mesure suivante : "))

if nb_mesures > 0:
    moyenne = somme / nb_mesures
    print("Nombre de mesures valides :", nb_mesures)
    print("Absorbance moyenne :", moyenne)
else:
    print("Aucune mesure valide enregistrée.")`
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
