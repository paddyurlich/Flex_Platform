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

## Core features

### Dataset selection
- Choose what data to export: generation, consumption, import, export, battery, all.
- Site selector: single site or all sites the user has access to.
- Date range picker: from/to dates.

### Format selection
- CSV — for maximum compatibility and further processing.
- XLSX — for customers who want data in a formatted spreadsheet directly.

### Column and resolution options
- Resolution: half-hourly (native), hourly, daily — user selects.
- Column set: sensible defaults with option to include or exclude fields (e.g. exclude battery if the user doesn't need it).

### Download
- File downloads immediately for short date ranges.
- For large requests (e.g. multiple sites, 12 months of half-hourly data), show a progress indicator or queue the job and notify when ready.

### Export history
- Log of previous exports: date requested, dataset, date range, format, downloaded by.
- Allows re-download of recent exports without re-configuring.

---

## Data requirements

| Data | Notes |
|---|---|
| Half-hourly interval data per site | Generation (kWh), consumption (kWh), import (kWh), export (kWh), battery charge/discharge (kWh), battery SoC (%) |
| Site and timestamp metadata | Site name, ICP, timestamps in Pacific/Auckland local time with ISO 8601 format |
| User identity | For export history log and access control |

---

## Constraints and dependencies

- Export access must be scoped to the sites a user is authorised for — a customer must not be able to export another customer's data.
- Large exports (12 months × multiple sites × half-hourly) need server-side generation to avoid browser timeouts.
- Timestamps in exports must be in Pacific/Auckland local time with DST correctly applied. ISO 8601 format with offset preferred (e.g. `2026-04-15T14:30:00+12:00`).

---

## Out of scope (this version)

- Automated scheduled exports (e.g. monthly email delivery of last month's data).
- API access for programmatic data retrieval.
- Data from third-party sources (weather, grid prices) bundled into the same export.
