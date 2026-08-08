# 📖 Fiche de Séance N°19 : Projet Intégré IoT embarqué

**Module 5 :** Internet & Objets Connectés (IoT - ESP32)

**Niveau :** 3ème Année Secondary (Sciences Expérimentales, Sciences Techniques, Mathématiques)

**Durée :** 1 heure 30 minutes (90 min)

**Environnement :** MicroPython (Python IDE / Wokwi Simulator) & C++ (Arduino IDE)

**Référence :** Ministère de l'Éducation – Direction Générale des Programmes (2024-2025)

---

## 🎯 1. Objectifs Pédagogiques

### **A. Savoirs (Connaissances)**

* Synthétiser l'ensemble des concepts du **Module 5 (IoT & ESP32)** dans un projet concret et autonome.
* Comprendre l'architecture d'un **Serveur Web Embarqué HTTP** hébergé directement sur la mémoire de l'ESP32.
* Découvrir la gestion de la connectivité réseau sans fil **Wi-Fi** en MicroPython avec le module **`network`** :
  * Mode Station **`STA_IF`** (l'ESP32 se connecte à un point d'accès Wi-Fi existant).
  * Attribution dynamique d'une adresse IP locale (ex: `192.168.1.105`).
* Comprendre le principe de communication par **Sockets TCP/IP (`usocket`)** : écoute sur le port web standard 80, réception des requêtes HTTP `GET` et émission d'une réponse HTML/CSS.

### **B. Savoir-faire (Compétences pratiques)**

* Établir et valider une connexion Wi-Fi sécurisée en MicroPython.
* Assembler une chaîne IoT complète :
  * **Capteurs :** DHT11 (Température/Humidité sur GPIO 15) + Photorésistance LDR (Luminosité sur GPIO 34).
  * **Actionneurs :** Servomoteur SG90 (Aération sur GPIO 13) + Relais/Pompe d'arrosage (GPIO 4) + Buzzer (GPIO 12).
