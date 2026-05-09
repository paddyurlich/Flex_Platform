# Flex Platform — Product Requirements Index

Product requirements documents for each module of the Flex platform. Each file covers the problem being solved, target users, goals, features, and data requirements.

The public-facing module set is defined at [FlexPlatformSpotlight](https://paddyurlich.github.io/FlexPlatformSpotlight/index.html) and comprises nine modules, each answering a specific customer question.

---

## Module status

| # | Module | File | Customer question | Status |
|---|---|---|---|---|
| 01 | Portfolio | [01-portfolio.md](./01-portfolio.md) | *Landing view across all sites* | Implemented (prototype) |
| 01b | Portfolio — Sites | [01b-portfolio-sites.md](./01b-portfolio-sites.md) | *Card view of all sites with asset and performance summary* | Implemented (prototype) |
| 01c | Portfolio Map | [01c-portfolio-map.md](./01c-portfolio-map.md) | *Where are my assets and what is deployed across the portfolio?* | Planned |
| 02 | Energy Dashboard | [02-energy-dashboard.md](./02-energy-dashboard.md) | *How is energy flowing through my site?* | Implemented (prototype) |
| 03 | Flex:Load Monitoring | [03-load-monitoring.md](./03-load-monitoring.md) | *Is my supply healthy and balanced?* | Planned |
| 04 | Flex:Schedule | [04-schedule.md](./04-schedule.md) | Give me simple control over how the system runs. | Planned |
| 05 | Flex:Control | [05-control.md](./05-control.md) | Take direct control of your site's flexible energy devices. | In development |
| 06 | Flex:Tariff | [06-tariff.md](./06-tariff.md) | Am I on the right pricing structure? | In development |
| 07 | Flex:Assure | [07-assure.md](./07-assure.md) | Is my system delivering what was promised? | Planned |
| 08 | Flex:Simulator | [08-simulator.md](./08-simulator.md) | What would have happened if I operated differently? | In development |
| 09 | Data Export | [09-data-export.md](./09-data-export.md) | *Download my energy data* | Implemented (prototype) |
| 10 | Flex:Aggregator | [10-aggregator.md](./10-aggregator.md) | *Pool assets for grid-level value* | Concept / long-term |
| 11 | Flex:Insights | [11-insights.md](./11-insights.md) | What operational improvements should I make? | In development |
| 12 | Flex:Optimisation | [12-optimisation.md](./12-optimisation.md) | Automatically operate the system for the best outcome. | In development |
| 13 | Flex:Submetering | [13-submetering.md](./13-submetering.md) | Show me where energy is being used across the site. | Planned |
| 14 | Flex:Reporting | [14-reporting.md](./14-reporting.md) | Keep me informed with clear, ongoing performance updates. | Planned |
| 15 | Flex:Health | [15-health.md](./15-health.md) | *Are all customer assets online and healthy?* (internal ops) | Implemented (prototype) |

*Customer questions in italics are working descriptions; plain text quotes are verbatim from the Spotlight site.*

---

## Navigation across Flex

The Flex sidebar groups modules into four sections:

- **Energy** — Portfolio, Energy Dashboard
- **Operate** — Load Monitoring, Schedule, Control
- **Optimise** — Tariff, Assure, Simulator, Insights, Optimisation
- **Data** — Submetering, Reporting, Data Export
- **Operations** — Flex:Health *(internal only)*

---

## Hardware context

All real-time telemetry and remote control capability depends on the **Edge device** — the on-site intelligence layer installed at each site's switchboard. Edge collects performance data across the energy system and sends it to the Flex platform, enabling monitoring, automated control, and ongoing optimisation. Many sites can also integrate existing solar/energy hardware with Edge without replacement.

---

## Audience note

Flex serves two distinct markets. These PRDs address the **Blackcurrent SMB/SME/industrial** platform unless otherwise noted. Flex Energy (rural farmers and growers, Farmlands partnership) shares the same platform but has distinct positioning, brand language, and some feature priorities.
