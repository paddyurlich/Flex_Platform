/* Flex Platform — shared sidebar navigation
 * Injects the full sidebar HTML into #sidebar and activates the correct
 * nav link based on data-page on <body>.
 *
 * Load order: lucide.min.js → flex-nav.js → flex-platform.js
 */
(function () {
  'use strict';

  /* ── Blackcurrent wordmark SVG ─────────────────────────────────────── */
  var LOGO_BC = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.1 35.55" role="img" aria-label="Blackcurrent">'
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

  /* ── Ember Labs wordmark SVG (Logo 1 Name.svg — icon grid + outlined text) */
  /* Near-black icon cells use #1a1a1a so grid reads on dark sidebar.        */
  /* eml-text class on the <g> lets CSS set wordmark fill (light on dark).   */
  var LOGO_EMBER = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7190.81 1224.67" role="img" aria-label="ember labs">'
    + '<rect fill="#2f6bff" x="865.15" width="359.51" height="359.51"/>'
    + '<rect fill="#1a1a1a" x="432.38" width="359.51" height="359.51"/>'
    + '<rect fill="#1a1a1a" x=".39" width="359.51" height="359.51"/>'
    + '<rect fill="#2f6bff" x="864.76" y="432.58" width="359.51" height="359.51"/>'
    + '<rect fill="#f2c300" x="431.98" y="432.58" width="359.51" height="359.51"/>'
    + '<rect fill="#1a1a1a" y="432.58" width="359.51" height="359.51"/>'
    + '<rect fill="#2f6bff" x="864.76" y="865.16" width="359.51" height="359.51"/>'
    + '<rect fill="#1a1a1a" x="431.98" y="865.16" width="359.51" height="359.51"/>'
    + '<rect fill="#1a1a1a" y="865.16" width="359.51" height="359.51"/>'
    + '<g class="eml-text">'
    + '<path d="M1853.9,693.48l96.11,51.06c-32.04,82.09-131.15,159.18-272.31,159.18-175.2,0-303.34-111.13-303.34-273.31s124.14-273.31,303.34-273.31,282.32,115.13,282.32,266.3v42.05h-471.53c16.02,84.09,91.1,136.15,189.21,136.15,87.1,0,151.17-44.05,176.2-108.12ZM1493.49,575.34h350.39c-8.01-55.06-73.08-118.13-172.19-118.13-83.09,0-155.17,41.05-178.2,118.13Z"/>'
    + '<path d="M2043.1,367.11h120.14v67.08c38.04-43.05,94.11-77.09,184.21-77.09s149.17,37.04,184.21,98.11c50.06-59.07,120.14-98.11,213.24-98.11,163.18,0,241.27,102.12,241.27,254.29v281.32h-120.13v-266.3c0-93.1-41.05-159.18-139.16-159.18-103.12,0-152.17,64.07-152.17,161.18v264.3h-120.14v-266.3c0-93.1-41.05-159.18-139.16-159.18-104.12,0-152.17,64.07-152.17,161.18v264.3h-120.14V367.11Z"/>'
    + '<path d="M3218.41,892.7h-120.14V173.89h120.14v260.29c38.04-41.05,108.12-77.09,204.23-77.09,181.2,0,288.33,124.14,288.33,273.31s-107.12,273.31-288.33,273.31c-96.11,0-166.19-36.04-204.23-77.09v66.07ZM3212.4,634.41c0,96.11,84.09,169.19,193.22,169.19,103.12,0,191.22-62.07,191.22-173.2s-88.1-173.2-191.22-173.2c-109.12,0-193.22,73.08-193.22,169.19v8.01Z"/>'
    + '<path d="M4247.56,693.48l96.11,51.06c-32.04,82.09-131.15,159.18-272.31,159.18-175.2,0-303.34-111.13-303.34-273.31s124.14-273.31,303.34-273.31,282.32,115.13,282.32,266.3v42.05h-471.53c16.02,84.09,91.1,136.15,189.21,136.15,87.1,0,151.17-44.05,176.2-108.12ZM3887.15,575.34h350.39c-8.01-55.06-73.08-118.13-172.2-118.13-83.09,0-155.17,41.05-178.2,118.13Z"/>'
    + '<path d="M4817.18,492.25c-24.03-6.01-35.04-9.01-62.07-9.01-120.13,0-198.22,51.06-198.22,176.2v233.26h-120.14V367.11h120.14v95.11c45.05-71.08,116.13-98.11,201.23-98.11,24.03,0,44.05,4,59.07,8.01v120.14Z"/>'
    + '<path d="M5243.65,892.7h-90.1V173.89h90.1v718.81Z"/>'
    + '<path d="M5335.74,746.53c0-97.11,84.09-147.17,207.23-161.18l231.26-26.03v-13.01c0-66.07-54.06-110.12-156.18-110.12-89.1,0-165.19,42.05-187.21,102.11l-75.09-34.04c33.04-88.1,142.16-145.16,264.3-145.16,151.17,0,241.27,67.08,241.27,188.21v236.27c0,39.04,26.03,50.06,84.1,37.04v72.08c-100.11,19.02-154.17-18.02-163.18-79.09l-1-5.01c-47.05,60.07-136.15,95.11-235.27,95.11-117.13,0-210.24-54.06-210.24-157.18ZM5774.23,631.41l-218.25,25.03c-78.09,9.01-132.15,29.03-132.15,89.1,0,54.06,51.06,84.09,129.14,84.09,103.12,0,221.25-48.05,221.25-146.17v-52.06Z"/>'
    + '<path d="M6103.59,892.7h-90.1V173.89h90.1v287.32c39.04-56.06,116.13-102.11,220.25-102.11,176.2,0,286.32,120.14,286.32,272.31s-110.12,272.31-286.32,272.31c-104.12,0-181.21-46.05-220.25-103.12v92.1ZM6099.59,634.41c0,119.13,103.12,192.22,213.24,192.22,117.13,0,211.24-74.08,211.24-195.22s-94.11-196.22-211.24-196.22c-110.12,0-213.24,74.08-213.24,192.22v7.01Z"/>'
    + '<path d="M6712.27,714.5c47.05,78.09,127.14,113.13,228.26,113.13,91.1,0,161.18-26.03,161.18-85.1,0-62.07-62.07-64.07-190.21-78.09-130.15-15.02-233.26-36.04-233.26-143.16,0-96.11,97.11-162.18,237.27-162.18,126.14,0,220.25,50.06,262.29,117.13l-61.07,53.06c-39.04-62.07-112.13-95.11-204.23-95.11s-147.17,31.04-147.17,79.09c0,52.06,53.06,58.07,165.19,71.08,140.16,16.02,260.29,28.03,260.29,151.17,0,110.12-119.13,168.19-249.28,168.19s-244.28-46.05-295.33-134.15l66.08-55.06Z"/>'
    + '</g>'
    + '</svg>';

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
      { nav: 'simulator', href: 'flex-simulator.html', icon: 'cpu',          label: 'Flex:Simulator' },
      { nav: 'insights',  href: 'flex-insights.html',  icon: 'bar-chart-2',  label: 'Flex:Insights' }
    ]},
    { group: 'Data', items: [
      { nav: 'data-export', href: 'flex-data-export.html', icon: 'file-down', label: 'Flex:DataExport' }
    ]}
  ];

  /* ── Build and inject sidebar HTML ────────────────────────────────── */
  var activePage = (document.body.getAttribute('data-page') || '').trim();
  var currentBrand = document.documentElement.getAttribute('data-brand') || 'blackcurrent';

  var html = ''
    /* Blackcurrent logo (default) */
    + '<div class="logo logo-bc" aria-label="Blackcurrent">'
    + LOGO_BC
    + '<button class="sidebar-close" id="sidebarClose" aria-label="Close menu">&times;</button>'
    + '</div>'
    /* Ember Labs logo (Logo 1 Name.svg — icon grid + wordmark) */
    + '<div class="logo logo-ember" aria-label="ember labs">'
    + LOGO_EMBER
    + '<button class="sidebar-close" id="sidebarCloseEmber" aria-label="Close menu">&times;</button>'
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

  /* Brand switcher at bottom of nav */
  var bcActive   = currentBrand !== 'ember' ? ' active active-bc'    : ' active-bc';
  var emlActive  = currentBrand === 'ember' ? ' active active-ember'  : ' active-ember';
  html += '<div class="brand-switcher">'
    + '<button class="brand-btn' + bcActive  + '" id="brandBtnBc">Blackcurrent</button>'
    + '<button class="brand-btn' + emlActive + '" id="brandBtnEmber">Ember</button>'
    + '</div>';

  var sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = html;

  if (window.lucide) lucide.createIcons();

  /* ── Brand switcher event handlers ────────────────────────────────── */
  function setBrand(brand) {
    document.documentElement.setAttribute('data-brand', brand);
    try { localStorage.setItem('flex-brand', brand); } catch (e) {}

    var btnBc    = document.getElementById('brandBtnBc');
    var btnEmber = document.getElementById('brandBtnEmber');
    if (btnBc && btnEmber) {
      btnBc.className    = 'brand-btn' + (brand !== 'ember' ? ' active active-bc'   : ' active-bc');
      btnEmber.className = 'brand-btn' + (brand === 'ember' ? ' active active-ember' : ' active-ember');
    }
  }

  var btnBc    = document.getElementById('brandBtnBc');
  var btnEmber = document.getElementById('brandBtnEmber');
  if (btnBc)    btnBc.addEventListener('click',    function () { setBrand('blackcurrent'); });
  if (btnEmber) btnEmber.addEventListener('click', function () { setBrand('ember'); });

  /* Wire up the Ember close button to the same handler as the BC one */
  var closeEmber = document.getElementById('sidebarCloseEmber');
  var closeBC    = document.getElementById('sidebarClose');
  if (closeEmber && closeBC) {
    closeEmber.addEventListener('click', function () { closeBC.click(); });
  }
})();
