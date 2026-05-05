# PRD: Portfolio

**Status:** Implemented (prototype) — `flex-portfolio.html`

---

## Overview

Portfolio is the primary landing experience for users managing more than one site. It presents a single view across all sites, surfaces operational status at a glance, and acts as the navigation hub into site-specific detail.

---

## Problem statement

Customers and operators managing multiple distributed energy sites have no single place to assess how their portfolio is performing. Without this, they must check each site individually, making it difficult to prioritise attention, spot issues early, or understand aggregate performance.

---

## Target users

- **Multi-site customers** — business owners or energy managers with solar and/or battery systems across several locations.
- **Blackcurrent operators** — internal staff monitoring customer sites, triaging alerts, and identifying sites that need attention.
- **Flex Energy customers** — farmers and growers managing energy assets across multiple paddocks or sheds (rural variant).

---

## Goals

- Give users an immediate read on portfolio health — how many sites are operating normally vs. flagged.
- Enable fast navigation to a specific site for deeper investigation.
- Surface enough performance data (generation, consumption, energy totals) that users can have informed conversations without leaving the portfolio view.

---

## Core features

### Site list
- Table or card view of all sites the user has access to.
- Each row shows: site name, customer, address, telemetry status (ok / warn / fault / pending), last reading timestamp, 24-hour kWh, 30-day kWh, asset summary (PV size, battery capacity).
- Status chip colour-coded: green (ok), amber (warn), red (fault), grey (pending).

### Filtering and search
- Filter by customer (for operator views managing multiple customers).
- Filter by telemetry status.
- Text search by site name or address.

### Site detail modal
- Clicking a site opens a modal with expanded detail: full asset specifications, ICP number, GXP, sector, active flex flag, location.
- Modal provides a pathway to site-specific views (Energy Dashboard, etc.).

### Portfolio summary
- Aggregate counts at the top: total sites, sites by status, total fleet capacity (kWp PV, kWh battery).

---

## Data requirements

From `window.FlexData`:

| Field | Purpose |
|---|---|
| `id`, `name`, `address` | Site identification and display |
| `customer_name`, `customer_id` | Customer grouping and filter |
| `status` | Telemetry health chip |
| `last_reading` | Recency of data — shows staleness |
| `kwh_24h`, `kwh_30d` | Rolling energy totals |
| `pv_size_kwp`, `battery_capacity_kwh`, `inverter_size_kw` | Asset summary |
| `icp`, `gxp`, `sector`, `has_battery`, `active_flex` | Detail modal fields |

---

## Constraints and dependencies

- Depends on live telemetry pipeline to keep `status` and `last_reading` current. In the prototype, these are synthetic.
- Portfolio is the entry point for all other modules — site-level navigation flows out from here.
- Operator and customer views may require role-based filtering so a customer only sees their own sites.

---

## Out of scope (this version)

- Map view of site locations.
- Portfolio-level aggregated kWh charts.
- Alerts or notification feed.
