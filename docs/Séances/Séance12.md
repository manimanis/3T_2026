# 📖 Fiche de Séance N°12 : Arithmétique II – Nombres Premiers & Décomposition

**Module 4 :** Algorithmes Classiques & Mini-Projets Python

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Connaître la définition d'un **nombre premier** : un entier $N > 1$ qui admet exactement deux diviseurs distincts dans $\mathbb{N}$ ($1$ et lui-même).
* Comprendre l'**optimisation mathématique du test de primalité** :
* Si un nombre $N$ est composé, il possède au moins un diviseur $d$ tel que $2 \le d \le \lfloor\sqrt{N}\rfloor$. Il est donc inutile de tester les diviseurs jusqu'à $N-1$.


* Connaître le Théorème Fondamental de l'Arithmétique : tout entier $N > 1$ se décompose de manière unique sous forme de produit de **facteurs premiers**.

### **B. Savoir-faire (Compétences pratiques)**

* Implémenter la fonction `est_premier(n)` avec une boucle `Tant que` optimisée ($\le \sqrt{N}$) sans l'instruction `break`.
* Implémenter la procédure `decomposer_facteurs_premiers(n)`.
* Concevoir des applications arithmétiques combinant primalité et décomposition.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 10 min | Demander comment vérifier si $N = 1000000007$ est premier sans faire 1 milliard de divisions. | Comprendre que la recherche s'arrête à $\sqrt{N} \approx 31622$. | Tableau |
| **2. Synthèse Théorique** | 25 min | Présentation de la fonction `est_premier` optimisée et de la boucle de décomposition en facteurs premiers. | Prise de notes et traçage manuel de la décomposition de $N = 60$ ($2^2 \times 3 \times 5$). | ProProjecteur / Fiche |
| **3. Activité Guidée** | 40 min | Présentation de l'activité pratique (Analyseur Arithmétique d'un Entier). Encadrement de l'analyse et du TDO. | Écriture des modules `est_premier`, `decomposer` et codage sous Thonny. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Vérification de la gestion des cas limites ($N \le 1$, $N = 2$) et du test de sortie de boucle sans `break`. | Validation du programme avec des nombres premiers et composés variés. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Test de Primalité Optimisé ($\le \sqrt{N}$)**

Pour vérifier si un entier $N > 1$ est premier :

1. Si $N < 2$, il n'est **pas premier**.
2. On teste la divisibilité de $N$ par $i$ allant de $2$ jusqu'à $\lfloor\sqrt{N}\rfloor$.
3. Dès qu'un diviseur est trouvé ($N \pmod i = 0$), on arrête la recherche (`test ← Faux`).

#### **1. Algorithme de la Fonction `est_premier**`

```text
Fonction est_premier (n : Entier) : Booléen
DÉCLARATION DES OBJETS LOCAUX
    i : Entier
    test : Booléen
DEBUT
    Si (n < 2) Alors
        Retourner Faux
    FinSi
    
    i ← 2
    test ← Vrai
    
    Tant que (i ≤ Ent(RacineCarré(n)) ET test = Vrai) Faire
        Si (n Mod i = 0) Alors
            test ← Faux
        Sinon
            i ← i + 1
        FinSi
    Fin Tant que
    
    Retourner test
FIN

```

#### **2. Implémentation Python**

```python
from math import sqrt

def est_premier(n):
    if n < 2:
        return False
    
    i = 2
    test = True
    while i <= int(sqrt(n)) and test:
        if n % i == 0:
            test = False
        else:
            i += 1
            
    return test

```

---

### **II. Décomposition en Facteurs Premiers**

La décomposition consiste à diviser répétitivement $N$ par le plus petit diviseur possible `div` (en commençant par $2$) tant que $N \pmod{div} = 0$.

```text
Exemple de déroulement pour N = 60 :
- 60 Mod 2 = 0 -> Affiche 2, N = 30
- 30 Mod 2 = 0 -> Affiche 2, N = 15
- 15 Mod 2 ≠ 0 -> div devient 3
- 15 Mod 3 = 0 -> Affiche 3, N = 5
- 5 Mod 3 ≠ 0, 5 Mod 4 ≠ 0 -> div devient 5
- 5 Mod 5 = 0  -> Affiche 5, N = 1 => FIN

```

#### **1. Algorithme de la Procédure `decomposer**`

```text
Procédure decomposer_facteurs_premiers (n : Entier)
DÉCLARATION DES OBJETS LOCAUX
    div : Entier
DEBUT
    Écrire("Facteurs premiers de ", n, " : ")
    div ← 2
    Tant que (n > 1) Faire
        Tant que (n Mod div = 0) Faire
            Écrire(div, " ")
            n ← n Div div
        Fin Tant que
        div ← div + 1
    Fin Tant que
FIN

```

#### **2. Implémentation Python**

