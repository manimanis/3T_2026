/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°15 (Synthèse & Mini-Projet Modulaire Python GIES)
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

    // Class Students Dataset (Parallel arrays: IDs & Notes)
    const students = ref([
      { id: 101, note: 14.5 },
      { id: 105, note: 8.0 },
      { id: 109, note: 18.5 },
      { id: 112, note: 11.0 },
      { id: 118, note: 16.0 }
    ]);

    // Active terminal output log
    const consoleLogs = ref([
      "=== GESTIONNAIRE INTÉGRÉ D'ÉVALUATION SCOLAIRE (GIES) ===",
      "Système prêt. Sélectionnez une option ci-dessous."
    ]);

    const activeMenuOption = ref(0);
    const searchIdInput = ref(109);

    // Official Sequential Search helper
    const fnRechercheSeq = (arr, val) => {
      let i = 0;
      let trouve = false;
      let pos = -1;
      while (i < arr.length && !trouve) {
        if (arr[i].id === val) {
          trouve = true;
          pos = i;
        } else {
          i++;
        }
      }
      return pos;
    };

    // Action 1: Relevé
    const runAfficherReleve = () => {
      activeMenuOption.value = 2;
      consoleLogs.value = [
        "=== RELEVÉ DE NOTES DE LA CLASSE ===",
        ...students.value.map((st, i) => `Rang ${i + 1} | ID : ${st.id} | Note : ${st.note.toFixed(1)} / 20`)
      ];
    };

    // Action 2: Tri Décroissant (Tri à bulles synchrone)
    const runTrierClasse = () => {
      activeMenuOption.value = 3;
      const arr = students.value;
      const n = arr.length;

      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
          if (arr[j].note < arr[j + 1].note) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }

      consoleLogs.value = [
        "✅ Classe triée avec succès par ordre décroissant des notes !",
        "=== RELEVÉ DE NOTES TRIÉ (DÉCROISSANT) ===",
        ...students.value.map((st, i) => `Rang ${i + 1} | ID : ${st.id} | Note : ${st.note.toFixed(1)} / 20`)
      ];
    };

    // Action 3: Recherche Séquentielle par ID
    const runRechercherID = () => {
      activeMenuOption.value = 4;
      const targetId = parseInt(searchIdInput.value) || 0;
      const idx = fnRechercheSeq(students.value, targetId);

      if (idx !== -1) {
        const st = students.value[idx];
        consoleLogs.value = [
          `=== RECHERCHE DE L'ÉLÈVE ID ${targetId} ===`,
          `✅ Élève trouvé à la position N° ${idx + 1} !`,
          `• Identifiant ID : ${st.id}`,
          `• Note scolaire   : ${st.note.toFixed(1)} / 20`,
          `• Statut         : ${st.note >= 10.0 ? 'Admis(e)' : 'Ajourné(e)'}`
        ];
      } else {
        consoleLogs.value = [
          `=== RECHERCHE DE L'ÉLÈVE ID ${targetId} ===`,
          `❌ Erreur : Aucun élève répertorié avec l'ID ${targetId}.`
        ];
      }
    };

    // Action 4: Statistiques de Classe
    const statsResult = computed(() => {
      const arr = students.value;
      if (arr.length === 0) return null;

      let somme = 0;
      let maxN = arr[0].note;
      let minN = arr[0].note;
      let nbAdmis = 0;

      arr.forEach(st => {
        somme += st.note;
        if (st.note > maxN) maxN = st.note;
        if (st.note < minN) minN = st.note;
        if (st.note >= 10.0) nbAdmis++;
      });

      const moy = somme / arr.length;
      const taux = (nbAdmis / arr.length) * 100;

      return {
        count: arr.length,
        moy: moy,
        maxN: maxN,
        minN: minN,
        nbAdmis: nbAdmis,
        taux: taux
      };
    });

    const runAfficherStats = () => {
      activeMenuOption.value = 5;
      const st = statsResult.value;
      consoleLogs.value = [
        "=== BILAN STATISTIQUE DE LA CLASSE ===",
        `• Effectif Total    : ${st.count} élèves`,
        `• Moyenne Générale  : ${st.moy.toFixed(2)} / 20`,
        `• Meilleure Note    : ${st.maxN.toFixed(1)} / 20`,
        `• Moins bonne Note  : ${st.minN.toFixed(1)} / 20`,
        `• Nombre d'Admis    : ${st.nbAdmis} / ${st.count}`,
        `• Taux de Réussite  : ${st.taux.toFixed(1)} %`
      ];
    };

    // Form state for adding new student
    const newId = ref(125);
    const newNote = ref(15.0);
    const addMessage = ref('');
    const isAddError = ref(false);

    const addStudent = () => {
      const idVal = parseInt(newId.value);
      const noteVal = parseFloat(newNote.value);

      if (!idVal || idVal <= 0) {
        addMessage.value = "⚠️ L'ID doit être un entier positif (> 0).";
        isAddError.value = true;
        return;
      }

      if (isNaN(noteVal) || noteVal < 0 || noteVal > 20) {
        addMessage.value = "⚠️ La note doit être comprise entre 0.0 et 20.0.";
        isAddError.value = true;
        return;
      }

      // Check uniqueness
      if (fnRechercheSeq(students.value, idVal) !== -1) {
        addMessage.value = `❌ Erreur : L'ID ${idVal} existe déjà !`;
        isAddError.value = true;
        return;
      }

      students.value.push({ id: idVal, note: noteVal });
      addMessage.value = `✅ Élève ID ${idVal} (Note: ${noteVal}/20) ajouté !`;
      isAddError.value = false;
      newId.value = idVal + 5;
      runAfficherReleve();
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      students,
      consoleLogs,
      activeMenuOption,
      searchIdInput,
      statsResult,

      newId,
      newNote,
      addMessage,
      isAddError,

      runAfficherReleve,
      runTrierClasse,
      runRechercherID,
      runAfficherStats,
      addStudent
    };
  }
}).mount('#app');
