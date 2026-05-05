# PRD: Portfolio — Sites

**Status:** Implemented (prototype) — `flex-portfolio-sites.html`

---

## Overview

Portfolio — Sites is a card-based view of all sites in the portfolio. Where the Portfolio list view is optimised for scanning and sorting across many sites, the Sites card view is optimised for at-a-glance comprehension — each card surfaces asset configuration, live performance metrics, and operational status in a single visual unit.

---

## Problem statement

The tabular Portfolio view is efficient for operators who know what they're looking for, but it requires reading across rows and mentally assembling a picture of each site. For customers or operators who want to understand the composition and health of each site quickly — especially across a mixed portfolio of PV-only, PV+battery, and load-only sites — a card format is more legible and scannable.

---

## Target users

- **Multi-site customers** — want a quick scan of how each of their sites is configured and performing today.
- **Blackcurrent operators** — need a spatial overview when triaging a fleet, especially for sites with different asset configurations.

---

## Goals

- Present each site as a self-contained unit: what's installed, how it's performing, and whether it's healthy.
- Make the asset configuration (PV, battery, fuse size) immediately visible without opening a detail view.
- Surface live status and recency so users can immediately spot stale or faulted sites.
- Support filtering by status and customer to narrow to relevant sites.

---

## Core features

### Site cards
Each card displays:
- **Site name** + site ID badge
- **Customer name** (sub-label)
- **Address**
- **Status chip** — ok / warn / fault / pending, colour-coded
- **Active Flex badge** — shown if the site has an active Flex module (Tariff, Schedule, etc.)
- **Asset stats row** — PV (kWp), Battery (kWh + SoC if available), Self-Consumption (%), 24h Usage (kWh)
  - Stats greyed out for pending sites with no telemetry
- **Footer** — last reading recency ("Live · updated X ago") and sector tag

### Filtering
- Filter by customer (dropdown)
- Filter by status (ok / warn / fault / pending)
- Text search by site name or address

### Summary counts
- Aggregate strip above cards: total sites, active (ok), warnings, faults, pending

### Navigation
- Each card has a chevron/arrow that links through to the Energy Dashboard for that site (future: per-site routing)

---

## Data requirements

From `window.FlexData.sites`:

| Field | Purpose |
|---|---|
| `id`, `name`, `address` | Card header and identification |
| `customer_name` | Customer sub-label |
| `status` | Colour-coded status chip |
| `last_reading` | Footer recency |
| `kwh_24h` | Usage stat |
| `pv_size_kwp` | PV stat (hidden if 0) |
| `battery_capacity_kwh`, `has_battery` | Battery stat (hidden if no battery) |
| `inverter_size_kw` | Shown in tooltip / detail if needed |
| `active_flex` | Active Flex badge |
| `sector` | Footer sector tag |
| `telemetry.power_hourly` | Self-consumption calculation: `(generation - export) / generation` averaged over last 24h |

### Self-consumption calculation
Derived from `telemetry.power_hourly`: sum `generation_kW` and `export_kW` over the last 24 hours. Self-consumption % = `(total_generation - total_export) / total_generation × 100`. Falls back to `—` if no generation data exists.

### SoC (State of Charge)
Not available in current telemetry. Synthesised for prototype using `(site.id * 37 + 13) % 81 + 15` to produce a plausible 15–95% range per site.

---

## Constraints and dependencies

- Cards with `status = "pending"` have no telemetry — all metric values should show `—` and the card should be visually de-emphasised.
- Self-consumption is only meaningful for sites with `pv_size_kwp > 0`.
- Battery SoC requires a real-time telemetry field not yet present in the data model — noted as future requirement.

---

## Out of scope (this version)

- Map view of site locations.
- Inline spark-line chart per card.
- Click-through to per-site Energy Dashboard (nav target is placeholder).
- Alarm / notification count per site.
