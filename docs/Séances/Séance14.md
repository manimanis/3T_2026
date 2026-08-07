# 📖 Fiche de Séance N°14 : Tri d'un Tableau – Le Tri à Bulles

**Module 4 :** Algorithmes Classiques & Mini-Projets Python

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Comprendre le principe du **Tri à Bulles** (Bubble Sort) : comparer successivement les éléments adjacents $T[j]$ et $T[j+1]$ et les échanger (permuter) s'ils sont dans le mauvais ordre.
* Comprendre la dynamique du tri : à chaque passage $i$, le plus grand élément non encore trié « remonte comme une bulle » vers sa position définitive à la fin du tableau.
* Maîtriser le mécanisme de **permutation** (échange) de deux cases d'un tableau à l'aide d'une variable intermédiaire `aux`.

### **B. Savoir-faire (Compétences pratiques)**

* Implémenter la procédure `tri_a_bulles(T, n)` en ordre croissant ($T[j] > T[j+1]$) et décroissant ($T[j] < T[j+1]$).
* Adapter le tri à bulles pour trier des **tableaux parallèles/synchrones** (ex: trier les temps de course tout en conservant la correspondance avec le nom des athlètes).
* 🚫 **Règle Ministérielle Stricte :** **Ne pas utiliser l'instruction `break**` dans la boucle de tri.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 10 min | Donner un tableau désordonné $T =$. Comment ordonner les cartes à jouer uniquement en comparant 2 cartes voisines ? | Proposer d'échanger les voisins s'ils sont mal placés et répéter. | Tableau |
| **2. Synthèse Théorique** | 25 min | Explication du Tri à Bulles, rôles des boucles $i$ (passages) et $j$ (paires), et de la variable intermédiaire `aux`. | Prise de notes et simulation manuelle du 1er passage de tri au tableau. | ProProjecteur / Fiche |
| **3. Activité Guidée** | 40 min | Présentation du problème pratique (Classement d'un marathon sportif avec tableaux synchrones). | Rédaction du TDO/TDL, des algorithmes et codage sous Thonny. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Vérification du tri sur machine. Inversion de la condition ($>$ vs $<$) pour tester le tri croissant et décroissant. | Validation du classement et correction des permutations d'indices. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Principe du Tri à Bulles**

Le tri à bulles effectue $N - 1$ passages sur le tableau. À chaque passage $i$ ($0 \le i < N - 1$), on parcourt le tableau de l'indice $j = 0$ jusqu'à $N - 2 - i$ et on échange $T[j]$ et $T[j+1]$ si $T[j] > T[j+1]$.

```text
Exemple de 1er passage sur T = (N = 4) :
- j = 0 : Comparer 15 et 3  -> 15 > 3  => Échange  -> T =
- j = 1 : Comparer 15 et 8  -> 15 > 8  => Échange  -> T =
- j = 2 : Comparer 15 et 2  -> 15 > 2  => Échange  -> T =
-> À la fin du 1er passage, 15 (le Max) est à sa place finale à la fin !

```

---

### **II. Mécanisme de Permutation**

Pour échanger le contenu de deux cases $T[j]$ et $T[j+1]$, une variable intermédiaire `aux` est indispensable pour ne pas écraser la donnée :

```text
aux ← T[j]
T[j] ← T[j + 1]
T[j + 1] ← aux

```

---

### **III. algorithme & Implémentation Python (Conventions 2024-2025)**

#### **1. Algorithme de la Procédure `tri_a_bulles` (Ordre Croissant)**

```text
Procédure tri_a_bulles (@T : Tableau de N Entier, n : Entier)
DÉCLARATION DES OBJETS LOCAUX
    i, j, aux : Entier
DEBUT
    Pour i de 0 à n - 2 Faire
        Pour j de 0 à n - 2 - i Faire
            Si (T[j] > T[j + 1]) Alors
                aux ← T[j]
                T[j] ← T[j + 1]
                T[j + 1] ← aux
            FinSi
        Fin Pour
    Fin Pour
FIN

```

#### **2. Implémentation Python (`numpy.array`)**

```python
def tri_a_bulles(T, n):
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if T[j] > T[j + 1]:  # Utiliser < pour un tri décroissant
                aux = T[j]
                T[j] = T[j + 1]
                T[j + 1] = aux

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Traçage & Exercice de Fixation (10 min)**

*Énoncé :* Tracer les valeurs du tableau $T =$ après chaque passage de la boucle extérieure $i$ lors de l'exécution du tri à bulles croissant.

* **État initial :** ``
* **Après passage $i = 0$ :** ``  *(8 est placé à la fin)*
* **Après passage $i = 1$ :** ``  *(5 est placé)*
* **Après passage $i = 2$ :** ``  *(Tableau entièrement trié !)*

---

### **Activité 2 : Résolution d'un Problème Complet (35 min)**

#### **Énoncé du problème :**

Le comité d'organisation du **Marathon de Hammam Sousse** enregistre les résultats de $N$ coureurs ($4 \le N \le 30$) dans deux tableaux synchrones :

* `Noms` : Tableau de $N$ chaînes contenant le nom de chaque athlète.
* `Temps` : Tableau de $N$ réels contenant le temps de course réalisé (en secondes).

On demande de concevoir un programme modulaire qui :

1. Saisit le nombre d'athlètes $N$ ($4 \le N \le 30$).
2. Remplit les tableaux `Noms` et `Temps` (avec contrôle des temps $> 0.0$).
3. Trie les athlètes par **ordre croissant de leurs temps** (du plus rapide au plus lent) en utilisant le **Tri à Bulles Synchrone** (quand on permute les temps dans `Temps`, on permute impérativement les noms correspondants dans `Noms`).
4. Affiche le **Classement Final du Marathon** ainsi que le **Podium des 3 premiers gagnants**.

---

#### **1. Décomposition Modulaire**

* **`saisir_taille(min_v, max_v)` [Fonction] :** Contrôle de $N$.
* **`saisir_donnees(Noms, Temps, n)` [Procédure] :** Saisie des noms et des temps.
* **`tri_a_bulles_synchrone(Noms, Temps, n)` [Procédure] :** Trie les deux tableaux selon l'ordre croissant du temps.
* **`afficher_classement(Noms, Temps, n)` [Procédure] :** Affiche le tableau complet et met en valeur les 3 médaillés.

---

#### **2. Algorithmes des Modules (Conventions 2024-2025)**

```text
// Procédure de Tri à Bulles Synchrone
Procédure tri_a_bulles_synchrone (@Noms : Tableau de N Chaîne, @Temps : Tableau de N Réel, n : Entier)
DÉCLARATION DES OBJETS LOCAUX
    i, j : Entier
    aux_t : Réel
    aux_n : Chaîne
DEBUT
    Pour i de 0 à n - 2 Faire
        Pour j de 0 à n - 2 - i Faire
            Si (Temps[j] > Temps[j + 1]) Alors
                // Permutation des temps
                aux_t ← Temps[j]
                Temps[j] ← Temps[j + 1]
                Temps[j + 1] ← aux_t
                
                // Permutation synchrone des noms correspondants
                aux_n ← Noms[j]
                Noms[j] ← Noms[j + 1]
                Noms[j + 1] ← aux_n
            FinSi
        Fin Pour
    Fin Pour
FIN

```

---

#### **3. Algorithme du Programme Principal & TDO**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre de coureurs ($4 \le N \le 30$) |
| `Noms` | Tableau de `N` Chaîne | Noms des coureurs |
| `Temps` | Tableau de `N` Réel | Temps de course en secondes |
| `tri_a_bulles_synchrone` | Procédure | Tri simultané par ordre croissant des temps |

```text
ALGORITHME Classement_Marathon
DEBUT
    n ← saisir_taille(4, 30)
    saisir_donnees(Noms, Temps, n)
    
    tri_a_bulles_synchrone(Noms, Temps, n)
    
    Écrire_nl("=== CLASSEMENT OFFICIEL DU MARATHON ===")
    Pour i de 0 à n - 1 Faire
        Écrire("Rang ", i + 1, " : ", Noms[i], " - Temps : ", Temps[i], " s")
    Fin Pour
    
    Écrire_nl("🏆 PODIUM DES GAGNANTS 🏆")
    Écrire("🥇 1ère Place (Or)   : ", Noms[0], " (", Temps[0], " s)")
    Écrire("🥈 2ème Place (Argent): ", Noms, " (", Temps, " s)")
    Écrire("🥉 3ème Place (Bronze): ", Noms, " (", Temps, " s)")
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

```python
# =========================================================
# Programme : Tri à Bulles Synchrone - Classement Marathon
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from numpy import array

# 1. Fonction de saisie de taille N
def saisir_taille(min_v, max_v):
    taille = int(input("Nombre de coureurs (" + str(min_v) + " à " + str(max_v) + ") : "))
    while not (min_v <= taille <= max_v):
        taille = int(input("Invalide ! Recommencer (" + str(min_v) + " à " + str(max_v) + ") : "))
    return taille

# 2. Procedure de saisie des donnees
def saisir_donnees(Noms, Temps, n):
    print("\n--- Saisie des coureurs ---")
    for i in range(n):
        Noms[i] = input("Nom du coureur N° " + str(i + 1) + " : ")
        t = float(input("Temps de " + Noms[i] + " (en sec) : "))
        while t <= 0.0:
            t = float(input("Temps invalide ! Donner un temps > 0 : "))
        Temps[i] = t

# 3. Procedure de Tri a Bulles Synchrone (Sans break)
def tri_a_bulles_synchrone(Noms, Temps, n):
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if Temps[j] > Temps[j + 1]:
                # Permutation des temps
                aux_t = Temps[j]
                Temps[j] = Temps[j + 1]
                Temps[j + 1] = aux_t
                
                # Permutation synchrone des noms
                aux_n = Noms[j]
                Noms[j] = Noms[j + 1]
                Noms[j + 1] = aux_n

# =========================================================
# PROGRAMME PRINCIPAL
# =========================================================

n = saisir_taille(4, 30)

Noms = array([''] * n, dtype='U30')
Temps = array([float()] * n)

saisir_donnees(Noms, Temps, n)

# Tri synchrone croissant
tri_a_bulles_synchrone(Noms, Temps, n)

# Affichage du classement general
print("\n=== CLASSEMENT OFFICIEL DU MARATHON ===")
for i in range(n):
    print("Rang", i + 1, ":", Noms[i], "-", Temps[i], "sec")

# Affichage du Podium
print("\n🏆 PODIUM DES MÉDAILLÉS 🏆")
print("🥇 1ère Place (Médaille d'Or)   :", Noms[0], "(", Temps[0], "sec )")
print("🥈 2ème Place (Médaille d'Argent):", Noms, "(", Temps, "sec )")
print("🥉 3ème Place (Médaille de Bronze):", Noms, "(", Temps, "sec )")

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Expliquer pourquoi la boucle extérieure tourne $N-1$ fois (`range(n - 1)`) et la boucle intérieure jusqu'à $N - 1 - i$.
* [x] Utiliser la variable intermédiaire `aux` pour effectuer une permutation sans écrasement de valeur.
* [x] Synchroniser la permutation de deux tableaux parallèles (`Noms` et `Temps`) avec la même condition de test.
* [x] Basculer du tri croissant ($>$) au tri décroissant ($<$) selon le besoin du problème.