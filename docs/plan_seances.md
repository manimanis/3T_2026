# 📅 Planification Annuelle – Informatique (3ème Année Secondaire)
## Domaine : Pensée Computationnelle & Programmation

**Sections :** Sciences Expérimentales, Mathématiques et Sciences Techniques  
**Volume horaire global :** 20 séances × 1h30 (90 min) = 30 heures d'enseignement  
**Rythme pédagogique :** **Alternance stricte « 1 sur 2 »** (10 séances d'apprentissage / 10 séances d'évaluation pratique sur machine)  
**Principe de différenciation pédagogique :** **Activités consistantes, progressives et étagées par paliers de difficulté** (les élèves progressent à des rythmes différents selon trois niveaux : Débutant, Intermédiaire, Avancé)  
**Standardisation :** **Au moins 6 activités complètes et substantielles par séance**  
**Environnement & Langages :** Pseudocode normalisé (Conventions 2024-2025), Python 3.10+ (IDLE / Thonny / VS Code), bibliothèque `numpy`  
**Documents officiels de référence :**
- [Aide pédagogique d'Informatique 2024-2025 (Pages 6 et 7)](aide_pedagogique_2024.md)
- [Conventions Algorithmiques 2024-2025](conventions_algorithmiques_2024.md)
- [Implémentation en Python des Conventions Algorithmiques 2024-2025](implementation_python_conventions_2024.md)
- [Séance 1 : Série de Rentrée N° 0](../seance01.html)

---

## 🧭 Gestion de l'Hétérogénéité & Paliers d'Apprentissage

Dans chaque séance, les élèves ne travaillent pas tous les mêmes exercices simultanément. Les activités sont structurées en trois paliers graduels :
- 🟢 **Palier 1 : Débutant (Socle & Guidage)** : Mobilisation directe des concepts fondamentaux, compréhension d'énoncés, traces d'exécution manuelles et algorithmes types avec guidage partiel.
- 🟡 **Palier 2 : Intermédiaire (Maîtrise & Autonomie)** : Résolution autonome de problèmes standards de 3<sup>e</sup> année, établissement des TDO/TDOL, écriture d'algorithmes complets, débogage et implémentation Python sans modèle direct.
- 🔴 **Palier 3 : Avancé (Dépassement & Défi scientifique)** : Problèmes interdisciplinaires complexes (physique, chimie, biologie, arithmétique avancée), optimisation de complexité algorithmique, traitement des cas limites dégénérés et modularité poussée.

---

## 🎯 Vue d'ensemble de la progression pédagogique

```text
Année Scolaire : 20 Séances de 90 min (Alternance 1 Apprentissage / 1 Évaluation Pratique)
Organisation : 6 Activités Consistantes et Différenciées par Séance (🟢 Débutant / 🟡 Intermédiaire / 🔴 Avancé)

CYCLE 1 : Diagnostic & Prérequis
  └── S01 : [ÉVALUATION DIAGNOSTIQUE] Série N°0 — Révision & Diagnostic (10 exercices étagés, /40 pts)

CYCLE 2 : Structures itératives non bornées (Tant Que)
  ├── S02 : [APPRENTISSAGE] La boucle Tant Que (while) & Contrôle de saisie robuste (6 activités)
  └── S03 : [ÉVALUATION PRATIQUE 1] TP Noté sur Machine : Contrôle de saisie & Tant Que (6 activités)

CYCLE 3 : Boucle Répéter & Structure à choix multiples Selon
  ├── S04 : [APPRENTISSAGE] Boucle Répéter ... Jusqu'à & Structure conditionnelle Selon (6 activités)
  └── S05 : [ÉVALUATION PRATIQUE 2] TP Noté sur Machine : Menus interactifs & Boucles combinées (6 activités)

CYCLE 4 : Chaînes de caractères & Fonctions prédéfinies
  ├── S06 : [APPRENTISSAGE] Chaînes de caractères & Fonctions prédéfinies normalisées (6 activités)
  └── S07 : [ÉVALUATION PRATIQUE 3] TP Noté sur Machine : Traitement textuel & Validation (6 activités)

CYCLE 5 : Structure de données statique : Les Tableaux 1D (numpy)
  ├── S08 : [APPRENTISSAGE] Tableaux 1D statiques : Déclaration, Saisie & Traitements cumulatifs (6 activités)
  └── S09 : [ÉVALUATION PRATIQUE 4] TP Noté sur Machine : Tableaux 1D (numpy), Cumuls & Extrema (6 activités)

CYCLE 6 : Traitements sélectifs sur Tableaux 1D
  ├── S10 : [APPRENTISSAGE] Tableaux 1D : Comptages conditionnels & Filtrage sélectif (6 activités)
  └── S11 : [ÉVALUATION PRATIQUE 5] TP Noté sur Machine : Filtrage, Éclatement & Séparation (6 activités)

CYCLE 7 : Modularité algorithmique
  ├── S12 : [APPRENTISSAGE] Modularité : Décomposition descendante, Procédures, Fonctions & Paramètres (6 activités)
  └── S13 : [ÉVALUATION PRATIQUE 6] TP Noté sur Machine : Conception modulaire d'une application (6 activités)

CYCLE 8 : Arithmétique I : Divisibilité, PGCD & PPCM
  ├── S14 : [APPRENTISSAGE] Arithmétique I : Divisibilité, Algorithmes du PGCD & PPCM (6 activités)
  └── S15 : [ÉVALUATION PRATIQUE 7] TP Noté sur Machine : Fonctions arithmétiques modulaires (6 activités)

CYCLE 9 : Arithmétique II : Primalité & Facteurs Premiers
  ├── S16 : [APPRENTISSAGE] Arithmétique II : Nombres Premiers (test optimisé) & Décomposition (6 activités)
  └── S17 : [ÉVALUATION PRATIQUE 8] TP Noté sur Machine : Primalité, Crible & Facteurs premiers (6 activités)

CYCLE 10 : Recherche séquentielle, Tri à bulles & Bilan Annuel
  ├── S18 : [APPRENTISSAGE] Algorithmes de Recherche Séquentielle & Tri à Bulles sur Tableaux 1D (6 activités)
  ├── S19 : [ÉVALUATION PRATIQUE 9] TP Noté sur Machine : Recherche & Tri à Bulles modulaires (6 activités)
  └── S20 : [ÉVALUATION PRATIQUE BILAN] Épreuve Pratique Finale de Synthèse & Bilan Annuel (6 activités)
```

---

# 🔹 CYCLE 1 : DIAGNOSTIC & CONSOLIDATION DES PRÉREQUIS

---

### 📍 Séance 1 : [ÉVALUATION DIAGNOSTIQUE] Série N°0 — Révision, Réactivation & Diagnostic
* **Nature :** Évaluation diagnostique individuelle (90 min) — Barème : /40 pts
* **Support interactif :** [`seance01.html`](../seance01.html)
* **Compétences évaluées :** C1 à C10 (Analyse de problème, traçage de variables, conditions limites, boucle `Pour`, complétion, débogage et traduction Python).
* **Activités de la séance (10 activités étagées sur 3 niveaux) :**
  * 🟢 **Palier Débutant (Phase A — Diagnostic à froid sans machine - 20 min) :**
    * **Activité 1 (Ex 1 - 4 pts) :** Analyse d'une situation physique de cinématique ($v = d / t$). Identifier les données d'entrée, de sortie, la contrainte de positivité stricte du temps ($t > 0$) et spécifier le type algorithmique adapté (`Réel`).
    * **Activité 2 (Ex 2 - 3 pts) :** Tracé séquentiel de l'état des variables $a$, $b$, $c$ après des affectations arithmétiques croisées et justification sur cahier du principe de non-mise à jour automatique de $b$ lors de la modification ultérieure de $a$.
    * **Activité 3 (Ex 3 - 4 pts) :** Décision conditionnelle d'appartenance à l'intervalle $[10 ; 20]$ bornes comprises et sélection argumentée de 4 jeux d'essais critiques (valeur intérieure, valeur extérieure, et les deux bornes 10 et 20).
  * 🟡 **Palier Intermédiaire (Phase B — Réactivation guidée avec rappel express - 40 min) :**
    * **Activité 4 (Ex 4 - 4 pts) :** Compréhension d'une boucle bornée `Pour i de 1 à n Faire s ← s + i` : tracé pas à pas pour $n = 4$ et déduction de la formule mathématique de la somme $\frac{n(n+1)}{2}$.
    * **Activité 5 (Ex 5 - 4 pts) :** Complétion d'un algorithme de calcul de la moyenne de $n$ mesures réelles (décisions $[A]$, $[B]$, $[C]$) et rédaction complète du Tableau de Déclaration des Objets (TDO).
    * **Activité 6 (Ex 6 - 4 pts) :** Débogage d'un algorithme de comptage de valeurs strictement positives : tracé de divergence avec jeu de données $(-2, 0, 5)$, identification des 2 erreurs logiques (initialisation à 1 au lieu de 0, test $\ge 0$ au lieu de $> 0$) et écriture des corrections.
    * **Activité 7 (Ex 7 - 4 pts) :** Modification ciblée d'un algorithme existant pour sommer exclusivement les valeurs multiples de 3 à l'aide de l'opérateur modulo (`x Mod 3 = 0`).
  * 🔴 **Palier Avancé (Phase C — Synthèse autonome & Transfert vers Python - 30 min) :**
    * **Activité 8 (Ex 8 - 3 pts) :** Analyse comparative de deux solutions de recherche du maximum de 3 réels (initialisation avec le premier élément vs comparaison préalable des deux premiers) et formalisation de la stratégie commune.
    * **Activité 9 (Ex 9 - 4 pts) :** Traduction algorithme $\rightarrow$ Python d'une boucle de comptage de valeurs paires avec respect des types (`int(input())`), de l'indentation et de la fonction native `range(1, n + 1)`.
    * **Activité 10 (Ex 10 - 6 pts) :** Problème complet de laboratoire : traitement d'une campagne de $n$ mesures de température, calcul de la moyenne, comptage des mesures hors plage sanitaire $[18 ; 25]^\circ\text{C}$, TDO formel et code Python testé mentalement.
* **Trace écrite élève :** Travail rédigé sur le cahier d'activités selon le rythme de chaque élève.

---

# 🔹 CYCLE 2 : STRUCTURES ITÉRATIVES NON BORNÉES (`Tant Que`)

---

### 📍 Séance 2 : [APPRENTISSAGE] La boucle `Tant Que` (`while`) & Contrôle de saisie
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Choisir la boucle non bornée adéquate ; concevoir un contrôle de saisie robuste ; formaliser des conditions d'arrêt.
* **Conventions & Syntaxe :** `Tant que Condition Faire ... Fin Tant que` $\leftrightarrow$ `while Condition :`. Interdiction absolue de `break`.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Compréhension & Tracé) :**
    * **Activité 1 [Débutant] :** *Obstacle cognitif :* Écrire une boucle `Pour` tentant de forcer l'utilisateur à saisir un mot de passe valide. Constater l'incapacité de prévoir le nombre de tentatives et déduire la nécessité d'une répétition conditionnelle.
    * **Activité 2 [Débutant] :** *Patron de saisie contrôlée :* Écrire l'algorithme normalisé demandant un entier positif $n$ et répétant la saisie avec message d'erreur explicite tant que $n \le 0$. Établir le TDO.
  * 🟡 **Palier Intermédiaire (Application & Débogage) :**
    * **Activité 3 [Intermédiaire] :** *Tracé d'exécution sur cahier :* Construire le tableau de trace de l'algorithme suivant pour la valeur initiale $x = 18$ :
      `Tant que x > 2 Faire x ← x Div 2 ; Écrire(x) Fin Tant que`. Noter les valeurs successives de $x$ et le nombre d'itérations.
    * **Activité 4 [Intermédiaire] :** *Débogage de boucle infinie :* Analyser un script Python fourni où la saisie est demandée avant la boucle `while n <= 0:`, mais oubliée à l'intérieur. Expliquer pourquoi la machine se bloque et corriger le script.
  * 🔴 **Palier Avancé (Modélisation & Défi scientifique) :**
    * **Activité 5 [Avancé] :** *Accumulation avec sentinelle dynamique :* Écrire un algorithme saisissant une série de températures réelles positives arrêtée par la valeur sentinelle $-999$. Calculer et afficher la moyenne sans comptabiliser la sentinelle. Gérer le cas limite où l'utilisateur saisit $-999$ dès la première mesure.
    * **Activité 6 [Avancé] :** *Simulation scientifique de demi-vie radioactive :* Un radioisotope contient $N_0 = 100\,000$ noyaux instables. Chaque année, $5\%$ des noyaux se désintègrent ($N \leftarrow N \times 0.95$). Écrire l'algorithme et le code Python déterminant le nombre d'années nécessaires pour que l'échantillon passe sous la barre des $N_0 / 2$.
