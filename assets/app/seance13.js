/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°13 (Recherche Séquentielle dans un Tableau 1D)
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

    // Parallel Arrays initial data
    const students = ref([
      { id: 101, moy: 14.5 },
      { id: 104, moy: 17.0 },
      { id: 109, moy: 16.5 },
      { id: 112, moy: 12.0 },
      { id: 115, moy: 15.2 },
      { id: 120, moy: 18.5 }
    ]);

    // Official Sequential Search Function (No break)
    const fnRechercheSequentielle = (arr, val) => {
      let i = 0;
      let trouve = false;
      let pos = -1;
      const steps = [];

      while (i < arr.length && !trouve) {
        const currentVal = arr[i].id;
        const match = (currentVal === val);
        steps.push({
          index: i,
          id: currentVal,
          match: match
        });

        if (match) {
          trouve = true;
          pos = i;
        } else {
          i++;
        }
      }

      return { pos, steps, totalComparisons: steps.length };
    };

    // Search Reactive State
    const searchIdInput = ref(109);

    const searchResult = computed(() => {
      const targetId = parseInt(searchIdInput.value) || 0;
      if (targetId <= 0) {
        return { pos: -1, steps: [], totalComparisons: 0, foundStudent: null };
      }

      const res = fnRechercheSequentielle(students.value, targetId);
      const foundStudent = res.pos !== -1 ? students.value[res.pos] : null;

      return {
        pos: res.pos,
        steps: res.steps,
        totalComparisons: res.totalComparisons,
        foundStudent: foundStudent
      };
    });

    // Add Student Form State (with uniqueness check)
    const newId = ref(125);
    const newMoy = ref(15.5);
    const addMessage = ref('');
    const isAddError = ref(false);

    const addStudent = () => {
      const idVal = parseInt(newId.value);
      const moyVal = parseFloat(newMoy.value);

      if (!idVal || idVal <= 0) {
        addMessage.value = "⚠️ L'ID doit être un entier positif (> 0).";
        isAddError.value = true;
        return;
      }

      if (isNaN(moyVal) || moyVal < 0 || moyVal > 20) {
        addMessage.value = "⚠️ La moyenne doit être comprise entre 0.0 et 20.0.";
        isAddError.value = true;
        return;
      }

      // Check uniqueness using recherche_sequentielle
      const existingCheck = fnRechercheSequentielle(students.value, idVal);
      if (existingCheck.pos !== -1) {
        addMessage.value = `❌ Erreur : L'ID ${idVal} existe déjà à la position N° ${existingCheck.pos + 1} !`;
        isAddError.value = true;
        return;
      }

      // Add to parallel arrays
      students.value.push({ id: idVal, moy: moyVal });
      addMessage.value = `✅ Élève ID ${idVal} ajouté avec succès !`;
      isAddError.value = false;
      newId.value = idVal + 5;
    };

    const removeStudent = (index) => {
      if (students.value.length > 3) {
        students.value.splice(index, 1);
      }
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      students,
      searchIdInput,
      searchResult,

      newId,
      newMoy,
      addMessage,
      isAddError,
      addStudent,
      removeStudent
    };
  }
}).mount('#app');
