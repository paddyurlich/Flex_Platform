# PRD: Portfolio Map

**Status:** Planned — `flex-portfolio-map.html`

**Customer question:** *Where are my assets, what is deployed, and what is the scale of our portfolio?*

---

## Overview

Portfolio Map gives users a geographic view of all energy and climate assets under management. It complements the tabular Portfolio view by making the physical distribution of the fleet immediately legible — where assets are concentrated, which areas have the largest installations, and how the portfolio spans the country.

---

## Problem statement

The portfolio table tells you *what* is at each site. The map tells you *where* — and at scale, that matters. Customers managing dispersed sites need to understand their geographic footprint. Internally, operations teams need a spatial view to plan field visits and triage geographic clusters of issues. Commercial and leadership teams need to show the breadth of assets under management to investors, grid operators, and partners — in a format that communicates scale instantly.

A table of 50 sites communicates nothing about the geography of those sites. A map does.

---

## Target users

### Primary

- **Blackcurrent Operations (Mia)** — uses the map to understand where clusters of sites are, identify geographic patterns in faults or performance, and plan field visits.
- **Multi-site customers (Greg, Blair)** — customers with assets across multiple locations want to see their full portfolio on a map and quickly navigate to a specific site.

### Secondary

- **System Operator / Lines Company (Anaru, Sarah)** — the map communicates the geographic breadth and density of Blackcurrent and Flex assets on the network, without requiring access to operational data. A credibility and awareness tool.
- **Senior Leadership / Investors (Richard, SLT)** — a map showing the scale of the managed portfolio is a powerful commercial communication tool: it makes size and growth tangible.
- **Blackcurrent Ops field team** — planning on-site visits and scheduling maintenance across a region.

---

## Goals

- Make the geographic distribution of the managed portfolio immediately legible.
- Let any user navigate from a map pin to full site detail without leaving the page.
- Allow filtering to focus the map on a subset of assets (by type, customer, segment, or name).
- Communicate the relative scale of battery installations across the fleet visually — without requiring the user to read a number.
- Serve as a credible portfolio overview for non-operational audiences (investors, grid operators) who need breadth without operational detail.

---

## Core features

### 1. Interactive map

- Full-viewport map of New Zealand, centred to show the full national portfolio at launch.
- Base map: neutral cartographic style (OpenStreetMap via Leaflet, or Mapbox if a key is available). Muted palette so asset markers read clearly over the map.
- Smooth pan and zoom. Pinch-to-zoom on touch devices.
- Map auto-fits bounds to the visible set of assets when filters are applied.

### 2. Asset markers

**Default mode — status markers:**
- Each site is a coloured pin or circle marker.
- Colour matches the existing telemetry status system: green (ok), amber (warn), red (fault), grey (pending).
- All markers the same size in this mode.

**Battery size mode — proportional symbols:**
- Toggle switches markers to graduated circles sized proportionally to `battery_capacity_kwh`.
- Sites with no battery get a small hollow marker so they remain visible but do not compete visually.
- Size scale: minimum circle at 10px diameter, maximum at 40px, linear scale across the fleet's battery range.
- A compact legend shows three reference sizes (e.g. 10 kWh / 50 kWh / 200 kWh) anchored to the bottom-left of the map.
- This is the standard GIS graduated symbol approach — well understood by technical audiences and clear to non-technical users.

**Clustering (optional, at lower zoom levels):**
- When zoomed out far enough that markers overlap, cluster them into a count bubble. Expanding a cluster zooms in to reveal individual markers. (Leaflet MarkerCluster or equivalent.)

### 3. Site detail popup

Clicking a marker opens a popup anchored to the pin showing:

- **Site name** (large)
- **Customer name**
- **Address**
- **Status chip** (colour-coded, same as portfolio table)
- **Asset summary:** PV size (kWp), battery capacity (kWh), inverter size (kW)
- **Last reading** timestamp
- **Sector** (e.g. Dairy, Commercial, School)
- **Active Flex** indicator (yes/no)
- **→ Open site** link that navigates to the Portfolio — Sites detail for that site