* **Trace écrite élève :** Patron universel du contrôle de saisie avec `Tant Que`, tableau de trace de l'activité 3, règle de non-utilisation de `break`.

---

### 📍 Séance 3 : [ÉVALUATION PRATIQUE 1] TP Noté sur Machine : Contrôle de saisie & Boucle `Tant Que`
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'autonomie sur les itérations non bornées et l'écriture de code Python conforme.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Coder sous Python la saisie contrôlée d'une concentration chimique $C \in [0.01 ; 2.50]\text{ mol/L}$. En cas de valeur hors plage, afficher `"Erreur : concentration invalide"` et renouveler la saisie.
    * **Activité 2 [Socle - 4 pts] :** Établir le TDO complet sur votre feuille et justifier le type de chaque variable (`C : Réel`).
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Saisir une série d'absorbances optiques $A \ge 0$. La saisie s'arrête dès que l'utilisateur entre une valeur négative. Afficher le nombre total de mesures valides enregistrées.
    * **Activité 4 [Maîtrise - 4 pts] :** Modifier le programme pour calculer la somme et la moyenne de ces absorbances. Prévoir un message d'avertissement si aucune mesure valide n'a été introduite avant l'arrêt.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Modéliser la vidange d'un récipient cylindrique : volume initial $V_0 = 100\text{ L}$, fuite de débit variable $q(t) = 0.95 \times q(t-1)$ avec $q_0 = 2.0\text{ L/min}$. Déterminer le temps en minutes pour que le volume devienne inférieur à $5\text{ L}$.
    * **Activité 6 [Excellence - 2 pts] :** Valider le script avec une batterie de 3 jeux d'essais critiques imposés (saisie directe d'une valeur d'arrêt, valeurs hors intervalle répétées 5 fois, valeurs nominales).
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 3 : BOUCLE `Répéter` & STRUCTURE À CHOIX MULTIPLES `Selon`

