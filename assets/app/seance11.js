/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°11 (Arithmétique I : PGCD & PPCM)
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

    // Helper: PGCD Euclide
    const fnPgcd = (a, b) => {
      let x = Math.abs(a);
      let y = Math.abs(b);
      while (y !== 0) {
        let r = x % y;
        x = y;
        y = r;
      }
      return x;
    };

    // =========================================================
    // MODULE 1 : CALCULATEUR PGCD (TRACE D'EUCLIDE) & PPCM
    // =========================================================
    const inputA = ref(48);
    const inputB = ref(18);

    const traceEuclide = computed(() => {
      let a = Math.max(1, parseInt(inputA.value) || 1);
      let b = Math.max(1, parseInt(inputB.value) || 1);

      const steps = [];
      let currentA = a;
      let currentB = b;
      let stepNum = 1;

      while (currentB !== 0) {
        const r = currentA % currentB;
        steps.push({
          step: stepNum++,
          a: currentA,
          b: currentB,
          r: r,
          eq: `${currentA} = ${currentB} × ${Math.floor(currentA / currentB)} + ${r}`
        });
        currentA = currentB;
        currentB = r;
      }

      const pgcdResult = currentA;
      const ppcmResult = (a * b) / pgcdResult;

      return {
        aOriginal: a,
        bOriginal: b,
        steps: steps,
        pgcd: pgcdResult,
        ppcm: ppcmResult
      };
    });

    // =========================================================
    // MODULE 2 : APPLICATION 1 - SIMPLIFICATION DE FRACTIONS
    // =========================================================
    const numInput = ref(1071);
    const denInput = ref(1029);

    const fractionInfo = computed(() => {
      const n = Math.max(1, parseInt(numInput.value) || 1);
      const d = Math.max(1, parseInt(denInput.value) || 1);

      const g = fnPgcd(n, d);
      return {
        num: n,
        den: d,
        g: g,
        numSimp: n / g,
        denSimp: d / g,
        estIrreductible: g === 1
      };
    });

    // =========================================================
    // MODULE 2 : APPLICATION 2 - SYNCHRONISATION DE BUS
    // =========================================================
    const freqA = ref(15); // Ligne A (minutes)
    const freqB = ref(20); // Ligne B (minutes)

    const busSyncInfo = computed(() => {
      const fA = Math.max(1, parseInt(freqA.value) || 1);
      const fB = Math.max(1, parseInt(freqB.value) || 1);

      const g = fnPgcd(fA, fB);
      const intervalle = (fA * fB) / g; // PPCM

      // Départ à 07:00
      const minTotales = intervalle;
      const hRencontre = 7 + Math.floor(minTotales / 60);
      const mRencontre = minTotales % 60;

      const formatHeure = `${String(hRencontre).padStart(2, '0')}h : ${String(mRencontre).padStart(2, '0')}min`;

      return {
        freqA: fA,
        freqB: fB,
        intervalleMin: intervalle,
        heureFormat: formatHeure
      };
    });

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      inputA,
      inputB,
      traceEuclide,

      numInput,
      denInput,
      fractionInfo,

      freqA,
      freqB,
      busSyncInfo
    };
  }
}).mount('#app');
