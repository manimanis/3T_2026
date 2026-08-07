# 📖 Fiche de Séance N°9 : Modules Prédéfinis & Passage de Tableaux en Paramètres

**Module 3 :** Modularité et Décomposition Algorithmique

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Exploiter les modules et fonctions prédéfinies des bibliothèques standards :
* **Mathématiques (`math`) :** `sqrt(x)` (racine carrée), `floor(x)`, `ceil(x)`.
* **Génération Aléatoire (`random`) :** `randint(vi, vf)` (entier aléatoire dans $[vi, vf]$).
* **Fonctions sur Chaînes/Nombres :** `len(ch)`, `ch.find(ch1)`, `str(x)`, `ch.isdecimal()`, `int(ch)`, `float(ch)`, `ch[d:f]`, `ch.upper()`.


* Maîtriser la transmission d'un tableau à une dimension (`numpy.array`) comme paramètre d'un module personnel.
* Connaître la règle ministérielle : En Python, **un tableau `numpy` est transmis automatiquement par référence** (toute modification apportée aux éléments du tableau dans un module modifie directement le tableau d'origine du programme principal).

### **B. Savoir-faire (Compétences pratiques)**

* Écrire la signature et le corps de modules spécialisés dans le traitement de tableaux :
* Procédure de remplissage (manuel ou aléatoire avec `randint`).
* Procédure d'affichage élément par élément (`print(T[i])`).
* Fonction de recherche ou de calcul statistique sur un tableau.


* Agencer l'exécution d'un programme principal modulaire manipulant un ou plusieurs tableaux.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Rappel & Diagnostic** | 10 min | Rappeler comment remplir un tableau et introduire le remplissage aléatoire (`randint`) pour gagner du temps lors des tests. | Découvre l'intérêt de la génération automatique pour tester des tableaux de grande taille ($N = 50$). | Tableau / ProProjecteur |
| **2. Synthèse Théorique** | 25 min | Présentation des fonctions prédéfinies de l'Aide Pédagogique 2024-2025 et de la syntaxe de transmission d'un tableau `numpy` en paramètre. | Prise de notes sur les équivalences Algorithmique / Python et le passage par référence des tableaux. | Fiche de cours |
| **3. Activité Guidée** | 40 min | Présentation de l'activité pratique (Générateur et Analyseur de Notes avec extraction d'un second tableau). | Rédaction des analyses des modules, TDO/TDL, algorithmes et codage sous Thonny. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Test des scripts sur machine. Vérification que la modification du tableau dans la procédure impacte bien le programme principal. | Validation de l'exécution modulaire et correction des signatures de fonctions/procédures. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Les Modules Prédéfinis Importants (Conventions 2024-2025)**

| Domaine | En Algorithmique | En Python | Rôle / Exemple |
| --- | --- | --- | --- |
| **Mathématiques** | `RacineCarré(x)` | `sqrt(x)` *(de `math`)* | `from math import sqrt` $\rightarrow$ `sqrt(16)` $= 4.0$ |
| **Aléatoire** | `Aléa(vi, vf)` | `randint(vi, vf)` *(de `random`)* | `from random import randint` $\rightarrow$ `randint(1, 6)` |
| **Longueur Chaîne** | `Long(ch)` | `len(ch)` | `len("Python")` $= 6$ |
| **Recherche Substr** | `Pos(ch1, ch2)` | `ch2.find(ch1)` | `"informatique".find("info")` $= 0$ (ou $-1$ si absent) |
| **Test Numérique** | `Estnum(ch)` | `ch.isdecimal()` | `"123".isdecimal()` $= \text{True}$ |
| **Conversion Nombre** | `Convch(x)` | `str(x)` | `str(15.5)` $= \text{"15.5"}$ |
| **Majuscules** | `Majus(ch)` | `ch.upper()` | `"bac".upper()` $= \text{"BAC"}$ |

---

### **II. Passage d'un Tableau 1D (`numpy`) en Paramètre**

#### **1. En Algorithmique**

On indique le tableau dans la liste des paramètres. Pour une procédure de remplissage ou de modification, le passage par référence est marqué par `@` :

```text
Procédure Remplir_Aleatoire (@T : Tableau de N Entier, n : Entier)
DEBUT
    Pour i de 0 à n - 1 Faire
        T[i] ← Aléa(0, 20)
    Fin Pour
FIN

```

