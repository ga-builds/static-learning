// assets/app.js
// Accessible accordion for .skill-card elements
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // avoid double initialization
    if (document.body.dataset.skillsInit === '1') return;
    document.body.dataset.skillsInit = '1';

    const skillCards = Array.from(document.querySelectorAll('.skill-card'));
    if (!skillCards.length) return;

    const CLOSED_PADDING = '0 24px 0 24px';
    const OPEN_PADDING = '0 24px 24px 24px';

    // helper: close a card
    function closeCard(card) {
      const header = card.querySelector('.skill-header');
      const content = card.querySelector('.skill-content');
      if (!header || !content) return;

      card.classList.remove('active');
      content.classList.remove('open');

      header.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');

      // animate collapse
      content.style.maxHeight = '0px';
      content.style.padding = CLOSED_PADDING;
    }

    // helper: open a card (and close others)
    function openCard(card) {
      const header = card.querySelector('.skill-header');
      const content = card.querySelector('.skill-content');
      if (!header || !content) return;

      // close others
      skillCards.forEach(other => {
        if (other !== card) closeCard(other);
      });

      card.classList.add('active');
      content.classList.add('open');

      header.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');

      // set padding first so scrollHeight accounts for it
      content.style.padding = OPEN_PADDING;

      // then animate open using actual height
      const targetHeight = content.scrollHeight;
      content.style.maxHeight = targetHeight + 'px';
    }

    // attach behaviour to each card
    skillCards.forEach((card, idx) => {
      const header = card.querySelector('.skill-header');
      const content = card.querySelector('.skill-content');
      if (!header || !content) return;

      // ensure unique id on content for aria-controls
      if (!content.id) content.id = `skill-content-${idx}`;

      // accessibility attributes and keyboard focusability
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-controls', content.id);
      header.setAttribute('aria-expanded', 'false');

      content.setAttribute('aria-hidden', 'true');
      content.style.overflow = 'hidden';
      content.style.maxHeight = '0px';
      content.style.transition = 'max-height 0.35s ease, padding 0.35s ease';
      content.style.padding = CLOSED_PADDING;

      // click handler
      header.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (card.classList.contains('active')) {
          closeCard(card);
        } else {
          openCard(card);
        }
      });

      // keyboard activation (Enter / Space)
      header.addEventListener('keydown', (ev) => {
        const key = ev.key || ev.code;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar' || key === 'Space') {
          ev.preventDefault();
          if (card.classList.contains('active')) {
            closeCard(card);
          } else {
            openCard(card);
          }
        }
      });

      // optional: When transition completes and card is open, keep maxHeight large enough
      // (we do NOT set maxHeight to 'none' to keep toggling reliable)
    });

  });
})();