```python
def decomposer_facteurs_premiers(n):
    print("Décomposition de", n, "en facteurs premiers :")
    div = 2
    temp = n
    while temp > 1:
        while temp % div == 0:
            print(div, end=" ")
            temp = temp // div
        div += 1
    print()  # Retour à la ligne

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Démonstration d'Efficacité (10 min)**

*Énoncé :* Comparer le nombre d'itérations pour tester si $N = 1\ 000003$ est premier :

* **Méthode non optimisée (jusqu'à $N-1$) :** Teste $1\ 000\ 002$ nombres.
* **Méthode optimisée ($\sqrt{N}$) :** Teste seulement $1000$ nombres.
👉 **Gain :** Algorithme $1000$ fois plus rapide !

---

### **Activité 2 : Résolution d'un Problème Complet (35 min)**

#### **Énoncé du problème :**

On souhaite créer une application d'**Analyse Arithmétique d'un Entier $N$** :

1. Saisit un entier $N > 1$ avec contrôle de saisie via une fonction `saisir_entier_gt1`.
2. Vérifie si $N$ est **premier** grâce à la fonction `est_premier`.
3. Si $N$ est **premier** :
* Affiche qu'il est premier.
* Recherche et affiche le **prochain nombre premier** strictement supérieur à $N$.


4. Si $N$ n'est **pas premier** (nombre composé) :
* Affiche la liste de tous ses **facteurs premiers**.



---

#### **1. Décomposition Modulaire**

* **`saisir_entier_gt1()` [Fonction] :** Force la saisie d'un entier $N > 1$.
* **`est_premier(n)` [Fonction] :** Retourne `True` si $N$ est premier, `False` sinon.
* **`prochain_premier(n)` [Fonction] :** Cherche et retourne le premier nombre premier $> N$.
* **`decomposer_facteurs_premiers(n)` [Procédure] :** Affiche la décomposition en facteurs premiers.

---

#### **2. Algorithmes des Modules (Conventions 2024-2025)**

```text
// 1. Fonction Saisir Entier > 1
Fonction saisir_entier_gt1 () : Entier
DEBUT
    Répéter
        Écrire("Donner un entier N > 1 : ")
        Lire(n)
    Jusqu'à (n > 1)
    Retourner n
FIN

// 2. Fonction Est Premier
Fonction est_premier (n : Entier) : Booléen
DÉCLARATION DES OBJETS LOCAUX
    i : Entier
    test : Booléen
DEBUT
    Si (n < 2) Alors
        Retourner Faux
    FinSi
    i ← 2
    test ← Vrai
    Tant que (i ≤ Ent(RacineCarré(n)) ET test = Vrai) Faire
        Si (n Mod i = 0) Alors
            test ← Faux
        Sinon
            i ← i + 1
        FinSi
    Fin Tant que
    Retourner test
FIN

// 3. Fonction Prochain Premier
Fonction prochain_premier (n : Entier) : Entier
DÉCLARATION DES OBJETS LOCAUX
    p : Entier
DEBUT
    p ← n + 1
    Tant que (est_premier(p) = Faux) Faire
        p ← p + 1
    Fin Tant que
    Retourner p
FIN

```

---

#### **3. Algorithme du Programme Principal & TDO**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre à analyser ($N > 1$) |
| `suiv` | Entier | Plus petit nombre premier $> N$ |
| `est_premier` | Fonction | Test de primalité |
| `prochain_premier` | Fonction | Recherche du premier suivant |
| `decomposer_facteurs_premiers` | Procédure | Affichage des facteurs premiers |

```text
ALGORITHME Analyse_Arithmetique
DEBUT
    n ← saisir_entier_gt1()
    
    Écrire("=== BILAN ARITHMÉTIQUE DE ", n, " ===")
    
    Si (est_premier(n) = Vrai) Alors
        Écrire(n, " est un NOMBRE PREMIER.")
        suiv ← prochain_premier(n)
        Écrire("Le prochain nombre premier après ", n, " est : ", suiv)
    Sinon
        Écrire(n, " est un NOMBRE COMPOSÉ.")
        decomposer_facteurs_premiers(n)
    FinSi
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

```python
# =========================================================
# Programme : Arithmétique II - Nombres Premiers et Décomposition
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from math import sqrt

# 1. Fonction de saisie controlee
def saisir_entier_gt1():
    n = int(input("Donner un entier N > 1 : "))
    while n <= 1:
        n = int(input("Invalide ! Donner un entier strictement supérieur à 1 : "))
    return n

# 2. Fonction de test de primalite optimisee (sans break)
def est_premier(n):
    if n < 2:
        return False
    
    i = 2
    test = True
    while i <= int(sqrt(n)) and test:
        if n % i == 0:
            test = False
        else:
            i += 1
            
    return test

# 3. Fonction pour trouver le prochain nombre premier
def prochain_premier(n):
    p = n + 1
    while not est_premier(p):
        p += 1
    return p

# 4. Procedure de decomposition en facteurs premiers
def decomposer_facteurs_premiers(n):
    print("Décomposition en facteurs premiers :")
    div = 2
    temp = n
    while temp > 1:
        while temp % div == 0:
            print(div, end=" ")
            temp = temp // div
        div += 1
    print()

# =========================================================
# PROGRAMME PRINCIPAL
# =========================================================

n = saisir_entier_gt1()

print("\n=== BILAN ARITHMÉTIQUE DE", n, "===")

if est_premier(n):
    print(n, "est un NOMBRE PREMIER.")
    suiv = prochain_premier(n)
    print("Le prochain nombre premier après", n, "est :", suiv)
else:
    print(n, "est un NOMBRE COMPOSÉ.")
    decomposer_facteurs_premiers(n)

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Utiliser la borne `int(sqrt(n))` pour optimiser la recherche des diviseurs.
* [x] Gérer la sortie anticipée du test de primalité via le booléen `test` sans utiliser `break`.
* [x] Implémenter des boucles `while` imbriquées pour diviser successivement un nombre par ses facteurs premiers.
* [x] Réutiliser la fonction `est_premier` à l'intérieur d'un autre module (`prochain_premier`).