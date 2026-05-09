# PRD: Flex:Health

**Status:** Implemented (prototype)

---

## Overview

Flex:Health is an internal operational monitoring view within the Flex platform. It gives Blackcurrent staff a single, live view of how every customer-managed asset is performing — surfacing connectivity issues, data ingest problems, and active faults before they become customer complaints. It is not a customer-facing module.

---

## Problem statement

As the Blackcurrent portfolio grows, monitoring asset health across dozens of sites becomes impractical through individual site inspection or raw telemetry dashboards. Faults go undetected, stale data passes unnoticed, and the team has no efficient way to triage which sites need attention without checking each one individually. Flex:Health solves this by aggregating the key health signals for every site into a single, sortable, filterable view — so the ops team can see the full picture in one screen and act on problems immediately.

---

## Target users

- **Blackcurrent operations team** — primary users; need to identify and triage connectivity, ingest, and device faults across the fleet without visiting individual site pages.
- **Blackcurrent technical support** — investigating customer-reported issues; use the page to confirm whether data is flowing and the device is online before escalating.
- **Account managers** — light use; a quick check that a customer's site is healthy before a call or visit.

This page is **internal only** and should not be accessible to customers or partners.

---

## Goals

- Give the operations team a real-time, single-screen view of fleet health without needing to open individual site pages.
- Surface the three most actionable failure modes — connectivity loss, ingest failure, and active device alarms — as distinct, filterable signals.
- Reduce the time from fault occurrence to ops team awareness.
- Serve as the operational complement to Flex:Portfolio (which is customer-facing); Flex:Health is the internal equivalent.

---

## Core features

### Fleet health summary

Four stat chips at the top of the page show an instant count of sites in each state:

- **Healthy** — telemetry is live, data is flowing, no active faults.
- **Warning** — telemetry is stale or data quality is degraded; may need investigation.
- **Fault** — site is offline or reporting a device fault; requires action.
- **Pending** — site exists in the system but has not yet streamed any telemetry (new installation or not yet commissioned).

### Filter tabs

One-click filters to narrow the table:

- **All** — full fleet.
- **Unhealthy** — sites with status Fault or Warning.
- **Ingest Problems** — sites where energy data is missing or zero despite having a connection (data pipeline issue, not a device fault).
- **Alarms** — sites with an active device-level fault.

### Search

Free-text search across customer name, site name, and address. Narrows the table in real time.

### Health table

One row per site, sorted worst-first by default (Fault → Warning → Healthy → Pending). Columns:

| Column | Description |
|---|---|
| **Customer** | Customer name and sector. |
| **Site** | Site name and abbreviated address. |
| **Status** | Overall connectivity state: Online / Stale / Offline / Pending. |
| **Telemetry** | Signal freshness from the on-site Edge device: Live / Stale / Lost / Pending. |
| **Ingest** | Energy data quality: Healthy / No data / Missing / Pending. |
| **Alarms** | Count of active device-level fault flags; badge highlights fault vs warning severity. |
| **Last seen** | Timestamp of the most recent telemetry reading from the site. |

All columns except Site are sortable. Secondary sort is always fault-first within the sorted group.

### Live indicator

A pulsing "Live" badge in the page header indicates the data is being pulled in real time (subject to telemetry polling interval).

---

## Health signal definitions

| Signal | Source | Healthy | Warning | Fault | Pending |
|---|---|---|---|---|---|
| **Status** | `site.status` | `ok` | `warn` | `fault` | `pending` |
| **Telemetry** | `site.status` | Online and streaming | Signal received but stale | No signal / device offline | No telemetry yet |
| **Ingest** | `site.last_reading`, `site.kwh_24h` | Reading present and `kwh_24h > 0` | Reading present but `kwh_24h = 0` | `last_reading` is null (non-pending site) | Site is pending |
| **Alarms** | `site.status` | No active faults | Warning-level issue | Fault-level issue | — |

---

## Data requirements

| Data | Source | Notes |
|---|---|---|
| Site list | `window.FlexData.sites` | All sites, including pending |
| Per-site status | `site.status` | ok / warn / fault / pending — synthetic in prototype |
| Last telemetry timestamp | `site.last_reading` | ISO timestamp or null |
| Energy throughput | `site.kwh_24h` | 24-hour kWh; used to detect ingest failure |
| Customer name and sector | `site.customer_name`, `site.sector` | For display and context |
| Site address | `site.address` | Abbreviated for the table |

---

## Constraints and dependencies

- Flex:Health is only as useful as the timeliness of the underlying telemetry. If the Edge device polling interval is long, the "Last seen" timestamps may appear stale even when the site is healthy.
- The `status` field is currently synthetic in the prototype. Production requires a real computed status derived from telemetry recency, connectivity heartbeats, and device fault flags.
- The Ingest signal (detecting `kwh_24h = 0` on a non-pending site) is a proxy for data quality. A site with genuine zero consumption would be a false positive; a more robust production implementation would inspect raw data completeness rather than just the aggregate.
- Role-based access control must prevent customer-facing users from accessing this page. It should sit behind an internal-only route or require an ops role claim.

---

## Relationship to other modules

| Module | Relationship |
|---|---|
| **Flex:Portfolio** | Customer-facing equivalent. Flex:Health is the internal ops view of the same fleet. |
| **Flex:Control** | Flex:Health surfaces device faults; Flex:Control is the tool to act on them. |
| **Flex:Assure** | Flex:Assure validates performance against expectations; Flex:Health flags connectivity and data issues that would prevent Assure from having valid data to work with. |
| **BC Monitoring** | Flex:Health replaces and consolidates the standalone BC Monitoring internal tool (bcmonitor.internal.blackcurrent.io/asset-health). |

---

## Out of scope (this version)

- Automated alerting or push notifications when a site transitions to fault (future: integrate with ops notification channel).
- Per-device fault detail drill-down — the table surfaces site-level signals only; device-level investigation requires navigating to the site's Flex:Control view.
- Historical fault timeline or uptime reporting — this version shows current state only.
- Customer-visible health indicators — any customer-facing health reporting belongs in Flex:Assure or a future Flex:Reporting module.
