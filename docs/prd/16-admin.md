# PRD: Flex Platform — Admin & Access Control

**Status:** Planned

---

## Overview

The Flex Platform Admin module defines how users are provisioned, what they can see, and what they can change. It introduces four distinct access tiers — Super Admin, Partner Admin, User Admin, and Standard User — and the management interfaces that let authorised users control who has access to which customers, sites, and features.

---

## Problem statement

As the Flex Platform scales across direct Blackcurrent customers and Flex Energy rural customers (via Farmlands), access control becomes a critical operational and commercial requirement. Currently there is no structured mechanism for:

- Inviting customer or partner users to the platform with defined permissions.
- Preventing standard users from making changes they shouldn't (device configuration, tariff settings, user management).
- Giving Farmlands visibility and management access across their rural portfolio without exposing other customers' data.
- Keeping an auditable record of who changed what and when.

Without a role-based access model, the platform cannot be safely opened to customer users or channel partners.

---

## Access hierarchy

The platform data model has four levels. Permissions are always scoped downward — a role at one level cannot access data above it.

```
Blackcurrent
└── Partner (e.g. Farmlands)
    └── Customer (e.g. Gubb's Farm, MacHops)
        └── Site (e.g. Main Dairy Shed, Irrigation Pump)
```

Direct Blackcurrent customers sit under Blackcurrent without a Partner intermediary. Flex Energy customers always sit under the Farmlands partner.

---

## Role definitions

### Super Admin — Blackcurrent Operations

Full read and write access across the entire platform, all customers, all partners, all sites. Reserved for the Blackcurrent ops team. Can perform any action in the system, including role assignment, user deactivation, device commissioning, and tariff configuration. The only role that can create or modify Partners.

### Partner Admin — Channel Partners (e.g. Farmlands)

Scoped to the partner's own customer portfolio. A Partner Admin can see and manage all customers and sites assigned to their partner organisation, but cannot access other partners' data or any direct Blackcurrent customers. Can invite and manage users within their portfolio, edit customer and site data, and view all feature modules. Has a branded experience (Flex Energy / Farmlands co-brand). Cannot modify platform-level settings, pricing structures, or device commissioning parameters — those remain with Super Admin.

### User Admin — Customer Portfolio Administrators

Scoped to a defined subset of customers within a partner or direct Blackcurrent relationship. Typically the energy manager or facilities administrator at a multi-site customer, or a reseller managing a small book of accounts. Can edit all customer-facing data for their assigned customers and sites, invite standard users, and configure schedules. Cannot invite or manage other User Admins, create new customers, or change tariff plans.

### Standard User — Site Operators and Viewers

Read access to all data within their assigned site(s). Limited write access: own profile and preferences, device control actions (within the bounds Flex:Control allows), scheduling preferences within approved parameters, and support request submission. Cannot edit site configuration, customer records, or user accounts.

---

## Permission matrix

The table below defines what each role can do. **Edit** = create, update, delete. **View** = read only. **—** = no access.

### User & role management

| Action | Super Admin | Partner Admin | User Admin | Standard User |
|---|---|---|---|---|
| Invite Super Admin | Edit | — | — | — |
| Invite Partner Admin | Edit | — | — | — |
| Invite User Admin | Edit | Edit (within partner) | — | — |
| Invite Standard User | Edit | Edit (within partner) | Edit (within their customers) | — |
| Assign / change roles | Edit | Edit (within partner; cannot assign above own role) | — | — |
| Deactivate users | Edit | Edit (within partner) | Edit (Standard Users only, within their customers) | — |
| Reactivate users | Edit | Edit (within partner) | — | — |
| Resend invitation | Edit | Edit (within partner) | Edit (Standard Users only, within their customers) | — |
| Edit user name / email | Edit | Edit (within partner) | Edit (Standard Users only, within their customers) | — |
| Edit user scope / assignment | Edit | Edit (within partner; cannot widen beyond own scope) | — | — |
| View user list | All users | Partner users | Customer users | — |

