# 📖 Fiche de Séance N°2 : Consolidation des Structures de Contrôle Simples

**Module 1 :** Révision & Consolidation des Acquis

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Maîtriser la syntaxe algorithmique de la structure conditionnelle alternative (`Si ... Alors ... Sinon`) et généralisée (`Si ... Sinon Si ...`).
* Maîtriser la syntaxe de la structure répétitive bornée (`Pour ... De ... À ... Faire`).
* Comprendre le fonctionnement de la fonction `range(début, fin + 1, pas)` en Python et la gestion des accumulateurs (somme, produit) et compteurs.

### **B. Savoir-faire (Compétences pratiques)**

* Traduire une condition complexe (utilisant les opérateurs logiques `Et`, `Ou`, `Non`) en Python (`and`, `or`, `not`).
* Concevoir un algorithme utilisant une boucle `Pour` pour effectuer des calculs cumulatifs.
* Saisir, exécuter et débugger un script Python utilisant des conditions et des boucles bornées.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Rappel & Diagnostic** | 10 min | Rappel rapide des structures alternatives et itératives vues en 2ème année. | Participation orale, identification de la différence entre choix et répétition. | Tableau |
| **2. Synthèse Théorique** | 25 min | Présentation des règles d'écriture des structures `Si` et `Pour` (Conventions 2024-2025). Focus sur `range()`. | Prise de notes et analyse des exemples d'accumulation (somme/compteur). | ProProjecteur / Fiche |
| **3. Activité Guidée** | 40 min | Présentation du problème pratique (Calcul de primes et salaire). Encadrement de l'analyse et du TDO. | Rédaction de l'analyse, élaboration du TDO, écriture de l'algorithme et codage Python. | Ordinateur (Thonny IDE) |
| **4. Évaluation Formative** | 15 min | Test sur machine avec des jeux d'essais variés (ex: cas limites $N = 0$, valeurs négatives). | Validation du script Python, correction des erreurs d'indentation ou de bornes. | Environnement Python |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. La Structure Conditionnelle**

La structure conditionnelle permet d'exécuter un traitement uniquement si une condition est vérifiée (`Vrai`).

#### **1. Forme Alternative (Si ... Alors ... Sinon)**

```text
-- Algorithme
Si Condition Alors
    Traitement1
Sinon
    Traitement2
FinSi

```

```python
# Python
if condition:
    traitement1
else:
    traitement2

```

#### **2. Forme Generalisee (Si ... Sinon Si ...)**

```text
-- Algorithme
Si Condition1 Alors
    Traitement1
Sinon Si Condition2 Alors
    Traitement2
Sinon
    TraitementN
FinSi

```

```python
# Python
if condition1:
    traitement1
elif condition2:
    traitement2
else:
    traitementN

```

---

### **II. La Structure Répétitive Bornée (`Pour`)**

Elle est utilisée lorsque le **nombre de répétitions est connu à l'avance**.

```text
-- Algorithme
Pour compteur de Début à Fin [Pas = v_pas] Faire
    Traitement
Fin Pour

```

```python
# Python
for compteur in range(début, fin + 1, pas):
    traitement

```

> ⚠️ **Piège classique en Python :** La borne supérieure du `range(a, b)` est **exclue**. Pour répéter un traitement pour `compteur` allant de `1` à `N`, il faut écrire `range(1, N + 1)`. Par défaut, le pas est égal à `1`.

---

### **III. Les Motifs Classiques : Compteur et Accumulateur**

| Rôle | Initialisation (Avant la boucle) | Traitement (Dans la boucle) |
| --- | --- | --- |
| **Compteur** (Compter des éléments) | `c ← 0` | `c ← c + 1` |
| **Accumulateur** (Sommer des valeurs) | `somme ← 0` | `somme ← somme + valeur` |
| **Produit cumulé** | `p ← 1` | `p ← p * valeur` |

---

## 💻 4. Activités Pratiques sur Machine

### **Activité 1 : Débogage & Analyse de Code (10 min)**

*Énoncé :* L'élève doit analyser ce script Python censé afficher la somme des nombres pairs entre `1` et `N`, et corriger les **3 erreurs** glissées.

```python
# Script contenant des erreurs
n = input("Donner N : ")
somme = 0
for i in range(1, n):
    if i % 2 == 1:
        somme = i
print("Somme =", somme)

```

#### **Correction & Explication :**

1. `n` doit être converti en entier : `n = int(input(...))`.
2. La boucle doit inclure `n` : `range(1, n + 1)`.
3. Le test de parité est `i % 2 == 0` (et non `1`).
4. L'accumulation nécessite `somme = somme + i` (ou `somme += i`).

```python
# Code corrigé
n = int(input("Donner N : "))
somme = 0
for i in range(1, n + 1):
    if i % 2 == 0:
        somme += i
print("Somme =", somme)

```

---

### **Activité 2 : Résolution d'un Problème Complet (30 min)**

