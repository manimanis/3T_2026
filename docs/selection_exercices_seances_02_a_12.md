# 📚 Sélection Pédagogique & Contextualisation d'Exercices (Séances 2 à 12)
### Recueil d'origine : *Python au Lycée — Tome 2 (Ahmed BELHASSEN)*
**Discipline :** Informatique (Pensée Computationnelle & Programmation)  
**Public cible :** 3<sup>ème</sup> Année Secondaire (Sciences Expérimentales, Sciences Techniques, Mathématiques)  
**Conformité :** Programme officiel et Conventions Algorithmiques 2024-2025 / 2026  

---

## 🧭 Tableau Synoptique de Répartition (Séances 2 à 12)

| Séance | Module & Thématique | Exercices Retenus du Recueil | Contexte d'Application Concret | Type de Séance |
| :--- | :--- | :--- | :--- | :--- |
| **Séance 2** | Boucle `Tant Que` & Saisie robuste | **Ex 1** (QCM), **Ex 27**, **Ex 10**, **Ex 24** | Station météo, budget atelier, allocation mémoire IoT | Apprentissage |
| **Séance 3** | [TP 1] Contrôle de saisie sur Machine | **Ex 5**, **Ex 20**, **Ex 114** | Télémétrie, bio-industrie (bactéries), calibrage capteur | Évaluation TP (/20) |
| **Séance 4** | Boucle `Répéter` & Structure `Selon` | **Ex 17**, **Ex 9** (S3), **Ex 118**, **Ex 111** | Réseau IoT, somme de contrôle, tri colis, processus concurrents | Apprentissage |
| **Séance 5** | [TP 2] Menus interactifs & Boucles | **Ex 119**, **Ex 115**, **Ex 125** | Banc maintenance électrique, arbitrage nœuds réseau, réacteur | Évaluation TP (/20) |
| **Séance 6** | Chaînes & Fonctions normalisées | **Ex 2**, **Ex 49/60**, **Ex 61**, **Ex 65** | Bio-informatique, commande vocale, restriction ADN, César | Apprentissage |
| **Séance 7** | [TP 3] Traitement textuel & Formats | **Ex 71**, **Ex 69**, **Ex 75** | Modem UART (parité), horodatage agroalimentaire, billet banque | Évaluation TP (/20) |
| **Séance 8** | Tableaux 1D statiques & Cumuls | **Ex 77**, **Ex 78**, **Ex 79**, **Ex 11** | Serre connectée, équilibrage triphasé, audit énergétique | Apprentissage |
| **Séance 9** | [TP 4] Tableaux `numpy` & Extrema | **Ex 77** (étendu), **Ex 81**, **Ex 82** | Barrage hydraulique, banc photovoltaïque, spectrométrie | Évaluation TP (/20) |
| **Séance 10** | Tableaux 1D : Filtrage sélectif | **Ex 86**, **Ex 85**, **Ex 96**, **Ex 97** | Échangeur thermique, télémétrie drone, RFID logistique | Apprentissage |
| **Séance 11** | [TP 5] Filtrage, Éclatement & Tri | **Ex 86** (qualité), **Ex 90/92**, **Ex 80/85** | Ligne pistons aéro, paquets satellite, brassage cryptographique | Évaluation TP (/20) |
| **Séance 12** | Modularité : Fonctions & Procédures | **Ex 126**, **Ex 36**, **Ex 68**, **Ex 127/134** | Console médicale, clés nombres parfaits, mutations ADN, tables | Apprentissage |

---

# 📍 SÉANCE 2 : La boucle `Tant Que` & Contrôle de saisie
* **Cycle 2 · Module 2 :** Structures itératives non bornées
* **Nature :** Apprentissage & Travaux dirigés guidés (90 min)
* **Compétences clés :** Maîtriser la pré-condition, le patron universel de saisie contrôlée, le traitement avec sentinelle et la prévention des boucles infinies.

---

