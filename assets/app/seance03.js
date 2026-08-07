/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°3 (Structure conditionnelle à choix multiples Selon / match...case)
 */

const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const theme = ref(localStorage.getItem('theme') || 'dark');
    
    // Convertisseur de Stockage & Durée de Téléchargement
    const choix = ref(1);
    const tailleOctets = ref(1048576); // Default 1 Mo (1048576 octets)
    const vitesseMoS = ref(10.0);

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme.value);
      localStorage.setItem('theme', theme.value);
    };

    const formatOctets = computed(() => {
      return Number(tailleOctets.value || 0).toLocaleString('fr-FR');
    });

    const calculResultat = computed(() => {
      const oct = Number(tailleOctets.value) || 0;
      const chx = Number(choix.value);

      switch (chx) {
        case 1:
          return {
            valeur: (oct / 1024).toFixed(3),
            unite: 'Ko (Kilo-Octets)',
            details: `${formatOctets.value} / 1024`,
            pythonCase: 'case 1:'
          };
        case 2:
          return {
            valeur: (oct / (1024 * 1024)).toFixed(3),
            unite: 'Mo (Méga-Octets)',
            details: `${formatOctets.value} / (1024 × 1024)`,
            pythonCase: 'case 2:'
          };
        case 3:
          return {
            valeur: (oct / (1024 * 1024 * 1024)).toFixed(4),
            unite: 'Go (Giga-Octets)',
            details: `${formatOctets.value} / (1024 × 1024 × 1024)`,
            pythonCase: 'case 3:'
          };
        case 4: {
          const mo = oct / (1024 * 1024);
          const dur = mo / vitesseMoS.value;
          return {
            valeur: dur.toFixed(2),
            unite: 'secondes (à 10 Mo/s)',
            details: `(${mo.toFixed(3)} Mo) / ${vitesseMoS.value} Mo/s`,
            pythonCase: 'case 4:'
          };
        }
        default:
          return {
            valeur: 'Erreur',
            unite: 'Choix invalide',
            details: 'Choix hors limites (1-4)',
            pythonCase: 'case _:'
          };
      }
    });

    const presetOctets = (val) => {
      tailleOctets.value = val;
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,
      choix,
      tailleOctets,
      vitesseMoS,
      formatOctets,
      calculResultat,
      presetOctets
    };
  }
}).mount('#app');
