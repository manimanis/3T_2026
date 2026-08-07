# 📖 Fiche de Séance N°20 : Évaluation Pratique Bilan & Bilan Annuel

**Module 6 :** Évaluation Finale & Bilan (Séance N°20)

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min) ➔ [60 min Épreuve sur machine + 30 min Bilan Annuel]

**Environnement :** Thonny Python IDE / MicroPython / ESP32

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Évaluer la maîtrise globale du programme d'Informatique de 3ème Année Secondary :
  * **Module 1 & 2 :** Types de données, structures conditionnelles (`match...case`), répétitives (`while`, `for`) et Tableaux 1D.
  * **Module 3 :** Modularité (Fonctions/Procédures, paramètres, valeurs de retour, portée).
  * **Module 4 :** Algorithmes classiques (Recherche séquentielle, Tri à bulles, Arithmétique).
  * **Module 5 :** Objets Connectés IoT & Carte ESP32 (GPIO, ADC 12 bits, PWM, Capteurs DHT11/LDR, Actionneurs Servo/Buzzer).
* Effectuer une synthèse réflexive sur les compétences acquises et consolider les prérequis de l'année du Baccalauréat (4ème Année).

### **B. Savoir-faire (Compétences pratiques)**

* Concevoir et coder une solution informatique modulaire complète combinant traitement algorithmique sur machine et régulation embarquée IoT.
* Respecter la propreté du code, l'absence d'instructions interdites (`break`), et la validation rigoureuse des cas d'erreur de saisie.

---

## ⏱️ 2. Organisation de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Lancement de l'Épreuve Bilan** | 05 min | Distribution des sujets d'évaluation pratique et rappel des consignes d'examen sur machine. | Prise de connaissance du sujet et ouverture de l'environnement Thonny. | Sujet d'Épreuve imprimé / Postes |
| **2. Épreuve Pratique Individuelle** | 55 min | Surveillance, gestion du chronomètre et assistance technique de premier niveau (problème matériel). | Résolution sur machine des Dossiers 1 (Python Modulaire) et 2 (IoT ESP32). | Micro-ordinateur, Thonny IDE, ESP32 |
| **3. Bilan Annuel & Auto-évaluation** | 30 min | Correction collective des points clés, présentation de la synthèse des 6 modules de l'année et échange d'orientation Bac. | Auto-évaluation de la prestation, prise de notes des conseils et bilan général de l'année. | Grille d'évaluation & Tableau |

---

## 📝 3. Sujet Officiel de l'Épreuve Pratique Bilan (20 points)

### **Mise en Situation :**
Le centre de recherche océanographique de Monastir souhaite développer l'application **`OceanLab`** permettant à la fois de traiter les données de mesure d'une flotte de $N$ bouées météo ($3 \le N \le 20$) et d'assurer la régulation embarquée sur la carte **ESP32** d'une station pilote.

---

### **DOSSIER 1 : Programmation Modulaire Python (10 points)**

On utilise deux tableaux synchrones de taille $N$ :
* `IDs` : Tableau de $N$ entiers représentant les identifiants uniques des bouées.
* `Temp` : Tableau de $N$ réels représentant les températures mesurées en °C ($-10.0 \le \text{temp} \le 50.0$).

#### **Travail à réaliser :**
1. **Écrire la fonction `recherche_seq(T, n, val)`** qui cherche la valeur `val` dans le tableau `T` de taille `n` et retourne son indice (ou `-1` si absente) sans utiliser l'instruction `break`. *(2.5 pts)*
2. **Écrire la procédure `saisir_donnees(IDs, Temp, n)`** qui remplit les deux tableaux avec contrôle de saisie et garantit l'unicité de chaque `ID`. *(3.5 pts)*
3. **Écrire la procédure `tri_bulles_synchrone(IDs, Temp, n)`** qui trie les deux tableaux par ordre **décroissant** des températures. *(4 pts)*

---

### **DOSSIER 2 : Systèmes Embarqués IoT ESP32 (10 points)**

Sur la station pilote ESP32 :
* Le capteur **DHT11** est connecté au **GPIO 15**.
* Le **Servomoteur SG90** (clapet de secours) est connecté au **GPIO 13** (PWM 50Hz).
* Le **Buzzer** d'alarme est connecté au **GPIO 12**.

#### **Travail à réaliser :**
Écrire le script MicroPython permettant de :
1. Lire la température et l'humidité mesurées par le **DHT11**.
2. Si la température dépasse $30^\circ\text{C}$ :
   - Orienter le servomoteur à $90^\circ$ (`duty = 77`).
   - Émettre un signal sonore de $880\,\text{Hz}$ sur le buzzer.
3. Sinon :
   - Maintenir le servomoteur à $0^\circ$ (`duty = 26`) et éteindre le buzzer.

---

## 💻 4. Correction Officielle Complète

```python
# ==============================================================================
# DOSSIER 1 : PYTHON MODULAIRE (OCEANLAB)
# ==============================================================================
import numpy as np

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

def saisir_donnees(IDs, Temp, n):
    for i in range(n):
        print(f"\n--- Saisie Bouée N°{i+1} ---")
        
        # Saisie de l'ID avec contrôle d'unicité
        id_val = int(input("Entrez un ID unique : "))
        while recherche_seq(IDs, i, id_val) != -1 or id_val <= 0:
            id_val = int(input("⚠️ ID invalide ou déjà existant ! Réessayez : "))
        IDs[i] = id_val
        
        # Saisie de la Température (-10.0 à 50.0)
        t_val = float(input("Entrez la température (°C) : "))
        while t_val < -10.0 or t_val > 50.0:
            t_val = float(input("⚠️ Température hors norme (-10 à 50°C) ! Réessayez : "))
        Temp[i] = t_val

def tri_bulles_synchrone(IDs, Temp, n):
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if Temp[j] < Temp[j + 1]: # Ordre Décroissant
                # Échange des Températures
                aux_t = Temp[j]
                Temp[j] = Temp[j + 1]
                Temp[j + 1] = aux_t
                
                # Échange synchrone des IDs
                aux_id = IDs[j]
                IDs[j] = IDs[j + 1]
                IDs[j + 1] = aux_id


# ==============================================================================
# DOSSIER 2 : EMBARQUÉ MICROPYTHON ESP32
# ==============================================================================
from machine import Pin, PWM
import dht
import time

def regule_station_esp32():
    sensor = dht.DHT11(Pin(15))
    servo = PWM(Pin(13), freq=50)
    buzzer = PWM(Pin(12))

    def poser_angle(angle):
        duty_val = int(26 + (angle / 180.0) * (123 - 26))
        servo.duty(duty_val)

    try:
        sensor.measure()
        t = sensor.temperature()
        print("Température ESP32 :", t, "°C")
        
        if t > 30.0:
            poser_angle(90)
            buzzer.freq(880)
            buzzer.duty(512)
        else:
            poser_angle(0)
            buzzer.duty(0)
    except OSError:
        print("Erreur lecture capteur DHT11")
```
