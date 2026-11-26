/* UCST site refinements – applied on top of the existing pages. Idempotent; safe to run repeatedly. */
(function () {
  "use strict";
  var FAC = function () { return window.UCST_FACULTY || []; };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function T(e) { return (e.textContent || "").replace(/\s+/g, " ").trim(); }
  function hide(e) { if (e) e.setAttribute("data-ucst-hide", "1"); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function once(e, k) { if (!e) return false; if (e.getAttribute("data-ucst-" + k)) return false; e.setAttribute("data-ucst-" + k, "1"); return true; }

  /* ---------------------------------------------------------------- CSS */
  var CSS = [
    "[data-ucst-hide]{display:none!important}",
    /* justified paragraphs */
    "#campus-life--achievements .split{display:block!important}",
    "#about--principal p,#about--principal .prose,#about--vision article.card p,#about--overview .prose p{text-align:justify!important;text-justify:inter-word;hyphens:auto}",
    "@media(max-width:700px){.leader{flex-direction:column!important;align-items:center!important}.leader>*:not(.leader__photo){max-width:100%}.leader__photo{width:200px!important;height:200px!important}#about--recognition .split{display:block!important}#about--recognition ol.timeline{margin-top:16px!important}}",
    "#events .split{display:block!important}",
    "section.view[data-view=events] .empty,section.view[data-view=events] .stack{max-width:none!important;width:100%!important}",
    ".ucst-contact{margin:18px 0 0;padding:14px 16px;border-radius:12px;background:#eef3f7;font-size:.92rem;line-height:1.55;color:var(--ink-2,#3c4855);text-align:left!important}",
    ".ucst-contact strong{color:var(--navy,#0d3d70)}",
    ".ucst-contact div{margin:.2rem 0}",
    ".ucst-courses{margin:18px 0 0;background:#fff;border-radius:14px;padding:18px 22px;box-shadow:0 8px 24px -16px rgba(15,58,79,.35)}.ucst-courses h3{font-size:1.1rem;color:var(--navy,#0d3d70);margin:0 0 8px}.ucst-courses ul{margin:0;padding-left:1.2rem;line-height:1.7}",
    ".ucst-phd{margin:18px auto 0;max-width:900px;text-align:left}.ucst-phd p{max-width:none!important;width:100%;text-align:justify;margin:0 0 .8rem}.ucst-phd ul{margin:0;padding-left:1.2rem;line-height:1.65}",
    ".ucst-j{text-align:justify!important;text-justify:inter-word;hyphens:auto;-webkit-hyphens:auto}",
    "main p,.leader__message{text-align:left}",
    ".leader__message{text-align:justify!important;text-justify:inter-word;hyphens:auto}",
    ".prog-card p,.tile p,.feature-tile p,.dept-card p,.ucst-df p,.page-banner p,.hero p,.tile p,.ticker p,.contact-band p{text-align:inherit!important}",
    /* vision / mission strip */
    ".ucst-vm{background:var(--mint,#e3f5ee);border-bottom:1px solid #cfe7dc;overflow:hidden}",
    ".ucst-vm__wrap{max-width:1240px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;gap:0;position:relative}",
    ".ucst-vm__item{display:flex;align-items:baseline;gap:10px;white-space:nowrap;color:var(--navy,#0d3d70);min-width:0}",
    ".ucst-vm__label{font-weight:800;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--orange,#b9581b);flex:none}",
    ".ucst-vm__text{font-weight:600;font-size:clamp(.92rem,1.2vw,1.05rem)}",
    ".ucst-vm__sep{flex:none;width:1px;align-self:stretch;background:#9cc4b3;margin:0 28px}",
    ".ucst-vm--static .ucst-vm__wrap{justify-content:space-between}",
    ".ucst-vm--static .ucst-vm__sep{margin:0 auto}",
    ".ucst-vm--static .ucst-vm__item:first-child{margin-right:24px}",
    ".ucst-vm--move .ucst-vm__wrap{display:block;padding:12px 0;max-width:none}",
    ".ucst-vm__track{display:inline-flex;align-items:center;white-space:nowrap;animation:ucstvm 55s linear infinite;will-change:transform}",
    ".ucst-vm--move:hover .ucst-vm__track{animation-play-state:paused}",
    ".ucst-vm--move .ucst-vm__sep{margin:0 36px}",
    "@keyframes ucstvm{from{transform:translateX(0)}to{transform:translateX(-50%)}}",
    "@media(prefers-reduced-motion:reduce){.ucst-vm__track{animation:none}.ucst-vm--move .ucst-vm__wrap{overflow-x:auto}}",
    "html{scroll-behavior:smooth}",
    "@keyframes ucstfade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}",
    "section.view:not([hidden]){animation:ucstfade .55s ease both}",
    "@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}section.view{animation:none!important}}",
    /* hover cards must not stretch siblings */
    "ul:has(>li>article.prog-card),ul:has(>li.ucst-cmt),ul:has(>li>.ucst-rv),ul:has(>li.ucst-rvc){align-items:start!important}",
    "li.ucst-rvc,li:has(>article.prog-card){align-self:start}",
    ".ucst-rv{max-height:0;opacity:0;overflow:hidden;transition:max-height .4s ease,opacity .3s ease,margin .3s;margin:0}",
    "@media(hover:hover){.ucst-rvc:hover .ucst-rv{max-height:420px;opacity:1;margin-top:.6rem}}",
    ".ucst-rvc.ucst-open .ucst-rv{max-height:420px!important;opacity:1!important;margin-top:.6rem!important}",
    ".ucst-rvc{transition:box-shadow .25s,transform .25s;cursor:default}",
    ".ucst-rvc:hover,.ucst-rvc.ucst-open{box-shadow:0 14px 32px -14px rgba(15,58,79,.35);outline:none}",
    /* principal */
    ".leader{display:flex!important;align-items:center!important;justify-content:center!important;gap:clamp(28px,5vw,72px)!important;grid-template-columns:none!important}",
    ".leader>*:not(.leader__photo){max-width:640px;text-align:left!important;margin:0!important}",
    ".leader .leader__name,.leader .leader__role,.leader p,.leader a.link{text-align:left!important}",
    ".leader__photo{box-shadow:0 0 0 4px #fff,0 0 0 6px rgba(27,95,174,.55),0 22px 44px -16px rgba(15,58,79,.55)!important;border:0!important;width:clamp(220px,26vw,300px)!important;height:clamp(220px,26vw,300px)!important}",
    ".leader__photo img{object-position:50% 0!important;filter:contrast(1.05) saturate(1.06) brightness(1.02)}",
    /* vision & mission section */
    "#about--vision{padding-block:40px!important}",
    "#about--vision .section-title{margin-bottom:16px!important}",
    "#about--vision .grid{gap:18px!important;align-items:stretch!important}",
    "#about--vision article.card{padding:20px 24px!important;min-height:0!important;height:auto!important}",
    "#about--vision article.card p,#about--vision article.card li{font-family:inherit!important;font-size:1rem!important;line-height:1.65!important;font-weight:400!important;font-style:normal!important;margin:0!important}",
    /* milestones strip */
    "#about--recognition ol.timeline{display:flex!important;gap:16px;overflow-x:auto;scroll-snap-type:x proximity;padding:8px 4px 16px!important;margin:12px 0 0!important;max-height:none!important;scroll-behavior:smooth;list-style:none;border:0!important}",
    "#about--recognition ol.timeline::before,#about--recognition ol.timeline>li::before,#about--recognition ol.timeline>li::after{display:none!important}",
    "#about--recognition ol.timeline>li{flex:0 0 min(250px,78vw);scroll-snap-align:start;background:#fff;border-radius:14px;padding:16px 18px!important;margin:0!important;box-shadow:0 8px 24px -14px rgba(15,58,79,.35);border-top:4px solid var(--orange,#b9581b)!important;height:auto;position:static!important}",
    "#about--recognition ol.timeline>li{display:block!important}",
    ".ucst-cmt p,.ucst-cmt dd,.ucst-rvc p{text-align:left!important}",
    "#about--recognition ol.timeline .timeline__year{display:block;font-weight:800;font-size:1.5rem;color:var(--blue,#1b5fae);margin-bottom:4px;position:static!important}",
    "#about--recognition ol.timeline h3{font-size:1rem!important;margin:0 0 4px!important}",
    "#about--recognition ol.timeline p{font-size:.9rem!important;margin:0!important;text-align:left!important}",
    /* past events: compact scroll box */
    "#events--past ol.timeline{max-height:300px;overflow-y:auto;scroll-behavior:smooth;padding-right:10px!important;scrollbar-width:thin}",
    /* gallery */
    ".gallery figure,.gallery figure img{margin:0!important}",
    ".gallery figure{padding:0!important;background:none!important;box-shadow:none!important;aspect-ratio:2.3/1!important;height:auto!important;display:block!important;border-radius:12px;overflow:hidden}",
    ".gallery figure img{width:100%!important;height:100%!important;display:block;cursor:zoom-in;transition:transform .4s}",
    ".gallery figure:hover img{transform:scale(1.03)}",
    ".gallery figure img{aspect-ratio:auto!important;max-height:none!important;min-height:0!important;object-fit:cover!important;object-position:50% 0!important;height:100%!important}",
    ".gallery figure::before,.gallery figure::after{display:none!important}",
    ".gallery figure{position:relative!important}",
    ".gallery figure img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}",
    ".gallery>*{min-height:0!important;grid-row:auto!important}",
    ".gallery figcaption{display:none!important}",
    ".gallery{align-items:start!important;grid-auto-rows:auto!important}",
    ".gallery figure{align-self:start!important;aspect-ratio:2.3/1!important;min-height:0!important}",
    "figure.wide-photo img{cursor:zoom-in;max-height:440px;width:100%;object-fit:cover}",
    /* e-mail format */
    ".ucst-fmt textarea{min-height:330px;line-height:1.5}",
    ".ucst-fmt .row2{display:grid;grid-template-columns:1fr;gap:14px}",
    /* principal photo */
    ".leader__photo{box-shadow:0 0 0 4px #fff,0 0 0 6px rgba(27,95,174,.55),0 22px 44px -16px rgba(15,58,79,.55)!important;border:0!important;width:clamp(150px,18vw,200px)!important;height:clamp(150px,18vw,200px)!important;max-width:none!important;border-radius:50%!important;overflow:hidden;aspect-ratio:1/1!important;cursor:zoom-in;margin-left:auto;margin-right:auto;box-shadow:0 10px 30px -12px rgba(15,58,79,.45);border:4px solid #fff;flex:none}",
    ".leader__photo img{width:100%!important;height:100%!important;object-fit:cover;object-position:50% 20%;border-radius:50%!important;display:block}",
    ".ucst-lb{position:fixed;inset:0;z-index:2147483000;background:rgba(8,18,28,.88);display:flex;align-items:center;justify-content:center;padding:24px;cursor:zoom-out}",
    ".ucst-lb img{max-width:min(92vw,720px);max-height:88vh;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.6);background:#fff}",
    ".ucst-lb button{position:absolute;top:16px;right:20px;font:inherit;font-weight:700;border:0;border-radius:999px;padding:10px 18px;cursor:pointer}",
    /* programme cards: expand on hover */
    ".prog-card{transition:box-shadow .25s,transform .25s}",
    ".prog-card .ucst-prog-short{margin:.35rem 0 0}",
    ".prog-card .ucst-prog-more{max-height:0;opacity:0;overflow:hidden;transition:max-height .35s ease,opacity .3s ease,margin .3s;margin:0;color:var(--ink-2,#3c4855);font-size:.92rem;line-height:1.5}",
    "@media(hover:hover){.prog-card:hover .ucst-prog-more{max-height:420px;opacity:1;margin-top:.7rem}.prog-card:hover{box-shadow:0 16px 36px -14px rgba(15,58,79,.35);transform:translateY(-2px)}}",
    ".prog-card.ucst-open .ucst-prog-more,.prog-card:focus-visible .ucst-prog-more{max-height:420px;opacity:1;margin-top:.7rem}",
    ".prog-card.ucst-open{box-shadow:0 16px 36px -14px rgba(15,58,79,.35);transform:translateY(-2px)}.prog-card:focus{outline:none}.prog-card:focus-visible{outline:3px solid var(--focus,#f0a400);outline-offset:2px}",
    /* committees */
    ".ucst-cmt{min-height:13.5rem}","#infrastructure--facilities ul.grid{align-items:start!important}",".ucst-rvc{min-height:7.5rem;display:flex!important;flex-direction:column;justify-content:center}.ucst-rvc>h3,.ucst-rvc>h4{margin:0}",,
    "ul:has(>li>.ucst-rvc),ul:has(>li.ucst-rvc){align-items:start!important}",
    ".ucst-cmt h3{line-height:1.35;margin-bottom:.35rem}",
    ".ucst-cmt:not(.ucst-open):not(:hover) .ucst-cmt__brief{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}",
    ".ucst-cmt .ucst-cmt__more ul{margin:.5rem 0 0}",
    ".ucst-show{position:relative;width:100%;aspect-ratio:auto;min-height:22rem;flex:1;align-self:stretch;border-radius:14px;overflow:hidden;background:#0f3a4f}",
    ".ucst-show img{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:cover;object-position:50% 12%!important;opacity:0;transition:opacity .8s ease;margin:0!important;border-radius:0!important}",
    ".ucst-show img.is-on{opacity:1}",
    ".ucst-fill{display:flex!important;height:100%;min-height:22rem;background:none!important;box-shadow:none}.ucst-fill img{width:100%!important;height:100%!important;min-height:22rem;object-fit:cover!important;object-position:50% 12%!important;border-radius:14px}",
    ".ucst-show__dots{position:absolute;left:0;right:0;bottom:10px;display:flex;justify-content:center;gap:6px;z-index:2}",
    ".ucst-show__dots i{width:7px;height:7px;border-radius:99px;background:rgba(255,255,255,.55);transition:width .3s,background .3s}",
    ".ucst-show__dots i.is-on{width:20px;background:#fff}",
    ".ucst-cmt{cursor:default}",
    ".ucst-cmt:focus{outline:none}.ucst-cmt:focus-visible{outline:3px solid var(--focus,#f0a400);outline-offset:2px}",
    ".ucst-cmt .ucst-cmt__brief{margin:.4rem 0 0;font-size:.95rem;color:var(--ink-2,#3c4855)}",
    ".ucst-cmt .ucst-cmt__more{max-height:0;opacity:0;overflow:hidden;transition:max-height .4s ease,opacity .3s ease,margin .3s;margin:0;font-size:.92rem;line-height:1.5}",
    "@media(hover:hover){.ucst-cmt:hover .ucst-cmt__more{max-height:520px;opacity:1;margin-top:.7rem}}",
    ".ucst-cmt.ucst-open .ucst-cmt__more,.ucst-cmt:focus-visible .ucst-cmt__more{max-height:520px;opacity:1;margin-top:.7rem}",
    ".ucst-cmt__more dt{font-weight:800;color:var(--navy,#0d3d70);margin-top:.55rem;font-size:.82rem;letter-spacing:.04em;text-transform:uppercase}",
    ".ucst-cmt__more dd{margin:.15rem 0 0}",
    /* department cards: equal size, no sub-text */
    ".dept-card{height:100%;min-height:96px;display:flex!important;align-items:center}",
    ".dept-card p{display:none!important}",
    "#academics--combinations li.card{height:100%;min-height:104px}",
    /* department faculty */
    ".ucst-df{width:100%;box-sizing:border-box;align-self:stretch;justify-self:stretch;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,230px));gap:22px;justify-content:center;list-style:none;padding:0;margin:18px 0 0}",
    ".ucst-df__card{display:flex;flex-direction:column;height:100%;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px -12px rgba(15,58,79,.3);border-bottom:4px solid var(--blue,#1b5fae);text-decoration:none;color:inherit}",
    ".ucst-df__ph{aspect-ratio:4/5;background:linear-gradient(135deg,#164a63,#1b5fae);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:2.6rem;overflow:hidden}",
    ".ucst-df__ph img{width:100%;height:100%;object-fit:cover;display:block}",
    ".ucst-df__b{padding:14px 16px 16px;display:flex;flex-direction:column;gap:3px;flex:1}",
    ".ucst-df__n{font-weight:800;color:var(--navy,#0d3d70);font-size:1.05rem;line-height:1.25}",
    ".ucst-df__r{color:var(--ink-2,#3c4855);font-weight:600;font-size:.95rem}",
    ".ucst-df__q{color:var(--muted,#5b6774);font-size:.85rem}",
    ".ucst-df__go{margin-top:auto;padding-top:10px;font-weight:700;color:var(--blue,#1b5fae);font-size:.92rem}",
    ".ucst-df__card:hover{transform:translateY(-3px)}",
    ".ucst-df__card{transition:transform .2s}",
    /* infrastructure extras */
    ".ucst-lab{margin:.7rem 0 0;padding-left:1.1rem;font-size:.95rem;line-height:1.55;color:var(--ink-2,#3c4855)}",
    /* e-services request form */
    ".ucst-req{background:#fff;border-radius:16px;box-shadow:0 10px 34px -16px rgba(15,58,79,.35);padding:clamp(18px,3vw,32px);max-width:880px;margin:20px auto 0}",
    ".ucst-req form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}",
    ".ucst-req label{display:flex;flex-direction:column;gap:6px;font-weight:700;color:var(--navy,#0d3d70);font-size:.9rem}",
    ".ucst-req .full{grid-column:1/-1}",
    ".ucst-req input,.ucst-req select,.ucst-req textarea{font:inherit;font-weight:400;color:var(--ink,#1b2632);padding:11px 12px;border:1px solid var(--line-2,#d2d9df);border-radius:10px;background:#fff;width:100%;box-sizing:border-box}",
    ".ucst-req input:focus,.ucst-req select:focus,.ucst-req textarea:focus{outline:3px solid var(--focus,#f0a400);outline-offset:1px}",
    ".ucst-req__actions{display:flex;gap:12px;flex-wrap:wrap}",
    ".ucst-req__btn{font:inherit;font-weight:700;padding:12px 22px;border-radius:999px;border:2px solid var(--blue,#1b5fae);background:var(--blue,#1b5fae);color:#fff;cursor:pointer}",
    ".ucst-req__btn.alt{background:#fff;color:var(--blue,#1b5fae)}",
    ".ucst-req__note{font-size:.88rem;color:var(--muted,#5b6774);margin:12px 0 0}",
    "@media(max-width:640px){.ucst-req form{grid-template-columns:1fr}}",
    /* ---- round 3 ---- */
    ".prog-card{display:flex!important;flex-direction:column!important;min-height:15rem;cursor:pointer}",
    ".prog-card__strip{background:var(--blue,#1b5fae)!important;color:#fff!important}",
    ".prog-card__body{flex:1 1 auto;display:flex!important;flex-direction:column;align-items:center;text-align:center}",
    ".prog-card .ucst-vdw,.prog-card .ucst-vd{display:none!important}",
    ".prog-card .ucst-vd{display:inline-block;background:var(--navy,#0d3d70)!important;color:#fff!important;border:0!important;border-radius:999px;padding:.6rem 1.3rem;font:inherit;font-weight:700;font-size:.9rem;cursor:pointer;opacity:1!important;box-shadow:none!important}",
    ".prog-card .ucst-prog-more{text-align:center}.prog-card .ucst-prog-more a{display:inline-block;margin-top:.5rem;font-weight:700}",
    ".ucst-explore{display:inline-flex;align-items:center;gap:8px;margin-top:18px;padding:.7rem 1.4rem;border-radius:999px;background:var(--blue,#1b5fae);color:#fff;font-weight:700;font-size:.95rem;box-shadow:0 10px 22px -12px rgba(27,95,174,.7)}",
    ".brand__tile img{object-fit:contain!important;background:#fff}",
    /* principal + event slider */
    ".leader.ucst-leader2{display:grid!important;grid-template-columns:minmax(0,45fr) minmax(0,55fr)!important;gap:clamp(24px,4vw,56px)!important;align-items:center!important;justify-content:stretch!important}",
    ".leader.ucst-leader2>.ucst-pr{display:flex;align-items:center;gap:clamp(16px,2.4vw,28px);max-width:none!important;min-width:0}",
    ".ucst-leader2 .leader__photo{width:clamp(130px,13vw,180px)!important;height:clamp(130px,13vw,180px)!important;flex:none}",
    ".ucst-leader2 .ucst-pr>*:not(.leader__photo){min-width:0;max-width:none!important}",
    ".ucst-leader2 .leader__message{font-size:1rem!important;line-height:1.6!important}.ucst-leader2 .leader__name{font-size:1.25rem!important}",
    ".leader.ucst-leader2>.ucst-slider{max-width:none!important;width:100%}",
    ".leader .leader__message,.leader p.leader__message{text-align:justify!important;text-justify:inter-word;hyphens:auto;-webkit-hyphens:auto}",
    ".ucst-leader2 .leader__body{display:flex!important;flex-direction:column;align-items:flex-start!important;text-align:left}",
    ".ucst-leader2 .leader__body>*{align-self:flex-start!important;margin-left:0!important;margin-right:0!important;max-width:none!important}",
    ".ucst-leader2 .leader__body .eyebrow{text-align:left!important}",
    ".ucst-leader2 .leader__body>div{padding-left:0!important}",
    ".ucst-msgs{align-self:stretch;display:flex;flex-direction:column;border-radius:18px;overflow:hidden;background:#fff;border:1px solid rgba(15,58,79,.12);box-shadow:0 22px 44px -26px rgba(15,58,79,.45);min-height:19rem}",
    ".ucst-msgs__top{display:flex;align-items:center;gap:.7rem;padding:1rem 1.3rem;background:linear-gradient(120deg,#0f3a4f,#1b5fae);color:#fff;font-weight:800;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase}",
    ".ucst-msgs__ico{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.18);font-size:1rem;letter-spacing:0}",
    ".ucst-msgs__body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:2rem 1.5rem;text-align:center;background:linear-gradient(180deg,#f6f9fc,#fff)}",
    ".ucst-msgs__line{width:56px;height:4px;border-radius:4px;background:var(--accent,#c0561b)}",
    ".ucst-msgs__body p{margin:0;color:#3c4855;font-size:1.05rem;font-weight:600;max-width:22rem}",
    ".ucst-slider{position:relative;border-radius:18px;overflow:hidden;background:#0f3a4f;box-shadow:0 22px 44px -22px rgba(15,58,79,.6);aspect-ratio:16/10}",
    ".ucst-slider__stage{position:absolute;inset:0}",
    ".ucst-slider__stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.05);transition:opacity .9s ease,transform 6s ease;cursor:zoom-in}",
    ".ucst-slider__stage img.is-on{opacity:1;transform:scale(1)}",
    ".ucst-slider__head{position:absolute;z-index:3;top:0;left:0;right:0;padding:12px 16px 26px;font-weight:800;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:linear-gradient(180deg,rgba(8,30,44,.8),rgba(8,30,44,0));text-align:left!important}",
    ".ucst-slider__cap{position:absolute;z-index:3;left:0;right:0;bottom:0;padding:38px 56px 34px 16px;color:#fff;font-weight:600;font-size:.95rem;background:linear-gradient(0deg,rgba(8,30,44,.85),rgba(8,30,44,0));text-align:left!important;pointer-events:none}",
    ".ucst-slider__nav{position:absolute;z-index:4;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;border:0;background:rgba(255,255,255,.9);color:#0d3d70;font-size:22px;line-height:1;cursor:pointer;display:grid;place-items:center;box-shadow:0 6px 16px -6px rgba(0,0,0,.5);padding:0}",
    ".ucst-slider__prev{left:10px}.ucst-slider__next{right:10px}",
    ".ucst-slider__dots{position:absolute;z-index:4;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:7px}",
    ".ucst-slider__dots button{width:8px;height:8px;border-radius:999px;border:0;padding:0;background:rgba(255,255,255,.55);cursor:pointer;transition:width .3s,background .3s}.ucst-slider__dots button[aria-current=true]{background:#fff;width:24px}",
    ".ucst-slider__empty{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:#fff;padding:24px;font-weight:600}",
    ".ucst-slider--cine.ucst-slider--caps .ucst-slider__cap{display:block!important;padding:44px 20px 22px;font-size:1rem;letter-spacing:.01em}",
    ".ucst-slider--cine.ucst-slider--wide{min-height:0;aspect-ratio:2/1!important;border-radius:20px;margin-top:1.5rem}",
    "@media(max-width:700px){.ucst-slider--cine.ucst-slider--wide{aspect-ratio:4/3!important}}",
    ".ucst-slider--wide .ucst-slider__stage img:nth-child(3n+1){transform:translate3d(-1.5%,0,0) scale(1.07)!important}",
    ".ucst-slider--wide .ucst-slider__stage img:nth-child(3n+1).is-on{transform:translate3d(1.5%,0,0) scale(1.07)!important}",
    ".ucst-slider--wide .ucst-slider__stage img:nth-child(3n+2){transform:translate3d(0,1%,0) scale(1.05)!important}",
    ".ucst-slider--wide .ucst-slider__stage img:nth-child(3n+2).is-on{transform:translate3d(0,-1%,0) scale(1.1)!important}",
    ".ucst-slider--wide .ucst-slider__stage img:nth-child(3n){transform:translate3d(1.5%,0,0) scale(1.07)!important}",
    ".ucst-slider--wide .ucst-slider__stage img:nth-child(3n).is-on{transform:translate3d(-1.5%,0,0) scale(1.07)!important}",
    ".ucst-hv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:brightness(.62) saturate(.92)}",
    ".ucst-hv-shade{position:absolute;inset:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,rgba(6,16,32,.38),rgba(6,16,32,.22) 45%,rgba(6,16,32,.5))}",
    ".ucst-slider--cine .ucst-slider__dots{bottom:14px}",
    ".ucst-slider--cine{aspect-ratio:auto!important;min-height:19rem;align-self:stretch}",
    ".ucst-slider--cine .ucst-slider__head,.ucst-slider--cine .ucst-slider__cap,.ucst-slider--cine .ucst-slider__nav{display:none!important}",
    ".ucst-slider--cine .ucst-slider__stage img{opacity:0;transition:opacity 1.8s ease,transform 14s linear;will-change:transform,opacity}",
    ".ucst-slider--cine .ucst-slider__stage img.is-on{opacity:1;transition:opacity 1.8s ease,transform 9s linear}",
    ".ucst-slider--cine .ucst-slider__stage img:nth-child(3n+1){transform:translate3d(-3%,0,0) scale(1.15)}",
    ".ucst-slider--cine .ucst-slider__stage img:nth-child(3n+1).is-on{transform:translate3d(3%,0,0) scale(1.15)}",
    ".ucst-slider--cine .ucst-slider__stage img:nth-child(3n+2){transform:translate3d(0,2.5%,0) scale(1.12)}",
    ".ucst-slider--cine .ucst-slider__stage img:nth-child(3n+2).is-on{transform:translate3d(0,-2.5%,0) scale(1.2)}",
    ".ucst-slider--cine .ucst-slider__stage img:nth-child(3n){transform:translate3d(3%,0,0) scale(1.15)}",
    ".ucst-slider--cine .ucst-slider__stage img:nth-child(3n).is-on{transform:translate3d(-3%,0,0) scale(1.15)}",
    "@media(prefers-reduced-motion:reduce){.ucst-slider--cine .ucst-slider__stage img,.ucst-slider--cine .ucst-slider__stage img.is-on{transition:opacity .6s ease;transform:scale(1.02)!important}}",
    "@media(max-width:900px){.leader.ucst-leader2{grid-template-columns:1fr!important}}",
    "@media(max-width:560px){.leader.ucst-leader2>.ucst-pr{flex-direction:column;text-align:center}.ucst-leader2 .ucst-pr .leader__message,.ucst-leader2 .ucst-pr p{text-align:justify!important}.ucst-leader2 .leader__photo{width:150px!important;height:150px!important}}",
    /* hero YouTube background */
    ".ucst-yt{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:0;transition:opacity 1s ease}.ucst-yt.is-ready{opacity:1}",
    ".ucst-yt iframe{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:0;max-width:none}",
    /* subsection consistency */
    "ul.grid:not(:has(>li>article.prog-card)):not(:has(>li.ucst-cmt)):not(:has(>li>.ucst-rv)):not(:has(>li.ucst-rvc)){align-items:stretch}",
    "ul.grid>li>.card,ul.grid>li>.card--flat,ul.grid>li>.link-card,ul.grid>li>.dept-card{height:100%;box-sizing:border-box}"
  ].join("\n");
  function css() { if ($("style[data-ucst-p]")) return; var s = document.createElement("style"); s.setAttribute("data-ucst-p", "1"); s.textContent = CSS; document.head.appendChild(s); }

  /* ---------------------------------------------------------- 1. utility bar duplicate */
  function utility() {
    var w0 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n0, kill = [];
    while ((n0 = w0.nextNode())) { if (/^\s*\$\/\$\s*$/.test(n0.nodeValue)) kill.push(n0); }
    kill.forEach(function (x) { x.nodeValue = ""; });
    $$(".utility .container *").forEach(function (e) {
      if (!e.children.length && /^Constituent College of Tumkur University$/i.test(T(e))) hide(e);
    });
  }

  /* ---------------------------------------------------------- 2. vision | mission strip */
  function vmStrip() {
    var v = $('main#main > section.view[data-view="home"]'); if (!v) return;
    var vis = $$("#about--vision article.card p"), vtxt = vis[0] ? T(vis[0]) : "", mtxt = vis[1] ? T(vis[1]) : "";
    if (!vtxt || !mtxt) return;
    var band = $(".ucst-vm");
    if (band && band.getAttribute("data-ucst-built")) return;
    if (!band) {
      var node = null, w = document.createTreeWalker(v, NodeFilter.SHOW_TEXT, null), n;
      while ((n = w.nextNode())) { if (/^\s*To Achieve Academic Excellence/.test(n.nodeValue) && !n.parentElement.closest("#about--vision,.ucst-vm")) { node = n.parentElement; break; } }
      if (!node) return;
      var host = node; while (host.parentElement && host.parentElement !== v && /Vision of the College/.test(T(host.parentElement)) && !host.parentElement.querySelector("section.hero,h1,.ticker")) host = host.parentElement;
      // host = the full-width band element
      band = document.createElement("div"); band.className = "ucst-vm ucst-vm--static";
      host.parentNode.insertBefore(band, host); hide(host);
    }
    function item(label, text) { return '<span class="ucst-vm__item"><span class="ucst-vm__label">' + label + '</span><span class="ucst-vm__text">' + esc(text) + "</span></span>"; }
    var pair = item("Vision", vtxt) + '<span class="ucst-vm__sep" aria-hidden="true"></span>' + item("Mission", mtxt);
    function build() {
      band.className = "ucst-vm ucst-vm--static";
      band.innerHTML = '<div class="ucst-vm__wrap" role="region" aria-label="Vision and Mission">' + pair + "</div>";
      var wrap = band.firstChild, need = 0;
      var kids = wrap.children; for (var i = 0; i < kids.length; i++) need += kids[i].getBoundingClientRect().width + (i ? 40 : 0);
      if (need > wrap.clientWidth - 40) {
        band.className = "ucst-vm ucst-vm--move";
        band.innerHTML = '<div class="ucst-vm__wrap" role="region" aria-label="Vision and Mission"><div class="ucst-vm__track">' + pair + '<span class="ucst-vm__sep" aria-hidden="true"></span>' + pair + '<span class="ucst-vm__sep" aria-hidden="true"></span></div></div>';
      }
    }
    build(); band.setAttribute("data-ucst-built", "1");
    if (!band.getAttribute("data-ucst-rs")) { band.setAttribute("data-ucst-rs", "1"); var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(build, 250); }); }
  }

  /* ---------------------------------------------------------- 3. principal photo lightbox */
  function openLB(src, alt) {
    var lb = document.createElement("div"); lb.className = "ucst-lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
    lb.innerHTML = '<img alt=""><button type="button">Close</button>'; var im = lb.querySelector("img"); im.src = src; im.alt = alt || "";
    function close() { lb.remove(); document.removeEventListener("keydown", key); }
    function key(e) { if (e.key === "Escape") close(); }
    lb.addEventListener("click", close); document.addEventListener("keydown", key); document.body.appendChild(lb);
  }
  function normName(n) { return String(n || "").toLowerCase().replace(/\b(dr|prof|mr|mrs|ms|smt|sri)\b\.?/g, "").replace(/[^a-z]/g, ""); }
  function facByName(n) { var k = normName(n); if (!k) return null; var l = FAC(); for (var i = 0; i < l.length; i++) if (normName(l[i].name) === k) return l[i]; return null; }
  function principal() {
    var pf = null; /* keep the original principal photograph */
    $$(".leader__photo").forEach(function (f) {
      var im0 = f.querySelector("img"); if (im0 && pf && !im0.getAttribute("data-ucst-ph")) { im0.setAttribute("data-ucst-ph", "1"); im0.removeAttribute("srcset"); im0.src = pf.photo; }
      if (!once(f, "lb")) return;
      f.setAttribute("tabindex", "0"); f.setAttribute("role", "button"); f.setAttribute("aria-label", "View the Principal's photograph in full");
      function open() { var im = f.querySelector("img"); if (im) openLB(im.currentSrc || im.src, "Dr. Sreenivasa S, Principal"); }
      f.addEventListener("click", open); f.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    $$("#about--principal a.doc-btn").forEach(hide);
    // principal photo on About page: use the same photo
    $$("#about--principal img").forEach(function (im) { if (pf && !im.getAttribute("data-ucst-ph")) { im.setAttribute("data-ucst-ph", "1"); im.removeAttribute("srcset"); im.src = pf.photo; } });
    // any other old-website faculty photo: replace with the new-data photo or hide the person
    $$("li.person").forEach(function (li) {
      if (li.closest("[data-ucst-fac]")) return; if (!once(li, "pp")) return;
      var h = li.querySelector("h3,h4,strong,.person__name"), d = facByName(h ? T(h) : ""), im = li.querySelector("img");
      if (d && d.photo && im) { im.removeAttribute("srcset"); im.src = d.photo; } else if (!d) hide(li);
    });
    // click-to-enlarge for gallery and wide photos
    if (!document.body.getAttribute("data-ucst-zoom")) {
      document.body.setAttribute("data-ucst-zoom", "1");
      document.addEventListener("click", function (e) { var im = e.target && e.target.closest && e.target.closest(".gallery img,figure.wide-photo img"); if (im) { e.preventDefault(); openLB(im.currentSrc || im.src, im.alt); } });
    }
  }

  /* ---------------------------------------------------------- 4. home / quick access clean-ups */
  function homeCleanup() {
    $$('a.tree-node[href="#e-services--forms"]').forEach(function (a) { if (once(a, "q")) { a.setAttribute("href", "#e-services--request"); var w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null), n; while ((n = w.nextNode())) { if (/Forms\s*&\s*Downloads/.test(n.nodeValue)) n.nodeValue = "Certificate Requests"; } } });
    $$("a.feature-tile").forEach(function (a) { hide(a); var p = a.parentElement; while (p && p.tagName !== "SECTION" && p !== document.body && !p.querySelector("a.tree-node") && !p.querySelector("h2")) { hide(p); if (p.parentElement && p.parentElement.children.length > 1) break; p = p.parentElement; } });
    $$('section[aria-label="Quick access"] a.tree-node').forEach(function (a) { var t = T(a); if (!/Programmes|Departments|Exam Results|Library|Certificate/i.test(t)) hide(a.closest("li") || a); });
    $$('section[aria-label="Quick access"] a[href*="uucms"]').forEach(function (a) { if (!a.classList.contains("tree-node")) hide(a); });
    $$('a[href="documents/committee2025-26.pdf"]').forEach(function (a) { var li = a.closest("li") || a; hide(li); });
  }

  /* ---------------------------------------------------------- 5. programmes */
  var PROG = {
    "B.Sc.": ["Nine subject combinations across the physical and life sciences.", "A degree in science built around three core subjects chosen from combinations such as PCM, PMCs, CBZ and CBBt. Students gain a strong base in theory and laboratory practice, preparing them for postgraduate study, research and careers in science and teaching. Awarded by Tumkur University."],
    "B.C.A.": ["Bachelor of Computer Applications.", "An undergraduate programme in computer applications covering programming, databases, networking and software development. It prepares students for careers in IT and for postgraduate study. Awarded by Tumkur University."],
    "B.C.A. (Data Science)": ["Computer applications with a focus on data.", "Combines the core computer-applications curriculum with data handling, statistics and analysis so that students can work with data in modern IT roles. Awarded by Tumkur University."],
    "B.Voc": ["Skill-based degree in hardware technology and networking.", "A vocational degree that combines classroom learning with practical training in computer hardware and networking, aimed at technical careers. Awarded by Tumkur University."],
    "M.Sc. Chemistry": ["Two-year master's programme in Chemistry.", "Advanced study of chemistry with laboratory and research training, offered by the DOSR in Chemistry. It is also the pathway to Ph.D. research in the department."],
    "Ph.D. Programme": ["Doctoral research programme.", "Research leading to a Ph.D. awarded by Tumkur University, carried out under a recognised research guide. The college has 20 recognised research guides across its departments. Admission and eligibility follow the University's Ph.D. regulations."]
  };
  function progKey(card) {
    var h = $("h3", card); if (!h) return null; var t = T(h);
    if (/^B\.Sc\./i.test(t)) return "B.Sc."; if (/Data Science/i.test(t)) return "B.C.A. (Data Science)"; if (/^B\.C\.A\./i.test(t)) return "B.C.A.";
    if (/^B\.Voc/i.test(t)) return "B.Voc"; if (/M\.Sc\.\s*Chemistry/i.test(t)) return "M.Sc. Chemistry"; if (/Ph\.D/i.test(t)) return "Ph.D. Programme"; return null;
  }
  function programmes() {
    $$("article.prog-card").forEach(function (c) {
      var li = c.closest("li"), t = T($("h3", c) || c);
      if (/M\.Sc\.\s*(Environmental|Physics)/i.test(t)) { hide(li || c); return; }
      if (!once(c, "pc")) return;
      var k = progKey(c), d = k && PROG[k]; if (!d) return;
      c.setAttribute("tabindex", "0");
      $$("span,button,a,div", c).forEach(function (x) { if (!x.children.length && /^Closed$/i.test(T(x))) { x.textContent = "View details"; x.style.cursor = "pointer"; c.setAttribute("data-ucst-adm", "1"); } });
      var p = $("p", c);
      if (!p) { p = document.createElement("p"); var hh = $("h3", c), after = hh.nextElementSibling && /^(P|SPAN|DIV)$/.test(hh.nextElementSibling.tagName) && !hh.nextElementSibling.querySelector("a,button") ? hh.nextElementSibling : hh; after.insertAdjacentElement("afterend", p); }
      p.textContent = d[0]; p.classList.add("ucst-prog-short");
      var m = document.createElement("div"); m.className = "ucst-prog-more"; m.textContent = d[1];
      if (c.getAttribute("data-ucst-adm")) m.insertAdjacentHTML("beforeend", ' <a class="link" href="#academics--admissions">Admission details \u2192</a>');
      if (p) p.insertAdjacentElement("afterend", m); else c.appendChild(m);
    });
    // home: replace the UG/PG/Doctoral tabs with a single "available courses" list
    var h2 = $("#home--programmes-title");
    if (h2 && once(h2, "t")) {
      h2.textContent = "Available Courses & Programmes";
      var sec = h2.closest("section");
      $$('[role="tablist"],button.tab', sec).forEach(hide);
      $$("div.tab-panel", sec).forEach(function (p) { if (p.getAttribute("data-panel") !== "all") hide(p); else p.removeAttribute("hidden"); });
      var allp = $('div.tab-panel[data-panel="all"]', sec); if (allp) { allp.hidden = false; allp.removeAttribute("hidden"); }
    }
    var ac = $("#academics--programmes-title"); if (ac && once(ac, "t")) ac.textContent = "Available Courses & Programmes";
    // PG list in academics: Chemistry only
    $$("#academics--postgraduate li").forEach(function (li) { if (/Environmental|Physics/i.test(T($("h3", li) || li))) hide(li); });
  }

  /* ---------------------------------------------------------- 6. committees */
  var CMT = {
    "College Development Council": ["Guides the overall academic, administrative and infrastructural development of the college.", "Members are nominated by the Principal and the University as per the rules. This is a nominated body and is not open for self-enrolment."],
    "Cultural Committee": ["Plans and conducts cultural programmes, festivals and talent showcases so that students can take part in music, dance, drama and the arts.", "Interested students give their name to the committee coordinator or their class representative at the start of the academic year and take part in auditions or rehearsals."],
    "Student Welfare Committee": ["Looks after the welfare and general well-being of students, including guidance on scholarships and support for student concerns.", "Students can register as volunteers through the committee coordinator. Students needing support can approach any member of the committee or the college office."],
    "UGC Coordination Committee": ["Coordinates UGC schemes, grants and reporting for the college and keeps the college in line with UGC requirements.", "A faculty committee constituted by the Principal; membership is by nomination."],
    "IQAC": ["Plans, monitors and improves the quality of teaching, research and administration, and prepares the college for NAAC accreditation.", "Constituted as per NAAC norms. Students can contribute through feedback and student representatives; see the IQAC page for details."],
    "Alumni Association": ["Keeps former students in touch with the college and with each other through reunions, talks and mentoring for current students.", "Former students can join by writing to the college office with their name, course, batch year and contact details."],
    "Parent–Teacher Association": ["Brings parents and teachers together to support students' progress and the college's growth.", "Parents of enrolled students are welcome as members; they can register at the college office or at the Parent–Teacher meeting."],
    "Student Counselling Cell": ["Helps students manage stress and academic or personal challenges through confidential counselling.", "No formal enrolment is needed. Students can approach the cell directly or ask the college office for an appointment."],
    "Library Advisory Committee": ["Advises on library collections, resources and services so that they meet the needs of students and faculty.", "Faculty and student representatives are nominated. Anyone can send suggestions for books and resources through the librarian."],
    "Sports Advisory Committee": ["Plans sports activities, tournaments and physical-education programmes for students.", "Students register for teams and events with the physical education director at the start of the year; trials are held for college teams."]
  };
  function committees() {
    var sec = $("#about--committees"); if (!sec) return;
    $$("a.doc-btn", sec).forEach(hide);
    $$("li.card", sec).forEach(function (li) {
      if (!once(li, "cm")) return;
      var h = $("h3", li); if (!h) return;
      var name = T(h).replace(/–|—|-/g, "–"); var d = CMT[T(h)] || CMT[name]; if (!d) return;
      li.classList.add("ucst-cmt"); li.setAttribute("tabindex", "0");
      var p = document.createElement("p"); p.className = "ucst-cmt__brief"; p.innerHTML = "<strong>Objective:</strong> " + esc(d[0]);
      var more = document.createElement("dl"); more.className = "ucst-cmt__more";
      more.innerHTML = "<dt>Who to contact</dt><dd>Coordinator and in-charge faculty: details will be updated soon. Meanwhile, contact the college office – Phone: 0816-2260220 · Email: principalucst@gmail.com (9:00 AM – 5:00 PM, Monday to Saturday).</dd><dt>How to enrol</dt><dd>" + esc(d[1]) + "</dd>";
      var oldp = $("p", li); if (oldp) hide(oldp);
      h.insertAdjacentElement("afterend", p); p.insertAdjacentElement("afterend", more);
    });
  }

  /* ---------------------------------------------------------- 7. admissions / academics clean-up, counts */
  function academics() {
    var adm = $("#academics--admissions");
    if (adm) {
      $$("a.doc-btn", adm).forEach(hide);
      $$("li.list-card", adm).forEach(hide);
      $$("a.btn--outline", adm).forEach(function (a) { if (/\.pdf/i.test(a.getAttribute("href") || "")) hide(a); });
      $$("ol,ul", adm).forEach(function (l) { if (l.children.length && $$("li", l).every(function (x) { return x.hasAttribute("data-ucst-hide"); })) hide(l); });
    }
    var rs = $("#academics--research"); if (rs) $$("li.card", rs).forEach(hide);
    $$('a[href="#dept-pg-physics"],a[href="#dept-pg-environmental-science"],a[href="#dept-mca"]').forEach(function (a) { hide(a.closest("li") || a); });
    $$("a.tile--blue li").forEach(function (li) { if (/^(Physics|Environmental Science|Computer Science \(MCA\))$/.test(T(li))) hide(li); });
    if (document.body.getAttribute("data-ucst-cnt")) return countsDone();
    document.body.setAttribute("data-ucst-cnt", "1");
    var map = [[/13 undergraduate and 4 postgraduate departments\./, "13 undergraduate departments and 1 postgraduate department."], [/Departments of studies and research\.\s*4 departments\./, "Department of studies and research."], [/All 17 departments/, "All 14 departments"]];
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) { for (var i = 0; i < map.length; i++) if (map[i][0].test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(map[i][0], map[i][1]); }
    countsDone();
  }
  function countsDone() {
    $$("a.dept-card").forEach(function (a) {
      var href = a.getAttribute("href") || "", code = /dept-chemistry$/.test(href) ? "CY" : /dept-(pg-)?physics$/.test(href) ? "PY" : null;
      if (!code) return;
      var kids = a.querySelectorAll("*");
      for (var i = 0; i < kids.length; i++) { if (!kids[i].children.length && /^[A-Za-z]{1,2}$/.test(T(kids[i])) && !/^h\d$/i.test(kids[i].tagName)) { kids[i].textContent = code; break; } }
    });
  }

  /* ---------------------------------------------------------- 8. department faculty */
  var DV = { chemistry: ["Chemistry"], physics: ["Physics"], "physical-education": ["Physical Education"], "pg-physics": ["Physics"], mathematics: ["Mathematics"], zoology: ["Zoology"], microbiology: ["Microbiology"], biochemistry: ["Biochemistry"], biotechnology: ["Biotechnology"], english: ["English"], kannada: ["Kannada"] };
  var RANK = { "Professor": 0, "Associate Professor": 1, "Assistant Professor": 2 };
  function nkey(n) { return String(n || "").replace(/^((Prof|Dr|Mr|Mrs|Ms)\.?\s*)+/i, "").trim().toLowerCase(); }
  function initials(n) { var p = n.replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/gi, "").replace(/^(Dr\.|Prof\.)\s*/i, "").split(/\s+/).filter(Boolean); return ((p[0] || "")[0] || "") + ((p[1] || "")[0] || ""); }
  function deptFaculty() {
    var data = FAC(); if (!data.length) return;
    $$('main#main > section.view[data-view^="dept-"]').forEach(function (view) {
      var slug = view.getAttribute("data-view").replace(/^dept-/, ""), sec = $('section[id$="--faculty"]', view);
      if (!sec || !once(view, "df")) return;
      var names = DV[slug], list = names ? data.filter(function (d) { return names.indexOf(d.dept) >= 0; }) : [];
      var link = $$('a[href$="--faculty"]', view);
      if (!list.length) { hide(sec); link.forEach(hide); return; }
      list.sort(function (a, b) { return nkey(a.name).localeCompare(nkey(b.name)); });
      var ul = $("ul.ucst-df", sec) || document.createElement("ul"); ul.className = "ucst-df";
      ul.innerHTML = list.map(function (d) {
        return '<li><a class="ucst-df__card" href="#faculty/' + esc(d.id) + '" aria-label="View details of ' + esc(d.name) + '"><div class="ucst-df__ph">' + (d.photo ? '<img alt="" loading="lazy" src="' + d.photo + '">' : esc(initials(d.name))) + '</div><div class="ucst-df__b"><span class="ucst-df__n">' + esc(d.name) + '</span><span class="ucst-df__r">' + esc(d.designation || "") + '</span>' + (d.qualification ? '<span class="ucst-df__q">' + esc(d.qualification) + "</span>" : "") + '<span class="ucst-df__go">View details &rarr;</span></div></a></li>';
      }).join("");
      $$("li.person", sec).forEach(function (x) { var u = x.closest("ul"); if (u && u !== ul) hide(u); });
      if (!ul.parentNode) { var h2 = $("h2", sec); if (h2) h2.insertAdjacentElement("afterend", ul); else sec.appendChild(ul); }
      $$("a.link", sec).forEach(function (a) { if (/\.pdf/i.test(a.getAttribute("href") || "")) hide(a); });
    });
  }

  /* ---------------------------------------------------------- 9. infrastructure */
  function infrastructure() {
    var lab = $("#infrastructure--laboratories");
    if (lab && once(lab, "lab")) {
      var p = $("p", lab);
      if (p) {
        p.textContent = "Science laboratories equipped for degree practicals, project work and research.";

      }
    }
    $$("#infrastructure--facilities li a.link").forEach(hide);
  }

  /* ---------------------------------------------------------- 10. e-Services */
  var CERT = ["Leave certificate", "Character certificate", "Study certificate", "Bonafide certificate", "Transfer certificate", "No-dues certificate", "Marks card – duplicate / attestation", "Academic record / other certificate"];
  function eservices() {
    var v = $('main#main > section.view[data-view="e-services"]'); if (!v) return;
    ["#e-services--forms", "#e-services--docs"].forEach(function (s) { var e = $(s, v); if (e) hide(e); });
    $$('a[href="#e-services--forms"],a[href="#e-services--documents"],a[href="#e-services--docs"]', v).forEach(function (a) { if (once(a, "r")) { if (/--forms$/.test(a.getAttribute("href"))) { a.setAttribute("href", "#e-services--request"); var w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null), n; while ((n = w.nextNode())) n.nodeValue = n.nodeValue.replace(/Forms/, "Certificate request"); } else hide(a); } });
    
    if ($("#e-services--request", v)) return;
    var online = $("#e-services--online", v) || $("section.section", v); if (!online) return;
    var sec = document.createElement("section"); sec.className = "section section--white"; sec.id = "e-services--request"; sec.setAttribute("aria-labelledby", "e-services--request-title");
    var TPL = "Subject: Request for [Certificate name]\n\nRespected Sir/Madam,\n\nI request you to kindly issue me the following certificate.\n\nCertificate required: [Leave / Character / Study / Bonafide / Transfer / Academic record]\nName: [Full name as in college records]\nRegister number: [Register number]\nCourse and year: [e.g. B.Sc. PCM, 2022-25]\nMobile number: [Mobile number]\nDate of joining / last date attended: [DD/MM/YYYY]\nLeave from: [DD/MM/YYYY]   to: [DD/MM/YYYY]   (for a leave certificate only)\nPurpose: [Purpose of the certificate]\n\nThank you.\n\nYours faithfully,\n[Name]\n[Register number]";
    sec.innerHTML = '<div class="container"><h2 id="e-services--request-title">Certificate Request Format</h2><p>Choose who to write to, edit the ready-made format below, and send it from your own email. Certificates covered: leave, character, study, bonafide, transfer and academic records.</p>' +
      '<div class="ucst-req ucst-fmt"><div class="row2"><label>Send to<select id="ucst-fmt-to"><option value="principalucst@gmail.com">College office / Principal (principalucst@gmail.com)</option></select></label>' +
      '<label>Format (edit the parts in [brackets])<textarea id="ucst-fmt-body" rows="16"></textarea></label>' +
      '<div class="ucst-req__actions"><button class="ucst-req__btn" type="button" id="ucst-fmt-open">Open in my email app</button><button class="ucst-req__btn alt" type="button" id="ucst-fmt-copy">Copy format</button></div></div>' +
      '<p class="ucst-req__note">Office hours: 9:00 AM – 5:00 PM, Monday to Saturday. Closed on Sundays and government holidays. Carry your college ID card when collecting the certificate.</p><p class="ucst-req__note" id="ucst-fmt-msg" role="status"></p></div></div>';
    online.insertAdjacentElement("afterend", sec);
    var sel = $("#ucst-fmt-to", sec), body = $("#ucst-fmt-body", sec), msg = $("#ucst-fmt-msg", sec);
    body.value = TPL;
    FAC().filter(function (d) { return d.email; }).sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (d) { var o = document.createElement("option"); o.value = d.email; o.textContent = d.name + (d.dept ? " – " + d.dept : "") + " (" + d.email + ")"; sel.appendChild(o); });
    $("#ucst-fmt-open", sec).addEventListener("click", function () {
      var t = body.value, m = /^Subject:\s*(.*)\n+/.exec(t), subj = m ? m[1] : "Request", txt = m ? t.slice(m[0].length) : t;
      var url = "mailto:" + sel.value + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(txt);
      try { window.open(url, "_top"); } catch (x) { location.href = url; }
      msg.textContent = "If your email app did not open, use “Copy format” and paste it into an email to " + sel.value + ".";
    });
    $("#ucst-fmt-copy", sec).addEventListener("click", function () { (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(body.value) : Promise.reject()).then(function () { msg.textContent = "Format copied. Paste it into an email to " + sel.value + "."; }, function () { body.select(); msg.textContent = "Select and copy the text above manually."; }); });
  }

  /* ---------------------------------------------------------- 11. footer links + office hours */
  function footer() {
    $$('a[href*="vgst.in"]').forEach(function (a) { a.setAttribute("href", "https://ksteps.karnataka.gov.in/info-2/Vision+Group+on+Science+and+Technology+(VGST)/en"); });
    $$('a[href*="serb.gov.in"]').forEach(function (a) {
      a.setAttribute("href", "https://anrf.gov.in/");
      var w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null), n; while ((n = w.nextNode())) n.nodeValue = n.nodeValue.replace(/SERB/g, "ANRF");
      var li = a.closest("li"); if (li) { var w2 = document.createTreeWalker(li, NodeFilter.SHOW_TEXT, null), m; while ((m = w2.nextNode())) m.nodeValue = m.nodeValue.replace(/SERB/g, "ANRF"); }
    });
    $$("h3,h4,dt").forEach(function (h) {
      if (!/^Office hours$/i.test(T(h)) || !once(h, "oh")) return;
      var sib = h.nextElementSibling, stop = /^(H3|H4|DT)$/;
      while (sib && !stop.test(sib.tagName)) { var nx = sib.nextElementSibling; hide(sib); sib = nx; }
      var p = document.createElement(h.tagName === "DT" ? "dd" : "p"); p.textContent = "9:00 AM – 5:00 PM, Monday to Saturday. Closed on Sundays and government holidays.";
      h.insertAdjacentElement("afterend", p);
    });
  }


  /* ---------------------------------------------------------- 12. library */
  function library() {
    var v = $('main#main > section.view[data-view="library"]'); if (!v) return;
    var sec = $("#library--e-resources", v);
    if (sec && once(sec, "er")) {
      $$("a.link-card", sec).forEach(function (a) { var h = a.getAttribute("href") || ""; if (!/libraryucst\.in\/Quicksearch|nlist\.inflibnet|ucstumkur\.wordpress/.test(h)) hide(a.closest("li") || a); });
      $$(".tabs", sec).forEach(function (t) { var w = t.parentElement; hide(w && w !== sec && w.parentElement ? w : t); });
      var n = document.createElement("p"); n.className = "ucst-req__note"; n.textContent = "These links are checked and working. More e-resource links will be updated soon.";
      var g = $("ul.grid", sec); if (g) g.insertAdjacentElement("afterend", n);
      var lead = $("p", sec); if (lead) lead.textContent = "Online library resources available to students and faculty.";
    }
    var b = $$("#library--about ul.bullets");
    if (b.length === 2 && once(v, "vm")) { var m = $$("li", b[1]); if (m.length > b[0].children.length) { var keep = b[0].children.length; var rest = m.slice(keep - 1); var txt = rest.map(function (x) { return T(x).replace(/[.\s]+$/, ""); }).join("; ") + "."; rest[0].textContent = txt; rest.slice(1).forEach(function (x) { x.remove(); }); } }
  }

  /* ---------------------------------------------------------- 13. events */
  function events() {
    var v = $('main#main > section.view[data-view="events"]'); if (!v) return;
    $$("a.doc-btn", v).forEach(hide);
    $$("li.list-card", v).forEach(hide);
    $$("ol,ul", v).forEach(function (l) { if (l.children.length && Array.prototype.every.call(l.children, function (x) { return x.hasAttribute("data-ucst-hide"); })) hide(l); });
    $$('a[href$=".pdf"]', v).forEach(function (a) { hide(a.closest("li") || a); });
    $$("a.link-card, a.btn", v).forEach(function (a) { if (/\.pdf/i.test(a.getAttribute("href") || "")) hide(a.closest("li") || a); });
  }

  /* ---------------------------------------------------------- 14. reveal-on-hover cards (campus life support etc.) */
  function revealCards() {
    var v = $('main#main > section.view[data-view="campus-life"]'); if (!v) return;
    $$("h2", v).forEach(function (h) {
      if (!/Student (Support|Services)|Support/i.test(T(h))) return;
      var sec = h.closest("section"); if (!sec || !once(sec, "rv")) return;
      $$("li.card, article.card", sec).forEach(function (c) {
        var head = c.querySelector("h3,h4"); if (!head) return;
        var wrap = document.createElement("div"); wrap.className = "ucst-rv";
        Array.prototype.slice.call(c.children).forEach(function (k) { if (k !== head && !k.contains(head)) wrap.appendChild(k); });
        c.appendChild(wrap); c.classList.add("ucst-rvc"); c.setAttribute("tabindex", "0"); c.setAttribute("role", "button");
        var cell = c.closest("li") || c; cell.style.alignSelf = "start"; c.style.alignSelf = "start"; if (cell.parentElement) cell.parentElement.style.alignItems = "start";
        c.addEventListener("click", function () { var was = c.classList.contains("ucst-open"); $$(".ucst-rvc.ucst-open").forEach(function (o) { o.classList.remove("ucst-open"); }); if (!was) c.classList.add("ucst-open"); });
        c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); c.click(); } });
      });
    });
  }


  /* justify only long paragraphs */
  function justify() {
    $$("main p, .leader__message").forEach(function (p) {
      if (p.classList.contains("ucst-j") || p.hasAttribute("data-ucst-nj")) return;
      var long = T(p).length > 230 || p.matches(".leader__message,#about--vision article.card p,#about--principal p,.prose p");
      if (long && !p.closest(".ucst-cmt,.prog-card,.ucst-rvc,.tile,.dept-card,.ucst-df,.page-banner,.hero,.ucst-req,.ucst-vm,.ticker,.facts")) p.classList.add("ucst-j");
    });
  }


  /* remove specific people / items on request */
  function removals() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, hits = [];
    while ((n = w.nextNode())) { if (/palak/i.test(n.nodeValue)) hits.push(n.parentElement); }
    hits.forEach(function (el) {
      if (!el || el.closest("[data-ucst-hide]")) return;
      var box = el.closest("li,article,tr,.card,.person,.fact,div"); var cur = el;
      while (cur && cur !== document.body) { if (/^(LI|ARTICLE|TR)$/.test(cur.tagName) || /\b(card|person|fact)\b/.test(cur.className || "")) { box = cur; break; } cur = cur.parentElement; }
      if (box && T(box).length < 700) hide(box); else hide(el);
    });
    $$('main#main > section.view[data-view="events"] figure.wide-photo').forEach(hide);
    // campus life: the certificate picture
    $$('#campus-life--achievements figure').forEach(hide);
    $$("#campus-life--achievements figure.wide-photo, #campus-life figure.wide-photo").forEach(function (f) { if (/certificate|\u0c85\u0cad\u0cbf\u0ca8\u0c82\u0ca6\u0ca8\u0cbe/i.test(T(f))) hide(f); });
  }


  /* ---------------------------------------------------------- 15. department clean-up */
  function visibleContent(sec) {
    return $$("li,article,figure,.card,img,dl,table,.link-card", sec).some(function (e) { return !e.closest("[data-ucst-hide]") && !(e.tagName === "IMG" && !e.src); });
  }
  function deptClean() {
    $$("section.view[data-view^='dept-']").forEach(function (view) {
      var fs = $('section[id$="--faculty"]', view);
      if (fs) {
        $$("li", fs).forEach(function (li) { if (!li.closest(".ucst-df")) hide(li); });
        $$("ul", fs).forEach(function (u) { if (!u.classList.contains("ucst-df") && !u.closest(".ucst-df")) hide(u); });
        $$(".empty,.empty-state", fs).forEach(hide);
      }
      var rs = $('section[id$="--resources"]', view);
      if (rs) {
        $$("a", rs).forEach(function (a) {
          var h = a.getAttribute("href") || "";
          if (/\.pdf/i.test(h) || /Events organi[sz]ed|Department activities|activities 20\d\d|events in 20\d\d/i.test(T(a))) hide(a.closest("li") || a);
        });
        $$("li,article", rs).forEach(function (x) { if (/Events organi[sz]ed|Department activities/i.test(T(x)) && T(x).length < 160) hide(x); });
        if (!visibleContent(rs)) { hide(rs); $$('a[href$="--resources"]', view).forEach(hide); }
      }
    });
    $$(".empty").forEach(function (e) { if (/Faculty profiles are being updated/i.test(T(e))) hide(e); });
    // faculty counts that mention guest faculty
    $$("dt,dd,p,span,div,small").forEach(function (e) {
      if (e.children.length) return; var m = /^Faculty members\s*\((\d+)\s*permanent,\s*\d+\s*guest\)/i.exec(T(e)); if (!m || !once(e, "gc")) return;
      e.textContent = "Faculty members"; var par = e.parentElement; if (!par) return;
      Array.prototype.forEach.call(par.children, function (c) { if (c !== e && /^\d+$/.test(T(c))) c.textContent = m[1]; });
    });
    // permanent-faculty figure on About
    $$("dt").forEach(function (dt) {
      if (/guest faculty/i.test(T(dt)) && once(dt, "gf")) { var dd = dt.nextElementSibling; dt.textContent = "Permanent faculty"; if (dd && /^\d+$/.test(T(dd))) dd.textContent = String(FAC().length || 25); }
    });
  }

  /* ---------------------------------------------------------- 16. clubs: contact details */
  var CLUB = {
    NSS: "Interested students give their name to the NSS programme officers in the first weeks of the academic year and attend the orientation meeting.",
    NCC: "Students apply through the NCC officer at the start of the year; selection follows the NCC enrolment procedure and a basic fitness check.",
    Sports: "Students register with the physical education department for their events and attend the team trials held at the start of the year.",
    "Red Cross": "Students enrol with the Red Cross officer by giving their name, class and phone number at the start of the year.",
    "Red Ribbon": "Students join by giving their name and class to the Red Ribbon Club coordinator; membership is open to all interested students."
  };
  function clubs() {
    $$("article.activity").forEach(function (a) {
      if (!once(a, "ct")) return;
      var badge = $(".activity__badge", a), key = badge ? T(badge) : "";
      var how = CLUB[key] || "Interested students can enrol by contacting the coordinator or the college office at the start of the academic year.";
      var OFF = { NSS: [["Dr. Vijayakumar G R", "NSS Programme Officer, Unit I"], ["Dr. Lalitha H M", "NSS Programme Officer, Unit II"]],
        NCC: [["Dr. Vijayakumar G R", "Contact person"], ["Dr. Lalitha H M", "Contact person"]],
        "Red Cross": [["Sri Narayan Gaonkar", "Red Cross Officer"]], "Red Ribbon": [["Sri Narayan Gaonkar", "Red Cross Officer"]] }[key];
      var lead = OFF ? "<div><strong>Contact:</strong></div>" + OFF.map(function (o) { return "<div>\u2022 <strong>" + esc(o[0]) + "</strong> \u2013 " + esc(o[1]) + "</div>"; }).join("") : "<div><strong>How to contact:</strong> Coordinator details will be updated soon. Meanwhile, contact the college office.</div>";
      var box = document.createElement("div"); box.className = "ucst-contact";
      box.innerHTML = lead + "<div><strong>Email:</strong> principalucst@gmail.com</div><div><strong>Phone:</strong> 0816-2260220 (9:00 AM – 5:00 PM, Monday to Saturday)</div><div><strong>How to join:</strong> " + esc(how) + "</div>";
      a.appendChild(box);
    });
  }


  /* ---------------------------------------------------------- 17. department "About" pattern (as Chemistry) */
  function deptAbout() {
    $$("section.view[data-view^='dept-']").forEach(function (view) {
      var slug = view.getAttribute("data-view").replace(/^dept-/, "");
      var about = $('section[id$="--about"]', view); if (!about || !once(about, "pat")) return;
      if (/Courses offered/i.test(T(about))) return;
      var items = [], cards = [];
      $$("h3,h4,strong,b,span,p", about).forEach(function (el) {
        if (el.children.length) return; var m = /^(B\.Sc\.)\s+([A-Za-z]+)$/.exec(T(el)); if (!m) return;
        var card = el.closest("li,article,.card") || (el.parentElement && el.parentElement.parentElement); if (!card || cards.indexOf(card) >= 0) return;
        var rest = T(card).replace(T(el), "").trim(); while (rest.indexOf(m[2]) === 0) rest = rest.slice(m[2].length).trim();
        items.push("B.Sc. " + m[2] + (rest ? " – " + rest : "")); cards.push(card);
      });
      if (!items.length) {
        $$("li", about).forEach(function (l) { var m = /^B\.Sc\.\s+(.+)$/.exec(T(l)); if (m) items.push("B.Sc. \u2013 subject combinations: " + m[1]); });
        if (!items.length) return;
      }
      cards.forEach(function (c) { hide(c); var p = c.parentElement; if (p && p !== about && Array.prototype.every.call(p.children, function (k) { return k.hasAttribute("data-ucst-hide"); })) hide(p); });
      var para = $("p", about); var box = document.createElement("div"); box.className = "ucst-courses";
      box.innerHTML = "<h3>Courses offered</h3><ul class=\"bullets\">" + items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
      if (para) para.insertAdjacentElement("afterend", box); else about.appendChild(box);
      // faculty count in "At a glance" (from the faculty data)
      var names = DV[slug], n = names ? FAC().filter(function (d) { return names.indexOf(d.dept) >= 0; }).length : 0;
      var gl = $$("h2,h3,h4,p,div,span", about).filter(function (e) { return /^At a glance$/i.test(T(e)) && !e.children.length; })[0];
      var ul = gl ? gl.parentElement.querySelector("ul") : null;
      if (ul && n && !/Faculty members/i.test(T(ul))) { var li = document.createElement("li"); li.textContent = "Faculty members: " + n; ul.appendChild(li); }
    });
  }


  /* ---------------------------------------------------------- 18. Ph.D. & Research description */
  function phd() {
    $$(".prog-card .ucst-phd").forEach(function (b) { b.remove(); });
    $$("p,div,span,dd").forEach(function (e) {
      if (e.children.length || e.closest(".prog-card,.ucst-prog-more") || !/20 recognised research guides/i.test(T(e)) || !once(e, "phd")) return;
      var box = document.createElement("div"); box.className = "ucst-phd";
      box.innerHTML = "<p>Doctoral research at the college leads to a Ph.D. degree awarded by Tumkur University. Each scholar works under a recognised research guide, who supervises the research from the choice of topic to the final thesis.</p>" +
        "<ul class=\"bullets\"><li>Ph.D. research is guided by recognised research guides in several departments of the college. The faculty page of each department lists the specialisation and research interests of its guides.</li>" +
        "<li>Research areas span the physical, chemical and life sciences, mathematics, computing, languages and physical education.</li>" +
        "<li>Admission, eligibility and the course of study follow the Ph.D. regulations of Tumkur University.</li>" +
        "<li>Prospective scholars can write to the college office (principalucst@gmail.com, 0816-2260220) to find a suitable guide and research area in their department.</li></ul>";
      e.insertAdjacentElement("afterend", box);
    });
  }

  /* ---------------------------------------------------------- 19. round 3 */
  function repText(root, re, str) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, hits = [];
    while ((n = w.nextNode())) if (re.test(n.nodeValue)) hits.push(n);
    hits.forEach(function (x) { x.nodeValue = x.nodeValue.replace(re, str); });
  }
  var PE = "dept-physical-education";
  function physEd() {
    var v = $('section.view[data-view="' + PE + '"]'); if (!v || v.getAttribute("data-ucst-pe")) return;
    var src = $('section.view[data-view="dept-kannada"]'); if (!src) return;
    v.setAttribute("data-ucst-pe", "1");
    v.className = src.className; v.setAttribute("data-title", "Department of Physical Education – University College of Science, Tumkur");
    v.innerHTML = src.innerHTML.replace(/dept-kannada/g, PE);
    $$("[data-ucst-hide],[data-ucst-df],[data-ucst-pat],[data-ucst-gc]", v).forEach(function (e) { ["data-ucst-hide", "data-ucst-df", "data-ucst-pat", "data-ucst-gc"].forEach(function (a) { e.removeAttribute(a); }); });
    var h1 = $("h1", v); if (h1) h1.textContent = "Department of Physical Education";
    var cr = $("nav.breadcrumb li:last-child span", v); if (cr) cr.textContent = "Physical Education";
    var about = $('section[id$="--about"]', v);
    if (about) {
      var lede = $("p.lede", about); if (lede) lede.textContent = "The Department of Physical Education looks after sports, physical education and fitness at the college. Its areas of teaching include physical education, yogic sciences, sports training, sports psychology, and health and fitness.";
      var ul = $("ul.bullets", about); if (ul) ul.innerHTML = "<li>Physical education, sports and allied sciences</li><li>Yogic sciences, sports training and sports psychology</li><li>Health and fitness</li>";
    }
    var rel = $('section[id$="--related"]', v); if (rel) rel.parentNode.removeChild(rel);
    $$('a[href$="--related"]', v).forEach(function (a) { a.parentNode.removeChild(a); });
    var fs = $('section[id$="--faculty"]', v); if (fs) { $$("ul.ucst-df,.empty", fs).forEach(function (e) { e.parentNode.removeChild(e); }); }
  }
  function deptDirectory() {
    var langs = $("#departments--ug-languages"); if (langs && once(langs, "pe") && !$("#departments--physical-education")) {
      var sec = langs.cloneNode(true); sec.removeAttribute("data-ucst-pe"); sec.id = "departments--physical-education";
      sec.className = sec.className.replace(/section--white/, "").trim();
      var h2 = $("h2", sec); if (h2) { h2.id = "departments--physical-education-title"; h2.textContent = "Physical Education"; }
      var p = $(".section-title p", sec); if (p) p.textContent = "Sports, physical education and fitness.";
      var lis = $$("ul.grid > li", sec); lis.slice(1).forEach(function (l) { l.parentNode.removeChild(l); });
      var a = $("a.dept-card", sec); if (a) { a.setAttribute("href", "#" + PE); var mk = $(".strip__mark", a); if (mk) mk.textContent = "PE"; var h3 = $("h3", a); if (h3) h3.textContent = "Physical Education"; var pp = $("p", a); if (pp) pp.textContent = "Sports, physical education and fitness."; var ln = $(".strip__link", a); if (ln) ln.textContent = "View department profile"; }
      langs.insertAdjacentElement("afterend", sec);
      var nav = $('section.view[data-view="departments"] nav.local-nav'); if (nav) { var last = $("a:last-child", nav); if (last) { var c = last.cloneNode(true); c.setAttribute("href", "#departments--physical-education"); c.textContent = "Physical Education"; nav.appendChild(c); } }
    }
    // department strip (Our Departments)
    $$('.strip a[href="#dept-zoology"]').forEach(function (a) {
      if (!once(a, "pe")) return;
      var li = a.closest("li") || a, c = li.cloneNode(true), ca = c.matches && c.matches("a") ? c : $("a", c);
      c.removeAttribute("data-ucst-pe"); if (ca) { ca.removeAttribute("data-ucst-pe"); ca.setAttribute("href", "#" + PE); }
      var leaves = $$("*", c).filter(function (e) { return !e.children.length && T(e); });
      if (leaves[0]) leaves[0].textContent = "PE"; if (leaves[1]) leaves[1].textContent = "Physical Education";
      var sr = $$(".sr-only", c); sr.forEach(function (e) { e.textContent = ""; });
      li.insertAdjacentElement("afterend", c);
    });
    $$("a.btn").forEach(function (a) { if (/All 17 departments/.test(T(a))) repText(a, /All 17 departments/, "All departments"); });
  }
  function dosr() {
    $$('section.view[data-view="home"] a.tile, section.view[data-view="home"] .tile, section.view[data-view="academics"] a.dept-card, section.view[data-view="departments"] a.dept-card, .strip').forEach(function (e) {
      repText(e, /Departments? of Studies and Research in /g, "DOSR in ");
    });
  }
  function homeDept() {
    var h2 = $("#home--dept-title"); if (!h2) return; var sec = h2.closest("section"); if (!sec) return;
    var t = $('a.tile[href="#dept-chemistry"]', sec);
    if (t && once(t, "gen")) {
      t.setAttribute("href", "#departments");
      var ey = $(".eyebrow", t); if (ey) ey.textContent = "Departments";
      var h3 = $("h3", t); if (h3) h3.textContent = "Explore our departments";
      var rule = $(".tile__rule p", t); if (rule) rule.textContent = "Thirteen undergraduate departments and the DOSR in Chemistry offer degree, postgraduate and doctoral programmes in the sciences, computing and languages, with teaching, laboratory work and research on one campus.";
      var nf = (FAC() || []).length || 26, vals = [["Undergraduate departments", "13"], ["Permanent faculty", String(nf)], ["Recognised Ph.D. guides", "20"]];
      $$(".facts .fact", t).forEach(function (f, i) { if (!vals[i]) return; var dt = $("dt", f), dd = $("dd", f); if (dt) dt.textContent = vals[i][0]; if (dd) dd.textContent = vals[i][1]; });
      var b = document.createElement("span"); b.className = "ucst-explore"; b.innerHTML = "Explore departments <span aria-hidden=\"true\">→</span>"; t.appendChild(b);
    }
    var pg = $('a.tile--blue', sec);
    if (pg && once(pg, "gen")) {
      var pp = $("p", pg); if (pp) pp.textContent = "M.Sc. and Ph.D. through the Departments of Studies and Research (DOSR).";
      $$(".name-list li", pg).forEach(function (l, i) { if (i === 0) l.textContent = "DOSR in Chemistry"; else hide(l); });
    }
  }
  function captions() {
    $$("#academics--programmes .stack > .row > *:not(h3), #academics--programmes [id^='academics--'] > .row > *:not(h3)").forEach(function (e) { hide(e); });
    $$("#academics--programmes .row").forEach(function (r) { Array.prototype.forEach.call(r.children, function (c) { if (c.tagName !== "H3") hide(c); }); });
    $$(".prog-card").forEach(function (c) {
      $$("button,a,span,div", c).forEach(function (x) {
        if (x.children.length || !/^View details$/i.test(T(x)) || x.getAttribute("data-ucst-vd")) return;
        x.setAttribute("data-ucst-vd", "1"); x.classList.add("ucst-vd");
        var w = x; while (w.parentElement && w.parentElement !== c && !w.parentElement.classList.contains("prog-card__body")) w = w.parentElement; w.classList.add("ucst-vdw");
      });
    });
  }
  function openers() {
    if (document.body.getAttribute("data-ucst-op")) return; document.body.setAttribute("data-ucst-op", "1");
    var SEL = ".prog-card,.ucst-cmt";
    function closeAll(except) { $$(SEL + ".ucst-open").forEach(function (o) { if (o !== except) o.classList.remove("ucst-open"); }); }
    function toggle(c) { var was = c.classList.contains("ucst-open"); closeAll(null); if (!was) c.classList.add("ucst-open"); }
    document.addEventListener("click", function (e) {
      var c = e.target && e.target.closest ? e.target.closest(SEL) : null;
      if (!c) { closeAll(null); return; }
      if (e.target.closest("a[href]")) return;
      toggle(c);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeAll(null); return; }
      if ((e.key === "Enter" || e.key === " ") && e.target && e.target.matches && e.target.matches(SEL)) { e.preventDefault(); toggle(e.target); }
    });
  }
  function equalise() {
    $$("ul.grid").forEach(function (g) {
      if (g.closest("[data-ucst-fac],.ucst-df") || g.getAttribute("data-ucst-eq")) return;
      var hs = $$("h3", g).filter(function (h) { return !h.closest("[data-ucst-hide]"); }); if (hs.length < 2) return;
      g.setAttribute("data-ucst-eq", "1");
      var fs = getComputedStyle(hs[0]).fontSize; hs.forEach(function (h) { h.style.fontSize = fs; });
    });
  }
  function logos() {
    var NEW = "media/tu_logo.jpg", olds = {};
    $$(".brand__tile img").forEach(function (im) { var s = im.getAttribute("src"); if (s && s.indexOf("tu_logo") < 0) olds[s] = 1; });
    $$("img").forEach(function (im) {
      if (im.getAttribute("data-ucst-logo") || im.closest(".ucst-slider,.ucst-lb,.leader__photo")) return;
      var s = im.getAttribute("src") || "";
      if (!(im.closest(".brand__tile") || /\b(logo|emblem|seal)\b/i.test(im.alt || "") || (s && olds[s]))) return;
      im.setAttribute("data-ucst-logo", "1"); im.removeAttribute("srcset"); im.src = NEW; im.alt = "Tumkur University emblem";
    });
  }
  function slidePool() {
    if (window.UCST_EVENT_SLIDES && window.UCST_EVENT_SLIDES.length) return window.UCST_EVENT_SLIDES;
    var seen = {}, out = [];
    $$('section.view[data-view="campus-life"] img, section.view[data-view="events"] img, section.view[data-view="home"] .gallery img, figure.wide-photo img').forEach(function (im) {
      var s = im.getAttribute("src") || ""; if (!s || seen[s] || im.closest("[data-ucst-hide],.page-banner,.leader__photo,.ucst-slider,.brand__tile")) return;
      seen[s] = 1; var fig = im.closest("figure"), cap = fig && $("figcaption", fig) ? T($("figcaption", fig)) : (im.alt || "");
      out.push({ src: im.currentSrc || s, cap: cap });
    });
    return out.slice(0, 10);
  }
  var CAMPUS = {
    aerial: ["media/campus/aerial.jpg", "Aerial view of the campus"],
    building: ["media/campus/building.jpg", "The main college building"],
    auditorium: ["media/campus/auditorium.jpg", "Dr. Sree Sree Sree Shivakumara Mahaswamiji Auditorium"],
    gate: ["media/campus/gate.jpg", "Tumkur University entrance"],
    playground: ["media/campus/playground.jpg", "The playground"],
    avenue: ["media/campus/avenue.jpg", "The tree-lined campus avenue"],
    shrine: ["media/campus/shrine.jpg", "Shrine on the campus avenue"],
    tennis: ["media/campus/tennis.jpg", "Tennis courts"],
    chem: ["media/campus/chem-corridor.jpg", "Chemistry laboratories corridor"],
    phys: ["media/campus/physics-corridor.jpg", "Department of Physics corridor"],
    approach: ["media/campus/approach.jpg", "The approach to the college building"]
  };
  function campusSlides(keys) { return keys.map(function (k) { return { src: CAMPUS[k][0], cap: CAMPUS[k][1], noTrim: true }; }); }
  function buildSlider(slides) {
    var sec = document.createElement("section"); sec.className = "ucst-slider ucst-slider--cine"; sec.setAttribute("aria-roledescription", "carousel"); sec.setAttribute("aria-label", "College photographs");
    sec.innerHTML = '<div class="ucst-slider__stage"></div><div class="ucst-slider__head">Important events &amp; moments</div><div class="ucst-slider__cap" aria-live="polite"></div>';
    var stage = $(".ucst-slider__stage", sec), cap = $(".ucst-slider__cap", sec);
    if (!slides.length) { stage.innerHTML = '<div class="ucst-slider__empty">Photographs of important college events will appear here.</div>'; return sec; }
    function trim(im) {
      if (im.getAttribute("data-trim")) return; im.setAttribute("data-trim", "1");
      try {
        var w = im.naturalWidth, h = im.naturalHeight; if (!w || !h) return;
        var sc = Math.min(1, 420 / w), cw = Math.round(w * sc), ch = Math.round(h * sc);
        var c = document.createElement("canvas"); c.width = cw; c.height = ch; var x = c.getContext("2d"); x.drawImage(im, 0, 0, cw, ch);
        var d = x.getImageData(0, 0, cw, ch).data;
        var wh = function (p) { return d[p] > 240 && d[p + 1] > 240 && d[p + 2] > 240; };
        var rowW = function (y) { var n = 0; for (var i = 0; i < cw; i++) if (wh((y * cw + i) * 4)) n++; return n / cw > 0.97; };
        var colW = function (xx) { var n = 0; for (var j = 0; j < ch; j++) if (wh((j * cw + xx) * 4)) n++; return n / ch > 0.97; };
        var t = 0, b = ch - 1, l = 0, r = cw - 1;
        while (t < b && rowW(t)) t++; while (b > t && rowW(b)) b--; while (l < r && colW(l)) l++; while (r > l && colW(r)) r--;
        if ((b - t + 1) > ch * 0.96 && (r - l + 1) > cw * 0.96) return;
        var sx = l / sc, sy = t / sc, sw = (r - l + 1) / sc, sh = (b - t + 1) / sc, o = document.createElement("canvas");
        o.width = Math.min(1200, Math.round(sw)); o.height = Math.max(1, Math.round(sh * o.width / sw));
        o.getContext("2d").drawImage(im, sx, sy, sw, sh, 0, 0, o.width, o.height); im.src = o.toDataURL("image/jpeg", 0.88);
      } catch (e) { /* keep the original */ }
    }
    var imgs = slides.map(function (s) { var im = document.createElement("img"); im.alt = s.cap || "College event"; if (s.noTrim) im.setAttribute("data-trim", "1"); im.addEventListener("load", function () { trim(im); }); im.src = s.src; stage.appendChild(im); return im; });
    var dots = document.createElement("div"); dots.className = "ucst-slider__dots";
    var cur = 0, timer = null, paused = false;
    function go(i) { cur = (i + imgs.length) % imgs.length; imgs.forEach(function (m, k) { m.classList.toggle("is-on", k === cur); }); cap.textContent = slides[cur].cap || ""; $$("button", dots).forEach(function (b, k) { b.setAttribute("aria-current", k === cur ? "true" : "false"); }); }
    if (imgs.length > 1) {
      slides.forEach(function (s, k) { var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Show photo " + (k + 1)); b.addEventListener("click", function () { go(k); restart(); }); dots.appendChild(b); });
      var pv = document.createElement("button"), nx = document.createElement("button");
      pv.type = nx.type = "button"; pv.className = "ucst-slider__nav ucst-slider__prev"; nx.className = "ucst-slider__nav ucst-slider__next"; pv.setAttribute("aria-label", "Previous photo"); nx.setAttribute("aria-label", "Next photo"); pv.innerHTML = "&#8249;"; nx.innerHTML = "&#8250;";
      pv.addEventListener("click", function () { go(cur - 1); restart(); }); nx.addEventListener("click", function () { go(cur + 1); restart(); });
      sec.appendChild(pv); sec.appendChild(nx); sec.appendChild(dots);
    }
    function restart() { clearInterval(timer); if (imgs.length > 1 && !paused && !matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(function () { if (document.hidden) return; var v = sec.closest("section.view"); if (v && v.hidden) return; go(cur + 1); }, 6500); }
    
    var x0 = null; sec.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    sec.addEventListener("touchend", function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); restart(); } }, { passive: true });
    stage.addEventListener("click", function () { openLB(imgs[cur].src, imgs[cur].alt); });
    go(0); restart(); return sec;
  }
  function homeLeader() {
    var L = $('section.view[data-view="home"] .container.leader'); if (!L || !once(L, "split")) return;
    var wrap = document.createElement("div"); wrap.className = "ucst-pr";
    while (L.firstChild) wrap.appendChild(L.firstChild);
    L.appendChild(wrap); L.classList.add("ucst-leader2");
    L.appendChild(buildSlider(campusSlides(["aerial", "building", "auditorium", "avenue", "tennis", "approach"])));
  }

  /* ---------------------------------------------------------- 20. infrastructure: facility cards + campus slideshow */
  function facCards() {
    $$("#infrastructure--facilities ul > li").forEach(function (li) {
      if (!once(li, "fc")) return;
      var h = $("h3", li); if (!h) return;
      var box = h.parentElement || li, kids = Array.prototype.slice.call(box.children), hi = kids.indexOf(h);
      var brief = kids.slice(hi + 1).filter(function (k) { return k.tagName === "P" && !k.hasAttribute("data-ucst-hide"); })[0];
      var rest = kids.slice(hi + 1).filter(function (k) { return k !== brief; });
      var card = (box !== li && !box.matches("ul,ol")) ? box : li; card.classList.add("ucst-cmt"); card.setAttribute("tabindex", "0"); li.style.alignSelf = "start";
      if (brief) brief.classList.add("ucst-cmt__brief");
      if (rest.length) {
        var more = document.createElement("div"); more.className = "ucst-cmt__more";
        rest.forEach(function (k) { more.appendChild(k); });
        box.appendChild(more);
      }
    });
  }
  function campusShow() {
    var view = $('section.view[data-view="infrastructure"]'); if (!view) return;
    var sec = $$("section", view).filter(function (s) { var h = $("h2", s); return h && /campus/i.test(T(h)) && $("img", s); })[0];
    if (!sec || !once(sec, "show")) return;
    $$("*", sec).forEach(function (e) {
      if (e.children.length || !/^13,758/.test(T(e))) return;
      e.innerHTML = '13,758.60<small style="font-size:.5em;font-weight:700;margin-left:.3em;white-space:nowrap">sq. m</small>';
      e.style.fontSize = "clamp(1.5rem,2.1vw,2rem)"; e.style.lineHeight = "1.2"; e.style.whiteSpace = "nowrap";
      var card = e.parentElement, row = card && card.parentElement;
      if (row && row.children.length === 3) { row.style.display = "grid"; row.style.gridTemplateColumns = "1.45fr 1fr 1fr"; }
      $$("*", row || sec).forEach(function (n) { if (n !== e && !n.children.length && /^\d[\d,.]*$/.test(T(n))) n.style.fontSize = "clamp(1.5rem,2.1vw,2rem)"; });
    });
    var im = $("img", sec); if (!im) return;
    var host = im.closest("figure") || im;
    var sl = buildSlider(campusSlides(["building", "aerial", "auditorium", "chem", "phys", "tennis", "playground"]));
    sl.classList.add("ucst-slider--caps"); sl.style.minHeight = "22rem"; sl.style.width = "100%";
    host.insertAdjacentElement("beforebegin", sl); hide(host);
    if (sl.parentElement) { sl.parentElement.style.display = "flex"; sl.parentElement.style.alignSelf = "stretch"; }
  }
  function lifeShow() {
    var v = $('section.view[data-view="campus-life"]'); if (!v) return;
    var ref = $$("section", v).filter(function (x) { var h = $("h2", x); return h && /^On Campus/i.test(T(h)); })[0];
    if (!ref || !once(ref, "life")) return;
    var sec = ref.cloneNode(true); sec.id = "campus-life--campus";
    $$("[data-ucst-hide],[data-ucst-rv],[data-ucst-ct]", sec).forEach(function (e) { e.removeAttribute("data-ucst-hide"); });
    var cont = $(".container", sec) || sec, h2 = $("h2", sec);
    Array.prototype.slice.call(cont.children).forEach(function (k) { if (k !== h2 && !k.contains(h2)) k.remove(); });
    if (h2 && h2.parentElement !== cont) Array.prototype.slice.call(h2.parentElement.children).forEach(function (k) { if (k !== h2) k.remove(); });
    if (h2) h2.textContent = "Our Campus";
    var sl = buildSlider(campusSlides(["aerial", "gate", "building", "auditorium", "avenue", "shrine", "playground", "tennis", "approach"]));
    sl.classList.add("ucst-slider--caps", "ucst-slider--wide");
    cont.appendChild(sl);
    ref.insertAdjacentElement("beforebegin", sec);
  }
  function heroYT() {
    var media = $('section.view[data-view="home"] .hero__media'); if (!media || !once(media, "yt")) return;
    var tg = $(".hero__toggle");
    Array.prototype.slice.call(media.children).forEach(function (k) { if (!k.classList.contains("ucst-hv")) { k.style.display = "none"; k.setAttribute("data-ucst-hide", "1"); try { if (k.pause) k.pause(); } catch (e) { } } });
    var v = document.createElement("video"); v.className = "ucst-hv";
    v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.setAttribute("muted", ""); v.setAttribute("aria-hidden", "true"); v.tabIndex = -1;
    v.preload = "auto"; v.poster = "media/hero_poster.jpg"; v.src = "media/hero.mp4";
    media.insertBefore(v, media.firstChild);
    var shade = document.createElement("div"); shade.className = "ucst-hv-shade"; media.insertBefore(shade, v.nextSibling);
    var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, paused = reduce;
    function go() { if (!paused) { var p = v.play(); if (p && p.catch) p.catch(function () { }); } }
    go(); v.addEventListener("canplay", go); document.addEventListener("visibilitychange", function () { if (!document.hidden) go(); });
    ["touchstart", "click", "scroll"].forEach(function (ev) { window.addEventListener(ev, go, { once: true, passive: true }); });
    if (tg) {
      var nb = tg.cloneNode(true); tg.parentNode.replaceChild(nb, tg);
      var PLAY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>', PAUSE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
      function sync() { nb.innerHTML = paused ? PLAY : PAUSE; nb.setAttribute("aria-label", paused ? "Play background video" : "Pause background video"); }
      sync();
      nb.addEventListener("click", function () { paused = !paused; if (paused) v.pause(); else go(); sync(); });
    }
  }

  /* ---------------------------------------------------------- run */
  var running = false;
  function run() {
    if (running) return; running = true;
    try {
      css();
      [physEd, deptDirectory, logos, utility, vmStrip, principal, homeCleanup, programmes, captions, committees, academics, deptFaculty, infrastructure, eservices, footer, library, events, revealCards, justify, removals, deptClean, clubs, deptAbout, phd, dosr, homeDept, homeLeader, heroYT, facCards, campusShow, lifeShow, openers, equalise].forEach(function (f) { try { f(); } catch (e) { /* keep going */ } });
    } finally { running = false; }
  }
  var timer;
  function sched() { clearTimeout(timer); timer = setTimeout(run, 120); }
  function boot() {
    run(); setTimeout(run, 600); setTimeout(run, 1800);
    window.addEventListener("hashchange", function () { setTimeout(run, 60); setTimeout(run, 500); });
    new MutationObserver(function (m) { for (var i = 0; i < m.length; i++) { var t = m[i].target; if (t && t.closest && t.closest("[data-ucst-fac=root],.ucst-lb,.ucst-slider,.ucst-yt")) return; } sched(); }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
