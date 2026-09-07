# Consultant Ledger v2

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TanStack](https://img.shields.io/badge/TanStack-Start%20%2B%20Router-FF4154)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success)

> Modern digital ledger for Brandex Law Associates — track consultant outstanding balances, trademark filings (TM numbers), payments, and notes with live KPIs, search, CSV export, and printable-style reports.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment & Scripts](#environment--scripts)
- [Data Model](#data-model)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
- [Suggested Improvements](#suggested-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

Consultant Ledger v2 replaces paper-based Brandex consultant index books with a responsive web application. It maintains per-consultant ledgers containing dues, payments, and notes, computes outstanding balances (stated vs live), and provides searchable indexes, KPI dashboards, and CSV export for accounting workflows.

Primary use cases:
- Daily tracking of consultant receivables for IP / trademark practice
- Quick lookup by ledger ID, name, folder number, TM number, or stage
- Export of the master index for offline review or import into spreadsheets

---

## Features

| Feature | Description |
|---------|-------------|
| **Consultant Index** | Sortable table with live outstanding, due, received, status badges |
| **Per-Ledger View** | Full entry history with running balance, add due/payment/note |
| **Search** | Cross-field search (name, ID, folder, TM, stage, details) |
| **Filters** | All / Due / Settled / Credit |
| **KPIs** | Total outstanding, open ledgers, entry count, credit summary |
| **Largest Dues** | Top outstanding consultants with visual bars |
| **CSV Export** | One-click download of the full index |
| **Restore Book** | Reset to original seeded Brandex data |
| **Company Footer** | Bank / IBAN / office details for statements |
| **Responsive UI** | Desktop table + mobile card list |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start + TanStack Router |
| UI | React 19, Radix UI, Tailwind CSS 4, Lucide icons |
| State | Zustand |
| Validation | Zod |
| Tables / Charts | TanStack Table, Recharts |
| Auth (optional) | Better Auth |
| Database (optional) | PGlite / PostgreSQL via Kysely |
| Build | Vite 8, Nitro |
| Deploy target | Vercel |

---

## Project Structure

```text
src/
├── components/          # Shell, dialogs, status badge, UI primitives
├── data/seed.json       # Original Brandex book data
├── lib/
│   ├── ledger.ts        # Balance, totals, search, KPIs, status helpers
│   ├── store.ts         # Zustand store (consultants, company, filters)
│   ├── types.ts         # Consultant, LedgerEntry, Company
│   ├── format.ts        # PKR formatting
│   ├── export.ts        # CSV generation
│   ├── auth/            # Optional Better Auth wiring
│   └── app-data/        # Optional server data layer
├── routes/
│   ├── index.tsx        # Main index + KPIs
│   ├── ledger.$id.tsx   # Individual ledger
│   ├── reports.tsx      # Aggregate reports
│   └── search.tsx       # Entry search
└── styles.css
```

---

## Installation

### Prerequisites

- Node.js 22+ (recommended)
- npm (comes with Node)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/0utLawzz/Consultant-Ledger-v2.git
cd Consultant-Ledger-v2

# 2. Install dependencies
npm install

# 3. Start development server (binds 0.0.0.0:8080)
npm run dev
```

Open the application at the URL shown by the development server (typically `http://localhost:8080`).

### Production Build

```bash
npm run build
npm run preview
```

---

## Environment & Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build + DB migrate |
| `npm run preview` | Serve production build |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Unit tests |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

Auth and database are **opt-in**. By default the application runs with local state (Zustand + seed data). Enable auth / DB only when multi-user or durable server storage is required.

---

## Data Model

```ts
type EntryKind = "due" | "payment" | "note";

type LedgerEntry = {
  id: string;
  date: string | null;
  folderNo: string;
  stage: string;
  tmNo: string;
  details: string;
  due: number;
  received: number;
  kind: EntryKind;
};

type Consultant = {
  id: string;
  name: string;
  city?: string;
  phone?: string;
  notes?: string;
  statedBalance: number | null;  // from paper index
  live?: boolean;                // true = compute from entries
  entries: LedgerEntry[];
};
```

Outstanding balance logic:
- If `live === true` → sum of (due − received)
- Else if `statedBalance` is set → use stated value
- Else → fall back to computed balance

---

## Usage Guide

1. **Browse** the index — sort by ledger ID, name, entries, due, received, or balance.
2. **Filter** by status (Due / Settled / Credit) or search across all fields.
3. **Open a ledger** to view the full history and running balance.
4. **Add entries** (due, payment, or note) via the dialog.
5. **Export** the current index as CSV for accounting systems.
6. **Restore book** to discard local edits and return to the seeded Brandex data.

---

## Deployment

The project is configured for **Vercel** (see `.vercel` directory).  
Typical flow:

```bash
npm run build
# Deploy the output via Vercel CLI or GitHub integration
```

Ensure any required environment variables (if auth/DB are enabled) are set in the Vercel project settings.

---

## Suggested Improvements

| Priority | Suggestion |
|----------|------------|
| High | Add formal LICENSE file (MIT recommended) |
| High | Persist edits beyond localStorage / Zustand if multi-device use is required |
| Medium | Print / PDF statement generation for individual consultants |
| Medium | Bulk import from Excel / CSV of the paper book |
| Medium | Audit log of balance changes |
| Low | Dark mode toggle |
| Low | Multi-currency support |

### Potential Issues / Bugs Observed from Code Review

1. **Large seed file** — `src/data/seed.json` is very large; consider splitting or lazy-loading for faster first paint.
2. **No README / community files originally** — addressed by this commit.
3. **Auth / DB off by default** — correct for single-user ledger, but document clearly that enabling them requires following the auth skill / migrations.
4. **Restore book confirmation** — uses browser `confirm()`; a custom modal would improve UX consistency.
5. **CSV export** — currently exports index only; adding per-ledger export would be useful.

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow and pull-request guidelines.  
Security issues should be reported according to [SECURITY.md](SECURITY.md).

---

## License

MIT License — see [LICENSE](LICENSE) (to be added).

---

## Author

**Nadeem (OutLawZ)**  
Custom Automation & Practice-Management Tools  

- GitHub: [0utLawzz](https://github.com/0utLawzz)  
- Contact: net2outlawzz@gmail.com  

---

*Built for Brandex Law Associates — Islamabad*
