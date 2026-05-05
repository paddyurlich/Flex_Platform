# PRD: Flex:Optimisation

**Status:** In development
**Module question:** "Automatically operate the system for the best outcome."

---

## Overview

Flex:Optimisation is the automated control layer that continuously adjusts battery charge/discharge behaviour, import/export decisions, and connected loads to maximise financial performance — without requiring manual input from the customer. It moves the platform from scheduled and rule-based control to continuous, outcome-driven automation.

---

## Problem statement

Flex:Schedule and Flex:Control give users the tools to manage their energy assets manually or via time-based rules. But manual management requires time and expertise, and static schedules cannot adapt to changing conditions — shifting weather, variable tariffs, business activity patterns, or grid events. The highest value from a battery and flexible loads comes from continuous, responsive optimisation rather than set-and-forget rules.

---

## Target users

- **Customers who want maximum financial return without operational involvement** — the system runs itself.
- **Blackcurrent as system operator** — configuring and monitoring the optimisation layer across the customer fleet.
- **Larger SME and industrial customers** — where the financial stakes of suboptimal battery operation are significant enough to justify a sophisticated control approach.

---

## Goals

- Maximise self-consumption of solar generation.
- Minimise grid import cost by aligning battery discharge with high-tariff periods and charging during cheap or solar-surplus periods.
- Reduce peak demand charges where applicable.
- Adapt to changing conditions automatically — weather, load patterns, tariff windows — without requiring customer action.
- Deliver measurably better financial outcomes than a static schedule would achieve.

---

## Core features

### Automated battery control
- Continuously adjusts battery charge/discharge based on: current solar generation, consumption forecast, current tariff period, battery SoC, and time-of-use window.
- Replaces or augments manual schedule blocks with dynamic decisions.
- Override capability: customer or operator can always take manual control via Flex:Control or pause optimisation.

### Energy profile learning
- Builds a model of a site's consumption patterns over time — typical daily shape, day-of-week variation, seasonal changes.
- Uses this profile to make better forward-looking decisions (e.g. hold battery charge in anticipation of evening peak demand).

### Tariff-aware optimisation
- Integrates tariff structure from Flex:Tariff to price each kWh of import and export.
- Optimisation objective is cost minimisation (or, where feed-in tariff applies, net financial outcome).

### Load shifting and flexible load management
- Where controllable loads are connected (via Flex:Control), defers or shifts them to align with solar surplus or cheap tariff periods.
- Examples: pre-heating with heat pump during solar surplus, shifting EV charging to off-peak window.

### Optimisation performance reporting
- Shows what the optimisation did and why over a period: decisions made, estimated savings vs. a static or unmanaged baseline.
- Links to Flex:Simulator for historical backtesting of the optimisation strategy.

### Constraints and guardrails
- Respects user-defined constraints: minimum SoC floor, device availability windows, operational hours.
- Does not override hardware protection limits.

---

## Data requirements

| Data | Notes |
|---|---|
| Real-time battery SoC and charge/discharge rate | From Edge device via telemetry pipeline |
| Real-time solar generation and site consumption | From Edge device |
| Tariff structure and current pricing period | From Flex:Tariff integration |
| Historical consumption profile | For load forecasting |
| Controllable device state and availability | From Flex:Control layer |
| Weather and irradiance forecast (optional) | For generation-side forecasting; improves decisions |

---

## Edge device dependency

Flex:Optimisation requires the Edge device to be installed and operational at the site. Edge is the on-site intelligence layer that provides real-time data and executes control commands locally — enabling low-latency responses that cloud-only control cannot guarantee.

---

## Constraints and dependencies

- Optimisation quality improves over time as the energy profile model matures — early weeks will be less accurate than later months.
- The automated control write path runs through Flex:Control. Flex:Control must be operational and the devices enrolled before Flex:Optimisation can manage them.
- Customers must be able to clearly understand what the optimisation is doing and why — a black-box system that customers cannot interpret will erode trust.
- Fallback behaviour: if the optimisation service is unavailable (network outage, service issue), the system should fall back to the last active manual schedule rather than going uncontrolled.

---

## Out of scope (this version)

- Spot market price-responsive optimisation (requires real-time wholesale price feed and different risk model).
- Grid dispatch coordination (that is Flex:Aggregator).
- Multi-site portfolio optimisation with shared resources.
