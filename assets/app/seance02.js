/**
 * 3T_2026 - Séance N°2 (assets/app/seance02.js)
 * Script Vue.js pour la Séance 2 : Consolidation des structures de contrôle simples
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      // Simulateur Vendeur (Activité 2)
      simJours: 5,
      simVentesJour: [12, 8, 15, 5, 20],
      simBaseJour: 35.000,
      simPrimeJour: 15.000,
      simPrimeGlobale: 100.000,

      // Code correction Activité 1
      showCorrectionAct1: false
    };
  },
  computed: {
    totalVentesSim() {
      return this.simVentesJour.reduce((acc, val) => acc + (parseInt(val) || 0), 0);
    },
    nbJoursPrimeSim() {
      return this.simVentesJour.filter(val => (parseInt(val) || 0) > 10).length;
    },
    salaireNetSim() {
      const n = parseInt(this.simJours) || 0;
      let total = n * this.simBaseJour;
      total += this.nbJoursPrimeSim * this.simPrimeJour;
      if (this.totalVentesSim > 150) {
        total += this.simPrimeGlobale;
      }
      return total;
    },
    hasPrimeGlobaleSim() {
      return this.totalVentesSim > 150;
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    },
    toggleCorrectionAct1() {
      this.showCorrectionAct1 = !this.showCorrectionAct1;
      this.$nextTick(() => {
        if (typeof hljs !== 'undefined') {
          hljs.highlightAll();
        }
      });
    },
    updateJoursSim() {
      let count = parseInt(this.simJours) || 1;
      if (count > 15) count = 15;
      if (count < 1) count = 1;
      this.simJours = count;

      if (count > this.simVentesJour.length) {
        while (this.simVentesJour.length < count) {
          this.simVentesJour.push(10);
        }
      } else if (count < this.simVentesJour.length) {
        this.simVentesJour = this.simVentesJour.slice(0, count);
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
    }
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.$nextTick(() => {
      if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }
      this.renderMath();
    });
  }
}).mount('#app');
