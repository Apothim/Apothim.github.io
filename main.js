(() => {
  const SITE = window.SITE || {};
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---- links from config.js
  for (const a of $$("[data-link]")) {
    const url = SITE[a.dataset.link];
    if (url) a.href = url;
    if (a.dataset.link === "discord") { a.target = "_blank"; a.rel = "noopener"; }
  }
  $("#all-releases").href = `https://github.com/${SITE.releasesRepo}/releases`;

  // ---- mobile nav
  const toggle = $(".nav-toggle"), links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", e => { if (e.target.closest("a")) links.classList.remove("open"); });

  // ---- classes (sprite strips: south stand, south walk, east stand, east walk)
  const CLASSES = [
    ["dragoon", "Dragoon", "A lancer who charges into the fight and rallies with a war cry.", "Lance Charge · War Cry"],
    ["samurai", "Samurai", "Lightning-fast blade work and cuts that keep on bleeding.", "Iaido Slash · Bleeding Cut"],
    ["cleric", "Cleric", "Holy magic to heal yourself and smite what's ahead.", "Heal · Holy Smite"],
    ["hawkeye", "Hawk Eye", "An archer who hits from six tiles away and pins foes in place.", "Piercing Arrow · Pinning Shot"],
    ["monk", "Monk", "Flurries of blows and skin like iron.", "Flurry · Iron Skin"],
    ["sorcerer", "Sorcerer", "Fire at range and frost that freezes everything nearby.", "Fireball · Frost Nova"],
    ["rogue", "Rogue", "Poisoned blades and brutal finishing strikes.", "Poison Blade · Eviscerate"],
    ["summoner", "Summoner", "Bone magic and minions that hit harder together.", "Bone Spear · Grave Bond"],
  ];
  $(".classes").innerHTML = CLASSES.map(([id, name, text, skills]) => `
    <article class="class-card">
      <div class="sprite" style="background-image:url(assets/sprites/${id}.png)" role="img" aria-label="${name} sprite"></div>
      <div><h3>${name}</h3><p>${text}</p><div class="skills">${skills}</div></div>
    </article>`).join("");

  // ---- hero parade: a few classes stroll across
  if (!reduceMotion) {
    const parade = $(".parade");
    CLASSES.slice(0, 5).forEach(([id], i) => {
      const w = document.createElement("div");
      w.className = "walker";
      w.style.backgroundImage = `url(assets/sprites/${id}.png)`;
      w.style.animationDuration = `.5s, ${26 + i * 3}s`;
      w.style.animationDelay = `0s, ${-i * 6.5}s`;
      parade.appendChild(w);
    });
  }

  // ---- hero parallax
  const sky = $(".hero-sky");
  if (!reduceMotion) addEventListener("scroll", () => {
    const y = scrollY;
    if (y < innerHeight) sky.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });

  // ---- fireflies
  const canvas = $(".fireflies");
  if (!reduceMotion && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let flies = [], w = 0, h = 0;
    const resize = () => {
      w = canvas.width = Math.ceil(canvas.clientWidth / 3);
      h = canvas.height = Math.ceil(canvas.clientHeight / 3);
      flies = Array.from({ length: Math.round(w * h / 1400) }, () => ({
        x: Math.random() * w, y: h * (.35 + Math.random() * .65),
        vx: (Math.random() - .5) * .15, vy: (Math.random() - .5) * .1, t: Math.random() * 6.3,
      }));
    };
    resize(); addEventListener("resize", resize);
    let visible = true;
    new IntersectionObserver(([e]) => visible = e.isIntersecting).observe(canvas);
    const tick = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (const f of flies) {
          f.t += .03; f.x = (f.x + f.vx + Math.sin(f.t) * .08 + w) % w; f.y += f.vy + Math.cos(f.t * .7) * .05;
          if (f.y < h * .3 || f.y > h) f.vy *= -1;
          const a = .35 + Math.sin(f.t * 2) * .35;
          ctx.fillStyle = `rgba(255, 226, 140, ${a})`;
          ctx.fillRect(f.x | 0, f.y | 0, 1, 1);
          ctx.fillStyle = `rgba(255, 200, 90, ${a * .25})`;
          ctx.fillRect((f.x | 0) - 1, f.y | 0, 3, 1); ctx.fillRect(f.x | 0, (f.y | 0) - 1, 1, 3);
        }
      }
      requestAnimationFrame(tick);
    };
    tick();
  }

  // ---- gallery filters + lightbox
  const figures = $$(".gallery figure");
  $$(".chip").forEach(chip => chip.addEventListener("click", () => {
    $$(".chip").forEach(c => c.classList.toggle("on", c === chip));
    const f = chip.dataset.filter;
    figures.forEach(fig => fig.hidden = f !== "all" && fig.dataset.cat !== f);
  }));
  const lb = $(".lightbox"), lbImg = $("img", lb), lbCap = $("figcaption", lb);
  let current = 0, opener = null;
  const shown = () => figures.filter(f => !f.hidden);
  const show = i => {
    const list = shown();
    current = (i + list.length) % list.length;
    const fig = list[current], img = $("img", fig);
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.innerHTML = $("figcaption", fig).innerHTML;
  };
  figures.forEach(fig => $("button", fig).addEventListener("click", () => {
    opener = $("button", fig);
    show(shown().indexOf(fig)); lb.hidden = false; $(".lb-close", lb).focus();
  }));
  const close = () => { lb.hidden = true; opener && opener.focus(); };
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-prev", lb).addEventListener("click", () => show(current - 1));
  $(".lb-next", lb).addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // ---- patch notes: GitHub releases, falling back to patch-notes.js
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>");
  function md(text) {
    let html = "", list = null;
    const endList = () => { if (list) { html += `</${list}>`; list = null; } };
    for (const raw of text.replace(/\r/g, "").split("\n")) {
      const line = raw.trim();
      let m;
      if (!line) { endList(); continue; }
      if ((m = line.match(/^#{1,4}\s+(.*)/))) { endList(); html += `<h4>${inline(m[1])}</h4>`; }
      else if ((m = line.match(/^[-*]\s+(.*)/))) { if (list !== "ul") { endList(); html += "<ul>"; list = "ul"; } html += `<li>${inline(m[1])}</li>`; }
      else if ((m = line.match(/^\d+\.\s+(.*)/))) { if (list !== "ol") { endList(); html += "<ol>"; list = "ol"; } html += `<li>${inline(m[1])}</li>`; }
      else { endList(); html += `<p>${inline(line)}</p>`; }
    }
    endList();
    return html;
  }
  const fmtDate = d => new Date(d + (d.length === 10 ? "T12:00:00" : "")).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  const box = $(".patches"), more = $("#more-patches");
  const PAGE = 5;
  let notes = [], showing = 0;
  function render() {
    box.innerHTML = notes.slice(0, showing).map((n, i) => `
      <article class="patch${i === 0 && !n.pinned ? " latest" : ""}">
        <header>${n.version ? `<span class="badge">${esc(n.version)}</span>` : ""}<h3>${esc(n.title)}</h3>${n.date ? `<time datetime="${esc(n.date)}">${fmtDate(n.date)}</time>` : ""}</header>
        <div class="patch-body">${md(n.body || "")}</div>
      </article>`).join("");
    $$(".patch", box).forEach(p => {
      const body = $(".patch-body", p);
      if (body.scrollHeight > 220) {
        p.classList.add("collapsed");
        const b = document.createElement("button");
        b.className = "expand"; b.textContent = "Read more ▾";
        b.onclick = () => { const c = p.classList.toggle("collapsed"); b.textContent = c ? "Read more ▾" : "Show less ▴"; };
        p.appendChild(b);
      }
    });
    more.hidden = showing >= notes.length;
  }
  more.addEventListener("click", () => { showing += PAGE; render(); });

  function use(list) {
    const pinned = (window.PATCH_NOTES || []).filter(n => n.pinned);
    notes = [...pinned, ...list];
    showing = PAGE;
    const latest = list.find(n => n.version);
    if (latest) $(".latest-version").textContent = `latest client ${latest.version}`;
    render();
  }

  const fallback = () => use((window.PATCH_NOTES || []).filter(n => !n.pinned));
  if (SITE.releasesRepo) {
    fetch(`https://api.github.com/repos/${SITE.releasesRepo}/releases?per_page=30`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(rel => {
        const list = rel
          .filter(r => !r.draft && !r.prerelease && /^v?\d/.test(r.tag_name) && (r.body || "").trim())
          .map(r => {
            const lines = r.body.trim().split("\n");
            // Use a leading heading or short first line as the title, the rest as the body.
            let title = "Client update", body = r.body;
            const first = lines[0].replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();
            const sentence = first.split(/(?<=[.!])\s/)[0];
            if (/^[-*\d]/.test(lines[0].trim())) { /* starts with a list: keep the generic title */ }
            else if (first.length <= 60) { title = first.replace(/[.!:]$/, "") || title; body = lines.slice(1).join("\n"); }
            else if (sentence.length <= 60) title = sentence.replace(/[.!]$/, "");
            return { version: r.tag_name, date: r.published_at.slice(0, 10), title, body };
          });
        // Same notes re-published as a hotfix: keep only the newest copy.
        const seen = new Set();
        const unique = list.filter(n => { const k = n.title + n.body.slice(0, 80); if (seen.has(k)) return false; seen.add(k); return true; });
        unique.length ? use(unique) : fallback();
      })
      .catch(fallback);
  } else fallback();
})();
