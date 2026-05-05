# PRD: Flex:Tariff

**Status:** Planned — placeholder in sidebar nav

---

## Overview

Flex:Tariff analyses a customer's actual energy consumption against available retail tariff structures to determine whether they are on the most cost-effective pricing arrangement and where savings may be available through a tariff change.

---

## Problem statement

Most businesses are on a default tariff that was chosen at connection or when their solar was installed — not necessarily the best fit for how they actually use energy today. With solar, batteries, and flexible loads changing their consumption profile, the optimal tariff may have shifted. Customers have no easy way to evaluate this without either engaging a consultant or manually downloading and analysing their own billing data.

---

## Target users

- **Business owners** — making tariff or contract renewal decisions for their sites.
- **Blackcurrent account managers** — using tariff analysis to add value in customer conversations and support renewals.
- **Energy managers at larger SME or industrial sites** — who actively optimise energy costs and review tariff structures periodically.

---

## Goals

- Identify whether a customer is on the right tariff for their current energy profile.
- Quantify the savings available from switching — in dollars, not just percentages.
- Give Blackcurrent a concrete value story to present to customers beyond the initial system install.
- Identify where battery scheduling or load shifting would improve tariff alignment even without a tariff change.

---

## Core features

### Tariff modelling engine
- Apply one or more tariff structures to historical interval consumption data for a site.
- Tariff types to support: flat rate, time-of-use (ToU), demand/peak capacity charges, night-rate, spot-price pass-through.
- Inputs: electricity retail rates ($/kWh by period), network charges ($/kW demand, $/kWh), fixed daily charges.

### Current vs. alternative tariff comparison
- Side-by-side cost comparison for the selected analysis period: current tariff vs. one or more alternative tariffs.
- Breakdown by cost component: energy, network demand, fixed.
- Visual: stacked bar or waterfall chart showing cost difference per period.

### Recommendation output
- Clear statement of the recommended tariff and estimated annual saving.
- Confidence level: based on how much historical data is available and how stable the consumption pattern is.
- Export-ready summary for use in customer conversations.

### Consumption pattern analysis
- Visualise when the customer consumes energy relative to tariff periods (cheap vs. expensive windows).
- Highlight structural misalignments: e.g. a customer on a flat rate whose consumption is mostly overnight — they would benefit from a night rate.

### What-if load shifting view
- If the customer shifted X kWh of load from peak to off-peak (using battery or scheduling), what would their bill look like?
- This is a simplified version of Flex:Simulator scoped specifically to tariff cost.

---

## Data requirements

| Data | Notes |
|---|---|
| Half-hourly interval consumption data | At least 3 months preferred for reliable analysis; 12 months ideal |
| Current tariff structure | Manual input or pulled from retailer data if available |
| Alternative tariff structures for comparison | Maintained tariff library, or manually entered for comparison |
| Solar generation and battery data | Needed to model net consumption (what actually goes through the meter vs. gross site load) |
| Site ICP number | For connecting to network and retailer data where API access exists |

---

## Constraints and dependencies

- Accuracy depends on the quality and completeness of interval data. Gaps in half-hourly data degrade the analysis.
- Retailer tariff structures change frequently — the tariff library needs a maintenance process to stay current.
- Demand charges ($/kW) require peak demand data, which may not be available at all sites depending on metering.
- Results are indicative, not a financial guarantee — language in the UI must reflect this clearly.
- Feeds into Flex:Schedule (if a new tariff has specific cheap windows, schedule battery charging to those windows) and Flex:Simulator (backtest the impact of switching tariffs over a historical period).

---

## Out of scope (this version)

- Automated tariff switching or retailer contract management.
- Spot market pass-through pricing analysis (requires different data pipeline).
- Network pricing optimisation (line charges, RCPD avoidance) — noted for future iteration.
