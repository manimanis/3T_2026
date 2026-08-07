/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Index Page (Syllabus & Course Planning)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',
      searchQuery: '',
      selectedModule: 0,
      activePreview: null,
      modules: [
        { id: 1, shortTitle: "Révision & Acquis" },
        { id: 2, shortTitle: "Structures Avancées" },
        { id: 3, shortTitle: "Modularité" },
        { id: 4, shortTitle: "Algorithmes Classiques" },
        { id: 5, shortTitle: "IoT & ESP32" },
        { id: 6, shortTitle: "Évaluation Bilan" }
      ],
      seances: [
        {
          id: 1,
          moduleId: 1,
          title: "Évaluation Diagnostique & Consolidation Python",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance01.html",
          description: "Révision des constantes, variables, types de données simples, affectation et instructions d'entrée/sortie.",
          objectives: [
            "Structure générale d'un algorithme et TDO",
            "Correspondance Algorithmique ➔ Python",
            "Conversions explicites avec int(), float(), str()"
          ]
        },
        {
          id: 2,
          moduleId: 1,
          title: "Consolidation des structures de contrôle simples",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance02.html",
          description: "Révision des structures conditionnelles (Si...Alors) et itératives bornées (Pour).",
          objectives: [
            "Choix conditionnels et comptage répétitif",
            "Traduction et exécution de scripts Python"
          ]
        },
        {
          id: 3,
          moduleId: 2,
          title: "Structure conditionnelle à choix multiple (Selon)",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance03.html",
          description: "Conception de menus interactifs et traduction en Python (match...case ou if...elif...else).",
          objectives: [
            "Sélecteur de type scalaire",
            "Applications sur menus de conversion"
          ]
        },
        {
          id: 4,
          moduleId: 2,
          title: "Structures répétitives conditionnelles (Tant Que & Répéter)",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance04.html",
          description: "Boucles non bornées avec conditions d'arrêt et contrôle de saisie.",
          objectives: [
            "Saisie sécurisée d'une donnée",
            "Jeu de devinette du nombre secret"
          ]
        },
        {
          id: 5,
          moduleId: 2,
          title: "Tableaux 1D – Saisie & Parcours",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance05.html",
          description: "Déclaration (numpy.array), initialisation et parcours des tableaux à une dimension (Tableaux 1D).",
          objectives: [
            "Stockage contigu de N éléments (from numpy import array)",
            "Indices de 0 à N-1 et affichage élément par élément"
          ]
        },
        {
          id: 6,
          moduleId: 2,
          title: "Traitements élémentaires sur Tableaux 1D",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance06.html",
          description: "Calculs cumulatifs (Somme, Moyenne), extrémums (Max, Min) et comptage conditionnel sur un tableau 1D.",
          objectives: [
            "Somme, moyenne et recherche de Max/Min",
            "Comptage conditionnel (notes >= 10.0)"
          ]
        },
        {
          id: 7,
          moduleId: 3,
          title: "Introduction à la Modularité (Fonction & Procédure)",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance07.html",
          description: "Décomposition descendante (Top-Down), définition de fonctions (def / return) et de procédures.",
          objectives: [
            "Définition (def) et appel de fonctions vs procédures",
            "Distinction entre print() et return"
          ]
        },
        {
          id: 8,
          moduleId: 3,
          title: "Paramètres, Valeurs de retour et Portée",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance08.html",
          description: "Portée locale vs globale, passage par valeur vs par référence (@), mot-clé global et retours multiples.",
          objectives: [
            "Passage par valeur vs par référence (@)",
            "Portée des variables et règle du mot-clé global"
          ]
        },
        {
          id: 9,
          moduleId: 3,
          title: "Modules prédéfinis et Passage de Tableaux",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance09.html",
          description: "Utilisation des modules math, random (randint), chaînes et transmission de tableaux numpy.array.",
          objectives: [
            "Remplissage aléatoire de tableaux (randint)",
            "Passage par adresse de numpy.array en paramètre"
          ]
        },
        {
          id: 10,
          moduleId: 3,
          title: "Évaluation Pratique Intermédiaire",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance10.html",
          description: "Épreuve pratique individuelle sur machine (Sujet type Bac STEG) évaluant la décomposition modulaire, les boucles et les tableaux numpy.",
          objectives: [
            "Évaluation synthétique sur 20 points",
            "Implémentation d'un problème modulaire complet sur machine"
          ]
        },
        {
          id: 11,
          moduleId: 4,
          title: "Arithmétique I – PGCD et PPCM",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance11.html",
          description: "Algorithme d'Euclide (divisions successives), formule du PPCM, simplification de fractions et synchronisation d'intervalles.",
          objectives: [
            "Implémentation de PGCD(a, b) par l'algorithme d'Euclide",
            "Simplification irréductible de fractions et PPCM"
          ]
        },
        {
          id: 12,
          moduleId: 4,
          title: "Arithmétique II – Nombres Premiers & Décomposition",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance12.html",
          description: "Test de primalité optimisé (borne racine carrée de N), prochain nombre premier et décomposition en facteurs premiers.",
          objectives: [
            "Fonction est_premier(n) optimisée (bornée par sqrt(N))",
            "Décomposition en facteurs premiers et premier suivant"
          ]
        },
        {
          id: 13,
          moduleId: 4,
          title: "Recherche Séquentielle dans un Tableau",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance13.html",
          description: "Recherche linéaire avec sortie anticipée booléenne (sans break) et application aux tableaux parallèles (registre d'élèves).",
          objectives: [
            "Parcours conditionnel while i < n and not trouve (zéro break)",
            "Recherche dans des tableaux parallèles et vérification d'unicité"
          ]
        },
        {
          id: 14,
          moduleId: 4,
          title: "Tri d'un Tableau – Le Tri à Bulles",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance14.html",
          description: "Comparaison des paires adjacentes, permutations sécurisées avec variable aux et tri synchrone de tableaux parallèles (Marathon).",
          objectives: [
            "Procédure tri_a_bulles avec variable intermédiaire aux",
            "Tri synchrone de tableaux parallèles (Croissant / Décroissant)"
          ]
        },
        {
          id: 15,
          moduleId: 4,
          title: "Synthèse & Mini-projet modulaire Python (GIES)",
          duration: "1h 30mn",
          status: "Disponible",
          link: "seance15.html",
          description: "Application GIES intégrée avec menu interactif match...case, tableaux parallèles, tri à bulles, recherche séquentielle et statistiques.",
          objectives: [
            "Projet modulaire complet avec menu interactif match...case",
            "Synthèse du Module 4 (Tri, recherche, statistiques et contrôle)"
          ]
        },
        {
          id: 16,
          moduleId: 5,
          title: "Concepts IoT & Carte ESP32",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Architecture IoT, carte ESP32, GPIO, Micro-Python / Arduino IDE.",
          objectives: [
            "Présentation matérielle ESP32",
            "Premier script Blink LED"
          ]
        },
        {
          id: 17,
          moduleId: 5,
          title: "Acquisition de données via les Capteurs",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Interfaçage de capteurs de température, humidité et lumière avec l'ESP32.",
          objectives: [
            "Câblage sur broches GPIO",
            "Acquisition en temps réel"
          ]
        },
        {
          id: 18,
          moduleId: 5,
          title: "Contrôle des Actionneurs",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Pilotage de moteurs, servomoteurs, buzzers et LED selon les capteurs.",
          objectives: [
            "Seuils de déclenchement intelligents",
            "Commande d'actionneurs"
          ]
        },
        {
          id: 19,
          moduleId: 5,
          title: "Projet Intégré IoT embarqué",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Réalisation d'un système autonome (Arrosage automatique / Alerte météo).",
          objectives: [
            "Capteur ➔ ESP32 ➔ Actionneur",
            "Projet autonome complet"
          ]
        },
        {
          id: 20,
          moduleId: 6,
          title: "Évaluation Pratique Bilan & Bilan Annuel",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Épreuve pratique bilan sur machine et synthèse des apprentissages.",
          objectives: [
            "Épreuve pratique (1h00)",
            "Bilan annuel et clôture (0h30)"
          ]
        }
      ]
    };
  },
  computed: {
    filteredSeances() {
      return this.seances.filter(s => {
        const matchesModule = this.selectedModule === 0 || s.moduleId === this.selectedModule;
        const q = this.searchQuery.toLowerCase().trim();
        const matchesSearch = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.objectives.some(o => o.toLowerCase().includes(q));
        return matchesModule && matchesSearch;
      });
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    },
    openPreview(seance) {
      this.activePreview = seance;
      const modal = new bootstrap.Modal(document.getElementById('previewModal'));
      modal.show();
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
