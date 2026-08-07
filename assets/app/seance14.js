/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°14 (Tri d'un Tableau – Le Tri à Bulles)
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

    // Initial Marathon Dataset (Parallel arrays: Noms & Temps)
    const runners = ref([
      { nom: 'Sami Kraiem', temps: 1450.5 },
      { nom: 'Youssef Ben Ali', temps: 1210.0 },
      { nom: 'Aya Trabelsi', temps: 1380.2 },
      { nom: 'Ahmed Mansour', temps: 1195.8 },
      { nom: 'Nour El Houda', temps: 1320.0 },
      { nom: 'Mohamed Cherif', temps: 1285.4 }
    ]);

    const sortOrder = ref('croissant'); // 'croissant' or 'decroissant'

    // Official Bubble Sort Synchrone implementation + trace generator
    const sortedResult = computed(() => {
      // Clone array
      const arr = runners.value.map(r => ({ ...r }));
      const n = arr.length;
      let totalSwaps = 0;
      const passTrace = [];

      for (let i = 0; i < n - 1; i++) {
        let passSwaps = 0;
        for (let j = 0; j < n - 1 - i; j++) {
          const condition = sortOrder.value === 'croissant'
            ? arr[j].temps > arr[j + 1].temps
            : arr[j].temps < arr[j + 1].temps;

          if (condition) {
            // Swap Temps
            const auxT = arr[j].temps;
            arr[j].temps = arr[j + 1].temps;
            arr[j + 1].temps = auxT;

            // Swap Noms
            const auxN = arr[j].nom;
            arr[j].nom = arr[j + 1].nom;
            arr[j + 1].nom = auxN;

            passSwaps++;
            totalSwaps++;
          }
        }

        passTrace.push({
          passIndex: i + 1,
          swapsCount: passSwaps,
          snapshot: arr.map(r => `${r.nom} (${r.temps}s)`)
        });
      }

      return {
        sortedRunners: arr,
        totalSwaps: totalSwaps,
        passTrace: passTrace,
        podium: {
          gold: arr[0] || null,
          silver: arr[1] || null,
          bronze: arr[2] || null
        }
      };
    });

    // Form state for adding new runner
    const newRunnerName = ref('');
    const newRunnerTime = ref('');
    const addMessage = ref('');
    const isAddError = ref(false);

    const addRunner = () => {
      const name = newRunnerName.value.trim();
      const timeVal = parseFloat(newRunnerTime.value);

      if (!name) {
        addMessage.value = "⚠️ Le nom du coureur est obligatoire.";
        isAddError.value = true;
        return;
      }

      if (isNaN(timeVal) || timeVal <= 0) {
        addMessage.value = "⚠️ Le temps doit être un nombre réel positif (> 0).";
        isAddError.value = true;
        return;
      }

      runners.value.push({ nom: name, temps: timeVal });
      addMessage.value = `✅ Athlète ${name} (${timeVal}s) ajouté avec succès !`;
      isAddError.value = false;
      newRunnerName.value = '';
      newRunnerTime.value = '';
    };

    const removeRunner = (index) => {
      if (runners.value.length > 4) {
        runners.value.splice(index, 1);
      }
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      runners,
      sortOrder,
      sortedResult,

      newRunnerName,
      newRunnerTime,
      addMessage,
      isAddError,
      addRunner,
      removeRunner
    };
  }
}).mount('#app');
