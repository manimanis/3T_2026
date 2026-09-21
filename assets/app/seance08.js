/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°8 - APPRENTISSAGE
 * Tableaux 1D statiques : Déclaration, Saisie & Traitements cumulatifs (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      codeAlgoDeclaration: `// En algorithmique officielle :
// Dans le Tableau de Déclaration des Objets (TDO) :
// Objet | Type / Nature
// T     | Tableau de 10 Réel
// i, N  | Entier

Pour i de 0 à N - 1 Faire
  Écrire("Donner l'élément [", i, "] : ")
  Lire(T[i])
Fin Pour`,

      codePythonDeclaration: `# En Python officiel (numpy statique obligatoire) :
from numpy import array

# Allocation d'un tableau statique de N réels :
N = 10
T = array([0.0] * N)

# Remplissage séquentiel case par case :
for i in range(N):
    T[i] = float(input(f"Donner l'élément [{i}] : "))

# Affichage case par case (INTERDICTION DE print(T) brut) :
for i in range(N):
    print(f"T[{i}] = {T[i]}")`
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
