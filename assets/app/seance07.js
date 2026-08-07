/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°7 (Introduction à la Modularité)
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
    // SIMULATEUR : CALCULATEUR GÉOMÉTRIQUE MODULAIRE DU RECTANGLE
    // =========================================================
    const largeurInput = ref(6.0);
    const longueurInput = ref(10.0);
    const validationErreur = ref('');

    // Validation des règles géométriques (0 < Largeur <= Longueur)
    const validerDimensions = () => {
      const l = Number(largeurInput.value);
      const h = Number(longueurInput.value);

      if (isNaN(l) || isNaN(h) || l <= 0) {
        validationErreur.value = '⚠️ La largeur doit être un nombre strictement positif (> 0).';
        return false;
      }

      if (h < l) {
        validationErreur.value = '⚠️ La longueur doit être supérieure ou égale à la largeur (H ≥ L).';
        return false;
      }

      validationErreur.value = '';
      return true;
    };

    // Module 1 : Fonction perimetre(l, h) -> Réel
    const fnPerimetre = (l, h) => {
      return 2 * (l + h);
    };

    // Module 2 : Fonction surface(l, h) -> Réel
    const fnSurface = (l, h) => {
      return l * h;
    };

    // Module 3 : Fonction diagonale(l, h) -> Réel
    const fnDiagonale = (l, h) => {
      return Math.sqrt(l * l + h * h);
    };

    // Calculs réactifs simulés
    const resultatsGeometriques = computed(() => {
      const l = Number(largeurInput.value) || 0;
      const h = Number(longueurInput.value) || 0;

      if (!validerDimensions()) {
        return { p: 0, s: 0, d: 0, valide: false };
      }

      const pVal = fnPerimetre(l, h);
      const sVal = fnSurface(l, h);
      const dVal = fnDiagonale(l, h);

      return {
        p: pVal.toFixed(2),
        s: sVal.toFixed(2),
        d: dVal.toFixed(2),
        valide: true
      };
    });

    // Dimensions normalisées pour le canevas SVG réactif
    const dimensionsSvg = computed(() => {
      const l = Number(largeurInput.value) || 6;
      const h = Number(longueurInput.value) || 10;

      const maxDim = Math.max(l, h, 1);
      const scale = 140 / maxDim;

      const rectW = Math.max(40, Math.min(220, h * scale));
      const rectH = Math.max(30, Math.min(140, l * scale));

      return {
        w: rectW,
        h: rectH,
        x: (280 - rectW) / 2,
        y: (170 - rectH) / 2
      };
    });

    // Chargeurs de Presets
    const chargerPreset = (type) => {
      if (type === 'standard') {
        largeurInput.value = 6.0;
        longueurInput.value = 10.0;
      } else if (type === 'carre') {
        largeurInput.value = 8.0;
        longueurInput.value = 8.0;
      } else if (type === 'grand') {
        largeurInput.value = 15.5;
        longueurInput.value = 30.0;
      }
      validerDimensions();
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      largeurInput,
      longueurInput,
      validationErreur,
      resultatsGeometriques,
      dimensionsSvg,

      validerDimensions,
      chargerPreset
    };
  }
}).mount('#app');
