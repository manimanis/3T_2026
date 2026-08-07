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
          status: "Planifié",
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
          status: "Planifié",
          description: "Déclaration, initialisation et parcours des listes Python (Tableaux 1D).",
          objectives: [
            "Stockage de N éléments dans un tableau",
            "Parcours complet et affichage"
          ]
        },
        {
          id: 6,
          moduleId: 2,
          title: "Traitements élémentaires sur Tableaux 1D",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Calculs cumulatifs, somme, moyenne, min et max dans une liste.",
          objectives: [
            "Somme et moyenne des éléments",
            "Recherche du maximum et minimum"
          ]
        },
        {
          id: 7,
          moduleId: 3,
          title: "Introduction à la Modularité (Fonction & Procédure)",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Décomposition d'un problème complexe en sous-programmes modulaires.",
          objectives: [
            "Définition (def) et appel de fonctions",
            "Décomposition en tâches simples"
          ]
        },
        {
          id: 8,
          moduleId: 3,
          title: "Paramètres, Valeurs de retour et Portée",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Paramètres, valeur de retour (return) et portée locale vs globale.",
          objectives: [
            "Modules avec paramètres",
            "Gestion de la portée des objets"
          ]
        },
        {
          id: 9,
          moduleId: 3,
          title: "Modules prédéfinis et Passage de Tableaux",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Utilisation des modules math et random, passage de tableaux en paramètre.",
          objectives: [
            "Remplissage aléatoire de tableaux",
            "Traitement de tableaux dans un module"
          ]
        },
        {
          id: 10,
          moduleId: 3,
          title: "Évaluation Pratique Intermédiaire",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Sujet pratique sur machine combinant modularité, boucles et tableaux.",
          objectives: [
            "Synthèse des compétences théoriques et pratiques",
            "Résolution modulaire sur machine"
          ]
        },
        {
          id: 11,
          moduleId: 4,
          title: "Arithmétique I – PGCD et PPCM",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Algorithmes de calcul du PGCD (Euclide) et PPCM.",
          objectives: [
            "Implémentation de PGCD(a, b)",
            "Fractions irréductibles"
          ]
        },
        {
          id: 12,
          moduleId: 4,
          title: "Arithmétique II – Nombres Premiers & Décomposition",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Test de primalité et décomposition en facteurs premiers.",
          objectives: [
            "Fonction est_premier(n)",
            "Décomposition en facteurs premiers"
          ]
        },
        {
          id: 13,
          moduleId: 4,
          title: "Recherche Séquentielle dans un Tableau",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Recherche linéaire d'un élément avec arrêt optimisé.",
          objectives: [
            "Parcours conditionnel avec booléen",
            "Retour de la position de l'élément"
          ]
        },
        {
          id: 14,
          moduleId: 4,
          title: "Tri d'un Tableau – Le Tri à Bulles",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Principe des permutations et implémentation du tri à bulles.",
          objectives: [
            "Permutations d'éléments",
            "Tri croissant et décroissant"
          ]
        },
        {
          id: 15,
          moduleId: 4,
          title: "Synthèse & Mini-projet modulaire Python",
          duration: "1h 30mn",
          status: "Planifié",
          description: "Projet guidé intégrant tableaux, tri, arithmétique et modularité.",
          objectives: [
            "Gestionnaire de notes de classe",
            "Analyseur arithmétique de nombres"
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
