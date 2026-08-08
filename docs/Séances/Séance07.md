# 📖 Fiche de Séance N°7 : Introduction à la Modularité (Fonctions et Procédures)

**Module 3 :** Modularité et Décomposition Algorithmique

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Python / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Comprendre l'intérêt de la **décomposition modulaire** (approche descendante / *Top-Down*) : lisibilité, réutilisabilité du code, facilité de tests et de maintenance.
* Différencier les deux types de modules :
* **La Fonction :** Un sous-programme qui effectue des calculs et **retourne un seul résultat de type simple** (`Entier`, `Réel`, `Booléen`, `Caractère`, `Chaîne`).
* **La Procédure :** Un sous-programme qui réalise un traitement (ex. saisie, affichage, modification d'une structure) **sans retourner directement de valeur unique**.


* Distinguer les **paramètres formels** (dans la définition du module) des **paramètres effectifs** (lors de l'appel).

### **B. Savoir-faire (Compétences pratiques)**

* Décomposer un problème global en blocs fonctionnels autonomes.
* Écrire la déclaration algorithmique et la syntaxe Python (`def`) des fonctions et procédures.
* Effectuer des appels de modules corrects dans le programme principal en respectant le nombre, l'ordre et les types des paramètres.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 10 min | Présenter un programme monolithe de 60 lignes mélangées. Montrer la difficulté de relecture et de correction. | Constate le manque de structure et exprime le besoin de diviser le code en tâches. | Tableau / ProProjecteur |
| **2. Synthèse Théorique** | 25 min | Explication de la modularité, des fonctions (`Retourner` / `return`) et des procédures. Distinction `print` vs `return`. | Prise de notes et assimilation des syntaxes officielles de déclaration et d'appel. | Fiche de cours |
| **3. Activité Guidée** | 40 min | Présentation du problème pratique (Analyse géométrique d'un rectangle). Encadrement de la décomposition modulaire. | Rédaction des analyses des modules, TDO/TDL, algorithmes et codage sous Thonny. | Ordinateur (Python IDE) |
| **4. Évaluation Formative** | 15 min | Vérification des appels de modules, détection des erreurs de retour (`NoneType`) et de concordance de paramètres. | Correction des erreurs d'appel et validation de l'exécution modulaire. | Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Pourquoi la Modularité ?**

La décomposition modulaire consiste à découper un problème complexe en plusieurs sous-problèmes plus simples appelés **modules** (ou sous-programmes).

* **Avantages :** Code plus clair, réutilisation de modules (ex. fonctions mathématiques), débuggage ciblé, travail collaboratif.

---

### **II. Notions de Paramètres**

* **Paramètres Formels (pf) :** Variables fictives figurant dans l'en-tête de la définition du module.
* **Paramètres Effectifs (pe) :** Valeurs ou variables réelles transmises lors de l'appel du module depuis le programme principal.

---

### **III. La Fonction**

Une **Fonction** calcule et renvoie un **seul résultat de type simple**. Elle s'achève obligatoirement par l'instruction `Retourner` (en algorithmique) ou `return` (en Python).

#### **1. Syntaxe Algorithmique**

```text
Fonction Nom_Fonction (pf1 : Type1, pf2 : Type2) : Type_Résultat
DEBUT
    // Traitements
    Retourner Résultat
FIN

```

#### **2. Syntaxe Python**

```python
def nom_fonction(pf1, pf2):
    # Traitements
    return resultat

```

#### **3. Appel d'une Fonction**

Une fonction s'appelle **dans une expression**, une affectation ou un affichage :

* `y ← Nom_Fonction(pe1, pe2)`
* `Écrire(Nom_Fonction(pe1, pe2))`

---

### **IV. La Procédure**

Une **Procédure** réalise un ensemble de traitements (affichage, saisie, modification) sans retourner une valeur par l'instruction `return`.

#### **1. Syntaxe Algorithmique**

```text
Procédure Nom_Procedure (pf1 : Type1, @pf2 : Type2)
DEBUT
    // Traitements (ex: Écrire, Lire, Affichage)
FIN

```

*(Note : Le symbole `@` indique un passage par référence lorsque le paramètre est modifié par la procédure).*

#### **2. Syntaxe Python**

```python
def nom_procedure(pf1, pf2):
    # Traitements (pas de return)
    print("Message :", pf1)

```

#### **3. Appel d'une Procédure**

Une procédure s'appelle comme une **instruction autonome** :

* `Nom_Procedure(pe1, pe2)`

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Distinction Cruciale entre `print()` et `return` (10 min)**

*Énoncé :* L'élève doit expliquer pourquoi le programme suivant affiche `None` et corriger la fonction.

```python
# Code incorrect
def carre(x):
    res = x * x
    print(res)  # ERREUR : La fonction affiche au lieu de retourner

# Programme principal
a = 5
b = carre(a) + 10  # TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'
print(b)

```

#### **Correction Conforme :**

```python
def carre(x):
    res = x * x
    return res  # Correct : retourne la valeur calculée

# Programme principal
a = 5
b = carre(a) + 10  # Fonctionne correctement (25 + 10 = 35)
print("Résultat :", b)

```

---

### **Activité 2 : Résolution d'un Problème Modulaire Complet (35 min)**

#### **Énoncé du problème :**

On souhaite concevoir une application d'**Analyse Géométrique d'un Rectangle** qui :

1. Saisit la largeur $L$ et la longueur $H$ (avec $0 < L \le H$).
2. Calcule le **périmètre** du rectangle via une fonction `perimetre`.
3. Calcule la **surface** du rectangle via une fonction `surface`.
4. Calcule la **diagonale** du rectangle ($D = \sqrt{L^2 + H^2}$) via une fonction `diagonale` (utilisant `sqrt` du module `math`).
5. Affiche un **bilan géométrique complet** via une procédure `afficher_bilan`.

---

#### **1. Décomposition Modulaire du Problème**

* **Module `saisir_dimensions` (Procédure) :** Saisit et valide $L$ et $H$ tels que $0 < L \le H$.
* **Module `perimetre` (Fonction) :** Prends $L$ et $H$, retourne le périmètre ($2 \times (L + H)$).
* **Module `surface` (Fonction) :** Prends $L$ et $H$, retourne la surface ($L \times H$).
* **Module `diagonale` (Fonction) :** Prends $L$ et $H$, retourne la diagonale ($\sqrt{L^2 + H^2}$).
* **Module `afficher_bilan` (Procédure) :** Reçoit $L, H, p, s, d$ et affiche le rapport détaillé.

---

#### **2. Algorithmes des Modules **

```text
// 1. Fonction Périmètre
Fonction perimetre (l : Réel, h : Réel) : Réel
DEBUT
    Retourner 2 * (l + h)
FIN

// 2. Fonction Surface
Fonction surface (l : Réel, h : Réel) : Réel
DEBUT
    Retourner l * h
FIN

// 3. Fonction Diagonale
Fonction diagonale (l : Réel, h : Réel) : Réel
DEBUT
    Retourner RacineCarré(l * l + h * h)
FIN

// 4. Procédure d'affichage
Procédure afficher_bilan (l : Réel, h : Réel, p : Réel, s : Réel, d : Réel)
DEBUT
    Écrire("=== BILAN GÉOMÉTRIQUE DU RECTANGLE ===")
    Écrire("Largeur   : ", l)
    Écrire("Longueur  : ", h)
    Écrire("Périmètre : ", p)
    Écrire("Surface   : ", s)
    Écrire("Diagonale : ", d)
FIN

```

---

#### **3. Algorithme du Programme Principal & TDO**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `larg`, `long` | Réel | Dimensions saisies du rectangle |
| `p`, `s`, `d` | Réel | Résultats des calculs de périmètre, surface et diagonale |
| `perimetre` | Fonction | Module de calcul du périmètre |
| `surface` | Fonction | Module de calcul de la surface |
| `diagonale` | Fonction | Module de calcul de la diagonale |
| `afficher_bilan` | Procédure | Module d'affichage des résultats |

```text
ALGORITHME Geometrie_Rectangle
DEBUT
    Répéter
        Écrire("Donner la largeur (> 0) : ")
        Lire(larg)
        Écrire("Donner la longueur (≥ largeur) : ")
        Lire(long)
    Jusqu'à (larg > 0 ET long ≥ larg)
    
    p ← perimetre(larg, long)
    s ← surface(larg, long)
    d ← diagonale(larg, long)
    
    afficher_bilan(larg, long, p, s, d)
FIN

```

---

#### **4. Implémentation Python (Python IDE)**

```python
# =========================================================
# Programme : Analyse Géométrique d'un Rectangle (Modulaire)
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from math import sqrt

# Definition des fonctions et procedures
def perimetre(l, h):
    return 2 * (l + h)

def surface(l, h):
    return l * h

def diagonale(l, h):
    return sqrt(l**2 + h**2)

def afficher_bilan(l, h, p, s, d):
    print("\n=== BILAN GÉOMÉTRIQUE DU RECTANGLE ===")
    print("Largeur   :", l, "m")
    print("Longueur  :", h, "m")
    print("Périmètre :", round(p, 2), "m")
    print("Surface   :", round(s, 2), "m²")
    print("Diagonale :", round(d, 2), "m")

# PROGRAMME PRINCIPAL
print("--- Saisie des dimensions ---")
larg = float(input("Donner la largeur (m) : "))
long = float(input("Donner la longueur (m) : "))

while not (larg > 0 and long >= larg):
    print("Invalide ! La largeur doit être > 0 et la longueur >= largeur.")
    larg = float(input("Donner la largeur (m) : "))
    long = float(input("Donner la longueur (m) : "))

# Appels des modules
p = perimetre(larg, long)
s = surface(larg, long)
d = diagonale(larg, long)

# Affichage via la procédure
afficher_bilan(larg, long, p, s, d)

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Choisir entre une **Fonction** (calcul avec `return`) et une **Procédure** (action/affichage sans `return`).
* [x] Respecter le nombre, l'ordre et le type des paramètres lors de l'appel d'un module.
* [x] Éviter d'utiliser `print()` à l'intérieur d'une fonction devant retourner un résultat numérique.
* [x] Structurer un programme Python avec les définitions de modules `def` au début du fichier.