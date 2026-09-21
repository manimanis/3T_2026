/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Index Page (Syllabus & Course Planning - 20 Séances)
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
        { id: 1, shortTitle: "Cycle 1 · Diagnostic & Réactivation" },
        { id: 2, shortTitle: "Cycle 2 · Boucle Tant Que" },
        { id: 3, shortTitle: "Cycle 3 · Répéter & Selon" },
        { id: 4, shortTitle: "Cycle 4 · Chaînes de caractères" },
        { id: 5, shortTitle: "Cycle 5 · Tableaux 1D (numpy)" },
        { id: 6, shortTitle: "Cycle 6 · Filtrage sélectif sur Tableaux" },
        { id: 7, shortTitle: "Cycle 7 · Modularité logicielle" },
        { id: 8, shortTitle: "Cycle 8 · Arithmétique I (PGCD & PPCM)" },
        { id: 9, shortTitle: "Cycle 9 · Arithmétique II (Primalité)" },
        { id: 10, shortTitle: "Cycle 10 · Recherche, Tri & Bilan" }
      ],
      seances: [
        {
          id: 1,
          moduleId: 1,
          title: "Séance 1 : Série N°0 · Révision, Réactivation & Évaluation Diagnostique",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance01.html",
          description: "Diagnostic à froid sans machine (types, affectation, conditions), réactivation active guidée (boucle Pour, accumulation, débogage) et synthèse autonome (campagne de mesures, barème /40).",
          objectives: [
            "Diagnostic à froid sans machine (types simples, affectation, tests aux limites)",
            "Réactivation active guidée (boucle Pour, accumulation, débogage et modification)",
            "Synthèse et transfert autonome vers Python (campagne de mesures, TDO, banc d'essai)"
          ]
        },
        {
          id: 2,
          moduleId: 2,
          title: "Séance 2 : La boucle Tant Que & Contrôle de saisie",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance02.html",
          description: "Découverte des itérations non bornées, patron universel de contrôle de saisie avec TDO, tracé sur cahier, débogage de boucle infinie et modélisation scientifique.",
          objectives: [
            "Différencier boucle bornée (Pour) et boucle non bornée (Tant Que)",
            "Maîtriser le patron de contrôle de saisie avec rejet et réitération",
            "Tracer l'état des variables et modéliser la demi-vie d'un isotope radioactif"
          ]
        },
        {
          id: 3,
          moduleId: 2,
          title: "Séance 3 : [TP Évalué N°1] Contrôle de saisie & Tant Que sur Machine",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance03.html",
          description: "Évaluation pratique individuelle sur machine (/20 pts) : validation de concentrations chimiques, détection de sentinelle et simulation de vidange de réservoir.",
          objectives: [
            "Sécuriser la saisie d'une concentration molaire en Python (float)",
            "Traiter une suite d'absorbances arrêtée par une sentinelle négative",
            "Modéliser la vidange d'un réservoir à débit décroissant et valider par jeux d'essais"
          ]
        },
        {
          id: 4,
          moduleId: 3,
          title: "Séance 4 : Boucle Répéter & Structure conditionnelle Selon",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance04.html",
          description: "Boucle à post-condition Répéter...Jusqu'à, structure à choix multiples Selon, traduction Python 3.10+ avec match...case et conception de menus interactifs.",
          objectives: [
            "Maîtriser la condition d'arrêt de la boucle Répéter...Jusqu'à",
            "Structurer les alternatives multiples avec Selon et match...case",
            "Construire un menu interactif de formules physiques maintenu par boucle"
          ]
        },
        {
          id: 5,
          moduleId: 3,
          title: "Séance 5 : [TP Évalué N°2] Menus interactifs & Boucles combinées",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance05.html",
          description: "Évaluation pratique individuelle sur machine (/20 pts) : simulateur de mécanique des fluides, contrôle de saisie du menu, calculs de pression et débits.",
          objectives: [
            "Programmer un menu interactif complet sous Python",
            "Forcer la saisie des choix dans l'ensemble des options valides",
            "Maintenir l'exécution continue jusqu'à l'option explicite de sortie"
          ]
        },
        {
          id: 6,
          moduleId: 4,
          title: "Séance 6 : Chaînes de caractères & Fonctions prédéfinies normalisées",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance06.html",
          description: "Indexation base 0, répertoire des fonctions officielles (Long, Pos, Sous_chaine, Ord, Chr), dénombrements conditionnels et algorithme du palindrome.",
          objectives: [
            "Manipuler les chaînes avec indexation base 0 (de 0 à Long-1)",
            "Exploiter rigoureusement les fonctions normalisées autorisées",
            "Concevoir l'algorithme optimisé de vérification d'un palindrome"
          ]
        },
        {
          id: 7,
          moduleId: 4,
          title: "Séance 7 : [TP Évalué N°3] Traitement textuel & Validation de formats",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance07.html",
          description: "Évaluation pratique sur machine (/20 pts) : contrôle et certification de codes de réactifs de laboratoire (LL-NNNN), séparateur tiret et clé modulo 19.",
          objectives: [
            "Contrôler la longueur et la composition alphanumérique d'une chaîne",
            "Extraire et valider les sous-chaînes avec Sous_chaine et Estnum",
            "Calculer une clé de contrôle arithmétique et valider par jeux d'essais"
          ]
        },
        {
          id: 8,
          moduleId: 5,
          title: "Séance 8 : Tableaux 1D statiques : Déclaration, Saisie & Cumuls",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance08.html",
          description: "Structure statique homogène avec numpy.array, parcours séquentiel avec boucle Pour, calculs cumulatifs (somme, moyenne) et recherche du maximum avec indice.",
          objectives: [
            "Allouer un tableau statique de taille N avec numpy",
            "Parcourir et afficher le tableau case par case (print(T) brut proscrit)",
            "Rechercher la valeur maximale et conserver l'indice de son emplacement"
          ]
        },
        {
          id: 9,
          moduleId: 5,
          title: "Séance 9 : [TP Évalué N°4] Tableaux 1D (numpy), Cumuls & Extrema",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance09.html",
          description: "Évaluation pratique sur machine (/20 pts) : traitement des mesures de tension d'un banc expérimental, moyenne, extrema avec positions et relevés aberrants.",
          objectives: [
            "Contrôler la taille statique N in [5; 30] et allouer le tableau numpy",
            "Effectuer les calculs de moyenne et identifier minimum et maximum",
            "Dénombrer les valeurs anormales présentant un écart relatif supérieur à 20%"
          ]
        },
        {
          id: 10,
          moduleId: 6,
          title: "Séance 10 : Tableaux 1D : Comptages conditionnels & Filtrage sélectif",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance10.html",
          description: "Gestion rigoureuse du double indice (i source, j destination), transfert sélectif vers un second tableau, éclatement pairs/impairs et tassement in-place.",
          objectives: [
            "Comprendre l'asynchronisme entre indice source et indice destination",
            "Transférer conditionnellement des éléments et gérer la taille effective",
            "Éclater un tableau en sous-ensembles et éliminer les valeurs résiduelles"
          ]
        },
        {
          id: 11,
          moduleId: 6,
          title: "Séance 11 : [TP Évalué N°5] Filtrage, Éclatement & Séparation",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance11.html",
          description: "Évaluation pratique sur machine (/20 pts) : tri automatisé d'un lot de pièces mécaniques, séparation pièces acceptées vs rebuts et bilan de conformité.",
          objectives: [
            "Manipuler simultanément trois tableaux statiques numpy",
            "Gérer deux indices d'insertion indépendants j1 et j2",
            "Calculer le taux de conformité et éditer les sous-tableaux utiles"
          ]
        },
        {
          id: 12,
          moduleId: 7,
          title: "Séance 12 : Modularité : Décomposition, Procédures, Fonctions & Paramètres",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance12.html",
          description: "Décomposition descendante, distinctions Fonctions vs Procédures, règle du return unique, passage par référence (@), TDOL et portée locale.",
          objectives: [
            "Établir l'arbre de décomposition hiérarchique d'un problème",
            "Distinguer fonction pure et procédure avec effets de bord",
            "Maîtriser le passage de paramètres par référence avec le préfixe @"
          ]
        },
        {
          id: 13,
          moduleId: 7,
          title: "Séance 13 : [TP Évalué N°6] Conception modulaire d'une application",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance13.html",
          description: "Évaluation pratique sur machine (/20 pts) : application d'analyse pluviométrique architecturée en 5 sous-programmes indépendants et programme principal.",
          objectives: [
            "Concevoir des fonctions pures et des procédures avec passage par référence",
            "Assurer l'absence d'effets de bord parasites dans les fonctions calculatoires",
            "Orchestrer l'enchaînement des modules dans le programme principal"
          ]
        },
        {
          id: 14,
          moduleId: 8,
          title: "Séance 14 : Arithmétique I : Divisibilité, Algorithmes du PGCD & PPCM",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance14.html",
          description: "Divisibilité euclidienne (Div, Mod), comparaison soustractions vs divisions successives (Euclide), relation PGCD-PPCM et fractions irréductibles.",
          objectives: [
            "Implémenter l'algorithme officiel d'Euclide par divisions successives",
            "Exploiter l'identité reliant le PGCD et le PPCM",
            "Simplifier des fractions sous forme irréductible et généraliser à 3 nombres"
          ]
        },
        {
          id: 15,
          moduleId: 8,
          title: "Séance 15 : [TP Évalué N°7] Fonctions arithmétiques modulaires (PGCD & PPCM)",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance15.html",
          description: "Évaluation pratique sur machine (/20 pts) : fonctions PGCD et PPCM autonomes, calcul fractionnaire exact et synchronisation orbitale de satellites.",
          objectives: [
            "Implémenter de manière autonome les fonctions pures PGCD et PPCM",
            "Résoudre un problème de synchronisation de périodes orbitales",
            "Valider la robustesse algorithmique sur des cas d'essais critiques"
          ]
        },
        {
          id: 16,
          moduleId: 9,
          title: "Séance 16 : Arithmétique II : Nombres Premiers & Décomposition",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance16.html",
          description: "Test de primalité optimisé avec borne racine carrée (d*d <= n), génération dans un tableau statique numpy et factorisation en facteurs premiers successifs.",
          objectives: [
            "Démontrer et implémenter la borne d*d <= n pour le test de primalité",
            "Générer une table de nombres premiers dans un tableau numpy",
            "Décomposer un entier avec deux boucles imbriquées et formater le résultat"
          ]
        },
        {
          id: 17,
          moduleId: 9,
          title: "Séance 17 : [TP Évalué N°8] Primalité, Crible & Facteurs premiers",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance17.html",
          description: "Évaluation pratique sur machine (/20 pts) : fonction de primalité optimisée, tableau numpy de premiers et factorisation des nombres 360, 1024 et 1729.",
          objectives: [
            "Programmer un prédicat booléen Est_Premier sans faille",
            "Remplir un tableau numpy avec les N premiers nombres premiers",
            "Décomposer en facteurs premiers et valider sur des nombres remarquables"
          ]
        },
        {
          id: 18,
          moduleId: 10,
          title: "Séance 18 : Recherche Séquentielle & Tri à Bulles sur Tableaux 1D",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance18.html",
          description: "Recherche séquentielle avec arrêt immédiat (drapeau trouve), mécanique de permutation avec variable temporaire aux et tri à bulles officiel optimisé.",
          objectives: [
            "Programmer une recherche avec arrêt immédiat dès détection",
            "Maîtriser le principe des permutations in-place avec variable intermédiaire",
            "Implémenter le tri à bulles avec indicateur booléen d'échange"
          ]
        },
        {
          id: 19,
          moduleId: 10,
          title: "Séance 19 : [TP Évalué N°9] Recherche & Tri à Bulles modulaires",
          duration: "90 min (1h 30mn)",
          status: "Disponible",
          link: "seance19.html",
          description: "Évaluation pratique sur machine (/20 pts) : classement d'un concours scientifique, recherche de position, tri à bulles croissant/décroissant et gestion des ex aequo.",
          objectives: [
            "Programmer les modules de recherche de présence et de position",
            "Implémenter le tri à bulles décroissant avec affichage du rang",
            "Dénombrer les occurrences d'une note cible en cas d'ex aequo"
          ]
        },
        {
          id: 20,
          moduleId: 10,
          title: "Séance 20 : [ÉVALUATION FINALE & BILAN] Épreuve Pratique de Synthèse",
          duration: "90 min (60 min TP + 30 min Bilan)",
          status: "Disponible",
          link: "seance20.html",
          description: "Épreuve pratique finale individuelle en conditions d'examen (/20 pts, 60 min) suivie de l'auto-évaluation du profil de sortie de 3e et perspectives 4e Bac (30 min).",
          objectives: [
            "Mobiliser l'ensemble des compétences de l'année sur un sujet d'examen complet",
            "Concevoir une architecture logicielle sans faille (TDO, TDOL, modularité)",
            "Valider le profil de sortie de 3e Année Secondaire et aborder la 4e Année"
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
    selectModule(id) {
      this.selectedModule = id;
    },
    resetFilters() {
      this.selectedModule = 0;
      this.searchQuery = '';
    },
    getModuleTitle(modId) {
      const m = this.modules.find(mod => mod.id === modId);
      return m ? m.shortTitle : `Module ${modId}`;
    },
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
      const mathEls = document.querySelectorAll('.math-expr');
      if (mathEls.length > 0 && typeof renderMathInElement === 'function') {
        mathEls.forEach(el => {
          renderMathInElement(el, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '\\[', right: '\\]', display: true },
              { left: '\\(', right: '\\)', display: false },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        });
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
    });
  }
}).mount('#app');
