# 📖 Fiche de Séance N°3 : Structure Conditionnelle à Choix Multiples (`Selon`)

**Module 2 :** Structures de Contrôle et de Données Avancées

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE (Python 3.10+) / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Identifier l'intérêt de la structure à choix multiples par rapport à une suite d'instructions `Si ... Sinon Si ...` imbriquées.
* Apprendre la syntaxe algorithmique officielle de la structure `Selon` avec un sélecteur de type **scalaire** (`Entier` ou `Caractère`).
* Connaître la notation des listes de valeurs (`v1, v2`) et des intervalles (`v1 .. v2`) en algorithmique.
* Maîtriser la traduction en Python avec `match ... case` (Python 3.10+) et son équivalence avec `if ... elif ... else`.

### **B. Savoir-faire (Compétences pratiques)**

* Concevoir un menu interactif à choix multiples.
* Valider le sélecteur d'entrée et gérer les cas non prévus via la clause `Sinon` / `case _`.
* Implémenter, tester et valider un programme Python structuré avec des branchements multiples.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Mise en situation** | 15 min | Présenter un problème nécessitant 5 à 6 choix (ex: Menu d'options) et montrer la lourdeur d'un `Si` généralisé. | Analyser la complexité du code et exprimer le besoin d'une structure plus lisible. | ProProjecteur / Tableau |
| **2. Synthèse Théorique** | 20 min | Explication de la syntaxe `Selon`, des règles sur le sélecteur (type scalaire) et de l'équivalent Python `match...case`. | Prise de notes et compréhension de la structure du `match...case`. | Fiche de cours |
| **3. Activité Guidée** | 40 min | Présentation de l'activité pratique (Menu de conversion et de calculs). Encadrement de l'analyse, TDO et algorithme. | Analyse du problème, élaboration du TDO, écriture algorithmique et codage sur machine. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Vérification des programmes sur machine, tests des cas hors limites (gestion de l'option par défaut `_`). | Validation du script, correction des erreurs de syntaxe Python 3.10. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Concept & Intérêt**

La structure à choix multiples permet de choisir un traitement parmi plusieurs en fonction de la valeur d'une seule expression appelée **Sélecteur**.

> 💡 **Règle fondamentale :** Le sélecteur doit être impérativement de **type scalaire** (`Entier` ou `Caractère`). Le type `Réel` ou `Chaîne de caractères` est à éviter comme sélecteur en algorithmique officielle.

---

### **II. Syntaxe Algorithmique Officielle (Conventions 2024-2025)**

```text
Selon Sélecteur
    Valeur1 : Traitement1
    Valeur2, Valeur3 : Traitement2
    Valeur4 .. Valeur5 : Traitement3
    Sinon
        TraitementParDéfaut
Fin Selon

```

* **Valeurs isolées :** `1 : Traitement`
* **Liste de valeurs :** `'A', 'E', 'I', 'O', 'U', 'Y' : Traitement`
* **Intervalle de valeurs :** `10 .. 20 : Traitement`

---

### **III. Implémentation en Python (`match ... case`)**

Depuis Python 3.10, la structure `match ... case` traduit directement la structure `Selon` :

```python
match selecteur:
    case valeur1:
        traitement1
    case valeur2 | valeur3:
        traitement2
    case s if valeur4 <= s <= valeur5:
        traitement3
    case _:
        traitement_par_defaut

```

* Le symbole `|` représente le `OU` logique entre plusieurs valeurs.
* Le motif `case _:` capture toutes les valeurs non spécifiées au préalable (équivalent du `Sinon`).

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Analyse de Code & Refactoring (10 min)**

*Énoncé :* Réécrire la séquence Python suivante (utilisant `if...elif`) en utilisant la structure moderne `match...case`.

```python
# Code initial avec if/elif
code = int(input("Entrez le code tarifaire (1, 2, 3 ou 4) : "))

if code == 1:
    tarif = 10.0
elif code == 2 or code == 3:
    tarif = 15.0
elif code == 4:
    tarif = 20.0
else:
    tarif = 0.0
    print("Code invalide")

```

#### **Solution réécrite avec `match...case` :**

```python
code = int(input("Entrez le code tarifaire (1, 2, 3 ou 4) : "))

match code:
    case 1:
        tarif = 10.0
    case 2 | 3:
        tarif = 15.0
    case 4:
        tarif = 20.0
    case _:
        tarif = 0.0
        print("Code invalide")

print("Tarif appliqué :", tarif, "DT")

```

---

### **Activité 2 : Résolution d'un Problème Complet (30 min)**

#### **Énoncé du problème :**

On souhaite créer un **Convertisseur d'Unités de Stockage Informatique & Calculateur de Téléchargement**.

L'application affiche un menu principal à l'utilisateur :

1. Convertir des **Octets (Oct)** en **Kilo-Octets (Ko)**
2. Convertir des **Octets (Oct)** en **Méga-Octets (Mo)**
3. Convertir des **Octets (Oct)** en **Giga-Octets (Go)**
4. Calculer la durée estimée de téléchargement (en secondes) d'un fichier en Octets sur une connexion de **10 Mo/s**

L'utilisateur saisit son choix (`choix` : 1 à 4) puis la taille du fichier en Octets (`taille_octets`). Si le choix est invalide, un message d'erreur est affiché.

---

#### **1. Analyse du Problème**

* **Données d'entrée (Entrées) :**
* Option choisie (`choix` : Entier)
* Taille du fichier (`taille_octets` : Réel)


* **Données de sortie (Sorties) :**
* Résultat converti ou durée calculée (`resultat` : Réel)


* **Traitements :**
* Selon la valeur de `choix` :
* **Choix 1 :** $resultat = \frac{taille\_octets}{1024}$
* **Choix 2 :** $resultat = \frac{taille\_octets}{1024 \times 1024}$
* **Choix 3 :** $resultat = \frac{taille\_octets}{1024 \times 1024 \times 1024}$
* **Choix 4 :** $taille\_Mo = \frac{taille\_octets}{1024 \times 1024}$, puis $duree = \frac{taille\_Mo}{10}$





---

#### **2. Tableau de Déclaration des Objets (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `choix` | Entier | Sélecteur de l'option du menu (1 à 4) |
| `taille_octets` | Réel | Taille du fichier saisie en Octets |
| `resultat` | Réel | Résultat du calcul de conversion ou de durée |
| `VITESSE_MO_S` | Constante = 10.0 | Vitesse de connexion réseau en Mo/s |

---

#### **3. Algorithme (Conventions Ministérielles 2024-2025)**

```text
ALGORITHME Convertisseur_Stockage
DEBUT
    Écrire("=== MENU STOCKAGE & RÉSEAU ===")
    Écrire("1. Convertir Octets en Kilo-Octets (Ko)")
    Écrire("2. Convertir Octets en Méga-Octets (Mo)")
    Écrire("3. Convertir Octets en Giga-Octets (Go)")
    Écrire("4. Calculer la durée de téléchargement (10 Mo/s)")
    Écrire("Votre choix (1-4) : ")
    Lire(choix)
    
    Écrire("Donner la taille du fichier en Octets : ")
    Lire(taille_octets)
    
    Selon choix
        1 : 
            resultat ← taille_octets / 1024
            Écrire("Taille en Ko : ", resultat)
        2 : 
            resultat ← taille_octets / (1024 * 1024)
            Écrire("Taille en Mo : ", resultat)
        3 : 
            resultat ← taille_octets / (1024 * 1024 * 1024)
            Écrire("Taille en Go : ", resultat)
        4 : 
            resultat ← (taille_octets / (1024 * 1024)) / 10.0
            Écrire("Durée estimée de téléchargement : ", resultat, " secondes")
        Sinon
            Écrire("Erreur : Choix invalide !")
    Fin Selon
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

```python
# =========================================================
# Programme : Convertisseur de Stockage Informatique
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

# Constantes
VITESSE_MO_S = 10.0

# Affichage du Menu
print("=== MENU STOCKAGE & RÉSEAU ===")
print("1. Convertir Octets en Kilo-Octets (Ko)")
print("2. Convertir Octets en Méga-Octets (Mo)")
print("3. Convertir Octets en Giga-Octets (Go)")
print("4. Calculer la durée de téléchargement (10 Mo/s)")

# Saisie des entrées
choix = int(input("Votre choix (1-4) : "))
taille_octets = float(input("Donner la taille du fichier en Octets : "))

# Traitement avec match...case
match choix:
    case 1:
        resultat = taille_octets / 1024
        print("Taille en Ko :", round(resultat, 3))
    case 2:
        resultat = taille_octets / (1024 * 1024)
        print("Taille en Mo :", round(resultat, 3))
    case 3:
        resultat = taille_octets / (1024 * 1024 * 1024)
        print("Taille en Go :", round(resultat, 4))
    case 4:
        taille_mo = taille_octets / (1024 * 1024)
        resultat = taille_mo / VITESSE_MO_S
        print("Durée estimée de téléchargement :", round(resultat, 2), "secondes")
    case _:
        print("Erreur : Choix invalide ! Veuillez saisir un nombre entre 1 et 4.")

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Vérifier que le sélecteur utilisé dans `Selon` est de type scalaire (`Entier` ou `Caractère`).
* [x] Rédiger la structure `match ... case` en Python avec la branche par défaut `case _:`.
* [x] Utiliser l'opérateur `|` pour regrouper plusieurs cas dans un seul `case` Python.
* [x] Tester toutes les branches du programme, y compris le cas de saisie d'un choix invalide.