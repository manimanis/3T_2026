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
        const foundIdx = this.allSections.findIndex(sec => sec.id === hashId);
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
    let targetIndex = -1;

    if (typeof indexOrId === 'number') {
      targetIndex = indexOrId;
    } else {
      targetIndex = this.allSections.findIndex(sec => sec.id === indexOrId);
    }

    if (targetIndex < 0 || targetIndex >= this.allSections.length) return;

    this.activeIndex = targetIndex;
    const targetItem = this.allSections[targetIndex];
    this.activeId = targetItem.id;

    const allArticles = document.querySelectorAll('article, .article-content-wrapper');

    // 1. Masquer toutes les sections et afficher uniquement la section ciblée
    this.allSections.forEach((sec, idx) => {
      if (sec.element) {
        if (idx === targetIndex) {
          sec.element.style.display = 'block';
          sec.element.classList.add('section-active-fade');
        } else {
          sec.element.style.display = 'none';
          sec.element.classList.remove('section-active-fade');
        }
      }
    });

    // 2. Afficher l'article parent correspondant et masquer les autres
    if (allArticles.length > 0) {
      allArticles.forEach(art => {
        if (targetItem.parentArticle && art === targetItem.parentArticle) {
          art.style.display = 'block';
        } else if (!targetItem.parentArticle && art.contains(targetItem.element)) {
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

    // 4. Activer l'élément correspondant dans le tiroir
    this.setActiveDrawerItem(targetItem.id);

    // 5. Mettre à jour l'en-tête de navigation (Section X sur Y)
    this.updateHeaderIndicator(targetItem);

    // 6. Défilement haut de page
    if (doScroll) {
      window.scrollTo({ top: 110, behavior: 'smooth' });
    }

    // 7. Coloration syntaxique & KaTeX
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
          throwOnError: false
        });
      }
      if (window.codeClipboardInstance) {
        window.codeClipboardInstance.setupCodeCopyButtons();
      }
    }, 50);
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
   * Crée/met à jour la barre d'indicateur de section en haut de page
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
      bar.className = 'd-flex justify-content-between align-items-center mb-4 p-3 box-custom border-primary border-opacity-25 shadow-sm rounded-3';
      parentContainer.parentNode.insertBefore(bar, parentContainer);
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
      { file: 'index.html', label: 'Accueil & Planification', icon: 'bi-house-door' },
      { file: 'seance01.html', label: 'Séance 1 : Bases Python & Diagnostic', icon: 'bi-journal-bookmark' },
      { file: 'seance02.html', label: 'Séance 2 : Structures Simples (Si / Pour)', icon: 'bi-journal-bookmark' },
      { file: 'seance03.html', label: 'Séance 3 : Structure Selon (match...case)', icon: 'bi-journal-bookmark' },
      { file: 'seance04.html', label: 'Séance 4 : Tant Que & Répéter', icon: 'bi-journal-bookmark' },
      { file: 'seance05.html', label: 'Séance 5 : Tableaux 1D – Saisie & Parcours', icon: 'bi-journal-bookmark' },
      { file: 'seance06.html', label: 'Séance 6 : Traitements Élémentaires Tableaux 1D', icon: 'bi-journal-bookmark' },
      { file: 'seance07.html', label: 'Séance 7 : Introduction à la Modularité', icon: 'bi-journal-bookmark' },
      { file: 'seance08.html', label: 'Séance 8 : Paramètres, Valeurs de Retour & Portée', icon: 'bi-journal-bookmark' },
      { file: 'seance09.html', label: 'Séance 9 : Modules Prédéfinis & Tableaux', icon: 'bi-journal-bookmark' },
      { file: 'seance10.html', label: 'Séance 10 : Évaluation Pratique Intermédiaire', icon: 'bi-journal-bookmark' },
      { file: 'seance11.html', label: 'Séance 11 : Arithmétique I – PGCD & PPCM', icon: 'bi-journal-bookmark' },
      { file: 'seance12.html', label: 'Séance 12 : Arithmétique II – Nombres Premiers', icon: 'bi-journal-bookmark' },
      { file: 'seance13.html', label: 'Séance 13 : Recherche Séquentielle', icon: 'bi-journal-bookmark' },
      { file: 'seance14.html', label: 'Séance 14 : Tri d\'un Tableau – Tri à Bulles', icon: 'bi-journal-bookmark' },
      { file: 'seance15.html', label: 'Séance 15 : Synthèse & Mini-Projet Python', icon: 'bi-journal-bookmark' }
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

    // 1. Navigation globale entre les Séances (Précédente, Actuelle, Suivante)
    html += `
      <div class="drawer-article-group pb-2 mb-2 border-bottom border-secondary border-opacity-25">
        <div class="drawer-article-header d-flex align-items-center justify-content-between px-2 py-1 mb-2 text-info fw-bold small text-uppercase tracking-wider">
          <span class="d-flex align-items-center gap-2"><i class="bi bi-journals fs-6 text-info"></i> Navigation Séances</span>
          <span class="badge bg-info bg-opacity-25 text-info" style="font-size: 0.65rem;">Séquentielle</span>
        </div>
        <div class="d-flex flex-column gap-1 ms-1">
    `;

    itemsToDisplay.forEach((item) => {
      const isActive = (item.relType === 'current');
      const activeClass = isActive ? 'active' : '';

      html += `
        <a href="${item.file}" class="drawer-seance-link ${activeClass} text-start d-flex justify-content-between align-items-center py-2 px-3 text-decoration-none rounded-3 border mb-1">
          <span class="text-truncate d-flex align-items-center gap-2">
            ${item.relType === 'prev' ? '<i class="bi bi-arrow-left text-muted me-1"></i>' : ''}
            <i class="bi ${isActive ? 'bi-journal-bookmark-fill' : item.icon}"></i>
            <span>${this.escapeHtml(item.label)}</span>
            ${item.relType === 'next' ? '<i class="bi bi-arrow-right text-info ms-1"></i>' : ''}
          </span>
          <span class="badge ${item.badgeClass} rounded-pill px-2" style="font-size: 0.65rem;">${item.badgeText}</span>
        </a>
      `;
    });

    html += `
        </div>
      </div>
    `;

    // 2. Sections de la Séance Actuelle (Sommaire)
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
}

