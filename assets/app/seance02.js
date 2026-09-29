/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°2 - APPRENTISSAGE
 * La boucle Tant Que (while) & Contrôle de saisie (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      // Codes algorithmiques types pour la séance 2
      codeControleSaisieAlgo: `ALGORITHME DechargeSecurite
DEBUT
  Lire(U)
  duree ← 0
  Tant que (U ≥ 20.0) Faire
    U ← U / 2
    duree ← duree + 1
  Fin Tant que
  Écrire("Tension : ", U, " V")
  Écrire("Durée : ", duree, " s")
FIN`,

      codeTraceAlgo: `x ← 18
cpt ← 0
Tant que x > 2 Faire
  x ← x Div 2
  cpt ← cpt + 1
Fin Tant que
Écrire("x = ", x)
Écrire("cpt = ", cpt)`,

      codeDebogagePython: `temperature = float(input("Température (°C) : "))
cycles = 0

while temperature > 25.0:
    print(f"Cycle {cycles} : Refroidissement...")
    cycles += 1
    # Anomalie : la température n'est pas modifiée !

print(f"Fin : {temperature}°C en {cycles} cycle(s).")`
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
      if (typeof window.jumpToSection === 'function') {
        window.jumpToSection(sectionId);
      } else if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.showSection === 'function') {
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
      if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.scanArticlesAndSections === 'function') {
        window.sectionDrawerInstance.scanArticlesAndSections();
      }
      if (typeof window.safeHighlightAll === 'function') {
        window.safeHighlightAll();
      } else if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }
      this.renderMath();
    });
  }
}).mount('#app');
