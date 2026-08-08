# 📖 Fiche de Séance N°18 : Contrôle des Actionneurs

**Module 5 :** Internet & Objets Connectés (IoT - ESP32)

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** MicroPython (Python IDE / Wokwi Simulator) & C++ (Arduino IDE)

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Définir le rôle d'un **Actionneur** dans un système embarqué IoT : composant recevant un ordre électrique du microcontrôleur pour exécuter une action physique dans l'environnement (mouvement, signal sonore, éclairage, commutation).
* Comprendre le principe de la **Modulation de Largeur d'Impulsion (PWM - Pulse Width Modulation)** :
  * Signal carré à fréquence constante $f$ (Hz) dont on fait varier le temps à l'état HAUT ($t_{on}$).
  * **Rapport Cyclique (Duty Cycle $D$) :**
    $$D = \frac{t_{on}}{T} \times 100\%$$
  * Résolution PWM de l'ESP32 en MicroPython : **10 bits** (rapport cyclique codé de $0$ à $1023$).
* Comprendre la commande du **Servomoteur SG90** :
  * Fréquence fixe de $50\,\text{Hz}$ (période $T = 20\,\text{ms}$).
  * Angle de $0^\circ$ ($t_{on} \approx 1.0\,\text{ms}$) ➔ Duty Cycle MicroPython $\approx 26$.
  * Angle de $90^\circ$ ($t_{on} \approx 1.5\,\text{ms}$) ➔ Duty Cycle MicroPython $\approx 77$.
  * Angle de $180^\circ$ ($t_{on} \approx 2.0\,\text{ms}$) ➔ Duty Cycle MicroPython $\approx 123$.
* Découvrir le principe de génération sonore sur un **Buzzer Piezoélectrique** en faisant varier la fréquence de la PWM (`PWM(Pin(12), freq=440)` pour la note La 440 Hz).

### **B. Savoir-faire (Compétences pratiques)**