---

### 📍 Séance 4 : [APPRENTISSAGE] Boucle `Répéter ... Jusqu'à` & Structure conditionnelle `Selon`
* **Nature :** Cours dialogué & Travaux pratiques guidées (90 min)
* **Compétences ciblées :** Exploiter la boucle à post-condition ; maîtriser les sélecteurs scalaires avec `Selon` et `match...case`.
* **Conventions :** `Répéter ... Jusqu'à Condition` $\leftrightarrow$ `while not (Condition):` ; `Selon Sélecteur ... Fin Selon` $\leftrightarrow$ `match...case`.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Syntaxe & Découverte) :**
    * **Activité 1 [Débutant] :** *Découverte de la post-condition :* Analyser un cas où l'action précède nécessairement le test (poser une question et vérifier la réponse `rep ∈ ['O', 'N']`). Comparer le nombre d'instructions avec `Tant Que`.
    * **Activité 2 [Débutant] :** *Syntaxe `Selon` :* Écrire la structure algorithmique `Selon Jour` affichant `"Semaine"` pour les valeurs 1 à 5, `"Week-end"` pour 6 et 7, et `"Erreur"` sinon.
  * 🟡 **Palier Intermédiaire (Traduction & Menus) :**
    * **Activité 3 [Intermédiaire] :** *Traduction Python 3.10+ :* Implémenter la structure de l'activité 2 en Python avec `match...case`, en utilisant les motifs combinés `case 1 | 2 | 3 | 4 | 5:` et le cas par défaut `case _:`.
    * **Activité 4 [Intermédiaire] :** *Débogage de sélecteur :* Analyser pourquoi l'écriture `Selon Valeur` provoque une erreur conceptuelle si `Valeur` est un nombre réel ($3.14$), et rappeler la règle du type scalaire obligatoire (`Entier` ou `Caractère`).
  * 🔴 **Palier Avancé (Conception logicielle interactive) :**
    * **Activité 5 [Avancé] :** *Menu interactif avec sous-calculs :* Concevoir un menu de physique : (1) Vitesse $v = d / t$, (2) Énergie cinétique $E_c = \frac{1}{2} m v^2$, (3) Puissance $P = E / \Delta t$, (0) Quitter. Chaque calcul doit contrôler la stricte positivité des grandeurs au dénominateur.
    * **Activité 6 [Avancé] :** *Boucle de maintien interactive :* Intégrer le menu dans une boucle `Répéter ... Jusqu'à Choix = 0` garantissant la réapparition du menu après chaque calcul et rejetant tout choix non listé.
* **Trace écrite élève :** Schéma comparatif `Tant Que` vs `Répéter`, syntaxe algorithmique de `Selon`, équivalent `match...case`.

---

