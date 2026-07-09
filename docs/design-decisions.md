# Design decisions

Notes on the choices behind the restyle, kept separate from the README so the README can stay focused on the build process.

## Why a ticket/receipt motif

The content of this page *is* a receipt — a booking confirmation with a reference number, line items, and a total. Rather than decorating the card with unrelated flourishes, the perforated notch and barcode lean into what the object actually is. That's the one deliberate "signature" risk in this design; everything else stays restrained around it.

## Palette

| Token | Value | Use |
|---|---|---|
| `--cream` | `#faf6ee` | Page background |
| `--paper` | `#fffdf9` | Card surfaces |
| `--ink` | `#2a2420` | Primary text |
| `--ink-soft` | `#746657` | Secondary text |
| `--ink-faint` | `#a99c8c` | Tertiary/label text |
| `--terracotta` | `#a8451f` | Primary accent |
| `--terracotta-deep` | `#7c3216` | Accent hover/emphasis |
| `--sage` | `#5f6b47` | Confirmation/success signal |

The terracotta is deliberately deeper and rustier than the common AI-generated "warm orange" default (`#d97757`-adjacent tones) — chosen to read as an actual clay/terracotta pigment rather than a generic brand accent.

## Typography

- **Fraunces** (serif, italic for personal/warm moments: the guest's name, the host's note) — carries the "boutique hotel" feeling
- **DM Sans** (UI text) — neutral, legible workhorse
- **DM Mono** (all receipt/data figures: prices, dates, codes, the Wi-Fi password) — reinforces "this is printed/scanned data," distinct from the editorial voice elsewhere

## Interaction choices

- A cursor-tracked 3D tilt on the receipt and host-note cards, capped at 6° and disabled under `prefers-reduced-motion`. This is a nod to a tilt effect used elsewhere in the portfolio, not a literal recreation of the original design's "fan out on hover" idea — see README's Continued Development section for closing that gap.
- Print and calendar buttons are genuinely functional (`window.print()` with a dedicated print stylesheet; a real generated `.ics` file), not just decorative UI.

## Known deviations from the original Frontend Mentor design

- No literal "fan apart on hover" animation for the two stacked cards (tilt instead)
- Booking data is still hardcoded in HTML rather than loaded from JSON
- Layout structure (sidebar + card stack + three-card info row) intentionally matches the original; the visual skin does not