#### **Énoncé du problème :**

Une entreprise commerciale calcule le **salaire mensuel net** de ses vendeurs sur une période de **$N$ jours ouvrables** (saisi par l'utilisateur).

* Le salaire de base quotidien est de **35.000 DT**.
* Pour chaque jour $i$ ($1 \le i \le N$), l'utilisateur saisit le nombre de ventes réalisées.
* Si le nombre de ventes d'un jour est **supérieur à 10**, le vendeur touche une **prime journalière de 15.000 DT** pour ce jour-là.
* À la fin du mois, si le total des ventes réalisées dépasse **150 articles**, une **prime de performance globale de 100.000 DT** est ajoutée au salaire net.

---

#### **1. Analyse du Problème**

* **Données d'entrée (Entrées) :**
* Nombre de jours ouvrables (`n` : Entier)
* Nombre de ventes quotidiennes (`nb_ventes` : Entier, saisi $N$ fois)


* **Données de sortie (Sorties) :**
* Total des ventes (`total_ventes` : Entier)
* Salaire net mensuel (`salaire_net` : Réel)


* **Traitements :**
1. Initialiser `total_ventes` à 0 et `salaire_net` à 0.0.
2. Pour chaque jour $i$ de $1$ à $n$ :
* $total\_ventes \leftarrow total\_ventes + nb\_ventes$
* $salaire\_net \leftarrow salaire\_net + 35.000$
* Si $nb\_ventes > 10$ Alors $salaire\_net \leftarrow salaire\_net + 15.000$


3. Après la boucle, si $total\_ventes > 150$ Alors $salaire\_net \leftarrow salaire\_net + 100.000$



---

#### **2. Tableau de Déclaration des Objets (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre de jours ouvrables du mois |
| `i` | Entier | Compteur de la boucle `Pour` |
| `nb_ventes` | Entier | Nombre de ventes du jour $i$ |
| `total_ventes` | Entier | Accumulateur du nombre total de ventes |
| `salaire_net` | Réel | Accumulateur du salaire net mensuel |
| `BASE_JOUR` | Constante = 35.000 | Salaire fixe par jour |
| `PRIME_JOUR` | Constante = 15.000 | Prime par jour à fort volume |
| `PRIME_GLOBALE` | Constante = 100.000 | Prime de performance mensuelle |

---

#### **3. Algorithme (Conventions Ministérielles 2024-2025)**

```text
ALGORITHME Calcul_Salaire_Vendeur
DEBUT
    Écrire("Donner le nombre de jours ouvrables (N) : ")
    Lire(n)
    
    total_ventes ← 0
    salaire_net ← 0.0
    
    Pour i de 1 à n Faire
        Écrire("Nombre de ventes pour le jour ", i, " : ")
        Lire(nb_ventes)
        
        total_ventes ← total_ventes + nb_ventes
        salaire_net ← salaire_net + 35.000
        
        Si (nb_ventes > 10) Alors
            salaire_net ← salaire_net + 15.000
        FinSi
    Fin Pour
    
    Si (total_ventes > 150) Alors
        salaire_net ← salaire_net + 100.000
    FinSi
    
    Écrire("Total des ventes du mois : ", total_ventes)
    Écrire("Salaire net mensuel : ", salaire_net, " DT")
FIN

```

---

#### **4. Implémentation Python (Thonny IDE)**

```python
# =========================================================
# Programme : Calcul du Salaire Mensuel d'un Vendeur
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

# Constantes
BASE_JOUR = 35.000
PRIME_JOUR = 15.000
PRIME_GLOBALE = 100.000

# Entree principale
n = int(input("Donner le nombre de jours ouvrables (N) : "))

# Initialisation des accumulateurs
total_ventes = 0
salaire_net = 0.0

# Boucle pour traiter chaque jour
for i in range(1, n + 1):
    nb_ventes = int(input("Nombre de ventes pour le jour " + str(i) + " : "))
    
    total_ventes += nb_ventes
    salaire_net += BASE_JOUR
    
    if nb_ventes > 10:
        salaire_net += PRIME_JOUR

# Test de la prime globale
if total_ventes > 150:
    salaire_net += PRIME_GLOBALE
    print("Félicitations ! Prime globale de 100.000 DT accordée.")

# Affichage des resultats
print("\n--- BILAN MENSUEL ---")
print("Total d'articles vendus :", total_ventes)
print("Salaire net mensuel :", salaire_net, "DT")

```

---

## 🔍 5. Évaluation & Auto-contrôle

À la fin de cette séance, l'élève doit vérifier qu'il est capable de :

* [x] Utiliser la structure `if...elif...else` sans erreurs de logique.
* [x] Configurer correctement une boucle `for i in range(1, N + 1)`.
* [x] Initialiser les accumulateurs et compteurs **avant** la boucle.
* [x] Imbrquer une condition `if` à l'intérieur d'une boucle `for` avec une indentation correcte.