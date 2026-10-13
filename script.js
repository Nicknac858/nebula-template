(() => {
  const dialog = document.getElementById('preview-dialog');
  const message = document.getElementById('preview-message');
  const menu = document.querySelector('.menu-button');
  const nav = document.getElementById('main-nav');

  const messages = {
    'Watch Video': 'Your film can take this space when you add it. The hero is ready for a video reveal.',
    Search: 'Search can be connected as soon as the rest of the site is in place.'
  };

  function closeMenu() {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  }

  menu.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  document.querySelectorAll('[data-preview]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.preview;
      message.textContent = messages[action] || `The ${action} destination is ready for the content we'll add next.`;
      closeMenu();
      dialog.showModal();
    });
  });

  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('.dialog-done').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.querySelector('.brand').addEventListener('click', closeMenu);
  document.querySelector('.main-nav a').addEventListener('click', closeMenu);

  const canvas = document.getElementById('stardust');
  const context = canvas.getContext('2d', { alpha: true });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!context || reduceMotion.matches) return;

  let width = 0, height = 0, dpr = 1, particles = [], frame = 0;
  const palette = ['255,42,218', '210,68,255', '67,111,255', '29,87,255', '255,195,247'];
  const random = (a, b) => a + Math.random() * (b - a);

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(145, Math.max(70, Math.round(width / 12)));
    particles = Array.from({ length: count }, () => {
      const band = Math.floor(random(0, 4));
      return {
        band,
        x: random(0, 1),
        offset: random(-.065, .065),
        speed: random(.000009, .000024),
        size: random(.55, 1.9),
        alpha: random(.22, .76),
        phase: random(0, Math.PI * 2),
        color: palette[Math.floor(random(0, palette.length))]
      };
    });
  }

  function curveY(x, band) {
    const t = x * Math.PI;
    switch (band) {
      case 0: return .46 + .07 * Math.sin(t * 2.1 - .4);
      case 1: return .61 + .095 * Math.sin(t * 2.3 + .7);
      case 2: return .73 + .12 * Math.sin(t * 1.8 + 1.3);
      default: return .37 + .11 * Math.sin(t * 2.4 + .9);
    }
  }

  function render(time) {
    context.clearRect(0, 0, width, height);
    for (const p of particles) {
      const x = (p.x + time * p.speed) % 1;
      if (x < .2 && p.band !== 2) continue;
      const sway = Math.sin(time * .00055 + p.phase) * .005;
      const px = x * width;
      const py = (curveY(x, p.band) + p.offset + sway) * height;
      const twinkle = .66 + .34 * Math.sin(time * .0017 + p.phase);
      const alpha = p.alpha * twinkle;
      const radius = p.size * (1 + .12 * Math.sin(time * .001 + p.phase));
      context.shadowColor = `rgba(${p.color}, ${alpha})`;
      context.shadowBlur = radius * 7;
      context.fillStyle = `rgba(${p.color}, ${alpha})`;
      context.beginPath();
      context.arc(px, py, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.shadowBlur = 0;
    frame = requestAnimationFrame(render);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  frame = requestAnimationFrame(render);
  reduceMotion.addEventListener('change', (event) => {
    if (event.matches) {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    } else {
      frame = requestAnimationFrame(render);
    }
  });
})();

