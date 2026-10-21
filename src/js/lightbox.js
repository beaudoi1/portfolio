// Pop-out image viewer with variable zoom.
// Open: "Enlarge" button or a click on an enlargeable image.
// Zoom: pinch (touch or trackpad), Ctrl + scroll, double-click/tap, the − / + / Fit buttons, or the + − 0 keys.
// Pan: drag, scroll, or arrow keys once zoomed.
(function () {
  var dialog = document.querySelector(".lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  var img = dialog.querySelector(".lightbox__img");
  var stage = dialog.querySelector(".lightbox__stage");
  var caption = dialog.querySelector(".lightbox__caption");
  var level = dialog.querySelector(".lightbox__level");
  var btnIn = dialog.querySelector("[data-zoom-in]");
  var btnOut = dialog.querySelector("[data-zoom-out]");
  var btnFit = dialog.querySelector("[data-zoom-fit]");

  var MAX = 6;          // up to 6× the fitted size
  var STEP = 1.25;      // per button press or key press
  var scale = 1;        // 1 = fitted to the screen
  var fitWidth = 0;     // image width (px) when fitted

  function measureFit() {
    if (!img.naturalWidth) return;
    var w = stage.clientWidth, h = stage.clientHeight;
    var ratio = Math.min(w / img.naturalWidth, h / img.naturalHeight, 1);
    fitWidth = img.naturalWidth * ratio;
  }

  // Zoom to `next`, keeping the point under (cx, cy) in place. Defaults to the center.
  function zoomTo(next, cx, cy) {
    if (!fitWidth) return;
    next = Math.min(MAX, Math.max(1, next));
    var rect = stage.getBoundingClientRect();
    if (cx === undefined) { cx = rect.width / 2; cy = rect.height / 2; }
    var imgRect = img.getBoundingClientRect();
    // Where the focus point sits on the image, as a fraction.
    var fx = (rect.left + cx - imgRect.left) / imgRect.width;
    var fy = (rect.top + cy - imgRect.top) / imgRect.height;
    scale = next;
    img.style.width = fitWidth * scale + "px";
    var newRect = img.getBoundingClientRect();
    var offsetLeft = newRect.left - rect.left + stage.scrollLeft;
    var offsetTop = newRect.top - rect.top + stage.scrollTop;
    stage.scrollLeft = offsetLeft + fx * newRect.width - cx;
    stage.scrollTop = offsetTop + fy * newRect.height - cy;
    update();
  }

  function update() {
    var pct = Math.round(scale * 100);
    level.textContent = pct === 100 ? "Fit" : pct + "%";
    btnOut.disabled = scale <= 1;
    btnIn.disabled = scale >= MAX;
    btnFit.disabled = scale === 1;
    dialog.classList.toggle("is-zoomed", scale > 1);
  }

  function fit() {
    measureFit();
    scale = 1;
    img.style.width = fitWidth + "px";
    stage.scrollLeft = 0;
    stage.scrollTop = 0;
    update();
  }

  function open(link) {
    var wrap = link.closest(".zoomable");
    var thumb = wrap.querySelector("img");
    var fig = wrap.closest("figure");
    var cap = fig && fig.querySelector("figcaption");
    img.style.width = "";
    img.onload = fit;
    img.src = link.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    img.classList.toggle("lightbox__img--light", !!(fig && fig.classList.contains("figure--light")));
    caption.textContent = cap ? cap.textContent : "";
    caption.hidden = !caption.textContent;
    dialog.showModal();
    btnIn.focus();
    if (img.complete && img.naturalWidth) fit();
  }

  // Open from an Enlarge button, or a click on the image itself.
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-zoom]");
    if (!link) {
      var pic = e.target.closest(".zoomable img");
      if (pic) link = pic.closest(".zoomable").querySelector("[data-zoom]");
    }
    if (!link) return;
    e.preventDefault();
    open(link);
  });

  btnIn.addEventListener("click", function () { zoomTo(scale * STEP); });
  btnOut.addEventListener("click", function () { zoomTo(scale / STEP); });
  btnFit.addEventListener("click", fit);
  dialog.querySelector("[data-lightbox-close]").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("close", function () { img.removeAttribute("src"); img.style.width = ""; });
  window.addEventListener("resize", function () { if (dialog.open) { var s = scale; measureFit(); scale = 1; zoomTo(s); } });

  // Keyboard: + / − / 0, arrows pan.
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomTo(scale * STEP); }
    else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomTo(scale / STEP); }
    else if (e.key === "0") { e.preventDefault(); fit(); }
    else if (scale > 1 && /^Arrow/.test(e.key) && !e.target.closest("button")) {
      e.preventDefault();
      var d = 60;
      if (e.key === "ArrowLeft") stage.scrollLeft -= d;
      if (e.key === "ArrowRight") stage.scrollLeft += d;
      if (e.key === "ArrowUp") stage.scrollTop -= d;
      if (e.key === "ArrowDown") stage.scrollTop += d;
    }
  });

  // Trackpad pinch and Ctrl + wheel arrive as wheel events with ctrlKey.
  stage.addEventListener("wheel", function (e) {
    if (!e.ctrlKey) return; // plain scrolling pans
    e.preventDefault();
    var rect = stage.getBoundingClientRect();
    zoomTo(scale * Math.exp(-e.deltaY * 0.01), e.clientX - rect.left, e.clientY - rect.top);
  }, { passive: false });

  // Double-click / double-tap: zoom to 2.5× at that point, or back to fit.
  stage.addEventListener("dblclick", function (e) {
    var rect = stage.getBoundingClientRect();
    if (scale > 1) fit(); else zoomTo(2.5, e.clientX - rect.left, e.clientY - rect.top);
  });

  // Touch and mouse: one pointer drags (pans), two pointers pinch.
  var pointers = new Map();
  var pinchStart = null;
  var dragged = false;
  stage.addEventListener("pointerdown", function (e) {
    if (e.target.closest("button")) return;
    stage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged = false;
    if (pointers.size === 2) {
      var p = Array.from(pointers.values());
      pinchStart = { dist: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y), scale: scale };
    }
  });
  stage.addEventListener("pointermove", function (e) {
    if (!pointers.has(e.pointerId)) return;
    var prev = pointers.get(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && pinchStart) {
      var p = Array.from(pointers.values());
      var dist = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      var rect = stage.getBoundingClientRect();
      zoomTo(pinchStart.scale * (dist / pinchStart.dist), (p[0].x + p[1].x) / 2 - rect.left, (p[0].y + p[1].y) / 2 - rect.top);
    } else if (pointers.size === 1) {
      var dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) dragged = true;
      stage.scrollLeft -= dx;
      stage.scrollTop -= dy;
    }
  });
  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = null;
  }
  stage.addEventListener("pointerup", function (e) {
    var wasSingle = pointers.size === 1;
    endPointer(e);
    // A plain click on the dark area (not a drag, not on the image) closes the viewer.
    // (Pointer capture retargets events to the stage, so check what's really under the pointer.)
    if (wasSingle && !dragged && document.elementFromPoint(e.clientX, e.clientY) === stage) dialog.close();
  });
  stage.addEventListener("pointercancel", endPointer);
})();
