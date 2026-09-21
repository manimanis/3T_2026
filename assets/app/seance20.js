/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°20 - ÉVALUATION PRATIQUE FINALE & BILAN
 * Épreuve Pratique Finale de Synthèse (60 min) & Bilan Annuel (30 min)
 * Barème : /20 points - Synthese_Nom_Prenom.py
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      criteresEvaluation: [
        { niveau: "Socle (8 pts)", critere: "Act 1 : Analyse globale du sujet, arbre modulaire et formalisation rigoureuse TDO/TDOL", points: "4 pts" },
        { niveau: "Socle (8 pts)", critere: "Act 2 : Saisie contrôlée et allocation statique numpy.array de la série expérimentale", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 3 : Module de traitement scientifique (arithmétique optimisée ou textuel)", points: "4 pts" },
        { niveau: "Maîtrise (8 pts)", critere: "Act 4 : Module de manipulation algorithmique (recherche avec arrêt ou tri à bulles)", points: "4 pts" },
        { niveau: "Dépassement (4 pts)", critere: "Act 5 : Intégration modulaire sans faille et recette sur les 3 jeux d'essais imposés", points: "4 pts" },
        { niveau: "Bilan Annuel", critere: "Act 6 : Grille d'auto-évaluation du profil de sortie de 3e et perspectives 4e Bac", points: "Bilan" }
      ],

      competencesBilan: [
        { domaine: "Structures Itératives", acquis: "Maîtrise de Pour (borné), Tant Que (condition préalable) et Répéter (post-condition)" },
        { domaine: "Structures de Données", acquis: "Manipulation des chaînes normalisées et tableaux 1D statiques homogènes (numpy)" },
        { domaine: "Modularité Logicielle", acquis: "Décomposition descendante, fonctions pures, procédures, passage par référence (@)" },
        { domaine: "Arithmétique Numérique", acquis: "Divisibilité euclidienne, PGCD (Euclide), PPCM, primalité optimisée (sqrt) et décomposition" },
        { domaine: "Algorithmes de Base", acquis: "Recherche séquentielle avec arrêt immédiat, permutations in-place et Tri à bulles optimisé" },
        { domaine: "Perspectives 4e Bac", acquis: "Introduction future des Enregistrements, Fichiers de données et Récursivité" }
      ]
    };
  },

  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
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
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        if (typeof window.showToast === 'function') {
          window.showToast("Code copié !");
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
    },

    jumpToSection(sectionId) {
      if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.showSection === 'function') {
        window.sectionDrawerInstance.showSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  },

  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.$nextTick(() => {
      if (typeof window.safeHighlightAll === 'function') {
        window.safeHighlightAll();
      } else if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }
      this.renderMath();
    });
  }
}).mount('#app');
