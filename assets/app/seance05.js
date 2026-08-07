/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°5 (Tableaux à 1 Dimension 1D - Déclaration, Saisie & Parcours)
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
    // SIMULATEUR : TABLEAU 1D STATION MÉTÉO (numpy.array)
    // =========================================================
    const minN = 3;
    const maxN = 31;

    const nJours = ref(7); // Default 7 jours
    const estAllocated = ref(true);
    const tempArray = ref([24.5, 26.0, 22.8, 25.4, 27.1, 23.5, 28.0]); // Pre-filled default
    const indiceEnCours = ref(0);
    const valInput = ref(25.0);
    const validationErreur = ref('');
    const notificationSysteme = ref({ text: 'Tableau Temp de 7 réels prêt en mémoire.', type: 'info' });

    const codePythonSnippet = computed(() => {
      return `from numpy import array\n\nn = ${nJours.value}\nTemp = array([0.0] * n)`;
    });

    const validerTaille = () => {
      const n = Number(nJours.value);
      if (isNaN(n) || n < minN || n > maxN) {
        validationErreur.value = `⚠️ Taille invalide ! N doit être compris entre ${minN} et ${maxN}.`;
        estAllocated.value = false;
        return false;
      }

      validationErreur.value = '';
      return true;
    };

    const allouerTableau = () => {
      if (!validerTaille()) return;

      const n = Number(nJours.value);
      // Simule Temp = array([0.0] * n)
      tempArray.value = new Array(n).fill(0.0);
      estAllocated.value = true;
      indiceEnCours.value = 0;
      valInput.value = 20.0;

      notificationSysteme.value = {
        text: `✅ Allocation réussie : Tableau Temp de ${n} réels (numpy.array) initialisé à 0.0 °C.`,
        type: 'success'
      };
    };

    const enregistrerTemperature = () => {
      if (!estAllocated.value) return;

      const i = indiceEnCours.value;
      const v = Number(valInput.value);

      if (isNaN(v) || v < -50 || v > 60) {
        notificationSysteme.value = {
          text: '⚠️ Température irréaliste ! Veuillez entrer une valeur entre -50°C et 60°C.',
          type: 'warning'
        };
        return;
      }

      tempArray.value[i] = parseFloat(v.toFixed(1));

      if (i < tempArray.value.length - 1) {
        indiceEnCours.value++;
        valInput.value = parseFloat((v + (Math.random() * 2 - 1)).toFixed(1));
        notificationSysteme.value = {
          text: `Jour ${i + 1} enregistré (Temp[${i}] = ${tempArray.value[i]} °C). Passage au Jour ${i + 2}.`,
          type: 'info'
        };
      } else {
        notificationSysteme.value = {
          text: `🎉 Remplissage terminé pour tous les ${tempArray.value.length} jours !`,
          type: 'success'
        };
      }
    };

    const genererAleatoire = () => {
      if (!validerTaille()) return;
      const n = Number(nJours.value);
      const arr = [];
      for (let i = 0; i < n; i++) {
        // Températures entre 15°C et 35°C
        arr.push(parseFloat((15 + Math.random() * 20).toFixed(1)));
      }
      tempArray.value = arr;
      estAllocated.value = true;
      indiceEnCours.value = n - 1;
      notificationSysteme.value = {
        text: `🎲 ${n} températures aléatoires générées dans le tableau Temp.`,
        type: 'success'
      };
    };

    const chargerPresetSemaine = () => {
      nJours.value = 7;
      tempArray.value = [22.4, 24.8, 26.1, 23.0, 25.5, 27.2, 28.0];
      estAllocated.value = true;
      indiceEnCours.value = 6;
      validationErreur.value = '';
      notificationSysteme.value = {
        text: '📋 Relevé type de 7 jours (1 semaine) chargé.',
        type: 'info'
      };
    };

    const statistiques = computed(() => {
      if (!tempArray.value || tempArray.value.length === 0) {
        return { min: 0, max: 0, moy: 0 };
      }
      const vals = tempArray.value;
      const min = Math.min(...vals);
      const max = Math.max(...vals);
      const sum = vals.reduce((a, b) => a + b, 0);
      const moy = sum / vals.length;

      return {
        min: min.toFixed(1),
        max: max.toFixed(1),
        moy: moy.toFixed(2)
      };
    });

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      minN,
      maxN,
      nJours,
      estAllocated,
      tempArray,
      indiceEnCours,
      valInput,
      validationErreur,
      notificationSysteme,
      codePythonSnippet,
      statistiques,

      validerTaille,
      allouerTableau,
      enregistrerTemperature,
      genererAleatoire,
      chargerPresetSemaine
    };
  }
}).mount('#app');
