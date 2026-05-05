# PRD: Flex:Reporting

**Status:** Planned
**Module question:** "Keep me informed with clear, ongoing performance updates."

---

## Overview

Flex:Reporting delivers regular, structured performance updates to customers and stakeholders — translating platform data into readable summaries that communicate the value being delivered without requiring the recipient to log in and interpret dashboards themselves.

---

## Problem statement

Most customers do not log into an energy platform daily. But they do care about whether their system is delivering value — and they need to be able to communicate that to their board, their accountant, or their business partners. Without a reporting layer, the platform is effectively invisible to anyone who is not an active daily user. This makes it harder to demonstrate ongoing value and maintain customer engagement.

---

## Target users

- **Business owners** — receiving a regular summary that gives them confidence without requiring direct platform engagement.
- **Boards and finance teams** — recipients of periodic reports that quantify energy savings and system performance in dollar terms.
- **Blackcurrent account managers** — using reports as a touchpoint in regular customer conversations.
- **External advisors** — accountants or energy consultants who need periodic data summaries on behalf of a customer.

---

## Goals

- Maintain customer awareness of the value being delivered between active platform sessions.
- Give customers something tangible to share internally — a report that communicates performance to stakeholders who will never log into Flex.
- Reduce the effort required from Blackcurrent to produce periodic customer updates.
- Create a consistent cadence of communication that reinforces the ongoing service relationship.

---

## Core features

### Automated periodic reports
- Scheduled generation of performance summaries: weekly, monthly, and/or quarterly.
- Customer-configurable: choose which report cadence and which sections to include.

### Report content (default)
- **Period summary:** total generation (kWh), consumption (kWh), self-consumption (%), grid import (kWh), grid export (kWh).
- **Financial summary:** estimated savings for the period, cumulative savings since commissioning.
- **System health:** telemetry status, any alerts or issues during the period, resolution status.
- **Performance vs. expectations:** actual generation vs. forecast (from Flex:Assure), brief commentary.
- **Highlights and actions:** any insights or recommendations from Flex:Insights surfaced during the period.

### Report formats
- PDF — for sharing with stakeholders, printing, or archiving.
- Email delivery — delivered directly to nominated recipients on schedule.
- In-platform report archive — downloadable at any time.

### Report branding
- Reports carry Blackcurrent and/or Flex brand identity.
- Option to white-label for Blackcurrent account managers presenting reports to customers in their own name.

### Custom report builder
- Ability to generate an ad-hoc report for any date range and subset of metrics.
- Useful for Blackcurrent account managers preparing for a customer review or responding to a one-off request.

---

## Data requirements

| Data | Notes |
|---|---|
| Half-hourly generation, consumption, import, export, battery data | Source for period totals |
| Financial estimates (savings, costs) | Derived from energy totals and tariff structure |
| Flex:Assure performance comparison | Generation vs. forecast for the period |
| Flex:Insights — open and resolved insights | For highlights and actions section |
| System health and alert log | For health summary |
| Customer and site configuration | Report recipients, schedule, branding preferences |

---

## Constraints and dependencies

- Report accuracy for financial figures depends on tariff data being correctly configured in Flex:Tariff. Without this, savings estimates will use a default or fallback rate which should be clearly disclosed.
- PDF generation requires a server-side rendering step — not browser-side. Must handle multi-site customers with potentially large datasets.
- Email delivery requires a reliable transactional email service (e.g. SendGrid, AWS SES) and clear unsubscribe management.
- Reports must use Australian English spelling and Blackcurrent brand conventions consistent with the broader brand guidelines.

---

## Out of scope (this version)

- Real-time or on-demand alert notifications (that is a separate alerting/notification feature).
- Regulatory or compliance reporting for network operators or government bodies.
- Automated report personalisation using AI-generated commentary (potential future capability).
