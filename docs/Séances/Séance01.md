# 📖 Fiche de Séance N°1 : Évaluation Diagnostique & Consolidation des Bases Python

**Module 1 :** Révision & Consolidation des Acquis

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Python / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Identifier la structure générale d'un algorithme et la déclaration des objets (Variables et Constantes).
* Distinguer les types de données simples : `Entier`, `Réel`, `Caractère`, `Booléen`, `Chaîne de caractères`.
* Maîtriser la correspondance entre la syntaxe algorithmique officielle et sa traduction en Python (`int`, `float`, `bool`, `str`).

### **B. Savoir-faire (Compétences pratiques)**

* Exprimer les opérations d'entrée/sortie (`Lire` / `input()`, `Écrire` / `print()`) et d'affectation (`←` / `=`).
* Effectuer les conversions de types explicites (`int()`, `float()`, `str()`).
* Écrire, tester et exécuter une séquence d'instructions simple dans l'environnement de développement Python.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Diagnostic** | 15 min | Questionnement oral / QCM rapide pour sonder les prérequis de 2ème année. | Réponse aux questions, identification des lacunes sur les types et l'affectation. | Tableau / ProProjecteur |
| **2. Synthèse Théorique** | 25 min | Présentation structurée du rappel de cours . | Prise de notes sur le cahier / support de cours. | Fiche de résumé |
| **3. Activité Guidée** | 35 min | Proposer l'activité pratique (Calcul de facture/moyenne). Guidage de l'analyse et du TDO. | Analyse du problème, rédaction de l'algorithme et saisie du code sur machine. | Ordinateur (Python IDE) |
| **4. Évaluation Formative** | 15 min | Vérification individuelle des scripts Python, correction collective des erreurs fréquentes. | Exécution du programme, test avec différents jeux d'essais. | Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Structure Générale d'un Algorithme & Déclaration**

```text
ALGORITHME Nom_Algorithme
DEBUT
    // Séquence d'instructions
FIN

```

#### **Tableau de Déclaration des Objets (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `nom` | Chaîne de caractères | Stocke le nom de l'utilisateur |
| `age` | Entier | Stocke l'âge |
| `moyenne` | Réel | Stocke la moyenne calculée |
| `PI` | Constante = 3.14 | Valeur constante |

---

### **II. Correspondance Algorithme ➔ Python**

| Opération / Concept | Syntaxe Algorithmique  | Traduction en Python | Remarques |
| --- | --- | --- | --- |
| **Type Entier** | `Entier` | `int` | Ex: `12`, `-5` |
| **Type Réel** | `Réel` | `float` | Ex: `14.5`, `3.14` |
| **Type Chaîne** | `Chaîne de caractères` | `str` | Ex: `"Tunisie"`, `'Python'` |
| **Type Booléen** | `Booléen` | `bool` | `True` ou `False` |
| **Affectation** | `Variable ← Expression` | `Variable = Expression` | `x = 5` |
| **Saisie (Entrée)** | `Lire(Variable)` | `Variable = input("Message : ")` | `input()` retourne toujours un `str` |
| **Affichage (Sortie)** | `Écrire("Message", Variable)` | `print("Message", Variable)` |  |

---

### **III. Conversions de Types en Python**

Puisque `input()` renvoie systématiquement une chaîne de caractères (`str`), une conversion explicite est nécessaire avant tout calcul mathématique :

```python
# Conversion d'une chaîne vers un entier
nb = int(input("Donner un nombre entier : "))

# Conversion d'une chaîne vers un réel
prix = float(input("Donner le prix : "))

# Conversion d'un nombre vers une chaîne (pour concaténation)
message = "Votre note est : " + str(15.5)

```

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Analyse et Correction de Séquences Code (10 min)**

*Énoncé :* L'élève doit analyser la séquence Python suivante, identifier l'erreur et la corriger.

```python
# Séquence erronée
a = input("Donner a : ")
b = input("Donner b : ")
somme = a + b
print("La somme est :", somme)

```

* **Analyse de l'erreur :** Si `a = "5"` et `b = "3"`, `somme` recevra `"53"` (concaténation de chaînes) au lieu de `8` (addition numérique).
* **Correction :**

```python
a = int(input("Donner a : "))
b = int(input("Donner b : "))
somme = a + b
print("La somme est :", somme)

```

---

### **Activité 2 : Résolution d'un Problème Complet (25 min)**

#### **Énoncé du problème :**

On souhaite concevoir une application pour une bibliothèque scolaire qui calcule le **montant total de pénalité de retard** pour l'emprunt d'un livre.

* Le système demande le nom de l'élève, le titre du livre et le nombre de jours de retard.
* La pénalité de base est fixée à **0.500 DT par jour** de retard.
* Une taxe fixe de gestion de **1.200 DT** est ajoutée au montant total.

---

#### **1. Analyse du Problème**

* **Données d'entrée (Entrées) :**
* Nom de l'élève (`nom` : Chaîne)
* Titre du livre (`titre` : Chaîne)
* Nombre de jours de retard (`nb_jours` : Entier)


* **Données de sortie (Sorties) :**
* Montant total à payer (`montant_total` : Réel)


* **Traitement :**
* $montant\_total = (nb\_jours \times TARIF\_JOUR) + TAXE\_FIXE$



---

#### **2. Tableau de Déclaration des Objets (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `nom` | Chaîne de caractères | Nom de l'élève |
| `titre` | Chaîne de caractères | Titre du livre |
| `nb_jours` | Entier | Nombre de jours de retard |
| `montant_total` | Réel | Montant final de la pénalité |
| `TARIF_JOUR` | Constante = 0.500 | Tarif de retard journalier |
| `TAXE_FIXE` | Constante = 1.200 | Frais fixes de gestion |

---

#### **3. AlgorithmeConventions**

```text
ALGORITHME Calcul_Penalite
DEBUT
    Écrire("Nom de l'élève : ")
    Lire(nom)
    Écrire("Titre du livre : ")
    Lire(titre)
    Écrire("Nombre de jours de retard : ")
    Lire(nb_jours)
    
    montant_total ← (nb_jours * TARIF_JOUR) + TAXE_FIXE
    
    Écrire("Élève : ", nom)
    Écrire("Livre : ", titre)
    Écrire("Montant total de la pénalité : ", montant_total, " DT")
FIN

```

---

#### **4. Implémentation Python (Python IDE)**

```python
# =========================================================
# Programme : Calcul de Pénalité de Retard
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

# Declarations des constantes
TARIF_JOUR = 0.500
TAXE_FIXE = 1.200

# Saisie des donnees
nom = input("Nom de l'élève : ")
titre = input("Titre du livre : ")
nb_jours = int(input("Nombre de jours de retard : "))

# Traitement
montant_total = (nb_jours * TARIF_JOUR) + TAXE_FIXE

# Affichage des resultats
print("\n--- FICHE DE PÉNALITÉ ---")
print("Élève :", nom)
print("Livre :", titre)
print("Montant total à payer :", montant_total, "DT")

```

---

## 🔍 5. Évaluation & Auto-contrôle (Fiche d'évaluation rapide)

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Utiliser correctement `input()` avec conversion (`int()` ou `float()`).
* [x] Rédiger un TDO conforme aux normes ministérielles.
* [x] Distinguer l'opérateur d'affectation (`=`) de l'opérateur de comparaison (`==`).
* [x] Exécuter un script Python sans erreur de type (`TypeError`).