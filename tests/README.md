# End-to-end tests

This project includes Playwright tests for critical website journeys:

- Mobile navigation open/close (incl. Escape) and section navigation
- Gallery lightbox open, next/previous and keyboard close flow
- Presence and validity of key contact/directions actions
- Menu explorer search, Veg-only and category filtering
- Featured-card → menu filtering, visit-planner WhatsApp enquiry
- `/api/health` JSON behaviour and food images loading

## Run locally

1. Install browser binaries (once):

```bash
npx playwright install
```

2. Run the tests — a dev server is started automatically and reused if
   one is already running on port 3000:

```bash
npm test
```
