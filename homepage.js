/* DPP homepage "Coming up" teaser. Loaded by homepage-block.html; edit here, no re-paste needed.
   Shows the next 4 one-time events (recurring listings are skipped so they never crowd out new events). */
(function () {
  var BASE = "https://diasporapeoplesplace.github.io/dpp-events/";
  var SHOW = 4;
  var grid = document.getElementById("dppt-grid");
  if (!grid) return;
  try {
    var t = document.querySelector("#dpp-teaser .dppt-title"), c = document.querySelector("#dpp-teaser .dppt-cta");
    if (t && c) c.style.fontFamily = getComputedStyle(t).fontFamily;
  } catch (e) {}
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  function parseDate(s) { var m = String(s || "").match(/^(\d{4})-(\d{1,2})-(\d{1,2})/); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; }
  function minutes(t) { var m = String(t || "").match(/^(\d{1,2})(?::(\d{2}))?\s*([AaPp])/); if (!m) return 9999;
    return (+m[1] % 12 + (/[Pp]/.test(m[3]) ? 12 : 0)) * 60 + (+m[2] || 0); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var now = new Date(); var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  fetch(BASE + "events.json?v=" + Math.floor(Date.now() / 600000))
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (list) {
      var seen = {};
      var up = list.map(function (e) { e.d = parseDate(e.date); e.dEnd = parseDate(e.until) || e.d; return e; })
        .filter(function (e) { return e.d && e.d >= today && e.flyer && !e.recurring; })
        .sort(function (a, b) { return a.d - b.d || minutes(a.start) - minutes(b.start); })
        .filter(function (e) { if (seen[e.flyer]) return false; seen[e.flyer] = 1; return true; })
        .slice(0, SHOW);
      if (!up.length) { grid.parentNode.style.display = "none"; return; }
      grid.innerHTML = up.map(function (e) {
        var when = DAYS[e.d.getDay()] + ", " + MONTHS[e.d.getMonth()] + " " + e.d.getDate();
        return '<a class="dppt-tile" href="/events">' +
          '<span class="dppt-art"><img src="' + esc(BASE + "flyers/" + e.flyer) + '" alt="Flyer for ' + esc(e.name) + '" loading="lazy"></span>' +
          '<p class="dppt-when">' + esc(when) + "</p>" +
          '<p class="dppt-name">' + esc(e.name) + "</p></a>";
      }).join("");
    })
    .catch(function () { grid.parentNode.style.display = "none"; });
})();
