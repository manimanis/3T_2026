# 📖 Fiche de Séance N°11 : Arithmétique I – PGCD & PPCM

**Module 4 :** Algorithmes Classiques & Mini-Projets Python

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Python / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Connaître la définition arithmétique et les propriétés du **PGCD** (Plus Grand Commun Diviseur) et du **PPCM** (Plus Petit Commun Multiple) de deux entiers strictement positifs.
* Étudier les deux méthodes de calcul du PGCD :
1. **Méthode des soustractions successives.**
2. **Méthode d'Euclide (divisions euclidiennes successives).**


* Connaître la relation mathématique entre le PGCD et le PPCM :

$$\text{PPCM}(a, b) = \frac{a \times b}{\text{PGCD}(a, b)} \quad \text{pour } a, b > 0$$



### **B. Savoir-faire (Compétences pratiques)**

* Concevoir et implémenter les fonctions modulaires `PGCD(a, b)` et `PPCM(a, b)` en Python.
* Appliquer le calcul du PGCD à la **simplification de fractions** pour les rendre irréductibles.
* Utiliser le PPCM pour résoudre des problèmes concrets de **synchronisation périodique**.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 10 min | Poser le problème de la simplification de la fraction $\frac{1071}{1029}$. Comment la simplifier automatiquement sur ordinateur ? | Exprime le besoin de trouver le plus grand diviseur commun aux deux nombres. | Tableau |
| **2. Synthèse Théorique** | 25 min | Présentation de l'algorithme d'Euclide (`a Mod b`), comparaison avec la méthode par soustraction, et formule du PPCM. | Prise de notes et traçage manuel de l'algorithme d'Euclide sur un exemple. | ProProjecteur / Fiche |
| **3. Activité Guidée** | 40 min | Présentation du problème pratique (Simplification de fraction & Synchronisation d'autobus). Encadrement de l'analyse et TDO. | Rédaction des modules `PGCD`, `PPCM`, `Simplifier` et codage sous Thonny. | Ordinateur (Python IDE) |
| **4. Évaluation Formative** | 15 min | Vérification de la prise en compte des cas limites ($a \le 0$ ou $b \le 0$) et de l'absence de `break`. | Validation du script avec différents jeux d'essais (nombres premiers entre eux, multiples). | Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Le PGCD (Méthode de la Division Euclidienne d'Euclide)**

L'algorithme d'Euclide repose sur la propriété suivante :

$$\text{PGCD}(a, b) = \text{PGCD}(b, a \pmod b) \quad \text{avec } b \neq 0$$

```text
Trace d'exécution pour a = 48 et b = 18 :
- 48 Mod 18 = 12  -> a = 18, b = 12
- 18 Mod 12 = 6   -> a = 12, b = 6
- 12 Mod 6  = 0   -> a = 6,  b = 0  => PGCD = 6

```

#### **1. Algorithme de la Fonction PGCD**

```text
Fonction PGCD (a : Entier, b : Entier) : Entier
DÉCLARATION DES OBJETS LOCAUX
    r : Entier
DEBUT
    Tant que (b ≠ 0) Faire
        r ← a Mod b
        a ← b
        b ← r
    Fin Tant que
    Retourner a
FIN

```

#### **2. Implémentation Python**

```python
def pgcd(a, b):
    while b != 0:
        r = a % b
        a = b
        b = r
    return a

```

---

### **II. Le PPCM (Plus Petit Commun Multiple)**

En utilisant la relation $\text{PPCM}(a, b) = \frac{a \times b}{\text{PGCD}(a, b)}$ :

#### **1. Algorithme de la Fonction PPCM**

```text
Fonction PPCM (a : Entier, b : Entier) : Entier
DEBUT
    Retourner (a * b) Div PGCD(a, b)
FIN

```

#### **2. Implémentation Python**

```python
def ppcm(a, b):
    return (a * b) // pgcd(a, b)

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Comparaison des Algorithmes (10 min)**

*Énoncé :* Comparer la méthode par soustraction successives et la méthode d'Euclide pour $a = 1000000$ et $b = 2$. Que remarquez-vous sur la vitesse d'exécution ?

* **Méthode des soustractions :** Effectue $500\ 000$ itérations ($a \leftarrow a - b$).
* **Méthode d'Euclide :** Effectue $1$ seule itération ($1000000 \pmod 2 = 0$).
👉 **Conclusion :** L'algorithme d'Euclide par division euclidienne est **nettement plus performant**.

---

### **Activité 2 : Résolution d'un Problème Complet (35 min)**

#### **Énoncé du problème :**

Deux lignes de bus scolaire partent de la même station de Hammam Sousse à **07:00** du matin :

* La **Ligne A** repasse par la station toutes les $A$ minutes.
* La **Ligne B** repasse par la station toutes les $B$ minutes.

On demande de concevoir un programme modulaire qui :

1. Saisit les fréquences $A$ et $B$ (en minutes) strictement positives.
2. Détermine la **prochaine heure de rencontre simultanée** des deux lignes à la station (grâce au PPCM).
3. Saisit le numérateur $N$ et le dénominateur $D$ d'une fraction $\frac{N}{D}$ et affiche la **fraction irréductible** correspondante (grâce au PGCD).

---

#### **1. Décomposition Modulaire**

* **`saisir_entier_positif(msg)` [Fonction] :** Forcer la saisie d'un entier $> 0$.
* **`pgcd(a, b)` [Fonction] :** Calcule le PGCD d'Euclide.
* **`ppcm(a, b)` [Fonction] :** Calcule le PPCM.
* **`simplifier_fraction(num, den)` [Procédure] :** Calcule $g = \text{PGCD}(num, den)$, puis affiche la fraction irréductible $\frac{num/g}{den/g}$.

---

#### **2. Algorithmes des Modules **

```text
// 1. Fonction Saisir Entier Positif
Fonction saisir_entier_positif (msg : Chaîne) : Entier
DEBUT
    Répéter
        Écrire(msg)
        Lire(val)
    Jusqu'à (val > 0)
    Retourner val
FIN

// 2. Fonction PGCD
Fonction pgcd (a : Entier, b : Entier) : Entier
DEBUT
    Tant que (b ≠ 0) Faire
        r ← a Mod b
        a ← b
        b ← r
    Fin Tant que
    Retourner a
FIN

// 3. Fonction PPCM
Fonction ppcm (a : Entier, b : Entier) : Entier
DEBUT
    Retourner (a * b) Div pgcd(a, b)
FIN

// 4. Procédure Simplifier Fraction
Procédure simplifier_fraction (num : Entier, den : Entier)
DÉCLARATION DES OBJETS LOCAUX
    g, num_simp, den_simp : Entier
DEBUT
    g ← pgcd(num, den)
    num_simp ← num Div g
    den_simp ← den Div g
    Écrire("Fraction irréductible : ", num_simp, " / ", den_simp)
FIN

```

---

#### **3. Algorithme du Programme Principal & TDO**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `freq_A`, `freq_B` | Entier | Fréquences de passage des bus A et B (min) |
| `intervalle_rencontre` | Entier | PPCM des fréquences (durée en min) |
| `heures_rencontre` | Entier | Heure du prochain départ simultané |
| `minutes_rencontre` | Entier | Minutes du prochain départ simultané |
| `num`, `den` | Entier | Numérateur et dénominateur d'une fraction |

```text
ALGORITHME Arithmetique_PGCD_PPCM
DEBUT
    Écrire("=== PROBLÈME 1 : SYNCHRONISATION BUS ===")
    freq_A ← saisir_entier_positif("Fréquence Ligne A (min) : ")
    freq_B ← saisir_entier_positif("Fréquence Ligne B (min) : ")
    
    intervalle_rencontre ← ppcm(freq_A, freq_B)
    
    heures_rencontre ← 7 + (intervalle_rencontre Div 60)
    minutes_rencontre ← intervalle_rencontre Mod 60
    
    Écrire("Les bus se croiseront dans ", intervalle_rencontre, " minutes.")
    Écrire("Prochaine rencontre à : ", heures_rencontre, "h : ", minutes_rencontre, "min")
    
    Écrire_nl("=== PROBLÈME 2 : SIMPLIFICATION DE FRACTION ===")
    num ← saisir_entier_positif("Numérateur : ")
    den ← saisir_entier_positif("Dénominateur : ")
    simplifier_fraction(num, den)
FIN

```

---

#### **4. Implémentation Python (Python IDE)**

```python
# =========================================================
# Programme : Arithmétique I - PGCD, PPCM et Applications
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

# 1. Fonction de saisie controlee
def saisir_entier_positif(msg):
    val = int(input(msg))
    while val <= 0:
        val = int(input("Invalide ! " + msg))
    return val

# 2. Fonction PGCD (Algorithme d'Euclide)
def pgcd(a, b):
    while b != 0:
        r = a % b
        a = b
        b = r
    return a

# 3. Fonction PPCM
def ppcm(a, b):
    return (a * b) // pgcd(a, b)

# 4. Procedure de simplification de fraction
def simplifier_fraction(num, den):
    g = pgcd(num, den)
    num_simp = num // g
    den_simp = den // g
    print("PGCD(", num, ",", den, ") =", g)
    print("Fraction irréductible :", num_simp, "/", den_simp)

# =========================================================
# PROGRAMME PRINCIPAL
# =========================================================

# Application 1 : Synchronisation des bus
print("=== PROBLÈME 1 : SYNCHRONISATION DES BUS ===")
freq_A = saisir_entier_positif("Fréquence Ligne A (minutes) : ")
freq_B = saisir_entier_positif("Fréquence Ligne B (minutes) : ")

intervalle = ppcm(freq_A, freq_B)

# Calcul du prochain horaire à partir de 07:00
heure_dep = 7
minute_dep = 0

minutes_totales = minute_dep + intervalle
heure_rencontre = heure_dep + (minutes_totales // 60)
minute_rencontre = minutes_totales % 60

print("Prochaine rencontre dans :", intervalle, "minutes.")
print("Heure exacte du croisement :", heure_rencontre, "h :", minute_rencontre, "min")

# Application 2 : Simplification de fraction
print("\n=== PROBLÈME 2 : SIMPLIFICATION DE FRACTION ===")
num = saisir_entier_positif("Donner le numérateur (> 0) : ")
den = saisir_entier_positif("Donner le dénominateur (> 0) : ")

simplifier_fraction(num, den)

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Expliquer le déroulement de la boucle `while b != 0` dans l'algorithme d'Euclide.
* [x] Calculer le PPCM à partir du PGCD sans boucle supplémentaire.
* [x] Utiliser la division entière `//` pour simplifier une fraction.
* [x] Résoudre des problèmes concrets d'intervalles de temps communs grâce au PPCM.