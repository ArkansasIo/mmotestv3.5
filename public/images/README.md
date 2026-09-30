# Eldoria Image Assets

This directory contains static image assets served by Vite from the public root. A file at `public/images/example.webp` is referenced by the app as `/images/example.webp`.

## Asset Guidance

- Use descriptive, stable filenames tied to the realm, character, item, or interface area.
- Prefer optimized WebP or AVIF for raster artwork; keep source art separately if the workflow needs it.
- Provide meaningful alternative text when an image conveys information. Mark purely decorative images accordingly in the component.
- Check crop, contrast, and legibility at narrow and wide viewport sizes.
- Confirm usage rights before adding art, maps, emblems, or fonts.

The `ui/` folder groups interface-oriented imagery. Keep game-world art and interface assets clearly named so they can be located without relying on undocumented legacy templates.
