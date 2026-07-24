/* ============================================================
   UVG Global — Hero carousel
   Texas-Global-style stacked card carousel with image slots
   ============================================================ */

(function () {
  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("carousel-dots");
  const tpl = document.getElementById("carousel-cards");
  if (!track || !tpl) return;

  // Read authored cards from the template
  const sources = Array.from(tpl.content.querySelectorAll(".card-source"));
  const cards = sources.map(src => ({
    slotId: src.dataset.slotId,
    kicker: src.dataset.kicker,
    cta: src.dataset.cta,
    ctaHref: src.dataset.ctaHref,
    meta: src.dataset.meta,
    title: src.querySelector("h2") ? src.querySelector("h2").textContent.trim() : "",
  }));

  // Build card DOM
  track.innerHTML = cards.map((c, i) => `
    <article class="hero-card" data-index="${i}" aria-roledescription="slide">
      <div class="card-bg">
        <image-slot id="${c.slotId}" shape="rect"
          placeholder="${c.kicker} — arrastra una foto aquí"></image-slot>
      </div>
      <div class="card-body">
        <div class="card-kicker">${c.kicker}</div>
        <h2 class="card-title">${c.title}</h2>
        <div class="card-foot">
          <span class="card-meta">${c.meta || ""}</span>
          <a class="card-cta" href="${c.ctaHref}" tabindex="-1">
            ${c.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join("");

  // Build dots
  dotsContainer.innerHTML = cards.map((_, i) =>
    `<button type="button" class="carousel-dot" data-index="${i}" aria-label="Ir a tarjeta ${i + 1}"></button>`
  ).join("");

  const cardEls = Array.from(track.querySelectorAll(".hero-card"));
  const dotEls = Array.from(dotsContainer.querySelectorAll(".carousel-dot"));
  const N = cardEls.length;
  let active = 0;

  function update() {
    cardEls.forEach((el, i) => {
      // Relative position around `active`, wrapped to [-N/2, +N/2]
      let rel = i - active;
      if (rel > N / 2) rel -= N;
      if (rel < -N / 2) rel += N;
      // Cap to ±3 (we have visuals for -2..+2 visible, ±3 = hidden)
      const capped = Math.max(-3, Math.min(3, rel));
      el.setAttribute("data-pos", capped);
    });
    dotEls.forEach((d, i) => d.classList.toggle("active", i === active));
  }

  function go(delta) {
    active = (active + delta + N) % N;
    update();
    restartAuto();
  }
  function goTo(i) {
    active = ((i % N) + N) % N;
    update();
    restartAuto();
  }

  // Wire up nav
  document.querySelector("[data-carousel-prev]").addEventListener("click", () => go(-1));
  document.querySelector("[data-carousel-next]").addEventListener("click", () => go(1));
  dotEls.forEach(d => d.addEventListener("click", () => goTo(parseInt(d.dataset.index, 10))));

  // Click a side card to bring it center
  cardEls.forEach((el, i) => {
    el.addEventListener("click", e => {
      // Don't hijack clicks on the CTA button or its children
      if (e.target.closest(".card-cta")) return;
      if (i === active) return;
      goTo(i);
    });
  });

  // Keyboard
  document.addEventListener("keydown", e => {
    const carousel = document.querySelector(".hero-carousel");
    if (!carousel) return;
    const rect = carousel.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return; // off-screen
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  // Auto-advance
  let autoTimer;
  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => go(1), 6000);
  }
  // Pause on hover
  const carousel = document.querySelector(".hero-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoTimer));
  carousel.addEventListener("mouseleave", restartAuto);

  // Touch swipe
  let touchStartX = null;
  carousel.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener("touchend", e => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    touchStartX = null;
  });

  update();
  restartAuto();
})();
