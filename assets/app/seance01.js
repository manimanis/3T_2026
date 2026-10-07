/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°1 - SÉRIE DE RENTRÉE N° 0
 * Révision · Réactivation · Évaluation diagnostique (90 min - Barème /40)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      // Codes for quick copying
      codeAlgoEx2: `ALGORITHME Etat
DEBUT
  a ← 4
  b ← a + 3
  a ← b * 2
  c ← a - b
  Écrire(a, b, c)
FIN`,

      codeAlgoEx3: `Lire(x)
Si (x ≥ 10) Et (x ≤ 20) Alors
  Écrire("Dans la plage")
Sinon
  Écrire("Hors de la plage")
FinSi`,

      codeAlgoEx4: `Lire(n)
s ← 0
Pour i de 1 à n Faire
  s ← s + i
Fin Pour
Écrire(s)`,

      codeAlgoEx5: `ALGORITHME MoyenneMesures
DEBUT
  Lire(n)
  s ← [ A ]
  Pour i de 1 à n Faire
    Lire(x)
    [ B ]
  Fin Pour
  m ← [ C ]
  Écrire(m)
FIN`,

      codeAlgoEx6: `Lire(n)
nbPos ← 1
Pour i de 1 à n Faire
  Lire(x)
  Si x ≥ 0 Alors
    nbPos ← nbPos + 1
  FinSi
Fin Pour
Écrire(nbPos)`,

      codeAlgoEx7: `Lire(n)
s ← 0
Pour i de 1 à n Faire
  Lire(x)
  s ← s + x
Fin Pour
Écrire(s)`,

      codeAlgoEx8A: `maxi ← a
Si b > maxi Alors
  maxi ← b
FinSi
Si c > maxi Alors
  maxi ← c
FinSi
Écrire(maxi)`,

      codeAlgoEx8B: `Si a > b Alors
  maxi ← a
Sinon
  maxi ← b
FinSi
Si c > maxi Alors
  maxi ← c
FinSi
Écrire(maxi)`,

      codeAlgoEx9: `Lire(n)
nbPairs ← 0
Pour i de 1 à n Faire
  Lire(x)
  Si x Mod 2 = 0 Alors
    nbPairs ← nbPairs + 1
  FinSi
Fin Pour
Écrire(nbPairs)`,

      // Exercice 1 Interactif
      qcmEx1: [
        {
          id: 1,
          question: "Indiquer le but du problème en une phrase :",
          options: [
            "Calculer et afficher la vitesse moyenne (<var>v</var> = <var>d</var> / <var>t</var>) d'un mobile à partir d'une distance <var>d</var> et d'une durée <var>t</var> &gt; 0.",
            "Mesurer expérimentalement la durée <var>t</var> d'un parcours pour une vitesse fixée à l'avance.",
            "Vérifier graphiquement si le mouvement est accéléré en comparant plusieurs mesures de durées."
          ],
          correct: 0,
          selected: null,
          explanation: "Le but de l'algorithme est d'acquérir les mesures de distance <var>d</var> et de durée <var>t</var> &gt; 0, de calculer le quotient <var>v</var> = <var>d</var> / <var>t</var> représentant la vitesse moyenne, puis d'afficher le résultat obtenu."
        },
        {
          id: 2,
          question: "Compléter l'analyse : entrées, sortie et contrainte :",
          options: [
            "<strong>Entrées :</strong> <var>d</var> (distance) et <var>t</var> (durée) · <strong>Sortie :</strong> <var>v</var> (vitesse moyenne) · <strong>Contrainte :</strong> <var>t</var> &gt; 0 (durée strictement positive).",
            "<strong>Entrées :</strong> <var>v</var> (vitesse moyenne) · <strong>Sorties :</strong> <var>d</var> et <var>t</var> · <strong>Contrainte :</strong> <var>d</var> &gt; 0 (distance strictement positive).",
            "<strong>Entrées :</strong> <var>d</var> et <var>v</var> · <strong>Sortie :</strong> <var>t</var> · <strong>Contrainte :</strong> aucune contrainte temporelle."
          ],
          correct: 0,
          selected: null,
          explanation: "Les <strong>entrées</strong> sont les données fournies par l'utilisateur (<var>d</var> et <var>t</var>). La <strong>sortie</strong> est le résultat final produit (<var>v</var>). La <strong>contrainte</strong> est <var>t</var> &gt; 0 car une durée physique ne peut pas être négative ou nulle, et la division par zéro est indéfinie."
        }
      ],

      typesEx1Options: [
        "Réel",
        "Entier",
        "Caractère",
        "Chaîne de caractères",
        "Booléen"
      ],

      typesEx1Rows: [
        {
          id: "dtv",
          nom: "<code>d</code>, <code>t</code>, <code>v</code>",
          exemple: "mesures numériques avec décimales",
          correct: "Réel",
          selected: "",
          explanation: "Ce sont des grandeurs physiques réelles à virgule flottante (en Python : <code>float</code>)."
        },
        {
          id: "init",
          nom: "<code>initialeGroupe</code>",
          exemple: "<code>'A'</code>",
          correct: "Caractère",
          selected: "",
          explanation: "Un symbole unique entouré d'apostrophes simples est de type <strong>Caractère</strong>."
        },
        {
          id: "valide",
          nom: "<code>estValide</code>",
          exemple: "<code>Vrai</code> ou <code>Faux</code>",
          correct: "Booléen",
          selected: "",
          explanation: "Une variable logique binaire ne pouvant valoir que <code>Vrai</code> ou <code>Faux</code> est de type <strong>Booléen</strong> (en Python : <code>bool</code>)."
        },
        {
          id: "nom",
          nom: "<code>nomExperience</code>",
          exemple: "<code>'Chute libre'</code>",
          correct: "Chaîne de caractères",
          selected: "",
          explanation: "Un texte composé d'une suite de plusieurs caractères est une <strong>Chaîne de caractères</strong> (en Python : <code>str</code>)."
        }
      ],

      // Question 4 : Glisser-déposer vers des emplacements fixes (Étapes 1 à 4)
      allActionsEx1: [
        {
          id: "saisir_d",
          type: "Entrée",
          badgeClass: "bg-info text-dark",
          label: "Saisir la distance <var class=\"fw-bold text-info\">d</var> (en mètres, avec <var class=\"fw-bold\">d</var> &ge; 0)",
          desc: "Entrée : acquisition de la distance parcourue par le mobile"
        },
        {
          id: "saisir_t",
          type: "Entrée",
          badgeClass: "bg-info text-dark",
          label: "Saisir la durée <var class=\"fw-bold text-info\">t</var> (en secondes, avec la contrainte <var class=\"fw-bold\">t</var> &gt; 0)",
          desc: "Entrée : acquisition contrôlée de la durée non nulle"
        },
        {
          id: "calcul_v",
          type: "Traitement",
          badgeClass: "bg-warning text-dark",
          label: "Calculer la vitesse moyenne selon la formule : <var class=\"fw-bold text-warning\">v</var> &larr; <var class=\"fw-bold\">d</var> / <var class=\"fw-bold\">t</var>",
          desc: "Traitement : calcul du quotient distance / durée"
        },
        {
          id: "afficher_v",
          type: "Sortie",
          badgeClass: "bg-success text-white",
          label: "Afficher la vitesse moyenne calculée <var class=\"fw-bold text-success\">v</var>",
          desc: "Sortie : communication de la vitesse obtenue à l'utilisateur"
        }
      ],
      // Banque d'actions disponibles à placer (mélangées au départ)
      poolActionsEx1: [
        {
          id: "calcul_v",
          type: "Traitement",
          badgeClass: "bg-warning text-dark",
          label: "Calculer la vitesse moyenne selon la formule : <var class=\"fw-bold text-warning\">v</var> &larr; <var class=\"fw-bold\">d</var> / <var class=\"fw-bold\">t</var>",
          desc: "Traitement : calcul du quotient distance / durée"
        },
        {
          id: "afficher_v",
          type: "Sortie",
          badgeClass: "bg-success text-white",
          label: "Afficher la vitesse moyenne calculée <var class=\"fw-bold text-success\">v</var>",
          desc: "Sortie : communication de la vitesse obtenue à l'utilisateur"
        },
        {
          id: "saisir_d",
          type: "Entrée",
          badgeClass: "bg-info text-dark",
          label: "Saisir la distance <var class=\"fw-bold text-info\">d</var> (en mètres, avec <var class=\"fw-bold\">d</var> &ge; 0)",
          desc: "Entrée : acquisition de la distance parcourue par le mobile"
        },
        {
          id: "saisir_t",
          type: "Entrée",
          badgeClass: "bg-info text-dark",
          label: "Saisir la durée <var class=\"fw-bold text-info\">t</var> (en secondes, avec la contrainte <var class=\"fw-bold\">t</var> &gt; 0)",
          desc: "Entrée : acquisition contrôlée de la durée non nulle"
        }
      ],
      // 4 emplacements cibles fixes (Étape 1, Étape 2, Étape 3, Étape 4)
      slotsEx1: [null, null, null, null],
      activeDraggingId: null,
      dragOverTarget: null,
      isActionsEx1Verified: false,
      isActionsEx1Correct: false,
      showSolutionActionsEx1: false,

      // Exercice 2 Interactif (QCM)
      qcmEx2: [
        {
          id: 1,
          question: "1. Quel affichage obtient-on à la fin de l'algorithme ?",
          options: [
            "<code>14, 7, 7</code>",
            "<code>4, 7, 3</code>",
            "<code>14, 14, 0</code>",
            "<code>8, 7, 1</code>"
          ],
          correct: 0,
          selected: null,
          explanation: "Trace d'exécution pas à pas :<br>• <code>a ← 4</code> &rarr; <var>a</var> = 4<br>• <code>b ← a + 3</code> &rarr; <var>b</var> = 4 + 3 = 7<br>• <code>a ← b * 2</code> &rarr; <var>a</var> = 7 &times; 2 = 14 (l'ancienne valeur 4 est écrasée)<br>• <code>c ← a - b</code> &rarr; <var>c</var> = 14 - 7 = 7<br>L'instruction <code>Écrire(a, b, c)</code> affiche donc <strong>14, 7, 7</strong>."
        },
        {
          id: 2,
          question: "2. Après la modification de la variable <code>a</code> (par <code>a ← b * 2</code>), pourquoi la valeur de <code>b</code> ne change-t-elle pas automatiquement ?",
          options: [
            "Parce qu'en algorithmique, l'affectation calcule et stocke une valeur figée en mémoire à l'instant de son exécution. Ce n'est pas une formule dynamique liée comme dans un tableur.",
            "Parce que la variable <code>b</code> devient une constante protégée dès sa première affectation.",
            "Parce que la variable <code>b</code> se réinitialise à 0 lorsque <code>a</code> est modifié.",
            "Parce que les modifications de variables ne se propagent que de droite à gauche dans le programme."
          ],
          correct: 0,
          selected: null,
          explanation: "En informatique, l'affectation (notée <code>←</code> ou <code>=</code> en Python) est une <strong>opération ponctuelle</strong> : elle évalue l'expression de droite au moment précis de l'instruction et place le résultat dans la variable de gauche. Elle n'établit <strong>aucun lien dynamique permanent</strong>. Modifier ultérieurement <code>a</code> ne recalcule donc pas <code>b</code>."
        }
      ],
      showTraceEx2: false,

      // Exercice 3 Interactif (QCM)
      qcmEx3: [
        {
          id: 1,
          question: "1. Donner l'affichage pour les 4 valeurs de test : <code>x = 9,5</code> ; <code>x = 10</code> ; <code>x = 20</code> ; <code>x = 20,1</code> :",
          options: [
            "<code>9,5</code> &rarr; Hors de la plage &middot; <code>10</code> &rarr; Dans la plage &middot; <code>20</code> &rarr; Dans la plage &middot; <code>20,1</code> &rarr; Hors de la plage",
            "<code>9,5</code> &rarr; Dans la plage &middot; <code>10</code> &rarr; Dans la plage &middot; <code>20</code> &rarr; Dans la plage &middot; <code>20,1</code> &rarr; Hors de la plage",
            "<code>9,5</code> &rarr; Hors de la plage &middot; <code>10</code> &rarr; Hors de la plage &middot; <code>20</code> &rarr; Dans la plage &middot; <code>20,1</code> &rarr; Dans la plage",
            "<code>9,5</code> &rarr; Dans la plage &middot; <code>10</code> &rarr; Hors de la plage &middot; <code>20</code> &rarr; Hors de la plage &middot; <code>20,1</code> &rarr; Dans la plage"
          ],
          correct: 0,
          selected: null,
          explanation: "La condition est <code>(x &ge; 10) Et (x &le; 20)</code>. L'intervalle est $[10 ; 20]$ bornes comprises :<br>&bull; $9,5 &lt; 10$ &rarr; <strong>Hors de la plage</strong><br>&bull; $10 \\in [10 ; 20]$ &rarr; <strong>Dans la plage</strong><br>&bull; $20 \\in [10 ; 20]$ &rarr; <strong>Dans la plage</strong><br>&bull; $20,1 &gt; 20$ &rarr; <strong>Hors de la plage</strong>."
        },
        {
          id: 2,
          question: "2. Pourquoi les valeurs 10 et 20 constituent-elles des tests particulièrement cruciaux ?",
          options: [
            "Parce que ce sont les <strong>valeurs limites (ou frontières)</strong> de l'intervalle ; tester les bornes permet de valider le comportement exact des inégalités larges (&ge; et &le;) et d'éviter les erreurs d'inégalités strictes.",
            "Parce que 10 et 20 sont les seuls entiers pairs de la plage de référence.",
            "Parce que le processeur ne calcule qu'avec des multiples de 10.",
            "Parce que toute autre valeur produit une exception d'exécution."
          ],
          correct: 0,
          selected: null,
          explanation: "En test logiciel et algorithmique, les tests aux limites (<em>boundary value testing</em>) sont fondamentaux car c'est presque toujours aux bornes que se glissent les erreurs d'inégalités (ex: confondre &le; et &lt;)."
        },
        {
          id: 3,
          question: "3. Si on remplace par erreur <code>x &le; 20</code> par <code>x &lt; 20</code>, quel test met immédiatement l'erreur en évidence ?",
          options: [
            "<code>x = 20</code> (l'algorithme afficherait à tort « Hors de la plage » au lieu de « Dans la plage »).",
            "<code>x = 10</code>",
            "<code>x = 9,5</code>",
            "<code>x = 20,1</code>"
          ],
          correct: 0,
          selected: null,
          explanation: "Pour $x = 20$, le test erroné <code>20 &lt; 20</code> est Faux, ce qui bascule dans la branche <code>Sinon</code> et affiche « Hors de la plage », contredisant la spécification initiale « bornes comprises »."
        },
        {
          id: 4,
          question: "4. Dans cet exercice, les valeurs 10 et 20 sont-elles des constantes ou des variables ?",
          options: [
            "Des <strong>constantes</strong> (valeurs fixes), car elles servent de seuils de référence invariables et ne changent jamais d'état en mémoire au cours de l'algorithme.",
            "Des <strong>variables</strong>, car elles peuvent être saisies au clavier par l'utilisateur.",
            "Des <strong>fonctions</strong>, car elles comparent les valeurs entrées.",
            "Des <strong>expressions</strong>, car elles dépendent de <code>x</code>."
          ],
          correct: 0,
          selected: null,
          explanation: "10 et 20 sont des valeurs constantes définissant la plage de référence ; elles sont figées dans la condition et ne sont modifiées par aucune affectation."
        }
      ],
      showTraceEx3: false,

      // Exercice 4 Interactif (QCM)
      qcmEx4: [
        {
          id: 1,
          question: "1. Pour <code>n = 4</code>, quelle est la suite des valeurs prises par la variable accumulateur <code>s</code> à chaque passage dans la boucle (<code>i = 1 à 4</code>) ?",
          options: [
            "<code>i=1 &rarr; s=1</code> &middot; <code>i=2 &rarr; s=3</code> &middot; <code>i=3 &rarr; s=6</code> &middot; <code>i=4 &rarr; s=10</code>",
            "<code>i=1 &rarr; s=1</code> &middot; <code>i=2 &rarr; s=2</code> &middot; <code>i=3 &rarr; s=3</code> &middot; <code>i=4 &rarr; s=4</code>",
            "<code>i=1 &rarr; s=0</code> &middot; <code>i=2 &rarr; s=1</code> &middot; <code>i=3 &rarr; s=3</code> &middot; <code>i=4 &rarr; s=6</code>",
            "<code>i=1 &rarr; s=1</code> &middot; <code>i=2 &rarr; s=4</code> &middot; <code>i=3 &rarr; s=9</code> &middot; <code>i=4 &rarr; s=16</code>"
          ],
          correct: 0,
          selected: null,
          explanation: "Trace pas à pas pour $n = 4$ avec $s$ initialisé à 0 :<br>&bull; $i = 1$ : $s = 0 + 1 = 1$<br>&bull; $i = 2$ : $s = 1 + 2 = 3$<br>&bull; $i = 3$ : $s = 3 + 3 = 6$<br>&bull; $i = 4$ : $s = 6 + 4 = 10$."
        },
        {
          id: 2,
          question: "2. Quel résultat final est affiché et quel est le rôle général de cet algorithme ?",
          options: [
            "Il affiche <strong>10</strong> et calcule la <strong>somme des n premiers entiers naturels non nuls</strong> : $1 + 2 + \\dots + n = \\frac{n(n+1)}{2}$.",
            "Il affiche <strong>4</strong> et compte le nombre d'itérations exécutées.",
            "Il affiche <strong>16</strong> et calcule le carré de l'entier $n$.",
            "Il affiche <strong>24</strong> et calcule la factorielle de $n$."
          ],
          correct: 0,
          selected: null,
          explanation: "Pour $n = 4$, l'instruction <code>Écrire(s)</code> affiche 10. Pour tout entier $n \\ge 1$, cet algorithme réalise la sommation arithmétique $1 + 2 + \\dots + n$."
        },
        {
          id: 3,
          question: "3. Pour calculer le produit $1 \\times 2 \\times \\dots \\times n$ (factorielle $n!$) au lieu de la somme, quelles sont les deux modifications indispensables ?",
          options: [
            "Initialiser <code>s &larr; 1</code> (élément neutre multiplicatif) et remplacer <code>s &larr; s + i</code> par <code>s &larr; s * i</code>.",
            "Remplacer <code>Lire(n)</code> par <code>Lire(s)</code> et la boucle par <code>Pour i de 0 à n</code>.",
            "Conserver <code>s &larr; 0</code> et remplacer <code>s &larr; s + i</code> par <code>s &larr; s * i</code>.",
            "Remplacer <code>Écrire(s)</code> par <code>Écrire(i)</code> et <code>s &larr; s + i</code> par <code>s &larr; s - i</code>."
          ],
          correct: 0,
          selected: null,
          explanation: "Pour une accumulation par produit, l'accumulateur doit démarrer à <strong>1</strong> (laisser 0 annulerait tout le produit) et le corps de boucle devient <code>s &larr; s * i</code>."
        }
      ],
      showTraceEx4: false,

      // Exercice 5 Interactif (QCM)
      qcmEx5: [
        {
          id: 1,
          question: "1. Quelles instructions complètent correctement les emplacements [A], [B] et [C] pour calculer la moyenne de mesures ?",
          options: [
            "<code>[A]</code> : <code>0</code> &middot; <code>[B]</code> : <code>s &larr; s + x</code> &middot; <code>[C]</code> : <code>s / n</code>",
            "<code>[A]</code> : <code>1</code> &middot; <code>[B]</code> : <code>s &larr; s + i</code> &middot; <code>[C]</code> : <code>s / i</code>",
            "<code>[A]</code> : <code>0</code> &middot; <code>[B]</code> : <code>s &larr; x</code> &middot; <code>[C]</code> : <code>s * n</code>",
            "<code>[A]</code> : <code>n</code> &middot; <code>[B]</code> : <code>s &larr; s + 1</code> &middot; <code>[C]</code> : <code>s / 2</code>"
          ],
          correct: 0,
          selected: null,
          explanation: "&bull; <code>[A]</code> : <code>0</code> (initialisation du cumul des mesures)<br>&bull; <code>[B]</code> : <code>s &larr; s + x</code> (sommation de chaque mesure lue <code>x</code>)<br>&bull; <code>[C]</code> : <code>s / n</code> (calcul de la moyenne arithmétique)."
        },
        {
          id: 2,
          question: "2. Quels sont les types adaptés à déclarer dans le TDO (Tableau de Déclaration des Objets) ?",
          options: [
            "<code>n, i</code> : <strong>Entier</strong> &middot; <code>x, s, m</code> : <strong>Réel</strong>",
            "Tous les objets sont de type <strong>Entier</strong>.",
            "<code>n</code> : <strong>Entier</strong> &middot; <code>i, x, s, m</code> : <strong>Chaîne de caractères</strong>",
            "<code>n, i, x</code> : <strong>Réel</strong> &middot; <code>s, m</code> : <strong>Booléen</strong>"
          ],
          correct: 0,
          selected: null,
          explanation: "Le nombre de mesures <code>n</code> et l'indice de boucle <code>i</code> sont des entiers discrets (&ge; 1). Les mesures <code>x</code>, leur somme <code>s</code> et la moyenne <code>m</code> ont des décimales et sont donc des <strong>Réels</strong>."
        },
        {
          id: 3,
          question: "3. Pour <code>n = 3</code> et les mesures <code>12,5</code> ; <code>13,0</code> ; <code>16,5</code>, quelle moyenne sera affichée pour <code>m</code> ?",
          options: [
            "<code>14.0</code> (Somme $s = 12,5 + 13,0 + 16,5 = 42,0$ &middot; Moyenne $m = 42,0 / 3 = 14,0$)",
            "<code>13.0</code> (valeur médiane sans division)",
            "<code>42.0</code> (la somme brute sans division)",
            "<code>14.5</code>"
          ],
          correct: 0,
          selected: null,
          explanation: "La somme cumulée est $12,5 + 13,0 + 16,5 = 42,0$. La division par 3 donne exactement 14,0."
        }
      ],
      showTraceEx5: false,

      // Exercice 6 Interactif (QCM)
      qcmEx6: [
        {
          id: 1,
          question: "1. Avec <code>n = 3</code> et les valeurs <code>-2</code> ; <code>0</code> ; <code>5</code>, quel résultat doit normalement produire un algorithme correct ?",
          options: [
            "<strong>1</strong> (seule la valeur 5 est strictement positive, car $-2 &lt; 0$ et 0 n'est pas strictement positif).",
            "<strong>2</strong> (si l'on comptait à tort le zéro comme strictement positif).",
            "<strong>3</strong> (toutes les valeurs saisies).",
            "<strong>0</strong>"
          ],
          correct: 0,
          selected: null,
          explanation: "Par définition, une valeur $x$ est <strong>strictement positive</strong> si $x &gt; 0$. Parmi $-2$, $0$ et $5$, seul $5$ vérifie cette propriété. Le résultat attendu est donc 1."
        },
        {
          id: 2,
          question: "2. Que produit en réalité l'algorithme erroné avec ce jeu d'essai (<code>-2 ; 0 ; 5</code>) ?",
          options: [
            "<strong>3</strong> (le compteur commence à 1, puis le zéro est compté (+1), puis 5 est compté (+1)).",
            "<strong>1</strong>",
            "<strong>2</strong>",
            "Une erreur d'exécution."
          ],
          correct: 0,
          selected: null,
          explanation: "Avec <code>nbPos</code> initialisé à 1 : pour $-2$, pas d'incrément ($nbPos=1$) ; pour $0$, $0 &ge; 0$ est Vrai ($nbPos=2$) ; pour $5$, $5 &ge; 0$ est Vrai ($nbPos=3$). Il affiche 3 au lieu de 1 !"
        },
        {
          id: 3,
          question: "3. Quelles sont les deux erreurs logiques identifiées et leurs corrections exactes ?",
          options: [
            "<strong>Erreur 1 :</strong> <code>nbPos &larr; 1</code> (à corriger en <code>nbPos &larr; 0</code>) &middot; <strong>Erreur 2 :</strong> <code>Si x &ge; 0</code> (à corriger en <code>Si x &gt; 0</code>).",
            "<strong>Erreur 1 :</strong> boucle de 1 à $n$ (à corriger de 0 à $n$) &middot; <strong>Erreur 2 :</strong> <code>Lire(x)</code> mal placé.",
            "<strong>Erreur 1 :</strong> type de variable erroné &middot; <strong>Erreur 2 :</strong> remplacer <code>Pour</code> par <code>TantQue</code>.",
            "<strong>Erreur 1 :</strong> <code>nbPos &larr; nbPos + 1</code> à remplacer par <code>nbPos &larr; x</code> &middot; <strong>Erreur 2 :</strong> manque d'un <code>Sinon</code>."
          ],
          correct: 0,
          selected: null,
          explanation: "Un compteur de dénombrement doit débuter à zéro (valeur initiale neutre). La stricte positivité impose en outre l'inégalité stricte <code>x &gt; 0</code> pour exclure le zéro."
        }
      ],
      showTraceEx6: false,

      // Exercice 7 Interactif (QCM)
      qcmEx7: [
        {
          id: 1,
          question: "1. Comment modifier le corps de la boucle pour n'ajouter à <code>s</code> que les valeurs multiples de 3 ?",
          options: [
            "Encapsuler l'accumulation dans un test : <code>Si x Mod 3 = 0 Alors s &larr; s + x FinSi</code>",
            "Remplacer l'accumulation par <code>s &larr; s + (x / 3)</code>",
            "Modifier l'en-tête de boucle : <code>Pour i de 1 à n (Pas = 3)</code>",
            "Écrire <code>Si x = 3 Alors s &larr; s + 3 FinSi</code>"
          ],
          correct: 0,
          selected: null,
          explanation: "Un entier $x$ est multiple de 3 si son reste dans la division entière par 3 est nul (<code>x Mod 3 = 0</code>). On n'additionne $x$ à $s$ que sous cette condition."
        },
        {
          id: 2,
          question: "2. Pour <code>n = 4</code> et les valeurs saisies <code>3 ; 4 ; 6 ; 7</code>, quel résultat est affiché par la solution modifiée ?",
          options: [
            "<strong>9</strong> (seuls 3 et 6 sont multiples de 3 : $3 + 6 = 9$)",
            "<strong>20</strong> (somme globale sans condition)",
            "<strong>13</strong> ($7 + 6$)",
            "<strong>2</strong> (nombre de multiples de 3 au lieu de leur somme)"
          ],
          correct: 0,
          selected: null,
          explanation: "Seuls 3 et 6 vérifient <code>Mod 3 = 0</code>. Le cumul est $3 + 6 = 9$."
        },
        {
          id: 3,
          question: "3. Quelle est la syntaxe exacte en Python pour tester « x est multiple de 3 » ?",
          options: [
            "<code>if x % 3 == 0:</code>",
            "<code>if x Mod 3 == 0:</code>",
            "<code>if x / 3 == 0:</code>",
            "<code>if x // 3 = 0:</code>"
          ],
          correct: 0,
          selected: null,
          explanation: "En Python, l'opérateur modulo est <code>%</code> et le test d'égalité logique s'écrit avec <code>==</code>."
        }
      ],
      showTraceEx7: false,

      // Exercice 8 Interactif (QCM)
      qcmEx8: [
        {
          id: 1,
          question: "1. Si l'on teste les deux solutions avec <code>a = 5, b = 5 et c = 2</code> (cas d'égalité), quel résultat obtient-on pour chacune d'elles ?",
          options: [
            "Les deux solutions affichent toutes les deux <strong>5</strong> sans aucune anomalie.",
            "Solution A affiche 5, mais Solution B affiche 2.",
            "Solution A affiche 2, mais Solution B affiche 5.",
            "Les deux solutions génèrent une erreur d'exécution."
          ],
          correct: 0,
          selected: null,
          explanation: "Dans la Solution A : <code>maxi &larr; 5</code> ; tests stricts Faux &rarr; affiche 5. Dans la Solution B : <code>5 &gt; 5</code> Faux &rarr; branche <code>Sinon</code> : <code>maxi &larr; 5</code> &rarr; affiche 5. L'égalité est gérée sans défaut."
        },
        {
          id: 2,
          question: "2. Concernant la validité algorithmique globale de ces deux solutions :",
          options: [
            "<strong>Les deux solutions sont toutes deux 100% valides</strong> et retournent le maximum exact pour n'importe quel triplet $(a, b, c)$, y compris les cas d'égalités.",
            "Seule la Solution A est valide, la Solution B étant redondante.",
            "Seule la Solution B est valide, car elle explicite l'alternative.",
            "Aucune des deux solutions n'est valide pour des nombres négatifs."
          ],
          correct: 0,
          selected: null,
          explanation: "Les deux algorithmes sont équivalents et rigoureusement corrects : ils garantissent tous les deux que <code>maxi</code> contiendra la plus grande valeur à la fin."
        },
        {
          id: 3,
          question: "3. Quelle est la démarche algorithmique commune adoptée par les deux solutions ?",
          options: [
            "<strong>Recherche séquentielle par candidat au maximum</strong> : poser une hypothèse de maximum sur $\{a, b\}$, puis la confronter à l'élément suivant $c$.",
            "Tri complet des données avant extraction de la dernière valeur.",
            "Calcul de la moyenne arithmétique pour en déduire la borne supérieure.",
            "Élimination successive des valeurs minimales."
          ],
          correct: 0,
          selected: null,
          explanation: "Les deux approches reposent sur le paradigme du candidat au maximum, mis à jour par comparaison successive."
        }
      ],
      showTraceEx8: false
    };
  },

  computed: {
    scoreQcmEx1() {
      return this.qcmEx1.filter(q => q.selected === q.correct).length;
    },
    totalReponduQcmEx1() {
      return this.qcmEx1.filter(q => q.selected !== null).length;
    },
    scoreTypesEx1() {
      return this.typesEx1Rows.filter(r => r.selected === r.correct).length;
    },
    totalReponduTypesEx1() {
      return this.typesEx1Rows.filter(r => r.selected !== '').length;
    },
    scoreActionsEx1() {
      return this.isActionsEx1Correct ? 1 : 0;
    },
    slotsEx1FilledCount() {
      return this.slotsEx1.filter(s => s !== null).length;
    },
    scoreEx1Total() {
      let score = this.scoreQcmEx1;
      if (this.scoreTypesEx1 === this.typesEx1Rows.length) {
        score += 1;
      } else {
        score += Math.round(this.scoreTypesEx1 * 0.25 * 100) / 100;
      }
      if (this.isActionsEx1Correct) {
        score += 1;
      }
      return score;
    },

    scoreQcmEx2() {
      return this.qcmEx2.filter(q => q.selected === q.correct).length;
    },
    totalReponduQcmEx2() {
      return this.qcmEx2.filter(q => q.selected !== null).length;
    },

    // Scores Ex 3 à 8
    scoreQcmEx3() { return this.qcmEx3.filter(q => q.selected === q.correct).length; },
    totalReponduQcmEx3() { return this.qcmEx3.filter(q => q.selected !== null).length; },

    scoreQcmEx4() { return this.qcmEx4.filter(q => q.selected === q.correct).length; },
    totalReponduQcmEx4() { return this.qcmEx4.filter(q => q.selected !== null).length; },

    scoreQcmEx5() { return this.qcmEx5.filter(q => q.selected === q.correct).length; },
    totalReponduQcmEx5() { return this.qcmEx5.filter(q => q.selected !== null).length; },

    scoreQcmEx6() { return this.qcmEx6.filter(q => q.selected === q.correct).length; },
    totalReponduQcmEx6() { return this.qcmEx6.filter(q => q.selected !== null).length; },

    scoreQcmEx7() { return this.qcmEx7.filter(q => q.selected === q.correct).length; },
    totalReponduQcmEx7() { return this.qcmEx7.filter(q => q.selected !== null).length; },

    scoreQcmEx8() { return this.qcmEx8.filter(q => q.selected === q.correct).length; },
    totalReponduQcmEx8() { return this.qcmEx8.filter(q => q.selected !== null).length; }
  },

  methods: {
    selectReponseQcmEx1(qIdx, optIdx) {
      this.qcmEx1[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        const isCorrect = (optIdx === this.qcmEx1[qIdx].correct);
        if (isCorrect) {
          window.showToast("Bonne réponse ! +1 point", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetQcmEx1() {
      this.qcmEx1.forEach(q => {
        q.selected = null;
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Questions 1 et 2 réinitialisées !");
      }
    },

    onTypeChange(row) {
      if (!row.selected) return;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        if (row.selected === row.correct) {
          window.showToast("Type correct ! Bravo", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Type incorrect, essayez à nouveau", "bi-x-circle-fill text-danger");
        }
      }
      this.$nextTick(() => { this.renderMath(); });
    },

    resetTypesEx1() {
      this.typesEx1Rows.forEach(r => {
        r.selected = "";
      });
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Liste des types réinitialisée !");
      }
    },

    // --- Question 4 : Glisser-déposer vers les 4 étapes ---
    isSlotCorrect(slotIdx) {
      const s = this.slotsEx1[slotIdx];
      if (!s) return false;
      if (slotIdx === 0) {
        return s.id === 'saisir_d' || s.id === 'saisir_t';
      }
      if (slotIdx === 1) {
        const s0 = this.slotsEx1[0];
        if (s.id === 'saisir_d' && s0 && s0.id === 'saisir_t') return true;
        if (s.id === 'saisir_t' && s0 && s0.id === 'saisir_d') return true;
        return (s.id === 'saisir_d' || s.id === 'saisir_t') && (!s0 || s0.id !== s.id);
      }
      if (slotIdx === 2) {
        return s.id === 'calcul_v';
      }
      if (slotIdx === 3) {
        return s.id === 'afficher_v';
      }
      return false;
    },

    onActionDragStart(event, action, fromSource, fromSlotIdx) {
      const payload = {
        actionId: action.id,
        fromSource: fromSource,
        fromSlotIdx: fromSlotIdx
      };
      window._draggedActionInfo = payload;
      if (event && event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', action.id);
        event.dataTransfer.setData('application/json', JSON.stringify(payload));
      }
      this.activeDraggingId = action.id;
    },

    onSlotDragOver(slotIdx, event) {
      if (event) {
        event.preventDefault();
        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = 'move';
        }
      }
      this.dragOverTarget = slotIdx;
    },

    onSlotDragEnter(slotIdx, event) {
      if (event) {
        event.preventDefault();
        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = 'move';
        }
      }
      this.dragOverTarget = slotIdx;
    },

    onSlotDragLeave(slotIdx, event) {
      if (event && event.currentTarget && event.relatedTarget) {
        if (event.currentTarget.contains(event.relatedTarget)) {
          return;
        }
      }
      if (this.dragOverTarget === slotIdx) {
        this.dragOverTarget = null;
      }
    },

    onSlotDrop(slotIdx, event) {
      if (event) event.preventDefault();
      let payload = null;
      if (event && event.dataTransfer) {
        try {
          const json = event.dataTransfer.getData('application/json');
          if (json) payload = JSON.parse(json);
        } catch (e) {}
        if (!payload) {
          const actId = event.dataTransfer.getData('text/plain');
          if (actId) {
            payload = { actionId: actId, fromSource: 'pool', fromSlotIdx: null };
          }
        }
      }
      if (!payload && window._draggedActionInfo) {
        payload = window._draggedActionInfo;
      }

      if (payload && payload.actionId) {
        this.placeActionIntoSlot(payload.actionId, slotIdx, payload.fromSource, payload.fromSlotIdx);
      }

      this.activeDraggingId = null;
      this.dragOverTarget = null;
      window._draggedActionInfo = null;
    },

    onPoolDragOver(event) {
      if (event) {
        event.preventDefault();
        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = 'move';
        }
      }
      this.dragOverTarget = 'pool';
    },

    onPoolDragEnter(event) {
      if (event) {
        event.preventDefault();
        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = 'move';
        }
      }
      this.dragOverTarget = 'pool';
    },

    onPoolDragLeave(event) {
      if (event && event.currentTarget && event.relatedTarget) {
        if (event.currentTarget.contains(event.relatedTarget)) {
          return;
        }
      }
      if (this.dragOverTarget === 'pool') {
        this.dragOverTarget = null;
      }
    },

    onPoolDrop(event) {
      if (event) event.preventDefault();
      let payload = null;
      if (event && event.dataTransfer) {
        try {
          const json = event.dataTransfer.getData('application/json');
          if (json) payload = JSON.parse(json);
        } catch (e) {}
      }
      if (!payload && window._draggedActionInfo) {
        payload = window._draggedActionInfo;
      }

      if (payload && payload.actionId && payload.fromSource === 'slot' && payload.fromSlotIdx !== null && payload.fromSlotIdx !== undefined) {
        this.removeActionFromSlot(payload.fromSlotIdx);
      }

      this.activeDraggingId = null;
      this.dragOverTarget = null;
      window._draggedActionInfo = null;
    },

    onActionDragEnd() {
      this.activeDraggingId = null;
      this.dragOverTarget = null;
      window._draggedActionInfo = null;
    },

    placeActionIntoSlot(actionId, targetSlotIdx, fromSource, fromSlotIdx) {
      const action = this.allActionsEx1.find(a => a.id === actionId);
      if (!action) return;

      this.isActionsEx1Verified = false;
      this.isActionsEx1Correct = false;

      const currentOccupant = this.slotsEx1[targetSlotIdx];

      if (fromSource === 'slot' && fromSlotIdx !== null && fromSlotIdx !== undefined) {
        if (fromSlotIdx === targetSlotIdx) return;
        // Permuter les deux étapes
        const newSlots = [...this.slotsEx1];
        newSlots[fromSlotIdx] = currentOccupant;
        newSlots[targetSlotIdx] = action;
        this.slotsEx1 = newSlots;
      } else {
        // Provient de la banque d'actions disponibles
        const newPool = [...this.poolActionsEx1];
        const poolIdx = newPool.findIndex(a => a.id === actionId);
        if (poolIdx !== -1) {
          newPool.splice(poolIdx, 1);
        }
        if (currentOccupant) {
          newPool.push(currentOccupant);
        }
        this.poolActionsEx1 = newPool;

        const newSlots = [...this.slotsEx1];
        newSlots[targetSlotIdx] = action;
        this.slotsEx1 = newSlots;
      }

      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast(`Action placée dans l'Étape ${targetSlotIdx + 1} !`, "bi-check2 text-primary");
      }
    },

    removeActionFromSlot(slotIdx) {
      const occupant = this.slotsEx1[slotIdx];
      if (!occupant) return;

      const newSlots = [...this.slotsEx1];
      newSlots[slotIdx] = null;
      this.slotsEx1 = newSlots;

      if (!this.poolActionsEx1.some(a => a.id === occupant.id)) {
        this.poolActionsEx1 = [...this.poolActionsEx1, { ...occupant }];
      }

      this.isActionsEx1Verified = false;
      this.isActionsEx1Correct = false;

      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast(`Action retirée de l'Étape ${slotIdx + 1}`, "bi-arrow-return-left text-secondary");
      }
    },

    clickPoolAction(action) {
      const emptyIdx = this.slotsEx1.findIndex(s => s === null);
      if (emptyIdx !== -1) {
        this.placeActionIntoSlot(action.id, emptyIdx, 'pool', null);
      } else {
        if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
          window.showToast("Toutes les étapes sont occupées. Vous pouvez intervertir des étapes ou en retirer une.", "bi-info-circle text-warning");
        }
      }
    },

    verifierActionsSlotsEx1() {
      const emptyCount = this.slotsEx1.filter(s => s === null).length;
      if (emptyCount > 0) {
        if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
          window.showToast(`Il reste encore ${emptyCount} étape(s) vide(s). Placez une action dans chaque étape !`, "bi-exclamation-triangle-fill text-warning");
        }
        return;
      }

      const s0 = this.slotsEx1[0].id;
      const s1 = this.slotsEx1[1].id;
      const s2 = this.slotsEx1[2].id;
      const s3 = this.slotsEx1[3].id;

      const inputsOk = ((s0 === 'saisir_d' && s1 === 'saisir_t') || (s0 === 'saisir_t' && s1 === 'saisir_d'));
      const calculOk = (s2 === 'calcul_v');
      const sortieOk = (s3 === 'afficher_v');

      this.isActionsEx1Correct = inputsOk && calculOk && sortieOk;
      this.isActionsEx1Verified = true;

      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        if (this.isActionsEx1Correct) {
          window.showToast("Bravo ! Les 4 étapes sont parfaitement ordonnées (+1 pt)", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Ordre incorrect. Vérifiez les étapes indiquées en rouge !", "bi-x-circle-fill text-danger");
        }
      }
    },

    shuffleActions(actions) {
      const arr = actions.map(a => ({ ...a }));
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },

    clickEmptySlot(slotIdx) {
      if (this.poolActionsEx1.length > 0) {
        const nextAction = this.poolActionsEx1[0];
        this.placeActionIntoSlot(nextAction.id, slotIdx, 'pool', null);
      }
    },

    resetActionsSlotsEx1() {
      this.slotsEx1 = [null, null, null, null];
      this.poolActionsEx1 = this.shuffleActions(this.allActionsEx1);
      this.activeDraggingId = null;
      this.dragOverTarget = null;
      this.isActionsEx1Verified = false;
      this.isActionsEx1Correct = false;
      this.showSolutionActionsEx1 = false;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Exercice réinitialisé : étapes vidées et actions remises dans la banque !");
      }
    },

    melangerBanqueEx1() {
      if (this.poolActionsEx1.length > 1) {
        this.poolActionsEx1 = this.shuffleActions(this.poolActionsEx1);
        if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
          window.showToast("Ordre de la banque mélangé !");
        }
      }
    },

    melangerActionsSlotsEx1() {
      this.melangerBanqueEx1();
    },

    appliquerSolutionEx1() {
      const d = this.allActionsEx1.find(a => a.id === 'saisir_d');
      const t = this.allActionsEx1.find(a => a.id === 'saisir_t');
      const calc = this.allActionsEx1.find(a => a.id === 'calcul_v');
      const aff = this.allActionsEx1.find(a => a.id === 'afficher_v');
      this.slotsEx1 = [{ ...d }, { ...t }, { ...calc }, { ...aff }];
      this.poolActionsEx1 = [];
      this.isActionsEx1Verified = true;
      this.isActionsEx1Correct = true;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Solution appliquée dans les 4 étapes !", "bi-check2-circle text-success");
      }
    },

    toggleSolutionActionsEx1() {
      this.showSolutionActionsEx1 = !this.showSolutionActionsEx1;
    },

    resetEx1() {
      this.qcmEx1.forEach(q => { q.selected = null; });
      this.typesEx1Rows.forEach(r => { r.selected = ""; });
      this.resetActionsSlotsEx1();
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Exercice 1 entièrement réinitialisé !");
      }
    },

    selectReponseQcmEx2(qIdx, optIdx) {
      this.qcmEx2[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        if (optIdx === this.qcmEx2[qIdx].correct) {
          window.showToast("Bonne réponse !", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication.", "bi-x-circle-fill text-danger");
        }
      }
    },

    resetQcmEx2() {
      this.qcmEx2.forEach(q => { q.selected = null; });
      this.showTraceEx2 = false;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast("Exercice 2 réinitialisé !");
      }
    },

    // Méthodes génériques pour les exercices 3 à 8
    selectReponseGeneric(exNum, qIdx, optIdx) {
      const qcm = this['qcmEx' + exNum];
      if (!qcm || !qcm[qIdx]) return;
      qcm[qIdx].selected = optIdx;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        if (optIdx === qcm[qIdx].correct) {
          window.showToast("Bonne réponse !", "bi-check-circle-fill text-success");
        } else {
          window.showToast("Réponse incorrecte, consultez l'explication.", "bi-x-circle-fill text-danger");
        }
      }
    },

    resetQcmGeneric(exNum) {
      const qcm = this['qcmEx' + exNum];
      if (qcm) {
        qcm.forEach(q => { q.selected = null; });
      }
      this['showTraceEx' + exNum] = false;
      if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
        window.showToast(`Exercice ${exNum} réinitialisé !`);
      }
    },

    selectReponseQcmEx3(qIdx, optIdx) { this.selectReponseGeneric(3, qIdx, optIdx); },
    resetQcmEx3() { this.resetQcmGeneric(3); },

    selectReponseQcmEx4(qIdx, optIdx) { this.selectReponseGeneric(4, qIdx, optIdx); },
    resetQcmEx4() { this.resetQcmGeneric(4); },

    selectReponseQcmEx5(qIdx, optIdx) { this.selectReponseGeneric(5, qIdx, optIdx); },
    resetQcmEx5() { this.resetQcmGeneric(5); },

    selectReponseQcmEx6(qIdx, optIdx) { this.selectReponseGeneric(6, qIdx, optIdx); },
    resetQcmEx6() { this.resetQcmGeneric(6); },

    selectReponseQcmEx7(qIdx, optIdx) { this.selectReponseGeneric(7, qIdx, optIdx); },
    resetQcmEx7() { this.resetQcmGeneric(7); },

    selectReponseQcmEx8(qIdx, optIdx) { this.selectReponseGeneric(8, qIdx, optIdx); },
    resetQcmEx8() { this.resetQcmGeneric(8); },

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
        const containers = document.querySelectorAll('.math-expr, .formula-box, .katex-render');
        if (containers && containers.length > 0) {
          containers.forEach(el => {
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
