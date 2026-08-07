# 📅 Planification Annuelle – Informatique (3ème Année)

**Sections :** Sciences Expérimentales, Sciences Techniques et Mathématiques  
**Volume horaire total :** 20 séances × 1h30mn = 30 heures  
**Langages & Outils :** Python, Micro-Python / Arduino IDE, Carte ESP32  
**Référence :** [Aide pédagogique 2024-2025](aide_pedagogique_2024.md)

---

## 🔹 MODULE 1 : RÉVISION & CONSOLIDATION DES ACQUIS (Séances 1 à 2)

### 📍 Séance 1 : Évaluation diagnostique & Consolidation des bases Python
* **Objectifs :** Évaluer et consolider les prérequis de 2ème année : constantes, variables, types de données simples (`entier`, `réel`, `caractère`, `booléen`, `chaîne`), affectation et instructions d'entrée/sortie (`input` / `print`).
* **Contenu / Activités :**
  * Exercices pratiques d'écriture de séquences d'instructions simples.
  * Prise en main / révision de l'environnement de développement Python (IDLE / Thonny / VS Code).

### 📍 Séance 2 : Consolidation des structures de contrôle simples
* **Objectifs :** Réviser la structure conditionnelle (`Si ... Alors ... Sinon`) et la structure répétitive bornée (`Pour`).
* **Contenu / Activités :**
  * Résolution de problèmes simples exigeant des choix conditionnels et des comptages/sommes répétitives.
  * Traduction et exécution de scripts Python.

---

## 🔹 MODULE 2 : STRUCTURES DE CONTRÔLE ET DE DONNÉES AVANCÉES (Séances 3 à 6)

### 📍 Séance 3 : Structure conditionnelle à choix multiple (`Selon`)
* **Objectifs :** Maîtriser la structure conditionnelle `Selon` (algorithmique) et sa traduction en Python (`match...case` ou `if...elif...else`).
* **Contenu / Activités :**
  * Conception d'un menu interactif à choix multiples.
  * Application sur des problèmes de conversion de notes ou de choix d'opérations.

### 📍 Séance 4 : Structures répétitives conditionnelles (`Tant Que` & `Répéter`)
* **Objectifs :** Comprendre et utiliser les boucles non bornées (`Tant Que ... Faire` et `Répéter ... Jusqu'à`). Différencier une boucle bornée d'une boucle conditionnelle.
* **Contenu / Activités :**
  * Contrôle de la saisie d'une donnée (ex: forcer la saisie d'un nombre positif).
  * Application : Jeu de devinette d'un nombre secret.

### 📍 Séance 5 : Structure de données : Les Tableaux à 1 dimension (1D) – Saisie & Parcours
* **Objectifs :** Déclarer, initialiser, remplir (saisir) et afficher les éléments d'un tableau à une dimension (listes en Python).
* **Contenu / Activités :**
  * Lecture et stockage des notes de N élèves dans un tableau.
  * Parcours complet d'un tableau avec affichage des valeurs.

### 📍 Séance 6 : Traitements élémentaires sur les Tableaux 1D
* **Objectifs :** Appliquer des calculs cumulatifs et des recherches élémentaires sur un tableau 1D.
* **Contenu / Activités :**
  * Calcul de la somme et de la moyenne des éléments d'un tableau.
  * Recherche de la valeur maximale / minimale et comptage des éléments vérifiant une condition.

---

## 🔹 MODULE 3 : MODULARITÉ ET DÉCOMPOSITION ALGORITHMIQUE (Séances 7 à 10)

### 📍 Séance 7 : Introduction à la Modularité (Notion de Fonction et Procédure)
* **Objectifs :** Comprendre l'intérêt de la décomposition d'un problème complexe en modules. Définition (`def`) et appel de sous-programmes.
* **Contenu / Activités :**
  * Décomposition d'un problème en tâches élémentaires.
  * Écriture et appel de fonctions simples sans paramètres.

