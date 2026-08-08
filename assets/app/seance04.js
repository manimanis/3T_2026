/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°4 (Structures itératives à condition d'arrêt: Tant Que & Répéter)
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
    // SIMULATEUR 1 : LE JEU DU NOMBRE SECRET
    // =========================================================
    const minSecret = 1;
    const maxSecret = 50;
    const maxEssais = 6;

    const secret = ref(Math.floor(Math.random() * (maxSecret - minSecret + 1)) + minSecret);
    const essaiInput = ref(null);
    const nbEssais = ref(0);
    const trouve = ref(false);
    const meilScore = ref(localStorage.getItem('secret_best_score') || null);
    const historique = ref([]);
    const messageFeedback = ref({ text: 'Devinez le nombre secret entre 1 et 50.', type: 'info' });
    const validationErreur = ref('');

    const partieFinie = computed(() => {
      return trouve.value || nbEssais.value >= maxEssais;
    });

    const essaisRestants = computed(() => {
      return Math.max(0, maxEssais - nbEssais.value);
    });

    const nouveauJeu = () => {
      secret.value = Math.floor(Math.random() * (maxSecret - minSecret + 1)) + minSecret;
      essaiInput.value = null;
      nbEssais.value = 0;
      trouve.value = false;
      historique.value = [];
      validationErreur.value = '';
      messageFeedback.value = {
        text: 'Nouveau jeu démarré ! Saisissez une proposition entre 1 et 50.',
        type: 'info'
      };
    };

    const soumettreEssai = () => {
      if (partieFinie.value) return;

      const val = Number(essaiInput.value);

      // Contrôle de saisie strict (Simule le while not (1 <= val <= 50))
      if (isNaN(val) || val < minSecret || val > maxSecret) {
        validationErreur.value = `⚠️ Proposition invalide ! La valeur doit être comprise entre ${minSecret} et ${maxSecret}.`;
        return;
      }

      validationErreur.value = '';
      nbEssais.value++;

      let textFb = '';
      let typeFb = '';

      if (val === secret.value) {
        trouve.value = true;
        textFb = `🎉 Bravo ! Vous avez trouvé le nombre secret (${secret.value}) en ${nbEssais.value} essai(s) !`;
        typeFb = 'success';

        // Sauvegarde meilleur score
        if (!meilScore.value || nbEssais.value < meilScore.value) {
          meilScore.value = nbEssais.value;
          localStorage.setItem('secret_best_score', nbEssais.value);
        }
      } else if (val < secret.value) {
        textFb = `↗️ C'est PLUS ! (${val} est trop petit)`;
        typeFb = 'warning';
      } else {
        textFb = `↘️ C'est MOINS ! (${val} est trop grand)`;
        typeFb = 'primary';
      }

      historique.value.unshift({
        num: nbEssais.value,
        valeur: val,
        indication: val === secret.value ? 'ÉGAL' : (val < secret.value ? 'PLUS' : 'MOINS'),
        type: typeFb
      });

      if (!trouve.value && nbEssais.value >= maxEssais) {
        textFb = `❌ Perdu ! Vous avez épuisé vos ${maxEssais} essais. Le nombre secret était : ${secret.value}`;
        typeFb = 'danger';
      }

      messageFeedback.value = { text: textFb, type: typeFb };
      essaiInput.value = null;
    };

    // =========================================================
    // SIMULATEUR 2 : CONTRÔLE DE SAISIE PAR PAS
    // =========================================================
    const valPair = ref(null);
    const traceSaisie = ref([]);
    const statutSaisie = ref({ valide: false, message: 'En attente d\'une saisie...', code: 'while val % 2 != 0:' });

    const testerSaisiePair = () => {
      const v = Number(valPair.value);
      if (isNaN(v)) {
        statutSaisie.value = {
          valide: false,
          message: 'Veuillez entrer un nombre entier valide.',
          code: 'while val % 2 != 0: # Condition VRAIE (Non numérique)'
        };
        return;
      }

      const conditionPoursuite = (v % 2 !== 0);

      if (conditionPoursuite) {
        statutSaisie.value = {
          valide: false,
          message: `❌ ${v} est IMPAIR. Condition (val % 2 != 0) = VRAI. Réitération de la boucle !`,
          code: `val = ${v} -> val % 2 != 0 est VRAI -> On demande à nouveau !`
        };
        traceSaisie.value.unshift({
          valeur: v,
          valide: false,
          explication: 'Impair (Rejeté par la boucle while)'
        });
      } else {
        statutSaisie.value = {
          valide: true,
          message: `✅ ${v} est PAIR. Condition (val % 2 != 0) = FAUX. Sortie de la boucle !`,
          code: `val = ${v} -> val % 2 != 0 est FAUX -> Boucle terminée avec succès !`
        };
        traceSaisie.value.unshift({
          valeur: v,
          valide: true,
          explication: 'Pair (Accepté - Sortie de boucle)'
        });
      }
    };

    const reinitialiserSaisie = () => {
      valPair.value = null;
      traceSaisie.value = [];
      statutSaisie.value = { valide: false, message: 'En attente d\'une saisie...', code: 'while val % 2 != 0:' };
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', theme.value);
    });

    return {
      theme,
      toggleTheme,

      // Jeu Nombre Secret
      minSecret,
      maxSecret,
      maxEssais,
      secret,
      essaiInput,
      nbEssais,
      trouve,
      meilScore,
      partieFinie,
      essaisRestants,
      historique,
      messageFeedback,
      validationErreur,
      nouveauJeu,
      soumettreEssai,

      // Contrôle de saisie
      valPair,
      traceSaisie,
      statutSaisie,
      testerSaisiePair,
      reinitialiserSaisie
    };
  }
}).mount('#app');
