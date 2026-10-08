/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°2 - APPRENTISSAGE
 * La boucle Tant Que (while) & Contrôle de saisie (90 min)
 * Version sujet élève (interactif)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      // Codes algorithmiques et Python de référence
      codeControleSaisieAlgo: `ALGORITHME DechargeSecurite
DEBUT
  Lire(U)
  duree ← 0
  Tant que (U ≥ 20.0) Faire
    U ← U / 2
    duree ← duree + 1
  Fin Tant que
  Écrire("Tension : ", U, " V")
  Écrire("Durée : ", duree, " s")
FIN`,

      codeTraceAlgo: `x ← 18
cpt ← 0
Tant que x > 2 Faire
  x ← x Div 2
  cpt ← cpt + 1
Fin Tant que
Écrire("x = ", x)
Écrire("cpt = ", cpt)`,

      codeDebogagePython: `temperature = float(input("Température (°C) : "))
cycles = 0

while temperature > 25.0:
    print("Cycle", cycles, ": Refroidissement...")
    cycles = cycles + 1
    # Anomalie : la température n'est pas modifiée !

print("Fin : ", temperature, "°C en ", cycles, "cycle(s).")`,

      codeDebogagePythonCorrige: `temperature = float(input("Température (°C) : "))
cycles = 0

while temperature > 25.0:
    print(f"Cycle {cycles} : Refroidissement...")
    cycles += 1
    temperature -= 1.0  # Correction : décrémentation de la température

print(f"Fin : {temperature:.1f} °C en {cycles} cycle(s).")`,

      codeEvolutionLoyerAlgo: `ALGORITHME EvolutionLoyer
DEBUT
  loyer ← 650.0
  annee ← 0
  total ← 0.0
  Tant que (loyer ≤ 800.0) Faire
    total ← total + (12 * loyer)
    loyer ← loyer * 1.018
    annee ← annee + 1
  Fin Tant que
  Écrire("Nombre d'années : ", annee)
  Écrire("Loyer final : ", loyer, " DT")
  Écrire("Total cumulé : ", total, " DT")
FIN`,

      codeEvolutionLoyerPython: `loyer = 650.0
annee = 0
total = 0.0

while loyer <= 800.0:
    total += 12 * loyer
    loyer *= 1.018
    annee += 1

print(f"Années écoulées : {annee} ans")
print(f"Loyer mensuel final : {loyer:.2f} DT")
print(f"Total cumulé des loyers : {total:.0f} DT")`,

      // =======================================================================
      // ACTIVITÉ 1 INTERACTIVE
      // =======================================================================
      tableAct1: [
        { t: 2, u: '', cond: '', acces: '' },
        { t: 3, u: '', cond: '', acces: '' },
        { t: 4, u: '', cond: '', acces: '' }
      ],
      tableAct1Verified: false,

      qcmAct1: [
        {
          id: 1,
          question: "1. <strong>Décharge réelle :</strong> Au bout de combien de secondes la tension passe-t-elle sous le seuil de sécurité (<i>U</i> &lt; 20.0 V) ?",
          options: [
            "Au bout de <strong>5 secondes</strong> (selon le calcul erroné 100 / 20 = 5).",
            "Au bout de <strong>3 secondes</strong> (la tension atteint 12.5 V &lt; 20.0 V).",
            "Au bout de <strong>2 secondes</strong> (la tension vaut 25.0 V)."
          ],
          correct: 1,
          selected: null,
          explanation: "À <i>t</i> = 3 s, la tension résiduelle est sans danger <strong>12.5 V &lt; 20.0 V</strong>. La sécurité est donc validée."
        },
        {
          id: 2,
          question: "2. <strong>Obstacle cognitif :</strong> Pourquoi l'affirmation « 100 div 20 = 5 s » est-elle fausse ?",
          options: [
            "Parce que l'automate ne sait effectuer que des additions.",
            "Parce que l'unité de temps industrielle doit obligatoirement être convertie en minutes.",
            "Parce que la décharge n'est pas linéaire, mais exponentielle : la tension est divisée par 2 chaque seconde (<i>U</i> &larr; <i>U</i> / 2)."
          ],
          correct: 2,
          selected: null,
          explanation: "Une décharge capacitive suit une décroissance exponentielle (100 V &rarr; 50 V &rarr; 25 V &rarr; 12.5 V)."
        },
        {
          id: 3,
          question: "3. <strong>Cas particulier (<i>U</i> = 15.0 V) :</strong> Machine à l'arrêt depuis 24h : la condition <i>U</i> &ge; 20.0 V est-elle vérifiée ?",
          options: [
            "<strong>Vrai :</strong> toute machine impose obligatoirement au moins 1 seconde de décharge préventive.",
            "<strong>Faux (15.0 &lt; 20.0 V) :</strong> la condition est fausse, l'accès est autorisé immédiatement sans attente.",
            "<strong>Faux :</strong> mais la boucle s'exécute quand même une fois avant de tester."
          ],
          correct: 1,
          selected: null,
          explanation: "C'est l'illustration du <strong>cas des 0 itération</strong> : 15.0 V est sans danger, le corps de la boucle n'est pas exécuté. L'armoire est déverrouillée immédiatement."
        },
        {
          id: 4,
          question: "4. <strong>Tester AVANT d'agir :</strong> Pourquoi l'automate teste-t-il la condition de tension <em>avant</em> toute temporisation ?",
          options: [
            "Pour éviter une temporisation inutile ou bloquante si le condensateur est déjà sans danger à l'état initial (<i>U</i> &lt; 20.0 V).",
            "Pour forcer l'opérateur à saisir manuellement un code de réinitialisation.",
            "Car un microcontrôleur n'est pas capable d'effectuer un test après une temporisation."
          ],
          correct: 0,
          selected: null,
          explanation: "Dans une structure <code>Tant Que</code>, le test préalable évite d'exécuter un traitement inutile si l'objectif de sécurité est déjà satisfait."
        },
        {
          id: 5,
          question: "5. <strong>Choix de structure :</strong> Pourquoi la boucle <code>Pour</code> est-elle inadaptée pour ce problème ?",
          options: [
            "Car la boucle <code>Pour</code> ne supporte pas les grandeurs physiques en volts.",
            "Car la boucle <code>Pour</code> s'exécute obligatoirement au moins 10 fois.",
            "Car le nombre d'itérations n'est pas connu à l'avance : il dépend de la tension résiduelle mesurée au départ."
          ],
          correct: 2,
          selected: null,
          explanation: "La boucle <code>Pour</code> est réservée aux parcours dont le nombre d'itérations est connu d'avance. Ici, la tension initiale étant variable, le nombre de secondes nécessaires n'est pas connu d'avance."
        },
        {
          id: 6,
          question: "6. <strong>Règle formelle :</strong> Comment s'exprime formellement la règle en pseudo-code algorithmique ?",
          options: [
            "<code>Tant que (U &lt; 20.0) Faire Décharger / Attendre Fin Tant que</code>",
            "<code>Tant que (U &ge; 20.0) Faire Décharger / Attendre Fin Tant que</code>",
            "<code>Pour U de 100 à 20 Faire Décharger Fin Pour</code>"
          ],
          correct: 1,
          selected: null,
          explanation: "<code>Tant que</code> la tension est dangereuse (<i>U</i> &ge; 20.0 V), on continue le cycle de décharge. Dès que la tension passe sous 20 V, la boucle s'arrête."
        }
      ],

      // =======================================================================
      // ACTIVITÉ 2 INTERACTIVE
      // =======================================================================
      simAct2: {
        inputU: 100.0,
        steps: [],
        completed: false,
        finalU: null,
        finalDuree: null,
        totalIterations: 0
      },

      qcmAct2: [
        {
          id: 1,
          question: "1. <strong>Cas nominal (<i>U</i> = 100.0 V) :</strong> Combien d'itérations la boucle effectue-t-elle et quelles sont les valeurs finales affichées ?",
          options: [
            "<strong>4 itérations</strong> &rarr; Tension : <code>6.25 V</code> et Durée : <code>4 s</code>.",
            "<strong>2 itérations</strong> &rarr; Tension : <code>25.0 V</code> et Durée : <code>2 s</code>.",
            "<strong>3 itérations</strong> &rarr; Tension : <code>12.5 V</code> et Durée : <code>3 s</code>."
          ],
          correct: 2,
          selected: null,
          explanation: "À la 3<sup>e</sup> itération, <i>U</i> passe de 25.0 V à 12.5 V et duree vaut 3. Au test suivant (12.5 &ge; 20.0), la condition est Fausse, provoquant l'arrêt immédiat de la boucle."
        },
        {
          id: 2,
          question: "2. <strong>Cas 0 itération (<i>U</i> = 14.0 V) :</strong> Que se passe-t-il lors de l'exécution ?",
          options: [
            "La boucle s'exécute au moins 1 fois par défaut, affichant 7.0 V et 1 s.",
            "La condition <code>14.0 &ge; 20.0</code> est fausse d'emblée &rarr; <strong>0 itération</strong>, affichage direct de <code>14.0 V</code> et <code>0 s</code>.",
            "Une exception de boucle vide est levée par l'interpréteur."
          ],
          correct: 1,
          selected: null,
          explanation: "Structure à pré-condition : l'évaluation a lieu <strong>avant</strong> l'entrée. Étant fausse au départ, le corps de boucle est totalement ignoré (0 itération)."
        },
        {
          id: 3,
          question: "3. <strong>Cas limite (<i>U</i> = 20.0 V) :</strong> Quel est le comportement exact de l'algorithme ?",
          options: [
            "La condition <code>20.0 &ge; 20.0</code> est Vraie &rarr; <strong>1 itération</strong>, sortie finale avec <code>10.0 V</code> et <code>1 s</code>.",
            "La condition est Fausse car 20.0 V est la limite stricte &rarr; 0 itération.",
            "L'algorithme boucle indéfiniment car 20.0 V ne change pas de statut."
          ],
          correct: 0,
          selected: null,
          explanation: "L'inégalité est large (&ge;). Pour <i>U</i> = 20.0 V, <code>20.0 &ge; 20.0</code> est Vrai. Le corps s'exécute : <i>U</i> devient 10.0 V et duree = 1. Au tour suivant, 10.0 &ge; 20.0 est Faux &rarr; arrêt."
        }
      ],

      // =======================================================================
      // ACTIVITÉ 3 INTERACTIVE
      // =======================================================================
      tableAct3: [
        { iter: 1, cond: 'Vrai (18 > 2)', x: '', cpt: '' },
        { iter: 2, cond: '', x: '', cpt: '' },
        { iter: 3, cond: '', x: '', cpt: '' },
        { iter: 4, cond: '', x: '', cpt: '' }
      ],
      tableAct3Verified: false,

      qcmAct3: [
        {
          id: 1,
          question: "1. Quelles sont les valeurs finales affichées pour <code>x</code> et <code>cpt</code> ?",
          options: [
            "<code>x = 1</code> et <code>cpt = 4</code>",
            "<code>x = 2</code> et <code>cpt = 3</code>",
            "<code>x = 4</code> et <code>cpt = 2</code>"
          ],
          correct: 1,
          selected: null,
          explanation: "À l'itération 3, <i>x</i> = 4 Div 2 = 2 et <i>cpt</i> = 3. Au test suivant, <code>2 > 2</code> est Faux : la boucle s'arrête. Les valeurs finales affichées sont donc <strong>x = 2</strong> et <strong>cpt = 3</strong>."
        },
        {
          id: 2,
          question: "2. Pour quelle valeur précise de <i>x</i> la condition de la boucle devient-elle fausse ?",
          options: [
            "Pour <code>x = 1</code>",
            "Pour <code>x = 0</code>",
            "Pour <code>x = 2</code> (car l'inégalité stricte <code>2 > 2</code> est Fausse)"
          ],
          correct: 2,
          selected: null,
          explanation: "L'inégalité est stricte (<code>x > 2</code>). Dès que <i>x</i> atteint 2, la proposition <code>2 > 2</code> n'est plus vérifiée, ce qui provoque la sortie immédiate de la boucle."
        }
      ],

      // =======================================================================
      // ACTIVITÉ 4 INTERACTIVE (Questions 1, 2, 3 interactives ; Q4 sur cahier)
      // =======================================================================
      qcmAct4: [
        {
          id: 1,
          question: "1. Pourquoi ce script provoque-t-il une boucle infinie si <code>temperature = 28.5</code> ?",
          options: [
            "Car la variable <code>cycles</code> n'a pas été déclarée avec une limite maximale.",
            "Car la variable de contrôle <code>temperature</code> n'est jamais modifiée dans la boucle : la condition <code>temperature > 25.0</code> reste perpétuellement Vraie.",
            "Car la fonction <code>float(input(...))</code> ne peut pas être utilisée avec <code>while</code>."
          ],
          correct: 1,
          selected: null,
          explanation: "Règle absolue de la boucle <code>while</code> : la variable intervenant dans la condition de contrôle doit obligatoirement être actualisée dans le corps de la boucle pour converger vers l'arrêt. Ici, <code>temperature</code> reste figée à 28.5 °C."
        },
        {
          id: 2,
          question: "2. Quelle instruction ajouter dans la boucle pour décrémenter <code>temperature</code> (ex: refroidissement de 1.0 °C par cycle) ?",
          options: [
            "<code>temperature = temperature + 1.0</code>",
            "<code>cycles = temperature - 25.0</code>",
            "<code>temperature = temperature - 1.0</code> (ou en syntaxe Python : <code>temperature -= 1.0</code>)"
          ],
          correct: 2,
          selected: null,
          explanation: "Pour simuler le refroidissement progressif et permettre à la condition <code>temperature > 25.0</code> de devenir fausse, il faut décrémenter la température à chaque cycle : <code>temperature -= 1.0</code>."
        },
        {
          id: 3,
          question: "3. Que produit une saisie initiale de <code>21.0 °C</code> dans le programme initial ?",
          options: [
            "La condition <code>21.0 > 25.0</code> est fausse dès l'entrée (0 itération) &rarr; affichage direct : <code>Fin : 21.0 °C en 0 cycle(s).</code>",
            "Une boucle infinie avec 0 cycle.",
            "Une erreur d'exécution Python (ZeroDivisionError)."
          ],
          correct: 0,
          selected: null,
          explanation: "Comme 21.0 > 25.0 est Faux d'emblée, le corps de la boucle <code>while</code> est totalement ignoré (0 cycle). Le programme exécute immédiatement le <code>print</code> final."
        }
      ],
      showSolutionAct4: false,

      // =======================================================================
      // ACTIVITÉ 6 INTERACTIVE (Uniquement Question 1 interactive ; Q2-Q4 sur cahier)
      // =======================================================================
      qcmAct6: [
        {
          id: 1,
          question: "1.1. <strong>Condition de répétition :</strong> Quelle est la condition de continuation de la boucle <code>Tant Que</code> ?",
          options: [
            "<code>Tant que (loyer &gt; 800.0) Faire</code> (condition de résiliation immédiate dès l'entrée).",
            "<code>Tant que (loyer &le; 800.0) Faire</code> (le contrat se poursuit tant que le loyer mensuel ne dépasse pas le plafond de 800 DT).",
            "<code>Tant que (loyer = 800.0) Faire</code>."
          ],
          correct: 1,
          selected: null,
          explanation: "Le locataire maintient le bail tant que le loyer ne dépasse pas 800 DT. La condition de maintien de la boucle <code>Tant Que</code> est donc <code>loyer &le; 800.0</code>. Dès que le loyer franchit strictement 800 DT, la condition devient Fausse et la boucle s'arrête."
        },
        {
          id: 2,
          question: "1.2. <strong>Variables de calcul :</strong> Quelles sont les variables nécessaires et leurs rôles dans l'algorithme ?",
          options: [
            "Seulement <code>loyer</code> (Réel), les années étant déduites sans compteur.",
            "<code>loyer</code> (Entier) et <code>augmentation</code> (Chaîne de caractères).",
            "<code>loyer</code> (Réel, loyer mensuel actualisé), <code>annee</code> (Entier, compteur d'années écoulées), <code>total</code> (Réel, cumul des loyers annuels : <code>total + 12 * loyer</code>)."
          ],
          correct: 2,
          selected: null,
          explanation: "Pour modéliser l'évolution, il faut un réel <code>loyer</code> initialisé à 650.0 subissant le facteur 1.018 chaque année, un entier <code>annee</code> initialisé à 0 servant de compteur, et un accumulateur réel <code>total</code> cumulant les 12 mois de chaque année payée."
        }
      ],
      showSolutionAct6: false
    };
  },

  computed: {
    // Activité 1 Scores
    scoreAct1() {
      return this.qcmAct1.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct1() {
      return this.qcmAct1.filter(q => q.selected !== null).length;
    },

    // Activité 2 Scores
    scoreAct2() {
      return this.qcmAct2.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct2() {
      return this.qcmAct2.filter(q => q.selected !== null).length;
    },

    // Activité 3 Scores
    scoreAct3() {
      return this.qcmAct3.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct3() {
      return this.qcmAct3.filter(q => q.selected !== null).length;
    },

    // Activité 4 Scores
    scoreAct4() {
      return this.qcmAct4.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct4() {
      return this.qcmAct4.filter(q => q.selected !== null).length;
    },

    // Activité 6 Scores
    scoreAct6() {
      return this.qcmAct6.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct6() {
      return this.qcmAct6.filter(q => q.selected !== null).length;
    }
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
          window.showToast("Code copié !", "bi-check2 text-primary");
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
      if (typeof window.jumpToSection === 'function') {
        window.jumpToSection(sectionId);
      } else if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.showSection === 'function') {
        window.sectionDrawerInstance.showSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },

    // =======================================================================
    // MÉTHODES ACTIVITÉ 1
    // =======================================================================
    selectReponseAct1(qIdx, optIdx) {
      this.qcmAct1[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct1[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, lisez l'explication.", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct1() {
      this.qcmAct1.forEach(q => { q.selected = null; });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("QCM Activité 1 réinitialisé !");
      }
    },

    verifierTableAct1() {
      this.tableAct1Verified = true;
      const r0 = this.isRowAct1Correct(0);
      const r1 = this.isRowAct1Correct(1);
      const r2 = this.isRowAct1Correct(2);
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        if (r0 && r1 && r2) {
          window.showToast("Excellent ! Tableau validé. Vous avez bien identifié que t = 4 s ne doit pas être exécutée.", "bi-check-circle-fill text-success");
        } else if (r0 && r1 && !r2) {
          window.showToast("Attention : la ligne t = 4 s ne doit pas être remplie ! La boucle s'arrête à t = 3 s.", "bi-exclamation-triangle-fill text-warning");
        } else {
          window.showToast("Certaines valeurs sont inexactes. Vérifiez les lignes t = 2 s et t = 3 s.", "bi-exclamation-triangle-fill text-warning");
        }
      }
    },

    isRowAct1Correct(rowIdx) {
      const row = this.tableAct1[rowIdx];
      if (!row) return false;
      if (rowIdx === 0) {
        // t = 2 s: U = 25.0 V, Vrai (Danger), 🔒 Verrouillé
        const uVal = parseFloat(String(row.u).replace(',', '.'));
        return Math.abs(uVal - 25.0) < 0.1 &&
          row.cond.toLowerCase().includes('vrai') &&
          row.acces.includes('Verrouillé');
      } else if (rowIdx === 1) {
        // t = 3 s: U = 12.5 V, Faux (Sécurisé), 🔓 Déverrouillé
        const uVal = parseFloat(String(row.u).replace(',', '.'));
        return Math.abs(uVal - 12.5) < 0.1 &&
          row.cond.toLowerCase().includes('faux') &&
          row.acces.includes('Déverrouillé');
      } else if (rowIdx === 2) {
        // t = 4 s: L'élève doit laisser cette ligne non remplie
        // car la condition U >= 20.0 devient fausse dès t = 3 s (U = 12.5 V)
        const uEmpty = !row.u || String(row.u).trim() === '';
        const condEmpty = !row.cond || row.cond === '';
        const accesEmpty = !row.acces || row.acces === '';
        return uEmpty && condEmpty && accesEmpty;
      }
      return false;
    },

    resetTableAct1() {
      this.tableAct1 = [
        { t: 2, u: '', cond: '', acces: '' },
        { t: 3, u: '', cond: '', acces: '' },
        { t: 4, u: '', cond: '', acces: '' }
      ];
      this.tableAct1Verified = false;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Tableau réinitialisé !");
      }
    },

    // =======================================================================
    // MÉTHODES ACTIVITÉ 2
    // =======================================================================
    runSimAct2(presetVal) {
      if (presetVal !== undefined && presetVal !== null) {
        this.simAct2.inputU = presetVal;
      }
      let u = parseFloat(String(this.simAct2.inputU).replace(',', '.'));
      if (isNaN(u) || u < 0) {
        u = 100.0;
        this.simAct2.inputU = 100.0;
      }

      const steps = [];
      let currentU = u;
      let duree = 0;

      // Étape 0 : test initial
      const initCond = (currentU >= 20.0);
      if (!initCond) {
        // 0 itération
        steps.push({
          etape: "Test Initial",
          uAvant: currentU.toFixed(1) + " V",
          condition: `${currentU.toFixed(1)} ≥ 20.0 (Faux)`,
          corps: "Aucun (0 itération)",
          uApres: currentU.toFixed(1) + " V",
          duree: 0,
          statut: "Sortie immédiate sans temporisation"
        });
      } else {
        while (currentU >= 20.0) {
          const prevU = currentU;
          currentU = currentU / 2.0;
          duree += 1;
          const nextCond = (currentU >= 20.0);
          steps.push({
            etape: `Itération ${duree}`,
            uAvant: prevU.toFixed(1) + " V",
            condition: `${prevU.toFixed(1)} ≥ 20.0 (Vrai)`,
            corps: `U ← ${prevU.toFixed(1)} / 2 = ${currentU.toFixed(2)} V, duree ← ${duree}`,
            uApres: currentU.toFixed(2) + " V",
            duree: duree,
            statut: nextCond ? "Condition toujours Vraie &rarr; continuer" : "Condition devient Fausse &rarr; arrêt de boucle"
          });
          if (duree >= 25) break; // Sécurité anti-boucle
        }
      }

      this.simAct2.steps = steps;
      this.simAct2.finalU = currentU.toFixed(2);
      this.simAct2.finalDuree = duree;
      this.simAct2.totalIterations = duree;
      this.simAct2.completed = true;

      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast(`Simulation exécutée : ${duree} itération(s) effectuée(s).`, "bi-play-circle-fill text-success");
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetSimAct2() {
      this.simAct2 = {
        inputU: 100.0,
        steps: [],
        completed: false,
        finalU: null,
        finalDuree: null,
        totalIterations: 0
      };
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Simulateur réinitialisé !");
      }
    },

    selectReponseAct2(qIdx, optIdx) {
      this.qcmAct2[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct2[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication.", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct2() {
      this.qcmAct2.forEach(q => { q.selected = null; });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("QCM Activité 2 réinitialisé !");
      }
    },

    // =======================================================================
    // MÉTHODES ACTIVITÉ 3
    // =======================================================================
    verifierTableAct3() {
      this.tableAct3Verified = true;
      const r0 = this.isRowAct3Correct(0);
      const r1 = this.isRowAct3Correct(1);
      const r2 = this.isRowAct3Correct(2);
      const r3 = this.isRowAct3Correct(3);
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        if (r0 && r1 && r2 && r3) {
          window.showToast("Bravo ! Tracé d'exécution entièrement validé.", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Certaines valeurs du tableau sont incorrectes. Corrigez-les.", "bi-exclamation-triangle-fill text-warning");
        }
      }
    },

    isRowAct3Correct(rowIdx) {
      const row = this.tableAct3[rowIdx];
      if (!row) return false;
      const xVal = parseInt(String(row.x).trim(), 10);
      const cptVal = parseInt(String(row.cpt).trim(), 10);
      const condStr = String(row.cond).toLowerCase();

      if (rowIdx === 0) {
        // Itération 1 : cond donnée Vrai (18 > 2), x = 9, cpt = 1
        return xVal === 9 && cptVal === 1;
      } else if (rowIdx === 1) {
        // Itération 2 : cond Vrai (9 > 2), x = 4, cpt = 2
        return condStr.includes('vrai') && xVal === 4 && cptVal === 2;
      } else if (rowIdx === 2) {
        // Itération 3 : cond Vrai (4 > 2), x = 2, cpt = 3
        return condStr.includes('vrai') && xVal === 2 && cptVal === 3;
      } else if (rowIdx === 3) {
        // Itération 4 / Arrêt : cond Faux (2 > 2), x = 2 (ou non modifié), cpt = 3
        return condStr.includes('faux') && (isNaN(xVal) || xVal === 2 || String(row.x).toLowerCase().includes('arr')) &&
          (isNaN(cptVal) || cptVal === 3 || String(row.cpt).toLowerCase().includes('arr'));
      }
      return false;
    },

    resetTableAct3() {
      this.tableAct3 = [
        { iter: 1, cond: 'Vrai (18 > 2)', x: '', cpt: '' },
        { iter: 2, cond: '', x: '', cpt: '' },
        { iter: 3, cond: '', x: '', cpt: '' },
        { iter: 4, cond: '', x: '', cpt: '' }
      ];
      this.tableAct3Verified = false;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Tableau de trace réinitialisé !");
      }
    },

    selectReponseAct3(qIdx, optIdx) {
      this.qcmAct3[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct3[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication.", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct3() {
      this.qcmAct3.forEach(q => { q.selected = null; });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Questions Activité 3 réinitialisées !");
      }
    },

    // =======================================================================
    // MÉTHODES ACTIVITÉ 4
    // =======================================================================
    selectReponseAct4(qIdx, optIdx) {
      this.qcmAct4[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct4[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! Analyse validée", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'analyse.", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct4() {
      this.qcmAct4.forEach(q => { q.selected = null; });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Questions Activité 4 réinitialisées !");
      }
    },

    // =======================================================================
    // MÉTHODES ACTIVITÉ 6 (Question 1)
    // =======================================================================
    selectReponseAct6(qIdx, optIdx) {
      this.qcmAct6[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct6[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! Conception validée", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, lisez la justification.", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct6() {
      this.qcmAct6.forEach(q => { q.selected = null; });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Question 1 Activité 6 réinitialisée !");
      }
    }
  },

  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.$nextTick(() => {
      if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.scanArticlesAndSections === 'function') {
        window.sectionDrawerInstance.scanArticlesAndSections();
      }
      if (typeof window.safeHighlightAll === 'function') {
        window.safeHighlightAll();
      } else if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }
      this.renderMath();
      // Initialize simulator with 100.0 nominal
      this.runSimAct2(100.0);
    });
  }
}).mount('#app');
