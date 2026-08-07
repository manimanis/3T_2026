/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * CodeClipboard Class (assets/js/clipboard.js)
 * Gestionnaire autonome de copie dans le presse-papier pour les blocs de code <pre><code>
 * avec support de la coloration syntaxique (styles inlinés CF_HTML) et notifications Toast.
 */

class CodeClipboard {
  constructor(options = {}) {
    this.options = Object.assign({ autoInit: true }, options);

    if (this.options.autoInit) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }
  }

  init() {
    this.setupCodeCopyButtons();
  }

  /**
   * Ajoute un bouton de copie dans le presse-papier à TOUS les blocs <pre><code> de la page
   */
  setupCodeCopyButtons() {
    const preEls = document.querySelectorAll('pre');

    preEls.forEach((preEl) => {
      const codeEl = preEl.querySelector('code');
      if (!codeEl) return;

      const parentContainer = preEl.closest('.code-container') || preEl.parentNode;
      let existingBtn = parentContainer.querySelector('.btn-copy') || preEl.querySelector('.btn-copy');

      if (existingBtn) {
        existingBtn.dataset.copyAttached = 'true';
        preEl.dataset.copySetup = 'true';
        return;
      }

      if (preEl.dataset.copySetup === 'true') return;

      let container = preEl.closest('.code-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'code-container position-relative';
        preEl.parentNode.insertBefore(container, preEl);
        container.appendChild(preEl);
      } else {
        container.classList.add('position-relative');
      }

      const header = container.querySelector('.code-header');
      let copyBtn;

      if (header) {
        copyBtn = document.createElement('button');
        copyBtn.className = 'btn-copy';
        copyBtn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copier';
        header.appendChild(copyBtn);
      } else {
        copyBtn = document.createElement('button');
        copyBtn.className = 'btn-copy btn-copy-floating';
        copyBtn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copier';
        container.appendChild(copyBtn);
      }

      copyBtn.dataset.copyAttached = 'true';
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.copyToClipboard(codeEl.textContent, copyBtn, codeEl);
      });

      preEl.dataset.copySetup = 'true';
    });
  }

  /**
   * Extrait les styles calculés (window.getComputedStyle) pour chaque élément
   * et génère un document HTML complet conforme CF_HTML avec styles inlinés pour Word / Rich Text.
   */
  buildInlineStyledCodeHtml(codeEl) {
    if (typeof hljs !== 'undefined' && (!codeEl.classList.contains('hljs') || !codeEl.querySelector('span'))) {
      try {
        hljs.highlightElement(codeEl);
      } catch (e) { }
    }

    const preEl = codeEl.closest('pre') || codeEl;
    const preStyle = window.getComputedStyle(preEl);
    const codeStyle = window.getComputedStyle(codeEl);

    // Cloner l'élément pour appliquer les styles inlinés sans altérer le DOM
    const clone = codeEl.cloneNode(true);

    const origSpans = Array.from(codeEl.querySelectorAll('span, code, pre'));
    const cloneSpans = Array.from(clone.querySelectorAll('span, code, pre'));

    origSpans.forEach((orig, index) => {
      const cloned = cloneSpans[index];
      if (!cloned || orig.nodeType !== Node.ELEMENT_NODE) return;

      const cs = window.getComputedStyle(orig);
      let cssText = '';

      if (cs.color && cs.color !== 'rgba(0, 0, 0, 0)') {
        cssText += `color: ${cs.color} !important; `;
      }
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') {
        cssText += `background-color: ${cs.backgroundColor} !important; `;
      }
      if (cs.fontWeight && cs.fontWeight !== '400' && cs.fontWeight !== 'normal') {
        cssText += `font-weight: ${cs.fontWeight} !important; `;
      }
      if (cs.fontStyle && cs.fontStyle !== 'normal') {
        cssText += `font-style: ${cs.fontStyle} !important; `;
      }

      if (cssText) {
        cloned.setAttribute('style', cssText);
      }
    });

    let preBg = preStyle.backgroundColor;
    if (!preBg || preBg === 'rgba(0, 0, 0, 0)' || preBg === 'transparent') {
      preBg = '#0d1117';
    }
    let preColor = codeStyle.color || preStyle.color || '#f8fafc';
    const fontFamily = "Consolas, 'Fira Code', 'Courier New', monospace";

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="background-color: transparent; margin: 0; padding: 0;">
  <!-- Start Fragment -->
  <div style="background-color: ${preBg}; color: ${preColor}; font-family: ${fontFamily}; font-size: 10.5pt; line-height: 1.45; padding: 12pt 14pt; border-radius: 6px; white-space: pre-wrap; word-break: break-all;">
    <pre style="margin: 0; font-family: ${fontFamily}; font-size: 10.5pt; background: transparent; color: ${preColor}; white-space: pre-wrap;"><code style="font-family: ${fontFamily}; color: ${preColor};">${clone.innerHTML}</code></pre>
  </div>
  <!-- End Fragment -->
