/**
 * 3T_2026 - Séance N°2 (assets/app/seance02.js)
 * Script Vue.js pour la Séance 2 : Simulateur Interactif Vendeur
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      simJours: 5,
      simVentesJour: [], // Stocke 15 objets { id, ventes }
      simBaseJour: 35.000,
      simPrimeJour: 15.000,
      simPrimeGlobale: 100.000
    };
  },
  computed: {
    // Isole proprement la portion de tableau à afficher dans le template
    joursAffiches() {
      const n = parseInt(this.simJours) || 1;
      const count = Math.min(Math.max(n, 1), 15);
      return this.simVentesJour.slice(0, count);
    },
    totalVentesSim() {
      return this.joursAffiches.reduce((acc, item) => acc + (parseInt(item.ventes) || 0), 0);
    },
    nbJoursPrimeSim() {
      return this.joursAffiches.filter(item => (parseInt(item.ventes) || 0) > 10).length;
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
  mounted() {
    console.log("mounted : simulateur vendeur");
    this.initializeArray();
  },
  methods: {
    initializeArray() {
      // Génère 15 objets avec un 'id' immuable pour servir de clé fixe
      this.simVentesJour = Array(15)
        .fill(0)
        .map((_, index) => ({
          id: index + 1,
          ventes: Math.floor(Math.random() * 20) + 10
        }));
    }
  }
}).mount('#app');
