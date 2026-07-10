# Maison Soleil — Hotel Booking Confirmation Page

A restyled solution to the [Hotel booking confirmation page challenge](https://www.frontendmentor.io/challenges/hotel-booking-confirmation-page) on Frontend Mentor — rebuilt in an editorial, ticket-inspired visual language instead of the original design.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users can:

- View an optimal layout depending on their device's screen size
- See hover and focus states on every interactive element
- Open and close the navigation menu on smaller screens
- Copy the Wi-Fi password to their clipboard with one click
- Print a clean, receipt-only view of the booking
- Download the stay as a real `.ics` calendar file

### Links

- Solution URL: [https://github.com/MinahilFatima18/Hotel-Booking-Confirmation]
- Live Site URL: [https://minahilfatima18.github.io/Hotel-Booking-Confirmation/]

## My process

### Built with

- Semantic HTML5
- CSS custom properties, Grid, and Flexbox
- Mobile-first, responsive layout
- Vanilla JavaScript (no frameworks/build step)
- Self-hosted, subsetted WOFF2 fonts (Fraunces, DM Sans, DM Mono)
- An SVG sprite sheet for icons

### What I learned

**A restyle isn't just a new palette.** The original design already used Fraunces and terracotta, so the real work was choosing a different *mood* — off-white paper, a printed-ticket motif with perforated notches, and a receipt/barcode treatment that ties the visuals back to what the content actually is (a booking confirmation).

**CSS pseudo-elements need to be anchored to what they're describing, not to the container.** My first pass positioned the ticket "cutout" notches at a fixed 50% of the receipt card's height, assuming the tear line would always sit in the middle. It didn't — the check-in/out grid pushed it down — so the notches floated in the wrong place. Anchoring the `::before`/`::after` pseudo-elements to the `.tear` element itself, rather than the card, fixed it permanently regardless of content height.

**Relative paths depend on *which* file resolves them.** Moving the CSS out of an inline `<style>` tag and into its own `css/style.css` broke every `@font-face` `url()`, because relative paths in CSS resolve from the CSS file's location, not the HTML's. `./assets/fonts/...` had to become `../assets/fonts/...`.

**Font subsetting is a big, cheap performance win.** The original variable TTFs were ~1.1MB combined. Subsetting to only the Latin + punctuation/currency glyphs this page actually uses, and converting to WOFF2, brought that down to ~243KB (about 78% smaller) with zero visual difference.

**SVG sprites keep icons as real files without losing `currentColor`.** Extracting 13 unique icons into a `<symbol>`-based sprite sheet meant each icon is now individually versionable, but referencing them via `<use>` still lets existing CSS (`fill`, `stroke: currentColor`) theme them — at the cost of needing a small fetch-and-inject step in JS, since cross-file `<use>` isn't reliable everywhere.

### Continued development

- Load the booking details from a `booking.json` file instead of hardcoding them in the HTML
- Add a genuine "fan out on hover" animation for the receipt/host-note cards (currently a cursor-tracked 3D tilt instead)
- Audit color contrast against WCAG AA more rigorously, particularly the terracotta-on-cream text pairings

### Useful resources

- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) — for the sidebar/main shell and card grids
- [web.dev: Font best practices](https://web.dev/articles/font-best-practices) — for the subsetting/WOFF2/`font-display` decisions

### AI collaboration

This project was built with Claude (Anthropic) as an active collaborator, not a one-shot generator. The process:

- Claude produced the initial restyle and structure based on a style direction I chose (off-white, Fraunces, terracotta — my established portfolio aesthetic)
- I reviewed the output against the challenge's actual requirements line by line and caught a real gap (missing hover/focus state on the mobile nav toggle), which Claude then fixed
- I asked Claude to refactor the single-file prototype into a proper multi-file project structure, extract and clean the CSS/JS, add real local fonts, fix a genuine CSS alignment bug (the ticket notch positioning), build an icon sprite, subset the fonts for performance, and prepare GitHub-ready files (this README, LICENSE, `.gitignore`)
- What worked well: using Claude to catch spec-compliance gaps I would have missed, and to handle the mechanical refactoring work quickly and correctly
- What I did myself: the visual direction, the style decisions, reviewing every change, and deciding what shipped

## Author

- Frontend Mentor - [Add your Frontend Mentor profile link]
- GitHub - [@MinahilFatima18](https://github.com/MinahilFatima18)

## Acknowledgments

Challenge by [Frontend Mentor](https://www.frontendmentor.io?ref=challenge). Fonts (Fraunces, DM Sans, DM Mono) by their respective authors under the SIL Open Font License — see `assets/fonts/OFL-*.txt`.