#### **2. En Python (`numpy.array`)**

En Python, les tableaux de la bibliothèque `numpy` sont **passés par référence par défaut**. Il n'est pas nécessaire d'utiliser de mot-clé spécial :

```python
def remplir_aleatoire(T, n):
    for i in range(n):
        T[i] = randint(0, 20)  # Modifie directement le tableau T dans le programme principal

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Application des Fonctions Prédéfinies (10 min)**

*Énoncé :* Écrire une fonction Python `generer_code_eleve(nom, annee)` qui prend le nom d'un élève (chaîne) et son année de naissance (entier), et retourne un code d'accès au format : **Majuscules(3 premières lettres du nom) + Année**.

*Exemple :* `generer_code_eleve("ben ali", 2008)` $\rightarrow$ `"BEN2008"`.

#### **Solution :**

```python
def generer_code_eleve(nom, annee):
    # Extraction des 3 premiers caractères et conversion en majuscules
    prefixe = nom[:3].upper()
    # Concaténation avec l'année convertie en chaîne
    code = prefixe + str(annee)
    return code

# Test
print(generer_code_eleve("ben ali", 2008))  # Affiche: BEN2008

```

---

### **Activité 2 : Résolution d'un Problème Modulaire Complet (35 min)**

#### **Énoncé du problème :**

On veut réaliser un **Générateur et Analyseur de Performances de Classe** :

1. Saisir le nombre d'élèves $N$ ($5 \le N \le 40$) via une fonction `saisir_taille`.
2. Générer automatiquement les notes de la classe (entiers entre $0$ et $20$) dans un tableau `T_notes` via une procédure `remplir_notes_aleatoires`.
3. Afficher les notes élément par élément via une procédure `afficher_tableau`.
4. Calculer la moyenne de la classe via une fonction `calculer_moyenne`.
5. Extraire toutes les notes supérieures ou égales à $10$ dans un second tableau `T_admis` et retourner sa taille $M$ via une procédure `extraire_admis`.

---

#### **1. Structure Modulaire du Problème**

* **`saisir_taille(min_val, max_val)` [Fonction] :** Saisit et retourne un entier $N \in [min\_val, max\_val]$.
* **`remplir_notes_aleatoires(T, n)` [Procédure] :** Remplit $T$ avec $N$ entiers tirés au sort entre $0$ et $20$ via `randint(0, 20)`.
* **`afficher_tableau(T, n, message)` [Procédure] :** Affiche un message d'en-tête puis les éléments du tableau $T$ de $0$ à $N-1$.
* **`calculer_moyenne(T, n)` [Fonction] :** Calcule et retourne la moyenne des éléments de $T$.
* **`extraire_admis(T_source, n, T_dest)` [Fonction] :** Copie les éléments de `T_source` $\ge 10$ dans `T_dest` et retourne le nombre d'admis $M$.

---

#### **2. Algorithmes des Modules (Conventions 2024-2025)**

```text
// 1. Fonction Saisir Taille
Fonction saisir_taille (min_v : Entier, max_v : Entier) : Entier
DEBUT
    Répéter
        Écrire("Donner la taille (", min_v, " à ", max_v, ") : ")
        Lire(taille)
    Jusqu'à (min_v ≤ taille ET taille ≤ max_v)
    Retourner taille
FIN

// 2. Procédure Remplir Randon
Procédure remplir_notes_aleatoires (@T : Tableau de N Entier, n : Entier)
DEBUT
    Pour i de 0 à n - 1 Faire
        T[i] ← Aléa(0, 20)
    Fin Pour
FIN

// 3. Procédure Afficher
Procédure afficher_tableau (T : Tableau de N Entier, n : Entier, msg : Chaîne)
DEBUT
    Écrire("=== ", msg, " ===")
    Pour i de 0 à n - 1 Faire
        Écrire("Élément [", i, "] = ", T[i])
    Fin Pour
FIN

// 4. Fonction Calculer Moyenne
Fonction calculer_moyenne (T : Tableau de N Entier, n : Entier) : Réel
DEBUT
    somme ← 0
    Pour i de 0 à n - 1 Faire
        somme ← somme + T[i]
    Fin Pour
    Retourner somme / n
