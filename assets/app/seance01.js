/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°1 - SÉRIE DE RENTRÉE N° 0
 * Révision · Réactivation · Évaluation diagnostique (90 min - Barème /40)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      // Codes for quick copying
      codeAlgoEx2: `ALGORITHME Etat
DEBUT
  a ← 4
  b ← a + 3
  a ← b * 2
  c ← a - b
  Écrire(a, b, c)
FIN`,

      codeAlgoEx3: `Lire(x)
Si (x ≥ 10) Et (x ≤ 20) Alors
  Écrire("Dans la plage")
Sinon
  Écrire("Hors de la plage")
FinSi`,

      codeAlgoEx4: `Lire(n)
s ← 0
Pour i de 1 à n Faire
  s ← s + i
Fin Pour
Écrire(s)`,

      codeAlgoEx5: `ALGORITHME MoyenneMesures
DEBUT
  Lire(n)
  s ← [ A ]
  Pour i de 1 à n Faire
    Lire(x)
    [ B ]
  Fin Pour
  m ← [ C ]
  Écrire(m)
FIN`,

      codeAlgoEx6: `Lire(n)
nbPos ← 1
Pour i de 1 à n Faire
  Lire(x)
  Si x ≥ 0 Alors
    nbPos ← nbPos + 1
  FinSi
Fin Pour
Écrire(nbPos)`,

      codeAlgoEx7: `Lire(n)
s ← 0
Pour i de 1 à n Faire
  Lire(x)
  s ← s + x
Fin Pour
Écrire(s)`,

      codeAlgoEx8A: `maxi ← a
Si b > maxi Alors
  maxi ← b
FinSi
Si c > maxi Alors
  maxi ← c
FinSi
Écrire(maxi)`,

      codeAlgoEx8B: `Si a > b Alors
  maxi ← a
Sinon
  maxi ← b
FinSi
Si c > maxi Alors
  maxi ← c
FinSi
Écrire(maxi)`,

      codeAlgoEx9: `Lire(n)
nbPairs ← 0
Pour i de 1 à n Faire
  Lire(x)
  Si x Mod 2 = 0 Alors
    nbPairs ← nbPairs + 1
  FinSi
Fin Pour
Écrire(nbPairs)`
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
        const containers = document.querySelectorAll('.math-expr, .formula-box, .katex-render');
        containers.forEach(el => {
          renderMathInElement(el, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '\\[', right: '\\]', display: true },
              { left: '\\(', right: '\\)', display: false },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
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