### Customer & site data

| Action | Super Admin | Partner Admin | User Admin | Standard User |
|---|---|---|---|---|
| Create / delete customer | Edit | — | — | — |
| Edit customer name, sector | Edit | Edit (within partner) | Edit (within their customers) | — |
| Edit key contact (name, phone, email) | Edit | Edit (within partner) | Edit (within their customers) | — |
| Edit internal notes | Edit | Edit (within partner) | Edit (within their customers) | — |
| Edit partner assignment | Edit | — | — | — |
| Edit site name, address, ICP, GXP | Edit | Edit (within partner) | Edit (within their customers) | — |
| Create / delete site | Edit | — | — | — |
| View customer and site records | All | Partner only | Their customers only | Their sites only |

### Device & asset configuration

| Action | Super Admin | Partner Admin | User Admin | Standard User |
|---|---|---|---|---|
| Commission / decommission device | Edit | — | — | — |
| Edit device specs (PV, battery, inverter size) | Edit | View | View | — |
| Edit Edge device settings | Edit | — | — | — |
| Add / remove devices from a site | Edit | — | — | — |
| View device inventory | All | Partner only | Their customers only | Their sites only |

### Tariff & billing

| Action | Super Admin | Partner Admin | User Admin | Standard User |
|---|---|---|---|---|
| Create / edit tariff plans | Edit | — | — | — |
| Assign tariff plan to a site | Edit | — | — | — |
| View tariff plan assigned to a site | All | Partner only | Their customers only | Their sites only |
| Edit billing contacts | Edit | Edit (within partner) | Edit (within their customers) | — |

### Platform features

| Feature | Super Admin | Partner Admin | User Admin | Standard User |
|---|---|---|---|---|
| Flex:Portfolio | Full | Partner portfolio | Their customers | Their sites |
| Flex:Health | Full | Partner portfolio | — | — |
| Energy Dashboard | Full | Partner portfolio | Their customers | View |
| Flex:Load Monitoring | Full | Partner portfolio | Their customers | View |
| Flex:Control | Full | View | View | Trigger actions |
| Flex:Schedule | Full | Edit (within partner) | Edit (within their customers) | Edit own site schedules (within parameters) |
| Flex:Tariff | Full | View | View | View |
| Flex:Assure | Full | View | View | View |
| Flex:Simulator | Full | View | View | — |
| Flex:Insights | Full | View | View | — |
| Data Export | Full | Partner portfolio | Their customers | Their sites |

### Own profile

| Action | All roles |
|---|---|
| Edit name, email, password | Edit |
| Set notification preferences | Edit |
| View own activity log | View |

---

## Core features

### Admin console

A dedicated settings area accessible at `/admin`, visible only to Super Admin, Partner Admin, and User Admin (with scope-appropriate views). Four tabs: **Users**, **Customers**, **Sites**, **Devices** (Sites and Devices visible to Super Admin only in full; scoped views for lower roles as described below).

---

#### Users tab

Visible to Super Admin (all users), Partner Admin (partner users only), and User Admin (Standard Users within their assigned customers).

**Table columns**

| Column | Description |
|---|---|
| Name | Full name |
| Email | Email address |
| Role | Role badge: Super Admin / Partner Admin / User Admin / Standard User |
| Status | Active / Invited / Deactivated badge |
| Last login | Timestamp of most recent successful login, or "—" for invited / never logged in |
| Actions | Contextual actions (see below) |

Default sort: Role (Super Admin first) → Name. Search filters across name, email, and role.

**Contextual row actions**

