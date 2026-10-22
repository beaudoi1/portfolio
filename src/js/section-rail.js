// Phone-size "jump to section" rail for long case studies.
// Shows after the "On this page" list scrolls away. Tap a number, or drag along the rail
// (like a phone's A–Z scrubber) and let go to jump.
(function () {
  var rail = document.querySelector(".section-rail");
  var toc = document.querySelector(".cs-toc");
  if (!rail || !toc || !("IntersectionObserver" in window)) return;
  var links = Array.from(rail.querySelectorAll("a"));
  var bubble = rail.querySelector(".section-rail__bubble");
  var narrow = window.matchMedia("(max-width: 63.99rem)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var tocGone = false;

  function updateVisibility() { rail.hidden = !(narrow.matches && tocGone); }
  // Check on scroll (throttled to one check per frame), so fast flings and jumps count too.
  var ticking = false;
  function check() {
    ticking = false;
    tocGone = toc.getBoundingClientRect().bottom < 0;
    updateVisibility();
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(check); } }, { passive: true });
  narrow.addEventListener("change", updateVisibility);
  check();

  // Highlight the section in view.
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  var sections = links.map(function (a) { var h = document.getElementById(a.getAttribute("href").slice(1)); return h && (h.closest("section") || h); }).filter(Boolean);
  var current = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var h = e.target.querySelector("h2[id]") || e.target;
      links.forEach(function (a) { a.removeAttribute("aria-current"); });
      if (byId[h.id]) byId[h.id].setAttribute("aria-current", "location");
    });
  }, { rootMargin: "-35% 0px -60% 0px" });
  sections.forEach(function (s) { current.observe(s); });

  function go(a) {
    var id = a.getAttribute("href").slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#" + id);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }

  // Drag-to-scrub with a finger or pen.
  var active = null, moved = false;
  function linkAt(x, y) {
    var el = document.elementFromPoint(x, y);
    var a = el && el.closest(".section-rail a");
    return a && rail.contains(a) ? a : null;
  }
  function mark(a) {
    links.forEach(function (l) { l.classList.toggle("is-scrub", l === a); });
    if (!a) return;
    var r = a.getBoundingClientRect(), rr = rail.getBoundingClientRect();
    bubble.textContent = a.dataset.label;
    bubble.style.top = (r.top + r.height / 2 - rr.top) + "px";
  }
  rail.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse") return; // mouse uses normal link clicks
    rail.setPointerCapture(e.pointerId);
    active = linkAt(e.clientX, e.clientY); moved = false;
    rail.classList.add("is-scrubbing"); mark(active);
  });
  rail.addEventListener("pointermove", function (e) {
    if (!rail.classList.contains("is-scrubbing")) return;
    var a = linkAt(e.clientX, e.clientY);
    if (a && a !== active) { active = a; moved = true; mark(a); }
  });
  function end() {
    if (!rail.classList.contains("is-scrubbing")) return;
    rail.classList.remove("is-scrubbing"); mark(null);
    if (active) go(active);
    active = null;
  }
  rail.addEventListener("pointerup", end);
  rail.addEventListener("pointercancel", function () { rail.classList.remove("is-scrubbing"); mark(null); active = null; });
  // Touch taps are handled by pointerup above; stop the duplicate link click.
  rail.addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    go(a);
  });
})();