### 📍 Séance 5 : [ÉVALUATION PRATIQUE 2] TP Noté sur Machine : Menus interactifs & Boucles combinées
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'aptitude à combiner menus à choix multiples, boucles de répétition et contrôles de saisie.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Coder la procédure d'affichage d'un menu de mécanique des fluides proposant : 1: Pression ($P = F / S$), 2: Débit volumique ($D = V / t$), 0: Quitter.
    * **Activité 2 [Socle - 4 pts] :** Réaliser la saisie sécurisée du choix utilisateur afin de forcer un entier dans $\{0, 1, 2\}$.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Implémenter l'option 1 : saisie de la force $F > 0$ et de la surface $S > 0$, calcul et affichage de la pression en Pascals.
    * **Activité 4 [Maîtrise - 4 pts] :** Implémenter l'option 2 : saisie du volume $V > 0$ et de la durée $t > 0$, calcul et affichage du débit en $\text{m}^3/\text{s}$.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Envelopper l'ensemble du programme dans une boucle assurant la continuité de l'exécution jusqu'au choix explicite de l'option 0.
    * **Activité 6 [Excellence - 2 pts] :** Ajouter un compteur statistique comptabilisant le nombre total de calculs réalisés au cours de la session avant de quitter.
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 4 : CHAÎNES DE CARACTÈRES & FONCTIONS PRÉDÉFINIES

---

### 📍 Séance 6 : [APPRENTISSAGE] Chaînes de caractères & Fonctions prédéfinies normalisées
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Manipuler les chaînes avec indexation base 0 ; exploiter exclusivement les fonctions prédéfinies autorisées.
* **Conventions officielles :** `Long`, `Pos`, `Sous_chaine`, `Effacer`, `Convch`, `Valeur`, `Estnum`, `Majus`, `Ord`, `Chr`.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Indexation & Fonctions de base) :**
    * **Activité 1 [Débutant] :** *Indexation base 0 :* Soit la chaîne `Ch = "SCIENCE"`. Donner la valeur de `Long(Ch)`, `Ch[0]`, `Ch[Long(Ch)-1]` et la sous-chaîne `Sous_chaine(Ch, 2, 5)`.
    * **Activité 2 [Débutant] :** *Fonctions scalaires `Ord`/`Chr` :* Déterminer le code ASCII de `'A'`, `'a'`, `'0'`. Écrire l'instruction testant si un caractère $c$ est une lettre majuscule (`Ord(c) ∈ [65, 90]`).
  * 🟡 **Palier Intermédiaire (Validation & Transformation) :**
    * **Activité 3 [Intermédiaire] :** *Comptage de voyelles :* Écrire un algorithme comptant le nombre de voyelles dans une chaîne saisie en utilisant `Majus(Ch)` et une boucle `Pour`.
    * **Activité 4 [Intermédiaire] :** *Algorithme de Palindrome :* Concevoir l'algorithme vérifiant si un mot est un palindrome en comparant les caractères symétriques ($Ch[i]$ et $Ch[\text{Long}(Ch)-1-i]$).
  * 🔴 **Palier Avancé (Cryptage & Analyse de motifs) :**
    * **Activité 5 [Avancé] :** *Chiffrement de César modulaire :* Écrire un script décalant chaque lettre alphabétique majuscule de $k$ positions ($1 \le k \le 25$) avec rebouclage circulaire de `'Z'` vers `'A'` via la formule : `Chr(65 + (Ord(c) - 65 + k) Mod 26)`.
    * **Activité 6 [Avancé] :** *Comptage et extraction de motifs ADN :* Dans une séquence génétique (ex: `"ATCGATCGTTGA"`), dénombrer les occurrences du dinucléotide `"CG"` en utilisant la fonction `Sous_chaine` ou `Pos`.
* **Trace écrite élève :** Tableau officiel des fonctions prédéfinies sur les chaînes, code du test de palindrome sur cahier.

---

### 📍 Séance 7 : [ÉVALUATION PRATIQUE 3] TP Noté sur Machine : Traitement textuel & Validation de formats
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'usage strict des fonctions autorisées sur les chaînes et la rigueur de validation de formats scientifiques.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Saisir un code de réactif chimique et vérifier qu'il comporte exactement 7 caractères à l'aide de `Long()`.
    * **Activité 2 [Socle - 4 pts] :** Vérifier que les 2 premiers caractères sont des lettres majuscules (ex: `"AC"` pour acide) en utilisant `Majus()` et `Ord()`.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Vérifier que le 3<sup>e</sup> caractère est le symbole séparateur tiret `"-"`.
    * **Activité 4 [Maîtrise - 4 pts] :** Extraire les 4 derniers caractères avec `Sous_chaine` et s'assurer avec `Estnum` qu'ils forment un entier décimal valide.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Convertir les 4 chiffres en entier avec `Valeur()`, calculer la clé de contrôle $C = \text{valeur} \text{ Mod } 19$, et vérifier sa correspondance avec une lettre clé.
    * **Activité 6 [Excellence - 2 pts] :** Tester le script avec 4 cas réels (code valide, longueur incorrecte, lettres minuscules, caractères alphanumériques interdits).
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 5 : STRUCTURE DE DONNÉES STATIQUE : LES TABLEAUX 1D (`numpy`)

---

