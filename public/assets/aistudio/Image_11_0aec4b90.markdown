---
name: Warm Earth & Onsen Oasis
colors:
  surface: '#fdf9f3'
  surface-dim: '#dddad4'
  surface-bright: '#fdf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ed'
  surface-container: '#f1ede7'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e6e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#514440'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0ea'
  outline: '#84746f'
  outline-variant: '#d6c2bd'
  surface-tint: '#835244'
  primary: '#714436'
  on-primary: '#ffffff'
  primary-container: '#8d5b4c'
  on-primary-container: '#ffe1d8'
  inverse-primary: '#f7b8a5'
  secondary: '#17677a'
  on-secondary: '#ffffff'
  secondary-container: '#a3e7fd'
  on-secondary-container: '#1b697d'
  tertiary: '#315832'
  on-tertiary: '#ffffff'
  tertiary-container: '#497149'
  on-tertiary-container: '#c5f3c1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#f7b8a5'
  on-primary-fixed: '#331107'
  on-primary-fixed-variant: '#673b2e'
  secondary-fixed: '#b1ebff'
  secondary-fixed-dim: '#8cd0e6'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5e'
  tertiary-fixed: '#c1eebc'
  tertiary-fixed-dim: '#a5d2a2'
  on-tertiary-fixed: '#002106'
  on-tertiary-fixed-variant: '#284f2a'
  background: '#fdf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e6e2dc'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style
The design system embodies the serene, grounded, and inherently chill temperament of the capybara. Built for an affectionate community of animal spotters, urban explorers, and wildlife sanctuaries, the experience conveys calm delight, safety, and natural camaraderie.

The aesthetic fuses modern Japanese lifestyle minimalism with tactile warmth. It rejects cold tech-neutral palettes in favor of organic earthiness, soothing hot-spring teals, and matcha-tinted grassy tones. Surfaces feel plush, welcoming, and relaxed—avoiding rigid visual tension or hyperactive alerts. Visual balance is preserved through generous spatial padding, tactile soft-cornered geometry, and clean, high-legibility typography designed for effortless outdoor readability.

## Colors
The palette evokes an outdoor onsen retreat nestled in sunlit meadows:

- **Primary (`#8D5B4C`)**: Caramel Fur / Earth Brown. Anchors primary actions, core brand identity, and dominant navigational elements. Supported by deep roast (`#6D4336`) for active and hover states.
- **Secondary (`#3B8296`)**: Onsen Pool Teal. Represents water sources, tracking status, location pings, and calm verification states. Paired with soft hot-spring mist (`#E0F2F1`) for tonal pill containers and highlighted active badges.
- **Tertiary (`#588157`)**: Meadow Matcha Green. Conveys environmental safety, pasture markers, active sightings, and healthy capybara habitats. Paired with fresh pasture tint (`#E9F5EC`) for low-contrast statuses.
- **Neutral Background (`#FAF6F0` / `#F3ECE2`)**: Warm Sand and Steamed Rice Cream. Replaces harsh sterile white with a gentle, glare-resistant background ideal for outdoor mobile reading.
- **Text & Surface Contrast (`#2C2623`)**: Dark Roasted Espresso. Guarantees WCAG AAA compliance across all neutral canvas surfaces while maintaining soft organic warmth rather than synthetic stark black.

## Typography
Plus Jakarta Sans provides the exact marriage of contemporary geometric balance and friendly, humanized terminal shapes required for this design system. Its generous x-height and open apertures prevent visual fatigue during long field use.

- **Headlines**: Set in bold to extra-bold weights with tightened negative tracking to establish a compact, friendly punch without appearing aggressive.
- **Body Text**: Tuned for maximum legibility over warm cream tones using regular weight (`400`) and relaxed line-height ratios (1.4–1.5x) to prevent ocular strain in ambient lighting.
- **Labels & Badges**: Set in semibold to bold weights with slight positive letter spacing to maintain crisp character recognition within compact mobile chips, map pins, and bottom tabs.

## Layout & Spacing
The layout relies on a mobile-first fluid grid optimized for thumb-reach and single-handed interaction.

- **Mobile Viewport (< 600px)**: 4-column fluid layout with `1rem` margins and `0.75rem` column gutters. Critical interactive controls, bottom floating action buttons, and sighting cards prioritize safe bottom-screen reachability.
- **Tablet / Expanded Viewport (600px - 1024px)**: 8-column layout with `1.5rem` margins and `1rem` gutters. Map and observation logs reflow into split-view orientation.
- **Desktop / Web Dashboard (> 1024px)**: 12-column layout capped at a maximum width container of `1200px`, centered with fluid auto-margins.
- **Rhythm Principle**: Internal element spacing strictly abides by an 8-point system (represented via tokens from `0.25rem` up to `2.25rem`), keeping visual rhythm coherent and predictably cushioned.