### 📍 Séance 8 : Paramètres, Valeurs de retour et Portée des variables
* **Objectifs :** Identifier les paramètres d'un module, leur type, la valeur de retour (`return`), et la différence entre variables **locales** et **globales**.
* **Contenu / Activités :**
  * Écriture de modules avec paramètres (ex: calcul du périmètre, aire, conversion d'unités).
  * Exercices sur la portée des objets pour éviter les effets de bord.

### 📍 Séance 9 : Modules prédéfinis et Passage de Tableaux en paramètres
* **Objectifs :** Exploiter les modules prédéfinis (`math`, `random`) et transmettre un tableau 1D comme paramètre d'un module personnel.
* **Contenu / Activités :**
  * Module de remplissage automatique d'un tableau avec des valeurs aléatoires.
  * Module d'affichage et de traitement d'un tableau passé en paramètre.

### 📍 Séance 10 : Évaluation pratique intermédiaire (1h30)
* **Objectifs :** Évaluer les compétences de l'élève sur la décomposition modulaire, les boucles conditionnelles et la manipulation des tableaux.
* **Contenu / Activités :** Sujet pratique sur machine combinant tableaux, boucles `while` et fonctions.

---

## 🔹 MODULE 4 : ALGORITHMES CLASSIQUES & MINI-PROJETS PYTHON (Séances 11 à 15)

### 📍 Séance 11 : Arithmétique I – PGCD et PPCM
* **Objectifs :** Concevoir et implémenter les algorithmes de calcul du **PGCD** (soustractions successives / Euclide) et du **PPCM**.
* **Contenu / Activités :**
  * Écriture des fonctions `PGCD(a, b)` et `PPCM(a, b)` en Python.
  * Application : Rendre une fraction irréductible.

### 📍 Séance 12 : Arithmétique II – Nombres Premiers & Décomposition
* **Objectifs :** Développer l'algorithme de test de primalité et l'algorithme de décomposition d'un nombre entier en facteurs premiers.
* **Contenu / Activités :**
  * Fonction `est_premier(n)` vérifiant si un nombre est premier.
  * Procédure/Fonction d'affichage de la décomposition en facteurs premiers.

### 📍 Séance 13 : Recherche Séquentielle dans un Tableau
* **Objectifs :** Concevoir et implémenter l'algorithme de **recherche séquentielle** (linéaire) d'un élément dans un tableau.
* **Contenu / Activités :**
  * Algorithme avec arrêt dès détection de l'élément (utilisation d'un booléen ou d'une boucle `Tant Que`).
  * Retourner la position (index) ou un message d'absence.

### 📍 Séance 14 : Tri d'un Tableau – Le Tri à Bulles
* **Objectifs :** Comprendre le principe du **tri à bulles**, réaliser des permutations d'éléments et implémenter le tri.
* **Contenu / Activités :**
  * Simulation manuelle du tri à bulles sur un exemple.
  * Implémentation du module de tri croissant / décroissant d'un tableau en Python.

### 📍 Séance 15 : Synthèse & Mini-projet modulaire Python
* **Objectifs :** Intégrer l'ensemble des notions (arithmétique, tableaux, tri, recherche et modularité) dans un mini-projet complet.
* **Contenu / Activités :**
  * Réalisation guidée d'un mini-projet (ex. *Gestionnaire de notes d'une classe avec tri et statistiques* ou *Analyseur arithmétique d'une liste de nombres*).

---

## 🔹 MODULE 5 : INTERNET & OBJETS CONNECTÉS (IoT - ESP32) (Séances 16 à 19)

### 📍 Séance 16 : Concepts de l'IoT & Prise en main de la carte ESP32
* **Objectifs :** Identifier l'architecture d'un système IoT, la carte **ESP32**, les entrées/sorties (GPIO pins), la mémoire et les communications (Wi-Fi/Bluetooth).
* **Contenu / Activités :**
  * Présentation matérielle de la carte ESP32.
  * Premier script en Micro-Python / Arduino : Clignotement d'une LED (Blink).

### 📍 Séance 17 : Acquisition de données via les Capteurs
* **Objectifs :** Interfacer des capteurs (température, humidité, luminosité, obstacle) avec l'ESP32 et lire leurs valeurs.
* **Contenu / Activités :**
  * Câblage d'un capteur sur une broche d'entrée (analogique/numérique).
  * Script d'acquisition et d'affichage des mesures en temps réel.

### 📍 Séance 18 : Contrôle des Actionneurs
* **Objectifs :** Pilotage d'actionneurs (LED, servomoteur, moteur pas à pas, buzzer) en réponse aux données d'un capteur.
* **Contenu / Activités :**
  * Programmation de seuils de déclenchement (ex: Si température > 25°C alors allumer le ventilateur/LED).
  * Commande d'un servomoteur ou d'un buzzer.

### 📍 Séance 19 : Projet Intégré IoT embarqué
* **Objectifs :** Réaliser un système autonome complet combinant : Capteur ➔ Carte ESP32 ➔ Communication (Wi-Fi/Bluetooth) ➔ Actionneur.
* **Contenu / Activités :**
  * Mise en œuvre d'un projet concrétisé (ex: *Système d'arrosage automatique*, *Barrière automatique avec détection d'obstacle*, ou *Système d'alerte météo*).

---

## 🔹 MODULE 6 : ÉVALUATION FINALE & BILAN (Séance 20)

### 📍 Séance 20 : Évaluation Pratique Bilan & Bilan Annuel
* **Objectifs :** Valider l'ensemble des compétences pratiques acquises (Programmation modulaire Python et Objets connectés ESP32).
* **Contenu / Activités :**
  * Épreuve pratique bilan sur machine (1h00).
  * Synthèse générale et bilan des projets de l'année (0h30).