### 📍 Séance 8 : [APPRENTISSAGE] Tableaux 1D statiques : Déclaration, Saisie & Traitements cumulatifs
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Déclarer et allouer un tableau homogène statique avec `numpy` ; effectuer parcours et calculs statistiques.
* **Conventions :** `T : Tableau de N Réel` $\leftrightarrow$ `from numpy import array ; T = array([0.0] * N)`. Interdiction de `print(T)` brut.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Allocation & Saisie élémentaire) :**
    * **Activité 1 [Débutant] :** *Déclaration & TDO :* Déclarer en algorithmique et en Python un tableau `Notes` de 25 réels et un tableau `Effectifs` de 10 entiers.
    * **Activité 2 [Débutant] :** *Saisie & Affichage normalisés :* Écrire la boucle de saisie de $N$ éléments ($N \in [3 ; 20]$) puis la boucle d'affichage séquentiel case par case : `Pour i de 0 à N-1 Faire Écrire(T[i]) Fin Pour`.
  * 🟡 **Palier Intermédiaire (Cumuls & Statistiques) :**
    * **Activité 3 [Intermédiaire] :** *Somme & Moyenne :* Concevoir l'algorithme calculant la somme cumulée et la moyenne arithmétique des éléments d'un tableau réel.
    * **Activité 4 [Intermédiaire] :** *Recherche du Maximum avec position :* Élaborer l'algorithme qui détermine la valeur maximale d'un tableau et l'indice de sa première occurrence en mémoire.
  * 🔴 **Palier Avancé (Analyse statistique & Écarts) :**
    * **Activité 5 [Avancé] :** *Calcul d'écart-type élémentaire :* À partir de la moyenne calculée $\bar{x}$, concevoir l'algorithme calculant la variance $V = \frac{1}{N} \sum (T[i] - \bar{x})^2$ et l'écart-type avec `sqrt()`.
    * **Activité 6 [Avancé] :** *Recherche des extrema multiples :* Modifier l'algorithme de recherche du maximum pour afficher **toutes les positions** (indices) où le maximum est atteint lorsque plusieurs cases possèdent la même valeur maximale.
* **Trace écrite élève :** Syntaxe de déclaration `numpy`, algorithme patron de calcul de moyenne, algorithme de recherche de maximum avec indice.

---

### 📍 Séance 9 : [ÉVALUATION PRATIQUE 4] TP Noté sur Machine : Tableaux 1D (`numpy`), Cumuls & Extrema
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Valider la maîtrise de `numpy`, le contrôle de la taille statique, le parcours séquentiel et les calculs d'extrema.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Saisir la taille $N \in [5 ; 30]$ avec contrôle de validité et allouer le tableau `numpy` `Mesures`.
    * **Activité 2 [Socle - 4 pts] :** Remplir le tableau avec des valeurs de tension électrique réelles comprises entre $0.0\text{ V}$ et $15.0\text{ V}$.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Afficher l'ensemble des mesures élément par élément sous la forme `"Relevé [i] = ... V"`.
    * **Activité 4 [Maîtrise - 4 pts] :** Calculer et afficher la tension moyenne de la série de mesures.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Identifier la tension minimale, la tension maximale et afficher les indices des deux relevés.
    * **Activité 6 [Excellence - 2 pts] :** Dénombrer combien de tensions s'écartent de plus de $20\%$ de la moyenne calculée.
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 6 : TRAITEMENTS SÉLECTIFS SUR TABLEAUX 1D

---

### 📍 Séance 10 : [APPRENTISSAGE] Tableaux 1D : Comptages conditionnels & Filtrage sélectif
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Gérer deux indices asynchrones ; filtrer des éléments d'un tableau vers un autre ; séparer des données.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Comptage sélectif) :**
    * **Activité 1 [Débutant] :** *Comptage selon critère :* Écrire l'algorithme dénombrant les éléments strictement négatifs dans un tableau `T` de $N$ réels.
    * **Activité 2 [Débutant] :** *Double indice sur trace papier :* Soit `T1 = [12, -5, 8, -2, 15]`. Suivre manuellement pas à pas le remplissage du tableau `T2` recevant uniquement les valeurs positives en notant l'évolution des compteurs `i` et `j`.
  * 🟡 **Palier Intermédiaire (Filtrage complet) :**
    * **Activité 3 [Intermédiaire] :** *Algorithme de filtrage :* Formaliser l'algorithme transférant les valeurs de $T1$ appartenant à $[10 ; 20]$ vers $T2$ et enregistrer la taille utile `tailleT2 = j`.
    * **Activité 4 [Intermédiaire] :** *Implémentation Python :* Coder la solution sous Python en initialisant `T2 = array([0.0] * N)` et afficher strictement les `tailleT2` premiers éléments.
  * 🔴 **Palier Avancé (Éclatement & Réorganisation) :**
    * **Activité 5 [Avancé] :** *Éclatement en deux sous-tableaux :* Concevoir l'algorithme séparant un tableau d'entiers $T$ en deux tableaux distincts : `TPairs` et `TImpairs` avec gestion de deux compteurs d'insertion `nbP` et `nbI`.
    * **Activité 6 [Avancé] :** *Tassement d'un tableau sans zéros :* Soit un tableau contenant des zéros. Construire un algorithme supprimant tous les zéros en décalant les valeurs non nulles vers la gauche sans utiliser de tableau intermédiaire.
* **Trace écrite élève :** Patron algorithmique du filtrage avec double indice, trace d'exécution sur cahier.

---

### 📍 Séance 11 : [ÉVALUATION PRATIQUE 5] TP Noté sur Machine : Filtrage, Éclatement & Séparation
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'aptitude à manipuler plusieurs tableaux statiques et à maîtriser les transferts conditionnels.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Saisir la taille $N \in [6 ; 25]$ et déclarer les 3 tableaux `numpy` : `Lots`, `Acceptes` et `Rejetes`.
    * **Activité 2 [Socle - 4 pts] :** Remplir le tableau `Lots` avec des masses réelles de produits ($100.0 \le m \le 200.0$).
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Filtrer dans `Acceptes` les produits conformes à la tolérance $[145.0 ; 155.0]$ g en gérant l'indice $j_1$.
    * **Activité 4 [Maîtrise - 4 pts] :** Transférer simultanément les produits non conformes dans `Rejetes` en gérant l'indice $j_2$.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Calculer et afficher le pourcentage d'acceptation et la masse moyenne des produits acceptés.
    * **Activité 6 [Excellence - 2 pts] :** Afficher proprement les deux tableaux finaux avec leurs effectifs réels respectifs ($j_1$ et $j_2$).
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 7 : MODULARITÉ ALGORITHMIQUE

---

