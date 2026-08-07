/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°12 (Arithmétique II : Nombres Premiers & Décomposition)
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

    // Helper: Test de primalité optimisé (≤ sqrt(n))
    const fnEstPremier = (n) => {
      if (n < 2) return { isPrime: false, bound: 0, iterations: 0 };

      const bound = Math.floor(Math.sqrt(n));
      let i = 2;
      let isPrime = true;
      let iterations = 0;

      while (i <= bound && isPrime) {
        iterations++;
        if (n % i === 0) {
          isPrime = false;
        } else {
          i++;
        }
      }

      return { isPrime, bound, iterations };
    };

    // Helper: Prochain premier > n
    const fnProchainPremier = (n) => {
      let p = n + 1;
      while (!fnEstPremier(p).isPrime) {
        p++;
      }
      return p;
    };

    // Helper: Décomposition en facteurs premiers
    const fnDecomposerFacteurs = (n) => {
      if (n <= 1) return { factors: [], formatted: 'Aucun' };

      const factors = [];
      let temp = n;
      let div = 2;

      while (temp > 1) {
        while (temp % div === 0) {
          factors.push(div);
          temp = Math.floor(temp / div);
        }
        div++;
      }

      // Group factors by exponents (e.g. [2, 2, 3, 5] -> "2² × 3 × 5")
      const counts = {};
      factors.forEach(f => {
        counts[f] = (counts[f] || 0) + 1;
      });

      const parts = [];
      Object.keys(counts).forEach(f => {
        const exp = counts[f];
        if (exp === 1) {
          parts.push(`${f}`);
        } else if (exp === 2) {
          parts.push(`${f}²`);
        } else if (exp === 3) {
          parts.push(`${f}³`);
        } else {
          parts.push(`${f}^${exp}`);
        }
      });

      return {
        factors,
        formatted: parts.join(' × ')
      };
    };

    // =========================================================
    // ANALYSEUR ARITHMÉTIQUE RÉACTIF
    // =========================================================
    const inputN = ref(60);

    const analyseResult = computed(() => {
      const n = Math.max(2, parseInt(inputN.value) || 2);

      const primeCheck = fnEstPremier(n);
      const nextPrime = primeCheck.isPrime ? fnProchainPremier(n) : null;
      const decomp = !primeCheck.isPrime ? fnDecomposerFacteurs(n) : null;

      // Unoptimized iterations comparison (testing up to n-1)
      const unoptimizedIterations = primeCheck.isPrime ? Math.max(0, n - 2) : primeCheck.iterations;

      return {
        n: n,
        isPrime: primeCheck.isPrime,
        bound: primeCheck.bound,
        iterationsOptimized: primeCheck.iterations,
        iterationsUnoptimized: unoptimizedIterations,
        nextPrime: nextPrime,
        decomp: decomp
      };
    });

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      inputN,
      analyseResult
    };
  }
}).mount('#app');
