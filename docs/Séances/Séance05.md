# 📖 Fiche de Séance N°5 : Tableaux à 1 Dimension (1D) – Déclaration, Saisie & Parcours

**Module 2 :** Structures de Contrôle et de Données Avancées

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Comprendre le concept de **tableau à une dimension** comme une structure de données **homogène** (éléments de même type) et **statique** (taille fixée lors de la création).
* Maîtriser la déclaration algorithmique d'un tableau 1D : `T : Tableau de N Type_élément`.
* Maîtriser la déclaration en Python à l'aide de la bibliothèque **`numpy`** (`from numpy import array`).
* Connaître la règle sur les indices : le premier élément d'un tableau a l'indice **0** et le dernier a l'indice **$N - 1$**.

### **B. Savoir-faire (Compétences pratiques)**

* Effectuer le contrôle de saisie de la taille $N$ d'un tableau ($N_{min} \le N \le N_{max}$).
* Remplir (saisir) un tableau 1D élément par élément à l'aide d'une boucle `Pour` / `for`.
* 🚫 **Règle Ministérielle Stricte :** L'affichage d'un tableau `T` en Python doit **obligatoirement se faire élément par élément** (`for i in range(n): print(T[i])`) et **jamais** via l'instruction directe `print(T)`.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 10 min | Demander comment stocker les températures de 30 jours sans déclarer 30 variables différentes (`t1`, `t2`, ...). | Constate la nécessité d'une structure groupée indexée. | Tableau |
| **2. Synthèse Théorique** | 25 min | Présentation de la structure Tableau 1D, des indices (0 à $N-1$) et de la déclaration Python avec `numpy.array`. | Prise de notes et assimilation des règles de la bibliothèque `numpy`. | ProProjecteur / Fiche |
| **3. Activité Guidée** | 40 min | Présentation du problème pratique (Gestionnaire de températures station météo). Encadrement de l'analyse, TDO et algorithme. | Élaboration de l'analyse, du TDO, écriture de l'algorithme et codage sous Thonny. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Vérification de la conformité de l'affichage (élément par élément) et du contrôle de la taille $N$. | Correction des erreurs d'indices (`IndexError`) et validation du script. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Concept de Tableau à 1 Dimension**

Un tableau à 1 dimension est une suite de cases mémoire contiguës, identifiées par un même nom et accessibles individuellement grâce à un **indice** (index) scalaire.

* **Homogène :** Tous les éléments sont du même type (`Entier`, `Réel`, `Chaîne`, etc.).
* **Indexation :** Le 1er élément est à l'indice **`0`**, le $i^{\text{ème}}$ élément est **`T[i]`**, et le dernier est à l'indice **`N - 1`**.

```text
Indice  :    0       1       2       ...      N-1
          +-------+-------+-------+---------+-------+
Tableau T | T[0]  | T  | T  |   ...   | T[N-1]|
          +-------+-------+-------+---------+-------+

```

---

### **II. Déclaration Algorithmique & Python (`numpy`)**

Dans le système éducatif tunisien (2024-2025), les tableaux sont implémentés en Python à l'aide du module **`numpy`** :

| Type des éléments | Déclaration Algorithmique | Déclaration Python (`numpy`) |
| --- | --- | --- |
| **Entiers** | `T : Tableau de N Entier` | `T = array([0] * N)` |
| **Réels** | `T : Tableau de N Réel` | `T = array([float()] * N)` |
| **Chaînes de car.** | `T : Tableau de N Chaîne` | `T = array([''] * N, dtype='U20')` |
| **Booléens** | `T : Tableau de N Booléen` | `T = array([False] * N)` |

> ⚠️ **remarque :** Pour déclarer un tableau en Python, il faut d'abord importer le module : `from numpy import array`.

---

### **III. Les 3 Étapes Systématiques de Manipulation**

#### **1. Contrôle de la taille $N$**

```python
n = int(input("Donner la taille du tableau (3 à 30) : "))
while not (3 <= n <= 30):
    n = int(input("Taille invalide ! Donner N entre 3 et 30 : "))

```

#### **2. Saisie / Remplissage du Tableau**

```python
for i in range(n):
    T[i] = float(input("Donner T[" + str(i) + "] : "))

```

#### **3. Affichage Élement par Élement (Obligatoire)**

