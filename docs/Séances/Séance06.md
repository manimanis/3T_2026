# 📖 Fiche de Séance N°6 : Traitements Élémentaires sur les Tableaux 1D

**Module 2 :** Structures de Contrôle et de Données Avancées

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Python / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Connaître les motifs algorithmiques classiques appliqués aux tableaux 1D :
* Calculs cumulatifs : **somme** et **moyenne** des éléments.
* Recherche d'extrémums : **valeur maximale** et **valeur minimale** (avec détection de leurs positions).
* **Comptage conditionnel** : nombre d'éléments vérifiant une condition donnée (ex. notes $\ge 10$, températures négatives).



### **B. Savoir-faire (Compétences pratiques)**

* Initialiser correctement les accumulateurs et variables de recherche d'extrémums (ex. `max_val ← T[0]`).
* Parcourir un tableau `numpy` pour effectuer des calculs statistiques simples en un ou plusieurs passages.
* Implémenter et tester ces traitements sous Python sans utiliser les fonctions intégrées de haut niveau de Python (`sum()`, `max()`, `min()`) afin d'assimiler la logique algorithmique fondamentale du parcours.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Rappel & Problématisation** | 10 min | Rappeler la saisie d'un tableau et poser la question : Comment trouver la meilleure note d'une classe stockée dans un tableau ? | Proposer d'initialiser le max au 1er élément et de comparer avec les suivants. | Tableau |
| **2. Synthèse Théorique** | 20 min | Présentation des schémas algorithmiques de cumul (somme/moyenne), de recherche du Max/Min et de comptage conditionnel. | Prise de notes et analyse des conditions d'initialisation (`somme ← 0`, `max ← T[0]`). | ProProjecteur / Fiche |
| **3. Activité Guidée** | 45 min | Présentation de l'activité pratique intégrée (Analyse statistique des notes d'un devoir). Encadrement de l'analyse, TDO et algorithme. | Élaboration du TDO, rédaction de l'algorithme complet et codage sous Thonny. | Ordinateur (Python IDE) |
| **4. Évaluation Formative** | 15 min | Vérification de la cohérence des résultats statistiques avec des jeux de données variés (ex: notes toutes égales). | Correction des initialisations erronées (ex: initialiser `max` à 0 au lieu de `T[0]`). | Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Motif 1 : Somme et Moyenne d'un Tableau**

Pour calculer la somme des éléments d'un tableau $T$ de taille $N$ :

1. Initialiser la variable `somme` à `0.0`.
2. Parcourir le tableau de l'indice `0` à `N - 1` en ajoutant chaque élément `T[i]` à `somme`.
3. Calculer $moyenne = \frac{somme}{N}$.

```text
somme ← 0.0
Pour i de 0 à n - 1 Faire
    somme ← somme + T[i]
Fin Pour
moyenne ← somme / n

```

---

### **II. Motif 2 : Recherche de la Valeur Maximale / Minimale**

> 💡 **Règle d'or :** Ne jamais initialiser le `Max` à `0` (car si tous les éléments du tableau sont négatifs, le résultat sera faux). On l'initialise toujours au **premier élément du tableau (`T[0]`)**.

```text
max_val ← T[0]
pos_max ← 0

Pour i de 1 à n - 1 Faire
    Si (T[i] > max_val) Alors
        max_val ← T[i]
        pos_max ← i
    FinSi
Fin Pour

```

---

### **III. Motif 3 : Comptage Conditionnel**

