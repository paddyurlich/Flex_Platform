/* Flex Platform — shared JS
 * Theme toggle, mobile sidebar, active nav, util namespace.
 *
 * NOTE: the *initial* theme must be applied before the page paints to avoid
 * a flash. That logic lives inline in <head> on every page (see _template.html).
 * This file handles everything that runs after DOMContentLoaded.
 */
(function () {
  'use strict';

  // ---------- Theme toggle ----------
  function initThemeToggle() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('flex-theme', next); } catch (e) {}
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // ---------- Mobile sidebar drawer ----------
  function initSidebar() {
    var menuBtn = document.getElementById('menuBtn');
    var closeBtn = document.getElementById('sidebarClose');
    var backdrop = document.getElementById('sidebarBackdrop');
    var sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    function open() {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');
      document.body.style.overflow = '';
    }

    if (menuBtn) menuBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);

    // Close drawer when a nav item is tapped on mobile
    sidebar.querySelectorAll('.nav-item').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 820px)').matches) close();
      });
    });

    // Reset state on resize back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) close();
    });
  }

  // ---------- Active nav highlighting ----------
  function initActiveNav() {
    var page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll('.nav-item[data-nav]').forEach(function (a) {
      if (a.dataset.nav === page) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  // ---------- Utility namespace ----------
  var U = {
    pad: function (n) { return String(n).padStart(2, '0'); },
    ymd: function (d) { return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate()); },
    ymdhm: function (d) {
      return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate())
        + ' ' + U.pad(d.getHours()) + ':' + U.pad(d.getMinutes());
    },
    dmy: function (d) { return U.pad(d.getDate()) + '/' + U.pad(d.getMonth() + 1) + '/' + d.getFullYear(); },
    nzOffset: function (d) {
      // NZ is UTC+12 (NZST) or UTC+13 (NZDT). Rough heuristic: DST runs late-Sep to early-Apr.
      var m = d.getMonth();
      var dst = (m > 8) || (m < 3);
      return dst ? '+13:00' : '+12:00';
    },
    fmtNum: function (n) { return n.toLocaleString('en-NZ'); },
    round3: function (n) { return Math.round(n * 1000) / 1000; },
    fmtKwh: function (n) { return U.round3(n).toFixed(3); },
    escapeHtml: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
      });
    },
    // Tiny seeded PRNG for deterministic synthetic data
    seedRng: function (seed) {
      var s = seed >>> 0;
      return function () {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 0x100000000;
      };
    }
  };

  // ---------- FlexModal ----------
  // Reusable detail modal. DOM is injected lazily on first open.
  // Usage: FlexModal.open({ title: 'Customer detail', html: '<p>…</p>', eyebrow: 'Customer' })
  var modalEl = null, modalBody = null, modalTitle = null, modalEyebrow = null;
  function ensureModal() {
    if (modalEl) return;
    modalEl = document.createElement('div');
    modalEl.className = 'flex-modal';
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML =
        '<div class="flex-modal-backdrop" data-flex-modal-close></div>'
      + '<div class="flex-modal-card" role="dialog" aria-modal="true" aria-labelledby="flexModalTitle">'
      +   '<header class="flex-modal-head">'
      +     '<div>'
      +       '<span class="modal-eyebrow" id="flexModalEyebrow"></span>'
      +       '<h2 id="flexModalTitle"></h2>'
      +     '</div>'
      +     '<button class="flex-modal-close" data-flex-modal-close aria-label="Close">&times;</button>'
      +   '</header>'
      +   '<div class="flex-modal-body" id="flexModalBody"></div>'
      + '</div>';
    document.body.appendChild(modalEl);
    modalBody = modalEl.querySelector('#flexModalBody');
    modalTitle = modalEl.querySelector('#flexModalTitle');
    modalEyebrow = modalEl.querySelector('#flexModalEyebrow');

    modalEl.addEventListener('click', function (e) {
      if (e.target.matches('[data-flex-modal-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal();
    });
  }
  function openModal(opts) {
    ensureModal();
    modalEyebrow.textContent = opts.eyebrow || '';
    modalEyebrow.style.display = opts.eyebrow ? 'block' : 'none';
    modalTitle.textContent = opts.title || '';
    modalBody.innerHTML = opts.html || '';
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ---------- Bootstrap ----------
  function init() {
    initThemeToggle();
    initSidebar();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.FlexUtil = U;
  window.FlexModal = { open: openModal, close: closeModal };
})();