| Action | Available when | Behaviour |
|---|---|---|
| Edit | Editor can edit that user's role (see permission matrix) | Opens Edit user modal |
| Resend invite | User status = Invited | Issues a new 24-hour invitation link; previous link is invalidated |
| Deactivate | User is Active or Invited; editor has permission | Opens confirmation. Account is suspended immediately. Data and audit history retained. |
| Reactivate | User is Deactivated; editor is Super Admin or Partner Admin | Opens confirmation. User can log in immediately with their previous role and scope. |

**Edit user modal**

Fields:
- **Full name** — text field, required.
- **Email address** — text field, required. Changing email triggers a re-verification for the new address.
- **Role** — select, limited to roles the editing admin can assign (cannot assign above own role).
- **Scope** — determines what data the user can access. Field appears and adapts based on the selected role:
  - Super Admin: no scope restriction; field hidden.
  - Partner Admin: partner selector (Super Admin can change which partner; Partner Admin cannot change their own partner).
  - User Admin: multi-select of customers within the admin's portfolio.
  - Standard User: multi-select of sites within the admin's scope.
- **Account section** — read-only: status badge, last login, member since.

On save: all changes are written immediately and logged to the audit trail (old value → new value for each changed field).

---

#### Customers tab

Visible to Super Admin (all customers), Partner Admin (partner portfolio), and User Admin (their assigned customers).

**Table columns**

| Column | Description |
|---|---|
| Customer | Customer name; may include a brief internal note excerpt |
| Sector | Industry sector |
| Key contact | Name and email of the primary contact person |
| Sites | Count of sites assigned to this customer |
| Partner | Partner name, or "Direct" if no partner (Super Admin only column) |
| Actions | Edit, View sites |

Default sort: Customer name (alphabetical). Search filters across name, sector, key contact name, and email.

**Row actions**

| Action | Available to | Behaviour |
|---|---|---|
| Edit | Super Admin, Partner Admin, User Admin | Opens Edit customer modal |
| View sites | Super Admin, Partner Admin, User Admin | Jumps to the Sites tab pre-filtered to this customer's sites |

**Edit customer modal**

Sections:
1. **Identity** — Customer name (text, required), Sector (select from defined list).
2. **Partner assignment** — Super Admin only. Assigns the customer to a partner organisation. Assigning a partner grants Partner Admins for that partner access to the customer.
3. **Key contact** — Name, phone, and email of the primary person for operational matters.
4. **Billing contact** — Name and email for invoice and billing communications.
5. **Internal notes** — Free text; not visible to the customer. Max 500 characters.

On save: all changes are written immediately and logged to the audit trail.

---

#### Sites tab

