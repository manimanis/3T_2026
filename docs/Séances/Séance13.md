# 📖 Fiche de Séance N°13 : Recherche Séquentielle dans un Tableau

**Module 4 :** Algorithmes Classiques & Mini-Projets Python

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Python / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Comprendre le principe de l'algorithme de **recherche séquentielle** (ou linéaire) : examiner successivement les éléments d'un tableau à partir de l'indice $0$ jusqu'à trouver l'élément ou atteindre la fin du tableau.
* Apprendre à gérer la **sortie anticipée** de la boucle dès que l'élément recherché est localisé (afin d'éviter les comparaisons inutiles).
* Analyser la complexité :
* Meilleur cas : $1$ seule comparaison (élément en première position).
* Pire cas : $N$ comparaisons (élément en dernière position ou absent).



### **B. Savoir-faire (Compétences pratiques)**

* Concevoir et implémenter la fonction `recherche_sequentielle(T, n, element)` sous forme de module autonome.
* Utiliser un indicateur booléen (`trouve`) dans une boucle `Tant que` pour contrôler le parcours.
* 🚫 **Règle Ministérielle Stricte :** **Ne pas utiliser l'instruction `break**` pour interrompre le parcours de la boucle.
* Appliquer la recherche séquentielle à des tableaux synchrones/parallèles (ex: chercher un identifiant et récupérer l'élément correspondant dans un second tableau).

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 10 min | Demander comment retrouver un numéro de téléphone à partir d'un identifiant parmi $N$ élèves enregistrés. | Proposer de parcourir la liste case par case jusqu'à trouver le numéro. | Tableau |
| **2. Synthèse Théorique** | 25 min | Explication du schéma de la boucle `Tant que` avec l'indicateur `trouve`. Présentation de l'algorithme sans `break`. | Prise de notes et traçage manuel de la recherche sur un exemple avec élément présent / absent. | ProProjecteur / Fiche |
| **3. Activité Guidée** | 40 min | Présentation de l'activité pratique (Système de recherche dans un registre d'élèves avec tableaux parallèles). | Élaboration du TDO/TDL, écriture des algorithmes et codage sous Thonny. | Ordinateur (Python IDE) |
| **4. Évaluation Formative** | 15 min | Vérification sur machine du bon retour de la position (`pos`) ou du code d'absence (`-1`). | Correction des erreurs d'indexation et validation des tests. | Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Principe de la Recherche Séquentielle**

La recherche séquentielle consiste à comparer l'élément recherché `val` avec chaque élément `T[i]` du tableau :

1. On initialise l'indice `i ← 0` et l'indicateur `trouve ← Faux`.
2. Tant que l'on n'a pas parcouru tout le tableau (`i < n`) et que l'élément n'a pas été trouvé (`trouve = Faux`) :
* Si `T[i] = val`, alors l'élément est trouvé (`trouve ← Vrai`).
* Sinon, on passe à l'élément suivant (`i ← i + 1`).


3. Après la boucle, si `trouve = Vrai`, la position est `i` ; sinon, l'élément est absent (on retourne `-1`).

---

### **II. Syntaxe Algorithmique Officielle **

```text
Fonction recherche_sequentielle (T : Tableau de N Entier, n : Entier, val : Entier) : Entier
DÉCLARATION DES OBJETS LOCAUX
    i, pos : Entier
    trouve : Booléen
DEBUT
    i ← 0
    trouve ← Faux
    pos ← -1
    
    Tant que (i < n ET trouve = Faux) Faire
        Si (T[i] = val) Alors
            trouve ← Vrai
            pos ← i
        Sinon
            i ← i + 1
        FinSi
    Fin Tant que
    
    Retourner pos
FIN

```

---

### **III. Implémentation Python Conforme (Sans `break`)**

```python
def recherche_sequentielle(T, n, val):
    i = 0
    trouve = False
    pos = -1
    
    while i < n and not trouve:
        if T[i] == val:
            trouve = True
            pos = i
        else:
            i += 1
            
    return pos  # Retourne l'indice (0 à n-1) ou -1 si absent

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Correction de Code Non Conforme (10 min)**

*Énoncé :* Transformer le script Python ci-dessous (non conforme car utilisant `break` et une boucle `for`) en une fonction respectant la réglementation ministérielle.

```python
# Code non conforme (avec break)
def chercher_mauvais(T, n, val):
    pos = -1
    for i in range(n):
        if T[i] == val:
            pos = i
            break  # INTERDIT AU BAC !
    return pos

