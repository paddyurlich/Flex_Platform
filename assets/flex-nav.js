/* Flex Platform — shared sidebar navigation
 * Injects the full sidebar HTML into #sidebar and activates the correct
 * nav link based on data-page on <body>.
 *
 * Load order: lucide.min.js → flex-nav.js → flex-platform.js
 */
(function () {
  'use strict';

  /* ── Blackcurrent wordmark SVG ─────────────────────────────────────── */
  var LOGO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.1 35.55" role="img" aria-label="Blackcurrent">'
    + '<g>'
    + '<path d="M50.11,30.75h-5.54V.32h5.54v30.43Z"/>'
    + '<path d="M75,30.75h-5.4v-2.26c-1.48,1.84-3.74,2.88-6.1,2.79-5.61-.11-10.07-4.74-9.96-10.35,0-.15,0-.3.02-.44-.25-5.58,4.07-10.32,9.65-10.57.1,0,.2,0,.29,0,2.36-.09,4.62.95,6.1,2.79v-2.43h5.4v20.49ZM59.21,20.49c0,2.92,2.37,5.29,5.29,5.29,2.92,0,5.29-2.37,5.29-5.29,0-2.92-2.37-5.29-5.29-5.29s-5.29,2.37-5.29,5.29h0Z"/>'
    + '<path d="M97.61,13.58l-3.95,3.35c-1.09-1.31-2.7-2.07-4.41-2.08-2.88.05-5.18,2.43-5.13,5.31,0,.11,0,.22.02.33-.25,2.87,1.87,5.4,4.74,5.66.12.01.25.02.37.02,1.71-.03,3.33-.79,4.44-2.08l3.95,3.53c-1.98,2.51-5.03,3.93-8.22,3.84-5.84.2-10.73-4.38-10.93-10.22,0-.19,0-.38,0-.57,0-5.84,4.73-10.58,10.57-10.59.12,0,.24,0,.36,0,3.12-.19,6.16,1.1,8.18,3.49h0Z"/>'
    + '<path d="M106.07,17.63h1.97l5.75-7.3h6.77l-8.08,9.59,8.15,10.83h-6.77l-5.92-8.29h-1.87v8.29h-5.5V.32h5.5v17.32Z"/>'
    + '<path d="M139.5,13.58l-3.99,3.35c-1.07-1.32-2.68-2.08-4.37-2.08-2.88.05-5.18,2.43-5.13,5.31,0,.11,0,.22.02.33-.25,2.87,1.87,5.4,4.74,5.66.12.01.25.02.37.02,1.71-.03,3.33-.79,4.44-2.08l3.95,3.53c-2.02,2.44-5.06,3.8-8.22,3.67-5.84.2-10.73-4.38-10.93-10.22,0-.19,0-.38,0-.57,0-5.84,4.73-10.58,10.57-10.59.12,0,.24,0,.36,0,3.15-.15,6.19,1.22,8.18,3.67Z"/>'
    + '<path d="M161.69,22.04c.25,4.86-3.49,9.01-8.35,9.26-.4.02-.81.01-1.21-.02-4.84.49-9.17-3.03-9.67-7.88-.05-.45-.06-.91-.03-1.36v-11.78h5.54v11.28c0,3.28,1.8,4.62,4.16,4.62s4.06-1.48,4.06-4.62v-11.28h5.5v11.78Z"/>'
    + '<path d="M180.34,10.16l-.85,5.47c-1.06-.42-2.18-.63-3.32-.63-2.25-.16-4.21,1.55-4.36,3.8-.02.27-.01.55.03.82v11.14h-5.61V10.26h5.36v2.26c1.28-1.89,3.47-2.95,5.75-2.79,1.02-.04,2.03.1,3,.42Z"/>'
    + '<path d="M196.99,10.16l-.85,5.47c-1.05-.42-2.18-.63-3.31-.63-2.25-.16-4.21,1.54-4.36,3.8-.02.27-.01.55.03.82v11.14h-5.5V10.26h5.36v2.26c1.28-1.89,3.47-2.95,5.75-2.79.98-.03,1.96.11,2.89.42h0Z"/>'
    + '<path d="M218.04,20.49c.04.62.04,1.25,0,1.87h-14.63c.36,2.53,2.6,4.37,5.15,4.23,1.94.02,3.83-.66,5.33-1.9l3.21,3.53c-2.35,2.07-5.4,3.17-8.53,3.07-5.6.24-10.34-4.11-10.58-9.71-.01-.29-.01-.58,0-.87-.41-5.56,3.76-10.39,9.31-10.8.35-.03.7-.03,1.05-.02,5.45.08,9.81,4.57,9.72,10.02,0,.2-.01.4-.03.59h0ZM203.44,18.59h9.06c-.17-2.32-2.11-4.12-4.44-4.09-2.39-.1-4.43,1.71-4.62,4.09Z"/>'
    + '<path d="M240.89,17.63v13.05h-5.54v-11.18c0-2.96-1.48-4.58-3.98-4.58-2.32-.09-4.27,1.72-4.36,4.03,0,.2,0,.39.02.59v11.21h-5.54V10.26h5.4v2.43c1.35-1.97,3.64-3.1,6.03-2.96,4.2-.2,7.77,3.05,7.97,7.25.01.22.01.43,0,.65Z"/>'
    + '<path d="M243.82,10.26v-6.1h5.54v6.1h7.41v4.9h-7.41v7.51c0,2.54,1.34,3.53,3.07,3.53,1.33-.19,2.59-.72,3.67-1.52l2.01,4.3c-1.97,1.43-4.34,2.18-6.77,2.15-5.08.14-7.51-2.72-7.51-8.04v-7.93"/>'
    + '<path d="M17.91,0C8.1-.08.08,7.82,0,17.64c-.08,9.82,7.82,17.84,17.64,17.91.09,0,.18,0,.28,0V0Z"/>'
    + '<path d="M32.62,14.53c3.53,0,6-1.2,6-4.09h0c0-2.54-1.94-3.99-5.47-3.99h-8.22v8.08h7.69Z"/>'
    + '<path d="M33.11,28.95c3.95,0,6.42-1.2,6.42-4.09v-.18c0-2.54-2.08-3.99-5.82-3.99h-8.78v8.25h8.18Z"/>'
    + '</g></svg>';

  /* ── Navigation structure ──────────────────────────────────────────── */
  var NAV = [
    { group: 'Overview', items: [
      { nav: 'overview',        href: 'index.html',                icon: 'layout-dashboard',  label: 'Portfolio Overview' }
    ]},
    { group: 'Energy', items: [
      { nav: 'portfolio',        href: 'flex-portfolio.html',       icon: 'layers',            label: 'Portfolio' },
      { nav: 'portfolio-sites',  href: 'flex-portfolio-sites.html', icon: 'map-pin',           label: 'Portfolio — Sites' },
      { nav: 'energy-dashboard', href: 'flex-energy-dashboard.html',icon: 'zap',               label: 'Energy Dashboard' }
    ]},
    { group: 'Operate', items: [
      { nav: 'load-monitoring',  href: 'flex-load-monitoring.html', icon: 'activity',          label: 'Flex:Load Monitoring' },
      { nav: 'schedule',         href: 'flex-schedule.html',        icon: 'calendar',          label: 'Flex:Schedule' },
      { nav: 'control',          href: 'flex-control.html',         icon: 'sliders-horizontal',label: 'Flex:Control' }
    ]},
    { group: 'Optimise', items: [
      { nav: 'tariff',    href: 'flex-tariff.html',    icon: 'receipt',      label: 'Flex:Tariff' },
      { nav: 'assure',    href: 'flex-assure.html',    icon: 'shield-check', label: 'Flex:Assure' },
      { nav: 'simulator', href: 'flex-simulator.html',  icon: 'cpu',          label: 'Flex:Simulator' },
      { nav: 'insights',  href: 'flex-insights.html',  icon: 'bar-chart-2',  label: 'Flex:Insights' }
    ]},
    { group: 'Data', items: [
      { nav: 'data-export', href: 'flex-data-export.html', icon: 'file-down', label: 'Flex:DataExport' }
    ]}
  ];

  /* ── Build and inject sidebar HTML ────────────────────────────────── */
  var activePage = (document.body.getAttribute('data-page') || '').trim();

  var html = '<div class="logo" aria-label="Blackcurrent">'
    + LOGO
    + '<button class="sidebar-close" id="sidebarClose" aria-label="Close menu">&times;</button>'
    + '</div>'
    + '<div class="product-tag"><span>Flex</span> &nbsp;Platform</div>';

  NAV.forEach(function (group) {
    html += '<div class="nav-group">'
      + '<div class="nav-group-title">' + group.group + '</div>';
    group.items.forEach(function (item) {
      html += '<a class="nav-item' + (item.nav === activePage ? ' active' : '')
        + '" data-nav="' + item.nav + '" href="' + item.href + '">'
        + '<i data-lucide="' + item.icon + '"></i>'
        + item.label
        + '</a>';
    });
    html += '</div>';
  });

  var sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = html;

  if (window.lucide) lucide.createIcons();
})();
