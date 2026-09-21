/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°18 - APPRENTISSAGE
 * Algorithmes de Recherche Séquentielle & Tri à Bulles (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      codeRechercheAlgo: `// Algorithme officiel de recherche avec arrêt immédiat :
Fonction Recherche_Position(T : Tableau de N Entier, N, cible : Entier) : Entier
Début
  i ← 0
  trouve ← Faux
  Tant Que (i < N) Et (trouve = Faux) Faire
    Si (T[i] = cible) Alors
      trouve ← Vrai
    Sinon
      i ← i + 1
    Fin Si
  Fin Tant Que
  
  Si (trouve = Vrai) Alors
    Retourner i
  Sinon
    Retourner -1
  Fin Si
Fin`,

      codeTriBullesAlgo: `// Procédure officielle du Tri à Bulles optimisé :
Procédure Tri_Bulles(@T : Tableau de N Entier, N : Entier)
Début
  Répéter
    echange ← Faux
    Pour i de 0 à N - 2 Faire
      Si (T[i] > T[i + 1]) Alors
        aux ← T[i]
        T[i] ← T[i + 1]
        T[i + 1] ← aux
        echange ← Vrai
      Fin Si
    Fin Pour
  Jusqu'à (echange = Faux)
Fin`,

      codeTriBullesPython: `# Implémentation Python correspondante :
def tri_bulles(T, N: int):
    while True:
        echange = False
        for i in range(N - 1):
            if T[i] > T[i + 1]:
                T[i], T[i + 1] = T[i + 1], T[i]
                echange = True
        if not echange:
            break`
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
