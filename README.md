# Ritual — Habit tracker

React + Vite habit tracker with GSAP entrance motion, Lenis smooth scrolling, and ReactDrops Glass Slab Logo.

## StackBlitz setup

1. Create a **React + Vite** project.
2. Upload/copy the contents of this folder into the project root. `package.json` must be directly in the root.
3. In the StackBlitz terminal, run `npm install`.
4. Install the requested Glass Slab Logo component:

   ```bash
   npx shadcn@latest add https://reactdrops.dev/r/glass-slab-logo.json
   ```

   `components.json` and the Vite/TypeScript `@` alias are already configured, so you should not need to run `shadcn init`. Confirm the installer creates the component under `src/components/`; if it chooses another folder, adjust the import in `src/App.tsx`.

5. Start the site with `npm run dev`.
6. Check the production build with `npm run build`.

## Glass logo settings

`src/App.tsx` retains your requested GlassSlabLogo settings: 17 slabs, detailed render mode, thickness 0.026, depth 1.25, elevation 38, IOR 1.34, density 0.25, reflectivity 1.55, logo scale 0.76, colors and background settings. Height corrected to 520px.

Ray tracing, progressive sampling, reduced-motion behavior and visibility pausing are supplied by the ReactDrops component after installation.

## Features

- Add, complete and delete habits.
- Completion percentage and streak display.
- Clickable weekly consistency bars.
- Browser local-storage persistence.
- Responsive desktop/mobile layout.
- GSAP hero entrance animation.
- Lenis smooth scrolling, skipped when reduced motion is requested.

## Palette

- Titanium grey: `#bcbcb5` / `#c4c4be`
- Washed orange: `#d98d63`
- Lime-green buttons: `#c7f36b`

## Before a commercial launch

This is a front-end starter, not a multi-user SaaS. Add secure authentication, a hosted database, subscription billing, privacy/terms pages, account export/deletion and backups before accepting customers. Review component and third-party asset licenses before deployment.
