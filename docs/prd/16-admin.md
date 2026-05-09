# PRD: Flex Platform — Admin & Access Control

**Status:** Planned

---

## Overview

The Flex Platform Admin module defines how users are provisioned, what they can see, and what they can change. It introduces four distinct access tiers — Super Admin, Partner Admin, User Admin, and Regular User — and the management interfaces that let authorised users control who has access to which customers, sites, and features.

---

## Problem statement

As the Flex Platform scales across direct Blackcurrent customers and Flex Energy rural customers (via Farmlands), access control becomes a critical operational and commercial requirement. Currently there is no structured mechanism for:

- Inviting customer or partner users to the platform with defined permissions.
- Preventing regular users from making changes they shouldn't (device configuration, tariff settings, user management).
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

Scoped to a defined subset of customers within a partner or direct Blackcurrent relationship. Typically the energy manager or facilities administrator at a multi-site customer, or a reseller managing a small book of accounts. Can edit all customer-facing data for their assigned customers and sites, invite regular users, and configure schedules. Cannot invite or manage other User Admins, create new customers, or change tariff plans.

### Regular User — Site Operators and Viewers

Read access to all data within their assigned site(s). Limited write access: own profile and preferences, device control actions (within the bounds Flex:Control allows), scheduling preferences within approved parameters, and support request submission. Cannot edit site configuration, customer records, or user accounts.

---

## Permission matrix

The table below defines what each role can do. **Edit** = create, update, delete. **View** = read only. **—** = no access.

### User & role management

| Action | Super Admin | Partner Admin | User Admin | Regular User |
|---|---|---|---|---|
| Invite Super Admin | Edit | — | — | — |
| Invite Partner Admin | Edit | — | — | — |
| Invite User Admin | Edit | Edit (within partner) | — | — |
| Invite Regular User | Edit | Edit (within partner) | Edit (within their customers) | — |
| Assign / change roles | Edit | Edit (within partner; cannot assign above own role) | — | — |
| Deactivate users | Edit | Edit (within partner) | Edit (Regular Users only, within their customers) | — |
| View user list | All users | Partner users | Customer users | — |

### Customer & site data

| Action | Super Admin | Partner Admin | User Admin | Regular User |
|---|---|---|---|---|
| Create / delete customer | Edit | — | — | — |
| Edit customer name, sector, contacts | Edit | Edit (within partner) | Edit (within their customers) | — |
| Edit site name, address, ICP, GXP | Edit | Edit (within partner) | Edit (within their customers) | — |
| Create / delete site | Edit | — | — | — |
| View customer and site records | All | Partner only | Their customers only | Their sites only |

### Device & asset configuration

| Action | Super Admin | Partner Admin | User Admin | Regular User |
|---|---|---|---|---|
| Commission / decommission device | Edit | — | — | — |
| Edit device specs (PV, battery, inverter size) | Edit | View | View | — |
| Edit Edge device settings | Edit | — | — | — |
| Add / remove devices from a site | Edit | — | — | — |
| View device inventory | All | Partner only | Their customers only | Their sites only |

### Tariff & billing

| Action | Super Admin | Partner Admin | User Admin | Regular User |
|---|---|---|---|---|
| Create / edit tariff plans | Edit | — | — | — |
| Assign tariff plan to a site | Edit | — | — | — |
| View tariff plan assigned to a site | All | Partner only | Their customers only | Their sites only |
| Edit billing contacts | Edit | Edit (within partner) | Edit (within their customers) | — |

### Platform features

| Feature | Super Admin | Partner Admin | User Admin | Regular User |
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

A dedicated settings area accessible at `/admin`, visible only to Super Admin, Partner Admin, and User Admin (with scope-appropriate views). Sections:

- **Users** — list of all users in scope, their role, status (active / invited / deactivated), and last login.
- **Customers** — list of customers in scope with site counts, User Admin assignments, and data completeness indicators.
- **Sites** — list of sites in scope with commissioning status, assigned tariff, and device count.
- **Audit log** — filterable record of all write actions taken within the admin's scope.

### User invitation flow

1. Admin enters the invitee's email address and selects their role (limited to roles the inviting admin can grant).
2. System sends a branded invitation email with a time-limited activation link (24 hours).
3. Invitee sets their password and is logged in directly to their scoped view.
4. Invitation shows as "Pending" in the user list until accepted. Admins can resend or cancel a pending invitation.

### Role scoping on first login

On first login, users are directed to the appropriate landing page for their role:
- Super Admin and Partner Admin → Flex:Portfolio (full or scoped).
- User Admin → Flex:Portfolio (scoped to their customers).
- Regular User → Energy Dashboard for their primary site.

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
| Role definition | Enumerated: super_admin, partner_admin, user_admin, regular_user |
| Partner record | ID, name, brand configuration, assigned customers |
| Invitation record | Token (hashed), invitee email, role, invited by, expiry, status (pending / accepted / expired) |
| Audit log entry | Timestamp, actor user ID, action, object type, object ID, before/after values |
| Session record | Token, user ID, created at, last active, IP address, user agent |

---

## Constraints and security

- **Least privilege by default.** New invitations default to Regular User. Roles must be explicitly elevated by an authorised admin.
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
| **Flex:Control** | Regular Users can trigger control actions but cannot change device configuration. Control actions are attributed to the triggering user in the audit trail. |
| **Flex:Schedule** | Regular Users can edit schedules within parameters defined by User Admin or Super Admin (e.g. can shift a schedule window but cannot disable device control entirely). |
| **All modules** | Navigation items are rendered conditionally based on role. Hidden items are not loaded, not just hidden in CSS. |

---

## Out of scope (this version)

- Single sign-on (SSO) / SAML integration — planned for enterprise customers; not in scope for initial build.
- Multi-factor authentication (MFA) — strongly recommended for Super Admin and Partner Admin accounts; implementation detail deferred to engineering.
- API key management — programmatic access for integrations is a separate capability.
- Fine-grained field-level permissions beyond the matrix above — the matrix defines object-level access; individual field exceptions (e.g. "can edit address but not ICP") add significant complexity and are deferred.
- Customer self-registration — all customer and user accounts are created by an authorised admin; there is no public sign-up flow.
