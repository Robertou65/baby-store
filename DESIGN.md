---
name: Baby Store
description: Joyful children-themed baby essentials store built with vibrant tactile playroom design language
colors:
  primary: "#FFB800"
  secondary: "#0EA5E9"
  tertiary: "#F43F5E"
  accent-mint: "#10B981"
  neutral-bg: "#FDFBF7"
  card-white: "#FFFFFF"
  text-charcoal: "#1E293B"
typography:
  display:
    fontFamily: "Fredoka, cursive, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "Fredoka, cursive, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Fredoka, cursive, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#451a03"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#FBBF24"
    textColor: "#451a03"
  button-whatsapp:
    backgroundColor: "{colors.accent-mint}"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  card-product:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.text-charcoal}"
    rounded: "{rounded.xl}"
    padding: "20px"
  chip-filter:
    backgroundColor: "#F1F5F9"
    textColor: "#334155"
    rounded: "{rounded.full}"
    padding: "6px 16px"
---

# Design System: Baby Store

## Overview

**Creative North Star: "The Playroom Block System"**

The visual language of Baby Store draws direct inspiration from tactile wooden toy blocks, Montessori shape sorters, and early childhood wonder. It balances vibrant, joyful colors with the dependability and hygiene clarity that parents require when shopping for their little ones. Every surface feels welcoming, cheerful, and physically friendly—inviting interaction rather than feeling like a sterile medical warehouse or an aggressive discount bazaar.

Surfaces use soft, warm cloud grounds (`#FDFBF7`) with bold, saturated block accents: Sunshine Yellow (`#FFB800`), Sky Blue (`#0EA5E9`), Coral Strawberry (`#F43F5E`), and Mint Sprout (`#10B981`). Tactile cards possess subtle lift and playful colored border accents that mimic physical toys resting on a play mat. Micro-interactions carry a gentle springiness—like pressing a soft toy button—giving immediate delight to busy parents during late-night feeding or multitasking moments.

**Key Characteristics:**
- Chunky, tactile toy-block form language with child-safe rounded geometries.
- Vibrant, saturated palette anchored on warm cream and soft white grounds.
- Instant, high-contrast size (T0–T5) and price scanning designed specifically for one-handed mobile browsing.
- Springy, tactile micro-feedback on filter chips and action buttons.

## Colors

A rich, vibrant children's palette built around primary and secondary play colors, balanced by warm, soothing neutrals that prevent eye fatigue.

### Primary
- **Sunshine Yellow** (`#FFB800`): Primary brand warmth, hero highlights, cart pills, and joyful accent markers. Paired with dark amber text (`#451a03`) for optimal contrast.

### Secondary
- **Sky Blue** (`#0EA5E9`): Reliable, calm trust, diaper stage highlights, and category navigation active state.

### Tertiary
- **Coral Strawberry** (`#F43F5E`): High-energy promotional tags, cart count badges, and urgency accents.

### Quaternary / Accent
- **Mint Sprout** (`#10B981`): Sensitive skin indicators, WhatsApp direct ordering, and stock confirmation badges.

### Neutral
- **Warm Cloud Ground** (`#FDFBF7`): Soft, comforting off-white canvas preventing harsh glare.
- **Pure Card White** (`#FFFFFF`): Clean, crisp surface layer for product packaging presentation.
- **Deep Slate Charcoal** (`#1E293B`): High-contrast, friendly text color ensuring effortless legibility.

### Named Rules
**The Warm Foundation Rule.** Saturated vibrant tones must always sit on warm cloud white or gentle cream canvases, never on sterile blue-gray or harsh stark black.
**The Stage Distinction Rule.** Diaper sizes (T0 through T5) and product categories must utilize distinct, repeatable accent colors so parents can identify product stages instantly without rereading copy.

## Typography

**Display Font:** Fredoka (with cursive, sans-serif fallback)
**Body Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Label / Numeric Font:** Plus Jakarta Sans with tabular figures for Colombian Peso prices and packaging counts.

**Character:** Friendly, open-aperture display headings that convey the innocence and joy of childhood, paired with razor-sharp, functional body text that treats parental time and budget with absolute respect.

