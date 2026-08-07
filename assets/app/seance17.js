/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°17 (Acquisition de données via les Capteurs IoT - ESP32)
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

    // Telemetry Sensor Sliders (Simulated Physical Environment)
    const simTemperature = ref(24); // °C (Range 0 - 50)
    const simHumidity = ref(58);    // % (Range 20 - 95)
    const simLux = ref(65);         // % Light (Range 0 - 100)
    const isAutoSampling = ref(true);

    // Computed ADC 12-bit & Voltage Values
    const adcRaw = computed(() => Math.round((simLux.value / 100) * 4095));
    const voltage = computed(() => ((adcRaw.value / 4095) * 3.3).toFixed(2));

    const tempStatus = computed(() => {
      if (simTemperature.value >= 32) return { text: '🔥 Alerte Chaleur Élevée', color: 'danger' };
      if (simTemperature.value >= 26) return { text: '☀️ Température Modérée', color: 'warning' };
      return { text: '✅ Température Confortable', color: 'success' };
    });

    const lightStatus = computed(() => {
      if (simLux.value < 20) return { text: '🌙 Obscurité / Nuit', color: 'dark' };
      if (simLux.value < 70) return { text: '💡 Lumière Ambiante', color: 'info' };
      return { text: '☀️ Lumière Vive / Soleil', color: 'warning' };
    });

    // Console REPL Logs
    const replLogs = ref([
      "MicroPython v1.20.0 on 2024-01-01; ESP32 module with ESP32",
      ">>> from machine import ADC, Pin",
      ">>> import dht, time",
      ">>> ldr = ADC(Pin(34))",
      ">>> ldr.atten(ADC.ATTN_11DB)",
      ">>> sensor = dht.DHT11(Pin(15))",
      "✅ Capteur LDR (GPIO 34) & DHT11 (GPIO 15) prêts."
    ]);

    let samplingTimer = null;

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
        "=== Console REPL réinitialisée ==="
      ];
    };

    const readSensorsNow = () => {
      const timeStr = new Date().toLocaleTimeString();
      logToRepl(`[${timeStr}] ── TÉLÉMÉTRIE CAPTEURS ESP32 ──`);
      logToRepl(`  • LDR (GPIO 34 ADC) ➔ Brute: ${adcRaw.value} / 4095 | Tension: ${voltage.value} V [${lightStatus.value.text}]`);
      logToRepl(`  • DHT11 (GPIO 15)  ➔ Temp: ${simTemperature.value} °C | Hum: ${simHumidity.value} % [${tempStatus.value.text}]`);
    };

    const startAutoSampling = () => {
      if (samplingTimer) return;
      isAutoSampling.value = true;
      readSensorsNow();
      samplingTimer = setInterval(readSensorsNow, 2500);
    };

    const stopAutoSampling = () => {
      isAutoSampling.value = false;
      if (samplingTimer) {
        clearInterval(samplingTimer);
        samplingTimer = null;
      }
      logToRepl("🛑 Acquisition automatique mise en pause.");
    };

    const toggleSampling = () => {
      if (isAutoSampling.value) {
        stopAutoSampling();
      } else {
        startAutoSampling();
      }
    };

    // Code Snippets Strings
    const codeMicroPython = ref(`from machine import ADC, Pin
import dht
import time

# 1. Configuration du capteur LDR analogique sur GPIO 34 (ADC1)
ldr = ADC(Pin(34))
ldr.atten(ADC.ATTN_11DB) # Plage pleine échelle 0 - 3.3V

# 2. Configuration du capteur DHT11 numérique sur GPIO 15
sensor = dht.DHT11(Pin(15))

print("=== STATION DE TÉLÉMÉTRIE ESP32 INTÉGRÉE ===")

while True:
    # Lecture LDR (ADC 12 bits)
    adc_val = ldr.read()
    tension = (adc_val / 4095.0) * 3.3
    
    # Lecture DHT11
    try:
        sensor.measure()
        temp = sensor.temperature()
        hum = sensor.humidity()
        
        print(f"Luminosité ADC: {adc_val} ({tension:.2f}V) | Temp: {temp}°C | Hum: {hum}%")
        
        if temp >= 30:
            print("⚠️ ALERT: Température critique détectée !")
    except OSError:
        print("Erreur de lecture DHT11")
        
    time.sleep(2)`);

    const codeCpp = ref(`#include <DHT.h>

#define LDR_PIN 34
#define DHT_PIN 15
#define DHTTYPE DHT11

DHT dht(DHT_PIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(LDR_PIN, INPUT);
  Serial.println("=== STATION DE TÉLÉMÉTRIE ESP32 ARDUINO C++ ===");
}

void loop() {
  // Lecture LDR (ADC 12-bit 0-4095 sur ESP32)
  int adcVal = analogRead(LDR_PIN);
  float volts = (adcVal / 4095.0) * 3.3;

  // Lecture DHT11
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  Serial.print("ADC: "); Serial.print(adcVal);
  Serial.print(" ("); Serial.print(volts); Serial.print("V)");
  Serial.print(" | Temp: "); Serial.print(temp); Serial.print(" C");
  Serial.print(" | Hum: "); Serial.print(hum); Serial.println(" %");

  delay(2000);
}`);

    const copyCodeSuccess = ref(false);
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        copyCodeSuccess.value = true;
        setTimeout(() => copyCodeSuccess.value = false, 2000);
      });
    };

    onMounted(() => {
      startAutoSampling();
    });

    onUnmounted(() => {
      if (samplingTimer) clearInterval(samplingTimer);
    });

    return {
      theme,
      toggleTheme,
      activeTab,
      simTemperature,
      simHumidity,
      simLux,
      adcRaw,
      voltage,
      tempStatus,
      lightStatus,
      isAutoSampling,
      replLogs,
      clearLogs,
      readSensorsNow,
      toggleSampling,
      codeMicroPython,
      codeCpp,
      copyCodeSuccess,
      copyToClipboard
    };
  }
}).mount('#app');
