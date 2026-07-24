# Receipt Studio

A full-stack web app for designing **clearly-fictional** payment-receipt
mockups — for film and stage props, parody, UI design portfolios, and
educational demos. It is deliberately **not** a tool for producing
convincing "proof of payment": every receipt carries a permanent,
non-removable watermark and reads as a stylized prop, not a real bank or
wallet screenshot.

## Safety model

This category of tool is commonly abused to fake payment confirmations.
Receipt Studio is built so its output cannot plausibly pass as a genuine
transaction:

- **Permanent full-frame watermark.** Every preview and every export (PNG,
  JPG, PDF) is overlaid with a large, tiled, diagonal
  `FICTIONAL — FOR ENTERTAINMENT ONLY — NOT A REAL TRANSACTION` band across
  the whole receipt — not a corner badge that could be cropped out. It is
  baked into the same DOM subtree that gets rasterized on export, and it is
  not user-configurable or hideable.
- **Solid disclaimer footer** on every template, plus a QR code that links to
  a `/disclaimer` page stating the receipt is fictional.
- **Shareable links** (`/r/<data>`) render the same disclaimer banner above a
  read-only preview.

The watermark alternates dark/light rows so it stays legible on every
template background (near-black to near-white) and regardless of the
dashboard's own light/dark theme.

## Features

- **8 original templates** — Modern Green Wallet, Midnight Wallet, Neon
  Transfer, Business Payment, Digital Wallet Pro, Mobile Money, Instant
  Transfer, Premium Receipt — each with its own colors, layout, icons, and
  typography.
- **Full customization** — sender, recipient, amount, currency, date, time,
  transaction ID, reference number, note, status (Completed/Pending/Failed),
  optional avatar (drag & drop), payment method, receipt number, balance
  after payment.
- **Live animated preview** with template-switch transitions (Framer Motion).
- **Export** to PNG, JPG, and PDF.
- **Dashboard** — template gallery, live preview, dark mode, responsive
  layout, project management, autosave, undo/redo.
- **QR + shareable links** that both surface the fictional-receipt disclaimer.

## Accounts & cloud sync (Firebase)

Sign-in and cloud sync are powered by Firebase and are **optional** — with no
Firebase config the app runs fully as a local, guest-only experience.

- **Authentication** — email/password and Google Sign-In.
- **Firestore** — per-user project storage at `users/{uid}/projects/{id}`,
  with a live subscription so edits appear across devices in real time.
- **Firebase Storage** — uploaded avatars are stored under
  `users/{uid}/avatars/{id}`; the project document keeps only the URL (so it
  stays well under Firestore's 1 MB document limit).
- **Offline persistence** — Firestore's IndexedDB persistent cache
  (multi-tab) means reads/writes work offline and reconcile on reconnect.
- **Automatic cloud sync** — edits autosave (debounced) to the active
  backend; guests write to `localStorage`, signed-in users to Firestore.
- **Guest → cloud migration** — when a guest signs in, any locally-cached
  projects (and their avatars) are migrated up to Firestore once, then the
  local cache is cleared so the cloud becomes the single source of truth.
- **Project management** — rename, duplicate, archive/unarchive, delete, plus
  search and active/archived filtering.
- **Security rules** — see [`firestore.rules`](firestore.rules) and
  [`storage.rules`](storage.rules): a user can only read/write data under
  their own UID, project documents are schema-validated, and avatar uploads
  are constrained to images under 5 MB. (Avatar *files* are readable by URL so
  they render in shared/exported receipts; all account and project data in
  Firestore is strictly owner-scoped.)

### Architecture

- `src/lib/firebase/client.ts` — lazy, guard-railed Firebase init
  (`isFirebaseConfigured`); Firestore uses `persistentLocalCache`. Optional
  emulator wiring via `NEXT_PUBLIC_FIREBASE_USE_EMULATORS`.
- `src/lib/store.ts` — Zustand editor store: the current draft, undo/redo, and
  theme only (localStorage-persisted). It does **not** own the projects list.
- `src/components/projects/ProjectsProvider.tsx` — the sync layer. Reads the
  editor store, owns the projects list, routes reads/writes to localStorage
  (guest) or Firestore (signed-in), debounces autosave, uploads avatars, and
  runs the one-time guest→cloud migration.
- `src/components/auth/*` — `AuthProvider` (auth state), `AuthModal`
  (sign-in/up + Google), `UserMenu`.

## Tech stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS (glassmorphism, custom design tokens)
- Framer Motion (animations)
- React Hook Form (customization form)
- Firebase (Auth, Firestore, Storage) for accounts + cloud sync
- Zustand + persist (editor draft, undo/redo, theme; guest project cache)
- `html-to-image` (PNG/JPG capture), `jsPDF` (PDF), `qrcode` (QR)

Guests never send receipt data to a server (localStorage only). Shareable
links encode the receipt in the URL itself. Signed-in users' projects live in
their own Firestore space, governed by the security rules.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional: add Firebase config for sign-in
npm run dev                        # http://localhost:3000
```

Without `.env.local`, the app runs in guest-only mode (no sign-in UI). To
enable accounts, fill `.env.local` with your Firebase web app config (see the
comments in `.env.local.example`).

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

### Firebase setup

1. Create a Firebase project and register a **Web app**; copy its config into
   `.env.local`.
2. Enable **Authentication** providers: Email/Password and Google.
3. Create a **Firestore** database and a **Storage** bucket.
4. Deploy the security rules:
   ```bash
   npm install -g firebase-tools
   firebase deploy --only firestore:rules,storage
   ```
5. If avatars need to load in cross-origin exports, apply CORS to the bucket:
   ```bash
   gsutil cors set cors.json gs://<your-bucket>
   ```

### Local emulators

`firebase.json` is preconfigured for the Emulator Suite. Point the app at it
with `NEXT_PUBLIC_FIREBASE_USE_EMULATORS=true` in `.env.local`, then:

```bash
firebase emulators:start --only auth,firestore,storage --project demo-receipt-studio
```

## Original branding

All branding — the app icon/logo, color palette, and typography pairing — is
original and does not use any real company's logos, trademarks, or assets.
The templates are inspired by the general idea of digital wallets but do not
copy any real service.
