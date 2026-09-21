/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * Application Logic for Séance N°6 - APPRENTISSAGE
 * Chaînes de caractères & Fonctions prédéfinies normalisées (90 min)
 * Version sujet élève (réponses sur cahier)
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark',

      fonctionsPredefinies: [
        { nom: "Long(ch)", description: "Retourne le nombre de caractères de la chaîne ch", exemple: "Long(\"SCIENCE\") = 7" },
        { nom: "Pos(motif, ch)", description: "Retourne l'indice (base 0) de la 1ère occurrence du motif dans ch, ou -1 si absent", exemple: "Pos(\"EN\", \"SCIENCE\") = 3" },
        { nom: "Sous_chaine(ch, deb, fin)", description: "Extrait la sous-chaîne allant de l'indice deb à fin inclus", exemple: "Sous_chaine(\"SCIENCE\", 2, 4) = \"IEN\"" },
        { nom: "Effacer(ch, deb, fin)", description: "Supprime les caractères de deb à fin inclus dans la variable ch", exemple: "Effacer(ch, 1, 2)" },
        { nom: "Convch(valeur)", description: "Convertit une valeur numérique entière ou réelle en chaîne de caractères", exemple: "Convch(25) = \"25\"" },
        { nom: "Valeur(ch, x, err)", description: "Convertit la chaîne ch en valeur numérique x (err = 0 si succès)", exemple: "Valeur(\"128\", x, err)" },
        { nom: "Estnum(ch)", description: "Retourne Vrai si la chaîne ch représente un nombre valide, Faux sinon", exemple: "Estnum(\"2026\") = Vrai" },
        { nom: "Majus(ch)", description: "Retourne la chaîne ch convertie en lettres majuscules", exemple: "Majus(\"chimie\") = \"CHIMIE\"" },
        { nom: "Ord(c)", description: "Retourne le code ASCII (entier) du caractère c", exemple: "Ord('A') = 65" },
        { nom: "Chr(code)", description: "Retourne le caractère correspondant au code ASCII spécifié", exemple: "Chr(65) = 'A'" }
      ],

      codeIndexationAlgo: `// En algorithmique officielle 2024-2025 :
// Une chaîne Ch est indexée de 0 à Long(Ch) - 1.
Ch ← "SCIENCE"
Afficher(Long(Ch))        // 7
Afficher(Ch[0])            // 'S' (premier caractère)
Afficher(Ch[Long(Ch) - 1]) // 'E' (dernier caractère)
Afficher(Sous_chaine(Ch, 2, 4)) // "IEN" (inclusif)`,

      codeIndexationPy: `# En Python officiel :
ch = "SCIENCE"
print(len(ch))       # 7
print(ch[0])         # 'S'
print(ch[len(ch)-1]) # 'E'
print(ch[2:5])       # "IEN" (le 5 est exclu, équivalent à Sous_chaine(ch, 2, 4))`
    };
  },

  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    },

    copyCode(text, event) {
      let codeEl = null;
      let btnEl = null;
      if (event && event.currentTarget) {
        btnEl = event.currentTarget;
        const container = btnEl.closest('.code-container') || btnEl.parentNode;
        if (container) {
          codeEl = container.querySelector('code');
        }
      }
      if (window.codeClipboardInstance) {
        window.codeClipboardInstance.copyToClipboard(text, btnEl, codeEl);
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        if (typeof window.showToast === 'function') {
          window.showToast("Code copié !");
        }
      }
    },

    renderMath() {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    },

    jumpToSection(sectionId) {
      if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.showSection === 'function') {
        window.sectionDrawerInstance.showSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  },

  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.$nextTick(() => {
      if (typeof window.safeHighlightAll === 'function') {
        window.safeHighlightAll();
      } else if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
      }
      this.renderMath();
    });
  }
}).mount('#app');
