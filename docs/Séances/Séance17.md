# 📖 Fiche de Séance N°17 : Acquisition de données via les Capteurs

**Module 5 :** Internet & Objets Connectés (IoT - ESP32)

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** MicroPython (Python IDE / Wokwi Simulator) & C++ (Arduino IDE)

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Distinguer les deux familles principales de capteurs en IoT :
  1. **Capteurs Numériques (Digital) :** Délivrent un état binaire (`0` ou `1`, tout-ou-rien) ou une trame de données numériques sérielles (ex: capteur d'obstacle infrarouge FC-51, module **DHT11**).
  2. **Capteurs Analogiques (Analog) :** Délivrent une tension électrique continue comprise entre $0\,\text{V}$ et $3.3\,\text{V}$ proportionnelle à la grandeur physique mesurée (ex: Photorésistance LDR, Potentiomètre, Thermistance CTN).
* Comprendre le rôle et la résolution du **Convertisseur Analogique-Numérique (ADC / CAN)** intégré à l'ESP32 :
  * Résolution de **12 bits** : conversion du signal analogique en une valeur entière brute $N_{ADC} \in [0, 4095]$ ($2^{12} = 4096$ niveaux).
  * Relation mathématique de conversion de la tension d'entrée $V_{in}$ :
    $$V_{in} = \frac{N_{ADC}}{4095} \times 3.3\,\text{V}$$
* Identifier les broches réservées aux entrées analogiques (ex: **GPIO 32, 33, 34, 35, 36, 39** sur le canal ADC1 de l'ESP32).

### **B. Savoir-faire (Compétences pratiques)**

* Configurer et lire une **entrée numérique** avec résistance de tirage interne (`Pin.IN`, `Pin.PULL_UP`).
* Configurer et lire une **entrée analogique ADC** en MicroPython (`ADC(Pin(34))`, `adc.read()`).
* Atténuer la plage de lecture de l'ADC pour couvrir l'échelle complète $0 \dots 3.3\,\text{V}$ (`adc.atten(ADC.ATTN_11DB)`).
* Interfacer et lire les valeurs de **Température (°C)** et d'**Humidité (%)** avec le capteur numérique **DHT11** via le module prédéfini `dht`.
* Formater et afficher les mesures en temps réel dans la console REPL et programmer des alertes seuil.

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Classification des Capteurs** | 15 min | Présentation de capteurs réels (LDR, DHT11, Bouton, Infrarouge). Explication de la différence entre signal analogique continu et signal numérique binaire. | Classement des capteurs présentés en 2 catégories (Analogique vs Numérique). | Diaporama / Matériel de démonstration |
| **2. Le Convertisseur ADC 12 bits de l'ESP32** | 20 min | Démonstration théorique et calcul de la résolution ADC 12 bits ($2^{12} = 4096$). Présentation de la formule de calcul de la tension $V_{in}$. | Résolution d'exercices d'application (convertir $N_{ADC} = 2048$ et $N_{ADC} = 4095$ en Volts). | Tableau / Fiche élève |
| **3. Travaux Pratiques sur Machine** | 40 min | Guidage des élèves pour la réalisation de deux montages :<br>1. Photorésistance LDR sur **GPIO 34** (ADC).<br>2. Capteur DHT11 sur **GPIO 15**. | Câblage sur breadboard, saisie des scripts MicroPython, exécution et lecture des mesures en temps réel. | Ordinateur (Python IDE), ESP32, LDR, DHT11 |
| **4. Synthèse & Évaluation Formative** | 15 min | Animation du quiz formatif et défi pratique (déclencher une alerte si la température dépasse 30°C ou si la lumière chute). | Réponse au quiz et ajout de la condition `if temp > 30:` dans le script. | Environnement de TP |

---

## 📝 3. Résumé du Cours (Support Élève)

### **I. Capteurs Analogiques vs Capteurs Numériques**

```text
[ GRANDEUR PHYSIQUE ] 
 (Lumière, Température)
          │
          ├───► [ CAPTEUR ANALOGIQUE (ex: LDR) ]  ───► Tension variable (0.0 V à 3.3 V) ───► ESP32 (Broche ADC)
          │
          └───► [ CAPTEUR NUMÉRIQUE (ex: DHT11) ] ───► Trame de données binaires (0 et 1) ───► ESP32 (Broche GPIO)
```

---

### **II. Le Convertisseur ADC (CAN) 12 bits de l'ESP32**

Pour lire un capteur analogique (comme une photorésistance LDR), l'ESP32 transforme la tension électrique $V_{in}$ en un nombre entier compris entre $0$ et $4095$.

#### **Formules Fondamentales :**
1. **Conversion Valeur Brute $N_{ADC} \to$ Tension $V_{in}$ :**
   $$V_{in} = \frac{N_{ADC}}{4095} \times 3.3\,\text{V}$$

2. **Exemples de Calcul :**
   - Si $N_{ADC} = 0 \implies V_{in} = 0.0\,\text{V}$ (Obscurité totale / Tension nulle)
   - Si $N_{ADC} = 2048 \implies V_{in} = \frac{2048}{4095} \times 3.3 \approx 1.65\,\text{V}$ (Luminosité moyenne)
   - Si $N_{ADC} = 4095 \implies V_{in} = 3.30\,\text{V}$ (Pleine lumière)

---

### **III. Programmation en MicroPython**

#### **1. Acquisition de la Luminosité via une Photorésistance LDR (GPIO 34 - ADC) :**

```python
from machine import ADC, Pin
import time

# Configuration du CAN sur le GPIO 34 (ADC1_CH6)
ldr = ADC(Pin(34))
# Configuration de l'atténuation 11dB pour lire jusqu'à 3.3V
ldr.atten(ADC.ATTN_11DB)

print("=== Début de la lecture de luminosité (LDR) ===")

while True:
    valeur_brute = ldr.read() # Valeur entre 0 et 4095
    tension = (valeur_brute / 4095.0) * 3.3
    
    print("ADC Bruta :", valeur_brute, "| Tension :", round(tension, 2), "V")
    
    if tension < 1.0:
        print("⚠️ Obscurité détectée !")
        
    time.sleep(1)
```

#### **2. Acquisition de la Température & Humidité via le Capteur DHT11 (GPIO 15) :**

```python
import dht
from machine import Pin
import time

# Initialisation du capteur DHT11 sur le GPIO 15
capteur_dht = dht.DHT11(Pin(15))

print("=== Début de la station météo DHT11 ===")

while True:
    try:
        # Lancer la mesure
        capteur_dht.measure()
        
        # Récupérer la température (°C) et l'humidité (%)
        temp = capteur_dht.temperature()
        hum = capteur_dht.humidity()
        
        print("🌡️ Température :", temp, "°C | 💧 Humidité :", hum, "%")
        
        if temp > 30:
            print("🔥 Alerte : Température élevée détectée !")
            
    except OSError as e:
        print("❌ Erreur de lecture du capteur DHT11")
        
    time.sleep(2) # Attendre 2 secondes entre les mesures (limite matérielle du DHT11)
```

---

### **IV. Équivalent en C++ (Environnement Arduino IDE)**

```cpp
#include <DHT.h>

#define DHTPIN 15
#define DHTTYPE DHT11
#define LDRPIN 34

DHT dht_sensor(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht_sensor.begin();
  pinMode(LDRPIN, INPUT);
}

void loop() {
  // Lecture ADC (0 - 4095)
  int valLdr = analogRead(LDRPIN);
  float volts = (valLdr / 4095.0) * 3.3;
  
  // Lecture DHT11
  float temp = dht_sensor.readTemperature();
  float hum = dht_sensor.readHumidity();
  
  Serial.print("LDR ADC: "); Serial.print(valLdr);
  Serial.print(" | Tension: "); Serial.print(volts); Serial.print("V");
  Serial.print(" | Temp: "); Serial.print(temp); Serial.print("C");
  Serial.print(" | Hum: "); Serial.print(hum); Serial.println("%");
  
  delay(2000);
}
```

---

## 💻 4. Exercices Pratiques & Travaux Dirigés

### **Exercice 1 : Calcul de tension ADC**
Compléter le tableau de correspondance pour l'ADC 12 bits de l'ESP32 :

| Valeur ADC ($N_{ADC}$) | Formule de Calcul | Tension $V_{in}$ (Volts) | État Interprété |
| --- | --- | --- | --- |
| $0$ | $\frac{0}{4095} \times 3.3$ | $0.0\,\text{V}$ | Nuit noire |
| $1024$ | $\frac{1024}{4095} \times 3.3$ | $0.825\,\text{V}$ | Faible lumière |
| $2048$ | $\frac{2048}{4095} \times 3.3$ | $1.65\,\text{V}$ | Lumière ambiante |
| $3072$ | $\frac{3072}{4095} \times 3.3$ | $2.475\,\text{V}$ | Lumière vive |
| $4095$ | $\frac{4095}{4095} \times 3.3$ | $3.30\,\text{V}$ | Plein soleil |

### **Exercice 2 : Système de Régulation Thermique Automatique**
Écrire un script MicroPython combinant le capteur **DHT11** (GPIO 15) et une **LED Rouge** d'alerte (GPIO 2) :
- Si la température est supérieure à $28^\circ\text{C}$, allumer la LED et afficher `"Ventilation activée !"` dans le terminal.
- Sinon, éteindre la LED et afficher `"Température normale."`.
