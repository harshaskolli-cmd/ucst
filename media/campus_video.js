(function () {
  "use strict";
  var IDS = ["1REboiISKG1L97r9_6CqbG2eCL4XEIMAl", "1zqsQg0tkqsxJ3CWJKzXrOCuxgkkgbtUs", "1qTt7XzN0uIe_o26rByrRMg8211WZ8CZv", "1nf1wskH1ow7c3s0aQO7xJos-ik3TBg2f", "1-VK7THgmtGNOww3fmU8L9aHXhEAaXbCB", "1wmQIiXWOoteJDNCxh1_S7Zhp0Pj_2Ew2", "1Be3GzW0blFZP8xf5tw1Z9KZ8u2Iziyi8", "1p3i0igWqPQkYF8VOpo5UjIkEoS_Nh8n_", "1W6RlsL7FLoxLCSpBcL2Z0wKbYvzYv3gE", "11pUbt1IvfddsCDxJBAvsrmGGN88bzB5J", "1US2JIrDnuVp_OpYESSN6OfqHv14fGXrQ", "1gUrgtPNPndKCVN3cD_lGL9edhRP9B4nk", "1bhe4lOm7UJzMEocn_cWDdP5qZaKbBvlE", "1igQVChiDP_JwasgeVDLXaWWpVOiZJfhn", "1G4ib1kJfI5WEJT9n7HpFxfGXE0ejIyr4", "1lVIwKmrSX1EoDQD5hBiZixS4oLFZ0JQq", "19yRa_ILVgKKg-csdNz9_4XOi3LtjxylR"];
  var V = [null].concat(IDS.map(function (id, i) { return { id: id, k: "Campus Tour", t: "Part " + (i + 1) + " of " + IDS.length, d: "" }; }));
  var CSS = ".cv-sec{background:#0b1f2e;color:#fff;padding:clamp(28px,5vw,64px) 0}.cv-sec.cv-home{padding:clamp(20px,3vw,40px) 0 clamp(28px,4vw,56px)}" +
    ".cv-intro{max-width:900px;margin:0 auto clamp(24px,4vw,44px);padding:0 20px;text-align:center}.cv-eye{display:block;letter-spacing:.18em;text-transform:uppercase;font-size:13px;font-weight:700;color:#f0a400;margin-bottom:10px}" +
    ".cv-h{font-family:inherit;font-size:clamp(26px,3.6vw,44px);line-height:1.15;margin:0 0 10px;color:#fff}.cv-p{margin:0 auto;color:#c8d6e0;max-width:620px;font-size:clamp(15px,1.4vw,18px)}" +
    ".cv-scene{width:min(1400px,96vw);margin:0 auto clamp(28px,5vw,64px);opacity:0;transform:translateY(34px);transition:opacity .8s ease,transform .8s ease}.cv-scene.cv-in{opacity:1;transform:none}.cv-scene:last-of-type{margin-bottom:0}" +
    ".cv-card{position:relative;display:block;width:100%;aspect-ratio:16/9;max-height:84vh;border:0;padding:0;border-radius:6px;overflow:hidden;cursor:pointer;background:radial-gradient(120% 120% at 20% 10%,#1b5fae 0%,#0f3a4f 55%,#07141d 100%);box-shadow:0 30px 70px -28px rgba(0,0,0,.8);color:#fff;font:inherit;text-align:left}" +
    ".cv-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 6s ease}.cv-scene.cv-in .cv-card img{transform:scale(1.06)}.cv-card:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,.78) 100%);transition:opacity .3s}" +
    ".cv-play{position:absolute;right:clamp(16px,3vw,40px);top:50%;z-index:2;width:clamp(64px,7vw,92px);height:clamp(64px,7vw,92px);margin-top:calc(clamp(64px,7vw,92px)/-2);border-radius:50%;background:rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;transition:transform .25s}.cv-card:hover .cv-play,.cv-card:focus-visible .cv-play{transform:scale(1.1)}" +
    ".cv-play:before{content:'';margin-left:6px;border-left:24px solid #1b5fae;border-top:14px solid transparent;border-bottom:14px solid transparent}" +
    ".cv-cap{position:absolute;left:clamp(18px,4vw,56px);right:clamp(100px,16vw,200px);bottom:clamp(16px,4vw,48px);z-index:2}.cv-cap small{display:block;letter-spacing:.16em;text-transform:uppercase;font-size:12px;font-weight:700;color:#f0a400;margin-bottom:6px}.cv-cap b{display:block;font-size:clamp(20px,3vw,38px);line-height:1.15;font-weight:700;margin-bottom:6px}.cv-cap span{display:block;font-size:clamp(14px,1.5vw,19px);color:#dbe6ee}" +
    ".cv-card:focus-visible{outline:3px solid #f0a400;outline-offset:3px}.cv-card.cv-on:after,.cv-card.cv-on .cv-play,.cv-card.cv-on .cv-cap,.cv-card.cv-on img{display:none}.cv-card iframe{position:absolute;inset:0;width:100%;height:100%;border:0;z-index:3;background:#000}" +
    ".cv-alt{display:block;margin:10px 0 0;text-align:center;font-size:13px;color:#9cc4f2;text-decoration:underline;text-underline-offset:3px}.cv-alt:hover{color:#fff}.cv-note{text-align:center;font-size:13px;color:#8fa6b6;margin:26px 20px 0}.cv-note a{color:#9cc4f2}@media(prefers-reduced-motion:reduce){.cv-scene{opacity:1;transform:none;transition:none}.cv-card img{transition:none}}";
  function css() { if (document.querySelector("style[data-cv]")) return; var s = document.createElement("style"); s.setAttribute("data-cv", "1"); s.textContent = CSS; document.head.appendChild(s); }
  var io = null;
  function reveal(el) {
    if (!("IntersectionObserver" in window)) { el.classList.add("cv-in"); return; }
    if (!io) io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("cv-in"); io.unobserve(e.target); } }); }, { threshold: 0.15 });
    io.observe(el);
  }
  function scene(v) {
    var fig = document.createElement("div"); fig.className = "cv-scene";
    var b = document.createElement("button"); b.type = "button"; b.className = "cv-card"; b.setAttribute("aria-label", "Play video: " + v.t);
    var im = document.createElement("img"); im.alt = ""; im.loading = "lazy"; im.referrerPolicy = "no-referrer";
    im.src = "https://drive.google.com/thumbnail?id=" + v.id + "&sz=w1600"; im.onerror = function () { im.remove(); };
    b.appendChild(im);
    b.insertAdjacentHTML("beforeend", '<span class="cv-play"></span><span class="cv-cap"><small></small><b></b><span></span></span>');
    b.querySelector("small").textContent = v.k; b.querySelector("b").textContent = v.t; if (v.d) b.querySelector(".cv-cap > span").textContent = v.d; else b.querySelector(".cv-cap > span").remove();
    b.addEventListener("click", function () {
      if (b.querySelector("iframe")) return;
      var f = document.createElement("iframe"); f.src = "https://drive.google.com/file/d/" + v.id + "/preview"; f.allow = "autoplay; fullscreen"; f.allowFullscreen = true; f.title = v.t;
      b.classList.add("cv-on"); b.appendChild(f);
    });
    fig.appendChild(b);
    var al = document.createElement("a"); al.className = "cv-alt"; al.target = "_blank"; al.rel = "noopener"; al.href = "https://drive.google.com/file/d/" + v.id + "/view";
    al.textContent = "Video not playing on your device? Open it in Google Drive \u2197"; fig.appendChild(al);
    reveal(fig); return fig;
  }
  function section(id, eye, title, intro, vids, home) {
    var s = document.createElement("section"); s.className = "cv-sec" + (home ? " cv-home" : ""); s.setAttribute("data-cv-sec", id);
    var i = document.createElement("div"); i.className = "cv-intro"; i.innerHTML = '<span class="cv-eye"></span><h2 class="cv-h"></h2><p class="cv-p"></p>';
    i.children[0].textContent = eye; i.children[1].textContent = title; i.children[2].textContent = intro; s.appendChild(i);
    vids.forEach(function (v) { s.appendChild(scene(v)); });
    s.insertAdjacentHTML("beforeend", '<p class="cv-note">Videos play from Google Drive. If a video asks for access, <a target="_blank" rel="noopener" href="https://drive.google.com/drive/folders/1KNaxGj03cMBSJSe71qhYUg5rhFO99ez7">open the folder</a>.</p>');
    return s;
  }
  function findText(re, tags) {
    var els = document.querySelectorAll(tags);
    for (var i = 0; i < els.length; i++) if (re.test((els[i].textContent || "").trim()) && !els[i].closest("[data-cv-sec],[data-ucst-fac=root]")) return els[i];
    return null;
  }
  function top(el) { return el.closest("section") || el.parentElement; }
  function inject() {
    var h = (location.hash || "#home").replace(/^#/, "");
    if (false) {
      if (document.querySelector('[data-cv-sec="home"]')) return;
      var a = findText(/^To Achieve Academic Excellence/, "p,div,span,strong,h1,h2,h3");
      if (!a) return;
      var host = a; while (host.parentElement && host.parentElement !== document.body && host.parentElement.children.length === 1) host = host.parentElement;
      host = top(host) === host.parentElement && host.tagName !== "SECTION" ? host : top(host);
      css(); host.insertAdjacentElement("afterend", section("home", "Campus Tour", "A Tour of Our Campus", "Press play to explore University College of Science, Tumkur.", [V[0]], true));
    } else if (h === "campus-life") {
      if (document.querySelector('[data-cv-sec="life"]')) return;
      var g = findText(/^(On Campus|Gallery)$/, "h1,h2,h3"); if (!g) return;
      css(); top(g).insertAdjacentElement("afterend", section("life", "Campus Tour", "Our Campus, Through the Lens", "Scroll down to move through the tour – press play on any scene.", V.slice(1), false));
    }
  }
  var busy = false;
  function run() { if (busy) return; busy = true; try { inject(); } catch (e) {} busy = false; }
  function boot() { window.addEventListener("hashchange", function () { setTimeout(run, 50); setTimeout(run, 600); }); new MutationObserver(run).observe(document.body, { childList: true, subtree: true }); run(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