```

#### **Correction Conforme (Utilisation de `while`) :**

```python
def chercher_conforme(T, n, val):
    i = 0
    trouve = False
    pos = -1
    while i < n and not trouve:
        if T[i] == val:
            trouve = True
            pos = i
        else:
            i += 1
    return pos

```

---

### **Activité 2 : Résolution d'un Problème Complet (35 min)**

#### **Énoncé du problème :**

Un établissement scolaire souhaite gérer le **Annuaire de Contact des Élèves** à l'aide de deux tableaux parallèles (synchrones) :

* `IDs` : Tableau de $N$ entiers contenant les numéros d'identifiants uniques des élèves.
* `Moyennes` : Tableau de $N$ réels contenant les moyennes scolaires respectives des élèves.

On demande de concevoir un programme modulaire qui :

1. Saisit le nombre d'élèves $N$ ($3 \le N \le 25$).
2. Remplit le tableau `IDs` (avec contrôle d'unicité des identifiants $> 0$) et le tableau `Moyennes` ($0.0 \le \text{note} \le 20.0$).
3. Propose une option de **recherche d'un élève par son ID** :
* L'utilisateur saisit un ID à rechercher.
* Le programme utilise la **recherche séquentielle** pour localiser l'ID dans le tableau `IDs`.
* Si l'élève est trouvé, le programme affiche sa position dans le registre et sa moyenne correspondante.
* Sinon, il affiche un message d'erreur : `"Élève non répertorié"`.



---

#### **1. Décomposition Modulaire**

* **`saisir_taille(min_v, max_v)` [Fonction] :** Contrôle de $N$.
* **`recherche_sequentielle(T, n, val)` [Fonction] :** Recherche `val` dans $T$ et retourne son indice ou `-1`.
* **`saisir_donnees(IDs, Moyennes, n)` [Procédure] :** Remplit les deux tableaux avec contrôle d'unicité de l'ID via `recherche_sequentielle`.
* **`afficher_annuaire(IDs, Moyennes, n)` [Procédure] :** Affiche le registre élément par élément.

---

#### **2. Algorithmes des Modules **

```text
// 1. Fonction Recherche Séquentielle
Fonction recherche_sequentielle (T : Tableau de N Entier, n : Entier, val : Entier) : Entier
DÉCLARATION DES OBJETS LOCAUX
    i, pos : Entier
    trouve : Booléen
DEBUT
    i ← 0
    trouve ← Faux
    pos ← -1
    Tant que (i < n ET trouve = Faux) Faire
        Si (T[i] = val) Alors
            trouve ← Vrai
            pos ← i
        Sinon
            i ← i + 1
        FinSi
    Fin Tant que
    Retourner pos
FIN

// 2. Procédure Saisie des Données avec unicité
Procédure saisir_donnees (@IDs : Tableau de N Entier, @Moyennes : Tableau de N Réel, n : Entier)
DÉCLARATION DES OBJETS LOCAUX
    i, id_saisi : Entier
DEBUT
    Pour i de 0 à n - 1 Faire
        Répéter
            Écrire("ID Élève N° ", i + 1, " (> 0) : ")
            Lire(id_saisi)
        Jusqu'à (id_saisi > 0 ET recherche_sequentielle(IDs, i, id_saisi) = -1)
        IDs[i] ← id_saisi
        
        Répéter
            Écrire("Moyenne de l'élève ID ", IDs[i], " (0 à 20) : ")
            Lire(Moyennes[i])
        Jusqu'à (0.0 ≤ Moyennes[i] ET Moyennes[i] ≤ 20.0)
    Fin Pour
FIN