</body>
</html>`;
  }

  /**
   * Copie le texte (et l'HTML enrichi avec styles inlinés) dans le presse-papier avec feedback visuel
   */
  copyToClipboard(text, btnElement, codeEl) {
    // Protection anti-double exécution sur le même bouton
    if (btnElement && btnElement._copyBusy) return;
    if (btnElement) {
      btnElement._copyBusy = true;
      setTimeout(() => { btnElement._copyBusy = false; }, 400);
    }
    if (!text) return;
    const cleanText = text.trim();

    let htmlContent = null;
    if (codeEl) {
      try {
        htmlContent = this.buildInlineStyledCodeHtml(codeEl);
      } catch (err) {
        console.warn('Erreur lors de l’extraction des styles calculés :', err);
      }
    }

    if (htmlContent && navigator.clipboard && window.ClipboardItem) {
      const textBlob = new Blob([cleanText], { type: 'text/plain' });
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });

      const item = new ClipboardItem({
        'text/plain': textBlob,
        'text/html': htmlBlob
      });

      navigator.clipboard
        .write([item])
        .then(() => {
          this.showCopyFeedback(btnElement);
        })
        .catch(() => {
          this.fallbackCopy(cleanText, btnElement);
        });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(cleanText)
        .then(() => {
          this.showCopyFeedback(btnElement);
        })
        .catch(() => {
          this.fallbackCopy(cleanText, btnElement);
        });
    } else {
      this.fallbackCopy(cleanText, btnElement);
    }
  }

  showCopyFeedback(btnElement) {
    if (btnElement) {
      const origHtml = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="bi bi-check2 me-1"></i> Copié !';
      btnElement.classList.add('btn-copy-success');
      setTimeout(() => {
        btnElement.innerHTML = origHtml;
        btnElement.classList.remove('btn-copy-success');
      }, 2000);
    }
    if (typeof window.showToast === 'function') {
      window.showToast("Code copié !");
    }
  }

  fallbackCopy(text, btnElement) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (e) { }
    document.body.removeChild(textarea);
    this.showCopyFeedback(btnElement);
  }
}

/**
 * Fonction globale Toast avec anti-rebond (déduplication 400ms)
 */
let lastToastTime = 0;
let lastToastMsg = '';

window.showToast = function (message = "Code copié dans le presse-papier !", icon = "bi-check-circle-fill text-success") {
  const now = Date.now();
  if (now - lastToastTime < 400 && lastToastMsg === message) {
    return;
  }
  lastToastTime = now;
  lastToastMsg = message;

  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container-custom';
    document.body.appendChild(toastContainer);
  }

  const toastEl = document.createElement('div');
  toastEl.className = 'toast-custom';
  toastEl.innerHTML = `
    <i class="bi ${icon} fs-5"></i>
    <span class="fw-semibold small">${message}</span>
  `;

  toastContainer.appendChild(toastEl);

  requestAnimationFrame(() => {
    toastEl.classList.add('toast-show');
  });

  setTimeout(() => {
    toastEl.classList.remove('toast-show');
    toastEl.classList.add('toast-hide');
    setTimeout(() => {
      if (toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
    }, 300);
  }, 2500);
};

window.CodeClipboard = CodeClipboard;

if (typeof window !== 'undefined') {
  window.codeClipboardInstance = new CodeClipboard();
}