FIN

// 5. Fonction Extraire Admis
Fonction extraire_admis (T_src : Tableau de N Entier, n : Entier, @T_dest : Tableau de N Entier) : Entier
DEBUT
    j ← 0
    Pour i de 0 à n - 1 Faire
        Si (T_src[i] ≥ 10) Alors
            T_dest[j] ← T_src[i]
            j ← j + 1
        FinSi
    Fin Pour
    Retourner j
FIN

```

---

#### **3. Algorithme du Programme Principal & TDO**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre total d'élèves de la classe |
| `m` | Entier | Nombre d'élèves admis (notes $\ge 10$) |
| `T_notes` | Tableau de `N` Entier | Tableau principal des notes |
| `T_admis` | Tableau de `N` Entier | Tableau secondaire contenant uniquement les notes $\ge 10$ |
| `moy_classe` | Réel | Moyenne générale calculée |

```text
ALGORITHME Analyse_Notes_Modulaire
DEBUT
    n ← saisir_taille(5, 40)
    remplir_notes_aleatoires(T_notes, n)
    afficher_tableau(T_notes, n, "NOTES GÉNÉRÉES DE LA CLASSE")
    
    moy_classe ← calculer_moyenne(T_notes, n)
    Écrire("Moyenne générale de la classe : ", moy_classe)
    
    m ← extraire_admis(T_notes, n, T_admis)
    afficher_tableau(T_admis, m, "LISTE DES NOTES DES ADMIS")
    Écrire("Nombre total d'admis : ", m, " / ", n)
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

```python
# =========================================================
# Programme : Générateur et Analyseur de Notes (Modulaire)
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from numpy import array
from random import randint

# 1. Fonction de saisie de taille
def saisir_taille(min_v, max_v):
    taille = int(input("Donner le nombre d'élèves (" + str(min_v) + " à " + str(max_v) + ") : "))
    while not (min_v <= taille <= max_v):
        taille = int(input("Invalide ! Recommencer (" + str(min_v) + " à " + str(max_v) + ") : "))
    return taille

# 2. Procedure de remplissage aleatoire
def remplir_notes_aleatoires(T, n):
    for i in range(n):
        T[i] = randint(0, 20)  # Tirage aleatoire entre 0 et 20

# 3. Procedure d'affichage element par element
def afficher_tableau(T, n, msg):
    print("\n=== " + msg + " ===")
    for i in range(n):
        print("Élément [" + str(i) + "] =", T[i])

# 4. Fonction de calcul de la moyenne
def calculer_moyenne(T, n):
    somme = 0
    for i in range(n):
        somme += T[i]
    return somme / n

# 5. Fonction d'extraction des admis
def extraire_admis(T_src, n, T_dest):
    j = 0
    for i in range(n):
        if T_src[i] >= 10:
            T_dest[j] = T_src[i]
            j += 1
    return j  # Retourne la taille effective M du tableau T_dest

# PROGRAMME PRINCIPAL
# A. Saisie de la taille N
n = saisir_taille(5, 40)

# B. Declaration des tableaux numpy
T_notes = array([0] * n)
T_admis = array([0] * n)

# C. Remplissage et Affichage
remplir_notes_aleatoires(T_notes, n)
afficher_tableau(T_notes, n, "NOTES GÉNÉRÉES DE LA CLASSE")

# D. Statistiques
moy_classe = calculer_moyenne(T_notes, n)
print("\nMoyenne générale de la classe :", round(moy_classe, 2), "/ 20")

# E. Extraction des admis dans un second tableau
m = extraire_admis(T_notes, n, T_admis)
afficher_tableau(T_admis, m, "LISTE DES NOTES DES ADMIS")
print("\nNombre total d'admis :", m, "/", n, "(" + str(round(m / n * 100, 1)) + "%)")

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Utiliser la fonction `randint(a, b)` du module `random` pour générer des données de test.
* [x] Transmettre un tableau `numpy` en paramètre d'un sous-programme sans redéclarer le tableau dans le module.
* [x] Comprendre que les modifications sur le tableau dans une procédure impactent directement le tableau du programme principal.
* [x] Gérer deux tableaux de tailles différentes (`N` et `M`) au sein d'un même programme modulaire.