Visible to Super Admin (all sites), Partner Admin (partner portfolio), and User Admin (their assigned customers' sites).

**Table columns**

| Column | Description |
|---|---|
| Site name | Full site name; links to the site's Energy Dashboard |
| Customer | Customer name and sector tag |
| Partner | Partner name (Super Admin only; hidden for Partner Admin and below) |
| ICP | Electricity network ICP number |
| GXP | Grid exit point identifier |
| Address | Street address, suburb, region |
| Commissioned | Yes / No / Pending — whether the site has an active Edge device commissioned |
| Tariff plan | Name of the assigned tariff plan, or "—" if unassigned |
| Devices | Count of active devices at the site |
| Status | Site telemetry status: Online / Stale / Offline / Pending (sourced from Flex:Health signals) |

Default sort: Partner → Customer → Site name (alphabetical). All columns sortable.

**Filters and search**

- Free-text search across site name, customer name, ICP, and address.
- Filter by: Partner (Super Admin only), Customer, Sector, Commissioned status, Telemetry status.

**Super Admin actions**

| Action | Trigger | Behaviour |
|---|---|---|
| Create site | "New site" button (top right) | Opens a modal with required fields: site name, customer assignment, address, ICP, GXP. On save, site is created with status Pending. |
| Edit site | Edit icon on row, or click into site detail | Opens an edit panel with all site fields editable: name, address, ICP, GXP, customer assignment, partner assignment. Changes are written immediately and logged to the audit trail. |
| Assign tariff | "Assign tariff" action in row actions menu | Opens a picker modal listing all available tariff plans. Selecting a plan assigns it to the site and logs the change. |
| Commission site | "Commission" action (Pending sites only) | Marks the site as commissioned. Requires at least one device to be assigned. Triggers a confirmation step before completing. |
| Decommission site | "Decommission" action (active sites only) | Removes the site from active telemetry and marks it Offline. Requires explicit confirmation. All devices remain in inventory but are flagged as unassigned. |
| Delete site | "Delete" action in row actions menu | Permanently removes the site record. Only available on Pending (uncommissioned) sites. Requires typed confirmation ("delete [site name]"). Cannot delete a site with active devices or billing history. |
| Add / remove devices | "Manage devices" action | Opens the site's device inventory panel — see Devices tab behaviour below. |

**Partner Admin and User Admin**

Same table, scoped to their portfolio. Edit actions limited per permission matrix (no create/delete site, no tariff assignment, no commissioning). "Commission", "Decommission", and "Delete" actions are hidden.

---

#### Devices tab

Visible to **Super Admin only**. Partner Admin and User Admin do not have access to a Devices tab; device information for their scope is surfaced within the site detail view.

**Table columns**

| Column | Description |
|---|---|
| Device type | Category: Solar inverter / Battery / EV charger / Heat pump / Edge device / Other |
| Make / model | Manufacturer and model name |
| Serial number | Device serial number as recorded at commissioning |
| Site | Site the device is assigned to; "Unassigned" if not yet assigned |
| Customer | Customer of the assigned site |
| PV size (kWp) | Rated solar capacity; populated for solar inverters only |
| Battery capacity (kWh) | Usable battery capacity; populated for battery systems only |
| Inverter size (kW) | Rated inverter output; populated for inverter-type devices |
| Edge device ID | Unique identifier of the BC Edge unit; populated for Edge devices only |
| Last telemetry | Timestamp of most recent data received from this device |
| Status | Online / Offline / Fault / Unassigned |

Default sort: Status (Fault first) → Site → Device type. All columns except Serial number are sortable.

**Filters and search**

- Free-text search across device type, make/model, serial number, and site name.
- Filter by: Device type, Site, Customer, Status (Online / Offline / Fault / Unassigned).

**Super Admin actions**

| Action | Trigger | Behaviour |
|---|---|---|
| Commission device | "Commission device" button (top right) | Opens a multi-step modal: (1) select device type and enter make, model, serial number; (2) enter technical specs relevant to device type (PV size, battery capacity, inverter size, Edge device ID); (3) assign to a site (optional at this step — device can be commissioned as Unassigned and assigned later). On save, device is created and logged. |
| Edit device specs | Edit icon on row | Opens an edit panel for all technical specification fields: device type, make, model, serial number, PV size, battery capacity, inverter size, Edge device ID. Site assignment is not editable here (use "Reassign to site"). Changes are logged. |
| Edit Edge device settings | "Edge settings" action (Edge devices only) | Opens a panel for Edge-specific configuration: polling interval, connectivity parameters, firmware channel. These fields are restricted to Super Admin and not visible in the standard device edit panel. |
| Assign to site | "Assign to site" action (Unassigned devices) | Opens a site picker. Selecting a site links the device to that site and updates the site's device count. Logged to audit trail. |
| Reassign to site | "Reassign" action (assigned devices) | Same as Assign, with a confirmation step noting the device will be removed from its current site. |
| Remove from site | "Remove from site" action | Unlinks the device from its site. Device status becomes Unassigned. The site's device count decrements. Requires confirmation. Logged. |
| Decommission device | "Decommission" action | Removes the device from active telemetry. Device record is retained for audit purposes. Requires confirmation. If the device is currently assigned to a site, the site must be decommissioned first or the device removed from the site before decommissioning. |

**Device detail panel**

Clicking a device row opens a right-side panel showing:
- Full specification summary (all fields from the table plus any Edge-specific config).
- Assignment history — a chronological log of every site this device has been assigned to.
- Telemetry summary — last 24 hours of data received (or "No data" if Offline / Unassigned).
- Audit entries — all write actions against this device record, filtered from the main audit log.

---

#### BC Edge and SIM card management

BC Edge units are a specific subtype of device with an additional allocation layer. The full hierarchy is:

```
SIM card
└── BC Edge hardware unit
    └── Energy devices (solar inverter, battery, EV charger, heat pump)
        └── Site
            └── Customer
```

SIM cards are procured and owned by Blackcurrent. Each SIM is provisioned for 4G/LTE connectivity and allocated to exactly one BC Edge hardware unit. A BC Edge unit communicates telemetry for all energy devices at its assigned site.

**SIM card records**

A SIM inventory is maintained within the Devices tab. Each SIM record holds:

| Field | Description |
|---|---|
| ICCID | Unique SIM identifier (20 digits) |
| MSISDN | SIM phone number (for diagnostics) |
| Network | Carrier (e.g. Spark, One NZ, 2degrees) |
| Data plan | Plan tier and monthly data cap |
| Status | Active / Suspended / Unallocated |
| Allocated to | BC Edge serial number the SIM is installed in; "Unallocated" if in stock |
| Last seen | Timestamp of most recent network registration |

**SIM lifecycle**

| Step | Action | Who |
|---|---|---|
| Procure | New SIM added to inventory with Status = Unallocated | Super Admin |
| Allocate | SIM assigned to a specific BC Edge unit; ICCID recorded against the Edge device record | Super Admin |
| Activate | SIM is activated on network once Edge device is installed at site | Super Admin |
| Suspend | SIM suspended (site decommissioned or hardware fault); data stops billing | Super Admin |
| Reallocate | Suspended SIM unlinked from Edge unit and reassigned to a replacement unit | Super Admin |

**Edge device settings panel (extended)**

When a Super Admin opens Edge settings for a BC Edge unit, the panel includes a SIM section:
- **Allocated SIM** — ICCID and carrier of the SIM currently installed in the unit. A "Reallocate SIM" action unlinks the current SIM and opens a picker to select an unallocated SIM from inventory.
- **Connectivity status** — current 4G signal quality and last-seen timestamp from the network.
- **Polling interval** — how frequently the Edge unit sends telemetry (1 / 5 / 15 / 30 minutes).
- **Firmware channel** — Stable / Beta / Edge (preview).

**SIM inventory view**

A dedicated SIM Inventory sub-section is accessible from the Devices tab (filter: "SIMs"). It shows all SIMs in the Blackcurrent inventory with their status and allocation. Super Admin can add new SIMs to inventory, allocate/deallocate SIMs, and suspend/activate SIMs. This view is not accessible to Partner Admin, User Admin, or Standard User.

### User invitation flow

1. Admin enters the invitee's email address and selects their role (limited to roles the inviting admin can grant).
2. System sends a branded invitation email with a time-limited activation link (24 hours).
3. Invitee sets their password and is logged in directly to their scoped view.
4. Invitation shows as "Pending" in the user list until accepted. Admins can resend or cancel a pending invitation.

### Role scoping on first login

On first login, users are directed to the appropriate landing page for their role:
- Super Admin and Partner Admin → Flex:Portfolio (full or scoped).
- User Admin → Flex:Portfolio (scoped to their customers).
- Standard User → Energy Dashboard for their primary site.

Navigation items are rendered based on role — modules the user cannot access are hidden, not just greyed out.

### Audit log

Every write action performed by any user is logged with: timestamp (NZST), user identity, action type, object affected (customer/site/device/user), old value, new value. The log is immutable and not editable by any role including Super Admin. Filterable by date range, user, action type, and object. Exportable to CSV.

### Partner Admin branding

When a Partner Admin (or any user within a partner portfolio) is logged in, the platform applies the partner's brand: Flex Energy / Farmlands co-brand logo, and any partner-specific feature restrictions configured by Super Admin. This is controlled by the `data-brand` attribute already supported in the platform CSS system.

---

## Data requirements

| Data | Notes |
|---|---|
| User record | ID, name, email, hashed password, role, status, created at, last login, assigned scope (partner / customer / site IDs) |
| Role definition | Enumerated: super_admin, partner_admin, user_admin, standard_user |
| Partner record | ID, name, brand configuration, assigned customers |
| Invitation record | Token (hashed), invitee email, role, invited by, expiry, status (pending / accepted / expired) |
| Audit log entry | Timestamp, actor user ID, action, object type, object ID, before/after values |
| Session record | Token, user ID, created at, last active, IP address, user agent |
| Site record | ID, name, customer ID, partner ID, address, ICP, GXP, tariff plan ID, commissioned status, status |
| Device record | ID, device type, make, model, serial number, site ID (nullable), PV size kWp, battery capacity kWh, inverter size kW, edge device ID (FK to BC Edge record), status, commissioned at |
| BC Edge record | ID (serial / Edge device ID), SIM ICCID (FK to SIM record), site ID (nullable), firmware channel, polling interval, connectivity mode, status, last telemetry |
| SIM record | ICCID, MSISDN, carrier/network, data plan, status (active / suspended / unallocated), allocated edge device ID (nullable), activated at, last seen |

---

## Constraints and security

- **Least privilege by default.** New invitations default to Standard User. Roles must be explicitly elevated by an authorised admin.
- **No role escalation.** A user cannot grant a role equal to or above their own. A User Admin cannot make another User Admin.
- **Scope cannot be widened by the user.** A User Admin cannot add customers to their own scope — only Super Admin or Partner Admin can do this.
- **Session management.** Sessions expire after a configurable idle period (default: 8 hours). Re-authentication required for sensitive actions (role changes, user deactivation).
- **Invitation link expiry.** Invitation links expire after 24 hours and can only be used once. A new invitation must be issued if the link expires.
- **Audit log integrity.** The audit log must be append-only at the database level. No admin role — including Super Admin — can delete or modify log entries through the platform.
- **Data isolation.** Partner Admins must not be able to enumerate or access customer records outside their assigned portfolio, even via direct URL manipulation. All queries must be scoped server-side by the authenticated user's portfolio assignment.
- **Password policy.** Minimum 12 characters, no common passwords. Passwords are hashed (bcrypt or Argon2); never stored in plaintext or recoverable.

---

## Relationship to other modules

| Module | Relationship |
|---|---|
| **Flex:Health** | Super Admin and Partner Admin only. Surfaces site-level health signals; role scoping determines which sites are visible. |
| **Flex:Control** | Standard Users can trigger control actions but cannot change device configuration. Control actions are attributed to the triggering user in the audit trail. |
| **Flex:Schedule** | Standard Users can edit schedules within parameters defined by User Admin or Super Admin (e.g. can shift a schedule window but cannot disable device control entirely). |
| **All modules** | Navigation items are rendered conditionally based on role. Hidden items are not loaded, not just hidden in CSS. |

---

## Out of scope (this version)

- Single sign-on (SSO) / SAML integration — planned for enterprise customers; not in scope for initial build.
- Multi-factor authentication (MFA) — strongly recommended for Super Admin and Partner Admin accounts; implementation detail deferred to engineering.
- API key management — programmatic access for integrations is a separate capability.
- Fine-grained field-level permissions beyond the matrix above — the matrix defines object-level access; individual field exceptions (e.g. "can edit address but not ICP") add significant complexity and are deferred.
- Customer self-registration — all customer and user accounts are created by an authorised admin; there is no public sign-up flow.
