/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°4 - APPRENTISSAGE
 * Boucle Répéter ... Jusqu'à & Structure conditionnelle Selon (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      codeRepeterAlgo: `Répéter
  Écrire("Voulez-vous continuer (O/N) ? ")
  Lire(rep)
Jusqu'à (rep = 'O') Ou (rep = 'N')`,

      codeSelonAlgo: `Selon Choix
  1 : Ecrire("Vitesse v = ", d / t)
  2 : Ecrire("Énergie Ec = ", 0.5 * m * v * v)
  3 : Ecrire("Puissance P = ", E / dt)
  0 : Ecrire("Fin de la session.")
  Sinon Ecrire("Choix invalide !")
Fin Selon`,

      codeMatchCasePython: `match choix:
    case 1:
        print("Vitesse v =", d / t)
    case 2:
        print("Énergie Ec =", 0.5 * m * v * v)
    case 3:
        print("Puissance P =", E / dt)
    case 0:
        print("Fin de la session.")
    case _:
        print("Choix invalide !")`,

      codeAct1Algo: `tentatives ← 0
Répéter
  ack ← alea(1, 6)
  tentatives ← tentatives + 1
  Écrire("Trame transmise... Réponse : ", ack)
Jusqu'à (ack = 6)
Écrire("Connexion établie en ", tentatives, " essais.")`,

      // Questions interactives de l'Activité 1 (QCM à 3 choix)
      qcmAct1: [
        {
          id: 1,
          question: "Combien de fois la transmission et l'évaluation s'exécutent-elles au minimum ?",
          options: [
            "<strong>0 fois</strong> (si la condition d'arrêt était déjà vérifiée avant l'entrée)",
            "<strong>1 fois</strong> (le corps de la boucle s'exécute toujours avant le test de sortie)",
            "<strong>6 fois</strong> (car la fonction <code>alea(1, 6)</code> tire parmi 6 valeurs)"
          ],
          correct: 1,
          selected: null,
          explanation: "Dans la boucle Répéter ... Jusqu'à (boucle à post-condition), les instructions du corps s'exécutent obligatoirement au moins une fois car la condition d'arrêt n'est testée qu'en fin d'itération."
        },
        {
          id: 2,
          question: "<em>Exemple illustratif :</em> Si les tirages successifs de <code>ack</code> sont <code>3</code>, <code>1</code>, <code>5</code>, <code>6</code>, quel est l'affichage final ?",
          options: [
            '<code>"Connexion établie en 3 essais."</code>',
            '<code>"Connexion établie en 4 essais."</code>',
            '<code>"Connexion établie en 6 essais."</code>'
          ],
          correct: 1,
          selected: null,
          explanation: "La boucle effectue 4 itérations (pour 3, 1, 5 et 6). La variable tentatives s'incrémente de 1 à chaque passage. Elle vaut donc 4 lorsque ack = 6 valide la condition d'arrêt."
        },
        {
          id: 3,
          question: "Pourquoi la structure <code>Répéter ... Jusqu'à</code> est-elle plus adaptée ici qu'une boucle <code>Tant Que</code> ?",
          options: [
            "Car la transmission doit avoir lieu au moins une fois avant de pouvoir tester l'accusé de réception (ACK).",
            "Car le nombre de transmissions est déterminé et connu d'avance dès le départ.",
            "Car la structure Tant Que ne permet pas d'évaluer une condition d'égalité (=)."
          ],
          correct: 0,
          selected: null,
          explanation: "L'émetteur radio doit obligatoirement émettre une première trame pour obtenir un premier code ACK. Répéter ... Jusqu'à évite ainsi d'avoir à initialiser artificiellement la variable avant la boucle."
        }
      ],

      codeAct3Py: `mois = int(input("Numéro du mois (1 à 12) : "))
match mois:
    case 1 | 3 | 5 | 7 | 8 | 10 | 12:
        print("31 jours")
    case 4 | 6 | 9 | 11:
        print("30 jours")
    case 2:
        print("28 jours")
    case _:
        print("Mois invalide !")`,

      // Questions interactives de l'Activité 3 (QCM à 3 choix)
      qcmAct3: [
        {
          id: 1,
          question: "Quel est le rôle de l'opérateur <code>|</code> dans les motifs de <code>case</code> ?",
          options: [
            "Il représente une alternative (<code>OU</code>) permettant d'associer plusieurs valeurs au même traitement.",
            "Il réalise une division entière entre les différents numéros de mois spécifiés.",
            "Il impose que toutes les valeurs soient réunies en même temps (<code>ET</code> logique)."
          ],
          correct: 0,
          selected: null,
          explanation: "Dans la structure <code>match...case</code> de Python 3.10+, le caractère <code>|</code> (motif OR) permet de regrouper plusieurs valeurs scalaires sous un même <code>case</code>. Cela correspond à la virgule dans <code>Selon Sélecteur : 1, 3, 5 : ...</code> en algorithmique."
        },
        {
          id: 2,
          question: "À quelle clause algorithmique correspond le motif universel <code>case _:</code> ?",
          options: [
            "À la clause de tête <code>Selon Sélecteur</code>.",
            "À la clause par défaut <code>Sinon</code> de la structure <code>Selon</code>.",
            "À l'instruction de fermeture <code>Fin Selon</code>."
          ],
          correct: 1,
          selected: null,
          explanation: "Le tiret bas <code>_</code> (wildcard) capture tous les cas non traités par les motifs précédents. Il correspond fidèlement à la branche par défaut <code>Sinon</code> de la structure conditionnelle à choix multiples."
        },
        {
          id: 3,
          question: "Quelle condition dans une boucle <code>while</code> permet de forcer la saisie d'un mois valide (entre 1 et 12) ?",
          options: [
            "<code>while mois &lt; 1 or mois &gt; 12:</code> (répéter tant que la saisie est hors intervalle)",
            "<code>while mois &gt;= 1 and mois &lt;= 12:</code> (répéter tant que le mois saisi est déjà valide)",
            "<code>while mois == 1 or mois == 12:</code> (tester uniquement les deux bornes extrêmes)"
          ],
          correct: 0,
          selected: null,
          explanation: "En Python, la boucle <code>while</code> continue tant que sa condition est <strong>Vraie</strong>. Pour rejeter une saisie erronée et redemander la valeur, la condition de répétition doit être la négation de la validité : <code>mois &lt; 1 or mois &gt; 12</code>."
        }
      ],

      codeAct4Algo: `Algorithme ClassTemp
Début
  Lire(temp)  # temp est de type Réel
  Selon temp
    -10.0 .. 0.0   : Écrire("Gel")
    0.1 .. 20.0     : Écrire("Frais")
    Sinon           : Écrire("Chaud")
  Fin Selon
Fin`,

      // Questions interactives de l'Activité 4 (QCM à 3 choix pour Q1 et Q2)
      qcmAct4: [
        {
          id: 1,
          question: "Rappeler les seuls types de données autorisés pour le sélecteur d'une structure <code>Selon</code> :",
          options: [
            "Uniquement les types scalaires : <strong>Entier</strong> ou <strong>Caractère</strong>.",
            "Tous les types simples : Réel, Entier, Chaîne et Booléen.",
            "Uniquement le type <strong>Réel</strong> pour pouvoir comparer des intervalles continus."
          ],
          correct: 0,
          selected: null,
          explanation: "En algorithmique, le sélecteur d'une structure <code>Selon</code> doit être obligatoirement un type <strong>scalaire</strong> (dénombrable) : <strong>Entier</strong> ou <strong>Caractère</strong>. Le type <strong>Réel</strong> n'est pas autorisé."
        },
        {
          id: 2,
          question: "Identifier l'erreur commise par l'élève dans cet algorithme :",
          options: [
            "La variable <code>temp</code> est de type <strong>Réel</strong> et les intervalles réels ne sont pas énumérables.",
            "La clause <code>Sinon</code> n'existe pas dans la structure conditionnelle <code>Selon</code>.",
            "Les valeurs négatives comme <code>-10.0</code> ne sont jamais acceptées en algorithmique."
          ],
          correct: 0,
          selected: null,
          explanation: "<code>temp</code> est déclarée de type <strong>Réel</strong>. Les intervalles réels (ex. <code>-10.0 .. 0.0</code>) contiennent une infinité de valeurs non énumérables. Pour des valeurs réelles, il faut obligatoirement utiliser une structure <code>Si ... Sinon Si ... Sinon</code>."
        }
      ]
    };
  },

  computed: {
    scoreAct1() {
      return this.qcmAct1.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct1() {
      return this.qcmAct1.filter(q => q.selected !== null).length;
    },
    scoreAct3() {
      return this.qcmAct3.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct3() {
      return this.qcmAct3.filter(q => q.selected !== null).length;
    },
    scoreAct4() {
      return this.qcmAct4.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct4() {
      return this.qcmAct4.filter(q => q.selected !== null).length;
    }
  },

  methods: {
    selectReponseAct1(qIdx, optIdx) {
      this.qcmAct1[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct1[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication", "bi-x-circle-fill text-danger");
        }
      }
    },

    resetQcmAct1() {
      this.qcmAct1.forEach(q => {
        q.selected = null;
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("QCM Activité 1 réinitialisé !");
      }
    },

    selectReponseAct3(qIdx, optIdx) {
      this.qcmAct3[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct3[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication", "bi-x-circle-fill text-danger");
        }
      }
    },

    resetQcmAct3() {
      this.qcmAct3.forEach(q => {
        q.selected = null;
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("QCM Activité 3 réinitialisé !");
      }
    },

    selectReponseAct4(qIdx, optIdx) {
      this.qcmAct4[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct4[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication", "bi-x-circle-fill text-danger");
        }
      }
    },

    resetQcmAct4() {
      this.qcmAct4.forEach(q => {
        q.selected = null;
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("QCM Activité 4 réinitialisé !");
      }
    },
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
