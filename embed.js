/* DPP Events Guide. Loaded by the Squarespace Code Block on diasporapeoplesplace.org/events.
   Listings and flyers come from events.json and flyers/ in this repo. */
(function () {
  var BASE = "https://diasporapeoplesplace.github.io/dpp-events/";
  var DATA_URL = BASE + "events.json";
  var FLYER_BASE = BASE + "flyers/";

  var root = document.getElementById("dpp-events");
  if (!root || root.getAttribute("data-ready")) return;
  root.setAttribute("data-ready", "1");
  root.className = "dppe";

  root.innerHTML =
    '<div class="dppe-head"><div>' +
      '<h2 class="dppe-title">What\'s happening in our communities</h2>' +
      '<p class="dppe-sub">The best gatherings across Greater LA rooted in liberation, creativity and entrepreneurship.</p>' +
    '</div>' +
    '<a class="sqs-block-button-element sqs-block-button-element--medium sqs-button-element--primary dppe-cta dppe-cta-sm" href="https://instagram.com/diaspora.peoplesplace" target="_blank" rel="noopener">Send us your flyer ↗</a></div>' +
    '<section class="dppe-spot" id="dppe-spot" aria-label="Spotlight events" hidden>' +
      '<div class="dppe-spot-head"><p class="dppe-eyebrow">Spotlight</p>' +
        '<div class="dppe-spot-nav"><button type="button" class="dppe-arrow" id="dppe-prev" aria-label="Previous spotlight">←</button>' +
        '<button type="button" class="dppe-arrow" id="dppe-next" aria-label="Next spotlight">→</button></div></div>' +
      '<div class="dppe-track" id="dppe-track"></div>' +
      '<div class="dppe-dots" id="dppe-dots" role="group" aria-label="Choose a spotlight"></div>' +
    '</section>' +
    '<div class="dppe-controls">' +
      '<div class="dppe-chips" role="group" aria-label="When">' +
        '<button type="button" class="dppe-chip is-on" data-when="all">All upcoming</button>' +
        '<button type="button" class="dppe-chip" data-when="weekend">This weekend</button>' +
        '<button type="button" class="dppe-chip" data-when="month">This month</button>' +
      '</div>' +
      '<div class="dppe-selects">' +
        '<label class="dppe-field"><span>Community</span><select id="dppe-community"><option value="">All communities</option></select></label>' +
        '<label class="dppe-field"><span>Area</span><select id="dppe-area"><option value="">All areas</option></select></label>' +
        '<label class="dppe-field"><span>Type</span><select id="dppe-type"><option value="">All types</option></select></label>' +
        '<label class="dppe-field"><span>Search</span><input id="dppe-q" type="search" placeholder="Artist, venue, keyword"></label>' +
      '</div>' +
    '</div>' +
    '<p class="dppe-count" id="dppe-count" aria-live="polite">Loading events…</p>' +
    '<div id="dppe-list"></div>' +
    '<dialog class="dppe-modal" id="dppe-modal" aria-label="Event details">' +
      '<button type="button" class="dppe-close" id="dppe-close" aria-label="Close">×</button><div id="dppe-mcontent"></div>' +
    '</dialog>';

  var css = document.createElement("style");
  css.textContent = [
    ".dppe{--dppe-text:var(--paragraphMediumColor,#111);--dppe-heading:var(--headingMediumColor,var(--dppe-text));--dppe-accent:var(--primaryButtonBackgroundColor,#111);--dppe-on-accent:var(--primaryButtonTextColor,#fff);--dppe-bg:var(--siteBackgroundColor,#fff);--dppe-line:rgba(0,0,0,.15);--dppe-soft:rgba(0,0,0,.05);--dppe-green:#8cfc4d;--dppe-ink:#161616;color:var(--dppe-text);max-width:1100px;margin:0 auto;container-type:inline-size;container-name:dppe}",
    "@supports (color:color-mix(in srgb,red,blue)){.dppe{--dppe-line:color-mix(in srgb,var(--dppe-text) 18%,transparent);--dppe-soft:color-mix(in srgb,var(--dppe-text) 6%,transparent)}}",
    ".dppe *{box-sizing:border-box}",
    ".dppe [hidden]{display:none!important}",
    ".dppe-head{display:flex;gap:24px;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;margin-bottom:28px}",
    ".dppe-eyebrow{text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:700;margin:0}",
    ".dppe-title{margin:0 0 10px;color:var(--dppe-heading)}",
    ".dppe-sub{margin:0;max-width:620px;opacity:.85}",
    ":where(.dppe) :where(.dppe-cta){display:inline-flex;align-items:center;gap:6px;padding:12px 22px;border-radius:999px;background:var(--dppe-accent);color:var(--dppe-on-accent);border:1px solid var(--dppe-accent);text-decoration:none;font-weight:600;font-size:14px;white-space:nowrap}",
    ":where(.dppe) :where(.dppe-cta:hover){opacity:.85}",
    "#dpp-events .dppe-cta-sm{transform:scale(.85);transform-origin:right bottom}",
    /* spotlight */
    ".dppe-spot{margin:0 0 32px}",
    ".dppe-spot-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}",
    ".dppe-spot-nav{display:flex;gap:8px}",
    ".dppe-arrow{font:inherit;font-size:18px;width:44px;height:44px;border-radius:999px;border:1px solid var(--dppe-line);background:transparent;color:inherit;cursor:pointer}",
    ".dppe-arrow:hover{background:var(--dppe-soft)}",
    ".dppe-track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;border-radius:16px}",
    ".dppe-track::-webkit-scrollbar{display:none}",
    ".dppe-slide{flex:0 0 100%;scroll-snap-align:start;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);background:var(--dppe-ink);color:#efebe1;border-radius:16px;overflow:hidden;cursor:pointer;min-height:380px}",
    ".dppe-slide-art{background:#000;display:flex;align-items:center;justify-content:center;max-height:520px}",
    ".dppe-slide-art img{width:100%;height:100%;max-height:520px;object-fit:contain;display:block}",
    ".dppe-slide-info{padding:36px 40px;display:flex;flex-direction:column;justify-content:center;gap:12px;min-width:0}",
    ".dppe-slide-info .dppe-eyebrow{color:var(--dppe-green)}",
    "#dpp-events .dppe-slide-name{margin:0;font-size:34px;line-height:1.1;color:#efebe1}",
    ".dppe-slide-meta{margin:0;font-size:15px;opacity:.85;line-height:1.45}",
    ".dppe-slide-note{align-self:flex-start;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:5px 12px;border-radius:999px;background:var(--dppe-green);color:var(--dppe-ink)}",
    ".dppe-slide-desc{margin:4px 0 0;font-size:15px;line-height:1.55;opacity:.9;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}",
    ".dppe-slide-btn{margin-top:10px;align-self:flex-start;font:inherit;font-size:14px;font-weight:700;padding:12px 22px;border-radius:999px;border:0;background:var(--dppe-green);color:var(--dppe-ink);cursor:pointer}",
    ".dppe-dots{display:flex;gap:8px;justify-content:center;margin-top:14px}",
    ".dppe-dot{width:28px;height:28px;border:0;background:transparent;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center}",
    ".dppe-dot::before{content:'';width:9px;height:9px;border-radius:999px;background:var(--dppe-line)}",
    ".dppe-dot.is-on::before{width:24px;background:var(--dppe-text)}",
    /* controls and grid */
    ".dppe-controls{border-top:1px solid var(--dppe-line);border-bottom:1px solid var(--dppe-line);padding:18px 0;margin-bottom:18px}",
    ".dppe-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}",
    ".dppe-chip{font:inherit;font-size:14px;padding:8px 16px;border-radius:999px;border:1px solid var(--dppe-line);background:transparent;color:inherit;cursor:pointer}",
    ".dppe-chip.is-on{background:var(--dppe-accent);border-color:var(--dppe-accent);color:var(--dppe-on-accent)}",
    ".dppe-selects{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}",
    ".dppe-field{display:flex;flex-direction:column;gap:4px;font-size:12px;text-transform:uppercase;letter-spacing:.08em}",
    ".dppe-field span{opacity:.65}",
    ".dppe-field select,.dppe-field input{font:inherit;font-size:15px;text-transform:none;letter-spacing:0;padding:9px 10px;border:1px solid var(--dppe-line);border-radius:8px;background:var(--dppe-bg);color:var(--dppe-text);width:100%}",
    ".dppe-count{font-size:14px;opacity:.7;margin:0 0 8px}",
    ".dppe-section{margin:8px 0 40px}",
    ".dppe-section-head{display:flex;align-items:baseline;gap:12px;margin:0 0 18px;padding-top:8px}",
    "#dpp-events .dppe-section-title{margin:0;font-size:22px;color:var(--dppe-heading)}",
    ".dppe-section-note{font-size:14px;opacity:.7;margin:0}",
    ".dppe-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px 20px}",
    ".dppe-tile{display:flex;flex-direction:column;gap:8px;cursor:pointer;outline-offset:4px}",
    ".dppe-art{position:relative;display:block;aspect-ratio:4/5;border-radius:10px;overflow:hidden;background:var(--dppe-soft)}",
    ".dppe-art img{width:100%;height:100%;object-fit:contain;display:block;transition:transform .25s ease}",
    ".dppe-tile:hover .dppe-art img,.dppe-tile:focus-visible .dppe-art img{transform:scale(1.03)}",
    ".dppe-badge{position:absolute;left:8px;top:8px;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:5px 10px;border-radius:999px;background:var(--dppe-green);color:var(--dppe-ink)}",
    ".dppe-when{font-size:12px;text-transform:uppercase;letter-spacing:.04em;font-weight:700;margin:4px 0 0;opacity:.75;line-height:1.4}",
    "#dpp-events .dppe-name{margin:0;font-size:20px;line-height:1.2;color:var(--dppe-heading)}",
    ".dppe-meta{margin:0;font-size:14px;opacity:.8;line-height:1.4}",
    ".dppe-ig{font-size:14px;font-weight:600;color:inherit!important;text-decoration:none!important;display:inline-flex;gap:5px;align-items:center;width:fit-content}",
    ".dppe-ig:hover{text-decoration:underline!important}",
    ".dppe-ig svg{width:15px;height:15px}",
    ".dppe-empty{padding:40px 0;text-align:center;opacity:.75}",
    ".dppe-modal{border:0;padding:0;border-radius:14px;max-width:960px;width:calc(100% - 32px);max-height:calc(100vh - 40px);color:var(--dppe-text);background:var(--dppe-bg);font:inherit}",
    ".dppe-modal::backdrop{background:rgba(0,0,0,.6)}",
    ".dppe-mbody{display:grid;grid-template-columns:1.1fr 1fr}",
    ".dppe-mbody img{width:100%;height:100%;max-height:calc(100vh - 40px);object-fit:contain;background:#111;display:block}",
    ".dppe-minfo{padding:28px;overflow:auto;max-height:calc(100vh - 40px)}",
    "#dpp-events .dppe-minfo .dppe-name{font-size:28px;margin:6px 0 10px}",
    ".dppe-desc{margin:14px 0;font-size:15px;line-height:1.55}",
    ".dppe-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px}",
    ".dppe-tag{font-size:12px;padding:3px 10px;border-radius:999px;background:var(--dppe-soft);width:fit-content}",
    ".dppe-tag.is-note{background:var(--dppe-accent);color:var(--dppe-on-accent)}",
    ".dppe-tag.is-rec{background:var(--dppe-green);color:var(--dppe-ink);font-weight:700}",
    ".dppe-actions{display:flex;flex-wrap:wrap;gap:14px;align-items:center}",
    ".dppe-host{font-size:14px;opacity:.8}",
    ".dppe-close{position:absolute;z-index:3;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:0;background:var(--dppe-bg);color:var(--dppe-text);font-size:22px;line-height:1;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.25)}",
    "@container dppe (max-width:1000px){.dppe-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}",
    "@container dppe (max-width:700px){.dppe-selects{grid-template-columns:1fr 1fr}.dppe-slide{grid-template-columns:1fr}.dppe-slide-art{max-height:360px}.dppe-slide-art img{max-height:360px}.dppe-slide-info{padding:24px}#dpp-events .dppe-slide-name{font-size:26px}}",
    "@container dppe (max-width:640px){.dppe-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 14px}#dpp-events .dppe-name{font-size:16px}}",
    "@media (max-width:760px){.dppe-selects{grid-template-columns:1fr 1fr}.dppe-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:22px 14px}#dpp-events .dppe-name{font-size:16px}.dppe-mbody{grid-template-columns:1fr}.dppe-mbody img{max-height:60vh;height:auto}.dppe-minfo{max-height:none;padding:20px}.dppe-modal{overflow:auto}.dppe-slide{grid-template-columns:1fr}}",
    "@media (prefers-reduced-motion:reduce){.dppe-track{scroll-behavior:auto}.dppe-art img{transition:none}}"
  ].join("\n");
  root.appendChild(css);

  var $ = function (id) { return document.getElementById(id); };
  var state = { when: "all", community: "", area: "", type: "", q: "" };
  var events = [];
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var IG_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';

  function parseDate(s) { var m = String(s).match(/^(\d{4})-(\d{1,2})-(\d{1,2})/); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
  function minutes(t) { var m = String(t || "").match(/^(\d{1,2})(?::(\d{2}))?\s*([AaPp])/); if (!m) return 9999; return (+m[1] % 12 + (/[Pp]/.test(m[3]) ? 12 : 0)) * 60 + (+m[2] || 0); }
  function fmtTime(t) { return String(t || "").replace(/:00\s*/, " ").replace(/\s+/g, " ").trim(); }
  function today() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function weekendRange() {
    var t = today(), dow = t.getDay();
    var fri = new Date(t); fri.setDate(t.getDate() + ((5 - dow + 7) % 7));
    if (dow === 6) fri.setDate(t.getDate() - 1);
    if (dow === 0) fri.setDate(t.getDate() - 2);
    var sun = new Date(fri); sun.setDate(fri.getDate() + 2);
    return [fri < t ? t : fri, sun];
  }
  function splitList(s) { return String(s || "").split(/[,;]/).map(function (x) { return x.trim(); }).filter(Boolean); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? u : ""; }
  function flyerUrl(f) { if (!f) return ""; return /^https?:\/\/|^data:/i.test(f) ? f : FLYER_BASE + f; }
  function uniq(list) { return Array.from(new Set(list)).sort(function (a, b) { return a.localeCompare(b); }); }

  function fillSelect(id, values, allLabel) {
    var sel = $(id), cur = sel.value;
    sel.innerHTML = '<option value="">' + allLabel + "</option>" + values.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + "</option>"; }).join("");
    sel.value = cur;
  }
  function buildFilters() {
    var c = [], a = [], t = [], now = today();
    events.forEach(function (e) { if (e.dEnd < now) return; c = c.concat(e.communities); if (e.area) a.push(e.area); t = t.concat(e.types); });
    fillSelect("dppe-community", uniq(c), "All communities");
    fillSelect("dppe-area", uniq(a), "All areas");
    fillSelect("dppe-type", uniq(t), "All types");
  }

  function visible() {
    var t = today(), wk = weekendRange(), q = state.q.toLowerCase();
    var mStart = new Date(t.getFullYear(), t.getMonth(), 1), mEnd = new Date(t.getFullYear(), t.getMonth() + 1, 0);
    return events.filter(function (e) {
      if (e.dEnd < t) return false;
      if (state.when === "weekend" && (e.dEnd < wk[0] || e.d > wk[1])) return false;
      if (state.when === "month" && (e.dEnd < mStart || e.d > mEnd)) return false;
      if (state.community && e.communities.indexOf(state.community) < 0) return false;
      if (state.area && e.area !== state.area) return false;
      if (state.type && e.types.indexOf(state.type) < 0) return false;
      if (q && [e.name, e.venue, e.desc, e.host, e.area, e.instagram].join(" ").toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }

  function info(e) {
    var handle = String(e.instagram || "").replace(/^@/, "").replace(/[^A-Za-z0-9._]/g, "");
    var multi = e.dEnd > e.d;
    var time = fmtTime(e.start) + (e.start && e.end ? " – " + fmtTime(e.end) : "");
    var day = DAYS[e.d.getDay()] + ", " + MONTHS[e.d.getMonth()] + " " + e.d.getDate() +
      (multi ? " – " + DAYS[e.dEnd.getDay()] + ", " + MONTHS[e.dEnd.getMonth()] + " " + e.dEnd.getDate() : "");
    var short = DAYS[e.d.getDay()].slice(0, 3) + ", " + MONTHS[e.d.getMonth()] + " " + e.d.getDate() +
      (multi ? " – " + DAYS[e.dEnd.getDay()].slice(0, 3) + ", " + MONTHS[e.dEnd.getMonth()] + " " + e.dEnd.getDate() : "");
    if (e.recurring) {
      var thru = "through " + MONTHS[e.dEnd.getMonth()] + " " + e.dEnd.getDate();
      short = e.recurring + " · " + thru;
      day = e.recurring + ", " + thru;
    }
    return { time: time, day: day, short: short, handle: handle, ig: handle ? "https://instagram.com/" + handle : "", link: safeUrl(e.link), img: flyerUrl(e.flyer) };
  }

  function tile(e) {
    var x = info(e);
    return '<div class="dppe-tile" role="button" tabindex="0" data-i="' + events.indexOf(e) + '" aria-label="' + esc(e.name + ", " + x.day) + '">' +
      '<span class="dppe-art">' + (x.img ? '<img src="' + esc(x.img) + '" alt="Flyer for ' + esc(e.name) + '" loading="lazy">' : "") +
        (e.recurring ? '<span class="dppe-badge">Recurring</span>' : "") + "</span>" +
      '<p class="dppe-when">' + esc(x.short) + (x.time ? " · " + esc(x.time) : "") + "</p>" +
      (e.note ? '<span class="dppe-tag is-note">' + esc(e.note) + "</span>" : "") +
      '<h3 class="dppe-name">' + esc(e.name) + "</h3>" +
      '<p class="dppe-meta">' + esc([e.venue, e.area].filter(Boolean).join(" · ")) + "</p>" +
      (x.ig ? '<a class="dppe-ig" href="' + x.ig + '" target="_blank" rel="noopener">' + IG_ICON + "@" + esc(x.handle) + "</a>"
            : '<p class="dppe-meta">' + esc(e.host ? "Hosted by " + e.host : "") + "</p>") +
      "</div>";
  }

  function render() {
    var list = visible();
    var once = list.filter(function (e) { return !e.recurring; });
    var rec = list.filter(function (e) { return e.recurring; }).sort(function (a, b) { return a.name.localeCompare(b.name); });
    $("dppe-count").textContent = list.length + (list.length === 1 ? " event" : " events");
    if (!list.length) { $("dppe-list").innerHTML = '<div class="dppe-empty">Nothing matches yet. Check back soon, or send us a flyer on Instagram.</div>'; return; }
    var html = "";
    if (once.length) html += '<section class="dppe-section"><div class="dppe-section-head"><h3 class="dppe-section-title">One-time events</h3><p class="dppe-section-note">' + once.length + "</p></div>" +
      '<div class="dppe-grid">' + once.map(tile).join("") + "</div></section>";
    if (rec.length) html += '<section class="dppe-section"><div class="dppe-section-head"><h3 class="dppe-section-title">Recurring &amp; ongoing</h3><p class="dppe-section-note">Weekly gatherings, series and classes</p></div>' +
      '<div class="dppe-grid">' + rec.map(tile).join("") + "</div></section>";
    $("dppe-list").innerHTML = html;
  }

  /* Spotlight carousel */
  var spot = [], spotIdx = 0, timer = null;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function renderSpot() {
    var t = today();
    spot = events.filter(function (e) { return e.spotlight && e.dEnd >= t; })
      .sort(function (a, b) { var pa = typeof a.spotlight === "number" ? a.spotlight : 99, pb = typeof b.spotlight === "number" ? b.spotlight : 99; return pa - pb || a.d - b.d; })
      .slice(0, 5);
    if (!spot.length) { $("dppe-spot").hidden = true; return; }
    $("dppe-spot").hidden = false;
    $("dppe-track").innerHTML = spot.map(function (e, i) {
      var x = info(e);
      return '<article class="dppe-slide" data-i="' + events.indexOf(e) + '" aria-roledescription="slide" aria-label="' + (i + 1) + " of " + spot.length + '">' +
        '<div class="dppe-slide-art">' + (x.img ? '<img src="' + esc(x.img) + '" alt="Flyer for ' + esc(e.name) + '">' : "") + "</div>" +
        '<div class="dppe-slide-info"><p class="dppe-eyebrow">' + esc(x.day) + (x.time ? " · " + esc(x.time) : "") + "</p>" +
          (e.note ? '<span class="dppe-slide-note">' + esc(e.note) + "</span>" : "") +
          '<h3 class="dppe-slide-name">' + esc(e.name) + "</h3>" +
          '<p class="dppe-slide-meta">' + esc([e.venue, e.area, e.price].filter(Boolean).join(" · ")) + "</p>" +
          (e.desc ? '<p class="dppe-slide-desc">' + esc(e.desc) + "</p>" : "") +
          '<button type="button" class="dppe-slide-btn" data-i="' + events.indexOf(e) + '">See details</button></div></article>';
    }).join("");
    $("dppe-dots").innerHTML = spot.map(function (e, i) {
      return '<button type="button" class="dppe-dot' + (i === 0 ? " is-on" : "") + '" data-s="' + i + '" aria-label="Show ' + esc(e.name) + '"></button>';
    }).join("");
    var multi = spot.length > 1;
    $("dppe-prev").hidden = !multi; $("dppe-next").hidden = !multi; $("dppe-dots").hidden = !multi;
    startTimer();
  }
  function goSpot(i) {
    if (!spot.length) return;
    spotIdx = (i + spot.length) % spot.length;
    var track = $("dppe-track");
    track.scrollTo({ left: track.clientWidth * spotIdx, behavior: reduce ? "auto" : "smooth" });
    markDot();
  }
  function markDot() { root.querySelectorAll(".dppe-dot").forEach(function (d, k) { d.classList.toggle("is-on", k === spotIdx); }); }
  function startTimer() { stopTimer(); if (!reduce && spot.length > 1) timer = setInterval(function () { goSpot(spotIdx + 1); }, 7000); }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  $("dppe-prev").addEventListener("click", function () { stopTimer(); goSpot(spotIdx - 1); });
  $("dppe-next").addEventListener("click", function () { stopTimer(); goSpot(spotIdx + 1); });
  $("dppe-dots").addEventListener("click", function (ev) { var d = ev.target.closest(".dppe-dot"); if (d) { stopTimer(); goSpot(+d.getAttribute("data-s")); } });
  $("dppe-track").addEventListener("scroll", function () {
    var w = $("dppe-track").clientWidth; if (!w) return;
    var i = Math.round($("dppe-track").scrollLeft / w); if (i !== spotIdx) { spotIdx = i; markDot(); }
  });
  $("dppe-spot").addEventListener("mouseenter", stopTimer);
  $("dppe-spot").addEventListener("focusin", stopTimer);
  $("dppe-track").addEventListener("touchstart", stopTimer, { passive: true });
  $("dppe-track").addEventListener("click", function (ev) {
    var s = ev.target.closest("[data-i]"); if (s) openEvent(events[+s.getAttribute("data-i")]);
  });

  function openEvent(e) {
    var x = info(e);
    var tags = (e.recurring ? '<span class="dppe-tag is-rec">Recurring · ' + esc(e.recurring) + "</span>" : "") +
      (e.note ? '<span class="dppe-tag is-note">' + esc(e.note) + "</span>" : "") +
      e.communities.concat(e.types).map(function (t) { return '<span class="dppe-tag">' + esc(t) + "</span>"; }).join("");
    var actions =
      (x.link ? '<a class="sqs-block-button-element sqs-block-button-element--medium sqs-button-element--primary dppe-cta" href="' + esc(x.link) + '" target="_blank" rel="noopener">Tickets &amp; info ↗</a>' : "") +
      (x.ig ? '<a class="dppe-ig" href="' + x.ig + '" target="_blank" rel="noopener">' + IG_ICON + "@" + esc(x.handle) + "</a>" : "") +
      (!x.ig && e.host ? '<span class="dppe-host">Hosted by ' + esc(e.host) + "</span>" : "");
    $("dppe-mcontent").innerHTML = '<div class="dppe-mbody">' +
      (x.img ? '<img src="' + esc(x.img) + '" alt="Flyer for ' + esc(e.name) + '">' : "") +
      '<div class="dppe-minfo"><p class="dppe-when">' + esc(x.day) + (x.time ? " · " + esc(x.time) : "") + "</p>" +
        '<h3 class="dppe-name">' + esc(e.name) + "</h3>" +
        '<p class="dppe-meta">' + esc([e.venue, e.area, e.price].filter(Boolean).join(" · ")) + "</p>" +
        (e.desc ? '<p class="dppe-desc">' + esc(e.desc) + "</p>" : "") +
        (tags ? '<div class="dppe-tags">' + tags + "</div>" : "") +
        '<div class="dppe-actions">' + actions + "</div></div></div>";
    var m = $("dppe-modal");
    if (m.showModal) m.showModal(); else m.setAttribute("open", "");
  }

  function load(list) {
    events = list.map(function (e) {
      var o = {}; for (var k in e) o[k] = e[k];
      o.d = parseDate(e.date); o.dEnd = parseDate(e.until || "") || o.d;
      o.communities = splitList(e.community); o.types = splitList(e.type);
      return o;
    }).filter(function (e) { return e.d; })
      .sort(function (a, b) { return a.d - b.d || minutes(a.start) - minutes(b.start); });
    buildFilters(); renderSpot(); render();
  }

  root.querySelectorAll(".dppe-chip").forEach(function (b) {
    b.addEventListener("click", function () {
      root.querySelectorAll(".dppe-chip").forEach(function (x) { x.classList.remove("is-on"); });
      b.classList.add("is-on"); state.when = b.getAttribute("data-when"); render();
    });
  });
  ["community", "area", "type"].forEach(function (k) { $("dppe-" + k).addEventListener("change", function (ev) { state[k] = ev.target.value; render(); }); });
  $("dppe-q").addEventListener("input", function (ev) { state.q = ev.target.value; render(); });
  $("dppe-list").addEventListener("click", function (ev) {
    if (ev.target.closest("a")) return;
    var t = ev.target.closest(".dppe-tile"); if (t) openEvent(events[+t.getAttribute("data-i")]);
  });
  $("dppe-list").addEventListener("keydown", function (ev) {
    var t = ev.target.closest && ev.target.closest(".dppe-tile");
    if (t && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); openEvent(events[+t.getAttribute("data-i")]); }
  });
  var modal = $("dppe-modal");
  function closeModal() { if (modal.close) modal.close(); else modal.removeAttribute("open"); }
  $("dppe-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (ev) { if (ev.target === modal) closeModal(); });

  var stamp = Math.floor(Date.now() / 600000);
  fetch(DATA_URL + "?v=" + stamp)
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(load)
    .catch(function () {
      $("dppe-count").textContent = "";
      $("dppe-list").innerHTML = '<div class="dppe-empty">Events are taking a moment to load. Please refresh, or check back soon.</div>';
    });
})();