### 📍 Séance 12 : [APPRENTISSAGE] Modularité : Décomposition, Procédures, Fonctions & Paramètres
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Décomposer un problème en modules ; distinguer fonctions et procédures ; gérer paramètres et TDOL.
* **Conventions :** Procédures vs Fonctions (`return` unique simple) ; passage par référence avec **`@`** ; TDOL local.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Notions de base) :**
    * **Activité 1 [Débutant] :** *Arbre de décomposition :* Décomposer le calcul des racines d'une équation du second degré $a x^2 + b x + c = 0$ en trois modules : Saisie, Calcul du discriminant $\Delta$, et Affichage des solutions.
    * **Activité 2 [Débutant] :** *Procédure d'affichage :* Déclarer en algo et Python une procédure `Banniere(titre : Chaîne)` encadrant un titre par des tirets.
  * 🟡 **Palier Intermédiaire (Fonctions & Portée) :**
    * **Activité 3 [Intermédiaire] :** *Fonction pure :* Écrire la fonction `Volume_Cylindre(rayon, hauteur : Réel) : Réel` retournant le volume sans affichage interne.
    * **Activité 4 [Intermédiaire] :** *Portée des variables & TDOL :* Établir le Tableau de Déclaration des Objets Locaux (TDOL) d'une fonction et vérifier que les variables déclarées à l'intérieur ne sont pas accessibles dans le programme principal.
  * 🔴 **Palier Avancé (Passage par référence & Tableaux) :**
    * **Activité 5 [Avancé] :** *Procédure de permutation :* Écrire la procédure `Permuter(@x : Réel, @y : Réel)` avec passage par référence et observer son comportement.
    * **Activité 6 [Avancé] :** *Application modulaire sur tableau `numpy` :* Construire un script complet articulé en 3 modules : `Saisie_Taille()`, `Remplir_Tableau(@T, N)` et `Moyenne(T, N)`.
* **Trace écrite élève :** Tableau comparatif Fonction vs Procédure, règle du passage par référence `@`, structure du TDOL.

---

### 📍 Séance 13 : [ÉVALUATION PRATIQUE 6] TP Noté sur Machine : Conception modulaire d'une application
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'architecture modulaire rigoureuse d'une solution informatique complète.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Écrire la fonction `Saisie_Taille(bornInf, bornSup : Entier) : Entier` avec boucle `Tant Que`.
    * **Activité 2 [Socle - 4 pts] :** Écrire la procédure `Afficher_Tableau(T : Tableau de N Réel, N : Entier)` affichant les cases une par une.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Écrire la procédure `Remplir_Tableau(@T : Tableau de N Réel, N : Entier)` avec saisie contrôlée de chaque case.
    * **Activité 4 [Maîtrise - 4 pts] :** Écrire la fonction `Calculer_Moyenne(T : Tableau de N Réel, N : Entier) : Réel` sans aucun `print()`.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Écrire la fonction `Compter_Superieurs(T, N, seuil : Réel) : Entier` retournant l'effectif des éléments $> seuil$.
    * **Activité 6 [Excellence - 2 pts] :** Rédiger le programme principal assurant l'enchaînement sans faille des 5 modules et tester avec succès sur machine.
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 8 : ARITHMÉTIQUE I — DIVISIBILITÉ, PGCD & PPCM

---

### 📍 Séance 14 : [APPRENTISSAGE] Arithmétique I : Divisibilité, Algorithmes du PGCD & PPCM
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Implémenter les propriétés de divisibilité (`//`, `%`) ; modéliser les algorithmes du PGCD et du PPCM.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Divisibilité & Soustractions) :**
    * **Activité 1 [Débutant] :** *Critères avec `Mod` :* Écrire une fonction `Est_Divisible(a, b : Entier) : Booléen` retournant `Vrai` si $b$ divise $a$.
    * **Activité 2 [Débutant] :** *PGCD par soustractions :* Simuler manuellement le calcul de $PGCD(84, 36)$ par soustractions successives sur cahier.
  * 🟡 **Palier Intermédiaire (Algorithme d'Euclide) :**
    * **Activité 3 [Intermédiaire] :** *Euclide avec `Tant Que` :* Implémenter la fonction `PGCD_Euclide(a, b : Entier) : Entier` basée sur le reste de la division entière.
    * **Activité 4 [Intermédiaire] :** *Calcul du PPCM :* Concevoir la fonction `PPCM(a, b : Entier) : Entier` utilisant le résultat de la fonction PGCD : $(a \times b) \text{ Div } PGCD(a, b)$.
  * 🔴 **Palier Avancé (Applications arithmétiques) :**
    * **Activité 5 [Avancé] :** *Fractions irréductibles :* Écrire une procédure `Simplifier_Fraction(num, den : Entier)` qui divise numérateur et dénominateur par leur PGCD et affiche la fraction simplifiée.
    * **Activité 6 [Avancé] :** *PGCD de trois nombres :* Concevoir un module calculant le PGCD de trois entiers $a$, $b$, $c$ en exploitant la propriété d'associativité : $PGCD(a, b, c) = PGCD(PGCD(a, b), c)$.
* **Trace écrite élève :** Algorithme officiel d'Euclide, relation mathématique PGCD-PPCM, code modulaire Python.

---

### 📍 Séance 15 : [ÉVALUATION PRATIQUE 7] TP Noté sur Machine : Fonctions arithmétiques modulaires (PGCD & PPCM)
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'implémentation autonome et la modularité des algorithmes arithmétiques.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Coder une fonction de saisie filtrée d'un entier strictement positif $n > 0$.
    * **Activité 2 [Socle - 4 pts] :** Implémenter la fonction `PGCD(a, b)` selon l'algorithme des divisions successives d'Euclide.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Implémenter la fonction `PPCM(a, b)` en exploitant la fonction `PGCD`.
    * **Activité 4 [Maîtrise - 4 pts] :** Écrire la procédure affichant la somme de deux fractions $\frac{a}{b} + \frac{c}{d}$ sous forme d'une fraction irréductible en utilisant le PPCM pour le dénominateur commun.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Résoudre le problème physique de synchronisation de deux satellites ayant des périodes orbitales de $T_1 = 48\text{ min}$ et $T_2 = 64\text{ min}$. Déterminer le temps de leur prochain alignement.
    * **Activité 6 [Excellence - 2 pts] :** Tester avec des cas critiques : $a=b$, $a$ et $b$ premiers entre eux, $a$ multiple de $b$.
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 9 : ARITHMÉTIQUE II — PRIMALITÉ & FACTEURS PREMIERS

---

### 📍 Séance 16 : [APPRENTISSAGE] Arithmétique II : Nombres Premiers (test optimisé) & Décomposition
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Développer un prédicat booléen optimisé ($\le \sqrt{n}$) ; concevoir des boucles imbriquées de factorisation.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Primalité élémentaire) :**
    * **Activité 1 [Débutant] :** *Approche naïve :* Écrire un algorithme comptant les diviseurs de $n$ de $1$ à $n$ et en déduire si $n$ est premier.
    * **Activité 2 [Débutant] :** *Trace de factorisation :* Effectuer manuellement sur cahier la décomposition de $60$ en facteurs premiers successifs ($2, 2, 3, 5$).
  * 🟡 **Palier Intermédiaire (Optimisation $\sqrt{n}$ & Crible) :**
    * **Activité 3 [Intermédiaire] :** *Fonction optimisée :* Écrire la fonction `Est_Premier(n) : Booléen` limitant les tests de diviseurs à $\lfloor\sqrt{n}\rfloor$ avec arrêt dès le premier diviseur trouvé (`math.sqrt`).
    * **Activité 4 [Intermédiaire] :** *Génération dans un tableau :* Remplir un tableau `numpy` avec les nombres premiers compris entre 2 et 100 à l'aide de la fonction `Est_Premier`.
  * 🔴 **Palier Avancé (Décomposition complète formatée) :**
    * **Activité 5 [Avancé] :** *Comptage des exposants :* Concevoir l'algorithme de factorisation d'un entier $n \ge 2$ utilisant une boucle `Tant Que` externe (recherche du diviseur $d$) et une boucle `Tant Que` interne (comptage de la puissance de $d$).
    * **Activité 6 [Avancé] :** *Formatage mathématique :* Afficher la décomposition finale sous forme canonique : `"360 = 2^3 * 3^2 * 5^1"`.
