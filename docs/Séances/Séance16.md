# 📖 Fiche de Séance N°16 : Concepts de l'IoT & Prise en main de la carte ESP32

**Module 5 :** Internet & Objets Connectés (IoT - ESP32)

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** MicroPython (Python IDE / Wokwi Simulator) & C++ (Arduino IDE)

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Identifier les composants de la chaîne fonctionnelle d'un système **IoT** (Internet des Objets) : Capteurs ➔ Microcontrôleur (ESP32) ➔ Réseau / Cloud ➔ Actionneurs / Interfaces.
* Découvrir l'architecture matérielle du microcontrôleur **ESP32-WROOM-32** :
  * Processeur **Tensilica Xtensa Dual-Core 32 bits** (fréquence jusqu'à 240 MHz).
  * Mémoire **SRAM** (520 Ko) et mémoire **Flash** externe (4 Mo).
  * Connectivité intégrée : **Wi-Fi** 802.11 b/g/n et **Bluetooth** v4.2 / BLE.
* Identifier les broches du port d'entrées/sorties **GPIO** (General Purpose Input Output) :
  * Entrées/Sorties Numériques, Convertisseur Analogique-Numérique (**ADC**).
  * Broches d'Alimentation (**3V3**, **5V/VIN**, **GND**).
  * LED intégrée à la carte (connectée au **GPIO 2** sur la plupart des modules ESP32 DevKit).
* ⚠️ **Règle de Sécurité Électrique Stricte :** Les broches GPIO de l'ESP32 fonctionnent avec une **tension logique de 3.3 V** (et non 5 V). Ne jamais alimenter directement une broche GPIO avec du 5 V sous peine d'endommager irrémédiablement le microcontrôleur.

### **B. Savoir-faire (Compétences pratiques)**

* Configurer une broche GPIO en mode **Sortie Numérique** (`Pin.OUT` en MicroPython / `OUTPUT` en C++).
* Générer des états logiques haut (`1` / `HIGH` / 3.3V) et bas (`0` / `LOW` / 0V).
* Écrire et exécuter le script de clignotement (**Blink LED**) :
  1. Sur la LED intégrée au **GPIO 2**.
  2. Sur un montage externe (LED rouge + Résistance de protection $R = 220\,\Omega$ sur breadboard).
* Utiliser les fonctions de temporisation (`time.sleep()` / `time.sleep_ms()` en MicroPython, `delay()` en C++).

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Situation Problème & Découverte IoT** | 15 min | Présentation de cas d'usage IoT réels (Serre intelligente, Domotique, Station météo connectée). Définition des rôles capteur / contrôleur / réseau / actionneur. | Analyse de l'architecture d'un système connecté et identification du rôle central du microcontrôleur. | Vidéo / Diaporama / ProProjecteur |
| **2. Présentation Matérielle de l'ESP32** | 20 min | Présentation de la carte ESP32 DevKit V1. Explication du brochage (Pinout GPIO, 3V3, GND), de la LED interne GPIO 2 et des précautions d'alimentation (3.3V max). | Observation du module matériel, identification des broches GPIO2, GND, 3V3 et lecture du schéma de brochage. | Carte ESP32 matériel / Fiche Pinout |
| **3. Montage Électrique & Script Blink** | 40 min | Guidage du câblage de la LED externe avec résistance $R=220\,\Omega$. Démonstration de l'écriture du script Blink en MicroPython sous Thonny / Wokwi. | Réalisation du câblage sur Breadboard. Saisie, téléversement et exécution du script de clignotement sur l'ESP32. | Carte ESP32, Breadboard, LED, Résistance $220\,\Omega$, Python IDE |
| **4. Évaluation Formative & Synthèse** | 15 min | Quiz de validation des notions GPIO/IoT et modification de la fréquence de clignotement (Blink rapide vs lent). | Résolution des questions du quiz et ajustement de la vitesse de clignotement dans le script. | Fiche de TP / Environnement de test |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Qu'est-ce que l'Internet des Objets (IoT) ?**

L'**Internet des Objets (IoT)** désigne l'interconnexion entre des objets physiques du monde réel et le réseau Internet, permettant à ces objets de collecter des données, de les transmettre et d'exécuter des actions à distance.

```text
[ CAPTEURS ] ────► [ CARTE ESP32 ] ────► [ RÉSEAU WI-FI / CLOUD ] ────► [ DASHBOARD / ACTIONNEURS ]
(Température,       (Traitement local       (Protocole MQTT/HTTP           (Affichage smartphone,
 Humidité, Lux)      & Décisions)            ou WebSocket)                  Moteurs, Relais, LED)
```

---

### **II. Spécifications & Cartographie de la Carte ESP32**

La carte **ESP32 DevKit V1** est une plateforme microcontrôleur ultra-polyvalente conçue par Espressif Systems.

| Caractéristique | Spécification Technique |
| --- | --- |
| **Microprocesseur** | Tensilica Xtensa Dual-Core 32 bits LX6 (jusqu'à 240 MHz) |
| **Mémoire SRAM** | 520 Ko (pour l'exécution des variables et scripts) |
| **Mémoire Flash** | 4 Mo (stockage du firmware MicroPython et du code) |
| **Connectivité Sans-Fil** | Wi-Fi 802.11 b/g/n (2.4 GHz) & Bluetooth 4.2 BLE |
| **Tension de Fonctionnement** | **3.3 V** (Tension logique des broches GPIO) |
| **Alimentation Carte** | 5 V via port Micro-USB ou broche **VIN** (5 V) |
| **Broche LED Interne** | **GPIO 2** (LED bleue intégrée sur la carte) |

#### **⚠️ Broches GPIO et Précautions de Câblage :**
1. **Broches Numériques E/S :** Permettent de lire un signal logique (`0` ou `1`) ou de délivrer une tension ($0\,\text{V}$ ou $3.3\,\text{V}$).
2. **GND (Ground) :** Masse commune du circuit ($0\,\text{V}$).
3. **3V3 :** Sortie d'alimentation régulée $3.3\,\text{V}$.
4. **Calcul de la Résistance de Protection de la LED :**
   Pour connecter une LED rouge ($V_{LED} \approx 2.0\,\text{V}$, $I \approx 6\,\text{mA}$) sur le **GPIO 4** :
   $$R = \frac{V_{GPIO} - V_{LED}}{I} = \frac{3.3\,\text{V} - 2.0\,\text{V}}{0.006\,\text{A}} \approx 216.6\,\Omega \implies \text{Résistance standard de } 220\,\Omega$$

---

### **III. Programmation en MicroPython**

En MicroPython, la gestion du matériel s'effectue grâce au module prédéfini **`machine`** (classe `Pin`) et au module **`time`**.

#### **1. Clignotement de la LED Interne (GPIO 2) :**

```python
from machine import Pin
import time

# Initialisation de la broche GPIO 2 en mode SORTIE (Pin.OUT)
led_interne = Pin(2, Pin.OUT)

print("Début du clignotement de la LED interne (GPIO 2)...")

# Boucle infinie d'exécution embarquée
while True:
    led_interne.value(1)   # Allumer la LED (Signal HAUT = 3.3V)
    time.sleep(1)          # Attendre 1 seconde
    
    led_interne.value(0)   # Éteindre la LED (Signal BAS = 0V)
    time.sleep(1)          # Attendre 1 seconde
```

#### **2. Clignotement Synchrone (LED Interne GPIO 2 + LED Externe GPIO 4) :**

```python
from machine import Pin
import time

# Configuration des deux broches en sortie
led_interne = Pin(2, Pin.OUT)
led_externe = Pin(4, Pin.OUT)

while True:
    # Allumage simultané
    led_interne.value(1)
    led_externe.value(1)
    time.sleep_ms(500)     # Pause de 500 millisecondes
    
    # Extinction simultanée
    led_interne.value(0)
    led_externe.value(0)
    time.sleep_ms(500)
```

---

### **IV. Équivalent en C++ (Environnement Arduino IDE)**

Pour comparaison, voici le code équivalent en C++ compilé sous l'environnement Arduino IDE :

```cpp
// Définition des numéros de broches GPIO
const int LED_INTERNE = 2;
const int LED_EXTERNE = 4;

void setup() {
  // Configuration des broches en SORTIE
  pinMode(LED_INTERNE, OUTPUT);
  pinMode(LED_EXTERNE, OUTPUT);
}

void loop() {
  digitalWrite(LED_INTERNE, HIGH); // 3.3V
  digitalWrite(LED_EXTERNE, HIGH);
  delay(500);                      // 500 ms

  digitalWrite(LED_INTERNE, LOW);  // 0V
  digitalWrite(LED_EXTERNE, LOW);
  delay(500);
}
```

---

## 💻 4. Exercices Pratiques & Travaux Dirigés

### **Exercice 1 : Clignotement à fréquence variable**
Modifier le script MicroPython pour créer un signal SOS en code Morse lumineux sur le GPIO 2 :
- 3 clignotements courts ($200\,\text{ms}$)
- 3 clignotements meo-longs ($600\,\text{ms}$)
- 3 clignotements courts ($200\,\text{ms}$)

### **Exercice 2 : Chenillard à 2 LED en opposition de phase**
On branche une LED Bleue sur GPIO 2 et une LED Rouge sur GPIO 4.
Écrire le script MicroPython permettant de les faire clignoter en **alternance** (quand l'une est allumée, l'autre est éteinte).
