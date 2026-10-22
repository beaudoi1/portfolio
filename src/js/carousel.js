// Home page "Selected work" carousel. Never rotates on its own.
// Without JavaScript every project shows, stacked.
(function () {
  var root = document.querySelector(".carousel");
  if (!root) return;
  var slides = Array.from(root.querySelectorAll(".carousel__slide"));
  if (slides.length < 2) return;
  var prev = root.querySelector("[data-carousel-prev]");
  var next = root.querySelector("[data-carousel-next]");
  var current = root.querySelector("[data-carousel-current]");
  var status = root.querySelector("[data-carousel-status]");
  var dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));
  var index = 0;

  root.classList.add("is-enhanced");
  root.querySelector(".carousel__controls").hidden = false;
  root.querySelector(".carousel__dots").hidden = false;

  function show(i, announce) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) {
      var on = n === index;
      s.hidden = !on;
    });
    dots.forEach(function (d, n) { d.setAttribute("aria-current", n === index ? "true" : "false"); });
    current.textContent = index + 1;
    if (announce) {
      var title = slides[index].querySelector(".card__title");
      status.textContent = "Project " + (index + 1) + " of " + slides.length + ": " + (title ? title.textContent.trim() : "");
    }
  }

  prev.addEventListener("click", function () { show(index - 1, true); });
  next.addEventListener("click", function () { show(index + 1, true); });
  dots.forEach(function (d, n) { d.addEventListener("click", function () { show(n, true); }); });

  // Left/right arrow keys while focus is inside the carousel.
  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1, true); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1, true); }
  });

  // Swipe on touch screens.
  var track = root.querySelector(".carousel__track");
  var startX = null, startY = null;
  track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  track.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1), true);
    startX = null;
  });

  show(0, false);
})();
