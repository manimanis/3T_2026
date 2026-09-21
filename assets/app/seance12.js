/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°12 - APPRENTISSAGE
 * Modularité : Décomposition, Procédures, Fonctions & Paramètres (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      comparatifModules: [
        { critere: "Rôle principal", fonction: "Calculer et retourner UNE SEULE valeur scalaire", procedure: "Exécuter une série d'actions (affichage, saisie, modification)" },
        { critere: "Valeur de retour", fonction: "Obligatoire : 'Retourner valeur' (un seul return)", procedure: "Aucune valeur de retour (pas de return)" },
        { critere: "Appel dans le code", fonction: "Dans une expression, affectation ou print()", procedure: "Appelée comme une instruction isolée" },
        { critere: "Effets de bord", fonction: "À proscrire (pas de saisie ni d'affichage interne)", procedure: "Autorisés (interactions utilisateur, affichage)" },
        { critere: "Passage de paramètres", fonction: "Généralement par valeur", procedure: "Par valeur ou par référence avec @" }
      ],

      codeModuleAlgo: `// En-tête de fonction algorithmique officielle :
Fonction Volume_Cylindre(rayon, hauteur : Réel) : Réel
Début
  Retourner 3.14159 * rayon * rayon * hauteur
Fin

// En-tête de procédure avec passage par référence (@) :
Procédure Permuter(@x : Réel, @y : Réel)
Début
  aux ← x
  x ← y
  y ← aux
Fin`,

      codeModulePython: `# Équivalents Python 3 :
def volume_cylindre(rayon: float, hauteur: float) -> float:
    return 3.14159 * rayon * rayon * hauteur

def permuter(x: float, y: float):
    # En Python, les scalaires sont immuables.
    # Pour simuler @ sur des scalaires, on retourne le tuple :
    return y, x`
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
