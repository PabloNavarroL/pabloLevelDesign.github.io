// Shared nav behavior — mobile menu toggle.
// Active link state is set per-page via aria-current="page" in the HTML,
// so no path-matching logic is needed here.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
});

// Image slider — scroll-snap based, so touch swipe works for free.
// Arrows scroll one slide at a time; dots jump directly to a slide;
// the active dot updates as the user scrolls or swipes manually.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('[data-slider-track]');
    const slides = Array.from(track.children);
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');
    const dotsWrap = slider.querySelector('[data-slider-dots]');
    if (!track || slides.length === 0) return;

    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to image ${i + 1}`);
      dot.addEventListener('click', () => {
        track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    const setActive = index => {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    const currentIndex = () => {
      let closest = 0;
      let closestDist = Infinity;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - track.scrollLeft);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      return closest;
    };

    let scrollTimer;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setActive(currentIndex()), 80);
    });

    prevBtn && prevBtn.addEventListener('click', () => {
      const i = Math.max(0, currentIndex() - 1);
      track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
    });
    nextBtn && nextBtn.addEventListener('click', () => {
      const i = Math.min(slides.length - 1, currentIndex() + 1);
      track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
    });

    setActive(0);
  });
});
