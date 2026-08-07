# 📖 Fiche de Séance N°8 : Paramètres, Valeurs de Retour & Portée des Variables

**Module 3 :** Modularité et Décomposition Algorithmique

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Comprendre la différence entre **variable locale** (créée à l'intérieur d'un module et détruite à sa fin) et **variable globale** (déclarée dans le programme principal).
* Connaître les deux modes de passage de paramètres :
* **Passage par Valeur :** Le module reçoit une copie de la donnée (les modifications locales n'affectent pas la variable du programme principal).
* **Passage par Référence :** Le module agit directement sur la variable d'origine (indiqué par le symbole **`@`** en algorithmique).


* Connaître les spécificités du langage Python :
* Les types simples (`int`, `float`, `str`, `bool`) sont passés par valeur.
* Les objets structurés (`numpy.array`, `dict`, fichiers) sont **passés par référence par défaut**.
* Le mot-clé **`global`** permet de modifier une variable globale dans un module.



### **B. Savoir-faire (Compétences pratiques)**

* Identifier la portée (*scope*) de chaque variable dans un programme modulaire.
* Éviter les effets de bord indésirables en choisissant le bon mode de transmission.
* 🚫 **Règle Ministérielle Stricte :** Si une variable globale est précédée du mot-clé `global` dans un module Python, **elle ne doit pas figurer dans la liste des paramètres de ce module**.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 15 min | Exécuter un script où une variable modifiée dans une fonction garde sa valeur initiale dans le programme principal. | Constate que la variable du programme principal n'a pas changé et cherche l'explication. | ProProjecteur / Tableau |
| **2. Synthèse Théorique** | 25 min | Explication des concepts : Portée locale vs globale, passage par valeur vs par référence (`@`), et rôle du mot-clé `global` en Python. | Prise de notes et analyse du tableau comparatif des modes de passage. | Fiche de cours |
| **3. Activité Guidée** | 35 min | Proposer la résolution d'un problème de conversion de temps et de permutation de variables. | Analyse, élaboration du TDO/TDL, écriture des algorithmes et codage sous Thonny. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Test de prédiction d'affichage sur des scripts modulaires avec variables locales/globales. | Correction des erreurs de portée et validation des programmes sur machine. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Portée des Variables : Locale vs Globale**

```text
+-------------------------------------------------------+
| PROGRAMME PRINCIPAL                                   |
| Variable Globale X = 100                              |
|                                                       |
|   +-----------------------------------------------+   |
|   | MODULE (Fonction / Procédure)                 |   |
|   | Variable Locale Y = 5                         |   |
|   | (Inaccessible en dehors du module)            |   |
|   +-----------------------------------------------+   |
+-------------------------------------------------------+

```

1. **Variable Locale :** Déclarée à l'intérieur d'un module. Son existence est limitée à l'exécution de ce module. Elle est invisible pour le programme principal.
2. **Variable Globale :** Déclarée dans le programme principal. Elle est accessible dans tout le programme.

---

### **II. Modes de Passage de Paramètres**

#### **1. Passage par Valeur (Par Défaut pour les Types Simples)**

* Le paramètre effectif transmet une **copie** de sa valeur au paramètre formel.
* Toute modification du paramètre formel dans le module **n'impacte pas** la variable du programme principal.

#### **2. Passage par Référence (Par Adresse)**

* Le paramètre effectif transmet l'**adresse mémoire** de la variable.
* Toute modification effectuée par le module **modifie directement** la variable d'origine.
* **En Algorithmique :** Indiqué par le symbole **`@`** devant le paramètre.

```text
-- Algorithme
Procédure Incrementer (@x : Entier)
DEBUT
    x ← x + 1
FIN

```

---

### **III. Spécificités de Python **

| Type de donnée en Python | Mode de passage par défaut | Comportement lors des modifications |
| --- | --- | --- |
| **Types simples** (`int`, `float`, `str`, `bool`) | **Par Valeur** | Modifications locales uniquement |
| **Tableaux** (`numpy.array`) | **Par Référence** | Modifications directes du tableau d'origine |
| **Dictionnaires** (`dict`) | **Par Référence** | Modifications directes du dictionnaire |

#### **Le Mot-Clé `global` en Python :**

Si un module doit modifier une variable globale de type simple, on utilise `global` :

```python
# Exemple conforme aux conventions ministérielles
compteur = 0  # Variable globale

def ajouter_visite():
    global compteur  # Déclaration de portée globale
    compteur += 1    # Modifie la variable globale du programme principal

# Appel
ajouter_visite()
print(compteur)  # Affiche 1

```

> ⚠️ **Règle officielle :** Une variable déclarée `global` dans un module **ne doit jamais être inscrite dans la liste des paramètres** de ce module.

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Prédiction d'Affichage & Portée (10 min)**

*Énoncé :* Déterminer ce qu'affiche le programme Python suivant, puis expliquer pourquoi la valeur de `x` ne change pas.

```python
def modifier(x):
    x = x + 10
    print("Dans la fonction, x =", x)

# Programme principal
x = 5
modifier(x)
print("Dans le programme principal, x =", x)

```

#### **Réponse :**

* **Affichage :**
```text
Dans la fonction, x = 15
Dans le programme principal, x = 5

```


* **Explication :** `x` étant de type simple (`int`), il est passé **par valeur**. La fonction travaille sur une copie locale. La variable `x` du programme principal reste égale à `5`.

---

### **Activité 2 : Résolution d'un Problème Modulaire Complet (35 min)**

#### **Énoncé du problème :**

On souhaite concevoir une application de **Conversion de Temps & Permutation** qui :

1. Saisit une durée totale exprimée en **secondes** (`duree_sec` : entier positif).
2. Fait appel à un module `convertir_temps` pour calculer le nombre d'**heures**, de **minutes** et de **secondes** correspondantes.
3. Fait appel à un module `permuter` pour échanger les valeurs de deux variables entières $A$ et $B$.
4. Affiche les résultats de manière structurée.

---

#### **1. Décomposition Modulaire**

* **Module `convertir_temps` (Procédure) :** Reçoit la durée totale en secondes `sec_totales` et calcule par référence `h` (heures), `m` (minutes) et `s` (secondes restantes).
* $h = sec\_totales \text{ Div } 3600$
* $reste = sec\_totales \text{ Mod } 3600$
* $m = reste \text{ Div } 60$
* $s = reste \text{ Mod } 60$


* **Module `permuter` (Procédure) :** Reçoit deux entiers `x` et `y` par référence et échange leurs valeurs.

---

#### **2. Algorithmes des Modules **

```text
// Procédure de conversion de temps
Procédure convertir_temps (sec_totales : Entier, @h : Entier, @m : Entier, @s : Entier)
DÉCLARATION DES OBJETS LOCAUX
    reste : Entier
DEBUT
    h ← sec_totales Div 3600
    reste ← sec_totales Mod 3600
    m ← reste Div 60
    s ← reste Mod 60
FIN

// Procédure de permutation de deux variables
Procédure permuter (@a : Entier, @b : Entier)
DÉCLARATION DES OBJETS LOCAUX
    aux : Entier
DEBUT
    aux ← a
    a ← b
    b ← aux
FIN

```

---

#### **3. Algorithme du Programme Principal & TDO**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `duree` | Entier | Durée totale en secondes saisie |
| `heures`, `minutes`, `secondes` | Entier | Valeurs converties |
| `v1`, `v2` | Entier | Deux valeurs à permuter |
| `convertir_temps` | Procédure | Module de conversion en h/m/s |
| `permuter` | Procédure | Module d'échange de deux entiers |

```text
ALGORITHME Conversion_Et_Permutation
DEBUT
    Répéter
        Écrire("Donner une durée en secondes (> 0) : ")
        Lire(duree)
    Jusqu'à (duree > 0)
    
    convertir_temps(duree, heures, minutes, secondes)
    
    Écrire(duree, " secondes = ", heures, " h : ", minutes, " m : ", secondes, " s")
    
    Écrire("Donner la valeur A : ")
    Lire(v1)
    Écrire("Donner la valeur B : ")
    Lire(v2)
    
    Écrire("Avant permutation : A = ", v1, ", B = ", v2)
    permuter(v1, v2)
    Écrire("Après permutation : A = ", v1, ", B = ", v2)
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

En Python, pour simuler le passage par référence de variables de type simple (`int`), une procédure peut retourner un **tuple de valeurs** :

```python
# =========================================================
# Programme : Conversion de Temps et Permutation
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

# Module 1 : Conversion de secondes en H : M : S
def convertir_temps(sec_totales):
    h = sec_totales // 3600
    reste = sec_totales % 3600
    m = reste // 60
    s = reste % 60
    return h, m, s  # Retourne les 3 valeurs calculées

# Module 2 : Permutation de deux variables
def permuter(a, b):
    aux = a
    a = b
    b = aux
    return a, b  # Retourne les valeurs permutes

# PROGRAMME PRINCIPAL
duree = int(input("Donner la durée totale en secondes (> 0) : "))
while duree <= 0:
    duree = int(input("Invalide ! Donner une durée > 0 : "))

# Appel du module de conversion
heures, minutes, secondes = convertir_temps(duree)
print(duree, "secondes =", heures, "h :", minutes, "min :", secondes, "s")

print("\n--- Test de Permutation ---")
v1 = int(input("Donner A : "))
v2 = int(input("Donner B : "))

print("Avant permutation : A =", v1, ", B =", v2)
v1, v2 = permuter(v1, v2)  # Affectation multiple
print("Après permutation : A =", v1, ", B =", v2)

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Identifier les variables locales d'un module et vérifier qu'elles ne sont pas utilisées dans le programme principal.
* [x] Utiliser le symbole `@` en algorithmique pour désigner un paramètre passé par référence.
* [x] Transmettre des résultats multiples en Python via un retour multiple (`return h, m, s`).
* [x] Vérifier qu'une variable modifiée par `global` ne figure pas dans la liste des paramètres du module.