* Développer l'interface Dashboard HTML responsive servie par l'ESP32 pour permettre le contrôle à distance depuis un smartphone ou un navigateur web.
* Programmer une **Régulation Hybride** (Automatique selon les seuils capteurs + Manuelle via les boutons de l'interface Web).

---

## ⏱️ 2. Déroulement de la Séance (90 minutes)

| Phase | Durée | Activité de l'Enseignant | Activité de l'Élève | Support / Outil |
| --- | --- | --- | --- | --- |
| **1. Présentation du Cahier des Charges** | 10 min | Présentation du projet *Smart Agro : Serre Intelligente Connectée Wi-Fi*. Explication des besoins d'arrosage et d'aération. | Prise de connaissance des spécifications et identification des broches GPIO attribuées. | Diaporama / ProProjecteur |
| **2. Connexion Wi-Fi & Serveur HTTP** | 20 min | Démonstration du code d'association Wi-Fi (`network.WLAN`) et de création d'un socket HTTP sur le port 80 sous Thonny. | Configuration du SSID/Password Wi-Fi, téléversement du script et récupération de l'adresse IP de l'ESP32. | Python IDE / ESP32 |
| **3. Développement & Intégration sur Machine** | 45 min | Encadrement des élèves pour l'assemblage complet des capteurs (DHT11/LDR), actionneurs (Servo/Relais) et de la boucle de service HTTP. | Câblage sur breadboard, saisie des fonctions d'acquisition et de la page HTML embarquée, test d'accès smartphone. | ESP32, Breadboard, Capteurs, Smartphone |
| **4. Démonstration & Validation (Recette)** | 15 min | Test et recette fonctionnelle des projets élèves : contrôle à distance via smartphone et vérification de la régulation auto. | Démonstration de l'arrosage/aération à distance depuis le smartphone et correction des éventuels d'erreurs. | Navigateur Smartphone |

---

## 📝 3. Cahier des Charges du Projet "Smart Agro"

On souhaite réaliser une **Serre Intelligente Connectée (Smart Agro)** gérée par une carte **ESP32** reliée au réseau Wi-Fi local.

### **Spécifications Matérielles :**
1. **Broche GPIO 15 :** Capteur de Température & Humidité **DHT11**.
2. **Broche GPIO 34 (ADC) :** Photorésistance **LDR** pour mesurer la luminosité.
3. **Broche GPIO 13 (PWM) :** **Servomoteur SG90** commandant le clapet d'aération ($0^\circ = \text{Fermé}$, $90^\circ = \text{Ouvert}$).
4. **Broche GPIO 4 :** **Relais / Pompe d'irrigation** ($1 = \text{Arrosage En Cours}$, $0 = \text{Arrêt}$).
5. **Broche GPIO 12 :** **Buzzer** d'alarme sonore.

### **Comportement Attendu :**
- **Mode Automatique :**
  - Si l'Humidité de l'air est $< 40\%$, activer l'arrosage (GPIO 4 ➔ HIGH).
  - Si la Température est $> 30^\circ\text{C}$, ouvrir le clapet d'aération à $90^\circ$ (GPIO 13 ➔ Duty 77).
- **Mode Serveur Web (Supervision Smartphone) :**
  - L'ESP32 héberge une page HTML affichant en temps réel les mesures (Température, Humidité, Luminosité) et l'état de la pompe/clapet.
  - La page propose deux boutons d'action : `[Activer Arrosage]` et `[Ouvrir Aération]`.

---

## 💻 4. Correction Officielle & Script MicroPython Intégré

### **I. Script d'Établissement de la Connexion Wi-Fi (`boot.py` / Fonction) :**

```python
import network
import time

def connecter_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print(f"Connexion au réseau Wi-Fi : {ssid}...")
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            time.sleep(0.5)
            print(".", end="")
    print("\n✅ Connecté au Wi-Fi avec succès !")
    print("📍 Adresse IP attribuée :", wlan.ifconfig()[0])
    return wlan.ifconfig()[0]
```

---

### **II. Script Principal Complêt (`main.py`) :**

```python
import network
import usocket as socket
from machine import Pin, ADC, PWM
import dht
import time

# 1. Connexion Wi-Fi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("ESP32_WiFi", "12345678")

while not wlan.isconnected():
    time.sleep(0.5)

ip_adresse = wlan.ifconfig()[0]
print("IP du Serveur Web ESP32 :", ip_adresse)

# 2. Initialisation Matérielle
sensor_dht = dht.DHT11(Pin(15))
ldr_adc = ADC(Pin(34))
ldr_adc.atten(ADC.ATTN_11DB)

servo = PWM(Pin(13), freq=50)
pompe = Pin(4, Pin.OUT)
buzzer = PWM(Pin(12))

pompe.value(0)

def poser_servo(angle):
    duty_val = int(26 + (angle / 180.0) * (123 - 26))
    servo.duty(duty_val)

poser_servo(0) # Clapet fermé au départ

# 3. Création du Serveur HTTP Sockets sur le Port 80
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('', 80))
server_socket.listen(5)
print("🌐 Serveur Web HTTP en écoute sur http://" + ip_adresse)

# 4. Boucle Principale Serveur & Régulation
while True:
    try:
        conn, addr = server_socket.accept()
        request = conn.recv(1024).decode('utf-8')
        print("Requéte reçue de :", addr)

        # Mesures Capteurs
        try:
            sensor_dht.measure()
            temp = sensor_dht.temperature()
            hum = sensor_dht.humidity()
        except:
            temp, hum = 25, 50

        adc_val = ldr_adc.read()
        lux_pct = int((adc_val / 4095.0) * 100)

        # Analyse des requêtes d'action à distance
        if "/arrosage/on" in request:
            pompe.value(1)
        elif "/arrosage/off" in request:
            pompe.value(0)
            
        if "/aeration/on" in request:
            poser_servo(90)
        elif "/aeration/off" in request:
            poser_servo(0)

        # Page HTML embarquée servie au client
        html_page = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Smart Agro ESP32</title>
  <style>
    body {{ font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding: 20px; }}
    .card {{ background: #1e293b; border-radius: 12px; padding: 15px; margin: 10px auto; max-width: 400px; }}
    .btn {{ background: #0284c7; color: white; border: none; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 5px; }}
    .btn-danger {{ background: #e11d48; }}
  </style>
</head>
<body>
  <h1>🌱 Smart Agro - Serre Connectée</h1>
  <div class="card">
    <h3>📊 Télémesures en Temps Réel</h3>
    <p>🌡️ Température : <b>{temp} °C</b></p>
    <p>💧 Humidité Air : <b>{hum} %</b></p>
    <p>☀️ Luminosité : <b>{lux_pct} %</b></p>
  </div>
  <div class="card">
    <h3>⚙️ Contrôle à Distance</h3>
    <p>Pompe : <b>{"ACTIF" if pompe.value() else "INACTIF"}</b></p>
    <a href="/arrosage/on" class="btn">Démarrer Pompe</a>
    <a href="/arrosage/off" class="btn btn-danger">Arrêter Pompe</a>
    <br><br>
    <a href="/aeration/on" class="btn">Ouvrir Aération (90°)</a>
    <a href="/aeration/off" class="btn btn-danger">Fermer Aération</a>
  </div>
</body>
</html>"""

        conn.send('HTTP/1.1 200 OK\nContent-Type: text/html\nConnection: close\n\n')
        conn.sendall(html_page)
        conn.close()

    except Exception as e:
        print("Erreur :", e)
```

---

## 💻 5. Équivalent en C++ (Arduino IDE)

```cpp
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>
#include <ESP32Servo.h>

const char* ssid = "ESP32_WiFi";
const char* password = "12345678";

WebServer server(80);
DHT dht(15, DHT11);
Servo servo;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }
  
  Serial.print("IP : "); Serial.println(WiFi.localIP());
  
  dht.begin();
  servo.attach(13);
  pinMode(4, OUTPUT);

  server.on("/", []() {
    server.send(200, "text/html", "<h1>ESP32 Smart Agro Server Ready</h1>");
  });
  server.begin();
}

void loop() {
  server.handleClient();
}
```
