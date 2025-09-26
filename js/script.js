document.addEventListener('DOMContentLoaded', () => {
  const navbar   = document.getElementById('navbar');
  const toggle   = document.querySelector('.nav-toggle');
  const linksBox = document.getElementById('navlinks');

  // Mobile: open/close
  if (toggle && linksBox) {
    const closeMenu = () => {
      linksBox.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (e) => {
      const open = linksBox.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      e.stopPropagation();
    });

    // Close on link click
    linksBox.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) closeMenu();
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Optional: keep your gentle desktop "shrink" behavior
  if (navbar) {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > 120) navbar.classList.add('shrink');
      else navbar.classList.remove('shrink');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
