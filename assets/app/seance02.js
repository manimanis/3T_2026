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
  Écrire("Tension résiduelle sécurisée : ", U, " V")
  Écrire("Durée de décharge : ", duree, " s")
  Écrire("Voyant Vert : Accès armoire autorisé")
FIN`,

      codeTraceAlgo: `x ← 18
cpt ← 0
Tant que x > 2 Faire
  x ← x Div 2
  cpt ← cpt + 1
  Écrire("Étape ", cpt, " : x = ", x)
Fin Tant que`,

      codeDebogagePython: `# Simulation de l'asservissement thermique (erreur de boucle infinie)
temperature = float(input("Température initiale (°C) : "))
cycles = 0
while temperature > 25.0:
    print(f"Cycle {cycles} : Refroidissement en cours...")
    cycles += 1
    # ERREUR : La température n'est jamais abaissée (oubli de 'temperature -= 1.5') !`,

      codeSentinelleAlgo: `s ← 0.0
nb ← 0
Lire(t)
Tant que t ≠ -999.0 Faire
  Si t ≥ 0 Alors
    s ← s + t
    nb ← nb + 1
  FinSi
  Lire(t)
Fin Tant que
Si nb > 0 Alors
  moy ← s / nb
  Écrire("Moyenne = ", moy)
Sinon
  Écrire("Aucune température valide saisie")
FinSi`,

      codeDecroissanceAlgo: `ALGORITHME DemiVie
DEBUT
  N ← 100000
  seuil ← N / 2
  annees ← 0
  Tant que N > seuil Faire
    N ← N * 0.95
    annees ← annees + 1
  Fin Tant que
  Écrire("Demi-vie atteinte en ", annees, " ans")
FIN`
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
        const containers = document.querySelectorAll('.math-expr, .formula-box, .katex-render, body');
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