/**
 * Image Zoom Lightbox Modal
 * Permet d'agrandir n'importe quelle illustration au clic dans une modale Bootstrap
 */
function initImageModalZoom() {
  let modalEl = document.getElementById('imageZoomModal');
  if (!modalEl) {
    const modalHTML = `
      <div class="modal fade" id="imageZoomModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content card-custom border border-secondary border-opacity-25 shadow-lg">
            <div class="modal-header border-bottom border-secondary border-opacity-25 py-2 px-3">
              <h5 class="modal-title h6 mb-0 font-mono text-primary" id="imageZoomTitle"><i class="bi bi-search me-2"></i> Agrandissement de l'illustration</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div class="modal-body text-center p-3 bg-body-tertiary">
              <img id="imageZoomSrc" src="" alt="" class="img-fluid rounded shadow-sm" style="max-height: 85vh; width: 100%; object-fit: contain;">
              <p id="imageZoomCaption" class="small text-muted mt-2 mb-0 fst-italic"></p>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalEl = document.getElementById('imageZoomModal');
  }

  document.body.addEventListener('click', function (e) {
    const imgTarget = e.target.closest('img');
    if (imgTarget && !imgTarget.classList.contains('no-zoom') && !imgTarget.closest('#imageZoomModal')) {
      const src = imgTarget.getAttribute('src');
      if (!src) return;

      const alt = imgTarget.getAttribute('alt') || 'Illustration';
      const modalSrc = document.getElementById('imageZoomSrc');
      const modalCaption = document.getElementById('imageZoomCaption');
      const modalTitle = document.getElementById('imageZoomTitle');

      if (modalSrc) modalSrc.setAttribute('src', src);
      if (modalCaption) modalCaption.textContent = alt;
      if (modalTitle) modalTitle.innerHTML = `<i class="bi bi-zoom-in me-2"></i> ${alt}`;

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
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKaTeXAutoRender);
} else {
  initKaTeXAutoRender();
}
