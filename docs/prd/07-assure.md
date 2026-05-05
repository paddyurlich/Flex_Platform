# PRD: Flex:Assure

**Status:** Planned — placeholder in sidebar nav

---

## Overview

Flex:Assure compares a site's actual solar generation against what was forecast at the time of system design. It helps customers and Blackcurrent understand whether the system is delivering as promised, explains variances, and validates the original business case.

---

## Problem statement

When a solar system is sold, the customer receives a design document with a forecast: expected annual generation (kWh), estimated savings, and projected payback period. After installation, there is typically no ongoing mechanism to verify whether those forecasts are being met. If a system underperforms — due to shading, panel degradation, inverter faults, or incorrect design assumptions — nobody notices until the electricity bill fails to improve. This erodes trust and leaves value unclaimed.

---

## Target users

- **Customers (post-install)** — wanting confidence that their system is delivering what they were sold.
- **Blackcurrent account managers** — using assurance data to proactively maintain customer relationships and identify systems that need attention.
- **Blackcurrent technical team** — investigating underperformance, preparing performance reports, or supporting warranty/guarantee conversations.

---

## Goals

- Give customers a clear, ongoing answer to the question: "Is my solar system delivering as expected?"
- Enable Blackcurrent to identify underperforming systems proactively, before customers complain.
- Validate or update the original business case with actual performance data.
- Support any performance guarantee or savings assurance commitments Blackcurrent makes to customers.

---

## Core features

### Actual vs. expected forecast
- Side-by-side view: forecast annual generation (kWh) from the original design vs. actual generation to date.
- Monthly breakdown: expected vs. actual per month for the current and previous years.
- Cumulative performance chart: running total of expected vs. actual generation since commissioning.

### Fit indicators
- Visual indicators showing how closely actual performance aligns with the design forecast across key dimensions: generation, self-consumption, savings.
- Clear "on track / below / above" status per indicator, not just raw numbers.
- Designed to give a fast, non-technical read on overall system health before diving into details.

### Performance deviation
- Quantified deviation from forecast: percentage and absolute (kWh) for any selected period.
- Standard solar performance ratio (PR): actual generation / expected generation (irradiance-adjusted).
- PR trend over time — flags degradation or emerging issues.
- Industry benchmark context: what is a typical PR for this system type and location.

### Weather context
- When actual diverges from forecast, surface the most likely explanations:
  - **Weather** — compare modelled irradiance (from a source like NIWA or SolarEdge) against the design irradiance assumption.
  - **System conditions** — flag periods where generation was clipped (inverter limiting), zero output (fault/offline), or significantly reduced.
  - **Shading events** — patterns consistent with seasonal shading (winter months, time-of-day consistent drops).
- Plain-language explanation alongside the data — e.g. "Solar generation is down 18% on forecast. Flex:Assure attributes the shortfall to recorded cloud cover for the period — no fault found."

### Savings and payback tracker
- Translate generation performance into estimated savings to date vs. projected savings from the design document.
- Updated payback projection based on actual performance.
- Simple dashboard tile: "Your system has saved approximately $X since installation."

### System health flags
- Automated flags when PR drops below threshold for a sustained period.
- Fault or offline detection: days where generation was zero or near-zero that do not correspond to weather.

---

## Data requirements

| Data | Notes |
|---|---|
| Original design snapshot | Forecast annual generation (kWh), month-by-month expected profile, system spec (kWp, panel tilt, azimuth, location) — stored at commissioning |
| Actual half-hourly generation data | From telemetry pipeline, since commissioning date |
| Irradiance reference data | Historical global horizontal irradiance (GHI) for site location — ideally from NIWA or a comparable source |
| Electricity tariff (for savings calculation) | Current retail rate or blended avoided-cost rate |
| Commissioning date | Start of the measurement period |

---

## Constraints and dependencies

- The design snapshot must be stored at commissioning — this is a data capture requirement at the point of project handover.
- Irradiance data availability: NIWA data may have latency or require licensing; a fallback may be needed using satellite-derived irradiance.
- Savings calculations are estimates — the UI must clearly distinguish "estimated savings" from "guaranteed savings" unless a formal guarantee product is in place.
- Interacts with Flex:Simulator: Assure surfaces the "what happened" story; Simulator explores "what could happen differently."

---

## Out of scope (this version)

- Degradation warranty claim processing.
- Automated dispatch of a technician based on performance flags.
- Multi-site fleet performance benchmarking (useful later for Blackcurrent internally, not an initial customer-facing feature).
