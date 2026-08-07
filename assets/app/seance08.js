/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°8 (Paramètres, Valeurs de Retour et Portée)
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
    // SIMULATEUR 1 : CONVERTISSEUR DE TEMPS (sec -> H:M:S)
    // =========================================================
    const dureeSecInput = ref(7385); // Default 7385s = 2h 3m 5s

    const tempsConverti = computed(() => {
      const sec = Math.max(0, parseInt(dureeSecInput.value) || 0);

      const h = Math.floor(sec / 3600);
      const reste = sec % 3600;
      const m = Math.floor(reste / 60);
      const s = reste % 60;

      return {
        secTotales: sec,
        h,
        reste,
        m,
        s
      };
    });

    // =========================================================
    // SIMULATEUR 2 : PERMUTATION DE DEUX VARIABLES (A <-> B)
    // =========================================================
    const valA = ref(42);
    const valB = ref(99);
    const auxMemory = ref(null);
    const stepMessage = ref('Cliquez sur "Exécuter la Permutation" pour simuler l\'échange.');

    const executePermutation = () => {
      const initialA = valA.value;
      const initialB = valB.value;

      auxMemory.value = initialA;
      stepMessage.value = `1. aux = A (${initialA}) | 2. A = B (${initialB}) | 3. B = aux (${initialA})`;

      valA.value = initialB;
      valB.value = initialA;
    };

    const reinitialiserPermutation = () => {
      valA.value = 42;
      valB.value = 99;
      auxMemory.value = null;
      stepMessage.value = 'Valeurs réinitialisées (A = 42, B = 99).';
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      dureeSecInput,
      tempsConverti,

      valA,
      valB,
      auxMemory,
      stepMessage,
      executePermutation,
      reinitialiserPermutation
    };
  }
}).mount('#app');
