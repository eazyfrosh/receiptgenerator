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
  layout, recent projects, autosave, undo/redo.
- **QR + shareable links** that both surface the fictional-receipt disclaimer.

## Tech stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS (glassmorphism, custom design tokens)
- Framer Motion (animations)
- React Hook Form (customization form)
- Zustand + persist (state, autosave, undo/redo, recent projects)
- `html-to-image` (PNG/JPG capture), `jsPDF` (PDF), `qrcode` (QR)

State is persisted client-side in `localStorage` (autosave, recent projects,
theme). No receipt data is sent to a server; shareable links encode the
receipt in the URL itself.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Original branding

All branding — the app icon/logo, color palette, and typography pairing — is
original and does not use any real company's logos, trademarks, or assets.
The templates are inspired by the general idea of digital wallets but do not
copy any real service.
