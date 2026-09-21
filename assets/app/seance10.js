/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°10 - APPRENTISSAGE
 * Tableaux 1D : Comptages conditionnels & Filtrage sélectif (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      codeFiltrageAlgo: `// Patron algorithmique du filtrage sélectif :
j ← 0
Pour i de 0 à N - 1 Faire
  Si (T1[i] >= 10.0) Et (T1[i] <= 20.0) Alors
    T2[j] ← T1[i]
    j ← j + 1
  Fin Si
Fin Pour
tailleT2 ← j`,

      codeFiltragePython: `# En Python (numpy statique avec taille effective j) :
from numpy import array

j = 0
for i in range(N):
    if 10.0 <= T1[i] <= 20.0:
        T2[j] = T1[i]
        j += 1

taille_T2 = j
# Affichage STRICT des éléments utiles uniquement :
for k in range(taille_T2):
    print(f"T2[{k}] = {T2[k]}")`
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
