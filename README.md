# split-bill

Split restaurant bills without the awkward math. Assign items to people, split shared dishes, add tax — get a clean breakdown instantly. No backend, no login, works in the browser.

## stack

React, Zustand, Vite

## running locally

```bash
git clone https://github.com/YOUR_USERNAME/split-bill.git
cd split-bill
npm install
npm run dev
```

## how it works

State lives in a single Zustand store — `people`, `items`, `assignments`, `taxPercent`. Every component reads directly from the store; no prop drilling. The persist middleware syncs everything to localStorage automatically.

Sharing works by encoding the full store state as base64 into the URL. Anyone who opens the link gets the exact same bill loaded client-side — no server involved.

Tax is distributed proportionally: each person's tax = their subtotal / bill subtotal * total tax.

## structure

```
src/
├── components/
│   ├── people/        PeoplePanel, PersonCard
│   ├── bill/          BillPanel, BillItem
│   ├── assign/        AssignPanel
│   ├── summary/       SummaryPanel, ShareButton
│   └── ui/            Button, Input, Avatar
├── store/             useBillStore.js
└── utils/             splitCalculator.js, urlEncoder.js
```

## license

MIT