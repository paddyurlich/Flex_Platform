# PRD: Energy Dashboard

**Status:** Implemented (prototype) — `flex-energy-dashboard.html`

---

## Overview

Energy Dashboard is the core site-level energy visibility experience. It translates raw telemetry into readable charts of how energy moves through a site — generation, consumption, import, export and battery behaviour — across configurable time windows.

---

## Problem statement

Customers with solar and battery systems often have no usable visibility into how their systems are actually performing day-to-day. Inverter apps exist but are narrow, hard to compare across sites, and disconnected from consumption data. Without a unified view, customers cannot tell whether their system is working as expected, when they are drawing from the grid, or how their battery is behaving.

---

## Target users

- **Site owners and energy managers** — people who want to understand their system's daily and historical behaviour.
- **Blackcurrent analysts** — staff investigating performance questions or preparing customer reports.
- **Flex Energy customers (rural)** — farmers checking generation and farm energy use across a time period.

---

## Goals

- Move customers from kWh-centric confusion to value-centric understanding of their system.
- Let users answer the question "is my system working as I'd expect?" without needing to call Blackcurrent.
- Provide a foundation for higher-value modules (Assure, Tariff, Simulator) by making the underlying energy flows legible.

---

## Core features

### Power flow chart
- Stacked area or line chart showing half-hourly intervals across a selected time range.
- Series: solar generation, site consumption, grid import, grid export, battery charge, battery discharge.
- Chart.js 4.4.0 used in prototype; production should support zooming and pan.

### Time range selection
- Presets: last 24 hours, today, yesterday, last 7 days, last 30 days.
- Custom date range picker.
- Default: last 24 hours.

### Energy summary panel
- Totals for the selected period: generated (kWh), consumed (kWh), imported (kWh), exported (kWh), self-consumed (%), battery cycles.
- Self-sufficiency ratio (consumption met by solar + battery vs. total consumption).
- Financial summary: estimated cost savings for the period and cumulative since commissioning, based on configured tariff rates.

### Site selector
- If the user has access to multiple sites, a dropdown or switcher to move between them without leaving the dashboard.

### Battery state of charge
- Secondary chart or overlay showing battery SoC (%) across the same time window, aligned to the power flow x-axis.

---

## Data requirements

| Data | Notes |
|---|---|
| Half-hourly interval data per site | Generation (kW), consumption (kW), import (kW), export (kW), battery charge/discharge (kW), battery SoC (%) |
| Site metadata | `pv_size_kwp`, `battery_capacity_kwh`, `inverter_size_kw` for context |
| Timestamps | Pacific/Auckland timezone — all display and grouping in local NZ time |

In the prototype, half-hourly data is generated synthetically using a seeded PRNG via `FlexUtil` to produce plausible solar curves and consumption patterns. Production data is collected by the **Edge device** — the on-site intelligence layer installed at the switchboard — which sends real-time telemetry to the Flex platform via AWS.

---

## Constraints and dependencies

- Depends on reliable half-hourly telemetry data. Gaps in data must be handled gracefully (show gap in chart, not a zero or interpolated value).
- All timestamps must be rendered in Pacific/Auckland time with correct DST handling (NZST UTC+12 / NZDT UTC+13, DST late-Sep to early-Apr).
- Performance: loading 30 days of half-hourly data (1,440 intervals per series × 6 series) must remain responsive on modest hardware.

---

## Out of scope (this version)

- Real-time (sub-minute) data streaming.
- Weather overlay or irradiance data.
- Comparison across multiple sites on the same chart.
- Carbon / emissions calculations.