### 1. Exercice 1 (QCM Items 13, 14, 18, 21) — Diagnostic logique & Arrêt de boucle
* **Source recueil :** Exercice 1 (Questions 13, 14, 18, 21).
* **Mise en situation contextualisée :**  
  Dans une unité de conservation pharmaceutique, un automate surveille la température $T$ (en °C) et la pression $P$ (en hPa) d'une enceinte stérile. Le système maintient l'alarme active tant que la condition suivante est vérifiée :
  $$\text{alarme} = \text{Vrai} \iff (T < -18) \lor (P > 1013)$$
  Les techniciens doivent analyser la condition d'arrêt du protocole d'urgence et détecter les risques de divergence (boucle infinie d'asservissement).
* **Travail demandé :**
  1. Déterminer par la loi de De Morgan la condition exacte provoquant l'extinction de l'alarme.
  2. Analyser l'évolution de la variable de contrôle dans un compteur d'injection incrémenté de 2 en 2 pour éviter qu'il ne dépasse sa cible sans jamais l'égaler.
* **Exemple illustratif :**
  * Si $T = -20^\circ\text{C}$ et $P = 1010\text{ hPa}$ : $(T < -18)$ est Vrai $\rightarrow$ L'alarme continue.
  * Si $T = -15^\circ\text{C}$ et $P = 1005\text{ hPa}$ : $T \ge -18$ et $P \le 1013$ $\rightarrow$ La boucle se termine.

---

### 2. Exercice 27 : Somme et moyenne avec sentinelle
* **Source recueil :** Exercice 27 (*Compte sentinelle : suite se terminant par -1*).
* **Mise en situation contextualisée :**  
  Une station agrométéorologique autonome mesure les précipitations journalières (en mm). L'opérateur saisit les relevés quotidiens positifs ou nuls. Pour clôturer la série d'observations d'un épisode orageux sans fixer à l'avance la durée de l'épisode, il introduit le code sentinelle **`-1`**.
* **Travail demandé :**
  Écrire l'algorithme et le programme Python permettant de saisir les précipitations, d'ignorer la sentinelle dans les cumuls, puis d'afficher le nombre de jours pluvieux enregistrés et le cumul total en mm. Si `-1` est saisi dès le départ, signaler qu'aucun relevé n'a été effectué.
* **Exemples illustratifs & Jeux d'essais :**
  * **Cas nominal :**  
    Entrées : `12.5` $\rightarrow$ `0.0` $\rightarrow$ `4.2` $\rightarrow$ `18.3` $\rightarrow$ `-1`  
    Sortie : `4 relevés enregistrés. Précipitations cumulées : 35.0 mm.`
  * **Cas limite :**  
    Entrées : `-1`  
    Sortie : `Aucune donnée météorologique enregistrée.`

---

### 3. Exercice 10 : Évolution d'un coût avec taux d'accroissement
* **Source recueil :** Exercice 10 (*Évolution de loyer*).
* **Mise en situation contextualisée :**  
  Un jeune entrepreneur loue un atelier de robotique pour $650\text{ DT}$ par mois au 1er janvier. Le contrat prévoit une indexation annuelle de $1.8\%$ par an. Le gérant décide qu'il devra déménager dès que la mensualité franchira le seuil critique de $800\text{ DT}$.
* **Travail demandé :**
  Écrire l'algorithme utilisant la structure `Tant Que` pour calculer le nombre d'années passées dans le local, le loyer de la dernière année et le montant global versé au bailleur durant toute la période.
* **Exemples illustratifs & Tracé pas à pas :**
  * Année 0 : Loyer = $650.00\text{ DT}$
  * Année 1 : Loyer = $650 \times 1.018 = 661.70\text{ DT}$
  * ...
  * Année 12 : Loyer = $804.83\text{ DT}$ (Seuil $> 800\text{ DT}$ atteint !)
  * **Sortie attendue :** `Durée d'occupation : 12 ans. Dernier loyer mensuel : 804.830 DT. Cumul total payé : 104 532 DT.`

---

### 4. Exercice 24 : Plus grande puissance de 2 inférieure ou égale à $N$
* **Source recueil :** Exercice 24 (*Plus grande puissance de 2*).
* **Mise en situation contextualisée :**  
  Lors du partitionnement de la mémoire flash d'un microcontrôleur embarqué (type ESP32), un fichier de configuration volumineux de $N$ octets doit être logé dans le plus grand bloc contigu disponible dont la taille est obligatoirement une puissance exacte de 2 ($2^k \le N$).
* **Travail demandé :**  
  Saisir un entier $N > 0$ et déterminer par itérations non bornées la valeur de $2^k \le N$.
* **Exemples illustratifs :**
  * Saisie : $N = 500$ octets $\rightarrow$ Puissance retenue : $256$ octets ($2^8$).
  * Saisie : $N = 64$ octets $\rightarrow$ Puissance retenue : $64$ octets ($2^6$).
  * Saisie : $N = 1050$ octets $\rightarrow$ Puissance retenue : $1024$ octets ($2^{10}$).

---

# 📍 SÉANCE 3 : [TP ÉVALUÉ N°1] Contrôle de saisie & Tant Que sur Machine
* **Cycle 2 · Module 2 :** Validation pratique sur poste individuel
* **Nature :** Épreuve pratique notée sur machine (/20 points — 90 min)
* **Compétences évaluées :** Robustesse du contrôle d'entrée, gestion d'accumulateurs sous `while`, tests aux limites.

---

### 1. Exercice 5 : Nombre de chiffres d'un code de sécurité (Socle — 6 pts)
* **Source recueil :** Exercice 5 (*Nombre de chiffres*).
* **Mise en situation contextualisée :**  
  Un terminal de paiement électronique contrôle la saisie d'un code PIN d'urgence. Le système doit compter le nombre de chiffres composant l'entier saisi en utilisant exclusivement des divisions entières successives par 10 (`x div 10`), sans convertir le nombre en chaîne de caractères.
* **Travail demandé :**  
  Écrire le script Python calculant le nombre de chiffres d'un entier naturel saisi $x$.
* **Jeux d'essais obligatoires :**
  * Test 1 : $x = 5403 \rightarrow 4\text{ chiffres}$
  * Test 2 : $x = 176 \rightarrow 3\text{ chiffres}$
  * Test 3 : $x = 9 \rightarrow 1\text{ chiffre}$

---

### 2. Exercice 20 : Modélisation de prolifération biologique comparée (Maîtrise — 8 pts)
* **Source recueil :** Exercice 20 (*Population*).
* **Mise en situation contextualisée :**  
  Dans un bioréacteur industriel, deux souches bactériennes cohabitent :
  * Souche $\alpha$ : Population initiale $10\,000\,000$ bactéries, avec apport constant de $+500\,000$ bactéries par heure.
  * Souche $\beta$ : Population initiale $5\,000\,000$ bactéries, avec prolifération biologique exponentielle de $+3\%$ par heure.
* **Travail demandé :**  
  Écrire l'algorithme et le programme Python déterminant au bout de combien d'heures la souche $\beta$ dépassera en nombre la souche $\alpha$.
* **Exemple illustratif :**
  * À $t = 0$ : $\alpha = 10.0\text{ M}$, $\beta = 5.0\text{ M}$
  * À $t = 20\text{ h}$ : $\alpha = 20.0\text{ M}$, $\beta = 9.03\text{ M}$
  * À $t = 40\text{ h}$ : $\alpha = 30.0\text{ M}$, $\beta = 16.31\text{ M}$
  * À $t = 77\text{ h}$ : $\alpha = 48.50\text{ M}$, $\beta = 48.69\text{ M}$ $\rightarrow$ Condition satisfaite !
  * **Sortie :** `La souche Beta dépasse la souche Alpha après 77 heures de culture.`

---

### 3. Exercice 114 : Calibrage d'un capteur par recherche bornée (Excellence — 6 pts)
* **Source recueil :** Exercice 114 (*Jeu « Deviner mon nombre »*).
* **Mise en situation contextualisée :**  
  Un technicien règle la résistance variable d'un capteur optique. L'appareil génère une valeur de consigne secrète comprise entre $1$ et $30$. Le technicien a droit à **5 ajustements maximum**. À chaque tentative, l'appareil affiche `"Signal trop fort !"` ou `"Signal trop faible !"`.
* **Travail demandé :**  
  Simuler la procédure d'ajustement en Python avec boucle `while`, gestion d'un compteur d'essais et message final de succès ou d'échec de calibrage.
* **Exemple illustratif :**
  * Valeur secrète : `19`
  * Essai 1 : `10` $\rightarrow$ `"Signal trop faible ! (Essais restants : 4)"`
  * Essai 2 : `25` $\rightarrow$ `"Signal trop fort ! (Essais restants : 3)"`
  * Essai 3 : `19` $\rightarrow$ `"Calibrage réussi avec succès en 3 essais !"`

---

# 📍 SÉANCE 4 : Boucle `Répéter ... Jusqu'à` & Structure `Selon`
* **Cycle 3 · Module 3 :** Itérations à post-condition & alternatives multiples
* **Nature :** Apprentissage & Travaux dirigés guidés (90 min)
* **Compétences clés :** Maîtriser l'exécution garantie au moins une fois, formuler la condition d'arrêt, structurer les sélecteurs avec `Selon` et `match...case`.

---

### 1. Exercice 17 : Simulation de transmission avec accusé de réception
* **Source recueil :** Exercice 17 (*Dé 6*).
* **Mise en situation contextualisée :**  
  Un émetteur radio IoT envoie des trames de données à une station réceptrice. Chaque tentative de liaison équivaut au tirage aléatoire d'un jeton de 1 à 6. La liaison est validée lorsque le code d'accusé de réception **`6`** (ACK) est reçu.
* **Travail demandé :**  
  Concevoir l'algorithme avec une boucle `Répéter ... Jusqu'à (reponse = 6)` qui affiche le code de chaque tentative et affiche à la fin le nombre total d'émissions nécessaires.
* **Exemples illustratifs :**
  * Tirages : `3` $\rightarrow$ `1` $\rightarrow$ `5` $\rightarrow$ `6` $\rightarrow$ Fin de boucle !
  * Sortie : `Connexion établie après 4 transmissions.`

---

### 2. Exercice 9 (Séquence 3) : Extraction réitérée des chiffres d'un entier
* **Source recueil :** Exercice 9 (Séquence 3 : *Somme des chiffres avec Répéter*).
* **Mise en situation contextualisée :**  
  Pour certifier un numéro de dossier médical sans le stocker sous forme de texte, on extrait mathématiquement ses chiffres de droite à gauche grâce aux opérateurs `mod 10` et `div 10`. Même pour le nombre zéro, le traitement doit s'exécuter au moins une fois.
* **Travail demandé :**  
  Implémenter l'algorithme calculant la somme des chiffres d'un entier naturel $N$ avec la structure `Répéter ... Jusqu'à (n = 0)`.
* **Exemples illustratifs :**
  * Pour $N = 482$ : 
    * Itération 1 : chiffre = $2$, somme = $2$, $N = 48$
    * Itération 2 : chiffre = $8$, somme = $10$, $N = 4$
    * Itération 3 : chiffre = $4$, somme = $14$, $N = 0$ $\rightarrow$ Arrêt !
  * Pour $N = 0$ : 
    * Itération 1 : chiffre = $0$, somme = $0$, $N = 0$ $\rightarrow$ Arrêt immédiat ! Somme = 0.

---

### 3. Exercice 118 : Classification d'une grille avec `Selon`
* **Source recueil :** Exercice 118 (*Couleur d'une position sur l'échiquier*).
* **Mise en situation contextualisée :**  
  Dans un entrepôt de stockage logistique automatisé, le sol est quadrillé en cases repérées par une lettre de `'a'` à `'h'` et un chiffre de $1$ à $8$. Les cases sont alternativement blanches (zone de circulation robotisée) ou noires (zone de stationnement).
* **Travail demandé :**  
  Saisir la colonne (caractère) et la ligne (entier). Utiliser la structure de contrôle `Selon` (traduite en Python par `match...case`) pour classifier la nature de la case selon la parité de la colonne et de la ligne.
* **Exemples illustratifs :**
  * Saisie : `"a"`, `5` $\rightarrow$ Ligne impaire sur colonne impaire $\rightarrow$ `"Zone Noire (Stationnement)"`.
  * Saisie : `"e"`, `6` $\rightarrow$ Ligne paire sur colonne impaire $\rightarrow$ `"Zone Blanche (Circulation)"`.
  * Saisie : `"k"`, `3` $\rightarrow$ Cas par défaut $\rightarrow$ `"Coordonnées hors grille !"`.

---

### 4. Exercice 111 : Course de processus concurrents (Le Lièvre et la Tortue)
* **Source recueil :** Exercice 111 (*Le lièvre et la tortue*).
* **Mise en situation contextualisée :**  
  Un banc d'essai simule deux algorithmes de compression de paquets :
  * Algorithme A (Rapide mais risqué) : Tente de finaliser le traitement en une seule passe si le processeur accorde la ressource prioritaire (tirage aléatoire d'un 6).
  * Algorithme B (Régulier et robuste) : Avance d'une étape de calcul ($+1$) à chaque tour d'horloge. Il gagne dès qu'il valide 6 étapes.
* **Travail demandé :**  
  Programmer la simulation tour par tour avec `Répéter ... Jusqu'à (victoire_A ou pos_B = 6)`.
* **Exemple illustratif :**
  * Tour 1 : Tirage 2 $\rightarrow$ B avance à 1/6
  * Tour 2 : Tirage 4 $\rightarrow$ B avance à 2/6
  * Tour 3 : Tirage 6 $\rightarrow$ A réussit le tirage critique et l'emporte !

---

# 📍 SÉANCE 5 : [TP ÉVALUÉ N°2] Menus interactifs & Boucles combinées
* **Cycle 3 · Module 3 :** TP noté sur machine
* **Nature :** Évaluation pratique individuelle (/20 points — 90 min)
* **Compétences évaluées :** Boucle de maintien de menu, saisie sécurisée, `match...case`, cumul de statistiques.

---

### 1. Exercice 119 : Banc d'auto-évaluation en électronique (Socle & Maîtrise — 10 pts)
* **Source recueil :** Exercice 119 (*Entraînement aux tables de multiplication*).
* **Mise en situation contextualisée :**  
  Un logiciel didactique pour élèves techniciens teste la maîtrise de la loi d'Ohm ($U = R \times I$). Le programme tire au sort deux entiers $R \in [1 ; 20]\ \Omega$ et $I \in [1 ; 10]\text{ A}$, puis demande la tension $U$. La session s'interrompt si l'élève atteint **10 bonnes réponses** (validation du module) ou commet **3 erreurs** (nécessité de révision).
* **Travail demandé :**  
  1. Afficher un menu : `1. Démarrer le test`, `2. Consulter les règles`, `0. Quitter`.
  2. Maintenir le programme avec une boucle jusqu'au choix 0.
  3. Gérer les compteurs de succès et d'erreurs avec feedback immédiat.
* **Exemple d'exécution :**
  ```text
  --- MENU PRINCIPAL ---
  1. Lancer le test Loi d'Ohm
  0. Quitter
  Votre choix : 1
  Question 1 : R = 12 ohms, I = 4 A. Quelle est la tension U (en V) ? 48
  -> Bravo ! (Bonnes réponses : 1/10 | Erreurs : 0/3)
  Question 2 : R = 15 ohms, I = 2 A. Quelle est la tension U (en V) ? 25
  -> Erreur ! La réponse était 30 V. (Bonnes réponses : 1/10 | Erreurs : 1/3)
  ```

---

### 2. Exercice 115 : Arbitrage de flux réseau (Duel de jetons) (Maîtrise — 6 pts)
* **Source recueil :** Exercice 115 (*Jeu 10 — Duel de dés*).
* **Mise en situation contextualisée :**  
  Deux nœuds routeurs $N_1$ et $N_2$ se disputent la priorité de bande passante. À chaque créneau temporel, chaque nœud tire un nombre aléatoire entre 1 et 6. Le routeur ayant la plus forte valeur marque 1 point de priorité (en cas d'égalité, aucun point n'est marqué). Le premier routeur qui totalise **10 points** prend le contrôle de la ligne.
* **Travail demandé :**  
  Concevoir l'algorithme affichant le score manche par manche et déclarant le vainqueur final.
* **Exemple illustratif :**
  * Manche 1 : N1=4, N2=2 $\rightarrow$ N1 marque (Score : 1 - 0)
  * Manche 2 : N1=3, N2=5 $\rightarrow$ N2 marque (Score : 1 - 1)
  * ...
  * Manche 17 : N2 atteint 10 points $\rightarrow$ `"Le Routeur N2 obtient la priorité de transmission."`

---

### 3. Exercice 125 : Gestion de déstockage critique (Jeu de Nim) (Excellence — 4 pts)
* **Source recueil :** Exercice 125 (*Jeu de Nim — 16 allumettes*).
* **Mise en situation contextualisée :**  
  Dans une salle blanche, un lot de 16 composants sensibles doit être évacué. Deux opérateurs retirent tour à tour 1, 2 ou 3 composants. L'opérateur qui retire le dernier composant valide la clôture du lot. Toute saisie différente de 1, 2 ou 3 ou supérieure au stock restant est rejetée.
* **Travail demandé :**  
  Implémenter le jeu interactif avec contrôle de saisie strict à chaque coup.
* **Exemple illustratif :**
  * Stock initial = 16. Opérateur 1 retire : 3 $\rightarrow$ Reste 13.
  * Opérateur 2 tente de retirer 5 $\rightarrow$ `"Erreur : retrait impossible (1 à 3 requis)"`.

---

# 📍 SÉANCE 6 : Chaînes de caractères & Fonctions prédéfinies normalisées
* **Cycle 4 · Module 4 :** Traitement des séquences textuelles
* **Nature :** Apprentissage & Travaux dirigés guidés (90 min)
* **Compétences clés :** Indexation base 0 (`0` à `Long-1`), fonctions officielles (`Long`, `Sous_chaine`, `Pos`, `Ord`, `Chr`, `Majus`), détection de motifs et symétrie.

---

### 1. Exercice 2 : Extraction manuelle de sous-chaîne vs `Sous_chaine`
* **Source recueil :** Exercice 2 (*Sous-chaîne par boucle*).
* **Mise en situation contextualisée :**  
  En bio-informatique, un analyseur extrait une séquence génique cible d'un brin d'ADN entre deux indices de coupure $p_1$ et $p_2$.
* **Travail demandé :**  
  1. Suivre l'exécution de l'algorithme utilisant une boucle `Pour i de p1 à p2 - 1` pour construire la sous-chaîne.
  2. Établir l'équivalence avec la fonction prédéfinie normalisée `Sous_chaine(ch, p1, p2 - p1)`.
* **Exemples illustratifs :**
  * Pour $ch = \text{"ATCGGCTA"}$, $p_1 = 2$, $p_2 = 6$ :
    * Caractères extraits : indices 2 ('C'), 3 ('G'), 4 ('G'), 5 ('C').
    * Résultat : `"CGGC"`.

---

### 2. Exercice 49 & 60 : Analyse acoustique de commandes vocales
* **Source recueil :** Exercice 49 (*Nombre de voyelles*) et Exercice 60 (*Joli-mot*).
* **Mise en situation contextualisée :**  
  Un module de reconnaissance vocale domotique filtre les mots de passe prononcés. Pour assurer une intelligibilité maximale du signal sonore, le système vérifie si le mot de passe est acoustiquement équilibré (le nombre de voyelles est strictement égal au nombre de consonnes).
* **Travail demandé :**  
  Écrire l'algorithme comptant les voyelles et les consonnes d'une chaîne saisie en lettres majuscules, puis indiquant si le mot est un "Joli-mot" phonétique.
* **Exemples illustratifs :**
  * Mot : `"ROBOT"` $\rightarrow$ Voyelles (O, O) = 2, Consonnes (R, B, T) = 3 $\rightarrow$ Non équilibré.
  * Mot : `"AUTOMATE"` $\rightarrow$ Voyelles (A, U, O, A, E) = 5, Consonnes (T, M, T) = 3 $\rightarrow$ Non équilibré.
  * Mot : `"PYTHON"` $\rightarrow$ (avec Y considéré comme voyelle : Y, O = 2, Consonnes = 4).
  * Mot : `"SIGNAL"` $\rightarrow$ Voyelles (I, A) = 2, Consonnes (S, G, N, L) = 4.
  * Mot : `"LIVRET"` $\rightarrow$ Voyelles (I, E) = 2, Consonnes (L, V, R, T) = 4.
  * Mot : `"ZONE"` $\rightarrow$ Voyelles (O, E) = 2, Consonnes (Z, N) = 2 $\rightarrow$ `"Mot acoustiquement équilibré !"`.

---

### 3. Exercice 61 : Séquences palindromiques d'ADN
* **Source recueil :** Exercice 61 (*Palindrome*).
* **Mise en situation contextualisée :**  
  Les enzymes de restriction utilisées en génie génétique reconnaissent des sites de coupure spécifiques caractérisés par des séquences palindromiques (qui se lisent de la même façon dans les deux sens).
* **Travail demandé :**  
  Concevoir l'algorithme comparant les caractères symétriques d'un mot $ch$ d'indice $i$ et d'indice $\text{Long}(ch) - 1 - i$ à l'aide d'une boucle conditionnelle optimisée (arrêt dès la première discordance).
* **Exemples illustratifs :**
  * Test 1 : `"RADAR"` $\rightarrow$ $R=R, A=A, D=D \rightarrow \text{"Séquence Palindrome"}$.
  * Test 2 : `"KAYAK"` $\rightarrow \text{"Séquence Palindrome"}$.
  * Test 3 : `"GENOME"` $\rightarrow$ $G \ne E \rightarrow \text{"Non Palindrome (rejet immédiat à l'indice 0)"}$.

---

### 4. Exercice 65 : Cryptage de données télémétriques (César +3)
* **Source recueil :** Exercice 65 (*Cryptologie — César +3*).
* **Mise en situation contextualisée :**  
  Pour sécuriser les identifiants transmises par liaison hertzienne non chiffrée, une sonde spatiale applique un chiffrement de substitution décalant chaque lettre de 3 positions dans l'alphabet avec rebouclage circulaire de `'Z'` vers `'A'`.
* **Travail demandé :**  
  Écrire l'algorithme appliquant la formule normalisée avec `Ord` et `Chr` :
  $$c_{chiffré} \leftarrow \text{Chr}(65 + (\text{Ord}(c) - 65 + 3) \bmod 26)$$
* **Exemples illustratifs :**
  * Chaîne claire : `"PYTHON"` $\rightarrow$ Résultat chiffré : `"SBWKRQ"`
  * Chaîne claire : `"ZOO"` $\rightarrow$ Résultat chiffré : `"CRR"`

---

# 📍 SÉANCE 7 : [TP ÉVALUÉ N°3] Traitement textuel & Validation de formats
* **Cycle 4 · Module 4 :** TP noté sur machine
* **Nature :** Évaluation pratique individuelle (/20 points — 90 min)
* **Compétences évaluées :** Fonctions prédéfinies sur chaînes, extraction, validation de clés et de formats normalisés.

---

### 1. Exercice 71 : Contrôle d'intégrité de trames (Bit de parité) (Socle — 6 pts)
* **Source recueil :** Exercice 71 (*Bit de parité — Parité impaire*).
* **Mise en situation contextualisée :**  
  Dans une liaison série industrielle RS-485, un capteur envoie un octet sous forme d'une chaîne binaire de 8 caractères (`'0'` ou `'1'`). Pour détecter les erreurs de ligne, le contrôleur ajoute un 9ème bit appelé **bit de parité impaire**, de sorte que le nombre total de bits `'1'` dans le bloc de 9 bits soit strictement **impair**.
* **Travail demandé :**  
  Saisir une chaîne de 8 bits. Vérifier sa validité (longueur 8 et uniquement des 0 et des 1). Déterminer et afficher le bit de parité à adjoindre ainsi que l'octet complet transmis.
* **Exemples illustratifs :**
  * Entrée : `"11010010"` (contient 4 fois le chiffre `'1'`, nombre pair) $\rightarrow$ Bit de parité = `'1'` $\rightarrow$ Trame émise : `"110100101"` (total 5 bits à 1).
  * Entrée : `"10101000"` (contient 3 fois le chiffre `'1'`, nombre impair) $\rightarrow$ Bit de parité = `'0'` $\rightarrow$ Trame émise : `"101010000"` (total 3 bits à 1).
  * Entrée : `"10120010"` $\rightarrow$ Rejet : `"Format binaire invalide"`.

---

### 2. Exercice 69 : Clé d'horodatage d'un lot agroalimentaire (Maîtrise — 8 pts)
* **Source recueil :** Exercice 69 (*Chiffre de chance*).
* **Mise en situation contextualisée :**  
  Sur une ligne d'embouteillage d'huile d'olive, chaque date de conditionnement au format `"JJ/MM/AAAA"` est compressée en un chiffre unique de contrôle (chiffre de sécurité) calculé par réduction itérée de la somme de ses chiffres.
* **Travail demandé :**  
  1. Valider que la chaîne comporte exactement 10 caractères et deux séparateurs `'/'` aux indices 2 et 5.
  2. Extraire les chiffres, calculer leur somme, puis répéter la somme des chiffres du résultat jusqu'à obtenir un entier compris entre 1 et 9.
* **Exemple d'exécution :**
  * Date : `"29/09/2026"`
  * Étape 1 : $2 + 9 + 0 + 9 + 2 + 0 + 2 + 6 = 30$
  * Étape 2 : $3 + 0 = 3$ $\rightarrow$ Clé d'horodatage finale = **3**.

---

### 3. Exercice 75 : Authentification optique de billets de banque (Excellence — 6 pts)
* **Source recueil :** Exercice 75 (*Billet de banque authentique*).
* **Mise en situation contextualisée :**  
  Un automate bancaire vérifie l'authenticité des numéros de série de billets de banque. Le numéro se compose d'une lettre majuscule suivie de 11 chiffres (ex: `"S04012543281"`).  
  **Règle d'authenticité :**
  1. Remplacer la lettre par son rang dans l'alphabet (A=1, B=2, ..., S=19, ..., Z=26).
  2. Concaténer ce rang avec les 11 chiffres pour former un grand nombre.
  3. Le billet est authentique si et seulement si ce grand nombre modulo 9 est égal à **8**.
* **Travail demandé :**  
  Écrire le programme Python vérifiant la validité d'un numéro de série saisi.
* **Exemples illustratifs :**
  * Numéro saisi : `"S04012543281"`
  * Lettre `'S'` $\rightarrow$ Rang 19.
  * Grand entier formé : $1904012543281$
  * Calcul de contrôle : $1904012543281 \bmod 9 = 8$ $\rightarrow$ `"Billet Authentique certifié"`.
  * Numéro saisi : `"A00000000001"` $\rightarrow 100000000001 \bmod 9 = 2 \ne 8 \rightarrow \text{"Billet Non Conforme / Contrefaçon"}$.

---

# 📍 SÉANCE 8 : Tableaux 1D statiques : Déclaration, Saisie & Cumuls
* **Cycle 5 · Module 5 :** Structures de données statiques homogènes (`numpy`)
* **Nature :** Apprentissage & Travaux dirigés guidés (90 min)
* **Compétences clés :** Allocation statique, boucle de saisie contrôlée, affichage séquentiel case par case (interdiction du `print(T)` brut), calculs cumulatifs et extrema.

---

### 1. Exercice 77 : Surveillance thermique d'une serre connectée (Min & Max)
* **Source recueil :** Exercice 77 (*Min et Max d'un tableau*).
* **Mise en situation contextualisée :**  
  Une sonde thermique mesure la température à l'intérieur d'une serre agricole chaque heure pendant 24 heures ($N = 24$). Les valeurs sont stockées dans un tableau statique `T` de réels.
* **Travail demandé :**  
  1. Déclarer le tableau en TDO (`T : Tableau de 24 Réel`) et en Python (`T = array([0.0] * 24)`).
  2. Écrire l'algorithme déterminant la température minimale, la température maximale ainsi que les heures exactes (indices) de leur apparition.
* **Exemples illustratifs :**
  * Relevés partiels : `[14.2, 13.8, 12.5, ..., 31.4, 28.0]`
  * Sortie : `Température minimale : 12.5 °C à l'heure 2 | Température maximale : 31.4 °C à l'heure 14.`

---

### 2. Exercice 78 : Équilibrage des phases d'un réseau électrique
* **Source recueil :** Exercice 78 (*Tableau équilibré*).
* **Mise en situation contextualisée :**  
  Un disjoncteur différentiel numérique analyse un lot de $N$ impulsions de charge électrique représentées par des entiers. Pour garantir la stabilité du réseau, le tableau doit être **équilibré**, c'est-à-dire contenir exactement autant de valeurs paires que de valeurs impaires.
* **Travail demandé :**  
  Saisir un entier pair $N \in [4 ; 20]$, remplir le tableau, et vérifier si le tableau satisfait la condition d'équilibre.
* **Exemples illustratifs :**
  * Pour $T = [12, 7, 24, 19, 8, 3]$ ($N = 6$) : 3 pairs ($12, 24, 8$) et 3 impairs ($7, 19, 3$) $\rightarrow$ `"Réseau Équilibré"`.
  * Pour $T = [10, 14, 18, 5]$ ($N = 4$) : 3 pairs et 1 impair $\rightarrow$ `"Déséquilibre détecté !"`.

---

### 3. Exercice 79 : Facturation d'énergie consommée par des machines
* **Source recueil :** Exercice 79 (*Somme des produits croisés de deux tableaux*).
* **Mise en situation contextualisée :**  
  Un atelier industriel possède $N$ machines. On dispose de deux tableaux :
  * $P$ : Tableau des puissances nominales (en kW).
  * $D$ : Tableau des durées d'utilisation journalière (en heures).
* **Travail demandé :**  
  Calculer l'énergie totale consommée dans la journée en sommant les produits terme à terme :
  $$E_{totale} = \sum_{i=0}^{N-1} (P[i] \times D[i])$$
* **Exemples illustratifs :**
  * $P = [1.5, 2.0, 0.8]\text{ kW}$
  * $D = [4.0, 2.5, 5.0]\text{ h}$
  * Calcul : $(1.5 \times 4.0) + (2.0 \times 2.5) + (0.8 \times 5.0) = 6.0 + 5.0 + 4.0 = 15.0\text{ kWh}$.

---

### 4. Exercice 11 : Test de conformité d'un étalonnage croissant
* **Source recueil :** Exercice 11 (*Test de tri d'un tableau*).
* **Mise en situation contextualisée :**  
  Lors du calibrage d'un capteur de pression, un banc d'essai injecte des paliers de pression croissants. Les relevés de tension générés dans le tableau $T$ doivent être strictement ordonnés de manière croissante ($T[i-1] \le T[i]$ pour tout $i$).
* **Travail demandé :**  
  Parcourir le tableau avec une condition d'arrêt immédiate dès qu'une régression de valeur est constatée.
* **Exemples illustratifs :**
  * Tableau $T = [12.0, 15.5, 20.0, 21.5, 23.5, 29.0] \rightarrow \text{"Calibrage conforme (Monotonie respectée)"}$.
  * Tableau $T = [12.0, 15.5, 20.0, 18.0, 23.5, 29.0] \rightarrow \text{"Anomalie détectée entre l'indice 2 (20.0) et 3 (18.0)"}$.

---

# 📍 SÉANCE 9 : [TP ÉVALUÉ N°4] Tableaux 1D (`numpy`), Cumuls & Extrema
* **Cycle 5 · Module 5 :** TP noté sur machine
* **Nature :** Évaluation pratique individuelle (/20 points — 90 min)
* **Compétences évaluées :** Déclaration rigoureuse `numpy`, algorithmes d'extrema avec mémorisation de positions, comptages d'écarts relatifs.

---

### 1. Exercice 77 Étendu : Relevés de pression d'un réseau hydraulique (Socle — 8 pts)
* **Source recueil :** Exercice 77 (*Extrema et indices*).
* **Mise en situation contextualisée :**  
  Un automate surveille $N$ points de pression ($5 \le N \le 30$) le long d'une conduite forcée. Les valeurs sont comprises entre $0.0$ et $25.0\text{ bars}$.
* **Travail demandé :**  
  Saisir $N$ avec contrôle de validité, saisir les relevés, calculer la pression moyenne et identifier le capteur ayant relevé la surpression maximale en affichant son indice.
* **Exemple illustratif :**
  * $N = 5$
  * Pressions : `[14.2, 18.5, 12.0, 22.4, 15.1]` bars
  * Pression moyenne : $16.44\text{ bars}$
  * Pression max : $22.4\text{ bars}$ au capteur d'indice $3$.

---

### 2. Exercice 81 : Classement et rangs de prototypes photovoltaïques (Maîtrise — 8 pts)
* **Source recueil :** Exercice 81 (*Rang des élèves / échantillons*).
* **Mise en situation contextualisée :**  
  Un laboratoire d'énergie solaire teste $N$ prototypes de panneaux solaires. Leurs rendements énergétiques respectifs sont enregistrés dans un tableau $R$. Le rang d'un prototype est égal à :  
  $$\text{Rang}[i] = 1 + \text{nombre de prototypes ayant un rendement strictement supérieur à } R[i]$$
* **Travail demandé :**  
  Calculer et afficher dans un second tableau `Rangs` la position de chaque prototype.
* **Exemple d'exécution :**
  * Rendements $R = [18.5, 22.0, 19.5, 22.0, 16.0]$
  * Prototype 0 ($18.5$) : 3 panneaux ont un rendement supérieur $\rightarrow$ **Rang 4**
  * Prototype 1 ($22.0$) : 0 panneau supérieur $\rightarrow$ **Rang 1 (ex aequo)**
  * Prototype 2 ($19.5$) : 2 panneaux supérieurs $\rightarrow$ **Rang 3**
  * Prototype 3 ($22.0$) : 0 panneau supérieur $\rightarrow$ **Rang 1 (ex aequo)**
  * Prototype 4 ($16.0$) : 4 panneaux supérieurs $\rightarrow$ **Rang 5**

---

### 3. Exercice 82 : Détection de dispersion de mesures distinctes (Excellence — 4 pts)
* **Source recueil :** Exercice 82 (*Nombre d'éléments distincts*).
* **Mise en situation contextualisée :**  
  Pour évaluer la sensibilité d'un capteur de proximité à ultrasons, on enregistre $N$ mesures discrètes. Si le capteur est bloqué ou sature, il renvoie constamment la même valeur. On cherche à dénombrer le nombre exact de **valeurs distinctes** présentes dans le tableau.
* **Travail demandé :**  
  Parcourir le tableau et compter combien de valeurs n'avaient jamais été rencontrées auparavant.
* **Exemple illustratif :**
  * Relevés : `[10, 15, 10, 12, 15, 18, 10, 12]`
  * Valeurs distinctes uniques identifiées : $\{10, 15, 12, 18\}$
  * Sortie : `Le capteur a mesuré 4 valeurs distinctes différentes.`

---

# 📍 SÉANCE 10 : Tableaux 1D : Comptages conditionnels & Filtrage sélectif
* **Cycle 6 · Module 6 :** Traitements sélectifs & Asynchronisme d'indices
* **Nature :** Apprentissage & Travaux dirigés guidés (90 min)
* **Compétences clés :** Gestion du double indice ($i$ source, $j$ destination), filtrage vers un tableau récepteur, éclatement d'un tableau en deux sous-tableaux, dédoublonnage.

---

### 1. Exercice 86 : Segmentation thermique autour d'un seuil pivot
* **Source recueil :** Exercice 86 (*Segmentation d'un tableau*).
* **Mise en situation contextualisée :**  
  Dans un système de régulation de centrale thermique, un tableau $T$ stocke $N$ températures. La première case $T[0]$ représente la température de consigne pivot. L'ingénieur doit segmenter le tableau en déplaçant toutes les températures inférieures ou égales à la consigne vers la gauche et toutes les températures supérieures vers la droite.
* **Travail demandé :**  
  Concevoir l'algorithme utilisant deux tableaux récepteurs ou un transfert sélectif géré par des compteurs d'insertion distincts.
* **Exemples illustratifs :**
  * Tableau initial : $T = [20.0, 14.5, 25.0, 18.0, 31.0, 12.0, 22.5]$ (Pivot = $20.0^\circ\text{C}$)
  * Éléments $\le 20.0$ : `[14.5, 18.0, 12.0]`
  * Éléments $> 20.0$ : `[25.0, 31.0, 22.5]`
  * Tableau segmenté final : `[14.5, 18.0, 12.0, 20.0, 25.0, 31.0, 22.5]`

---

### 2. Exercice 85 : Réorganisation entrelacée de trames de télémétrie
* **Source recueil :** Exercice 85 (*Transfert alterné*).
* **Mise en situation contextualisée :**  
  Un drone de reconnaissance enregistre deux flux de données alternés dans un tableau $T$ de taille paire $N$ : les cases d'indices pairs correspondent au canal infrarouge et les cases d'indices impairs au canal visible. L'algorithme doit transférer dans un tableau récepteur $R$ les canaux infrarouges rangés de gauche à droite, puis les canaux visibles rangés en ordre inverse de droite à gauche.
* **Travail demandé :**  
  Écrire l'algorithme gérant la destination avec calcul d'indices asynchrones.
* **Exemples illustratifs :**
  * Tableau source : $T = [10, 20, 30, 40, 50, 60]$ ($N = 6$)
  * Indices pairs (0, 2, 4) : $10, 30, 50 \rightarrow$ Placés aux indices $0, 1, 2$ de $R$.
  * Indices impairs (1, 3, 5) : $20, 40, 60 \rightarrow$ Inversés ($60, 40, 20$) et placés aux indices $3, 4, 5$ de $R$.
  * Résultat final : $R = [10, 30, 50, 60, 40, 20]$.

---

### 3. Exercice 96 : Élimination des détections RFID redondantes
* **Source recueil :** Exercice 96 (*Suppression de la redondance*).
* **Mise en situation contextualisée :**  
  À l'entrée d'un entrepôt logistique, un portique RFID enregistre les codes de palettes de marchandises qui défilent. Les palettes stationnant temporairement sous le lecteur génèrent des lectures multiples consécutives.
* **Travail demandé :**  
  Écrire l'algorithme filtrant le tableau de codes pour copier dans un second tableau `Codes_Uniques` uniquement la première occurrence de chaque référence, et déterminer la taille utile $j$.
* **Exemples illustratifs :**
  * Source : `["PAL-42", "PAL-18", "PAL-42", "PAL-99", "PAL-18", "PAL-05"]`
  * Destination : `["PAL-42", "PAL-18", "PAL-99", "PAL-05"]`
  * Nombre de palettes physiques uniques décomptées : $4$.

---

### 4. Exercice 97 : Filtrage et normalisation de références de pièces
* **Source recueil :** Exercice 97 (*Filtrage alphabétique et longueur > 2*).
* **Mise en situation contextualisée :**  
  Un système de vision industrielle scanne des marquages de pièces mécaniques parfois souillés de graisse ou de parasites (symboles non alphabétiques). L'ordinateur doit nettoyer chaque case en retirant les caractères spéciaux, convertir le résultat en majuscules, et ne transférer dans le tableau final que les références valides dont la longueur utile dépasse 2 lettres.
* **Travail demandé :**  
  Combiner parcours de tableau et manipulation de chaînes de caractères avec double indiçage.
* **Exemples illustratifs :**
  * Tableau brut : `["#ab*", "m1", "p-y-t", "a", "@chem!"]`
  * Après épuration et mise en majuscule :
    * `"#ab*"` $\rightarrow$ `"AB"` (longueur 2 $\rightarrow$ non retenu car $\le 2$)
    * `"m1"` $\rightarrow$ `"M"` (longueur 1 $\rightarrow$ rejeté)
    * `"p-y-t"` $\rightarrow$ `"PYT"` (longueur 3 $\rightarrow$ **conservé**)
    * `"@chem!"` $\rightarrow$ `"CHEM"` (longueur 4 $\rightarrow$ **conservé**)
  * Tableau épuré : `["PYT", "CHEM"]` (Taille utile = 2).

---

# 📍 SÉANCE 11 : [TP ÉVALUÉ N°5] Filtrage, Éclatement & Séparation
* **Cycle 6 · Module 6 :** TP noté sur machine
* **Nature :** Évaluation pratique individuelle (/20 points — 90 min)
* **Compétences évaluées :** Manipulation simultanée de 3 tableaux statiques `numpy`, indices indépendants $j_1$ et $j_2$, bilans de conformité industrielle.

---

### 1. Exercice 86 Appliqué : Tri d'usinage de pistons de moteurs (Socle & Maîtrise — 10 pts)
* **Source recueil :** Exercice 86 (*Segmentation / Tri qualité*).
* **Mise en situation contextualisée :**  
  Une usine fabrique des pistons automobiles de diamètre théorique $50.00\text{ mm}$. Un banc laser mesure un lot de $N$ pistons ($6 \le N \le 25$). Les tolérances strictes de montage exigent un diamètre compris dans l'intervalle $[49.80 ; 50.20]\text{ mm}$.
* **Travail demandé :**  
  1. Déclarer trois tableaux `numpy` : `Lots`, `Acceptes` et `Rebuts`.
  2. Parcourir `Lots` et orienter chaque pièce vers `Acceptes` (géré par $j_1$) ou `Rebuts` (géré par $j_2$).
  3. Calculer et afficher le taux d'acceptation $\tau = \frac{j_1}{N} \times 100\%$ ainsi que les diamètres des pièces acceptées.
* **Exemple illustratif :**
  * $N = 6$, $Lots = [50.05, 49.70, 50.18, 50.35, 49.95, 50.10]$
  * Pièces acceptées ($49.80 \le d \le 50.20$) : `[50.05, 50.18, 49.95, 50.10]` ($j_1 = 4$)
  * Pièces au rebut : `[49.70, 50.35]` ($j_2 = 2$)
  * Taux de conformité : $66.67\%$.

---

### 2. Exercice 92 & 90 : Dépollution de signaux de télémesures satellite (Maîtrise — 6 pts)
* **Source recueil :** Exercice 90 & 92 (*Chaînes purement numériques vs parasites*).
* **Mise en situation contextualisée :**  
  Une station de poursuite satellite reçoit un flux de $N$ paquets de données sous forme de chaînes. En raison des perturbations ionosphériques, certains paquets sont corrompus par des caractères alphabétiques parasites. Un paquet est intègre s'il est composé **uniquement de chiffres décimaux**.
* **Travail demandé :**  
  Filtrer le tableau d'entrée pour éclater les paquets en deux tableaux : `Trames_Pures` et `Trames_Corrompues`.
* **Exemples illustratifs :**
  * Entrées : `["1048", "98X2", "0054", "78#0", "3120"]`
  * Trames Pures : `["1048", "0054", "3120"]` ($j_1 = 3$)
  * Trames Corrompues : `["98X2", "78#0"]` ($j_2 = 2$)

---

### 3. Exercice 80 : Brassage par couples pour chiffrement de transmission (Excellence — 4 pts)
* **Source recueil :** Exercice 80 (*Permutation deux à deux*).
* **Mise en situation contextualisée :**  
  Pour prévenir l'interception de signaux audio numériques, un boîtier d'encodage permute systématiquement les échantillons successifs deux par deux dans un tableau de taille paire : la case $0$ s'échange avec la case $1$, la case $2$ avec la case $3$, etc.
* **Travail demandé :**  
  Réaliser la permutation directement *en place* dans le tableau (sans tableau auxiliaire).
* **Exemple illustratif :**
  * Signal d'origine : `[105, 112, 98, 104, 76, 82]`
  * Après permutation : `[112, 105, 104, 98, 82, 76]`

---

# 📍 SÉANCE 12 : Modularité : Décomposition, Procédures, Fonctions & Paramètres
* **Cycle 7 · Module 7 :** Conception logicielle descendante & modularité
* **Nature :** Apprentissage & Travaux dirigés guidés (90 min)
* **Compétences clés :** Décomposition en arbre, distinction Fonction pure (`return` unique) vs Procédure, passage de paramètre par référence avec **`@`**, gestion du TDOL et portée locale.

---

### 1. Exercice 126 : Audit et restructuration modulaire d'un moniteur médical
* **Source recueil :** Exercice 126 (*Choix et correction de structures itératives et conception*).
* **Mise en situation contextualisée :**  
  Un stagiaire a écrit un programme monolithique de 80 lignes contrôlant les constantes physiologiques d'un patient (pouls et tension artérielle). Le code mélange les saisies, les calculs de risques et les affichages d'alertes.
* **Travail demandé :**  
  Décomposer le problème en trois sous-programmes indépendants :
  1. Procédure `Saisir_Constantes(@pouls : Entier, @tension : Réel)` : réalise la saisie contrôlée par référence (`@`).
  2. Fonction `Evaluer_Risque(pouls : Entier, tension : Réel) : Entier` : retourne un code de gravité ($0$: normal, $1$: modéré, $2$: critique) sans aucun affichage.
  3. Procédure `Afficher_Rapport(code_risque : Entier)` : édite le rapport d'alerte.
* **Exemple illustratif :**
  * Saisie : Pouls = $115\text{ bpm}$, Tension = $16.5$
  * `Evaluer_Risque` retourne $2$.
  * `Afficher_Rapport` affiche : `"[URGENCE MÉDICALE] Tachycardie et hypertension sévère."`

---

### 2. Exercice 36 : Cryptosystème basé sur les Nombres Parfaits
* **Source recueil :** Exercice 36 (*Nombre parfait*).
* **Mise en situation contextualisée :**  
  Un algorithme de chiffrement asymétrique génère des clés de sécurité en identifiant les nombres parfaits (un nombre égal à la somme de ses diviseurs stricts, ex: $6 = 1 + 2 + 3$).
* **Travail demandé :**  
  Concevoir une architecture modulaire stricte :
  * Module 1 : Fonction `Somme_Diviseurs(n : Entier) : Entier` (accumule tous les diviseurs stricts de $n$).
  * Module 2 : Fonction `Est_Parfait(n : Entier) : Booléen` (appelle `Somme_Diviseurs` et renvoie `Vrai` si la somme égale $n$).
  * Module 3 (Programme Principal) : Saisit une borne $B \in [2 ; 500]$ et affiche tous les nombres parfaits de l'intervalle $[2 ; B]$.
* **Exemples illustratifs :**
  * Pour $n = 6 \rightarrow$ diviseurs $\{1, 2, 3\}$, somme = $6 \rightarrow$ `Vrai`.
  * Pour $n = 28 \rightarrow$ diviseurs $\{1, 2, 4, 7, 14\}$, somme = $28 \rightarrow$ `Vrai`.
  * Pour $n = 12 \rightarrow$ diviseurs $\{1, 2, 3, 4, 6\}$, somme = $16 \ne 12 \rightarrow$ `Faux`.
  * Sortie pour $B = 100$ : `Nombres parfaits détectés : 6, 28.`

---

### 3. Exercice 68 : Analyse bio-informatique de mutations (Distance de Hamming)
* **Source recueil :** Exercice 68 (*Distance de Hamming*).
* **Mise en situation contextualisée :**  
  En virologie, pour mesurer le taux de mutation entre deux souches d'un même virus (ex: coronavirus ou grippe), on compare deux brins d'ARN de même longueur en comptant le nombre de positions où les nucléotides diffèrent.
* **Travail demandé :**  
  1. Fonction `Distance_Hamming(brin1 : Chaîne, brin2 : Chaîne) : Entier` : retourne le nombre de positions discordantes.
  2. Fonction `Taux_Variation(dist : Entier, longueur : Entier) : Réel` : retourne le pourcentage de mutation.
  3. Programme principal assurant la saisie de deux brins de même taille et affichant le diagnostic.
* **Exemples illustratifs :**
  * Brin 1 : `"GAGCCTACTA"`
  * Brin 2 : `"CATCGTACTA"`
  * Comparaison :
    * Pos 0 : G $\ne$ C (différence 1)
    * Pos 1 : A = A
    * Pos 2 : G $\ne$ T (différence 2)
    * Pos 3 : C = C
    * Pos 4 : C $\ne$ G (différence 3)
    * Pos 5-9 : Identiques
  * Sortie : `Distance de Hamming = 3 mutations. Taux de dérive génétique = 30.0 %.`

---

### 4. Exercice 127 & 134 : Modules graphiques et d'insertion textuelle
* **Source recueil :** Exercice 127 (*Insertion d'une sous-chaîne*) et Exercice 134 (*Table de Pythagore*).
* **Mise en situation contextualisée :**  
  Génération modulaire de grilles d'étalonnage pour capteurs industriels (Table de multiplication carrée d'ordre $N$).
* **Travail demandé :**  
  Écrire la procédure `Afficher_Table_Etalonnage(n : Entier)` contenant un TDOL rigoureux (compteurs d'indices locaux $i, j$) et formatant l'affichage en colonnes régulières.
* **Exemple illustratif pour $N = 4$ :**
  ```text
     1   2   3   4
     2   4   6   8
     3   6   9  12
     4   8  12  16
  ```
