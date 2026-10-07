/**
 * 3T_2026 - Informatique 3ème Année Secondary
 * SectionDrawer Class (assets/js/pages.js)
 * Implémente la navigation par tiroir latéral (Offcanvas à gauche) avec
 * groupement des <section> par <article> et affichage d'une seule <section> à la fois.
 */

class SectionDrawer {
  /**
   * @param {Object} options Configuration du tiroir
   * @param {string} [options.drawerId='sectionDrawer'] ID du conteneur Offcanvas
   * @param {string} [options.title='Sommaire de la séance'] Titre du tiroir
   * @param {string} [options.articleSelector='article, .article-content-wrapper'] Sélecteur des articles
   * @param {string} [options.sectionSelector='section, .section-pane'] Sélecteur des sections
   * @param {boolean} [options.floatingButton=true] Générer le bouton flottant
   * @param {boolean} [options.autoInit=true] Initialiser automatiquement
   * @param {boolean} [options.singleSectionMode=true] Afficher une seule section à la fois
   * @param {number} [options.initialIndex=0] Index de la section initiale
   */
  constructor(options = {}) {
    this.options = Object.assign({
      drawerId: 'sectionDrawer',
      title: 'Sommaire de la séance',
      articleSelector: 'article, .article-content-wrapper',
      sectionSelector: 'section, .section-pane',
      floatingButton: true,
      autoInit: true,
      singleSectionMode: true,
      initialIndex: 0
    }, options);

    this.articles = [];
    this.allSections = [];
    this.drawerEl = null;
    this.activeIndex = 0;
    this.activeId = null;

    if (this.options.autoInit) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }
  }

  /**
   * Initialise la navigation et le tiroir
   */
  init() {
    this.scanArticlesAndSections();
    if (this.allSections.length === 0) return;

    this.renderDrawerContainer();
    if (this.options.floatingButton) {
      this.renderFloatingButton();
    }
    this.populateNavItems();
    this.renderHeaderIndicator();
    this.attachEventListeners();

    // Mode section unique : afficher la première section (ou celle du hash)
    if (this.options.singleSectionMode) {
      let initialIdx = this.options.initialIndex;
      if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        let foundIdx = this.allSections.findIndex(sec => sec.id === hashId);
        if (foundIdx === -1) {
          const matchingArticle = this.articles.find(art => art.id === hashId);
          if (matchingArticle && matchingArticle.sections && matchingArticle.sections.length > 0) {
            foundIdx = matchingArticle.sections[0].flatIndex;
          }
        }
        if (foundIdx !== -1) initialIdx = foundIdx;
      }
      this.showSection(initialIdx, false);
    }
  }

  /**
   * Scanne la page et groupe les <section> sous leur <article> respectif
   */
  scanArticlesAndSections() {
    this.articles = [];
    this.allSections = [];

    const articleEls = document.querySelectorAll(this.options.articleSelector);

    articleEls.forEach((artEl, artIndex) => {
      const artH2 = artEl.querySelector('h2, .article-title, h1');
      let artTitle = artH2 ? artH2.textContent.trim() : `Article ${artIndex + 1}`;
      let artIcon = 'bi-journal-bookmark-fill';

      if (artH2) {
        const iconEl = artH2.querySelector('i');
        if (iconEl && iconEl.className) {
          artIcon = iconEl.className;
        }
      }

      if (!artEl.id) {
        artEl.id = `article-${artIndex + 1}`;
      }

      const articleGroup = {
        id: artEl.id,
        title: artTitle,
        icon: artIcon,
        element: artEl,
        sections: []
      };

      // Recherche des sections enfants dans l'article
      let sectionEls = Array.from(artEl.querySelectorAll(this.options.sectionSelector));

      // Fallback si l'article n'a pas de <section> enfant
      if (sectionEls.length === 0) {
        sectionEls = [artEl];
      }

      sectionEls.forEach((secEl, secIndex) => {
        let headingEl = secEl.querySelector('h3, h2, h1, .card-header-custom h3');
        let secTitle = '';
        let secIcon = 'bi-hash';

        if (headingEl) {
          secTitle = headingEl.textContent.trim();
          const iconEl = headingEl.querySelector('i');
          if (iconEl && iconEl.className) {
            secIcon = iconEl.className;
          }
        }

        if (!secTitle) {
          secTitle = sectionEls.length > 1 ? `Partie ${secIndex + 1}` : artTitle;
        }

        if (!secEl.id) {
          secEl.id = `${artEl.id}-sec-${secIndex + 1}`;
        }

        const secItem = {
          id: secEl.id,
          title: secTitle,
          icon: secIcon,
          element: secEl,
          parentArticle: artEl,
          parentArticleId: artEl.id,
          articleTitle: artTitle,
          articleIcon: artIcon,
          flatIndex: this.allSections.length
        };

        articleGroup.sections.push(secItem);
        this.allSections.push(secItem);
      });

      this.articles.push(articleGroup);
    });

    // Fallback si aucun article n'a été trouvé sur la page
    if (this.articles.length === 0) {
      const sectionEls = Array.from(document.querySelectorAll(this.options.sectionSelector));
      sectionEls.forEach((secEl, secIndex) => {
        let headingEl = secEl.querySelector('h3, h2, h1');
        let secTitle = headingEl ? headingEl.textContent.trim() : `Section ${secIndex + 1}`;
        let secIcon = 'bi-journal-text';

        if (!secEl.id) secEl.id = `section-${secIndex + 1}`;

        const secItem = {
          id: secEl.id,
          title: secTitle,
          icon: secIcon,
          element: secEl,
          parentArticle: null,
          parentArticleId: null,
          articleTitle: 'Page',
          articleIcon: 'bi-file-text',
          flatIndex: this.allSections.length
        };

        this.allSections.push(secItem);
        this.articles.push({
          id: `group-${secIndex + 1}`,
          title: secTitle,
          icon: secIcon,
          element: secEl,
          sections: [secItem]
        });
      });
    }
  }

  /**
   * Affiche UNIQUEMENT la <section> spécifiée et masque toutes les autres
   */
  showSection(indexOrId, doScroll = true, updateUrl = true) {
    if (!this.allSections || this.allSections.length === 0) {
      this.scanArticlesAndSections();
    }
    if (this.allSections.length === 0) return false;

    let targetIndex = -1;

    if (typeof indexOrId === 'number') {
      targetIndex = indexOrId;
    } else if (typeof indexOrId === 'string') {
      // 1. Recherche directe par ID de section
      targetIndex = this.allSections.findIndex(sec => sec.id === indexOrId);

      // 2. Recherche par ID d'article parent (ex: 'palier-debutant', 'palier-socle', etc.)
      if (targetIndex === -1) {
        let matchingArticle = this.articles.find(art => art.id === indexOrId);
        if (!matchingArticle) {
          // Re-scan au cas où le DOM a été re-rendu par Vue après scan initial
          this.scanArticlesAndSections();
          matchingArticle = this.articles.find(art => art.id === indexOrId);
        }
        if (matchingArticle && matchingArticle.sections && matchingArticle.sections.length > 0) {
          targetIndex = matchingArticle.sections[0].flatIndex;
        }
      }

      // 3. Recherche dans le DOM réel si non trouvé dans les index
      if (targetIndex === -1) {
        const domEl = document.getElementById(indexOrId);
        if (domEl) {
          if (domEl.matches && domEl.matches(this.options.sectionSelector)) {
            targetIndex = this.allSections.findIndex(sec => sec.id === domEl.id);
          } else {
            const childSec = domEl.querySelector(this.options.sectionSelector);
            if (childSec && childSec.id) {
              targetIndex = this.allSections.findIndex(sec => sec.id === childSec.id);
            }
          }
        }
      }

      // 4. Recherche par inclusion/préfixe
      if (targetIndex === -1) {
        const partialArt = this.articles.find(art => art.id && (art.id.startsWith(indexOrId) || indexOrId.startsWith(art.id)));
        if (partialArt && partialArt.sections && partialArt.sections.length > 0) {
          targetIndex = partialArt.sections[0].flatIndex;
        }
      }
    }

    if (targetIndex < 0 || targetIndex >= this.allSections.length) {
      console.warn(`[SectionDrawer] Section ou article introuvable pour : "${indexOrId}"`);
      return false;
    }

    this.activeIndex = targetIndex;
    const targetItem = this.allSections[targetIndex];
    this.activeId = targetItem.id;

    // Récupération des éléments LIVE du DOM (résistant aux re-rendus Vue/KaTeX)
    const allArticles = document.querySelectorAll(this.options.articleSelector);
    const parentArtId = targetItem.parentArticleId || (targetItem.parentArticle ? targetItem.parentArticle.id : null);

    // 1. Masquer toutes les sections et afficher uniquement la section ciblée
    this.allSections.forEach((sec, idx) => {
      const liveSecEl = document.getElementById(sec.id) || sec.element;
      if (liveSecEl) {
        if (idx === targetIndex) {
          liveSecEl.style.display = 'block';
          liveSecEl.classList.add('section-active-fade');
        } else {
          liveSecEl.style.display = 'none';
          liveSecEl.classList.remove('section-active-fade');
        }
      }
    });

    // 2. Afficher l'article parent correspondant et masquer les autres
    if (allArticles.length > 0) {
      allArticles.forEach(art => {
        const liveSecEl = document.getElementById(targetItem.id);
        const isMatch = (parentArtId && art.id === parentArtId) || (liveSecEl && art.contains(liveSecEl));
        if (isMatch) {
          art.style.display = 'block';
        } else {
          art.style.display = 'none';
        }
      });
    }

    // 3. Mettre à jour l'URL (Hash)
    if (updateUrl && targetItem.id) {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${targetItem.id}`);
      } else {
        window.location.hash = targetItem.id;
      }
    }

    // 4. Activer l'élément correspondant dans le tiroir et dans la barre d'onglets
    this.setActiveDrawerItem(targetItem.id);
    this.setActivePillItem(targetItem.id);

    // 5. Mettre à jour l'en-tête de navigation (Section X sur Y)
    this.updateHeaderIndicator(targetItem);

    // 6. Défilement fluide vers le haut du contenu actif
    if (doScroll) {
      const liveSecEl = document.getElementById(targetItem.id);
      const liveArtEl = parentArtId ? document.getElementById(parentArtId) : null;
      const targetElement = liveArtEl || liveSecEl;
      if (targetElement) {
        const headerOffset = 130;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elemRect = targetElement.getBoundingClientRect().top;
        const targetPos = elemRect - bodyRect - headerOffset;
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 130, behavior: 'smooth' });
      }
    }

    // 7. Fermer le tiroir sur mobile si ouvert
    this.close();

    // 8. Coloration syntaxique & KaTeX
    setTimeout(() => {
      if (typeof hljs !== 'undefined' && hljs.highlightAll) {
        hljs.highlightAll();
      }
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
            { left: '$', right: '$', display: false }
          ],
          ignoredClasses: [
            'action-pool-box',
            'action-slots-box',
            'slots-container',
            'quiz-options-list',
            'select-type-custom',
            'vue-interactive',
            'no-katex'
          ],
          throwOnError: false
        });
      }
      if (window.codeClipboardInstance) {
        window.codeClipboardInstance.setupCodeCopyButtons();
      }
    }, 50);

    return true;
  }

  showNextSection() {
    if (this.activeIndex < this.allSections.length - 1) {
      this.showSection(this.activeIndex + 1);
    }
  }

  showPrevSection() {
    if (this.activeIndex > 0) {
      this.showSection(this.activeIndex - 1);
    }
  }

  /**
   * Crée/met à jour la barre d'indicateur de section en bas de page
   */
  renderHeaderIndicator() {
    if (this.allSections.length === 0) return;
    const firstItemEl = this.allSections[0].element;
    const parentContainer = firstItemEl.closest('article, .article-content-wrapper') || firstItemEl.parentNode;
    if (!parentContainer || !parentContainer.parentNode) return;

    let bar = document.getElementById('sectionHeaderNav');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'sectionHeaderNav';
      bar.className = 'sectionHeaderNav d-flex justify-content-between align-items-center mt-5 mb-4 p-3 box-custom border-primary border-opacity-25 shadow-sm rounded-3';
      parentContainer.parentNode.appendChild(bar);
    } else if (bar.parentNode !== parentContainer.parentNode || bar !== parentContainer.parentNode.lastElementChild) {
      parentContainer.parentNode.appendChild(bar);
    }

    this.updateHeaderIndicator(this.allSections[this.activeIndex] || this.allSections[0]);
  }

  updateHeaderIndicator(item) {
    const bar = document.getElementById('sectionHeaderNav');
    if (!bar || !item) return;

    const prevDisabled = this.activeIndex === 0 ? 'disabled opacity-50' : '';
    const nextDisabled = this.activeIndex === this.allSections.length - 1 ? 'disabled opacity-50' : '';

    bar.innerHTML = `
      <div class="d-flex align-items-center gap-3 overflow-hidden">
        <div class="badge bg-primary bg-opacity-25 text-primary-light border border-primary border-opacity-25 rounded-circle p-2 px-3 fs-5 flex-shrink-0">
          <i class="${item.icon}"></i>
        </div>
        <div class="text-truncate">
          <div class="text-xs text-muted fw-semibold uppercase tracking-wider mb-1">
            Section ${this.activeIndex + 1} sur ${this.allSections.length} ${item.articleTitle ? `• ${this.escapeHtml(item.articleTitle)}` : ''}
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2 flex-shrink-0">
        <button class="btn btn-outline-secondary btn-sm ${prevDisabled}" id="hdrPrevBtn" title="Section précédente">
          <i class="bi bi-chevron-left me-1"></i> <span class="d-none d-sm-inline">Précédent</span>
        </button>
        <button class="btn btn-primary btn-sm ${nextDisabled}" id="hdrNextBtn" title="Section suivante">
          <span class="d-none d-sm-inline">Suivant</span> <i class="bi bi-chevron-right ms-1"></i>
        </button>
      </div>
    `;

    const prevBtn = bar.querySelector('#hdrPrevBtn');
    const nextBtn = bar.querySelector('#hdrNextBtn');

    if (prevBtn) prevBtn.onclick = () => this.showPrevSection();
    if (nextBtn) nextBtn.onclick = () => this.showNextSection();
  }

  /**
   * Injecte le conteneur Offcanvas du tiroir
   */
  renderDrawerContainer() {
    let drawer = document.getElementById(this.options.drawerId);
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = this.options.drawerId;
      drawer.className = 'offcanvas offcanvas-start drawer-custom';
      drawer.tabIndex = -1;
      drawer.setAttribute('aria-labelledby', `${this.options.drawerId}Label`);

      drawer.innerHTML = `
        <div class="offcanvas-header drawer-header-custom d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-compass-fill text-primary fs-5"></i>
            <h5 class="offcanvas-title fw-bold h6 mb-0 text-heading" id="${this.options.drawerId}Label">
              ${this.escapeHtml(this.options.title)}
            </h5>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Fermer"></button>
        </div>
        <div class="offcanvas-body p-3" id="${this.options.drawerId}Body">
        </div>
      `;

      document.body.appendChild(drawer);
    }
    this.drawerEl = drawer;
  }

  /**
   * Injecte le bouton flottant de tiroir à gauche
   */
  renderFloatingButton() {
    let btn = document.getElementById(`${this.options.drawerId}Btn`);
    if (!btn) {
      btn = document.createElement('button');
      btn.id = `${this.options.drawerId}Btn`;
      btn.className = 'floating-drawer-btn';
      btn.setAttribute('data-bs-toggle', 'offcanvas');
      btn.setAttribute('data-bs-target', `#${this.options.drawerId}`);
      btn.setAttribute('aria-label', 'Ouvrir le sommaire');

      btn.innerHTML = `
        <i class="bi bi-compass"></i>
        <span>Sommaire</span>
        <span class="badge-count">${this.allSections.length}</span>
      `;

      document.body.appendChild(btn);
    }
  }

  /**
   * Remplit le tiroir en incluant la navigation entre les séances et le sommaire de la page
   */
  populateNavItems() {
    const bodyEl = document.getElementById(`${this.options.drawerId}Body`);
    if (!bodyEl) return;

    // Récupération de la page actuelle pour surligner la séance active
    const currentPath = window.location.pathname;
    let currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    if (!currentFile || currentFile === '') currentFile = 'index.html';

    const seancesList = [
      { file: 'index.html', label: 'Accueil & Sommaire', icon: 'bi-house-door' },
      { file: 'seance01.html', label: 'Séance 1 : Série N°0 (Diagnostic)', icon: 'bi-journal-bookmark' },
      { file: 'seance02.html', label: 'Séance 2 : Boucle Tant Que (Apprentissage)', icon: 'bi-repeat' },
      { file: 'seance03.html', label: 'Séance 3 : TP N°1 (Tant Que)', icon: 'bi-laptop' },
      { file: 'seance04.html', label: 'Séance 4 : Répéter & Selon (Apprentissage)', icon: 'bi-arrow-repeat' },
      { file: 'seance05.html', label: 'Séance 5 : TP N°2 (Menus & Boucles)', icon: 'bi-laptop' },
      { file: 'seance06.html', label: 'Séance 6 : Chaînes de caractères (Apprentissage)', icon: 'bi-fonts' },
      { file: 'seance07.html', label: 'Séance 7 : TP N°3 (Traitements textuels)', icon: 'bi-laptop' },
      { file: 'seance08.html', label: 'Séance 8 : Tableaux 1D statiques (Apprentissage)', icon: 'bi-grid-1x2' },
      { file: 'seance09.html', label: 'Séance 9 : TP N°4 (Tableaux 1D & Extrema)', icon: 'bi-laptop' },
      { file: 'seance10.html', label: 'Séance 10 : Filtrage sélectif sur tableaux (Apprentissage)', icon: 'bi-funnel' },
      { file: 'seance11.html', label: 'Séance 11 : TP N°5 (Filtrage & Séparation)', icon: 'bi-laptop' },
      { file: 'seance12.html', label: 'Séance 12 : Modularité logicielle (Apprentissage)', icon: 'bi-diagram-3' },
      { file: 'seance13.html', label: 'Séance 13 : TP N°6 (Application modulaire)', icon: 'bi-laptop' },
      { file: 'seance14.html', label: 'Séance 14 : Arithmétique I : PGCD & PPCM (Apprentissage)', icon: 'bi-calculator' },
      { file: 'seance15.html', label: 'Séance 15 : TP N°7 (PGCD & PPCM)', icon: 'bi-laptop' },
      { file: 'seance16.html', label: 'Séance 16 : Arithmétique II : Primalité (Apprentissage)', icon: 'bi-shield-check' },
      { file: 'seance17.html', label: 'Séance 17 : TP N°8 (Primalité & Facteurs)', icon: 'bi-laptop' },
      { file: 'seance18.html', label: 'Séance 18 : Recherche & Tri à Bulles (Apprentissage)', icon: 'bi-sort-numeric-down' },
      { file: 'seance19.html', label: 'Séance 19 : TP N°9 (Recherche & Tri)', icon: 'bi-laptop' },
      { file: 'seance20.html', label: 'Séance 20 : Épreuve Finale de Synthèse & Bilan', icon: 'bi-award' }
    ];

    const currentIndex = seancesList.findIndex(s => s.file === currentFile);

    // Construction de la liste restreinte : Séance Précédente, Actuelle, Séance Suivante
    const itemsToDisplay = [];

    if (currentIndex !== -1) {
      // Séance Précédente (si elle existe)
      if (currentIndex > 0) {
        itemsToDisplay.push({
          ...seancesList[currentIndex - 1],
          relType: 'prev',
          badgeText: 'Précédente',
          badgeClass: 'bg-secondary text-white'
        });
      }

      // Séance Actuelle
      itemsToDisplay.push({
        ...seancesList[currentIndex],
        relType: 'current',
        badgeText: 'Actuelle',
        badgeClass: 'bg-primary text-white'
      });

      // Séance Suivante (si elle existe)
      if (currentIndex < seancesList.length - 1) {
        itemsToDisplay.push({
          ...seancesList[currentIndex + 1],
          relType: 'next',
          badgeText: 'Suivante',
          badgeClass: 'bg-info text-dark'
        });
      }
    } else {
      // Par défaut
      itemsToDisplay.push(...seancesList.slice(0, 2).map((s, idx) => ({
        ...s,
        relType: idx === 0 ? 'current' : 'next',
        badgeText: idx === 0 ? 'Actuelle' : 'Suivante',
        badgeClass: idx === 0 ? 'bg-primary text-white' : 'bg-info text-dark'
      })));
    }

    let html = '<div class="nav-drawer-list d-flex flex-column gap-3">';

    // 1. Sections de la Séance Actuelle (Sommaire en HAUT du tiroir)
    if (this.articles && this.articles.length > 0) {
      html += `
        <div class="drawer-article-header d-flex align-items-center gap-2 px-2 py-1 mb-2 text-primary fw-bold small text-uppercase tracking-wider">
          <i class="bi bi-list-nested fs-6 text-primary"></i>
          <span>Sommaire de cette page</span>
        </div>
      `;

      this.articles.forEach((artGroup) => {
        html += `
          <div class="drawer-article-group mb-2">
            <!-- En-tête du groupe d'Article -->
            <div class="drawer-article-header d-flex align-items-center gap-2 px-2 py-1 mb-2 text-primary fw-bold small text-uppercase tracking-wider border-bottom border-secondary border-opacity-25">
              <i class="${artGroup.icon} fs-6"></i>
              <span class="text-truncate">${this.escapeHtml(artGroup.title)}</span>
            </div>

            <!-- Liste des sections du groupe -->
            <div class="drawer-sections-list d-flex flex-column gap-1 ms-2 ps-2 border-start border-primary border-opacity-25">
        `;

        artGroup.sections.forEach((sec) => {
          html += `
            <div class="drawer-nav-item" data-flat-index="${sec.flatIndex}" data-target-id="${sec.id}" title="${this.escapeHtml(sec.title)}" role="button" tabindex="0">
              <div class="d-flex align-items-center gap-2 overflow-hidden">
                <div class="drawer-item-icon flex-shrink-0">
                  <i class="${sec.icon}"></i>
                </div>
                <div class="drawer-item-title fw-semibold">${this.escapeHtml(sec.title)}</div>
              </div>
              <i class="bi bi-chevron-right text-muted small ms-2 flex-shrink-0"></i>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      });
    }

    // 2. Navigation globale entre les Séances (placée TOUT EN BAS du tiroir, sur une seule ligne)
    const prevItem = itemsToDisplay.find(i => i.relType === 'prev');
    const nextItem = itemsToDisplay.find(i => i.relType === 'next');

    const getShortName = (item) => {
      if (!item) return '';
      if (item.file === 'index.html') return 'Accueil';
      const match = item.file.match(/seance(\d+)\.html/i);
      if (match) {
        return `Séance ${parseInt(match[1], 10)}`;
      }
      return item.label;
    };

    const prevName = getShortName(prevItem);
    const nextName = getShortName(nextItem);

    html += `
      <div class="drawer-article-group pt-3 mt-3 border-top border-secondary border-opacity-25">
        <div class="drawer-article-header d-flex align-items-center justify-content-between px-1 py-1 mb-2 text-info fw-bold small text-uppercase tracking-wider">
          <span class="d-flex align-items-center gap-2"><i class="bi bi-journals fs-6 text-info"></i> Navigation Séances</span>
        </div>
        <div class="d-flex align-items-center gap-2 justify-content-between mt-1">
          ${prevItem ? `
            <a href="${prevItem.file}" class="btn btn-sm btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-1 py-2 text-truncate" title="${this.escapeHtml(prevItem.label)}">
              <i class="bi bi-arrow-left"></i>
              <span class="small fw-semibold">${prevName}</span>
            </a>
          ` : `
            <button type="button" class="btn btn-sm btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-1 py-2 disabled opacity-25" disabled>
              <i class="bi bi-arrow-left"></i>
              <span class="small fw-semibold">Début</span>
            </button>
          `}

          ${nextItem ? `
            <a href="${nextItem.file}" class="btn btn-sm btn-outline-info flex-fill d-flex align-items-center justify-content-center gap-1 py-2 text-truncate" title="${this.escapeHtml(nextItem.label)}">
              <span class="small fw-semibold">${nextName}</span>
              <i class="bi bi-arrow-right"></i>
            </a>
          ` : `
            <button type="button" class="btn btn-sm btn-outline-secondary flex-fill d-flex align-items-center justify-content-center gap-1 py-2 disabled opacity-25" disabled>
              <span class="small fw-semibold">Fin</span>
              <i class="bi bi-arrow-right"></i>
            </button>
          `}
        </div>
      </div>
    `;

    html += '</div>';
    bodyEl.innerHTML = html;
  }

  /**
   * Écouteurs d'événements
   */
  attachEventListeners() {
    const bodyEl = document.getElementById(`${this.options.drawerId}Body`);
    if (!bodyEl) return;

    bodyEl.addEventListener('click', (e) => {
      const navItem = e.target.closest('[data-target-id]');
      if (!navItem) return;

      e.preventDefault();
      const targetIndexAttr = navItem.getAttribute('data-flat-index');
      const targetId = navItem.getAttribute('data-target-id');

      let idx = parseInt(targetIndexAttr, 10);
      if (isNaN(idx)) {
        idx = this.allSections.findIndex(sec => sec.id === targetId);
      }

      if (idx !== -1) {
        this.showSection(idx);
        this.close();
      }
    });

    window.addEventListener('popstate', () => {
      if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        this.showSection(hashId, true, false);
      }
    });
  }

  setActiveDrawerItem(id) {
    const bodyEl = document.getElementById(`${this.options.drawerId}Body`);
    if (!bodyEl) return;

    const allNavItems = bodyEl.querySelectorAll('[data-target-id]');
    allNavItems.forEach(el => {
      if (el.getAttribute('data-target-id') === id) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  setActivePillItem(id) {
    const pillNav = document.querySelector('.phase-pill-nav');
    if (!pillNav) return;

    const allButtons = pillNav.querySelectorAll('button');
    allButtons.forEach(btn => {
      const clickAttr = btn.getAttribute('@click') || btn.getAttribute('onclick') || '';
      const targetAttr = btn.getAttribute('data-target-id');
      const isTarget = (targetAttr && targetAttr === id) ||
                       (clickAttr && (clickAttr.includes(`'${id}'`) || clickAttr.includes(`"${id}"`)));
      if (isTarget) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }
    });
  }

  close() {
    if (this.drawerEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
      const instance = bootstrap.Offcanvas.getInstance(this.drawerEl) || new bootstrap.Offcanvas(this.drawerEl);
      instance.hide();
    }
  }

  open() {
    if (this.drawerEl && typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
      const instance = bootstrap.Offcanvas.getInstance(this.drawerEl) || new bootstrap.Offcanvas(this.drawerEl);
      instance.show();
    }
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.SectionDrawer = SectionDrawer;

if (typeof window !== 'undefined') {
  window.sectionDrawerInstance = new SectionDrawer();

  // Fonction globale jumpToSection accessible pour tous les boutons et contrôleurs
  window.jumpToSection = function(indexOrId) {
    if (window.sectionDrawerInstance && typeof window.sectionDrawerInstance.showSection === 'function') {
      const res = window.sectionDrawerInstance.showSection(indexOrId);
      if (res !== false) return true;
    }
    let el = document.getElementById(indexOrId);
    if (!el) {
      const art = document.querySelector(`article#${indexOrId}`);
      if (art) el = art.querySelector('section') || art;
    }
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  };
}

/**
 * Image Zoom Lightbox Modal
 * Véritable visionneuse plein écran haute fidélité avec zoom interactif, panoramique et affichage HD
 */
function initImageModalZoom() {
  let modalEl = document.getElementById('imageZoomModal');
  if (!modalEl) {
    const modalHTML = `
      <div class="modal fade" id="imageZoomModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content d-flex flex-column h-100 border-0" style="background: rgba(11, 17, 32, 0.98) !important; color: #f8fafc;">
            <!-- Header avec barre d'outils plein écran -->
            <div class="modal-header border-bottom border-secondary border-opacity-25 py-2 px-3 d-flex align-items-center justify-content-between" style="background: #0f172a; z-index: 10;">
              <div class="d-flex align-items-center gap-2 overflow-hidden me-2">
                <i class="bi bi-arrows-fullscreen text-info fs-5"></i>
                <h5 class="modal-title h6 mb-0 text-truncate font-mono text-light" id="imageZoomTitle">Agrandissement Plein Écran</h5>
                <span class="badge bg-info bg-opacity-25 text-info border border-info border-opacity-25 small font-mono d-none d-sm-inline-block">Vecteur HD</span>
              </div>
              <div class="d-flex align-items-center gap-2 flex-shrink-0">
                <!-- Contrôles de zoom interactifs -->
                <div class="btn-group btn-group-sm bg-dark rounded p-1 border border-secondary border-opacity-50">
                  <button type="button" class="btn btn-outline-light btn-sm py-0 px-2" id="zoomOutBtn" title="Zoom arrière (-)">
                    <i class="bi bi-dash-lg"></i>
                  </button>
                  <span class="px-2 py-0 small font-mono text-info d-flex align-items-center" id="zoomLevelText" style="min-width: 52px; justify-content: center;">100%</span>
                  <button type="button" class="btn btn-outline-light btn-sm py-0 px-2" id="zoomInBtn" title="Zoom avant (+)">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2 text-white-50" id="zoomResetBtn" title="Réinitialiser (100%)">
                    <i class="bi bi-arrow-counterclockwise"></i>
                  </button>
                </div>
                <!-- Ouvrir l'image originale -->
                <a id="zoomOpenRawLink" href="#" target="_blank" class="btn btn-sm btn-outline-info py-1 px-2" title="Ouvrir le fichier original dans un nouvel onglet">
                  <i class="bi bi-box-arrow-up-right me-1"></i><span class="d-none d-md-inline">Original</span>
                </a>
                <!-- Bascule plein écran navigateur -->
                <button type="button" class="btn btn-sm btn-outline-secondary py-1 px-2 text-light" id="zoomFullscreenToggle" title="Plein écran navigateur (F11)">
                  <i class="bi bi-arrows-fullscreen"></i>
                </button>
                <!-- Bouton fermer -->
                <button type="button" class="btn-close btn-close-white ms-1" data-bs-dismiss="modal" aria-label="Fermer"></button>
              </div>
            </div>
            <!-- Zone centrale d'affichage plein écran -->
            <div class="modal-body p-0 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden" style="background: radial-gradient(circle at center, #1e293b 0%, #0b1120 100%);">
              <div id="imageZoomWrapper" class="w-100 h-100 d-flex align-items-center justify-content-center overflow-hidden position-relative" style="cursor: grab; user-select: none;">
                <img id="imageZoomSrc" src="" alt="" class="shadow-lg rounded" style="max-height: calc(100vh - 120px); max-width: 96vw; width: auto; height: auto; object-fit: contain; transition: transform 0.15s ease-out; transform-origin: center center; display: block;">
              </div>
            </div>
            <!-- Pied de page avec légende et raccourcis -->
            <div class="modal-footer border-top border-secondary border-opacity-25 py-2 px-3 d-flex justify-content-between align-items-center" style="background: #0f172a; z-index: 10;">
              <p id="imageZoomCaption" class="small text-white-50 mb-0 text-truncate fst-italic me-2"></p>
              <span class="badge bg-secondary bg-opacity-25 text-white-50 small font-mono d-none d-md-inline-block">
                <i class="bi bi-mouse me-1"></i> Molette : Zoomer · Glisser : Déplacer · Double-clic : Basculer zoom · Échap : Fermer
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalEl = document.getElementById('imageZoomModal');

    // Initialisation des interactions de zoom & panoramique
    let currentZoom = 1.0;
    let panX = 0;
    let panY = 0;
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    const img = document.getElementById('imageZoomSrc');
    const levelText = document.getElementById('zoomLevelText');
    const wrapper = document.getElementById('imageZoomWrapper');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    const fsToggleBtn = document.getElementById('zoomFullscreenToggle');

    function updateTransform() {
      if (img) {
        img.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
      }
      if (levelText) {
        levelText.textContent = `${Math.round(currentZoom * 100)}%`;
      }
    }

    function resetZoom() {
      currentZoom = 1.0;
      panX = 0;
      panY = 0;
      if (wrapper) wrapper.style.cursor = 'grab';
      updateTransform();
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentZoom = Math.min(3.5, Math.round((currentZoom + 0.25) * 100) / 100);
        updateTransform();
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentZoom = Math.max(0.5, Math.round((currentZoom - 0.25) * 100) / 100);
        updateTransform();
      });
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetZoom();
      });
    }

    if (fsToggleBtn) {
      fsToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          modalEl.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    if (wrapper) {
      // Zoom avec la molette
      wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.15 : -0.15;
        currentZoom = Math.min(3.5, Math.max(0.5, Math.round((currentZoom + delta) * 100) / 100));
        updateTransform();
      }, { passive: false });

      // Double-clic pour zoom rapide 1x / 1.6x
      wrapper.addEventListener('dblclick', (e) => {
        e.preventDefault();
        if (currentZoom > 1.1) {
          resetZoom();
        } else {
          currentZoom = 1.6;
          updateTransform();
        }
      });

      // Panoramique par glisser-déposer
      wrapper.addEventListener('mousedown', (e) => {
        if (e.target.closest('button, a')) return;
        isPanning = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        wrapper.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        updateTransform();
      });

      window.addEventListener('mouseup', () => {
        if (isPanning) {
          isPanning = false;
          if (wrapper) wrapper.style.cursor = 'grab';
        }
      });
    }

    modalEl.addEventListener('show.bs.modal', resetZoom);
    modalEl.addEventListener('hidden.bs.modal', () => {
      resetZoom();
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Écouteur global de clic sur les illustrations
  document.body.addEventListener('click', function (e) {
    const imgTarget = e.target.closest('img');
    if (imgTarget && !imgTarget.classList.contains('no-zoom') && !imgTarget.closest('#imageZoomModal')) {
      const src = imgTarget.getAttribute('src');
      if (!src) return;

      const alt = imgTarget.getAttribute('alt') || 'Illustration technique';
      const modalSrc = document.getElementById('imageZoomSrc');
      const modalCaption = document.getElementById('imageZoomCaption');
      const modalTitle = document.getElementById('imageZoomTitle');
      const modalRawLink = document.getElementById('zoomOpenRawLink');

      if (modalSrc) modalSrc.setAttribute('src', src);
      if (modalCaption) modalCaption.textContent = alt;
      if (modalTitle) modalTitle.innerHTML = `<i class="bi bi-zoom-in text-info me-2"></i> ${alt}`;
      if (modalRawLink) modalRawLink.setAttribute('href', src);

      if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        bsModal.show();
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImageModalZoom);
} else {
  initImageModalZoom();
}

/**
 * Initialisation automatique du rendu des formules mathématiques KaTeX ($...$, $$...$$)
 */
function initKaTeXAutoRender() {
  if (typeof renderMathInElement === 'function') {
    const containers = document.querySelectorAll('.math-expr, .formula-box, .katex-render');
    containers.forEach(el => {
      renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKaTeXAutoRender);
} else {
  initKaTeXAutoRender();
}

/**
 * Gestionnaire universel du Thème (Dark / Light) en Vanilla JS
 */
function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function updateBtnUI(theme) {
    const btns = document.querySelectorAll('.theme-toggle-btn');
    btns.forEach(btn => {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('span');
      if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill text-primary';
      }
      if (text) {
        text.textContent = theme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
      }
    });
  }

  updateBtnUI(savedTheme);

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.theme-toggle-btn');
    if (btn) {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateBtnUI(newTheme);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}

/**
 * Toggle universel pour l'affichage des blocs de correction
 */
window.toggleAct1Correction = function (btn) {
  if (!btn) return;
  const colContainer = btn.closest('.col-md-6') || btn.parentElement;
  if (!colContainer) return;
  const parent = colContainer.parentElement || document;
  const correctionTarget = parent.querySelector('.correction-block') || colContainer.nextElementSibling;
  if (correctionTarget) {
    const isHidden = correctionTarget.style.display === 'none' || getComputedStyle(correctionTarget).display === 'none';
    correctionTarget.style.display = isHidden ? 'block' : 'none';
    btn.textContent = isHidden ? 'Masquer la correction' : 'Afficher la correction';
    if (isHidden && typeof window.safeHighlightAll === 'function') {
      window.safeHighlightAll();
    }
  }
};

/**
 * Helper global pour ré-exécuter le surlignage syntaxique sans l'avertissement dataset.highlighted de Highlight.js
 */
window.safeHighlightAll = function () {
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('code').forEach(el => {
      el.removeAttribute('data-highlighted');
    });
    hljs.highlightAll();
  }
};

document.addEventListener('shown.bs.collapse', function () {
  if (typeof window.safeHighlightAll === 'function') {
    window.safeHighlightAll();
  }
});
