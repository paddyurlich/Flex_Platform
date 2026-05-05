# PRD: Flex:Schedule

**Status:** Planned — placeholder in sidebar nav

---

## Overview

Flex:Schedule lets users define when batteries and other flexible energy assets should charge, discharge, or hold, based on business needs, operating hours, or tariff windows. It is the structured, rule-based path to optimising asset behaviour without requiring real-time intervention.

---

## Problem statement

Batteries and other flexible assets default to basic operating modes set at commissioning. Without scheduling, they cannot adapt to a customer's actual business rhythm — peak trading hours, overnight off-peak charging windows, grid pricing events, or planned operational patterns. This leaves significant value on the table.

---

## Target users

- **Business owners and energy managers** — customers who understand their operating patterns and want their battery to align with them.
- **Blackcurrent operators** — staff setting up or adjusting schedules on behalf of customers, especially during onboarding or when tariff structures change.
- **Flex Energy (rural)** — farmers scheduling irrigation pumps or milking equipment around off-peak electricity periods.

---

## Goals

- Enable customers to capture value from time-of-use tariff windows without manual intervention.
- Align battery charging with periods of high solar generation and discharging with periods of peak demand or high tariff cost.
- Reduce reliance on Blackcurrent staff for routine schedule adjustments.
- Provide a foundation that Flex:Simulator can test against (what would happen if we ran this schedule?).

---

## Core features

### Schedule builder
- Weekly recurring schedule with time-block entries per day (or grouped Mon–Fri / weekend).
- For each time block, user sets: asset (battery, specific load), mode (charge / discharge / hold / auto), and optional rate/setpoint.
- Visual timeline representation of the week's schedule.

### Tariff-aware mode (optional overlay)
- If tariff data is configured (from Flex:Tariff), display tariff rate periods as a background layer on the schedule timeline so users can align blocks to cheap/expensive periods.
- Not automatic optimisation — user still defines the schedule, tariff is context.

### Schedule history and audit trail
- Log of all schedule changes: who changed what, when, and what the previous value was.
- Rollback to a previous schedule configuration.

### Active schedule status
- Real-time view of the current active schedule block and the asset's actual operating mode.
- Highlights any divergence between scheduled mode and actual behaviour (e.g. battery constrained by SoC limits).

### Multiple asset support
- Where a site has multiple controllable assets, the schedule builder handles them independently with a per-asset timeline.

---

## Data requirements

| Data | Notes |
|---|---|
| Battery setpoints and mode commands | Write path to inverter/battery management system via Flex:Control layer |
| Current battery SoC | For contextualising whether a schedule block will execute as expected |
| Tariff rate periods (optional) | From Flex:Tariff module; used for schedule overlay only |
| User identity and role | For audit trail and authorisation of schedule changes |
| Site timezone | Pacific/Auckland — schedule times are always site-local |

---

## Constraints and dependencies

- Write path to assets depends on Flex:Control being operational for that site and device type.
- Not all inverter or battery brands support all operating modes remotely — supported modes are constrained by hardware capability.
- Schedules must respect hardware protection limits (min/max SoC, max charge/discharge rate) — the UI should prevent users from configuring schedules that violate these.
- Flex:Simulator should eventually be able to backtest a proposed schedule against historical data before it is applied.

---

## Out of scope (this version)

- Automated schedule optimisation (the system choosing the best schedule based on tariff and forecast — that is a longer-term capability).
- Event-driven triggers (e.g. charge when spot price drops below threshold).
- Grid dispatch instructions from an aggregator (that is Flex:Aggregator).
