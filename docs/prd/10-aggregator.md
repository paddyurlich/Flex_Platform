# PRD: Flex:Aggregator

**Status:** Concept / long-term roadmap

---

## Overview

Flex:Aggregator is the forward-looking module that enables Blackcurrent to pool distributed energy assets across multiple customer sites and participate in grid-level value opportunities — demand response programmes, flexibility markets, and bilateral energy arrangements — on behalf of, and sharing value back to, customers.

---

## Problem statement

Individual behind-the-meter energy assets (batteries, EV chargers, flexible loads) are too small to directly participate in wholesale energy markets or demand response programmes that offer meaningful financial value. Aggregation — treating a portfolio of assets as a single coordinated resource — is what unlocks these opportunities. Without this capability, the value of distributed assets is permanently capped at the customer's own site boundary.

---

## Target users

- **Blackcurrent as aggregator** — the primary actor in this module; Blackcurrent coordinates and dispatches the fleet.
- **Customers as participants** — their assets are enrolled; they receive a share of the value generated, with visibility into when their asset was dispatched and why.
- **Grid operators and flexibility programmes** — Transpower / FlexPoint, Our Energy / LocalFlex, and similar programmes that need a reliable dispatch interface into aggregated distributed resources.

---

## Goals

- Create a new revenue stream for Blackcurrent and enrolled customers through aggregated grid services.
- Provide Blackcurrent with a scalable dispatch interface across the entire connected fleet.
- Give customers transparency into how and when their assets are used in aggregation programmes, and what value they are receiving.
- Build on Flex:Control's device control capability as the execution layer for dispatch instructions.

---

## Core features

### Fleet enrolment management
- Register sites and specific assets into one or more aggregation programmes.
- Per-asset enrolment rules: availability windows, minimum SoC required before dispatch, maximum dispatch duration, opt-out periods.
- Customer consent and agreement management for fleet participation.

### Dispatch interface
- Receive dispatch instructions from external programme operators (Transpower / FlexPoint, LocalFlex).
- Translate programme-level dispatch instructions into site-level and device-level control commands via Flex:Control.
- Confirm dispatch execution: report back aggregate MW delivered, per-site contribution, and any sites that failed to respond.

### Programme performance dashboard
- For each aggregation programme: dispatch events over time, total MW delivered per event, availability rate (how often the fleet was available when called), and revenue generated.
- Fleet-level and per-site breakdown.

### Customer value share
- Calculate each site's contribution to each dispatch event (kWh dispatched).
- Compute the customer's share of programme revenue for each event.
- Customer-facing view: dispatch events their site participated in, energy contributed, estimated earnings to date.

### Availability forecasting
- Predict fleet availability for upcoming dispatch windows based on current SoC, scheduled loads, and enrolled availability rules.
- Useful for programme commitments and for communicating availability to programme operators.

---

## Data requirements

| Data | Notes |
|---|---|
| Real-time device state across fleet | Battery SoC, current mode, online/offline — from Flex:Control layer |
| Dispatch instructions from programme operators | Structured format per programme (Transpower / FlexPoint API, or bilateral) |
| Dispatch confirmation and metering | kWh delivered per site per event — for settlement and revenue calculation |
| Enrolment and availability rules per asset | Stored configuration per site |
| Revenue rates per programme | Contract terms with programme operators |

---

## Constraints and dependencies

- Depends entirely on Flex:Control being reliable and low-latency for the enrolled fleet — dispatch events often require response within seconds to minutes.
- Programme eligibility requirements vary: Transpower / FlexPoint has specific technical requirements for dispatch response time, minimum capacity, and telemetry quality. The fleet must meet these before enrolment.
- Customer consent and asset availability rules must be enforced in dispatch logic — the system must never dispatch beyond what a customer has agreed.
- Regulatory and market context is evolving in New Zealand. The module design must remain adaptable as flexibility market rules are clarified.
- Settlement and revenue calculation must be auditable — linked to Flex:Control audit trail for each dispatch event.

## Strategic relationships

- **Transpower / FlexPoint** — active trial / market integration relationship; the most immediate pathway to aggregated demand response in the NZ market.
- **Our Energy / LocalFlex** — retail / bilateral relationship; relevant to community or retail-level flexibility value.
- **Farmlands** — channel and strategic partner for Flex Energy rural customer fleet.

---

## Out of scope (this version)

- Wholesale spot market trading on behalf of customers.
- Automated bidding into market clearing (requires sophisticated forecasting and market interface beyond the current platform).
- Battery virtual power plant (VPP) export to grid — requires network operator agreement and different regulatory framework.