* **Trace écrite élève :** Justification mathématique de la borne $\sqrt{n}$, code de `Est_Premier`, patron de décomposition.

---

### 📍 Séance 17 : [ÉVALUATION PRATIQUE 8] TP Noté sur Machine : Primalité, Crible & Facteurs premiers
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'autonomie sur les algorithmes arithmétiques d'optimisation et la factorisation.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Coder la fonction `Est_Premier(n) : Booléen` avec la borne $\sqrt{n}$.
    * **Activité 2 [Socle - 4 pts] :** Tester la fonction pour des valeurs imposées ($1, 2, 17, 91, 97$) et valider les réponses booléennes.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Écrire la procédure `Remplir_Premiers(@T, N)` qui remplit un tableau `numpy` des $N$ premiers entiers premiers ($N \in [5 ; 20]$).
    * **Activité 4 [Maîtrise - 4 pts] :** Afficher les nombres premiers générés et calculer leur somme cumulée.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Implémenter la procédure `Decomposer(n)` affichant chaque facteur premier et son exposant.
    * **Activité 6 [Excellence - 2 pts] :** Tester sur machine avec $N = 10$ et décomposer les entiers $n = 360$, $n = 1024$ et $n = 1729$ (nombre de Ramanujan).
* **Barème global :** /20 pts.

---

# 🔹 CYCLE 10 : RECHERCHE SÉQUENTIELLE, TRI À BULLES & BILAN ANNUEL

---

### 📍 Séance 18 : [APPRENTISSAGE] Algorithmes de Recherche Séquentielle & Tri à Bulles sur Tableaux 1D
* **Nature :** Cours dialogué & Travaux pratiques guidés (90 min)
* **Compétences ciblées :** Implémenter la recherche séquentielle avec condition d'arrêt immédiat ; maîtriser le principe des permutations du tri à bulles.
* **Conventions :** Drapeau booléen pour la recherche ; permutation via `aux` et optimisation avec `echange` pour le tri.
* **Activités différenciées (6 activités progressives) :**
  * 🟢 **Palier Débutant (Mécanisme de base & Tracé) :**
    * **Activité 1 [Débutant] :** *Arrêt immédiat :* Comparer un parcours inconditionnel complet par boucle `Pour` et une boucle `Tant Que` s'arrêtant dès la détection de la clé avec un booléen `trouve`.
    * **Activité 2 [Débutant] :** *Mécanique de la permutation :* Analyser pourquoi l'affectation directe `T[i] ← T[i+1] ; T[i+1] ← T[i]` détruit la première valeur et écrire l'échange exact via la variable temporaire `aux`.
  * 🟡 **Palier Intermédiaire (Algorithmes officiels) :**
    * **Activité 3 [Intermédiaire] :** *Fonction de recherche de position :* Écrire la fonction `Recherche_Position(T, N, cible) : Entier` retournant l'indice de la première occurrence ou $-1$ si absente.
    * **Activité 4 [Intermédiaire] :** *Tracé papier du Tri à bulles :* Simuler sur cahier les passes successives d'un tri à bulles sur le tableau `[14, 3, 27, 8, 12]`.
  * 🔴 **Palier Avancé (Optimisation & Tri décroissant) :**
    * **Activité 5 [Avancé] :** *Tri à bulles optimisé :* Implémenter la procédure officielle avec boucle `Répéter ... Jusqu'à echange = Faux` pour interrompre le tri si aucune permutation n'a eu lieu pendant la passe.
    * **Activité 6 [Avancé] :** *Tri décroissant :* Adapter l'algorithme pour classer les éléments dans l'ordre décroissant et tester sur un tableau contenant des doublons.
* **Trace écrite élève :** Algorithme officiel de recherche séquentielle, procédure officielle du tri à bulles optimisé sur cahier.

---