* Configurer et piloter une sortie **PWM** en MicroPython (`PWM(Pin(pin), freq=f, duty=d)`).
* Écrire une fonction de conversion d'angle ($0^\circ \dots 180^\circ$) vers la valeur de Duty Cycle pour le servomoteur SG90.
* Générer des signaux sonores d'alerte et des mélodies simples sur un buzzer.
* Programmer une **Boucle de Régulation Automatique** fermée interconnectant un capteur et des actionneurs (ex: Si Température $> 28^\circ\text{C}$, orienter le servomoteur à $90^\circ$ et déclencher le buzzer d'alarme).

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème & Notion d'Actionneur** | 15 min | Présentation de mécanismes automatisés (Barrière automatique de parking, Climatisation autorégulée). Identification des actionneurs (Servo, Buzzer, LED). | Identification du rôle de l'actionneur et de la nécessité de convertir une consigne logique en action physique. | Vidéo / Diaporama |
| **2. Théorie PWM & Servomoteur SG90** | 20 min | Explication de la PWM (Rapport cyclique $0\dots1023$, fréquence $50\,\text{Hz}$) et calcul des durées d'impulsion pour le servomoteur SG90 ($0^\circ$, $90^\circ$, $180^\circ$). | Prise de notes et calcul des valeurs de Duty Cycle pour la commande angulaire du servomoteur. | Tableau / Fiche élève |
| **3. Travaux Pratiques sur Machine** | 40 min | Encadrement des élèves pour le montage et le codage sous Thonny :<br>1. Balayage du servomoteur SG90 sur **GPIO 13**.<br>2. Alarme sonore Buzzer sur **GPIO 12**.<br>3. Boucle de régulation Capteur DHT11 ➔ Actionneurs. | Réalisation des montages sur breadboard, saisie des scripts MicroPython et test des mouvements/sons. | Python IDE, ESP32, Servo SG90, Buzzer |
| **4. Synthèse & Évaluation Formative** | 15 min | Quiz de validation et défi pratique (Système de barrière intelligente avec détection et alarme). | Réponse au quiz et assemblage du script global de régulation. | Environnement de TP |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. La Modulation de Largeur d'Impulsion (PWM)**

La **PWM** permet de simuler un signal analogique variable à partir d'une sortie numérique (0V / 3.3V) en faisant varier la proportion de temps pendant laquelle le signal est au niveau HAUT.

```text
Rapport Cyclique (Duty) = 25% (256/1023)  ──► [ █   █   █   ] ──► Faible puissance / Lum. faible
Rapport Cyclique (Duty) = 50% (512/1023)  ──► [ ██  ██  ██  ] ──► Puissance moyenne / Servomoteur 90°
Rapport Cyclique (Duty) = 75% (768/1023)  ──► [ ███ ███ ███ ] ──► Forte puissance / Lum. élevée
```

---

### **II. Commande du Servomoteur SG90**

Le servomoteur SG90 se pilote avec un signal PWM de **fréquence $50\,\text{Hz}$** (Période $T = 20\,\text{ms}$).

#### **Fonction MicroPython de Positionnement Angulaire :**

```python
from machine import Pin, PWM
import time

# Configuration du GPIO 13 en sortie PWM à 50 Hz pour le servomoteur SG90
servo = PWM(Pin(13), freq=50)

def poser_angle(angle):
    """
    Convertit un angle en degrés (0 à 180) en valeur de rapport cyclique PWM (duty 10 bits).
    0°   -> duty = 26  (impulsion 1.0 ms)
    90°  -> duty = 77  (impulsion 1.5 ms)
    180° -> duty = 123 (impulsion 2.0 ms)
    """
    duty_val = int(26 + (angle / 180.0) * (123 - 26))
    servo.duty(duty_val)

# Exemple : Balayage progressif de 0° à 180°
print("Balayage du servomoteur SG90...")
for deg in range(0, 181, 45):
    print("Angle :", deg, "degrés")
    poser_angle(deg)
    time.sleep(1)
```

---

### **III. Génération Sonore sur Buzzer Piezoélectrique**

Pour émettre un son sur un buzzer piezo connecté au **GPIO 12**, on modifie la **fréquence** de la PWM avec un rapport cyclique de 50% ($duty = 512$) :

```python
from machine import Pin, PWM
import time

# Configuration du Buzzer sur le GPIO 12
buzzer = PWM(Pin(12))

def jouer_note(frequence, duree_sec):
    if frequence > 0:
        buzzer.freq(frequence)
        buzzer.duty(512) # 50% de puissance
    else:
        buzzer.duty(0)   # Silence
    time.sleep(duree_sec)
    buzzer.duty(0)

# Notes de musique (Fréquences en Hz)
DO = 262
RE = 294
MI = 330
FA = 349
SOL = 392
LA = 440

print("Jouer une petite alarme sonore...")
jouer_note(LA, 0.3)
time.sleep(0.1)
jouer_note(LA, 0.3)
```

---

### **IV. Boucle de Régulation Automatique (Capteur ➔ Actionneur)**

Exemple de système complet : **Climatiseur / Extracteur automatique** basé sur le capteur **DHT11** (GPIO 15), le **Servomoteur SG90** (GPIO 13) et le **Buzzer** (GPIO 12).

```python
import dht
from machine import Pin, PWM
import time

sensor = dht.DHT11(Pin(15))
servo = PWM(Pin(13), freq=50)
buzzer = PWM(Pin(12))

def poser_angle(angle):
    duty_val = int(26 + (angle / 180.0) * (123 - 26))
    servo.duty(duty_val)

SEUIL_TEMP = 28.0 # °C

while True:
    try:
        sensor.measure()
        temp = sensor.temperature()
        print("Température mesurée :", temp, "°C")
        
        if temp >= SEUIL_TEMP:
            print("⚠️ Seuil dépassé ! Ouverture clapet ventilation (90°) + Alarme.")
            poser_angle(90)          # Ouvrir la vanne à 90°
            buzzer.freq(880)         # Son d'alerte aigu
            buzzer.duty(512)
        else:
            print("✅ Température normale. Clapet fermé (0°).")
            poser_angle(0)           # Fermer la vanne à 0°
            buzzer.duty(0)           # Éteindre le buzzer
            
    except OSError:
        print("Erreur capteur DHT11")
        
    time.sleep(2)
```

---

## 💻 4. Exercices Pratiques & Travaux Dirigés

### **Exercice 1 : Calcul de Rapport Cyclique PWM**
Calculer la valeur du `duty` MicroPython (0-1023) pour les angles suivants du servomoteur SG90 :
1. Angle $= 45^\circ \implies duty = 26 + \frac{45}{180} \times (123 - 26) = 26 + 24.25 \approx \mathbf{50}$
2. Angle $= 135^\circ \implies duty = 26 + \frac{135}{180} \times (123 - 26) = 26 + 72.75 \approx \mathbf{99}$

### **Exercice 2 : Barrière Automatique de Parking**
On souhaite concevoir le contrôle d'une barrière de parking :
- En état normal, la barrière est fermée (angle $0^\circ$).
- Quand un véhicule est détecté (bouton ou capteur d'obstacle au niveau BAS `0`), ouvrir la barrière (angle $90^\circ$), émettre un bip sonore de $0.5\,\text{s}$, attendre $3\,\text{s}$, puis refermer la barrière (angle $0^\circ$).
