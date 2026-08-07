/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°18 (Contrôle des Actionneurs IoT - ESP32)
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

    // 1. Servomoteur SG90 State (PWM 50 Hz)
    const servoAngle = ref(0); // Degrees 0 to 180
    const servoDuty = computed(() => Math.round(26 + (servoAngle.value / 180.0) * (123 - 26)));

    // 2. PWM LED Dimmer State
    const ledBrightness = ref(50); // % 0 to 100
    const ledDuty = computed(() => Math.round((ledBrightness.value / 100.0) * 1023));

    // 3. Buzzer Piezo State
    const isBuzzerActive = ref(false);
    const selectedNote = ref('LA');
    const noteFreqs = {
      'DO': 262,
      'RE': 294,
      'MI': 330,
      'FA': 349,
      'SOL': 392,
      'LA': 440,
      'SI': 494
    };

    // 4. Automatic Regulation Loop Simulation State
    const isRegulationActive = ref(false);
    const regulationTemp = ref(25); // °C
    const regulationThreshold = ref(28); // °C

    const isThresholdExceeded = computed(() => regulationTemp.value >= regulationThreshold.value);

    // Console REPL Logs
    const replLogs = ref([
      "MicroPython v1.20.0 on 2024-01-01; ESP32 module with ESP32",
      ">>> from machine import Pin, PWM",
      ">>> servo = PWM(Pin(13), freq=50)",
      ">>> buzzer = PWM(Pin(12))",
      ">>> led_pwm = PWM(Pin(4), freq=1000)",
      "✅ Actionneurs PWM (Servo GPIO 13, Buzzer GPIO 12, LED GPIO 4) initialisés."
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
        "=== Console REPL réinitialisée ==="
      ];
    };

    // Actuator Controls Methods
    const setServoAngle = (deg) => {
      servoAngle.value = deg;
      logToRepl(`[Servo SG90] Positionné à ${deg}° ➔ PWM duty=${servoDuty.value} / 1023 (Impulsion ~${((1.0 + (deg/180)).toFixed(2))} ms)`);
    };

    const triggerSweepAnimation = () => {
      let currentDeg = 0;
      logToRepl("🔄 Lancement du balayage automatique du servomoteur (0° ➔ 180°)...");
      const interval = setInterval(() => {
        currentDeg += 30;
        if (currentDeg > 180) {
          clearInterval(interval);
          logToRepl("✅ Balayage du servomoteur terminé.");
        } else {
          setServoAngle(currentDeg);
        }
      }, 400);
    };

    const playNote = (noteKey) => {
      selectedNote.value = noteKey;
      const freq = noteFreqs[noteKey] || 440;
      isBuzzerActive.value = true;
      logToRepl(`[Buzzer Piezo] Émission Note ${noteKey} (${freq} Hz) ➔ PWM duty=512 (50%)`);
      setTimeout(() => {
        isBuzzerActive.value = false;
      }, 500);
    };

    // Watch regulation loop state
    watch([regulationTemp, isRegulationActive], () => {
      if (!isRegulationActive.value) return;

      if (isThresholdExceeded.value) {
        servoAngle.value = 90;
        isBuzzerActive.value = true;
        logToRepl(`⚠️ [RÉGULATION AUTO] Température ${regulationTemp.value}°C >= Seuil ${regulationThreshold.value}°C ➔ Servo OUVRE (90°), Buzzer ALARME !`);
      } else {
        servoAngle.value = 0;
        isBuzzerActive.value = false;
        logToRepl(`✅ [RÉGULATION AUTO] Température ${regulationTemp.value}°C < Seuil ${regulationThreshold.value}°C ➔ Servo FERME (0°), Buzzer ÉTEINT.`);
      }
    });

    const toggleRegulationMode = () => {
      isRegulationActive.value = !isRegulationActive.value;
      if (isRegulationActive.value) {
        logToRepl("🚀 Mode de Régulation Automatique Capteur ➔ Actionneur ACTIVÉ.");
      } else {
        logToRepl("🛑 Mode de Régulation Automatique DESACTIVÉ.");
      }
    };

    // Code Snippets Strings
    const codeMicroPython = ref(`from machine import Pin, PWM
import time

# 1. Configuration du Servomoteur SG90 (GPIO 13, 50 Hz)
servo = PWM(Pin(13), freq=50)

# 2. Configuration du Buzzer Piezo (GPIO 12)
buzzer = PWM(Pin(12))

def poser_angle(angle_deg):
    # Formule de conversion d'angle en duty cycle (26 = 0°, 123 = 180°)
    duty_val = int(26 + (angle_deg / 180.0) * (123 - 26))
    servo.duty(duty_val)

def alarme_sonore(freq, duree_sec):
    buzzer.freq(freq)
    buzzer.duty(512) # 50% puissance
    time.sleep(duree_sec)
    buzzer.duty(0)

print("=== BOUCLE DE REGULATION SERVO & BUZZER ===")

# Positionner le servo à 90° et déclencher un bip
poser_angle(90)
alarme_sonore(880, 0.5)
time.sleep(1)

# Revenir à 0°
poser_angle(0)`);

    const codeCpp = ref(`#include <ESP32Servo.h>

#define SERVO_PIN 13
#define BUZZER_PIN 12

Servo myServo;

void setup() {
  Serial.begin(115200);
  myServo.attach(SERVO_PIN);
  pinMode(BUZZER_PIN, OUTPUT);
  
  Serial.println("=== ARDUINO C++ SERVO & BUZZER CONTROL ===");
}

void loop() {
  // Tourner à 90°
  myServo.write(90);
  tone(BUZZER_PIN, 880, 500); // 880 Hz pendant 500ms
  delay(2000);

  // Revenir à 0°
  myServo.write(0);
  noTone(BUZZER_PIN);
  delay(2000);
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
      servoAngle,
      servoDuty,
      ledBrightness,
      ledDuty,
      isBuzzerActive,
      selectedNote,
      noteFreqs,
      isRegulationActive,
      regulationTemp,
      regulationThreshold,
      isThresholdExceeded,
      replLogs,
      clearLogs,
      setServoAngle,
      triggerSweepAnimation,
      playNote,
      toggleRegulationMode,
      codeMicroPython,
      codeCpp,
      copyCodeSuccess,
      copyToClipboard
    };
  }
}).mount('#app');