## Elevation & Depth
Depth avoids synthetic dark dropshadows. Instead, elevation uses warm ambient light scattering that feels like natural afternoon sunshine:

- **Surface Tier 0 (Base)**: `#FAF6F0` (Warm Sand Canvas).
- **Surface Tier 1 (Cards, Floating Sheets)**: Pure White `#FFFFFF` or elevated Sand `#FFFFFF` paired with an ambient shadow: `0 4px 16px -2px rgba(109, 67, 54, 0.08), 0 2px 6px -1px rgba(109, 67, 54, 0.04)`. The shadow is tinted with warm caramel brown rather than cold black.
- **Surface Tier 2 (Floating Action Bars & Map Controls)**: `#FFFFFF` paired with an elevated ambient shadow: `0 8px 24px -4px rgba(109, 67, 54, 0.12), 0 4px 10px -2px rgba(109, 67, 54, 0.06)`.
- **Surface Tier 3 (Modals & Bottom Drawers)**: High-altitude layered shadow: `0 16px 36px -6px rgba(44, 38, 35, 0.16)`. Accompanied by a soft backdrop dim of `rgba(44, 38, 35, 0.45)` with a 4px ambient blur.
- **Tonal Borders**: Cards incorporate a subtle structural inner border `1px solid rgba(141, 91, 76, 0.08)` to maintain edge crispness across low-brightness mobile screens.

## Shapes
The shape philosophy is built on pill forms and ultra-rounded corners (`roundedness: 3`), echoing the round, cuddly physique of a capybara.

- **Cards & Bottom Sheets**: Generously rounded corners (`24px` to `32px` / `rounded-2xl` to `rounded-3xl`), evoking tactile softness and physical cushions.
- **Buttons, Tags & Input Fields**: Fully rounded pill shapes (`9999px`), ensuring safe touch targets and zero sharpness.
- **Media & Avatar Framing**: Capybara sighting photos and user avatars use `20px` continuous corner smoothing, keeping the gallery friendly and natural.

## Components

- **Buttons**:
  - *Primary*: Pill-shaped, background `#8D5B4C`, label `#FFFFFF` in `label-lg`. Active tap scale `0.97` with background stepping to `#6D4336`.
  - *Secondary (Onsen Mode)*: Pill-shaped, background `#E0F2F1`, text `#3B8296`, active hover tint `#CCEBEA`.
  - *Tertiary / Ghost*: Transparent background, label `#8D5B4C`, border `1.5px solid rgba(141, 91, 76, 0.2)`.

- **Pill Chips & Filter Tags**:
  - Unselected: Sand cream background (`#F3ECE2`), text `#2C2623`, padding `8px 16px`, fully rounded pill shape.
  - Selected (Location / Status): Matcha green (`#588157`) or Onsen teal (`#3B8296`) with crisp white label and subtle inner glow.

- **Cards (Sighting & Profile)**:
  - Background `#FFFFFF`, border radius `24px`, ambient brown shadow, `16px` internal padding (`space-md`).
  - Capybara photo hero positioned at the top with `16px` internal radius or full top-bleed with rounded top corners. Metadata row features status badges, distance counter, and mood icon (e.g., "Relaxing", "Soaking", "Snacking").

- **Input Fields**:
  - Fully pill-shaped search bars and `16px` rounded form text boxes.
  - Background `#F3ECE2`, placeholder text in muted caramel-gray (`rgba(44, 38, 35, 0.45)`), focus border `2px solid #8D5B4C` with zero harsh box-shadows.

- **Selection Controls (Checkboxes & Radios)**:
  - Checkboxes use `8px` rounded squares; radio buttons are circular.
  - Checked state filled with `#8D5B4C` with a white checkmark or center dot. Unchecked state features a `1.5px` border in `#D8C8B8`.

- **Lists & Timeline Items**:
  - Sighting activity feeds use grouped cards separated by `space-sm` gaps over the sand canvas. Dividers are soft caramel hairline strokes (`rgba(141, 91, 76, 0.08)`).

- **Mobile Navigation Bar**:
  - Floating pill-island docked at bottom with `16px` safe-area margin. Frosted Sand-glass background (`rgba(250, 246, 240, 0.88)` with `16px` backdrop blur) housing warm icons and a floating caramel primary sighting trigger.