```python
print("Contenu du tableau :")
for i in range(n):
    print("T[", i, "] =", T[i])

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Détection & Correction d'Erreurs Complètes (10 min)**

*Énoncé :* Corriger le script Python suivant qui contient 3 erreurs fréquentes commises par les élèves.

```python
# Code comportant des erreurs
T = [0] * 10
n = int(input("Taille : "))

for i in range(1, n + 1):
    T[i] = input("Val : ")

print(T)  # Erreur d'affichage

```

#### **Correction Conforme aux Normes 2024-2025 :**

```python
from numpy import array

# 1. Utilisation obligatoire de numpy.array
n = int(input("Taille (1 à 10) : "))
while not (1 <= n <= 10):
    n = int(input("Taille invalide (1 à 10) : "))

T = array([0] * n)

# 2. Les indices vont de 0 à n-1
for i in range(n):
    T[i] = int(input("Donner T[" + str(i) + "] : "))

# 3. Affichage élément par élément (NON pas print(T))
print("\nAffichage du tableau :")
for i in range(n):
    print("Élément N°", i, ":", T[i])

```

---

### **Activité 2 : Résolution d'un Problème Complet (30 min)**

#### **Énoncé du problème :**

Une station météorologique enregistre les températures quotidiennes relevées au cours d'une période de $N$ jours ($3 \le N \le 31$).
On demande d'écrire un programme qui :

1. Saisit le nombre de jours $N$ avec contrôle de saisie.
2. Remplit un tableau `Temp` contenant les $N$ températures relevées (valeurs réelles).
3. Affiche le bulletin météo complet sous forme d'un tableau récapitulatif listant chaque jour et sa température associée.

---

#### **1. Analyse du Problème**

* **Données d'entrée (Entrées) :**
* Nombre de jours (`n` : Entier, contrôlé entre 3 et 31)
* Températures quotidiennes (`Temp` : Tableau de $N$ Réels)


* **Données de sortie (Sorties) :**
* Affichage structuré jour par jour des températures


* **Traitements :**
1. Contrôler la saisie de $N$ : Répéter la saisie tant que $N < 3$ ou $N > 31$.
2. Déclarer le tableau `Temp` de $N$ réels.
3. Pour $i$ de $0$ à $N-1$ : Saisir `Temp[i]`.
4. Pour $i$ de $0$ à $N-1$ : Afficher Jour $i+1$ et `Temp[i]`.



---

#### **2. Tableau de Déclaration des Objets (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre de jours d'observation ($3 \le N \le 31$) |
| `i` | Entier | Compteur d'indice du tableau ($0 \le i < N$) |
| `Temp` | Tableau de `N` Réel | Stockage des $N$ températures relevées |

---

#### **3. Algorithme (Conventions Ministérielles 2024-2025)**

```text
ALGORITHME Station_Meteo
DEBUT
    Répéter
        Écrire("Donner le nombre de jours (3 à 31) : ")
        Lire(n)
    Jusqu'à (3 ≤ n ET n ≤ 31)
    
    Pour i de 0 à n - 1 Faire
        Écrire("Température du jour ", i + 1, " : ")
        Lire(Temp[i])
    Fin Pour
    
    Écrire_nl("=== BULLETIN MÉTÉO RÉCAPITULATIF ===")
    Pour i de 0 à n - 1 Faire
        Écrire("Jour ", i + 1, " : ", Temp[i], " °C")
    Fin Pour
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

```python
# =========================================================
# Programme : Relevé Météo Quotidien (Tableau 1D numpy)
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from numpy import array

# 1. Saisie et controle de la taille N
n = int(input("Donner le nombre de jours d'observation (3 à 31) : "))
while not (3 <= n <= 31):
    n = int(input("Invalide ! Saisir N entre 3 et 31 : "))

# 2. Declaration du tableau numpy de N réels
Temp = array([float()] * n)

# 3. Remplissage du tableau
print("\n--- Saisie des températures ---")
for i in range(n):
    Temp[i] = float(input("Température du jour " + str(i + 1) + " (°C) : "))

# 4. Affichage element par element (Conforme aux conventions)
print("\n=== BULLETIN MÉTÉO RÉCAPITULATIF ===")
for i in range(n):
    print("Jour", i + 1, ":", Temp[i], "°C")

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Importer correctement le module `array` de la bibliothèque `numpy`.
* [x] Déclarer un tableau 1D avec la bonne valeur initiale selon le type des éléments.
* [x] Utiliser les indices de `0` à `N - 1` sans dépasser la taille du tableau (`IndexError`).
* [x] Parcourir et afficher un tableau élément par élément au lieu d'utiliser `print(T)`.