# Tempest UI Breathing-Room Patch

This bundle makes the Crafting page roomier (bigger item names, smaller mats, two-line min rows)
and gives you a **global** way to widen ALL pages.

## What's included
- `src/pages/Crafting.tsx`: roomier spacing, larger title and names, smaller mats, flavortext line.
- `src/lib/wowhead.ts`: same helper (items + spells).
- `src/styles/site-tweaks.css`: new global utilities to widen the content area and add padding.

## Make ALL pages wider (one line)
Locate your main page wrapper (where page content is rendered). Add the `site-wrap` class to that container:

```tsx
<div className="site-wrap">
  {/* your page content */}
</div>
```

If you already have something like `max-w-5xl`, you can replace it with `site-wrap`,
or combine them (but `site-wrap` already sets `max-w-7xl` + nice padding).

### Optional niceties
- Wrap vertical sections in `site-stack` to add consistent spacing between blocks.
- Wrap boxes in `site-card` for a padded, rounded, elevated look.

## Run it
1. Drop this `src/` into your project (overwrite files).
2. Ensure your Tailwind build includes `src/styles/site-tweaks.css` (import it in your `main.tsx` or global CSS once):
   ```ts
   import './styles/site-tweaks.css'
   ```
3. `npm run dev`
