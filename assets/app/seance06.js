/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°6 - APPRENTISSAGE
 * Chaînes de caractères & Fonctions prédéfinies normalisées (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      fonctionsPredefinies: [
        { nom: "Long(ch)", description: "Retourne le nombre de caractères de la chaîne ch", exemple: "Long(\"SCIENCE\") = 7" },
        { nom: "Pos(motif, ch)", description: "Retourne l'indice (base 0) de la 1ère occurrence du motif dans ch, ou -1 si absent", exemple: "Pos(\"EN\", \"SCIENCE\") = 3" },
        { nom: "Sous_chaine(ch, deb, fin)", description: "Extrait la sous-chaîne allant de l'indice deb à fin (fin exclue)", exemple: "Sous_chaine(\"SCIENCE\", 2, 4) = \"IE\"" },
        { nom: "Effacer(ch, deb, fin)", description: "Supprime les caractères de la chaîne situés entre les indices deb et fin (fin exclue)", exemple: "Effacer(\"SCIENCE\", 2, 5) = \"SCCE\"" },
        { nom: "Convch(valeur)", description: "Convertit une valeur numérique entière ou réelle en chaîne de caractères", exemple: "Convch(25) = \"25\"" },
        { nom: "Valeur(ch)", description: "Convertit la chaîne ch en valeur numérique", exemple: "Valeur(\"128\") = 128\nValeur(\"15.5\") = 15.5" },
        { nom: "Estnum(ch)", description: "Retourne Vrai si la chaîne ch représente un nombre valide, Faux sinon", exemple: "Estnum(\"2026\") = Vrai" },
        { nom: "Majus(ch)", description: "Retourne la chaîne ch convertie en lettres majuscules", exemple: "Majus(\"chimie\") = \"CHIMIE\"" },
        { nom: "Ord(c)", description: "Retourne le code ASCII (entier) du caractère c", exemple: "Ord('A') = 65" },
        { nom: "Chr(code)", description: "Retourne le caractère correspondant au code ASCII spécifié", exemple: "Chr(65) = 'A'" }
      ],

      codeIndexationAlgo: `// En algorithmique officielle 2024-2025 :
// Une chaîne Ch est indexée de 0 à Long(Ch) - 1.
Ch ← "SCIENCE"
Afficher(Long(Ch))        // 7
Afficher(Ch[0])            // 'S' (premier caractère)
Afficher(Ch[Long(Ch) - 1]) // 'E' (dernier caractère)
Afficher(Sous_chaine(Ch, 2, 4)) // "IE" (fin exclue : indices 2 et 3)`,

      codeIndexationPy: `# En Python officiel :
ch = "SCIENCE"
print(len(ch))       # 7
print(ch[0])         # 'S'
print(ch[len(ch)-1]) # 'E'
print(ch[2:4])       # "IE" (le 4 est exclu, équivalent à Sous_chaine(ch, 2, 4))`,

      // QCM Interactif - Activité 1 (4 Questions à 3 Choix)
      qcmAct1: [
        {
          id: 1,
          question: "Quelle est la valeur renvoyée par l'expression <code>Long(Ch)</code> pour <code>Ch ← \"SCIENCE\"</code> ?",
          options: [
            "<strong>6</strong> (confusion avec l'indice du dernier caractère <code>Long(Ch) - 1</code>)",
            "<strong>7</strong> (nombre total de caractères composant le mot <code>\"SCIENCE\"</code>)",
            "<strong>8</strong> (longueur incluant un caractère de fin de chaîne)"
          ],
          correct: 1,
          selected: null,
          explanation: "La fonction <code>Long(Ch)</code> renvoie le nombre exact de caractères. Le mot <code>\"SCIENCE\"</code> est composé de 7 lettres."
        },
        {
          id: 2,
          question: "Quels sont les caractères obtenus par <code>Ch[0]</code> et <code>Ch[Long(Ch) - 1]</code> ?",
          options: [
            "<code>'S'</code> et <code>'E'</code> (premier et dernier caractère avec l'indexation base 0)",
            "<code>'C'</code> et <code>'E'</code> (erreur de repérage en commençant à l'indice 1)",
            "<code>'S'</code> et <code>'C'</code> (premier et avant-dernier caractère)"
          ],
          correct: 0,
          selected: null,
          explanation: "En indexation officielle en base 0, le premier caractère est accessible à l'indice <code>0</code> (<code>'S'</code>) et le dernier à l'indice <code>Long(Ch) - 1 = 6</code> (<code>'E'</code>)."
        },
        {
          id: 3,
          question: "Quelle est la sous-chaîne retournée par l'instruction <code>Sous_chaine(Ch, 2, 4)</code> ?",
          options: [
            "<code>\"IE\"</code> (uniquement les deux caractères situés aux positions 2 et 3, indice 4 exclu)",
            "<code>\"IEN\"</code> (confusion fréquente en incluant l'indice de fin 4)",
            "<code>\"SC\"</code> (extraction des indices 0 et 1)"
          ],
          correct: 0,
          selected: null,
          explanation: "En algorithmique officielle (conventions 2024-2025), <code>Sous_chaine(Ch, deb, fin)</code> extrait les caractères de l'indice <code>deb</code> à l'indice <code>fin</code> (<strong>fin exclue</strong>). Pour <code>Sous_chaine(\"SCIENCE\", 2, 4)</code>, on extrait uniquement les deux caractères situés aux positions 2 (<code>'I'</code>) et 3 (<code>'E'</code>) $\\implies$ <code>\"IE\"</code>."
        },
        {
          id: 4,
          question: "Que renvoient respectivement les appels <code>Pos(\"IEN\", Ch)</code> et <code>Pos(\"PHY\", Ch)</code> ?",
          options: [
            "<code>2</code> et <code>-1</code> (indice de la 1<sup>ère</sup> occurrence, et -1 si motif absent)",
            "<code>3</code> et <code>0</code> (indice en base 1, et 0 en cas d'absence)",
            "<code>2</code> et <code>Faux</code> (indice positionnel, et résultat booléen si absent)"
          ],
          correct: 0,
          selected: null,
          explanation: "<code>Pos(\"IEN\", Ch)</code> renvoie <code>2</code> (l'indice base 0 de début du motif dans <code>\"SCIENCE\"</code>). Si le motif est introuvable (ex: <code>\"PHY\"</code>), <code>Pos</code> renvoie conventionnellement <code>-1</code>."
        }
      ],

      // QCM Interactif - Activité 2 (3 Questions à 3 Choix)
      qcmAct2: [
        {
          id: 1,
          question: "Quelle condition booléenne permet de vérifier qu'une variable caractère <code>c</code> est une lettre alphabétique majuscule ?",
          options: [
            "<code>(Ord(c) &gt;= 65) Et (Ord(c) &lt;= 90)</code> (ou <code>(c &gt;= 'A') Et (c &lt;= 'Z')</code>)",
            "<code>(Ord(c) &gt;= 97) Et (Ord(c) &lt;= 122)</code> (confusion avec la plage des minuscules)",
            "<code>(Ord(c) &gt;= 48) Et (Ord(c) &lt;= 57)</code> (confusion avec la plage des chiffres)"
          ],
          correct: 0,
          selected: null,
          explanation: "Dans la table ASCII, les 26 lettres majuscules occupent la plage continue de 65 (<code>'A'</code>) à 90 (<code>'Z'</code>). La condition s'écrit <code>(Ord(c) &gt;= 65) Et (Ord(c) &lt;= 90)</code> ou <code>(c &gt;= 'A') Et (c &lt;= 'Z')</code>."
        },
        {
          id: 2,
          question: "Déterminer le résultat renvoyé par l'expression <code>Chr(Ord('A') + 3)</code> :",
          options: [
            "<code>'D'</code> (décalage César : <code>Ord('A') + 3 = 65 + 3 = 68 $\\implies$ Chr(68) = 'D'</code>)",
            "<code>'C'</code> (décalage de 2 positions au lieu de 3)",
            "<code>68</code> (confusion entre la valeur numérique du code et le caractère renvoyé par <code>Chr</code>)"
          ],
          correct: 0,
          selected: null,
          explanation: "<code>Ord('A')</code> renvoie 65. L'expression <code>Ord('A') + 3</code> calcule <code>65 + 3 = 68</code>. La fonction <code>Chr(68)</code> renvoie le caractère de code 68, soit <code>'D'</code>."
        },
        {
          id: 3,
          question: "Quelle formule permet de convertir un caractère minuscule $c \\in ['a'; 'z']$ en majuscule à l'aide de <code>Ord</code> et <code>Chr</code> ?",
          options: [
            "<code>Chr(Ord(c) - 32)</code> (écart fixe : <code>Ord('a') - 32 = 97 - 32 = 65 = Ord('A')</code>)",
            "<code>Chr(Ord(c) + 32)</code> (sens inverse : transforme une majuscule en minuscule)",
            "<code>Ord(c) - 32</code> (renvoie un code entier au lieu d'un type Caractère)"
          ],
          correct: 0,
          selected: null,
          explanation: "L'écart entre une lettre minuscule et sa majuscule est constant dans la table ASCII : <code>Ord('a') - Ord('A') = 97 - 65 = 32</code>. Pour obtenir le caractère majuscule, on soustrait 32 avant d'appliquer <code>Chr</code> : <code>Chr(Ord(c) - 32)</code>."
        }
      ],

      // QCM Interactif - Activité 4 (Question 1 : Justification de la symétrie)
      qcmAct4: [
        {
          id: 1,
          question: "Pourquoi suffit-il de comparer le caractère à l'indice $i$ avec son symétrique à l'indice $\\text{Long}(Ch) - 1 - i$ pour $i$ allant de $0$ jusqu'à $\\text{Long}(Ch) \\text{ Div } 2$ ?",
          options: [
            "<strong>Symétrie axiale des paires :</strong> Chaque test traite 2 caractères opposés simultanément. Parcourir la première moitié ($0$ à $\\text{Long}(Ch) \\text{ Div } 2$) compare ainsi l'ensemble des paires symétriques sans aucune redondance.",
            "<strong>Recopie mémoire automatique :</strong> Les caractères de la seconde moitié sont automatiquement recopiés dans la première moitié lors du déroulement de la boucle.",
            "<strong>Limite d'itération obligatoire :</strong> Une boucle conditionnelle ne peut pas parcourir plus de la moitié des cases d'une chaîne sans provoquer une erreur d'indice mémoire."
          ],
          correct: 0,
          selected: null,
          explanation: "Un palindrome possède un axe de symétrie central : chaque comparaison entre $Ch[i]$ et $Ch[\\text{Long}(Ch) - 1 - i]$ valide deux caractères opposés à la fois ($Ch[0] \\leftrightarrow Ch[L-1]$, $Ch[1] \\leftrightarrow Ch[L-2]$, etc.). S'arrêter à $\\text{Long}(Ch) \\text{ Div } 2$ suffit donc pour vérifier l'ensemble des caractères, évitant de retester inutilement les mêmes paires en sens inverse."
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
    scoreAct2() {
      return this.qcmAct2.filter(q => q.selected === q.correct).length;
    },
    totalReponduAct2() {
      return this.qcmAct2.filter(q => q.selected !== null).length;
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
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct1() {
      this.qcmAct1.forEach(q => {
        q.selected = null;
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("QCM Activité 1 réinitialisé !");
      }
    },

    selectReponseAct2(qIdx, optIdx) {
      this.qcmAct2[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct2[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct2() {
      this.qcmAct2.forEach(q => {
        q.selected = null;
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("QCM Activité 2 réinitialisé !");
      }
    },

    selectReponseAct4(qIdx, optIdx) {
      this.qcmAct4[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmAct4[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! Justification validée", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmAct4() {
      this.qcmAct4.forEach(q => {
        q.selected = null;
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Question 1 réinitialisée !");
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
