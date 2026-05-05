# PRD: Flex:Simulator

**Status:** Planned — placeholder in sidebar nav

---

## Overview

Flex:Simulator uses a site's historical energy data to test alternative operating strategies and estimate their financial impact. It answers "what would have happened if we had done X differently?" — without the risk of applying changes to a live system.

---

## Problem statement

Battery scheduling and load control decisions have real financial consequences, but customers and operators have no way to evaluate them objectively before making changes. Decisions are often made on intuition or simple rules of thumb. Without a backtesting tool, it is impossible to know whether a proposed schedule change, tariff switch, or control strategy would actually improve outcomes.

---

## Target users

- **Blackcurrent analysts and operators** — evaluating proposed strategy changes before applying them to customer sites.
- **Technically engaged energy managers** — customers who want to model scenarios themselves.
- **Blackcurrent commercial team** — modelling the value of a Flex engagement for a prospective customer using their own historical data.

---

## Goals

- Quantify the financial difference between the current operating strategy and an alternative.
- Allow safe experimentation with battery scheduling, tariff alignment, and load shifting before live deployment.
- Support Flex:Schedule by giving users confidence that a proposed schedule is worth implementing.
- Support Flex:Tariff by enabling backtesting of tariff switch scenarios using real historical data.

---

## Core features

### Strategy builder
- Define an alternative operating strategy by configuring:
  - Battery schedule: charge / discharge / hold windows by time of day and day type.
  - Tariff: apply an alternative tariff structure for cost comparison.
  - Load shifting: define a load (kW, duration) and shift it from one time window to another.
- Strategies can be saved and named for later comparison.

### Backtesting engine
- Apply the defined strategy to a selected historical period (minimum 1 month; typically 3–12 months).
- Replay actual generation and consumption data with the alternative strategy applied.
- Compute: grid import (kWh), grid export (kWh), electricity cost, self-sufficiency ratio — for both actual and simulated scenarios.

### Results comparison
- Side-by-side: actual vs. simulated outcomes for the selected period.
- Key metrics: cost difference ($), self-consumption change (%), import/export change (kWh).
- Monthly breakdown chart showing the delta over the test period.
- Annualised projection: "If this strategy had been in place for 12 months, estimated saving: $X."

### Sensitivity view
- Show how results change under different assumptions: higher/lower electricity prices, different battery SoC constraints, varying daily patterns.
- Helps users understand how robust a strategy is to real-world variability.

### Export and share
- Export simulation results as a PDF or CSV summary for use in customer presentations or internal review.

---

## Data requirements

| Data | Notes |
|---|---|
| Half-hourly generation and consumption data | Minimum 3 months of clean historical data for reliable results |
| Battery specifications | Capacity (kWh), max charge/discharge rate (kW), round-trip efficiency, min/max SoC constraints |
| Current tariff structure | Baseline cost model for the "actual" scenario |
| Alternative tariff structures | For tariff-switch simulations |
| Battery degradation model (optional) | Cycle cost per kWh to incorporate battery wear into financial comparison |

---

## Constraints and dependencies

- Results are model outputs, not financial guarantees — the UI must make this clear.
- Simulation accuracy is limited by data quality: gaps in historical data, inaccurate meter readings, or missing sub-meter data will reduce reliability.
- Battery model must respect hardware constraints — the simulator should not model charge/discharge rates beyond what the physical system supports.
- Computationally intensive scenarios (12 months of half-hourly data, multiple strategies in parallel) need to be handled server-side or with a job queue — not browser-side calculation.
- Flex:Assure and Flex:Simulator are complementary: Assure explains what happened; Simulator models what could happen. The two modules should share a consistent data model and be navigable from each other.

---

## Out of scope (this version)

- Automated optimisation (the system selecting the optimal strategy — that requires forecasting and optimisation logic beyond backtesting).
- Forward-looking scenario modelling (predicting future outcomes based on weather or price forecasts).
- Multi-site portfolio simulation.
