/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°6 (Traitements Élémentaires sur Tableaux 1D)
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
    // SIMULATEUR : ANALYSEUR STATISTIQUE DE NOTES DE CLASSE
    // =========================================================
    const minN = 5;
    const maxN = 30;

    const nEleves = ref(7); // Default 7 élèves
    const estAllocated = ref(true);
    const notesArray = ref([12.5, 15.0, 8.5, 18.0, 11.5, 9.0, 14.5]); // Pre-filled default
    const indiceEnCours = ref(0);
    const noteInput = ref(12.0);
    const validationErreur = ref('');
    const notificationSysteme = ref({ text: 'Tableau Notes de 7 réels prêt en mémoire.', type: 'info' });

    const validerTaille = () => {
      const n = Number(nEleves.value);
      if (isNaN(n) || n < minN || n > maxN) {
        validationErreur.value = `⚠️ Nombre invalide ! N doit être compris entre ${minN} et ${maxN}.`;
        estAllocated.value = false;
        return false;
      }

      validationErreur.value = '';
      return true;
    };

    const allouerTableau = () => {
      if (!validerTaille()) return;

      const n = Number(nEleves.value);
      notesArray.value = new Array(n).fill(10.0);
      estAllocated.value = true;
      indiceEnCours.value = 0;
      noteInput.value = 12.0;

      notificationSysteme.value = {
        text: `✅ Allocation réussie : Tableau Notes de ${n} élèves (numpy.array) prêt en mémoire.`,
        type: 'success'
      };
    };

    const enregistrerNote = () => {
      if (!estAllocated.value) return;

      const i = indiceEnCours.value;
      const v = Number(noteInput.value);

      if (isNaN(v) || v < 0 || v > 20) {
        notificationSysteme.value = {
          text: '⚠️ Note invalide ! Une note doit être comprise entre 0.0 et 20.0.',
          type: 'warning'
        };
        return;
      }

      notesArray.value[i] = parseFloat(v.toFixed(2));

      if (i < notesArray.value.length - 1) {
        indiceEnCours.value++;
        noteInput.value = parseFloat((Math.random() * 15 + 5).toFixed(1));
        notificationSysteme.value = {
          text: `Note de l'élève N°${i + 1} enregistrée (Notes[${i}] = ${notesArray.value[i]} / 20). Passage à l'élève N°${i + 2}.`,
          type: 'info'
        };
      } else {
        notificationSysteme.value = {
          text: `🎉 Saisie terminée pour l'ensemble des ${notesArray.value.length} élèves !`,
          type: 'success'
        };
      }
    };

    const genererNotesAleatoires = () => {
      if (!validerTaille()) return;
      const n = Number(nEleves.value);
      const arr = [];
      for (let i = 0; i < n; i++) {
        // Notes entre 4.0 et 19.5
        arr.push(parseFloat((4 + Math.random() * 15.5).toFixed(1)));
      }
      notesArray.value = arr;
      estAllocated.value = true;
      indiceEnCours.value = n - 1;
      notificationSysteme.value = {
        text: `🎲 ${n} notes aléatoires (0 à 20) générées dans le tableau Notes.`,
        type: 'success'
      };
    };

    const chargerPresetClasse = () => {
      nEleves.value = 7;
      notesArray.value = [14.0, 16.5, 9.0, 18.5, 11.0, 7.5, 13.0];
      estAllocated.value = true;
      indiceEnCours.value = 6;
      validationErreur.value = '';
      notificationSysteme.value = {
        text: '📋 Jeu de données type de 7 élèves chargé.',
        type: 'info'
      };
    };

    // Calculs statistiques (Moyenne, Max, Min, Nb d'admis, Taux)
    const statistiques = computed(() => {
      if (!notesArray.value || notesArray.value.length === 0) {
        return { somme: 0, moy: 0, max: 0, min: 0, admis: 0, taux: 0 };
      }

      const arr = notesArray.value;
      const n = arr.length;

      let sum = arr[0];
      let maxV = arr[0];
      let minV = arr[0];
      let nbAdmis = arr[0] >= 10.0 ? 1 : 0;

      for (let i = 1; i < n; i++) {
        sum += arr[i];
        if (arr[i] > maxV) maxV = arr[i];
        if (arr[i] < minV) minV = arr[i];
        if (arr[i] >= 10.0) nbAdmis++;
      }

      const moy = sum / n;
      const tx = (nbAdmis / n) * 100;

      return {
        somme: sum.toFixed(2),
        moy: moy.toFixed(2),
        max: maxV.toFixed(2),
        min: minV.toFixed(2),
        admis: nbAdmis,
        nTotal: n,
        taux: tx.toFixed(1)
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
      nEleves,
      estAllocated,
      notesArray,
      indiceEnCours,
      noteInput,
      validationErreur,
      notificationSysteme,
      statistiques,

      validerTaille,
      allouerTableau,
      enregistrerNote,
      genererNotesAleatoires,
      chargerPresetClasse
    };
  }
}).mount('#app');
