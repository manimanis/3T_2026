# 📖 Fiche de Séance N°15 : Synthèse & Mini-Projet Modulaire Python

**Module 4 :** Algorithmes Classiques & Mini-Projets Python

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** Thonny Python IDE / IDLE

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Mobiliser et synthétiser l'ensemble des notions de programmation modulaire et d'algorithmique acquises dans le Module 4 :
* Contrôle de saisie rigoureux (sans l'instruction `break`).
* Manipulation de tableaux 1D (`numpy.array`) et tableaux parallèles/synchrones.
* Algorithmes classiques : Recherche Séquentielle et Tri à Bulles.
* Architecture modulaire guidée par un menu principal interactif (`match ... case`).



### **B. Savoir-faire (Compétences pratiques)**

* Structurer un projet Python complet comportant au moins 5 modules interconnectés.
* Organiser la logique d'un menu d'application avec boucle de répétition et branchements multiples.
* Tester, débugger et valider le fonctionnement global de l'application sur machine.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Présentation du Projet** | 10 min | Présentation du cahier des charges de l'application *Gestionnaire Intégré d'Évaluation Scolaire (GIES)*. | Prise de connaissance des spécifications et de l'architecture modulaire attendue. | ProProjecteur / Fiche |
| **2. Conception & Décomposition** | 15 min | Encadrement de la décomposition modulaire, de la structuration des tableaux et du TDO/TDL. | Rédaction du TDO/TDL et définition de la signature des 6 modules. | Cahier de TP |
| **3. Développpement Guidé sur Machine** | 50 min | Suivi individuel des élèves, assistance au codage des modules et de la boucle principale sous Thonny. | Écriture des modules, assemblage dans le programme principal et exécution étape par étape. | Ordinateur (Thonny IDE) |
| **4. Évaluation & Recette** | 15 min | Test et recette fonctionnelle des projets élèves sur machine (validation des cas d'erreur et menus). | Démonstration du fonctionnement de l'application et correction des bugs de saisie. | Environnement Python |

---

## 📝 3. Cahier des Charges du Mini-Projet

On souhaite développer l'application **`GIES` (Gestionnaire Intégré d'Évaluation Scolaire)** destinée à un lycée de Hammam Sousse pour gérer les notes d'une classe de $N$ élèves ($3 \le N \le 30$).

### **L'application doit utiliser deux tableaux synchrones :**

* `IDs` : Tableau de $N$ entiers pour les identifiants uniques des élèves.
* `Notes` : Tableau de $N$ réels pour leurs notes ($0.0 \le \text{note} \le 20.0$).

### **Menu d'options interactif proposé à l'utilisateur :**

```text
=== GESTIONNAIRE INTÉGRÉ D'ÉVALUATION SCOLAIRE (GIES) ===
1. Saisir les données de la classe (IDs et Notes)
2. Afficher le relevé de la classe
3. Trier la classe par ordre décroissant des notes (Tri à Bulles)
4. Rechercher un élève par son ID (Recherche Séquentielle)
5. Afficher les statistiques de la classe (Moyenne, Max, Min, Taux de réussite)
6. Quitter l'application

```

---

## 💻 4. Correction Officielle & Architecture Modulaire

### **I. Tableau de Déclaration des Objets Globaux (TDO)**

| Objet | Type / Nature | Rôle |
| --- | --- | --- |
| `n` | Entier | Nombre d'élèves de la classe ($3 \le N \le 30$) |
| `IDs` | Tableau de `N` Entier | Identifiants uniques des élèves |
| `Notes` | Tableau de `N` Réel | Notes des élèves |
| `choix` | Entier | Option sélectionnée dans le menu (1 à 6) |
| `donnees_saisies` | Booléen | Drapeau indiquant si la saisie initiale a été effectuée |

---

### **II. Algorithmes des Modules **

```text
// 1. Fonction Recherche Séquentielle
Fonction recherche_seq (T : Tableau de N Entier, n : Entier, val : Entier) : Entier
DÉCLARATION DES OBJETS LOCAUX
    i, pos : Entier
    trouve : Booléen
DEBUT
    i ← 0
    trouve ← Faux
    pos ← -1
    Tant que (i < n ET trouve = Faux) Faire
        Si (T[i] = val) Alors
            trouve ← Vrai
            pos ← i
        Sinon
            i ← i + 1
        FinSi
    Fin Tant que
    Retourner pos
FIN

// 2. Procédure Saisie des Données
Procédure saisir_donnees (@IDs : Tableau de N Entier, @Notes : Tableau de N Réel, n : Entier)
DÉCLARATION DES OBJETS LOCAUX
    i, id_saisi : Entier
DEBUT
    Pour i de 0 à n - 1 Faire
        Répéter
            Écrire("ID Élève N° ", i + 1, " (> 0) : ")
            Lire(id_saisi)
        Jusqu'à (id_saisi > 0 ET recherche_seq(IDs, i, id_saisi) = -1)
        IDs[i] ← id_saisi
        
        Répéter
            Écrire("Note de l'élève ID ", IDs[i], " (0 à 20) : ")
            Lire(Notes[i])
        Jusqu'à (0.0 ≤ Notes[i] ET Notes[i] ≤ 20.0)
    Fin Pour
FIN

// 3. Procédure Affichage du Relevé
Procédure afficher_releve (IDs : Tableau de N Entier, Notes : Tableau de N Réel, n : Entier)
DEBUT
    Écrire_nl("=== RELEVÉ DE NOTES DE LA CLASSE ===")
    Pour i de 0 à n - 1 Faire
        Écrire("Rang ", i + 1, " | ID : ", IDs[i], " | Note : ", Notes[i], " / 20")
    Fin Pour
FIN

// 4. Procédure Tri Décroissant (Tri à Bulles Synchrone)
Procédure trier_classe (@IDs : Tableau de N Entier, @Notes : Tableau de N Réel, n : Entier)
DÉCLARATION DES OBJETS LOCAUX
    i, j, aux_id : Entier
    aux_note : Réel
DEBUT
    Pour i de 0 à n - 2 Faire
        Pour j de 0 à n - 2 - i Faire
            Si (Notes[j] < Notes[j + 1]) Alors
                // Permutation des notes
                aux_note ← Notes[j]
                Notes[j] ← Notes[j + 1]
                Notes[j + 1] ← aux_note
                
                // Permutation synchrone des IDs
                aux_id ← IDs[j]
                IDs[j] ← IDs[j + 1]
                IDs[j + 1] ← aux_id
            FinSi
        Fin Pour
    Fin Pour
    Écrire("Classe triée par ordre décroissant des notes avec succès !")
FIN

// 5. Procédure Statistiques
Procédure afficher_statistiques (Notes : Tableau de N Réel, n : Entier)
DÉCLARATION DES OBJETS LOCAUX
    somme, max_n, min_n, moy, taux : Réel
    nb_admis : Entier
DEBUT
    somme ← Notes[0]
    max_n ← Notes[0]
    min_n ← Notes[0]
    Si (Notes[0] ≥ 10.0) Alors nb_admis ← 1 Sinon nb_admis ← 0 FinSi
    
    Pour i de 1 à n - 1 Faire
        somme ← somme + Notes[i]
        Si (Notes[i] > max_n) Alors max_n ← Notes[i] FinSi
        Si (Notes[i] < min_n) Alors min_n ← Notes[i] FinSi
        Si (Notes[i] ≥ 10.0) Alors nb_admis ← nb_admis + 1 FinSi
    Fin Pour
    
    moy ← somme / n
    taux ← (nb_admis / n) * 100
    
    Écrire_nl("=== BILAN STATISTIQUE DE LA CLASSE ===")
    Écrire("Moyenne Générale : ", moy, " / 20")
    Écrire("Meilleure Note   : ", max_n, " / 20")
    Écrire("Moins bonne Note : ", min_n, " / 20")
    Écrire("Nombre d'Admis   : ", nb_admis, " / ", n)
    Écrire("Taux de Réussite : ", taux, " %")
FIN

```

---

### **III. Code Python Complet (Thonny IDE)**

```python
# =========================================================
# MINI-PROJET : GESTIONNAIRE INTÉGRÉ D'ÉVALUATION SCOLAIRE (GIES)
# Niveau : 3ème Année Secondary
# Conventions : Ministère de l'Éducation 2024-2025
# =========================================================

from numpy import array

# 1. Fonction de recherche sequentielle
def recherche_seq(T, n, val):
    i = 0
    trouve = False
    pos = -1
    while i < n and not trouve:
        if T[i] == val:
            trouve = True
            pos = i
        else:
            i += 1
    return pos

# 2. Procedure de saisie des donnees de la classe
def saisir_donnees(IDs, Notes, n):
    print("\n--- SAISIE DES ÉLÈVES DE LA CLASSE ---")
    for i in range(n):
        id_val = int(input("ID de l'élève N° " + str(i + 1) + " (> 0) : "))
        while id_val <= 0 or recherche_seq(IDs, i, id_val) != -1:
            id_val = int(input("ID invalide ou existant ! Saisir un ID unique > 0 : "))
        IDs[i] = id_val
        
        note_val = float(input("Note de l'élève ID " + str(IDs[i]) + " (0 à 20) : "))
        while not (0.0 <= note_val <= 20.0):
            note_val = float(input("Invalide ! Saisir une note entre 0 et 20 : "))
        Notes[i] = note_val

# 3. Procedure d'affichage du releve
def afficher_releve(IDs, Notes, n):
    print("\n=== RELEVÉ DE NOTES DE LA CLASSE ===")
    for i in range(n):
        print("Rang", i + 1, "| ID :", IDs[i], "| Note :", Notes[i], "/ 20")

# 4. Procedure de Tri a Bulles Synchrone Decroissant
def trier_classe(IDs, Notes, n):
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if Notes[j] < Notes[j + 1]:  # Ordre décroissant
                # Echange des notes
                aux_note = Notes[j]
                Notes[j] = Notes[j + 1]
                Notes[j + 1] = aux_note
                
                # Echange synchrone des IDs
                aux_id = IDs[j]
                IDs[j] = IDs[j + 1]
                IDs[j + 1] = aux_id
    print("\n✅ Classe triée avec succès par ordre décroissant des notes !")

# 5. Procedure de calcul et d'affichage des statistiques
def afficher_statistiques(Notes, n):
    somme = Notes[0]
    max_n = Notes[0]
    min_n = Notes[0]
    nb_admis = 1 if Notes[0] >= 10.0 else 0
    
    for i in range(1, n):
        somme += Notes[i]
        if Notes[i] > max_n:
            max_n = Notes[i]
        if Notes[i] < min_n:
            min_n = Notes[i]
        if Notes[i] >= 10.0:
            nb_admis += 1
            
    moy = somme / n
    taux = (nb_admis / n) * 100
    
    print("\n=== BILAN STATISTIQUE DE LA CLASSE ===")
    print("Moyenne Générale :", round(moy, 2), "/ 20")
    print("Meilleure Note   :", max_n, "/ 20")
    print("Moins bonne Note :", min_n, "/ 20")
    print("Nombre d'Admis   :", nb_admis, "/", n)
    print("Taux de Réussite :", round(taux, 1), "%")

# =========================================================
# PROGRAMME PRINCIPAL
# =========================================================

# Saisie initiale de la taille N
n = int(input("Donner le nombre d'élèves de la classe (3 à 30) : "))
while not (3 <= n <= 30):
    n = int(input("Invalide ! Saisir N entre 3 et 30 : "))

IDs = array([0] * n)
Notes = array([float()] * n)

donnees_saisies = False
choix = 0

# Boucle principale du Menu (sans break)
while choix != 6:
    print("\n" + "=" * 55)
    print(" GESTIONNAIRE INTÉGRÉ D'ÉVALUATION SCOLAIRE (GIES)")
    print("=" * 55)
    print("1. Saisir les données de la classe (IDs et Notes)")
    print("2. Afficher le relevé de la classe")
    print("3. Trier la classe par ordre décroissant des notes")
    print("4. Rechercher un élève par son ID")
    print("5. Afficher les statistiques de la classe")
    print("6. Quitter l'application")
    
    choix = int(input("\nVotre choix (1-6) : "))
    
    match choix:
        case 1:
            saisir_donnees(IDs, Notes, n)
            donnees_saisies = True
            
        case 2:
            if donnees_saisies:
                afficher_releve(IDs, Notes, n)
            else:
                print("⚠️ Erreur : Veuillez d'abord saisir les données (Option 1).")
                
        case 3:
            if donnees_saisies:
                trier_classe(IDs, Notes, n)
                afficher_releve(IDs, Notes, n)
            else:
                print("⚠️ Erreur : Veuillez d'abord saisir les données (Option 1).")
                
        case 4:
            if donnees_saisies:
                id_q = int(input("Entrez l'ID de l'élève à rechercher : "))
                idx = recherche_seq(IDs, n, id_q)
                if idx != -1:
                    print("✅ Élève trouvé à la position", idx + 1, "| ID :", IDs[idx], "| Note :", Notes[idx], "/ 20")
                else:
                    print("❌ Aucun élève répertorié avec l'ID", id_q)
            else:
                print("⚠️ Erreur : Veuillez d'abord saisir les données (Option 1).")
                
        case 5:
            if donnees_saisies:
                afficher_statistiques(Notes, n)
            else:
                print("⚠️ Erreur : Veuillez d'abord saisir les données (Option 1).")
                
        case 6:
            print("\nMerci d'avoir utilisé l'application GIES. Au revoir !")
            
        case _:
            print("⚠️ Choix invalide ! Veuillez saisir un nombre entre 1 et 6.")

```

---

## 🔍 5. Bilan du Module 4

Au terme de ce Module 4, les élèves ont consolidé les 4 piliers fondamentaux de la programmation algorithmique :

1. **Modularité robuste :** Applications structurées en sous-programmes spécialisés.
2. **Algorithmes de référence :** Recherche séquentielle et Tri à bulles maîtrisés.
3. **Contrôle de flux rigoureux :** Élimination totale de `break` au profit de variables de contrôle booléennes.
4. **IHM Console propre :** Menus interactifs sécurisés par validation d'entrées.