/**
 * Maison Soleil — Booking confirmation page
 * Handles: mobile nav toggle, Wi-Fi password copy, print receipt,
 * "Add to calendar" (.ics download), and a cursor-tracked card tilt effect.
 */

'use strict';

/* ---------------------------------------------------------
   Load the icon sprite sheet inline
   (external <use href="file.svg#id"> is unreliable in some
   browsers/contexts unless the sprite is in the DOM)
--------------------------------------------------------- */
async function loadIconSprite() {
  try {
    const response = await fetch('./assets/icons/sprite.svg');
    if (!response.ok) return;
    const markup = await response.text();
    const wrapper = document.createElement('div');
    wrapper.setAttribute('hidden', '');
    wrapper.innerHTML = markup;
    document.body.prepend(wrapper);
  } catch (error) {
    // If the sprite fails to load, icons will simply render empty —
    // layout and functionality are unaffected.
  }
}

/* ---------------------------------------------------------
   Mobile navigation (open/close sidebar on small screens)
--------------------------------------------------------- */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('scrim');

  if (!navToggle || !sidebar || !scrim) return;

  const setNavOpen = (isOpen) => {
    sidebar.classList.toggle('open', isOpen);
    scrim.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  navToggle.addEventListener('click', () => {
    setNavOpen(!sidebar.classList.contains('open'));
  });

  scrim.addEventListener('click', () => setNavOpen(false));

  // Let keyboard users dismiss the drawer with Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
      setNavOpen(false);
      navToggle.focus();
    }
  });
}

/* ---------------------------------------------------------
   Copy the Wi-Fi password to the clipboard
--------------------------------------------------------- */
function initWifiCopy() {
  const copyBtn = document.getElementById('copyBtn');
  const wifiPassEl = document.getElementById('wifiPass');
  if (!copyBtn || !wifiPassEl) return;

  const defaultLabel = copyBtn.dataset.default || 'Copy';
  const password = wifiPassEl.textContent.trim();

  const showFeedback = (label) => {
    copyBtn.textContent = label;
    setTimeout(() => {
      copyBtn.textContent = defaultLabel;
    }, 1600);
  };

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(password);
      showFeedback('Copied');
    } catch (error) {
      // Clipboard API can be unavailable (e.g. insecure context, permissions)
      showFeedback('Select & copy');
    }
  });
}

/* ---------------------------------------------------------
   Print receipt
--------------------------------------------------------- */
function initPrintButton() {
  const printBtn = document.getElementById('printBtn');
  if (!printBtn) return;
  printBtn.addEventListener('click', () => window.print());
}

/* ---------------------------------------------------------
   Add to calendar — generates and downloads a real .ics file
--------------------------------------------------------- */
function buildBookingIcs() {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Maison Soleil//Booking Confirmation//EN',
    'BEGIN:VEVENT',
    'SUMMARY:Maison Soleil — La Garrigue',
    'DTSTART:20260425T150000',
    'DTEND:20260429T110000',
    'LOCATION:12 Rue des Oliviers, Cassis',
    'DESCRIPTION:Booking MS-2026-0421-AH. Ring the brass bell by the blue door.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadIcsFile(icsContent, filename) {
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function initCalendarButton() {
  const calendarBtn = document.getElementById('calendarBtn');
  if (!calendarBtn) return;

  calendarBtn.addEventListener('click', () => {
    downloadIcsFile(buildBookingIcs(), 'maison-soleil-stay.ics');
  });
}

/* ---------------------------------------------------------
   Cursor-tracked 3D tilt on the receipt / host-note cards
--------------------------------------------------------- */
function initCardTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion || tiltCards.length === 0) return;

  const MAX_TILT_DEGREES = 6;

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const bounds = card.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

      const rotateY = offsetX * MAX_TILT_DEGREES;
      const rotateX = -offsetY * MAX_TILT_DEGREES;

      card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(0)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------------------------------------------------------
   Init
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  loadIconSprite();
  initMobileNav();
  initWifiCopy();
  initPrintButton();
  initCalendarButton();
  initCardTilt();
});