### 📍 Séance 19 : [ÉVALUATION PRATIQUE 9] TP Noté sur Machine : Recherche & Tri à Bulles modulaires
* **Nature :** Travaux Pratiques évalués individuellement sur poste informatique (90 min)
* **Objectifs :** Évaluer l'intégration de la recherche et du tri au sein d'une application modulaire sur tableau 1D.
* **Parcours d'évaluation progressif (6 activités notées par paliers) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Saisir la taille $N \in [5 ; 30]$ et charger un tableau `numpy` de notes scientifiques réelles.
    * **Activité 2 [Socle - 4 pts] :** Écrire la fonction booléenne `Existe_Note(T, N, valeur) : Booléen` avec arrêt immédiat dès détection.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Écrire la fonction `Position_Note(T, N, valeur) : Entier` retournant l'indice ou $-1$.
    * **Activité 4 [Maîtrise - 4 pts] :** Implémenter la procédure officielle `Tri_Bulles_Croissant(@T, N)` avec indicateur d'échange.
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 2 pts] :** Modifier la procédure pour trier par ordre décroissant et afficher le tableau trié avec mention du rang d'excellence ($1^{\text{er}}, 2^{\text{e}}, \dots$).
    * **Activité 6 [Excellence - 2 pts] :** Ajouter un module dénombrant le nombre d'occurrences (ex aequo) d'une note cible saisie par l'utilisateur.
* **Barème global :** /20 pts.

---

### 📍 Séance 20 : [ÉVALUATION PRATIQUE BILAN] Épreuve Pratique Finale de Synthèse & Bilan Annuel
* **Nature :** Épreuve pratique individuelle sur machine (60 min) + Bilan annuel des compétences (30 min)
* **Format :** 90 min (1h 30mn) en conditions réelles d'examen
* **Compétences évaluées :** Synthèse complète des acquis de 3<sup>e</sup> année scientifique (boucles conditionnelles, tableaux statiques `numpy`, modularité descendante, arithmétique, recherche et tri).
* **Parcours d'évaluation de l'épreuve finale (6 activités) :**
  * 🟢 **Palier Débutant / Socle (8 pts) :**
    * **Activité 1 [Socle - 4 pts] :** Analyser le sujet de synthèse, poser le schéma modulaire et rédiger les TDO et TDOL des modules.
    * **Activité 2 [Socle - 4 pts] :** Écrire la fonction de saisie filtrée d'un tableau `numpy` de grandeurs physiques avec contrôle robuste par `Tant Que`.
  * 🟡 **Palier Intermédiaire / Maîtrise (8 pts) :**
    * **Activité 3 [Maîtrise - 4 pts] :** Écrire le module de traitement arithmétique ou textuel (primalité, PGCD ou validation de code).
    * **Activité 4 [Maîtrise - 4 pts] :** Coder le module algorithmique de manipulation du tableau (recherche séquentielle de position ou tri à bulles optimisé).
  * 🔴 **Palier Avancé / Dépassement (4 pts) :**
    * **Activité 5 [Excellence - 4 pts] :** Assembler l'ensemble des modules dans le programme principal, exécuter le script sans erreur d'exécution et valider la recette logicielle avec les 3 jeux d'essais officiels du sujet.
  * 🎓 **Clôture & Bilan Annuel (30 min) :**
    * **Activité 6 [Bilan & Perspectives] :** Auto-évaluation des compétences du profil de sortie de 3<sup>e</sup> scientifique et présentation des perspectives pour la 4<sup>e</sup> année (Baccalauréat) : enregistrements, fichiers de données, récursivité et algorithmes avancés.
* **Barème de l'épreuve pratique :** /20 pts.

---

## 📊 Matrice d'Alignement Pédagogique (Savoirs Associés vs Séances)

| Savoir associé officiel (Aide pédagogique 2024-2025) | Séances d'apprentissage (≥ 6 activités) | Séances d'évaluation pratique (≥ 6 activités) |
| :--- | :---: | :---: |
| **Diagnostic & Réactivation des acquis de 2<sup>e</sup> année** | — | **S01** (Série N°0 - 10 activités, /40) |
| **Boucle itérative non bornée `Tant Que` & Contrôle de saisie** | **S02** (6 activités : 🟢2, 🟡2, 🔴2) | **S03** (TP Noté 1 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Boucle `Répéter ... Jusqu'à` & Structure conditionnelle `Selon`** | **S04** (6 activités : 🟢2, 🟡2, 🔴2) | **S05** (TP Noté 2 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Chaînes de caractères & Fonctions prédéfinies officielles** | **S06** (6 activités : 🟢2, 🟡2, 🔴2) | **S07** (TP Noté 3 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Tableaux 1D statiques (`numpy`), Saisie & Cumuls statistiques** | **S08** (6 activités : 🟢2, 🟡2, 🔴2) | **S09** (TP Noté 4 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Tableaux 1D : Comptages sélectifs, Filtrage & Éclatement** | **S10** (6 activités : 🟢2, 🟡2, 🔴2) | **S11** (TP Noté 5 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Modularité : Décomposition, Procédures, Fonctions & `@`** | **S12** (6 activités : 🟢2, 🟡2, 🔴2) | **S13** (TP Noté 6 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Calculs arithmétiques : Divisibilité, PGCD (Euclide) & PPCM** | **S14** (6 activités : 🟢2, 🟡2, 🔴2) | **S15** (TP Noté 7 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Calculs arithmétiques : Nombres Premiers ($\le\sqrt{n}$) & Facteurs** | **S16** (6 activités : 🟢2, 🟡2, 🔴2) | **S17** (TP Noté 8 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Algorithmes de Recherche séquentielle & Tri à bulles** | **S18** (6 activités : 🟢2, 🟡2, 🔴2) | **S19** (TP Noté 9 - 6 activités : 🟢2, 🟡2, 🔴2) |
| **Épreuve pratique finale de synthèse annuelle & Bilan** | — | **S20** (Épreuve bilan - 6 activités : 🟢2, 🟡2, 🔴2) |
