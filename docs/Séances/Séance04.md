# 📖 Fiche de Séance N°4 : Structures Répétitives Conditionnelles (`Tant Que` & `Répéter`)

**Module 2 :** Structures de Contrôle et de Données Avancées

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Distinguer une boucle bornée (`Pour`) d'une boucle conditionnelle non bornée (`Tant Que` et `Répéter`).
* Maîtriser la syntaxe algorithmique des deux structures :
* `Tant que Condition_de_poursuite Faire ... Fin Tant que` (évaluation préalable).
* `Répéter ... Jusqu'à Condition_d_arrêt` (évaluation postérieure).


* Connaître la règle d'implémentation en Python avec la boucle `while`.

### **B. Savoir-faire (Compétences pratiques)**

* Concevoir un algorithme de **contrôle de saisie** pour forcer la validation d'une donnée selon un domaine de validité.
* Utiliser un booléen (drapeau / indicateur) ou une condition composée pour gérer la sortie d'une boucle `while`.
* 🚫 **Règle Ministérielle Stricte :** **Ne pas utiliser l'instruction `break**` pour forcer la sortie d'une boucle.
* Implémenter, tester et débugger des scripts Python contenant des boucles conditionnelles.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème** | 15 min | Demander de saisir l'âge d'un élève (doit être entre 10 et 20). Pourquoi la boucle `Pour` est-elle inadaptée ? | Constate qu'on ne sait pas d'avance combien de fois l'utilisateur va se tromper. | Tableau / ProProjecteur |
| **2. Synthèse Théorique** | 20 min | Présentation des structures `Tant Que` et `Répéter`. Explication de la traduction de `Répéter...Jusqu'à` en Python (`while not(...)`). | Prise de notes, comparaison des conditions de poursuite vs d'arrêt. | Fiche de cours |
| **3. Activité Guidée** | 40 min | Présentation du problème pratique (Jeu de devinette d'un nombre secret avec nombre d'essais limité). | Analyse, élaboration du TDO, écriture de l'algorithme et codage Python sous Thonny. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Vérification des codes sur machine, détection des boucles infinies (oubli de réinitialisation/incrémentation). | Correction des boucles et validation des tests limites. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Comparaison des Structures Répétitives**

| Structure | Utilisation | Condition | Nombre d'exécutions |
| --- | --- | --- | --- |
| **`Pour`** | Nombre de répétitions **connu** d'avance. | Automatique (Compteur) | Fixe ($Fin - Début + 1$) |
| **`Tant Que`** | Nombre de répétitions **inconnu**. | Condition de **poursuite** (évaluée au début) | $0$ à plusieurs fois |
| **`Répéter`** | Nombre de répétitions **inconnu**. | Condition d'**arrêt** (évaluée à la fin) | Au moins $1$ fois |

---

### **II. Syntaxe Algorithmique & Python**

#### **1. Structure `Tant Que**`

```text
-- Algorithme
Tant que Condition_Poursuite Faire
    Traitement
Fin Tant que

```

```python
# Python
while condition_poursuite:
    traitement

```

#### **2. Structure `Répéter ... Jusqu'à**`

```text
-- Algorithme
Répéter
    Traitement
Jusqu'à Condition_Arrêt

```

```python
# Python (Traduction directe par condition de poursuite inverse)
# Exemple : Contrôle de saisie d'un entier N dans

# En Algorithmique :
# Répéter Lire(N) Jusqu'à (1 <= N ET N <= 100)

# En Python :
n = int(input("Donner N entre 1 et 100 : "))
while not (1 <= n <= 100):  # Tant que N est invalide (Condition de poursuite)
    n = int(input("Saisie invalide ! Donner N entre 1 et 100 : "))

```

---

### ⚠️ **Recommandations Ministérielles Importantes**

1. **Initialisation :** Les variables de la condition de la boucle doivent être initialisées **avant** d'entrer dans la boucle `while`.
2. **Mise à jour :** La valeur contrôlant la condition doit obligatoirement être **modifiée à l'intérieur** de la boucle (sinon c'est une **boucle infinie**).
3. **Pas de `break` :** L'usage de `break` est **strictement interdit** lors des épreuves pratiques et du baccalauréat.

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Correction d'une Boucle Infinie & Suppression de `break` (10 min)**

*Énoncé :* Le script Python suivant contient l'instruction interdite `break` et risque de tourner en boucle infinie. Réécrivez-le conformément aux règles officielles.

```python
# Code non conforme (avec break)
while True:
    val = int(input("Donner un nombre pair : "))
    if val % 2 == 0:
        break
    print("Invalide !")

```

#### **Code Corrigé (Conforme aux conventions) :**

```python
val = int(input("Donner un nombre pair : "))
while val % 2 != 0:
    print("Invalide ! Le nombre doit être pair.")
    val = int(input("Donner un nombre pair : "))

print("Nombre pair valide saisi :", val)

```

---

### **Activité 2 : Résolution d'un Problème Complet (30 min)**

#### **Énoncé du problème :**

On souhaite concevoir le jeu **« Le Nombre Secret »** :

