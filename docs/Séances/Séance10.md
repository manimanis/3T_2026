# 📖 Fiche de Séance N°10 : Évaluation Pratique Intermédiaire (1h30)

**Module 3 :** Modularité et Décomposition Algorithmique

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Type d'activité :** Épreuve pratique individuelle sur machine

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs de l'Évaluation

Cette épreuve de synthèse à mi-parcours permet d'évaluer individuellement les compétences de l'élève sur les acquis des **Séances 1 à 9** :

1. **Contrôle de saisie :** Utilisation des boucles conditionnelles (`Tant Que` / `while` sans `break`).
2. **Tableaux 1D :** Déclaration, remplissage et affichage d'un tableau `numpy.array` élément par élément.
3. **Traitements statistiques sur tableau :** Somme, moyenne, recherche du maximum/minimum et comptage sous condition.
4. **Modularité :** Décomposition d'un problème en Fonctions (`return`) et Procédures, avec transmission correcte des paramètres.

---

## 📊 2. Grille d'Évaluation & Barème (Sur 20 Points)

| Critère d'évaluation | Indicateurs de réussite | Barème |
| --- | --- | --- |
| **1. Analyse & Modularité** | • Décomposition pertinente du problème en modules autonomes.<br>

<br>• Choix adéquat entre Fonction et Procédure. | **/ 4 pts** |
| **2. TDO & TDL** | • Tableau de déclaration des objets globaux et locaux complet.<br>

<br>• Types de données corrects. | **/ 2 pts** |
| **3. Algorithmes / Logique** | • Respect des conventions algorithmiques ministérielles (2024-2025).<br>

<br>• Initialisations correctes des accumulateurs et extrémums. | **/ 5 pts** |
| **4. Conduite sur Python** | • Utilisation obligatoire de la bibliothèque `numpy`.<br>

<br>• Respect de la règle d'affichage élément par élément (`for i in range(n): print(T[i])`).<br>

<br>• **Absence totale de l'instruction `break**`. | **/ 5 pts** |
| **5. Exécution & Validation** | • Programme fonctionnel, saisie contrôlée, résultats exacts sur les jeux d'essais. | **/ 4 pts** |

---

## 📝 3. Sujet de l'Épreuve Pratique (Type Bac)

### **Mise en situation :**

La Société Tunisienne de l'Électricité et du Gaz (**STEG**) souhaite analyser la consommation électrique quotidienne d'un foyer sur une période de $N$ jours ($7 \le N \le 30$).

### **Travail demandé :**

