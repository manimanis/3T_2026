/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°16 (Concepts de l'IoT & Prise en main de la carte ESP32)
 */

const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

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

    // ESP32 Hardware Simulator State
    const isRunning = ref(false);
    const blinkInterval = ref(1000); // ms
    const activeMode = ref('sync'); // 'sync', 'alt', 'sos', 'manual'
    
    // GPIO Pins State
    const gpio2State = ref(false); // Internal LED
    const gpio4State = ref(false); // External LED

    // Console REPL Logs
    const replLogs = ref([
      "MicroPython v1.20.0 on 2024-01-01; ESP32 module with ESP32",
      "Type \"help()\" for more information.",
      ">>> from machine import Pin",
      ">>> import time",
      ">>> led_in = Pin(2, Pin.OUT)",
      ">>> led_ext = Pin(4, Pin.OUT)",
      "✅ Broches GPIO 2 et GPIO 4 initialisées en mode SORTIE (Pin.OUT)."
    ]);

    let timerId = null;
    let stepCounter = 0;

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
        "=== Terminal REPL réinitialisé ==="
      ];
    };

    // Simulator Execution Tick
    const runTick = () => {
      stepCounter++;
      
      if (activeMode.value === 'sync') {
        // Both LEDs toggle simultaneously
        const nextState = !gpio2State.value;
        gpio2State.value = nextState;
        gpio4State.value = nextState;
        logToRepl(`[${new Date().toLocaleTimeString()}] GPIO 2 & GPIO 4 ➔ ${nextState ? 'HIGH (3.3V)' : 'LOW (0.0V)'}`);
      } else if (activeMode.value === 'alt') {
        // Alternating LEDs
        gpio2State.value = !gpio2State.value;
        gpio4State.value = !gpio2State.value;
        logToRepl(`[${new Date().toLocaleTimeString()}] GPIO 2: ${gpio2State.value ? 'HIGH' : 'LOW'} | GPIO 4: ${gpio4State.value ? 'HIGH' : 'LOW'}`);
      } else if (activeMode.value === 'sos') {
        // SOS Morse Code pattern
        const sosPattern = [1,0,1,0,1,0,  1,1,0,1,1,0,1,1,0,  1,0,1,0,1,0];
        const stateBit = sosPattern[stepCounter % sosPattern.length];
        gpio2State.value = Boolean(stateBit);
        gpio4State.value = Boolean(stateBit);
        logToRepl(`[SOS Morse] Trame ${stepCounter % sosPattern.length + 1}/${sosPattern.length} ➔ ${stateBit ? 'ALLUMÉ' : 'ÉTEINT'}`);
      }
    };

    const startSimulation = () => {
      if (isRunning.value) return;
      isRunning.value = true;
      logToRepl(`🚀 Démarrage de la boucle embarquée (Intervalle : ${blinkInterval.value} ms, Mode : ${activeMode.value.toUpperCase()})`);
      runTick();
      timerId = setInterval(runTick, blinkInterval.value);
    };

    const stopSimulation = () => {
      if (!isRunning.value) return;
      isRunning.value = false;
      if (timerId) clearInterval(timerId);
      timerId = null;
      gpio2State.value = false;
      gpio4State.value = false;
      logToRepl("🛑 Boucle embarquée arrêtée. Broches GPIO réinitialisées à LOW (0V).");
    };

    const toggleSimulation = () => {
      if (isRunning.value) {
        stopSimulation();
      } else {
        startSimulation();
      }
    };

    const updateInterval = (newSpeed) => {
      blinkInterval.value = newSpeed;
      if (isRunning.value) {
        stopSimulation();
        startSimulation();
      }
    };

    const updateMode = (newMode) => {
      activeMode.value = newMode;
      stepCounter = 0;
      logToRepl(`🔄 Changement de mode ➔ ${newMode.toUpperCase()}`);
      if (isRunning.value) {
        stopSimulation();
        startSimulation();
      }
    };

    const manualToggleGpio = (pinNum) => {
      if (isRunning.value) {
        stopSimulation();
      }
      activeMode.value = 'manual';
      if (pinNum === 2) {
        gpio2State.value = !gpio2State.value;
        logToRepl(`[Manuel] Commandé GPIO 2 ➔ ${gpio2State.value ? 'HIGH (3.3V)' : 'LOW (0V)'}`);
      } else if (pinNum === 4) {
        gpio4State.value = !gpio4State.value;
        logToRepl(`[Manuel] Commandé GPIO 4 ➔ ${gpio4State.value ? 'HIGH (3.3V)' : 'LOW (0V)'}`);
      }
    };

    // Code Snippets Strings for display
    const codeMicroPython = ref(`from machine import Pin
import time

# Configuration des broches GPIO 2 (Interne) et GPIO 4 (Externe) en mode SORTIE
led_interne = Pin(2, Pin.OUT)
led_externe = Pin(4, Pin.OUT)

print("=== ESP32 MicroPython Blink Loop ===")

# Boucle embarquée infinie
while True:
    # Allumage simultané (Signal HAUT = 3.3V)
    led_interne.value(1)
    led_externe.value(1)
    print("LEDs ALLUMÉES (3.3V)")
    time.sleep(1) # Attente de 1 seconde

    # Extinction simultanée (Signal BAS = 0V)
    led_interne.value(0)
    led_externe.value(0)
    print("LEDs ÉTEINTES (0.0V)")
    time.sleep(1)`);

    const codeCpp = ref(`// Définition des broches GPIO
const int LED_INTERNE = 2;
const int LED_EXTERNE = 4;

void setup() {
  // Initialisation de la communication série à 115200 baud
  Serial.begin(115200);
  
  // Configuration des broches en mode SORTIE
  pinMode(LED_INTERNE, OUTPUT);
  pinMode(LED_EXTERNE, OUTPUT);
  
  Serial.println("=== ESP32 Arduino C++ Blink Loop ===");
}

void loop() {
  // Signal HIGH (3.3V)
  digitalWrite(LED_INTERNE, HIGH);
  digitalWrite(LED_EXTERNE, HIGH);
  Serial.println("LEDs ALLUMÉES");
  delay(1000); // Attente de 1000 ms

  // Signal LOW (0V)
  digitalWrite(LED_INTERNE, LOW);
  digitalWrite(LED_EXTERNE, LOW);
  Serial.println("LEDs ÉTEINTES");
  delay(1000);
}`);

    const copyCodeSuccess = ref(false);
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        copyCodeSuccess.value = true;
        setTimeout(() => copyCodeSuccess.value = false, 2000);
      });
    };

    onUnmounted(() => {
      if (timerId) clearInterval(timerId);
    });

    return {
      theme,
      toggleTheme,
      activeTab,
      isRunning,
      blinkInterval,
      activeMode,
      gpio2State,
      gpio4State,
      replLogs,
      clearLogs,
      startSimulation,
      stopSimulation,
      toggleSimulation,
      updateInterval,
      updateMode,
      manualToggleGpio,
      codeMicroPython,
      codeCpp,
      copyCodeSuccess,
      copyToClipboard
    };
  }
}).mount('#app');