Pour compter les éléments satisfaisant un critère (ex. nombre d'éléments supérieurs ou égaux à un seuil) :

```text
nb_admis ← 0
Pour i de 0 à n - 1 Faire
    Si (T[i] ≥ 10.0) Alors
        nb_admis ← nb_admis + 1
    FinSi
Fin Pour

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Analyse de Bug d'Initialisation (10 min)**

*Énoncé :* Pourquoi le script Python suivant donne-t-il un résultat **incorrect** si le tableau contient uniquement des températures négatives : `T = [-5.5, -12.0, -2.3, -8.1]` ?

```python
# Code comportant un bug d'initialisation
max_temp = 0.0  # ERREUR !
for i in range(len(T)):
    if T[i] > max_temp:
        max_temp = T[i]
print("Température max :", max_temp)

```

* **Explication :** `0.0` étant supérieur à toutes les températures négatives (`-2.3`, etc.), la condition `T[i] > 0.0` ne sera jamais vraie, et le programme affichera à tort `0.0`.
* **Correction :** `max_temp = T[0]` (initialisation sur la première valeur réelle du tableau).

---

### **Activité 2 : Résolution d'un Problème Complet (35 min)**

#### **Énoncé du problème :**

Un enseignant d'informatique souhaite effectuer l'**analyse statistique des notes** obtenues par une classe de $N$ élèves ($5 \le N \le 30$) lors d'un devoir pratique.

Le programme doit :

1. Saisir le nombre d'élèves $N$ ($5 \le N \le 30$).
2. Remplir un tableau `Notes` avec les notes des élèves (valeurs réelles comprises entre $0.0$ et $20.0$).
3. Calculer et afficher :
* La **moyenne de la classe**.
* La **note maximale** et la **note minimale** de la classe.
* Le **nombre d'élèves ayant obtenu la moyenne** ($\ge 10.0$).
* Le **taux de réussite** de la classe en pourcentage ($\% = \frac{nb\_admis}{N} \times 100$).



---

#### **1. Analyse du Problème**

* **Données d'entrée (Entrées) :**
* Nombre d'élèves (`n` : Entier, contrôlé entre 5 et 30)
* Notes des élèves (`Notes` : Tableau de $N$ Réels dans $[0.0, 20.0]$)


* **Données de sortie (Sorties) :**
* Moyenne générale (`moy` : Réel)
* Note max (`max_note` : Réel) et Note min (`min_note` : Réel)
* Nombre d'admis (`nb_admis` : Entier)
* Taux de réussite (`taux` : Réel)


* **Traitements :**
1. Contrôler la saisie de $N$ ($5 \le N \le 30$).
2. Remplir `Notes[i]` avec contrôle de saisie ($0.0 \le Notes[i] \le 20.0$).
3. Calculer la somme, trouver le Max/Min et compter les admis en un seul parcours.



---

#### **2. Tableau de Déclaration des Objets (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre d'élèves ($5 \le N \le 30$) |
| `i` | Entier | Compteur d'indice ($0 \le i < N$) |
| `Notes` | Tableau de `N` Réel | Stockage des notes de la classe |
| `somme` | Réel | Accumulateur pour la moyenne |
| `moy` | Réel | Moyenne générale calculée |
| `max_note` | Réel | Note la plus élevée |
| `min_note` | Réel | Note la plus basse |
| `nb_admis` | Entier | Compteur d'élèves ayant une note $\ge 10.0$ |
| `taux` | Réel | Pourcentage d'élèves ayant la moyenne |

---

#### **3. AlgorithmeConventions**

```text
ALGORITHME Analyse_Notes_Classe
DEBUT
    Répéter
        Écrire("Donner le nombre d'élèves (5 à 30) : ")
        Lire(n)
    Jusqu'à (5 ≤ n ET n ≤ 30)
    
    // Remplissage avec contrôle de chaque note
    Pour i de 0 à n - 1 Faire
        Répéter
            Écrire("Note de l'élève N° ", i + 1, " (0 à 20) : ")
            Lire(Notes[i])
        Jusqu'à (0.0 ≤ Notes[i] ET Notes[i] ≤ 20.0)
    Fin Pour
    
    // Initialisations des statistiques
    somme ← Notes[0]
    max_note ← Notes[0]
    min_note ← Notes[0]
    
    Si (Notes[0] ≥ 10.0) Alors
        nb_admis ← 1
    Sinon
        nb_admis ← 0
    FinSi
    
    // Parcours à partir du deuxième élément (indice 1)
    Pour i de 1 à n - 1 Faire
        somme ← somme + Notes[i]
        
        Si (Notes[i] > max_note) Alors
            max_note ← Notes[i]
        FinSi
        
        Si (Notes[i] < min_note) Alors
            min_note ← Notes[i]
        FinSi
        
        Si (Notes[i] ≥ 10.0) Alors
            nb_admis ← nb_admis + 1
        FinSi
    Fin Pour
    
    moy ← somme / n
    taux ← (nb_admis / n) * 100
    
    // Affichage des résultats
    Écrire("=== STATISTIQUES DE LA CLASSE ===")
    Écrire("Moyenne générale : ", moy)
    Écrire("Note Maximale    : ", max_note)
    Écrire("Note Minimale    : ", min_note)
    Écrire("Nombre d'admis   : ", nb_admis, " / ", n)
    Écrire("Taux de réussite : ", taux, " %")
FIN

```

---

#### **4. Implémentation Python (Python IDE)**

```python
# =========================================================
# Programme : Analyse Statistique des Notes d'une Classe
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from numpy import array

# 1. Controle de la taille N
n = int(input("Donner le nombre d'élèves (5 à 30) : "))
while not (5 <= n <= 30):
    n = int(input("Invalide ! Saisir N entre 5 et 30 : "))

Notes = array([float()] * n)

# 2. Saisie controlee des notes
print("\n--- Saisie des notes ---")
for i in range(n):
    note = float(input("Note de l'élève N° " + str(i + 1) + " (0 à 20) : "))
    while not (0.0 <= note <= 20.0):
        note = float(input("Note invalide ! Donner une note entre 0 et 20 : "))
    Notes[i] = note

# 3. Traitements statistiques
somme = Notes[0]
max_note = Notes[0]
min_note = Notes[0]

if Notes[0] >= 10.0:
    nb_admis = 1
else:
    nb_admis = 0

for i in range(1, n):
    somme += Notes[i]
    
    if Notes[i] > max_note:
        max_note = Notes[i]
        
    if Notes[i] < min_note:
        min_note = Notes[i]
        
    if Notes[i] >= 10.0:
        nb_admis += 1

moy = somme / n
taux = (nb_admis / n) * 100

# 4. Affichage des resultats
print("\n=== STATISTIQUES DE LA CLASSE ===")
print("Moyenne générale :", round(moy, 2), "/ 20")
print("Note Maximale    :", max_note, "/ 20")
print("Note Minimale    :", min_note, "/ 20")
print("Nombre d'admis   :", nb_admis, "/", n)
print("Taux de réussite :", round(taux, 1), "%")

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Initialiser `max` et `min` avec le premier élément du tableau (`T[0]`) et non avec $0$.
* [x] Accumuler la somme des éléments dans une boucle de parcours complète.
* [x] Associer une condition de filtrage dans une boucle pour compter les éléments répondant à un critère.
* [x] Calculer un pourcentage ou un taux sans risquer la division par zéro.