The popup is dismissible by clicking elsewhere on the map or pressing Escape.

### 4. Filter panel

A compact panel (top bar on desktop, slide-up drawer on mobile) with:

| Filter | Type | Source field |
|---|---|---|
| Search | Text input — filters by site name or address | `name`, `address` |
| Asset type | Multi-select chips — Energy, Climate | `sector` category group |
| Customer | Dropdown — all customers or a specific customer | `customer_name` |
| Segment | Toggle — All / Blackcurrent / Flex Energy | `active_flex` / brand |
| Battery size mode | Toggle — Status colours / Battery size | derived from `battery_capacity_kwh` |

**Asset type grouping:**
- **Energy** — sites with solar PV and/or battery storage (`has_battery` or `pv_size_kwp > 0`)
- **Climate** — sites where the primary managed asset is HVAC or climate control (identified by sector tag)

Filters are additive (AND logic). The map auto-updates and auto-fits bounds on every filter change with no submit action required. An active filter count badge appears on the filter panel button when any filter is active. A "Clear filters" control resets all.

### 5. Summary bar

A compact strip above or beside the map showing aggregate counts for the currently visible set:

- Total sites visible
- Sites by status (counts per colour)
- Total PV capacity (kWp)
- Total battery capacity (kWh)

This gives the portfolio-level headline without requiring a separate dashboard.

---

## Audience modes

Two access contexts shape what the map shows:

**Customer-facing:** A logged-in customer sees only their own sites. Filters are scoped accordingly. Customer name filter is hidden (unnecessary). This is the self-service portfolio view.

**Internal (Blackcurrent operations):** Full fleet visible. All customers selectable. Customer name filter is prominent. Used for monitoring, field planning, and commercial demonstrations.

**Guest / stakeholder view (future consideration):** A read-only, anonymised or aggregated map view could be surfaced for non-customer audiences (grid operators, investors, regulators) to show portfolio scale without exposing individual customer data. Not in v1, but the architecture should not preclude it.

---

## Data requirements

All required fields are already present in `window.FlexData`:

| Field | Purpose |
|---|---|
| `latitude`, `longitude` | Pin placement |
| `name`, `address` | Popup header and search |
| `customer_name`, `customer_id` | Customer filter and popup |
| `status` | Marker colour (status mode) |
| `battery_capacity_kwh` | Proportional symbol size (battery mode) |
| `pv_size_kwp`, `inverter_size_kw` | Popup asset summary |
| `has_battery` | Asset type filter, hollow marker in battery mode |
| `sector` | Asset type grouping, popup display |
| `last_reading` | Popup recency display |
| `active_flex` | Segment filter |
| `icp` | Available in popup if needed |

---

## Map library

**Recommended: Leaflet.js** (open source, no API key required, well-supported NZ tile coverage via OpenStreetMap).

- `leaflet.js` and `leaflet.css` loaded via CDN.
- Base tile layer: OpenStreetMap standard or CartoDB Positron (muted, professional).
- Graduated symbols via `L.circleMarker` with dynamic radius.
- Clustering via `Leaflet.markercluster` if implemented.

No Mapbox dependency unless a key is already available — avoids rate limits and cost for a prototype.

---

## Constraints and dependencies

- Latitude and longitude fields in `FlexData` must be populated for all sites. In the prototype, all sites already have coordinates.
- Map view requires an internet connection for tile loading — it will not render correctly offline.
- The map is not a System Operator dispatch interface. It shows asset location and high-level status only. Dispatch, response times, and ancillary market data are out of scope for this module.
- Customer-facing access control (scoping to own sites) depends on role/auth context — in the prototype this is synthetic.

---

## Out of scope (this version)

- Real-time asset telemetry overlaid on the map (power flow, live SoC).
- Feeder or network topology overlays (lines company / grid view).
- Historical or time-series playback on the map.
- Route planning or optimised field visit scheduling.
- Export of the map view as image or PDF.
- Anonymised guest/stakeholder view (noted for future consideration above).
- Integration with GIS datasets (Transpower network, council zones, climate data).
