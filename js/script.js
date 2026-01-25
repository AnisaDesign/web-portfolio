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

(() => {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-track]");
  const slides = Array.from(track.children);
  const dotsWrap = carousel.querySelector("[data-dots]");

  const cardsPerView = () => {
    const w = window.innerWidth;
    if (w >= 1100) return 4;
    if (w >= 720) return 2;
    return 1;
  };

  let page = 0;

  const pagesCount = () => Math.max(1, Math.ceil(slides.length / cardsPerView()));

  const buildDots = () => {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < pagesCount(); i++) {
      const b = document.createElement("button");
      b.className = "say__dot";
      b.type = "button";
      b.setAttribute("aria-label", `Go to page ${i + 1}`);
      b.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(b);
    }
  };

  const updateDots = () => {
    dotsWrap.querySelectorAll(".say__dot").forEach((d, i) => {
      d.setAttribute("aria-current", String(i === page));
    });
  };

  const goTo = (p) => {
    const total = pagesCount();
    page = Math.max(0, Math.min(total - 1, p));

    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = slide.getBoundingClientRect().width + gap;
    const move = step * cardsPerView() * page;

    track.style.transform = `translateX(${-move}px)`;
    updateDots();
  };

  const init = () => {
    buildDots();
    goTo(0);
  };

  window.addEventListener("resize", init);
  init();
})();


