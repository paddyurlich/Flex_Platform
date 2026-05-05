# PRD: Flex:Submetering

**Status:** Planned
**Module question:** "Show me where energy is being used across the site."

---

## Overview

Flex:Submetering breaks down site energy consumption by circuit, area, or load category — giving customers and operators a clear picture of where energy is actually going. It moves beyond whole-site totals to identify the individual contributors to consumption, enabling targeted load management and cost reduction.

---

## Problem statement

A site's total consumption figure tells you how much energy is being used, but not where or by what. Without sub-circuit visibility, high-draw equipment, inefficient systems, or unexpected loads are invisible inside the aggregate number. This makes it difficult to prioritise load management actions, identify waste, or make informed decisions about which loads to shift or control.

---

## Target users

- **Energy managers and facilities managers** — particularly at larger commercial or industrial sites with multiple significant loads.
- **Blackcurrent analysts** — identifying load optimisation opportunities as part of ongoing service delivery.
- **Flex Energy (rural) customers** — farmers wanting to see irrigation, milking shed, and other farm process loads broken out separately.

---

## Goals

- Give customers a clear, circuit-level breakdown of where energy is consumed on their site.
- Identify which loads are the largest contributors to energy cost and demand charges.
- Support load shifting and control decisions (feeds into Flex:Schedule and Flex:Control) by identifying the right loads to target.
- Enable comparison of load behaviour over time to detect changes (equipment degradation, process changes, new loads added).

---

## Core features

### Circuit breakdown view
- Stacked area or bar chart showing consumption by sub-metered circuit or load category over a selected time range.
- Categories configurable per site (e.g. HVAC, refrigeration, EV charging, irrigation, lighting, process loads, other).
- Aligned to the same time axis as the Energy Dashboard for easy cross-reference.

### Top consumers summary
- Ranked list of circuits or load categories by energy consumed in the selected period: kWh, percentage of total, estimated cost.
- Period comparison: how does this week/month compare to the previous period for each load?

### Load profile per circuit
- Drill-down to an individual circuit's half-hourly profile — useful for identifying patterns, duty cycles, and anomalies.
- Flag unusual events: overnight consumption on a circuit that should be off, sustained high draw, etc.

### Contribution to peak demand
- For sites with demand charges: show which circuits are active during the site's peak demand window.
- Highlight which loads have the most influence on peak demand charges.

### Integration with Flex:Control
- Where a sub-metered circuit is also controllable (e.g. an EV charger, heat pump, or irrigation pump), surface a direct control action from within Submetering.

---

## Data requirements

| Data | Notes |
|---|---|
| Sub-meter readings per circuit | Half-hourly resolution preferred; requires sub-metering hardware installed on individual circuits |
| Circuit configuration and naming | Set up per site at commissioning; defines how circuits are grouped and labelled |
| Site total consumption | For calculating each circuit's percentage share |
| Tariff structure | For translating kWh by circuit into estimated cost |
| Peak demand window | For demand charge contribution analysis |

---

## Hardware dependency

Flex:Submetering requires sub-metering devices to be installed on individual circuits at the site switchboard. Not all existing sites will have sub-metering — availability depends on what was installed at commissioning. Sites with only a main revenue meter can provide whole-site totals only.

---

## Relationship to Flex:Load Monitoring

Flex:Load Monitoring focuses on supply-side health: phase balance, supply capacity utilisation, and operational safety. Flex:Submetering focuses on demand-side breakdown: where consumption is going and which loads to target. They are complementary — Load Monitoring tells you if there's a supply problem; Submetering tells you which loads are causing it.

---

## Constraints and dependencies

- Value is directly proportional to sub-metering coverage. A site with one sub-meter (e.g. EV charger only) gets partial visibility; a fully sub-metered site gets the full experience.
- Circuit naming and categorisation must be set up correctly at commissioning — poor labelling (e.g. "Circuit 3") significantly reduces usability.
- Feeds Flex:Insights: high-draw circuits or unexpected load patterns are natural candidates for insight generation.

---

## Out of scope (this version)

- Automatic attribution of unmetered consumption to equipment (non-invasive load disaggregation / NILM).
- Water or gas sub-metering (energy only in this version).
- Cost allocation reporting by department or cost centre (useful for larger organisations; noted for future iteration).
