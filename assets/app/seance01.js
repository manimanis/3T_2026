/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°1 (Drawer Navigation & Interactive Features)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',
      activeSection: 'objectifs',
      sections: [
        { id: 'objectifs', title: 'Objectifs & Déroulement', icon: 'bi-target', badge: '15 min', subtitle: 'Compétences & timing' },
        { id: 'cours', title: 'Résumé de Cours', icon: 'bi-journal-text', badge: '25 min', subtitle: 'TDO & Correspondance Python' },
        { id: 'activites', title: 'Activités Pratiques', icon: 'bi-code-slash', badge: '35 min', subtitle: 'Exercices & Pénalité' },
        { id: 'simulateur', title: 'Bac à Sable / Simulateur', icon: 'bi-play-square', badge: 'Thonny', subtitle: 'Console Python 3.11' },
        { id: 'quiz', title: 'Auto-évaluation (QCM)', icon: 'bi-question-square', badge: '4 QCM', subtitle: 'Quizz Diagnostique' }
      ],
      showCorrectionAct1: false,
      conversionCode: `# Conversion d'une chaîne vers un entier\nnb = int(input("Donner un nombre entier : "))\n\n# Conversion d'une chaîne vers un réel\nprix = float(input("Donner le prix : "))\n\n# Conversion d'un nombre vers une chaîne (pour concaténation)\nmessage = "Votre note est : " + str(15.5)`,
      pyCodeAct2: `# Declarations des constantes\nTARIF_JOUR = 0.500\nTAXE_FIXE = 1.200\n\n# Saisie des donnees\nnom = input("Nom de l'élève : ")\ntitre = input("Titre du livre : ")\nnb_jours = int(input("Nombre de jours de retard : "))\n\n# Traitement\nmontant_total = (nb_jours * TARIF_JOUR) + TAXE_FIXE\n\n# Affichage des resultats\nprint("\\n--- FICHE DE PÉNALITÉ ---")\nprint("Élève :", nom)\nprint("Livre :", titre)\nprint("Montant total à payer :", montant_total, "DT")`,

      // Simulator inputs
      simNom: 'Aymen Mansouri',
      simTitre: 'Programmation Python 3T',
      simJours: 5
    };
  },
  computed: {
    currentSectionObj() {
      return this.sections.find(s => s.id === this.activeSection) || this.sections[0];
    },
    computedPenalite() {
      const j = this.simJours || 0;
      return (j * 0.500) + 1.200;
    }
  },
  methods: {
    selectSection(sectionId) {
      this.activeSection = sectionId;
      this.closeDrawer();
      this.$nextTick(() => {
        if (typeof hljs !== 'undefined') {
          hljs.highlightAll();
        }
        this.renderMath();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    },
    closeDrawer() {
      const drawerEl = document.getElementById('seanceDrawer');
      if (drawerEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
        const instance = bootstrap.Offcanvas.getInstance(drawerEl);
        if (instance) {
          instance.hide();
        }
      }
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    },
    toggleCorrectionAct1() {
      this.showCorrectionAct1 = !this.showCorrectionAct1;
      this.$nextTick(() => {
        if (typeof hljs !== 'undefined') {
          hljs.highlightAll();
        }
      });
    },
    copyCode(text, event) {
      let codeEl = null;
      let btnEl = null;
      if (event && event.currentTarget) {
        btnEl = event.currentTarget;
        const container = btnEl.closest('.code-container') || btnEl.parentNode;
        if (container) {
          codeEl = container.querySelector('code');
        }
      }
      if (window.codeClipboardInstance) {
        window.codeClipboardInstance.copyToClipboard(text, btnEl, codeEl);
      } else {
        navigator.clipboard.writeText(text);
        if (typeof window.showToast === 'function') {
          window.showToast("Code copié dans le presse-papier !");
        }
      }
    },
    renderMath() {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    }
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.$nextTick(() => {
      if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }
      this.renderMath();
    });
  }
}).mount('#app');
