# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Reference documentation

Shared business and brand context lives outside this repo. Read these files for background before making design or copy decisions:

| File | Purpose |
|---|---|
| `/Users/blackcurrent_paddy/Library/CloudStorage/OneDrive-blackcurrent.io/blackcurrent.io - Flex Product Playbook/_brand/blackcurrent_master_prompt.md` | Master prompt — primary source of truth for Blackcurrent's business context, tone, and product strategy |
| `/Users/blackcurrent_paddy/Library/CloudStorage/OneDrive-blackcurrent.io/blackcurrent.io - Flex Product Playbook/_brand/blackcurrent_prompt_document.md` | Extended business context and background |
| `/Users/blackcurrent_paddy/Library/CloudStorage/OneDrive-blackcurrent.io/blackcurrent.io - Flex Product Playbook/_brand/blackcurrent_brand_guidelines.md` | Blackcurrent brand: colours, typography, tone of voice |
| `/Users/blackcurrent_paddy/Library/CloudStorage/OneDrive-blackcurrent.io/blackcurrent.io - Flex Product Playbook/_brand/flex_brand_guidelines.md` | Flex-specific brand guidelines |
| `/Users/blackcurrent_paddy/Library/CloudStorage/OneDrive-blackcurrent.io/blackcurrent.io - Flex Product Playbook/_brand/HTML-email-brand-spec.md` | Brand spec for HTML email (useful for consistent component styling) |

## Product requirements

Per-module PRDs live in `docs/prd/`. Start with `docs/prd/00-index.md` for the full module list and status. Each PRD covers problem statement, target users, goals, features, and data requirements.

## Running the project

No build step. Open any `.html` file directly in a browser, or serve the directory with any static server:

```bash
python3 -m http.server 8080
```

There are no tests, no linter, and no package manager.

## Architecture

Static HTML prototype for the **Blackcurrent Flex Platform** — an energy portfolio management dashboard for New Zealand electricity sites. All pages share a single CSS file and a single JS utilities file loaded via `<script>` tags; there is no module system.

### Key files

| File | Purpose |
|---|---|
| `assets/flex-platform.css` | Shared stylesheet — CSS variables define the colour system; `data-theme="dark"` on `<html>` switches themes |
| `assets/flex-platform.js` | `window.FlexUtil` namespace: date/number formatters (NZ timezone), `FlexModal` class, theme toggle, sidebar init |
| `data/sites_and_customers.js` | All prototype data, exposed as `window.FlexData` — loaded before page scripts |
| `_template.html` | Boilerplate for new feature pages — copy this, set `data-page` on `<body>` to activate the correct nav link |
| `_components.html` | Living reference for shared UI patterns (chips, cards, tables, modals) |

### Implemented pages

- `flex-portfolio.html` — Site listing with telemetry status, customer filter, and modal drill-down
- `flex-energy-dashboard.html` — Power-flow charts (Chart.js 4.4.0 via CDN), half-hourly synthetic data
- `flex-data-export.html` — CSV/XLSX export UI

### Data

`window.FlexData` contains customers (with `site_ids[]`) and sites. Site objects carry: `id`, `name`, `customer_id/name`, `sector`, `icp`, `gxp`, `address`, `status` (ok/warn/fault/pending), `last_reading`, `kwh_24h`, `kwh_30d`, `pv_size_kwp`, `battery_capacity_kwh`, `inverter_size_kw`, `has_battery`, `latitude`, `longitude`, `active_flex`. Fields `icp`, `status`, and `active_flex` are synthetic; all other fields come from real telemetry.

All times are **Pacific/Auckland** (NZST UTC+12 / NZDT UTC+13, DST late-Sep to early-Apr). Use `FlexUtil` formatters for any date/time display.

### Adding a new page

1. Copy `_template.html` → `flex-<feature>.html`
2. Set `data-page="<feature>"` on `<body>` to activate the sidebar nav highlight
3. Load `data/sites_and_customers.js` then `assets/flex-platform.js` before your page script
4. Add the nav `<li>` entry to every other page's sidebar

### Colour system

CSS variables on `:root` / `[data-theme="dark"]`:
- `--rust` — primary brand accent
- `--charcoal`, `--egg` — dark/light backgrounds
- `--sapphire` — secondary accent
- `--status-ok/warn/fault/pending` — telemetry status colours

### Sidebar navigation (planned feature pages)

- **Energy**: Portfolio, Energy Dashboard *(implemented)*
- **Operate**: Load Monitoring, Schedule, Control *(placeholders)*
- **Optimise**: Tariff, Assure, Simulator *(placeholders)*
- **Data**: DataExport *(implemented)*