1. Le programme génère aléatoirement un nombre secret compris entre **1 et 50** inclus (en utilisant `randint(1, 50)` de la bibliothèque `random`).
2. Le joueur dispose de **6 essais maximum** pour deviner le nombre secret.
3. À chaque essai :
* Le joueur saisit sa proposition `essai`. Le programme doit **forcer la saisie** de `essai` dans l'intervalle ``.
* Si `essai` est supérieur au nombre secret, le programme affiche : `"C'est MOINS !"`.
* Si `essai` est inférieur au nombre secret, le programme affiche : `"C'est PLUS !"`.
* Si `essai` est égal au nombre secret, le jeu s'arrête immédiatement et affiche un message de victoire.


4. Si le joueur épuise ses 6 essais sans trouver, le programme affiche : `"Perdu ! Le nombre secret était X"`.

---

#### **1. Analyse du Problème**

* **Données d'entrée (Entrées) :**
* Proposition du joueur (`essai` : Entier)


* **Données de sortie (Sorties) :**
* Messages de guidage (`"PLUS"`, `"MOINS"`, `"Gagné"`, `"Perdu"`)


* **Traitements :**
* Générer `secret ← Aléa(1, 50)`.
* Initialiser le compteur d'essais `nb_essais ← 0` et un indicateur `trouve ← Faux`.
* Boucle conditionnelle : **Tant que** `(nb_essais < 6 ET trouvant = Faux)` **Faire** :
* Incrémenter `nb_essais ← nb_essais + 1`.
* Saisir et valider `essai` (Répéter la saisie tant que `essai < 1` ou `essai > 50`).
* Comparer `essai` avec `secret` :
* Si `essai = secret` Alors `trouve ← Vrai`
* Sinon Si `essai < secret` Alors Écrire(`"C'est PLUS !"`)
* Sinon Écrire(`"C'est MOINS !"`)


* FinSi


* Après la boucle :
* Si `trouve = Vrai` Alors Écrire(`"Gagné en ", nb_essais, " essai(s) !"`)
* Sinon Écrire(`"Perdu ! Le secret était ", secret`)





---

#### **2. Tableau de Déclaration des Objets (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `secret` | Entier | Nombre aléatoire secret à deviner (1 à 50) |
| `essai` | Entier | Proposition saisie par le joueur |
| `nb_essais` | Entier | Compteur du nombre de tentatives effectuées |
| `trouve` | Booléen | Drapeau indiquant si le nombre secret a été trouvé |

---

#### **3. Algorithme (Conventions Ministérielles 2024-2025)**

```text
ALGORITHME Jeu_Nombre_Secret
DEBUT
    secret ← Aléa(1, 50)
    nb_essais ← 0
    trouve ← Faux
    
    Tant que (nb_essais < 6 ET trouve = Faux) Faire
        nb_essais ← nb_essais + 1
        Écrire("--- Essai N° ", nb_essais, " / 6 ---")
        
        Répéter
            Écrire("Proposez un nombre (1 à 50) : ")
            Lire(essai)
        Jusqu'à (1 ≤ essai ET essai ≤ 50)
        
        Si (essai = secret) Alors
            trouve ← Vrai
        Sinon Si (essai < secret) Alors
            Écrire("C'est PLUS !")
        Sinon
            Écrire("C'est MOINS !")
        FinSi
    Fin Tant que
    
    Si (trouve = Vrai) Alors
        Écrire("Bravo ! Vous avez trouvé le nombre secret en ", nb_essais, " essai(s) !")
    Sinon
        Écrire("Dommage ! Vous avez épuisé vos 6 essais. Le secret était : ", secret)
    FinSi
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

```python
# =========================================================
# Programme : Jeu du Nombre Secret (Sans break)
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from random import randint

# Generation du nombre secret entre 1 et 50
secret = randint(1, 50)

nb_essais = 0
trouve = False

# Boucle principale de jeu
while nb_essais < 6 and not trouve:
    nb_essais += 1
    print("\n--- Essai N°", nb_essais, "/ 6 ---")
    
    # Controle de saisie de la proposition (1 à 50)
    essai = int(input("Proposez un nombre (1 à 50) : "))
    while not (1 <= essai <= 50):
        essai = int(input("Invalide ! Proposez un nombre entre 1 et 50 : "))
    
    # Evaluation de la proposition
    if essai == secret:
        trouve = True
    elif essai < secret:
        print("C'est PLUS !")
    else:
        print("C'est MOINS !")

# Bilan de fin de partie
if trouve:
    print("\n🎉 Bravo ! Vous avez trouvé le nombre secret en", nb_essais, "essai(s) !")
else:
    print("\n❌ Perdu ! Vous avez épuisé vos 6 essais. Le secret était :", secret)

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Choisir entre `Pour` (nombre fixe d'itérations) et `Tant Que` (condition de fin).
* [x] Écrire un contrôle de saisie en Python sans utiliser `break`.
* [x] Utiliser une variable booléenne comme drapeau d'arrêt (`trouve = True`).
* [x] S'assurer que toute boucle `while` possède un mécanisme explicite de fin pour éviter les boucles infinies.