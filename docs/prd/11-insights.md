# PRD: Flex:Insights

**Status:** In development
**Module question:** "What operational improvements should I make?"

---

## Overview

Flex:Insights surfaces actionable recommendations from a site's energy data — identifying patterns, inefficiencies, and opportunities that would otherwise require manual analysis to find. It moves the platform from passive observation to active guidance.

---

## Problem statement

Energy platforms produce a lot of data. Customers and operators who understand what they're looking at can spot opportunities — but most users don't have the time, expertise, or bandwidth to analyse dashboards and draw their own conclusions. Without a layer that interprets the data and tells users what to do next, much of the value in monitoring goes unrealised.

---

## Target users

- **Business owners and energy managers** — who want to improve system performance but don't have deep energy expertise.
- **Blackcurrent account managers** — using Insights as a conversation tool in regular customer reviews to demonstrate ongoing value.
- **Blackcurrent operations team** — identifying fleet-wide patterns or systemic issues across multiple customer sites.

---

## Goals

- Translate raw energy data into specific, actionable recommendations.
- Reduce the expertise required to get ongoing value from the Flex platform.
- Give Blackcurrent a proactive value story beyond the initial installation — "here's what we found, here's what to do."
- Feed into and trigger other modules: an Insight about tariff misalignment links to Flex:Tariff; an Insight about battery scheduling links to Flex:Schedule.

---

## Core features

### Insight feed
- Chronological or priority-ordered list of insights for a site.
- Each insight includes: what was observed, why it matters, and a recommended action.
- Insights are categorised: performance, cost, operational, maintenance.

### Insight types (initial set)
- **Tariff misalignment** — consumption pattern suggests a better tariff structure is available.
- **Suboptimal battery scheduling** — battery is consistently discharging at low-value times or missing cheap charge windows.
- **Generation underperformance** — generation is tracking below modelled expectation for a sustained period (link to Flex:Assure).
- **High-load spike pattern** — recurring load events are driving demand charges or stressing supply capacity.
- **Self-consumption opportunity** — significant export is occurring during periods of high consumption that could be served by the battery.
- **System idle time** — controllable assets are not being actively managed despite favourable conditions.

### Insight detail view
- Expanded explanation of the observed pattern with supporting data visualisation (chart or summary).
- Clear next step: a button or link that takes the user directly to the relevant module to act on the insight (e.g. "Review your schedule" → Flex:Schedule; "Compare tariffs" → Flex:Tariff).

### Insight history and tracking
- Log of past insights, including whether they were acted on and what the outcome was.
- Supports Blackcurrent account conversations: "Here's what we flagged, here's what changed."

### Notification and digest
- Optional: weekly email digest of new or open insights for a site.
- In-platform notification badge when new insights are available.

---

## Data requirements

| Data | Notes |
|---|---|
| Half-hourly generation, consumption, import, export, battery data | Source for pattern detection |
| Tariff structure (current) | For tariff misalignment insights |
| Battery schedule configuration | For scheduling optimisation insights |
| Design forecast data | For generation underperformance comparison (from Flex:Assure) |
| Historical insights and actions taken | For tracking and account reporting |

---

## Constraints and dependencies

- Insight quality depends on data completeness and history — a site with 3+ months of clean data will generate more reliable insights than a newly commissioned site.
- Insights are recommendations, not automated actions. The user retains control; Flex:Optimisation is the module that automates execution.
- Insights should be explainable — every recommendation must link to observable data the user can verify, not a black-box suggestion.
- Cross-module navigation is critical: an isolated insight feed with no path to act on it has limited value.

---

## Out of scope (this version)

- Automated execution of insight recommendations (that is Flex:Optimisation).
- Fleet-wide comparative insights ("your site is performing below average for your sector").
- Predictive maintenance or fault prediction (requires dedicated ML models and fault classification data).
