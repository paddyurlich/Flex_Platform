# PRD: Data Export

**Status:** Implemented (prototype) — `flex-data-export.html`

---

## Overview

Data Export gives users a self-service way to download their energy data in standard formats for use in external tools, accounting systems, reporting workflows, or manual analysis.

---

## Problem statement

Customers and operators frequently need raw data outside the Flex platform — for accountants, for their own reporting, for comparison with electricity bills, or for analysis in Excel or other tools. Without a self-service export, every data request requires Blackcurrent to extract and send data manually, which is slow and operationally costly.

---

## Target users

- **Customers** — downloading their own site data for billing reconciliation, reporting to boards or owners, or personal analysis.
- **Blackcurrent operations and account managers** — extracting data for customer reports or internal analysis without requiring engineering support.
- **External advisors** — accountants or energy consultants who periodically need a data extract on behalf of a customer.

---

## Goals

- Remove Blackcurrent from the loop for routine data requests.
- Give customers confidence that their data is accessible and portable.
- Support audit and billing reconciliation use cases.

---

## V1 scope — ship fast

V1 prioritises getting a working export into production with the minimum viable feature set. Complexity is deferred to v2.

### Dataset selection
- Choose what data to export: generation, consumption, import, export, battery, all.
- Site selector: single site or all sites the user has access to.
- Date range picker: from/to dates.

### Format
- **CSV only.** Maximum compatibility, no dependencies.

### Resolution
- Half-hourly (native), hourly, or daily — user selects.
- Sensible default column set; no per-field customisation in v1.

### Download
- File downloads immediately in the browser.
- No async queueing or progress tracking in v1 — date range UI should guide users to keep requests to a size that completes quickly (e.g. max 3 months per export).

---

## V2 scope — deferred

| Feature | Reason deferred |
|---|---|
| XLSX export | Added complexity for a format most users can replicate in Excel from CSV |
| Export history log | Requires server-side persistence; low priority for initial release |
| Async job queue + notifications | Only needed for very large requests; keep v1 scoped to bounded ranges |
| Column include/exclude customisation | Low demand; adds UI complexity |
| Automated scheduled exports | Significant backend work; separate feature stream |
| API access | Separate PRD |
| Third-party data bundling (weather, grid prices) | Out of scope until data pipeline exists |

---

## Data requirements

| Data | Notes |
|---|---|
| Half-hourly interval data per site | Generation (kWh), consumption (kWh), import (kWh), export (kWh), battery charge/discharge (kWh), battery SoC (%) |
| Site and timestamp metadata | Site name, ICP, timestamps in Pacific/Auckland local time with ISO 8601 format |
| User identity | For access control — export must be scoped to authorised sites only |

---

## Constraints and dependencies

- Export access must be scoped to the sites a user is authorised for — a customer must not be able to export another customer's data.
- Timestamps in exports must be in Pacific/Auckland local time with DST correctly applied. ISO 8601 format with offset preferred (e.g. `2026-04-15T14:30:00+12:00`).