### Hierarchy
- **Display** (Bold, clamp(2rem, 5vw, 3.5rem), 1.15): Hero slogans, welcome announcements, and playful banners.
- **Headline** (Bold, 1.75rem, 1.25): Category sections, major brand highlights (Winny, Pequeñín, Babysec).
- **Title** (Bold, 1.125rem, 1.3): Product names, package options, and card titles.
- **Body** (Regular/Medium, 0.9375rem, 1.5): Product descriptions, care instructions, and specs. Max line length 65ch.
- **Label** (Bold, 0.75rem, 1.2): Diaper sizes (T0–T5), package counts (e.g. 50u), and price tags in COP.

### Named Rules
**The Glanceable Metric Rule.** Diaper stage sizes, unit counts, and Colombian Peso prices must always be rendered in high-legibility tabular sans, never in decorative or cursive type.

## Layout

A fluid, responsive layout designed mobile-first. Parents frequently browse with one hand while tending to a baby; therefore, key interactive controls, filter pills, search bars, and the primary ordering/cart triggers live within comfortable thumb range.

Desktop views expand gracefully from 1-column mobile feed into 2-to-4 column playful grids with fixed-width readable product cards, maintaining comfortable air and negative space so products stand out clearly.

### Named Rules
**The Thumb-Reach Rule.** The primary ordering flow, diaper size selector chips, and cart summary must remain anchored or easily accessible within the lower 60% of the mobile viewport.

## Elevation & Depth

Surfaces emphasize tactile physical presence rather than artificial neon glow or heavy drop shadows. Depth is achieved through soft, warm ambient drop shadows paired with subtle solid outline strokes, giving elements the tangible feeling of wooden blocks on a mat.

### Shadow Vocabulary
- **block-lift** (`box-shadow: 0 4px 16px rgba(251, 191, 36, 0.25)`): Applied on primary action buttons and floating cart triggers.
- **card-ambient** (`box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04)`): Diffuse shadow under product containers resting on the cloud background.

### Named Rules
**The Tactile Block Rule.** Floating cards and interactive buttons use warm, diffused shadows or physical 2px offset borders to establish tactile lift without harsh visual noise.

## Shapes

All shapes feature generous, friendly radii. There are zero sharp 90-degree corners in the entire system.

### Named Rules
**The Child-Safe Corner Rule.** Every container, card, badge, input, and button must carry a softened radius (minimum 12px for small controls, 20px–28px for cards, and fully rounded pills for badges). Sharp corners are prohibited.

## Components

### Buttons
- **Shape:** Rounded-2xl (16px) for primary buttons, rounded-xl (12px) for control steppers.
- **Primary:** Warm sunshine yellow (`#FFB800`) with dark amber text (`#451a03`), 12px 24px padding.
- **WhatsApp Action:** Emerald green (`#059669`) with white text, 16px 24px padding.
- **Hover / Focus:** Scale up to 1.02 with smooth bounce transition (`cubic-bezier(0.34, 1.56, 0.64, 1)`).

### Chips & Badges
- **Stage Pills:** Distinct background and border per stage (T0 amber, T1 sky, T2 emerald, T4 rose, T5 purple), rounded-full.
- **Brand Chips:** Slate pill with bold text, inverted to solid slate-900 on active selection.

### Cards / Containers
- **Corner Style:** Rounded-3xl (24px) for product cards and modal windows.
- **Background:** Pure White (`#FFFFFF`) with 2px warm border (`#E2E8F0`).
- **Internal Padding:** 20px for spacious breathing room around product pack shots.

### Navigation
- Sticky glassmorphic header (`#FDFBF7`/90) with brand icon, trust message, and floating cart trigger.

## Do's and Don'ts

### Do:
- **Do** celebrate vibrant, joyful colors across category chips, stage indicators, and joyful accents.
- **Do** preserve immediate clarity for diaper brands, stage sizes (T0–T5), package quantities (16u–100u), and COP prices.
- **Do** use bouncy, tactile spring animations for tap and hover interactions to evoke playful wooden toys.
- **Do** anchor bright colors on soft, warm off-white grounds so the interface remains comfortable during nocturnal browsing.

### Don't:
- **Don't** create a sterile, cold, clinical pharmaceutical look with monochrome gray or hospital cyan.
- **Don't** use decorative display fonts for critical parental information like sizes, unit counts, or prices.
- **Don't** use sharp square corners or harsh black drop shadows.
- **Don't** bury diaper stages or unit prices behind multiple clicks or obscured dropdowns.
