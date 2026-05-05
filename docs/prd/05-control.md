# PRD: Flex:Control

**Status:** In development — live deployment at NZ school sites (heat pump control); EV charger control in active development

---

## Overview

Flex:Control is the remote device control module within the Flex platform. It enables users to directly control connected site devices — heat pumps, EV chargers, hot water systems, pumps and other flexible loads — through a single interface. It supports manual actions, scheduled control, and maintains a full audit trail of all device state changes.

---

## Problem statement

Customers have distributed energy assets that could be actively managed to reduce costs and improve performance, but have no practical way to control them remotely without proprietary vendor apps (one per device type), phone calls, or physical site visits. This fragmentation makes active energy management impractical. Flex:Control provides a single operational interface across all controllable assets on a site.

---

## Target users

- **Blackcurrent operators** — primary users for dispatch, troubleshooting, and demand response coordination.
- **Facility and energy managers** — site staff who need to turn devices on/off, adjust setpoints, or respond to on-site conditions without waiting for Blackcurrent.
- **Future: demand response aggregators** — Transpower / FlexPoint and similar programmes that need dispatch capability into connected assets.

---

## Goals

- Enable remote control of connected devices without requiring a site visit or proprietary vendor app.
- Provide a reliable audit trail so every control action can be reviewed, attributed, and explained.
- Serve as the execution layer for Flex:Schedule (schedule-driven actions) and future Flex:Aggregator (dispatch-driven actions).
- Lay the foundation for demand response participation (currently in active development with Transpower / FlexPoint).

---

## Core features

### Device inventory
- List of all controllable devices registered to a site: name, type, current state, last confirmed state change.
- Status chip per device: online / offline / unknown.

### Manual control actions
- Device-type-appropriate controls surfaced per device:
  - Heat pumps: on / off, mode (heat/cool/fan), setpoint temperature.
  - EV chargers: start / stop charging, set charge rate (kW or Amps).
  - Hot water systems: boost / off / scheduled.
  - Pumps / generic loads: on / off, rate where applicable.
- Confirmation step before any control action is sent — prevents accidental dispatch.
- Feedback: action sent → pending → confirmed (device state matches command) or failed.

### Scheduled control
- Time-based triggers for any manual control action, defined through the Flex:Schedule interface.
- Flex:Control executes the schedule commands and records them in the audit trail.

### Audit trail
- Immutable log of all state changes: timestamp, device, action taken, who triggered it (user or schedule), outcome (confirmed / failed / timeout).
- Filterable by device, date range, action type, triggered-by.
- Exportable for compliance or reporting purposes.

### Device state history
- Chart of device state over time (on/off, setpoint, charge rate) aligned to the Energy Dashboard time axis.
- Useful for correlating control actions with energy behaviour.

---

## Data requirements

| Data | Notes |
|---|---|
| Device registry per site | Device ID, type, brand/model, integration method, capability set |
| Real-time device state | Polled or push from device integration layer via the on-site Edge device |
| Control command write path | Integration with inverter, EV charger, heat pump, or load controller APIs/protocols |
| User identity and role | For audit trail and authorisation — some actions may be role-restricted |
| Command outcome confirmation | Requires device state read-back post-command |

---

## Constraints and dependencies

- Control capability is bounded by what each device type exposes via its integration. Not all brands support all commands remotely.
- Latency between command and confirmed state varies by device and communication protocol — UI must show pending state clearly and not assume instant confirmation.
- Safety limits: certain control actions must be prevented at the platform level (e.g. cannot set EV charger above site supply capacity; cannot override battery hardware protection limits).
- Audit trail must be tamper-evident — write-once log, not editable after creation.
- Flex:Aggregator will eventually pass dispatch commands through this layer; the control API must be designed to accept both user-initiated and programme-initiated commands with clear source attribution.

---

## Live deployment context

Current production deployment: remote on/off and mode control of heat pumps across school sites in New Zealand. EV charger start/stop and charge rate control is in active development. This is a real operational capability, not a prototype.

---

## Out of scope (this version)

- Fully automated demand response dispatch (receiving and auto-executing dispatch instructions from Transpower / FlexPoint without operator review — this is the next phase).
- Control of generation assets (inverter mode changes, export limiting) — these require additional safety review.
- Voice or mobile push-notification triggered control.