```

---

#### **3. Algorithme du Programme Principal & TDO**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre d'élèves enregistrés |
| `IDs` | Tableau de `N` Entier | Identifiants uniques des élèves |
| `Moyennes` | Tableau de `N` Réel | Moyennes scolaires des élèves |
| `id_cherche` | Entier | ID saisi par l'utilisateur à rechercher |
| `idx_trouve` | Entier | Position de l'élève trouvé dans les tableaux (ou `-1`) |

```text
ALGORITHME Registre_Eleves_Recherche
DEBUT
    n ← saisir_taille(3, 25)
    saisir_donnees(IDs, Moyennes, n)
    
    Écrire_nl("=== RECHERCHE D'UN ÉLÈVE ===")
    Écrire("Entrez l'ID de l'élève à rechercher : ")
    Lire(id_cherche)
    
    idx_trouve ← recherche_sequentielle(IDs, n, id_cherche)
    
    Si (idx_trouve ≠ -1) Alors
        Écrire("Élève trouvé à la position N° ", idx_trouve + 1)
        Écrire("ID      : ", IDs[idx_trouve])
        Écrire("Moyenne : ", Moyennes[idx_trouve], " / 20")
    Sinon
        Écrire("Erreur : Aucun élève ne possède l'ID ", id_cherche)
    FinSi
FIN

```

---

#### **4. Implémentation Python (Python IDE)**

```python
# =========================================================
# Programme : Recherche Séquentielle dans un Registre Élèves
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from numpy import array

# 1. Fonction de contrôle de taille N
def saisir_taille(min_v, max_v):
    taille = int(input("Nombre d'élèves à enregistrer (" + str(min_v) + " à " + str(max_v) + ") : "))
    while not (min_v <= taille <= max_v):
        taille = int(input("Invalide ! Saisir N entre " + str(min_v) + " et " + str(max_v) + " : "))
    return taille

# 2. Fonction de Recherche Sequentielle Officielle (Sans break)
def recherche_sequentielle(T, n, val):
    i = 0
    trouve = False
    pos = -1
    while i < n and not trouve:
        if T[i] == val:
            trouve = True
            pos = i
        else:
            i += 1
    return pos

# 3. Procedure de saisie controlee avec garantie d'unicite
def saisir_donnees(IDs, Moyennes, n):
    print("\n--- Saisie des élèves ---")
    for i in range(n):
        id_saisi = int(input("ID de l'élève N° " + str(i + 1) + " (> 0) : "))
        # Verification d'unicite : l'ID ne doit pas exister dans IDs[0..i-1]
        while id_saisi <= 0 or recherche_sequentielle(IDs, i, id_saisi) != -1:
            id_saisi = int(input("ID invalide ou déjà existant ! Donner un ID unique > 0 : "))
        IDs[i] = id_saisi
        
        moy = float(input("Moyenne de l'élève ID " + str(IDs[i]) + " (0 à 20) : "))
        while not (0.0 <= moy <= 20.0):
            moy = float(input("Invalide ! Donner une moyenne entre 0 et 20 : "))
        Moyennes[i] = moy

# =========================================================
# PROGRAMME PRINCIPAL
# =========================================================

n = saisir_taille(3, 25)

IDs = array([0] * n)
Moyennes = array([float()] * n)

saisir_donnees(IDs, Moyennes, n)

# Recherche d'un eleve par son ID
print("\n=== RECHERCHE D'UN ÉLÈVE DANS LE REGISTRE ===")
id_cherche = int(input("Entrez l'ID de l'élève à chercher : "))

idx = recherche_sequentielle(IDs, n, id_cherche)

if idx != -1:
    print("\n✅ Élève trouvé !")
    print("Position dans le registre :", idx + 1)
    print("ID                         :", IDs[idx])
    print("Moyenne scolaire           :", Moyennes[idx], "/ 20")
else:
    print("\n❌ Erreur : Aucun élève trouvé avec l'ID", id_cherche)

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Écrire la boucle `while i < n and not trouve:` pour effectuer la recherche sans `break`.
* [x] Retourner l'indice de l'élément trouvé ou la valeur sentinelle `-1` en cas d'absence.
* [x] Utiliser la recherche séquentielle pour vérifier l'unicité d'un identifiant lors de la saisie.
* [x] Accéder aux données de deux tableaux synchrones à partir du même indice `idx` trouvé.