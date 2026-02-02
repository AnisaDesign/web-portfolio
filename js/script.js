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

  // Testimonial


(() => {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const viewport = carousel.querySelector(".say__viewport");
  const track = carousel.querySelector("[data-track]");
  const slides = Array.from(track.children);
  const dotsWrap = carousel.querySelector("[data-dots]");

  const perView = () => {
    const w = window.innerWidth;
    if (w >= 1100) return 3; // ✅ desktop
    if (w >= 720) return 2;
    return 1;
  };

  const maxIndex = () => Math.max(0, slides.length - perView()); // 5-3=2 => indices 0..2 (3 dots)
  const dotCount = () => maxIndex() + 1;

  let index = 0;

  const stepSize = () => {
    const first = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return first.getBoundingClientRect().width + gap;
  };

  const buildDots = () => {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < dotCount(); i++) {
      const dot = document.createElement("button");
      dot.className = "say__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to testimonials ${i + 1}–${i + perView()}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  };

  const updateDots = () => {
    dotsWrap.querySelectorAll(".say__dot").forEach((d, i) => {
      d.setAttribute("aria-current", String(i === index));
    });
  };

  const goTo = (i) => {
    index = Math.max(0, Math.min(maxIndex(), i));
    const step = stepSize();
    viewport.scrollTo({ left: index * step, behavior: "smooth" });
    updateDots();
  };

  // Update dots based on scroll position
  const setIndexFromScroll = () => {
    const step = stepSize();
    if (!step) return;
    const raw = viewport.scrollLeft / step;
    index = Math.round(raw);
    index = Math.max(0, Math.min(maxIndex(), index));
    updateDots();
  };

  // Throttle scroll updates with rAF (smooth + efficient)
  let ticking = false;
  viewport.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setIndexFromScroll();
      ticking = false;
    });
  });

  const init = () => {
    buildDots();
    setIndexFromScroll();
  };

  window.addEventListener("resize", init);
  init();
})();

// Back button behavior//
const backBtn = document.querySelector('.back-fab');

if (backBtn) {
  backBtn.addEventListener('click', (e) => {
    if (window.history.length > 1) {
      e.preventDefault();
      window.history.back();
    }
  });
}

