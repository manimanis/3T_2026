/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°9 (Modules Prédéfinis et Passage de Tableaux)
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
    // OUTIL 1 : GÉNÉRATEUR DE CODE ÉLÈVE (Fonctions sur Chaînes)
    // =========================================================
    const nomEleve = ref('ben ali');
    const anneeNaissance = ref(2008);

    const codeEleveGenere = computed(() => {
      const nom = (nomEleve.value || '').trim();
      const ann = Math.max(1900, Math.min(2026, parseInt(anneeNaissance.value) || 2008));

      if (nom.length < 3) {
        return '⚠️ Le nom doit contenir au moins 3 caractères.';
      }

      // Extraction 3 premiers caractères en majuscules + année
      const prefixe = nom.substring(0, 3).toUpperCase();
      return prefixe + ann;
    });

    // =========================================================
    // OUTIL 2 : GÉNÉRATEUR & ANALYSEUR MODULAIRE DE CLASSE
    // =========================================================
    const nEleves = ref(8); // Taille N (5 à 40)
    const tNotes = ref([14, 8, 16, 11, 7, 18, 12, 9]); // Default notes
    const tAdmis = ref([14, 16, 11, 18, 12]); // Extracted admis
    const notificationSysteme = ref({ text: 'Tableau T_notes initialisé avec 8 notes de test.', type: 'info' });

    const validerTaille = () => {
      const n = Number(nEleves.value);
      return !isNaN(n) && n >= 5 && n <= 40;
    };

    // Module 2 (Procédure) : Remplir notes aléatoires via randint(0, 20)
    const remplirNotesAleatoires = () => {
      if (!validerTaille()) {
        notificationSysteme.value = { text: '⚠️ Nombre N invalide ! Choisir entre 5 et 40.', type: 'warning' };
        return;
      }

      const n = Number(nEleves.value);
      const arr = [];
      for (let i = 0; i < n; i++) {
        // Simulation de randint(0, 20)
        arr.push(Math.floor(Math.random() * 21));
      }
      tNotes.value = arr;

      // Réinitialiser la liste d'admis
      extraireAdmisModulaire();

      notificationSysteme.value = {
        text: `🎲 ${n} notes entières (0 à 20) générées aléatoirement via randint(0, 20).`,
        type: 'success'
      };
    };

    // Module 4 (Fonction) : Calculer la moyenne
    const moyenneClasse = computed(() => {
      if (!tNotes.value || tNotes.value.length === 0) return '0.00';
      const sum = tNotes.value.reduce((acc, v) => acc + v, 0);
      return (sum / tNotes.value.length).toFixed(2);
    });

    // Module 5 (Fonction/Procédure) : Extraire admis dans T_admis
    const extraireAdmisModulaire = () => {
      const admisList = tNotes.value.filter(note => note >= 10);
      tAdmis.value = admisList;
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      nomEleve,
      anneeNaissance,
      codeEleveGenere,

      nEleves,
      tNotes,
      tAdmis,
      moyenneClasse,
      notificationSysteme,

      remplirNotesAleatoires,
      extraireAdmisModulaire
    };
  }
}).mount('#app');
