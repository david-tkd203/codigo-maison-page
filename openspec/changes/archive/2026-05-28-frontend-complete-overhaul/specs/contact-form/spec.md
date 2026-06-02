# Delta for contact-form

## Purpose

The Contact form component currently sends hardcoded empty strings for `whatsapp` and `email`, uses `project_type` values that do NOT match the backend `Lead.PROJECT_TYPES` choices, and omits the `sector` field from the POST payload. This delta brings the frontend form into alignment with the backend contract, collects missing contact fields, and improves validation and UX feedback.

## ADDED Requirements

### Requirement: Email and WhatsApp Field Collection

The system MUST render two new input fields in `Contact.jsx`: one for email (`type="email"`, `name="email"`) and one for WhatsApp (`type="tel"`, `name="whatsapp"`). Both fields SHALL be included in the form state object and sent in the POST payload to `/api/leads/`. The fields SHOULD be placed in the second form row, after `company` and before `sector`.

#### Scenario: User fills all contact fields

- GIVEN a visitor on the Contact section
- WHEN they enter name, company, email, whatsapp, sector, project type, budget, and message
- THEN the POST body contains `email` and `whatsapp` with the entered values
- AND the backend receives a complete payload

#### Scenario: User leaves optional contact fields empty

- GIVEN a visitor who only fills required fields
- WHEN they submit without email or whatsapp
- THEN the POST body sends empty strings for `email` and `whatsapp`
- AND the backend accepts the payload (fields remain optional)

### Requirement: Sector Field Forwarding

The system MUST include the `sector` value (already collected by the existing `<select name="sector">`) in the POST payload to `/api/leads/` under the key `sector`. The `sector` choices SHALL remain: `logistica`, `salud`, `gastronomia`, `tecnologia`, `otro`.

#### Scenario: User selects a sector and submits

- GIVEN a visitor who selects "Logística" from the sector dropdown
- WHEN they submit the form
- THEN the POST body contains `"sector": "logistica"`

### Requirement: Project Type Alignment

The system MUST change the `project_type` select options and their `value` attributes to match the backend `Lead.PROJECT_TYPES` exactly: `logistica`, `restaurante`, `salud`, `otro`. The display labels MAY remain descriptive (e.g., "Logística", "Restaurante / Food", "Salud", "Otro / Consultoría"). The form MUST NOT send values such as `web`, `app-movil`, `erp`, or `consultoria`.

#### Scenario: User selects a project type

- GIVEN a visitor who selects "Restaurante / Food" from the project type dropdown
- WHEN they submit the form
- THEN the POST body contains `"project_type": "restaurante"`

#### Scenario: Backend receives aligned payload

- GIVEN the backend `Lead` model with `PROJECT_TYPES = [('logistica', 'Logística'), ('restaurante', 'Restaurante'), ('salud', 'Salud'), ('otro', 'Otro')]`
- WHEN the frontend submits `"project_type": "restaurante"`
- THEN the backend accepts and stores the value without validation errors

### Requirement: Email and Phone Validation

The system MUST validate the email field using a standard email regex before submission. The system MUST validate the WhatsApp field to contain only digits, spaces, and the `+` prefix (optional). If validation fails, the system SHALL display the toast error with a specific message and prevent the fetch call.

#### Scenario: Invalid email format

- GIVEN a visitor enters "not-an-email" in the email field
- WHEN they click submit
- THEN the toast shows "Ingresá un email válido."
- AND the form does NOT send a network request

#### Scenario: Invalid phone format

- GIVEN a visitor enters "abc123" in the WhatsApp field
- WHEN they click submit
- THEN the toast shows "Ingresá un número de WhatsApp válido."
- AND the form does NOT send a network request

### Requirement: Visual Success and Error States

The system MUST apply distinct visual styles to the toast notification for success versus error. The success toast SHALL use a green-themed style (`bg-oil text-white border-l-4 border-electric`). The error toast SHALL use a red-themed style (`bg-red-900 text-white border-l-4 border-red-500`). The toast MUST include an accessible `role="status"` for success and `role="alert"` for error.

#### Scenario: Successful submission

- GIVEN a valid form submission that returns HTTP 201/200
- WHEN the response resolves
- THEN a green-themed toast appears with "Recibimos tu mensaje. Te contactaremos a la brevedad."

#### Scenario: Network error

- GIVEN a submission that fails with HTTP 500 or network timeout
- WHEN the catch block executes
- THEN a red-themed toast appears with "Error al enviar. Escribinos a hola@codigomaison.com"

## MODIFIED Requirements

### Requirement: Form State Initialization

The `initial` state object in `Contact.jsx` MUST be extended to include `email: ''` and `whatsapp: ''`. The existing fields (`name`, `company`, `sector`, `projectType`, `budget`, `message`) SHALL remain unchanged.

(Previously: initial state only contained `name`, `company`, `sector`, `projectType`, `budget`, `message`)

#### Scenario: Form reset after success

- GIVEN a successful submission
- WHEN the success handler runs
- THEN `setForm(initial)` resets ALL fields including email and whatsapp to empty strings

## REMOVED Requirements

### Requirement: Disallowed project_type values

(Reason: The backend `Lead.PROJECT_TYPES` does not include `web`, `app-movil`, `erp`, or `consultoria`. These values cause validation errors or silent data loss.)

---

## Acceptance Criteria

- [ ] `Contact.jsx` contains `<input name="email" type="email" />` and `<input name="whatsapp" type="tel" />`
- [ ] The POST payload to `/api/leads/` includes `email`, `whatsapp`, `sector`, and `project_type` with backend-aligned values
- [ ] `projectType` select options map exactly to `logistica`, `restaurante`, `salud`, `otro`
- [ ] Invalid email or phone triggers a client-side toast and blocks submission
- [ ] Success and error toasts have visually distinct, accessible styling
- [ ] `pnpm lint` reports zero errors in `Contact.jsx`

## Files Affected

| File | Change |
|------|--------|
| `src/components/Contact.jsx` | Add fields, fix payload, add validation, refactor inline `<style>` to Tailwind |
| `src/hooks/useScrollReveal.js` | Removed (replaced by motion) — no direct impact on Contact but noted |
