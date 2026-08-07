/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°10 (Évaluation Pratique Intermédiaire - STEG)
 */

const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const theme = ref(localStorage.getItem('theme') || 'dark');

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme.value);
      localStorage.setItem('theme', theme.value);
    };

    // =========================================================
    // SIMULATEUR ÉPREUVE PRATIQUE : BILAN ÉNERGÉTIQUE STEG
    // =========================================================
    const nJours = ref(7); // N ∈ [7, 30]
    const consoArray = ref([18.5, 24.0, 31.2, 12.8, 45.6, 28.4, 22.0]);
    const notification = ref({ text: 'Relevé de 7 jours chargé avec succès.', type: 'info' });

    const validerN = () => {
      const n = Number(nJours.value);
      return !isNaN(n) && n >= 7 && n <= 30;
    };

    // Module 1 & 2 : Génération / Saisie aléatoire simulée (0.5 à 50.0 kWh)
    const genererReleveAleatoire = () => {
      if (!validerN()) {
        notification.value = { text: '⚠️ N Doit être compris entre 7 et 30 jours !', type: 'warning' };
        return;
      }

      const n = Number(nJours.value);
      const arr = [];
      for (let i = 0; i < n; i++) {
        // Generer valeur au dixieme pres entre 2.0 et 48.0 kWh
        const val = +(Math.random() * 46 + 2.0).toFixed(1);
        arr.push(val);
      }
      consoArray.value = arr;
      notification.value = {
        text: `⚡ Relevé de ${n} jours généré avec succès (valeurs contrôlées entre 0.5 et 50.0 kWh).`,
        type: 'success'
      };
    };

    // Module 4 (Fonction) : Moyenne de la période
    const moyenneConso = computed(() => {
      if (!consoArray.value || consoArray.value.length === 0) return '0.00';
      const sum = consoArray.value.reduce((acc, v) => acc + v, 0);
      return (sum / consoArray.value.length).toFixed(2);
    });

    // Module 5 (Fonction) : Rechercher Pic (Max)
    const jourPicInfo = computed(() => {
      if (!consoArray.value || consoArray.value.length === 0) return { jour: 1, val: 0 };

      let idxMax = 0;
      for (let i = 1; i < consoArray.value.length; i++) {
        if (consoArray.value[i] > consoArray.value[idxMax]) {
          idxMax = i;
        }
      }
      return {
        idx: idxMax,
        jour: idxMax + 1,
        val: consoArray.value[idxMax]
      };
    });

    // Module 6 (Fonction) : Compter Surconsommations (> moyenne)
    const nbSurconsommations = computed(() => {
      const moy = parseFloat(moyenneConso.value);
      return consoArray.value.filter(val => val > moy).length;
    });

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      nJours,
      consoArray,
      notification,

      genererReleveAleatoire,
      moyenneConso,
      jourPicInfo,
      nbSurconsommations
    };
  }
}).mount('#app');
