# VaakuWatch — Frontend (Stage 1)

"Every Manifesto. Every Promise. Every Outcome."

This is the **frontend scaffold** for VaakuWatch: an Apple/Linear-style dark UI for
exploring Tamil Nadu election manifesto promises.

## What's included in this stage

- **Design system**: black/near-black background, glassmorphism cards, red accent,
  Inter + JetBrains Mono, Tailwind config with reusable tokens (`tailwind.config.js`,
  `src/index.css`)
- **Routing**: React Router with `/`, `/promises`, `/promise/:id`
- **Pages**:
  - `Home` — hero, animated stat counters, featured insights, recent manifestos,
    fulfillment overview (pie chart), party performance (bar chart), CTA
  - `PromiseExplorer` — search, filter (party / year / category / status), sort,
    responsive promise grid
  - `PromiseDetail` — full promise view with evidence/sources/related promises
- **Components**: `Navbar`, `Footer`, `PromiseCard`, `StatusBadge`, `AnimatedCounter`,
  `SectionHeading`
- **Charts**: Recharts (pie + bar), animated with Framer Motion on scroll

Nav items for Manifesto Archive, Compare Parties, Analytics, and Timeline are shown
in the navigation as "soon" placeholders for the next build stages.

## Running it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## About the data

`src/data/promises.js`, `src/data/manifestos.js`, and `src/data/parties.js` contain a
**small sample dataset** (16 promises, 4 manifestos, 6 parties) so the UI, charts, and
filters render realistically.

Every entry has:
- `evidence: []` and `sourceLinks: []` — intentionally empty
- `verified: false` — flags that the status hasn't been independently checked

This is **not** a verified record of real promise outcomes. Before this becomes a
public-facing platform, each entry needs:
1. A primary source (government order, official scheme page, news article)
2. A verification pass against that source
3. `verified: true` once checked

The eventual admin dashboard (a later build stage) is where this data entry and
verification workflow will live, backed by the Express + MongoDB API.

## Next stages

- Backend: Express API + MongoDB schemas (Party, Election, Manifesto, Promise,
  Evidence, User) + JWT auth
- Manifesto Archive page (PDF preview/download)
- Party Comparison page (radar charts)
- Analytics Dashboard (line/area/heatmap)
- Timeline page
- Admin Dashboard (CRUD + auth)