Écrire un programme modulaire en Python (et élaborer son dossier d'analyse/algorithme) qui réalise les tâches suivantes :

1. **`saisir_taille(min_v, max_v)` [Fonction] :** Saisit et retourne le nombre de jours $N$ avec contrôle de saisie ($7 \le N \le 30$).
2. **`saisir_consommations(T, n)` [Procédure] :** Remplit le tableau $T$ avec les consommations quotidiennes (en kWh). Chaque consommation doit être une valeur réelle positive contrôlée dans l'intervalle $[0.5, 50.0]$.
3. **`afficher_consommations(T, n)` [Procédure] :** Affiche le relevé complet jour par jour sous la forme : `Jour i : X kWh`.
4. **`calculer_moyenne(T, n)` [Fonction] :** Calcule et retourne la consommation moyenne quotidienne de la période.
5. **`rechercher_pic(T, n)` [Fonction] :** Recherche et retourne l'indice du jour ayant enregistré la **consommation maximale** (le jour de pic énergétique).
6. **`compter_surconsommations(T, n, seuil)` [Fonction] :** Compte et retourne le nombre de jours où la consommation a strictement dépassé une valeur de `seuil` donnée.

---

## 💻 4. Correction Officielle Complète

### **I. Tableau de Déclaration des Objets Globaux (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre de jours d'analyse ($7 \le N \le 30$) |
| `Conso` | Tableau de `N` Réel | Tableau de stockage des consommations quotidiennes (kWh) |
| `moy_conso` | Réel | Consommation moyenne calculée sur la période |
| `jour_pic` | Entier | Indice du jour de consommation maximale |
| `nb_jours_eleves` | Entier | Nombre de jours de surconsommation par rapport à la moyenne |
| `saisir_taille` | Fonction | Module de saisie contrôlée de la taille $N$ |
| `saisir_consommations` | Procédure | Module de saisie contrôlée du tableau |
| `afficher_consommations` | Procédure | Module d'affichage élément par élément |
| `calculer_moyenne` | Fonction | Module de calcul de la moyenne |
| `rechercher_pic` | Fonction | Module de recherche du jour de pic maximal |
| `compter_surconsommations` | Fonction | Module de comptage des jours dépassant le seuil |

---

### **II. Algorithmes des Modules **

```text
// 1. Fonction Saisir Taille
Fonction saisir_taille (min_v : Entier, max_v : Entier) : Entier
DEBUT
    Répéter
        Écrire("Donner le nombre de jours (", min_v, " à ", max_v, ") : ")
        Lire(taille)
    Jusqu'à (min_v ≤ taille ET taille ≤ max_v)
    Retourner taille
FIN

// 2. Procédure Saisir Consommations
Procédure saisir_consommations (@T : Tableau de N Réel, n : Entier)
DEBUT
    Pour i de 0 à n - 1 Faire
        Répéter
            Écrire("Consommation Jour ", i + 1, " (0.5 à 50 kWh) : ")
            Lire(T[i])
        Jusqu'à (0.5 ≤ T[i] ET T[i] ≤ 50.0)
    Fin Pour
FIN

// 3. Procédure Afficher Consommations
Procédure afficher_consommations (T : Tableau de N Réel, n : Entier)
DEBUT
    Écrire("=== RELEVÉ QUOTIDIEN DE CONSOMMATION ===")
    Pour i de 0 à n - 1 Faire
        Écrire("Jour ", i + 1, " : ", T[i], " kWh")
    Fin Pour
FIN

// 4. Fonction Calculer Moyenne
Fonction calculer_moyenne (T : Tableau de N Réel, n : Entier) : Réel
DEBUT
    somme ← 0.0
    Pour i de 0 à n - 1 Faire
        somme ← somme + T[i]
    Fin Pour
    Retourner somme / n
FIN

// 5. Fonction Rechercher Pic
Fonction rechercher_pic (T : Tableau de N Réel, n : Entier) : Entier
DEBUT
    idx_max ← 0
    Pour i de 1 à n - 1 Faire
        Si (T[i] > T[idx_max]) Alors
            idx_max ← i
        FinSi
    Fin Pour
    Retourner idx_max
FIN

// 6. Fonction Compter Surconsommations
Fonction compter_surconsommations (T : Tableau de N Réel, n : Entier, seuil : Réel) : Entier
DEBUT
    nb ← 0
    Pour i de 0 à n - 1 Faire
        Si (T[i] > seuil) Alors
            nb ← nb + 1
        FinSi
    Fin Pour
    Retourner nb
FIN

```

---

### **III. Algorithme du Programme Principal**

```text
ALGORITHME Gestion_Consommation_STEG
DEBUT
    n ← saisir_taille(7, 30)
    saisir_consommations(Conso, n)
    afficher_consommations(Conso, n)
    
    moy_conso ← calculer_moyenne(Conso, n)
    jour_pic ← rechercher_pic(Conso, n)
    nb_jours_eleves ← compter_surconsommations(Conso, n, moy_conso)
    
    Écrire_nl("=== BILAN ÉNERGÉTIQUE DE LA PÉRIODE ===")
    Écrire("Consommation moyenne quotidienne : ", moy_conso, " kWh")
    Écrire("Pic de consommation enregistré le Jour ", jour_pic + 1, " avec ", Conso[jour_pic], " kWh")
    Écrire("Nombre de jours de surconsommation (> moyenne) : ", nb_jours_eleves, " jour(s)")
FIN

```

---

### **IV. Code Python Complet (Thonny IDE)**

```python
# =========================================================
# ÉPREUVE PRATIQUE INTERMÉDIAIRE : GESTION MÉTÉO / STEG
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from numpy import array

# 1. Fonction de saisie de la taille N
def saisir_taille(min_v, max_v):
    taille = int(input("Donner le nombre de jours d'analyse (" + str(min_v) + " à " + str(max_v) + ") : "))
    while not (min_v <= taille <= max_v):
        taille = int(input("Invalide ! Saisir N entre " + str(min_v) + " et " + str(max_v) + " : "))
    return taille

# 2. Procedure de saisie controlee du tableau
def saisir_consommations(T, n):
    print("\n--- Saisie des consommations quotidiennes ---")
    for i in range(n):
        val = float(input("Consommation Jour " + str(i + 1) + " (0.5 à 50.0 kWh) : "))
        while not (0.5 <= val <= 50.0):
            val = float(input("Invalide ! Saisir une valeur entre 0.5 et 50.0 kWh : "))
        T[i] = val

# 3. Procedure d'affichage element par element (OBLIGATOIRE)
def afficher_consommations(T, n):
    print("\n=== RELEVÉ QUOTIDIEN DE CONSOMMATION ===")
    for i in range(n):
        print("Jour", i + 1, ":", T[i], "kWh")

# 4. Fonction de calcul de la moyenne
def calculer_moyenne(T, n):
    somme = 0.0
    for i in range(n):
        somme += T[i]
    return somme / n

# 5. Fonction de recherche de l'indice du jour de pic
def rechercher_pic(T, n):
    idx_max = 0
    for i in range(1, n):
        if T[i] > T[idx_max]:
            idx_max = i
    return idx_max

# 6. Fonction de comptage des jours depassant le seuil
def compter_surconsommations(T, n, seuil):
    nb = 0
    for i in range(n):
        if T[i] > seuil:
            nb += 1
    return nb

# =========================================================
# PROGRAMME PRINCIPAL
# =========================================================

# A. Saisie de la taille N
n = saisir_taille(7, 30)

# B. Declaration du tableau numpy de N réels
Conso = array([float()] * n)

# C. Remplissage et Affichage
saisir_consommations(Conso, n)
afficher_consommations(Conso, n)

# D. Traitements statistiques
moy_conso = calculer_moyenne(Conso, n)
jour_pic = rechercher_pic(Conso, n)
nb_jours_eleves = compter_surconsommations(Conso, n, moy_conso)

# E. Affichage du Bilan
print("\n=== BILAN ÉNERGÉTIQUE DE LA PÉRIODE ===")
print("Consommation moyenne quotidienne :", round(moy_conso, 2), "kWh")
print("Pic de consommation               : Jour", jour_pic + 1, "avec", Conso[jour_pic], "kWh")
print("Nombre de jours > moyenne         :", nb_jours_eleves, "jour(s)")

```

---

## 🔍 5. Bilan & Remarques Correctives Post-Évaluation

L'enseignant portera une attention particulière aux erreurs suivantes lors de la correction :

* ❌ **Utilisation de `print(T)` :** Prive l'élève des points de conformité d'affichage du tableau.
* ❌ **Initialisation du Max à `0` :** Faux si toutes les consommations sont faibles ou en cas d'erreurs de bornes.
* ❌ **Usage de `break` :** Retrait de points systématique selon la directive ministérielle.
* ✔️ **Excellente modularité :** Chaque fonction effectue un seul rôle bien défini et retourne le résultat au programme principal.