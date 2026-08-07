/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Vue.js pour Séance N°20 (Évaluation Pratique Bilan & Bilan Annuel)
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

    // Active Code Tab (python vs esp32)
    const activeTab = ref('python');

    // 1. Exam Countdown Timer State (60 minutes = 3600 seconds)
    const timeLeft = ref(3600);
    const isTimerRunning = ref(false);
    let timerInterval = null;

    const timerFormatted = computed(() => {
      const mins = Math.floor(timeLeft.value / 60);
      const secs = timeLeft.value % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    });

    const startTimer = () => {
      if (isTimerRunning.value) return;
      isTimerRunning.value = true;
      timerInterval = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--;
        } else {
          pauseTimer();
          alert("⏱️ Temps écoulé ! Les 60 minutes d'épreuve sur machine sont terminées.");
        }
      }, 1000);
    };

    const pauseTimer = () => {
      isTimerRunning.value = false;
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    };

    const resetTimer = () => {
      pauseTimer();
      timeLeft.value = 3600;
    };

    // 2. Interactive Grading Calculator (Grille d'évaluation /20 points)
    const ptsRecherche = ref(2.5);
    const ptsSaisie = ref(3.5);
    const ptsTri = ref(4.0);
    const ptsDht11 = ref(5.0);
    const ptsServo = ref(5.0);

    const totalScore = computed(() => {
      const sum = (parseFloat(ptsRecherche.value) || 0) +
                  (parseFloat(ptsSaisie.value) || 0) +
                  (parseFloat(ptsTri.value) || 0) +
                  (parseFloat(ptsDht11.value) || 0) +
                  (parseFloat(ptsServo.value) || 0);
      return Math.min(20, Math.max(0, sum)).toFixed(1);
    });

    const appreciation = computed(() => {
      const score = parseFloat(totalScore.value);
      if (score >= 18.0) return { text: "🏆 Excellent ! Maîtrise parfaite du programme.", color: "success" };
      if (score >= 15.0) return { text: "🌟 Très Bien ! Solides compétences algorithmiques et IoT.", color: "info" };
      if (score >= 12.0) return { text: "👍 Bien ! Compétences fondamentales acquises.", color: "primary" };
      if (score >= 10.0) return { text: "⚖️ Passable. Des révisions sont nécessaires sur la modularité.", color: "warning" };
      return { text: "⚠️ Insuffisant. Revoir d'urgence les boucles et les tableaux.", color: "danger" };
    });

    // 3. Overview Matrix of 20 Sessions across 6 Modules
    const annualModules = ref([
      { id: 1, name: "Module 1 : Révision & Consolidation", count: 2, badge: "Séances 1 à 2" },
      { id: 2, name: "Module 2 : Structures Avancées & Tableaux 1D", count: 4, badge: "Séances 3 à 6" },
      { id: 3, name: "Module 3 : Modularité (Fonctions & Procédures)", count: 4, badge: "Séances 7 à 10" },
      { id: 4, name: "Module 4 : Algorithmes Classiques (Recherche & Tri)", count: 5, badge: "Séances 11 à 15" },
      { id: 5, name: "Module 5 : IoT & Carte Microcontrôleur ESP32", count: 4, badge: "Séances 16 à 19" },
      { id: 6, name: "Module 6 : Évaluation Bilan & Synthèse", count: 1, badge: "Séance 20" }
    ]);

    // Code Snippets Strings
    const codePython = ref(`# DOSSIER 1 : ALGORITHMIQUE & PYTHON MODULAIRE (OCEANLAB)
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
        id_val = int(input(f"ID Bouée N°{i+1} : "))
        while recherche_seq(IDs, i, id_val) != -1 or id_val <= 0:
            id_val = int(input("⚠️ ID existant ! Réessayez : "))
        IDs[i] = id_val
        
        t_val = float(input(f"Température (°C) : "))
        while t_val < -10.0 or t_val > 50.0:
            t_val = float(input("⚠️ Température invalide (-10 à 50°C) : "))
        Temp[i] = t_val

def tri_bulles_synchrone(IDs, Temp, n):
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if Temp[j] < Temp[j + 1]:
                # Échange synchrone
                Temp[j], Temp[j+1] = Temp[j+1], Temp[j]
                IDs[j], IDs[j+1] = IDs[j+1], IDs[j]`);

    const codeEsp32 = ref(`# DOSSIER 2 : EMBARQUÉ MICROPYTHON ESP32
from machine import Pin, PWM
import dht, time

sensor = dht.DHT11(Pin(15))
servo = PWM(Pin(13), freq=50)
buzzer = PWM(Pin(12))

def poser_angle(angle):
    duty_val = int(26 + (angle / 180.0) * (123 - 26))
    servo.duty(duty_val)

try:
    sensor.measure()
    t = sensor.temperature()
    print("Température mesurée :", t, "°C")
    
    if t > 30.0:
        poser_angle(90)   # Ouvrir clapet à 90°
        buzzer.freq(880)  # Bip d'alarme
        buzzer.duty(512)
    else:
        poser_angle(0)    # Fermer clapet à 0°
        buzzer.duty(0)    # Silencer buzzer
except OSError:
    print("Erreur capteur DHT11")`);

    const copyCodeSuccess = ref(false);
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        copyCodeSuccess.value = true;
        setTimeout(() => copyCodeSuccess.value = false, 2000);
      });
    };

    onUnmounted(() => {
      if (timerInterval) clearInterval(timerInterval);
    });

    return {
      theme,
      toggleTheme,
      activeTab,
      timeLeft,
      isTimerRunning,
      timerFormatted,
      startTimer,
      pauseTimer,
      resetTimer,
      ptsRecherche,
      ptsSaisie,
      ptsTri,
      ptsDht11,
      ptsServo,
      totalScore,
      appreciation,
      annualModules,
      codePython,
      codeEsp32,
      copyCodeSuccess,
      copyToClipboard
    };
  }
}).mount('#app');
