/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°19 (Projet Intégré IoT embarqué - Smart Agro Serre Connectée)
 */

const { createApp, ref, computed, watch, onMounted, onUnmounted } = Vue;

createApp({
  setup() {
    // Theme Management
    const theme = ref(localStorage.getItem('theme') || 'dark');

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme.value);
      localStorage.setItem('theme', theme.value);
    };

    // Active Code Tab (micropython vs cpp)
    const activeTab = ref('micropython');

    // 1. Wi-Fi Network Connection State
    const isWifiConnected = ref(true);
    const wifiSsid = ref("ESP32_WiFi_Lab");
    const assignedIp = ref("192.168.1.105");

    // 2. Sensor Telemetry Values
    const simTemperature = ref(27); // °C
    const simHumidity = ref(42);    // %
    const simLux = ref(70);         // %

    // 3. Actuator States
    const isPumpActive = ref(false); // Relais Pompe GPIO 4
    const isVentOpen = ref(false);   // Servo Aération 90° GPIO 13
    const isAutoRegulation = ref(true);

    // Console REPL Logs
    const replLogs = ref([
      "MicroPython v1.20.0 on 2024-01-01; ESP32 module with ESP32",
      ">>> import network, usocket as socket",
      ">>> wlan = network.WLAN(network.STA_IF); wlan.active(True)",
      "Connexion au Wi-Fi : ESP32_WiFi_Lab...",
      "✅ Connecté au Wi-Fi ! IP attribuée : 192.168.1.105",
      "🌐 Serveur Web HTTP démarré et en écoute sur http://192.168.1.105:80"
    ]);

    const logToRepl = (msg) => {
      replLogs.value.push(msg);
      if (replLogs.value.length > 50) {
        replLogs.value.shift();
      }
      // Auto-scroll REPL terminal
      setTimeout(() => {
        const term = document.getElementById('replTerminal');
        if (term) term.scrollTop = term.scrollHeight;
      }, 50);
    };

    const clearLogs = () => {
      replLogs.value = [
        "MicroPython v1.20.0 on 2024-01-01; ESP32 module with ESP32",
        "=== Console REPL HTTP réinitialisée ==="
      ];
    };

    // Auto-Regulation Logic
    watch([simTemperature, simHumidity, isAutoRegulation], () => {
      if (!isAutoRegulation.value) return;

      // Auto Irrigation if Humidity < 38%
      if (simHumidity.value < 38 && !isPumpActive.value) {
        isPumpActive.value = true;
        logToRepl(`🤖 [RÉGULATION AUTO] Humidité ${simHumidity.value}% < 38% ➔ Déclenchement automatique Pompe (GPIO 4)`);
      } else if (simHumidity.value >= 55 && isPumpActive.value) {
        isPumpActive.value = false;
        logToRepl(`🤖 [RÉGULATION AUTO] Humidité suffisante (${simHumidity.value}%) ➔ Arrêt automatique Pompe`);
      }

      // Auto Ventilation if Temp > 30°C
      if (simTemperature.value > 30 && !isVentOpen.value) {
        isVentOpen.value = true;
        logToRepl(`🤖 [RÉGULATION AUTO] Température ${simTemperature.value}°C > 30°C ➔ Ouverture automatique Clapet (Servo 90°)`);
      } else if (simTemperature.value <= 28 && isVentOpen.value) {
        isVentOpen.value = false;
        logToRepl(`🤖 [RÉGULATION AUTO] Température normale (${simTemperature.value}°C) ➔ Fermeture Clapet (Servo 0°)`);
      }
    });

    // Remote Actions from Smartphone Virtual Dashboard
    const togglePumpRemote = (targetState) => {
      isPumpActive.value = targetState;
      logToRepl(`[HTTP GET /arrosage/${targetState ? 'on' : 'off'}] Depuis Smartphone ➔ Pompe GPIO 4 = ${targetState ? 'HIGH' : 'LOW'}`);
      logToRepl("HTTP/1.1 200 OK | Page Dashboard mise à jour.");
    };

    const toggleVentRemote = (targetState) => {
      isVentOpen.value = targetState;
      logToRepl(`[HTTP GET /aeration/${targetState ? 'on' : 'off'}] Depuis Smartphone ➔ Servo GPIO 13 = ${targetState ? '90°' : '0°'}`);
      logToRepl("HTTP/1.1 200 OK | Page Dashboard mise à jour.");
    };

    const toggleWifiConnection = () => {
      isWifiConnected.value = !isWifiConnected.value;
      if (isWifiConnected.value) {
        logToRepl("📶 Reconnexion Wi-Fi... IP attribuée : 192.168.1.105");
      } else {
        logToRepl("⚠️ Déconnexion du réseau Wi-Fi. Serveur HTTP indisponible.");
      }
    };

    // Code Snippets Strings
    const codeMicroPython = ref(`import network
import usocket as socket
from machine import Pin, ADC, PWM
import dht, time

# 1. Connexion au réseau Wi-Fi local
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("ESP32_WiFi_Lab", "12345678")

while not wlan.isconnected():
    time.sleep(0.5)

ip_adresse = wlan.ifconfig()[0]
print("🌐 Serveur HTTP actif sur : http://" + ip_adresse)

# 2. Broches E/S
sensor_dht = dht.DHT11(Pin(15))
ldr = ADC(Pin(34))
servo = PWM(Pin(13), freq=50)
pompe = Pin(4, Pin.OUT)

# 3. Boucle du Serveur Sockets HTTP
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('', 80))
server.listen(5)

while True:
    conn, addr = server.accept()
    request = conn.recv(1024).decode('utf-8')
    
    if "/arrosage/on" in request: pompe.value(1)
    elif "/arrosage/off" in request: pompe.value(0)
    
    if "/aeration/on" in request: servo.duty(77)
    elif "/aeration/off" in request: servo.duty(26)

    # Réponse HTML servie au Smartphone
    html = "<html><body><h1>Smart Agro ESP32</h1></body></html>"
    conn.send('HTTP/1.1 200 OK\\nContent-Type: text/html\\n\\n' + html)
    conn.close()`);

    const codeCpp = ref(`#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>
#include <ESP32Servo.h>

const char* ssid = "ESP32_WiFi_Lab";
const char* password = "12345678";

WebServer server(80);
DHT dht(15, DHT11);
Servo servo;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }
  
  Serial.print("IP : http://"); Serial.println(WiFi.localIP());
  
  dht.begin();
  servo.attach(13);
  pinMode(4, OUTPUT);

  server.on("/", []() {
    server.send(200, "text/html", "<h1>Smart Agro ESP32 C++</h1>");
  });
  
  server.begin();
}

void loop() {
  server.handleClient();
}`);

    const copyCodeSuccess = ref(false);
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        copyCodeSuccess.value = true;
        setTimeout(() => copyCodeSuccess.value = false, 2000);
      });
    };

    return {
      theme,
      toggleTheme,
      activeTab,
      isWifiConnected,
      wifiSsid,
      assignedIp,
      simTemperature,
      simHumidity,
      simLux,
      isPumpActive,
      isVentOpen,
      isAutoRegulation,
      replLogs,
      clearLogs,
      togglePumpRemote,
      toggleVentRemote,
      toggleWifiConnection,
      codeMicroPython,
      codeCpp,
      copyCodeSuccess,
      copyToClipboard
    };
  }
}).mount('#app');
