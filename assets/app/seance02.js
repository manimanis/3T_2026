/**
 * 3T_2026 - Séance N°2 (assets/app/seance02.js)
 * Script Vue.js pour la Séance 2 : Simulateur Interactif Vendeur
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      simJours: 5,
      simVentesJour: [
        { id: 1, ventes: 12 },
        { id: 2, ventes: 8 },
        { id: 3, ventes: 15 },
        { id: 4, ventes: 5 },
        { id: 5, ventes: 20 }
      ],
      simBaseJour: 35.000,
      simPrimeJour: 15.000,
      simPrimeGlobale: 100.000
    };
  },
  computed: {
    totalVentesSim() {
      return this.simVentesJour.reduce((acc, item) => acc + (parseInt(item.ventes) || 0), 0);
    },
    nbJoursPrimeSim() {
      return this.simVentesJour.filter(item => (parseInt(item.ventes) || 0) > 10).length;
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
  watch: {
    simJours(val) {
      let count = parseInt(val) || 1;
      if (count > 15) count = 15;
      if (count < 1) count = 1;

      const current = this.simVentesJour.length;
      if (count > current) {
        let maxId = this.simVentesJour.reduce((max, item) => Math.max(max, item.id || 0), 0);
        const newItems = [];
        for (let i = current; i < count; i++) {
          maxId++;
          newItems.push({ id: maxId, ventes: 10 });
        }
        this.simVentesJour = [...this.simVentesJour, ...newItems];
      } else if (count < current) {
        this.simVentesJour = this.simVentesJour.slice(0, count);
      }
    }
  }
}).mount('#app');
