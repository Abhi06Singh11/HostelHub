# StaySync Hostel Management System

StaySync is a comprehensive, production-ready enterprise platform designed to manage the student housing ecosystem. It orchestrates interactions between Super Admins, Property Owners, Contractors, Students, and Admission Agents.

## Key Features

- **Multi-Role Governance**: Tailored dashboards for Admin, Contractor, Owner, Student, and Agent roles.
- **Operational Intelligence**: Real-time tracking of occupancy, remittances, and facility maintenance.
- **Verification Gateway**: Independent, audit-logged flows for Government ID and Police Verification.
- **Progressive Onboarding**: Seamless profile completion for students starting with simple Gmail authentication.
- **Asset Management**: Full lifecycle management of building assets, lease agreements, and CAPEX projects.
- **Support Desk**: Integrated ticketing system for rapid-response maintenance and complaints.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Shadcn UI, Tailwind CSS
- **Icons**: Lucide React
- **Persistence**: Firebase Firestore (Production-ready)
- **Authentication**: Firebase Auth
- **AI Engine**: Genkit (Google Gemini)

## Getting Started

1.  **Identity Selector**: Access the root (`/`) to select your administrative role.
2.  **Dashboards**:
    *   `/sa`: Super Admin - Platform Governance
    *   `/contractor`: Facility Operations & Student Management
    *   `/owner`: Property Estate & Rental Oversight
    *   `/student`: Personal Residency & Payment Portal
    *   `/agents`: Referral Pipeline & Matchmaking

## Development

Run the development node:
```bash
npm run dev
```

Sync AI infrastructure:
```bash
npm run genkit:dev
```

---
© 2026 STAYSYNC CORE. GLOBAL GOVERNANCE.
