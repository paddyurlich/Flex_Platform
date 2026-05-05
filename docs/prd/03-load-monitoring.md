# PRD: Flex:Load Monitoring

**Status:** Planned — placeholder in sidebar nav

---

## Overview

Flex:Load Monitoring provides visibility into a site's incoming supply and load behaviour. It helps identify operational issues — phase imbalance, supply constraints, unexpected load spikes — so that customers and operators can act before problems escalate.

---

## Problem statement

Energy systems can underperform or fail not because solar or batteries are at fault, but because of problems with how load is distributed across phases, how close a site is running to its supply capacity, or how controllable loads are behaving. These issues are invisible without sub-metering and load-level visibility. Customers currently have no easy way to identify them.

---

## Target users

- **Blackcurrent operators** — primary users, investigating site anomalies or preparing for maintenance visits.
- **Technically engaged site owners** — energy managers at larger SME or industrial sites who actively monitor their own operations.
- **Flex Energy (rural)** — farmers monitoring irrigation, milking sheds, or other high-draw equipment.

---

## Goals

- Surface load and supply issues before they cause system damage or avoidable downtime.
- Give operators enough information to remotely diagnose common problems without a site visit.
- Support safer, better-informed decisions when scheduling or controlling flexible loads (feeds into Flex:Schedule and Flex:Control).

---

## Core features

### Phase balance view
- Per-phase current and voltage readings (L1, L2, L3) plotted over time.
- Visual indicator of imbalance severity — threshold-based highlighting when any phase deviates beyond an acceptable range.
- Summary: worst imbalance recorded in the selected period, average deviation.

### Supply capacity monitor
- Actual demand vs. available supply capacity (based on connection agreement / fuse rating).
- Percentage utilisation chart over time.
- Alert indicator when utilisation approaches or exceeds safe threshold.

### Load profile breakdown
- Where sub-metering exists: breakdown of major load categories (HVAC, EV charging, process loads, lighting/other).
- Stacked chart aligned to the same time axis as the Energy Dashboard.

### Load events log
- Timestamped record of significant load events: large switch-on/off events above a configurable threshold, sustained over-limit periods, phase fault conditions.

---

## Data requirements

| Data | Notes |
|---|---|
| Per-phase voltage and current at half-hourly or better resolution | Requires compatible metering at switchboard level |
| Total demand (kW / kVA) | For supply capacity comparison |
| Supply connection agreement rating (kVA or A) | Site configuration data |
| Sub-meter readings per circuit (where available) | Optional; enhances load breakdown |
| Timestamps | Pacific/Auckland timezone |

---

## Constraints and dependencies

- Requires site metering capable of capturing per-phase data. Not all existing sites will have this; rollout depends on hardware installed.
- Phase imbalance thresholds need to be configurable per site (different sites have different equipment and tolerances).
- Feeds operational context into Flex:Schedule and Flex:Control — sites with supply constraints need load scheduling that respects those limits.

---

## Out of scope (this version)

- Automatic load shedding or demand response actions (that is Flex:Control).
- Power quality analysis (harmonics, power factor correction beyond basic PF display).
- Network operator reporting or grid-side visibility.
