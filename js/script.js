document.addEventListener('DOMContentLoaded', () => {
  // Mobile hamburger (safe-guarded)
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('nav--visible');
    });
  }

  // Sticky/shrink behavior
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > 120) navbar.classList.add('shrink');
    else navbar.classList.remove('shrink');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    // ensure any old classes won’t hide it
    navbar.classList.remove('hide-full', 'show-mini');
  });

  onScroll(); // set initial state
});
