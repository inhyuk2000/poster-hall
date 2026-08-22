const posters = [
  {
    layout: "image",
    image: "assets/poster-1.png",
    imageW: 1407,
    imageH: 2111,
    title: "LLM-based Natural Language-based Notification Delivery Control System",
    authors: "Inhyuk Song · Jaehwan Kim · Riwon Kim · Sangkeun Park",
    affiliation: "Dept. of Computer Science and Engineering, Kyung Hee University",
    venue: "KSC 2025",
    intro: {
      background:
        "스마트폰이 현대인의 필수 도구로 자리 잡으면서 사용자들이 수신하는 알림의 수도 폭발적으로 증가하고 있다. ",
      proposed:
        "We let users describe delivery rules in natural language. An LLM interprets the request, stores conditions, and filters incoming notifications before they reach the lock screen.",
    },
    related: [
      {
        title: "Manual Control",
        pro: "Users keep full control over each app and keyword.",
        con: "Rules are tedious to maintain as apps and contexts change.",
      },
      {
        title: "Model Prediction",
        pro: "Delivery timing can be automated from sensors and context.",
        con: "Personal preferences and intent are often ignored.",
      },
    ],
    design: [
      {
        num: "01",
        title: "Natural-language rules",
        body: "Users type conditions in chat instead of digging through system settings.",
      },
      {
        num: "02",
        title: "Condition parsing",
        body: "The LLM extracts app, keyword, time, and urgency into a structured rule.",
      },
      {
        num: "03",
        title: "Filtered delivery",
        body: "Only matching notifications surface on the lock screen; the rest stay silent.",
      },
    ],
    architecture: [
      "User writes a delivery rule in natural language.",
      "LLM parses the rule into structured conditions.",
      "Conditions are stored in the Condition DB.",
      "Incoming alerts are checked against stored rules.",
      "The sender delivers only notifications that pass the filter.",
    ],
    conclusion: [
      "Natural-language rules lower the cost of personal notification control.",
      "LLM parsing turns free-form intent into reusable delivery conditions.",
      "Filtered lock-screen delivery reduces interruption without hiding everything.",
      "Future work: on-device models, richer context, and a longer field study.",
    ],
    wall: "#0b1f4d",
    accent: "#eab308",
    shortTitle: "Notification Control",
    blurb:
      "사용자의 자연어 명령에서 알림 수신 조건과 대상을 추출하고, 조건에 맞는 알림만 선별적으로 전송하는 LLM 기반 모바일 알림 제어 시스템 설계 및 구현",
    tech: ["LLM", "Android", "NLP", "Notifications"],
    github: "Go To GitHub",
    githubUrl: "https://github.com/inhyuk2000/A-Natural-Language-based-Notification-Delivery-Control-System-Using-LLM",
    date: "Dec 2025",
    demoMeta: true,
    demoYoutubeId: "Ml36uWcuihY",
  },
  {
    layout: "image",
    image: "assets/poster-2.png",
    imageW: 1407,
    imageH: 2111,
    kicker: "Stanford University • Computer Graphics",
    title: "Neural Light Fields for Real-Time View Synthesis",
    author: "Velde, M.",
    lab: "Graphics Lab",
    abstract:
      "We present an end-to-end framework for neural rendering utilizing sparse view synthesis. By modeling deep light fields directly, our pipeline yields photorealistic real-time navigation of dense environments.",
    methodology:
      "A hybrid encoder maps sparse RGB-D captures into a compact light-field latent. Volume rendering is amortized through baked feature grids and a tiny MLP decoder.",
    figure: "Figure A: Reconstruction Error (RMSE)",
    conclusion:
      "Optimization runtime was compressed by 43% with negligible fidelity degradation. Future branches target mobile VR runtime.",
    bars: [28, 18, 34, 22, 40, 16, 26, 36, 20],
    wall:
      "radial-gradient(ellipse 95% 80% at 12% 78%, #e48cf5 0%, transparent 52%), radial-gradient(ellipse 85% 75% at 88% 22%, #5381ec 0%, transparent 48%), radial-gradient(ellipse 70% 60% at 50% 45%, rgba(167, 139, 250, 0.55) 0%, transparent 55%), linear-gradient(90deg, #c87ef0 0%, #6f74ef 48%, #3f6ad8 100%)",
    accent: "#f0abfc",
    metaOnVivid: true,
    shortTitle: "Multi Agent Debate",
    blurb:
      "서로 다른 LLM이 독립적으로 생성한 답변을 비교하고, 답변이 일치하지 않을 경우 토론을 통해 상호 검증하는 멀티 에이전트 프레임워크 설계 및 구현",
    tech: ["Python", "Javascript", "Prompt Engineering", "HTML5"],
    github: "Go To GitHub",
    githubUrl: "https://github.com/inhyuk2000/A-Multi-Agent-Debate-Framework-of-Multiple-Language-Models-for-Hallucination-Detection-Correction",
    date: "Oct 2024",
    demoMeta: true,
    demoYoutubeId: "oxzD7FspX6g",
    awardBadge: true,
    awardLines: ["KCC2025", "Best Poster Awards"],
  },
  {
    layout: "image",
    image: "assets/poster-3.png",
    imageW: 2111,
    imageH: 3167,
    title: "딥러닝 해석을 위한 계층적 다중 뉴런 프레임워크 모델",
    authors: "Chiyeong Song · Yunhyeong Nam · Inhyuk Song · Sungtae Kim",
    affiliation: "Dept. of Computer Science and Engineering, Kyung Hee University",
    venue: "KCC 2025",
    wall: "#0c4a6e",
    accent: "#38bdf8",
    shortTitle: "Hierarchical Neuron XAI",
    blurb:
      "사전 라벨 없이 이미지 캡셔닝과 계층적 클러스터링으로 뉴런 그룹을 추출하고, 자연어 설명으로 딥러닝 모델의 계층적 의미 구조를 해석하는 프레임워크",
    tech: ["XAI", "ResNet", "Clustering", "Captioning"],
    github: "Go To GitHub",
    githubUrl: "https://github.com/inhyuk2000",
    date: "2025",
    awardBadge: true,
    awardLines: ["KCC2025", "Encouragement", "Awards"],
  },
];

const barColors = ["#eab308", "#3b82f6", "#3b82f6", "#eab308", "#3b82f6", "#3b82f6", "#eab308", "#3b82f6", "#3b82f6"];

const POSTER_W = 540;
const POSTER_H = 760;
const STEP = 766;
const ROPE_BEADS = 50;
const ROPE_BEAD_MASS = (0.18 * 12) / ROPE_BEADS;

const { Engine, Bodies, Body, Constraint, Composite } = Matter;

gsap.registerPlugin(TextPlugin);

const hall = document.getElementById("hall");
const wall = document.getElementById("wall");
const track = document.getElementById("track");
const reveal = document.getElementById("reveal");
const revealFill = document.getElementById("reveal-fill");
const focusLayer = document.getElementById("focus-layer");
const exitBtn = document.getElementById("exit-session");
const meta = document.getElementById("meta-sidebar");
const metaPanelMain = document.getElementById("meta-panel-main");
const metaPanelNext = document.getElementById("meta-panel-next");
const metaDemo = meta.querySelector(".meta-demo");
const metaDemoVideo = document.getElementById("meta-demo-video");
const DEMO_YOUTUBE_ID = "Ml36uWcuihY";

function demoYoutubeSrc(poster) {
  const id = poster?.demoYoutubeId || DEMO_YOUTUBE_ID;
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0`;
}
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let index = 0;
let x = 0;
let drag = null;
let lastTs = 0;
let rafId = 0;
let physicsPaused = false;
let focusing = false;
let focusedHang = null;
let focusToken = 0;
let revealTimer = 0;
let revealEndTimer = 0;
let revealEndHandler = null;
let exitPopTimer = 0;
let posterGrowTimer = 0;
let posterGrowStart = 0;
let posterShrinkStart = 0;
let posterHangReturnFrom = 1;
let posterHangReturnStart = 0;
let posterShrinkTimer = 0;
let posterPeelTimer = 0;
let lastMotionAt = 0;
let loadBounceStart = 0;
let lastSwayX = null;
let typeTl = null;
let metaSwapTl = null;
let demoLayoutTl = null;
let pinSettleStart = 0;
let metaOnNext = false;
let demoLayoutT = 0;
const demoLayout = { t: 0 };

const SETTLE_AFTER_MS = 1500;
const SETTLE_DURATION_MS = 1300;
const LOAD_BOUNCE_MS = 1500;
const LOAD_BOUNCES = 2;
const REVEAL_AFTER_MS = 1000;
const REVEAL_MS = 850;
const EXIT_POP_AFTER_MS = 1000;
const POSTER_GROW_AFTER_MS = 500;
const POSTER_GROW_MS = 500;
const POSTER_GROW_TO = 1.25;
const POSTER_SHRINK_AFTER_MS = 500;
const DEMO_POSTER_SCALE = 1 / POSTER_GROW_TO;
const DEMO_LAYOUT_MS = 0.5;
const TRACK_SLIDE_MS = 620;
const PIN_SETTLE_MS = 2000;

const hangs = [];

function sheetSize(poster) {
  if (poster?.imageW && poster?.imageH) {
    return {
      w: Math.round((POSTER_H * poster.imageW) / poster.imageH),
      h: POSTER_H,
    };
  }
  return { w: POSTER_W, h: POSTER_H };
}

function hallScale() {
  return Math.min((window.innerHeight * 0.74) / POSTER_H, (window.innerWidth * 0.46) / POSTER_W, 1);
}

function posterScale(poster) {
  const { w, h } = sheetSize(poster || posters[0]);
  return Math.min((window.innerHeight * 0.74) / h, (window.innerWidth * 0.46) / w, 1);
}

function hangStep(i) {
  const poster = posters[i];
  const { w } = sheetSize(poster);
  return w * posterScale(poster) + 226 * posterScale(poster);
}

function restX(i) {
  const poster = posters[i];
  const { w } = sheetSize(poster);
  const s = posterScale(poster);
  let offset = 0;
  for (let k = 0; k < i; k++) offset += hangStep(k);
  return window.innerWidth / 2 - (w * s + 20) - offset;
}

function clampIndex(value) {
  return Math.max(0, Math.min(posters.length - 1, value));
}

function rubber(value) {
  const min = restX(posters.length - 1);
  const max = restX(0);
  if (value > max) return max + (value - max) * 0.28;
  if (value < min) return min + (value - min) * 0.28;
  return value;
}

function setX(value, animate) {
  x = value;
  const motion = animate ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
  track.style.transition = motion;
  track.style.transform = `translate3d(${x}px, 0, 0)`;
  wall.style.transition = motion;
  wall.style.transform = `translate3d(${x}px, 0, 0)`;
}

function readTrackX() {
  const transform = getComputedStyle(track).transform;
  if (!transform || transform === "none") return 0;
  return new DOMMatrix(transform).m41;
}

function swayTrackBy(dx) {
  if (physicsPaused || !dx) return;
  swayFromScroll(dx);
}

function barsHtml(heights) {
  return heights
    .map((height, i) => `<span class="bar" style="height:${height}px;background:${barColors[i]}"></span>`)
    .join("");
}

function constructionSignHtml() {
  return `
    <div class="construction-sign" aria-hidden="true">
      <div class="construction-diamond"></div>
      <div class="construction-text">
        <p class="construction-warn">⚠</p>
        <p class="construction-ko">진행중</p>
        <p class="construction-en">Under Construction</p>
      </div>
      <span class="construction-bolt bolt-top"></span>
      <span class="construction-bolt bolt-bottom"></span>
      <span class="construction-bolt bolt-left"></span>
      <span class="construction-bolt bolt-right"></span>
    </div>
  `;
}

function defaultPosterBody(poster) {
  return `
    <header class="sheet-header">
      <p class="kicker">${poster.kicker}</p>
      <h2>${poster.title}</h2>
      <p class="byline"><strong>${poster.author}</strong> <span>• ${poster.lab}</span></p>
    </header>
    <div class="cols">
      <div class="col">
        <section>
          <h3>1. Abstract</h3>
          <p>${poster.abstract}</p>
        </section>
        <section>
          <h3>2. Methodology</h3>
          <p>${poster.methodology}</p>
        </section>
      </div>
      <div class="col">
        <section>
          <h3>3. Quantitative Results</h3>
          <div class="chart">
            <p>${poster.figure}</p>
            <div class="bars">${barsHtml(poster.bars)}</div>
          </div>
        </section>
        <section>
          <h3>4. Conclusion</h3>
          <p>${poster.conclusion}</p>
        </section>
      </div>
    </div>
  `;
}

function llmNotifyPosterBody(poster) {
  const related = poster.related
    .map(
      (item) => `
        <div class="llm-compare">
          <p class="llm-compare-title">${item.title}</p>
          <p class="llm-pro">${item.pro}</p>
          <p class="llm-con">${item.con}</p>
        </div>
      `
    )
    .join("");
  const design = poster.design
    .map(
      (item) => `
        <div class="llm-step">
          <span>${item.num}</span>
          <div>
            <p class="llm-step-title">${item.title}</p>
            <p>${item.body}</p>
          </div>
        </div>
      `
    )
    .join("");
  const architecture = poster.architecture
    .map((item, i) => `<li><span>${i + 1}</span>${item}</li>`)
    .join("");
  const conclusion = poster.conclusion
    .map((item, i) => `<li><span>${i + 1}</span>${item}</li>`)
    .join("");
  return `
    <div class="llm">
      <header class="llm-header">
        <div>
          <h2>${poster.title}</h2>
          <p class="llm-authors">${poster.authors}</p>
          <p class="llm-affil">${poster.affiliation}</p>
        </div>
        <div class="llm-logo">LOGO</div>
      </header>
      <section class="llm-window">
        <div class="llm-chrome">
          <span class="llm-dot red"></span>
          <span class="llm-dot yellow"></span>
          <span class="llm-dot green"></span>
          <p>ChatGPT 4o</p>
        </div>
        <div class="llm-window-body">
          <div class="llm-block">
            <h3>1. Research Background</h3>
            <p>${poster.intro.background}</p>
          </div>
          <div class="llm-block">
            <h3>2. Related Research</h3>
            <div class="llm-related">${related}</div>
          </div>
          <div class="llm-block llm-proposed">
            <div>
              <h3>3. Proposed System</h3>
              <p>${poster.intro.proposed}</p>
            </div>
            <div class="llm-qr">QR</div>
          </div>
        </div>
      </section>
      <div class="llm-bottom">
        <section class="llm-card llm-design">
          <h3>Design</h3>
          <div class="llm-card-body">
            ${design}
            <div class="llm-shots">
              <div class="llm-shot">Screenshot</div>
              <div class="llm-shot">Screenshot</div>
            </div>
          </div>
        </section>
        <div class="llm-right">
          <section class="llm-card llm-arch">
            <h3>Architecture</h3>
            <div class="llm-card-body">
              <div class="llm-diagram">Diagram</div>
              <ol>${architecture}</ol>
            </div>
          </section>
          <section class="llm-card llm-conc">
            <h3>Conclusion &amp; Future Works</h3>
            <div class="llm-card-body">
              <ol>${conclusion}</ol>
            </div>
          </section>
        </div>
      </div>
      <p class="llm-venue">${poster.venue}</p>
    </div>
  `;
}

function imagePosterBody(poster) {
  return `<img class="poster-image" src="${poster.image}" alt="${poster.title || ""}" draggable="false" />`;
}

function posterBody(poster) {
  if (poster.image) return imagePosterBody(poster);
  if (poster.layout === "llm-notify") return llmNotifyPosterBody(poster);
  return defaultPosterBody(poster);
}

function wallAwardHtml(poster) {
  const lines = poster.awardLines || ["KCC2025", "Best Poster Awards"];
  return `
    <div class="wall-award" aria-hidden="true">
      <div class="wall-award-seal">
        <img src="assets/award-badge.png" alt="" draggable="false" />
      </div>
      <p class="wall-award-label">
        ${lines.map((line) => `<span>${line}</span>`).join("")}
      </p>
    </div>
  `;
}

function posterHtml(poster) {
  const layout = poster.image ? "image" : poster.layout || "default";
  const { w, h } = sheetSize(poster);
  const weave =
    layout === "default"
      ? `<img class="weave" src="assets/fabric-weave.png" alt="" draggable="false" />`
      : "";
  const inset = layout === "default" ? `<div class="inset"></div>` : "";
  const construction = poster.inProgress ? constructionSignHtml() : "";
  const award = poster.awardBadge ? wallAwardHtml(poster) : "";
  return `
    <article class="hang" style="--poster-w:${w}px;--poster-h:${h}px">
      ${award}
      <div class="swing-rig">
        <svg class="strings" aria-hidden="true">
          <polyline class="cord-l" />
          <polyline class="cord-r" />
        </svg>
        <div class="poster-slot">
          <div class="poster poster--${layout}">
            <div class="poster-fill"></div>
            ${weave}
            <div class="edge edge-t"></div>
            <div class="edge edge-r"></div>
            <div class="edge edge-b"></div>
            <div class="edge edge-l"></div>
            ${posterBody(poster)}
            ${construction}
            ${inset}
          </div>
        </div>
      </div>
    </article>
  `;
}

function hangMetrics(poster) {
  const { w, h } = sheetSize(poster || posters[0]);
  const s = posterScale(poster || posters[0]);
  return {
    s,
    L: Math.max(56, hall.clientHeight / 2 - (h * s) / 2),
    posterW: w * s,
    posterH: h * s,
    pivotX: (w * s) / 2,
    anchorL: (80 / POSTER_W) * w * s,
    anchorR: (460 / POSTER_W) * w * s,
    attach: (190 / POSTER_W) * w * s,
  };
}

function makeRope(x, yTop, yBottom, group) {
  const count = ROPE_BEADS;
  const step = (yBottom - yTop) / (count - 1);
  const beads = [];
  const links = [];
  for (let i = 0; i < count; i++) {
    const bead = Bodies.circle(x, yTop + i * step, 2.2, {
      isStatic: i === 0,
      collisionFilter: { group, mask: 0 },
      frictionAir: 0.04,
      restitution: 0,
      label: "rope",
    });
    if (!bead.isStatic) Body.setMass(bead, ROPE_BEAD_MASS);
    beads.push(bead);
  }
  for (let i = 1; i < count; i++) {
    links.push(
      Constraint.create({
        bodyA: beads[i - 1],
        bodyB: beads[i],
        length: step,
        stiffness: 1,
        damping: 0.05,
      })
    );
  }
  return { beads, links, step };
}

function createPhysics(hang, prev) {
  const m = hangMetrics(hang.poster);
  const engine = Engine.create({
    gravity: { x: 0, y: 1, scale: 0.0004 },
    enableSleeping: false,
    positionIterations: 12,
    velocityIterations: 8,
    constraintIterations: 40,
  });

  const group = Body.nextGroup(true);
  const poster = Bodies.rectangle(m.pivotX, m.L + m.posterH / 2, m.posterW, m.posterH, {
    collisionFilter: { group, mask: 0 },
    frictionAir: 0.025,
    friction: 0.04,
    restitution: 0,
    chamfer: { radius: 4 },
    label: "poster",
  });
  Body.setMass(poster, 2.4);

  const left = makeRope(m.anchorL, 0, m.L, group);
  const right = makeRope(m.anchorR, 0, m.L, group);

  const hitchL = Constraint.create({
    bodyA: left.beads[left.beads.length - 1],
    bodyB: poster,
    pointB: { x: -m.attach, y: -m.posterH / 2 },
    length: 0,
    stiffness: 1,
    damping: 0.04,
  });
  const hitchR = Constraint.create({
    bodyA: right.beads[right.beads.length - 1],
    bodyB: poster,
    pointB: { x: m.attach, y: -m.posterH / 2 },
    length: 0,
    stiffness: 1,
    damping: 0.04,
  });

  Composite.add(engine.world, [
    poster,
    ...left.beads,
    ...left.links,
    ...right.beads,
    ...right.links,
    hitchL,
    hitchR,
  ]);

  if (prev && !reducedMotion) {
    Body.setVelocity(poster, { x: prev.vx, y: prev.vy });
    Body.setAngularVelocity(poster, prev.w);
  }

  hang.engine = engine;
  hang.body = poster;
  hang.leftBeads = left.beads;
  hang.rightBeads = right.beads;
  hang.ropeStep = left.step;
  hang.metrics = m;
}

function tightenRope(beads, rest) {
  for (let pass = 0; pass < 20; pass++) {
    for (let i = 1; i < beads.length; i++) {
      const a = beads[i - 1];
      const b = beads[i];
      const dx = b.position.x - a.position.x;
      const dy = b.position.y - a.position.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;
      if (a.isStatic) {
        Body.setPosition(b, { x: a.position.x + nx * rest, y: a.position.y + ny * rest });
      } else {
        const corr = (dist - rest) * 0.5;
        Body.translate(a, { x: nx * corr, y: ny * corr });
        Body.translate(b, { x: -nx * corr, y: -ny * corr });
      }
    }
  }
}

function destroyPhysics(hang) {
  if (hang.engine) {
    Composite.clear(hang.engine.world, false);
    Engine.clear(hang.engine);
  }
  hang.engine = null;
  hang.body = null;
  hang.leftBeads = null;
  hang.rightBeads = null;
}

function ropePoints(beads) {
  return beads.map((bead) => `${bead.position.x},${bead.position.y}`).join(" ");
}

function focusLeft() {
  const poster = focusedHang?.poster || posters[index];
  const { w } = sheetSize(poster);
  const s = posterScale(poster);
  return window.innerWidth / 2 - (w * s + 20);
}

function liftPoster(hang) {
  if (!hang?.slot) return;
  applyHangSheet(hang);
  focusLayer.appendChild(hang.slot);
  focusedHang = hang;
  renderHang(hang);
}

function returnPoster(hang) {
  if (!hang?.slot) return;
  const rig = hang.el.querySelector(".swing-rig");
  if (rig) rig.appendChild(hang.slot);
  if (focusedHang === hang) focusedHang = null;
  renderHang(hang);
}

function openReveal(bg) {
  revealFill.style.background = bg;
  reveal.classList.remove("is-open");
  void reveal.offsetWidth;
  reveal.classList.add("is-open");
}

function closeReveal() {
  reveal.classList.remove("is-open");
}

function hexRgba(hex, alpha) {
  const n = hex.replace("#", "");
  return `rgba(${parseInt(n.slice(0, 2), 16)}, ${parseInt(n.slice(2, 4), 16)}, ${parseInt(n.slice(4, 6), 16)}, ${alpha})`;
}

function fillMeta(poster) {
  meta.classList.toggle("is-on-vivid", !!poster.metaOnVivid);
  meta.style.setProperty("--meta-accent", poster.accent);
  meta.style.setProperty("--meta-badge-bg", hexRgba(poster.accent, 0.18));
  meta.style.setProperty("--meta-badge-border", hexRgba(poster.accent, 0.4));
  meta.querySelector(".meta-chips").innerHTML = poster.tech
    .map((item) => `<span class="meta-chip">${item}</span>`)
    .join("");
  const git = meta.querySelector(".meta-git");
  git.href = poster.githubUrl;
  git.querySelector("span").textContent = poster.github;
  meta.querySelector(".meta-date").textContent = poster.date;
  if (poster.demoMeta) {
    metaDemo.removeAttribute("target");
    metaDemo.href = "#";
  } else {
    metaDemo.target = "_blank";
    metaDemo.href = poster.githubUrl;
  }
}

function setDemoLayout(t, animate) {
  if (demoLayoutTl) {
    demoLayoutTl.kill();
    demoLayoutTl = null;
  }
  const apply = () => {
    demoLayoutT = demoLayout.t;
    if (focusedHang) renderHang(focusedHang);
    if (meta.classList.contains("is-open")) placeMeta();
  };
  if (!animate || reducedMotion) {
    demoLayout.t = t;
    apply();
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    demoLayoutTl = gsap.to(demoLayout, {
      t,
      duration: DEMO_LAYOUT_MS,
      ease: "power2.out",
      onUpdate: apply,
      onComplete: () => {
        demoLayoutTl = null;
        apply();
        resolve();
      },
    });
  });
}

function stopMetaVideo() {
  if (!metaDemoVideo) return;
  metaDemoVideo.src = "";
  metaDemoVideo.removeAttribute("src");
}

function resetMetaPanels() {
  if (metaSwapTl) {
    metaSwapTl.kill();
    metaSwapTl = null;
  }
  metaOnNext = false;
  meta.classList.remove("is-next", "is-on-vivid");
  stopMetaVideo();
  gsap.set(metaPanelMain, { clearProps: "opacity,transform,pointerEvents" });
  gsap.set(metaPanelNext, { clearProps: "opacity,transform" });
  gsap.set(
    metaPanelMain.querySelectorAll(
      ".meta-kicker, .meta-title, .meta-blurb, .meta-rule, .meta-tech-label, .meta-chip, .meta-git, .meta-date, .meta-demo"
    ),
    { clearProps: "opacity,transform,clipPath" }
  );
  const videoFrame = metaPanelNext.querySelector(".meta-next-video");
  if (videoFrame) gsap.set(videoFrame, { clipPath: "inset(0 0 100% 0)", clearProps: "opacity,transform" });
}

async function openMetaNext() {
  if (metaOnNext || !meta.classList.contains("is-open")) return;
  metaOnNext = true;
  if (typeTl) {
    typeTl.kill();
    typeTl = null;
  }
  if (metaSwapTl) metaSwapTl.kill();

  const videoFrame = metaPanelNext.querySelector(".meta-next-video");
  const kicker = metaPanelMain.querySelector(".meta-kicker");
  const title = metaPanelMain.querySelector(".meta-title");
  const blurb = metaPanelMain.querySelector(".meta-blurb");
  const rule = metaPanelMain.querySelector(".meta-rule");
  const techLabel = metaPanelMain.querySelector(".meta-tech-label");
  const chips = metaPanelMain.querySelectorAll(".meta-chip");
  const git = metaPanelMain.querySelector(".meta-git");
  const dateEl = metaPanelMain.querySelector(".meta-date");
  const demo = metaPanelMain.querySelector(".meta-demo");

  const vanish = { opacity: 0, duration: 0.18, ease: "power2.in" };
  const popOut = {
    keyframes: [
      { scale: 1.05, duration: 0.08 },
      { scale: 0.7, opacity: 0, duration: 0.16 },
    ],
    ease: "power2.in",
  };

  gsap.set(videoFrame, { clipPath: "inset(0 0 100% 0)", clearProps: "opacity,transform" });
  stopMetaVideo();

  await new Promise((resolve) => {
    metaSwapTl = gsap.timeline({
      defaults: { ease: "power2.in" },
      onComplete: resolve,
    });
    metaSwapTl.to(demo, popOut);
    metaSwapTl.to([dateEl, git], { ...vanish, stagger: 0.04 }, "-=0.04");
    metaSwapTl.to(chips, { ...popOut, stagger: { each: 0.04, from: "end" } }, "-=0.06");
    metaSwapTl.to(techLabel, vanish, "-=0.04");
    metaSwapTl.to(rule, { scaleX: 0, transformOrigin: "left center", duration: 0.28, ease: "power2.in" }, "-=0.02");
    metaSwapTl.to(blurb, vanish, "-=0.06");
    metaSwapTl.to(title, vanish, "-=0.04");
    metaSwapTl.to(kicker, vanish, "-=0.02");
  });

  if (!metaOnNext || !meta.classList.contains("is-open")) return;

  meta.classList.add("is-next");
  placeMeta();
  await setDemoLayout(1, !reducedMotion);
  if (!metaOnNext || !meta.classList.contains("is-open")) return;

  metaDemoVideo.src = demoYoutubeSrc(focusedHang?.poster || posters[index]);
  await new Promise((resolve) => {
    metaSwapTl = gsap.fromTo(
      videoFrame,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.55,
        ease: "power2.out",
        onComplete: resolve,
      }
    );
  });
}

function placeMeta() {
  const poster = focusedHang?.poster || posters[index];
  const s = posterScale(poster);
  const { w, h } = sheetSize(poster);
  const grow = POSTER_GROW_TO * (1 + (DEMO_POSTER_SCALE - 1) * demoLayoutT);
  const posterLeft = focusLeft();
  const posterW = w * s;
  const posterH = h * s;
  const grownRight = posterLeft + posterW / 2 + (posterW * grow) / 2;
  meta.style.left = `${grownRight + 120 * s}px`;
  meta.style.top = `${hangMetrics(poster).L + posterH / 2}px`;
  meta.style.transform = "translateY(-50%)";
}

function typeDuration(text) {
  return Math.max(0.25, String(text || "").length * 0.028);
}

function typeMetaMain(poster) {
  const kicker = meta.querySelector(".meta-kicker");
  const title = meta.querySelector(".meta-title");
  const blurb = meta.querySelector(".meta-blurb");
  const rule = meta.querySelector(".meta-rule");
  const techLabel = meta.querySelector(".meta-tech-label");
  const gitText = meta.querySelector(".meta-git span");
  const dateEl = meta.querySelector(".meta-date");
  const techText = "Technologies Used";
  if (typeTl) typeTl.kill();
  [kicker, title, blurb, techLabel, gitText, dateEl].forEach((el) => {
    el.style.minHeight = "";
    el.style.minWidth = "";
  });
  kicker.textContent = "Active Exhibition";
  title.textContent = poster.shortTitle;
  blurb.textContent = poster.blurb;
  techLabel.textContent = techText;
  gitText.textContent = poster.github;
  dateEl.textContent = poster.date;
  void meta.offsetHeight;
  kicker.style.minHeight = `${kicker.offsetHeight}px`;
  title.style.minHeight = `${title.offsetHeight}px`;
  blurb.style.minHeight = `${blurb.offsetHeight}px`;
  techLabel.style.minHeight = `${techLabel.offsetHeight}px`;
  gitText.style.minWidth = `${gitText.offsetWidth}px`;
  gitText.style.minHeight = `${gitText.offsetHeight}px`;
  dateEl.style.minWidth = `${dateEl.offsetWidth}px`;
  dateEl.style.minHeight = `${dateEl.offsetHeight}px`;
  placeMeta();
  kicker.textContent = "";
  title.textContent = "";
  blurb.textContent = "";
  techLabel.textContent = "";
  gitText.textContent = "";
  dateEl.textContent = "";
  const chips = meta.querySelectorAll(".meta-chip");
  const gitImg = meta.querySelector(".meta-git img");
  const demo = meta.querySelector(".meta-demo");
  gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(chips, { scale: 0.6, opacity: 0, transformOrigin: "center center" });
  gsap.set(gitImg, { clipPath: "inset(0 100% 0 0)" });
  gsap.set(demo, { scale: 0.6, opacity: 0, transformOrigin: "center center" });
  typeTl = gsap.timeline({ defaults: { ease: "none" } });
  typeTl.to(kicker, { duration: typeDuration("Active Exhibition"), text: "Active Exhibition" });
  typeTl.to(title, { duration: typeDuration(poster.shortTitle), text: poster.shortTitle });
  typeTl.to(blurb, { duration: typeDuration(poster.blurb), text: poster.blurb });
  typeTl.to(rule, { scaleX: 1, duration: 0.45, ease: "power2.out" }, "+=0.1");
  typeTl.to(techLabel, { duration: typeDuration(techText), text: techText });
  typeTl.to(chips, {
    keyframes: [
      { scale: 1.1, opacity: 1, duration: 0.18 },
      { scale: 1, duration: 0.16 },
    ],
    stagger: 0.09,
    ease: "power2.out",
  }, "+=0.09");
  typeTl.to(gitImg, {
    clipPath: "inset(0 0% 0 0)",
    duration: 0.45,
    ease: "power2.out",
  }, "+=0.09");
  typeTl.to(gitText, { duration: typeDuration(poster.github), text: poster.github }, "+=0.09");
  typeTl.to(dateEl, { duration: typeDuration(poster.date), text: poster.date });
  typeTl.to(demo, {
    keyframes: [
      { scale: 1.1, opacity: 1, duration: 0.18 },
      { scale: 1, duration: 0.16 },
    ],
    ease: "power2.out",
  }, "+=0.09");
}

function clipMetaToReveal() {
  if (!meta.classList.contains("is-open")) {
    meta.style.clipPath = "";
    return;
  }
  const revealBox = reveal.getBoundingClientRect();
  const metaBox = meta.getBoundingClientRect();
  const cut = Math.max(0, revealBox.left - metaBox.left);
  meta.style.clipPath = cut > 0.5 ? `inset(0 0 0 ${cut}px)` : "";
}

function showMeta(poster) {
  resetMetaPanels();
  fillMeta(poster);
  meta.style.clipPath = "";
  typeMetaMain(poster);
  meta.classList.add("is-open");
}

function hideMeta() {
  if (typeTl) {
    typeTl.kill();
    typeTl = null;
  }
  resetMetaPanels();
  setDemoLayout(0, false);
  meta.querySelectorAll(".meta-kicker, .meta-title, .meta-blurb, .meta-tech-label, .meta-git span, .meta-date").forEach((el) => {
    el.style.minHeight = "";
    el.style.minWidth = "";
  });
  const rule = meta.querySelector(".meta-rule");
  if (rule) gsap.set(rule, { scaleX: 0 });
  gsap.set(meta.querySelectorAll(".meta-chip"), { scale: 0.6, opacity: 0 });
  gsap.set(meta.querySelector(".meta-git img"), { clipPath: "inset(0 100% 0 0)" });
  gsap.set(meta.querySelector(".meta-demo"), { scale: 0.6, opacity: 0 });
  meta.classList.remove("is-open");
  meta.style.clipPath = "";
}

function showExit() {
  hall.classList.add("session-open");
  exitBtn.classList.remove("is-visible", "is-leaving");
  void exitBtn.offsetWidth;
  exitBtn.classList.add("is-visible");
}

function hideExit() {
  exitBtn.classList.remove("is-visible", "is-leaving");
  hall.classList.remove("session-open");
}

function exitSession() {
  if (exitBtn.classList.contains("is-leaving")) return;
  if (!focusedHang && !reveal.classList.contains("is-open")) return;
  const token = ++focusToken;
  clearFocusTimers();
  pinSettleStart = 0;
  focusing = false;
  lastSwayX = null;

  const peelAway = () => {
    if (token !== focusToken) return;
    exitBtn.classList.remove("is-visible", "is-leaving");
    closeReveal();
    const finish = () => {
      if (token !== focusToken) return;
      hall.classList.remove("session-open");
      posterGrowStart = 0;
      posterShrinkStart = 0;
      posterHangReturnStart = 0;
      hideMeta();
      if (focusedHang) returnPoster(focusedHang);
      physicsPaused = false;
      hangs.forEach((hang) => {
        restPose(hang);
        hang.settled = false;
        freezeHang(hang);
        renderHang(hang);
      });
    };
    if (reducedMotion) {
      finish();
      return;
    }
    const onEnd = (event) => {
      if (event.propertyName && event.propertyName !== "width") return;
      reveal.removeEventListener("transitionend", onEnd);
      finish();
    };
    reveal.addEventListener("transitionend", onEnd);
    window.setTimeout(() => {
      reveal.removeEventListener("transitionend", onEnd);
      finish();
    }, REVEAL_MS + 40);
  };

  const shrinkThenPeel = () => {
    if (token !== focusToken) return;
    posterShrinkStart = performance.now();
    posterPeelTimer = window.setTimeout(() => {
      if (token !== focusToken) return;
      peelAway();
    }, POSTER_GROW_MS);
  };

  const restorePosterThenLeave = async () => {
    if (token !== focusToken) return;
    if (metaSwapTl) {
      metaSwapTl.kill();
      metaSwapTl = null;
    }
    const fromDemo = metaOnNext || demoLayoutT > 0.001;
    if (fromDemo) {
      const videoFrame = metaPanelNext.querySelector(".meta-next-video");
      await new Promise((resolve) => {
        if (!videoFrame || reducedMotion) {
          if (videoFrame) gsap.set(videoFrame, { clipPath: "inset(0 0 100% 0)" });
          resolve();
          return;
        }
        metaSwapTl = gsap.to(videoFrame, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.45,
          ease: "power2.in",
          onComplete: resolve,
        });
      });
      if (token !== focusToken) return;
      if (demoLayoutTl) {
        demoLayoutTl.kill();
        demoLayoutTl = null;
      }
      demoLayout.t = 0;
      demoLayoutT = 0;
      posterGrowStart = 0;
      posterShrinkStart = 0;
      posterHangReturnStart = 0;
      stopMetaVideo();
      hideMeta();
      if (focusedHang) renderHang(focusedHang);
      await new Promise((resolve) => window.setTimeout(resolve, 500));
      if (token !== focusToken) return;
      peelAway();
      return;
    }
    if (reducedMotion) {
      peelAway();
      return;
    }
    posterShrinkTimer = window.setTimeout(() => {
      if (token !== focusToken) return;
      shrinkThenPeel();
    }, POSTER_SHRINK_AFTER_MS);
  };

  if (reducedMotion) {
    restorePosterThenLeave();
    return;
  }

  exitBtn.classList.remove("is-visible");
  void exitBtn.offsetWidth;
  exitBtn.classList.add("is-leaving");
  let started = false;
  const afterButton = () => {
    if (started) return;
    started = true;
    exitBtn.classList.remove("is-visible", "is-leaving");
    restorePosterThenLeave();
  };
  const onBtnEnd = (event) => {
    if (event.animationName && event.animationName !== "exit-unpop") return;
    exitBtn.removeEventListener("animationend", onBtnEnd);
    afterButton();
  };
  exitBtn.addEventListener("animationend", onBtnEnd);
  window.setTimeout(() => {
    exitBtn.removeEventListener("animationend", onBtnEnd);
    afterButton();
  }, 360);
}

function wakeMotion() {
  if (physicsPaused) return;
  lastMotionAt = performance.now();
  for (const hang of hangs) {
    hang.settled = false;
    if (hang.engine) hang.engine.gravity.scale = 0.0004;
  }
}

function scaleBodyMotion(body, keep) {
  Body.setVelocity(body, { x: body.velocity.x * keep, y: body.velocity.y * keep });
  Body.setAngularVelocity(body, body.angularVelocity * keep);
}

function lerpToward(body, x, y, angle, amount) {
  Body.setPosition(body, {
    x: body.position.x + (x - body.position.x) * amount,
    y: body.position.y + (y - body.position.y) * amount,
  });
  Body.setAngle(body, body.angle + (angle - body.angle) * amount);
}

function easeInCubic(t) {
  return t * t * t;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function settleHang(hang, t) {
  const keep = 1 - easeInCubic(t) * 0.92;
  const pull = 0.02 + easeInCubic(t) * 0.16;
  const m = hang.metrics;
  if (hang.engine) hang.engine.gravity.scale = 0.0004 * (1 - t);
  scaleBodyMotion(hang.body, keep);
  lerpToward(hang.body, m.pivotX, m.L + m.posterH / 2, 0, pull);
  hang.leftBeads.forEach((bead, i) => {
    if (bead.isStatic) return;
    scaleBodyMotion(bead, keep);
    lerpToward(bead, m.anchorL, i * hang.ropeStep, 0, pull);
  });
  hang.rightBeads.forEach((bead, i) => {
    if (bead.isStatic) return;
    scaleBodyMotion(bead, keep);
    lerpToward(bead, m.anchorR, i * hang.ropeStep, 0, pull);
  });
}

function freezeHang(hang) {
  if (!hang.body || hang.settled) return;
  scaleBodyMotion(hang.body, 0);
  hang.leftBeads.forEach((bead) => scaleBodyMotion(bead, 0));
  hang.rightBeads.forEach((bead) => scaleBodyMotion(bead, 0));
  if (hang.engine) hang.engine.gravity.scale = 0;
  hang.settled = true;
}

function restPose(hang) {
  if (!hang.body) return;
  const m = hang.metrics;
  Body.setVelocity(hang.body, { x: 0, y: 0 });
  Body.setAngularVelocity(hang.body, 0);
  Body.setAngle(hang.body, 0);
  Body.setPosition(hang.body, { x: m.pivotX, y: m.L + m.posterH / 2 });
  hang.leftBeads.forEach((bead, i) => {
    Body.setVelocity(bead, { x: 0, y: 0 });
    Body.setAngularVelocity(bead, 0);
    Body.setPosition(bead, { x: m.anchorL, y: i * hang.ropeStep });
  });
  hang.rightBeads.forEach((bead, i) => {
    Body.setVelocity(bead, { x: 0, y: 0 });
    Body.setAngularVelocity(bead, 0);
    Body.setPosition(bead, { x: m.anchorR, y: i * hang.ropeStep });
  });
}

function applyLoadBounce(hang, now, phase) {
  if (!hang.body) return;
  const m = hang.metrics;
  const t = Math.max(0, (now - loadBounceStart) / 1000);
  const duration = LOAD_BOUNCE_MS / 1000;
  const last = hang.leftBeads.length - 1;
  const freq = LOAD_BOUNCES / duration;
  const dy = 10 * Math.exp(-2.5 * t) * Math.sin(2 * Math.PI * freq * t + phase);
  Body.setVelocity(hang.body, { x: 0, y: 0 });
  Body.setAngularVelocity(hang.body, 0);
  Body.setAngle(hang.body, 0);
  Body.setPosition(hang.body, { x: m.pivotX, y: m.L + m.posterH / 2 + dy });
  hang.leftBeads.forEach((bead, i) => {
    const stretch = last ? (i / last) * dy : 0;
    Body.setVelocity(bead, { x: 0, y: 0 });
    Body.setAngularVelocity(bead, 0);
    Body.setPosition(bead, { x: m.anchorL, y: i * hang.ropeStep + stretch });
  });
  hang.rightBeads.forEach((bead, i) => {
    const stretch = last ? (i / last) * dy : 0;
    Body.setVelocity(bead, { x: 0, y: 0 });
    Body.setAngularVelocity(bead, 0);
    Body.setPosition(bead, { x: m.anchorR, y: i * hang.ropeStep + stretch });
  });
}

function dampToRest(hang, t) {
  if (!hang.body) return;
  const m = hang.metrics;
  const pull = 0.1 + easeOutCubic(t) * 0.32;
  const keep = 1 - t * 0.92;
  if (hang.engine) hang.engine.gravity.scale = 0;
  scaleBodyMotion(hang.body, keep);
  lerpToward(hang.body, m.pivotX, m.L + m.posterH / 2, 0, pull);
  hang.leftBeads.forEach((bead, i) => {
    if (bead.isStatic) return;
    scaleBodyMotion(bead, keep);
    lerpToward(bead, m.anchorL, i * hang.ropeStep, 0, pull);
  });
  hang.rightBeads.forEach((bead, i) => {
    if (bead.isStatic) return;
    scaleBodyMotion(bead, keep);
    lerpToward(bead, m.anchorR, i * hang.ropeStep, 0, pull);
  });
}

function pinFocused() {
  if (reducedMotion) {
    hangs.forEach((hang) => {
      restPose(hang);
      hang.settled = false;
      freezeHang(hang);
      renderHang(hang);
    });
    physicsPaused = true;
    pinSettleStart = 0;
    return;
  }
  physicsPaused = false;
  pinSettleStart = performance.now();
  hangs.forEach((hang) => {
    hang.settled = false;
    if (hang.engine) hang.engine.gravity.scale = 0;
  });
}

function clearFocusTimers() {
  if (revealTimer) {
    window.clearTimeout(revealTimer);
    revealTimer = 0;
  }
  if (revealEndTimer) {
    window.clearTimeout(revealEndTimer);
    revealEndTimer = 0;
  }
  if (revealEndHandler) {
    reveal.removeEventListener("transitionend", revealEndHandler);
    revealEndHandler = null;
  }
  if (exitPopTimer) {
    window.clearTimeout(exitPopTimer);
    exitPopTimer = 0;
  }
  if (posterGrowTimer) {
    window.clearTimeout(posterGrowTimer);
    posterGrowTimer = 0;
  }
  if (posterShrinkTimer) {
    window.clearTimeout(posterShrinkTimer);
    posterShrinkTimer = 0;
  }
  if (posterPeelTimer) {
    window.clearTimeout(posterPeelTimer);
    posterPeelTimer = 0;
  }
  if (demoLayoutTl) {
    demoLayoutTl.kill();
    demoLayoutTl = null;
  }
  pinSettleStart = 0;
}

function focusPoster(i) {
  if (focusedHang || hall.classList.contains("session-open")) return;
  const next = clampIndex(i);
  const fromX = x;
  const alreadyThere = Math.abs(fromX - restX(next)) < 2;
  const token = ++focusToken;
  index = next;
  focusing = true;
  physicsPaused = false;
  loadBounceStart = 0;
  clearFocusTimers();
  posterGrowStart = 0;
  posterShrinkStart = 0;
  posterHangReturnStart = 0;
  hideMeta();
  closeReveal();
  if (focusedHang) returnPoster(focusedHang);

  if (!alreadyThere && !reducedMotion) lastSwayX = readTrackX();
  setX(restX(next), !alreadyThere && !reducedMotion);

  const startReveal = () => {
    if (token !== focusToken) return;
    focusing = false;
    liftPoster(hangs[next]);
    openReveal(posters[next].wall);
    hall.classList.add("session-open");
    if (reducedMotion) {
      pinFocused();
      posterGrowStart = performance.now() - POSTER_GROW_MS;
      showExit();
      showMeta(posters[next]);
      return;
    }
    let pinned = false;
    const pin = () => {
      if (token !== focusToken || pinned) return;
      pinned = true;
      if (revealEndHandler) {
        reveal.removeEventListener("transitionend", revealEndHandler);
        revealEndHandler = null;
      }
      pinFocused();
      exitPopTimer = window.setTimeout(() => {
        if (token !== focusToken) return;
        showExit();
      }, EXIT_POP_AFTER_MS);
    };
    const onRevealEnd = (event) => {
      if (event.propertyName && event.propertyName !== "width") return;
      pin();
    };
    revealEndHandler = onRevealEnd;
    reveal.addEventListener("transitionend", onRevealEnd);
    revealEndTimer = window.setTimeout(pin, REVEAL_MS + 40);
  };

  let moveSettled = false;
  const afterMove = () => {
    if (token !== focusToken || moveSettled) return;
    moveSettled = true;
    lastSwayX = null;
    revealTimer = window.setTimeout(startReveal, reducedMotion ? 0 : REVEAL_AFTER_MS);
  };

  if (alreadyThere || reducedMotion) {
    afterMove();
    return;
  }

  const onEnd = (event) => {
    if (event.propertyName && event.propertyName !== "transform") return;
    track.removeEventListener("transitionend", onEnd);
    afterMove();
  };
  track.addEventListener("transitionend", onEnd);
  window.setTimeout(() => {
    track.removeEventListener("transitionend", onEnd);
    afterMove();
  }, TRACK_SLIDE_MS);
}

function beginPosterGrow() {
  if (posterGrowStart || posterShrinkStart || posterHangReturnStart || !focusedHang) return;
  if (!hall.classList.contains("session-open")) return;
  posterGrowStart = performance.now();
  showMeta(focusedHang.poster);
}

function posterAtRest(hang) {
  const body = hang?.body;
  if (!body) return false;
  return (
    Math.abs(body.angle) < 0.002 &&
    Math.abs(body.angularVelocity) < 0.0008 &&
    Math.hypot(body.velocity.x, body.velocity.y) < 0.05
  );
}

function posterGrowScale(slot) {
  if (slot.parentElement !== focusLayer) return 1;
  if (posterHangReturnStart) {
    const t = Math.min(1, Math.max(0, (performance.now() - posterHangReturnStart) / POSTER_GROW_MS));
    return posterHangReturnFrom + (1 - posterHangReturnFrom) * easeOutCubic(t);
  }
  let grow = 1;
  if (posterShrinkStart) {
    const t = Math.min(1, Math.max(0, (performance.now() - posterShrinkStart) / POSTER_GROW_MS));
    grow = POSTER_GROW_TO + (1 - POSTER_GROW_TO) * easeOutCubic(t);
  } else if (posterGrowStart) {
    const t = Math.min(1, Math.max(0, (performance.now() - posterGrowStart) / POSTER_GROW_MS));
    grow = 1 + (POSTER_GROW_TO - 1) * easeOutCubic(t);
  }
  return grow * (1 + (DEMO_POSTER_SCALE - 1) * demoLayoutT);
}

function renderHang(hang) {
  const { body, leftBeads, rightBeads, metrics, slot, pathL, pathR } = hang;
  if (!body) return;
  pathL.setAttribute("points", ropePoints(leftBeads));
  pathR.setAttribute("points", ropePoints(rightBeads));
  const ox = body.position.x - metrics.posterW / 2;
  const oy = body.position.y - metrics.posterH / 2;
  let left = slot.parentElement === focusLayer ? focusLeft() + ox : ox;
  let top = oy;
  let angle = body.angle;
  const grow = posterGrowScale(slot);
  if (slot.parentElement === focusLayer && (posterGrowStart || physicsPaused)) {
    left = Math.round(left);
    top = Math.round(top);
    angle = 0;
  }
  slot.style.transform = `translate(${left}px, ${top}px) rotate(${angle}rad) scale(${grow})`;
}

function tick(ts) {
  if (!lastTs) lastTs = ts;
  const dt = Math.min(ts - lastTs, 1000 / 45);
  lastTs = ts;
  clipMetaToReveal();
  const bouncing = loadBounceStart && ts < loadBounceStart + LOAD_BOUNCE_MS;
  if (bouncing && !physicsPaused) {
    hangs.forEach((hang, i) => applyLoadBounce(hang, ts, i * 0.2));
    hangs.forEach(renderHang);
    rafId = requestAnimationFrame(tick);
    return;
  }
  if (loadBounceStart && ts >= loadBounceStart + LOAD_BOUNCE_MS) {
    hangs.forEach((hang) => {
      hang.settled = false;
      restPose(hang);
      freezeHang(hang);
    });
    loadBounceStart = 0;
  }
  if (lastSwayX != null) {
    const nowX = readTrackX();
    swayTrackBy(nowX - lastSwayX);
    lastSwayX = nowX;
  }
  if (pinSettleStart) {
    const t = Math.min(1, (ts - pinSettleStart) / PIN_SETTLE_MS);
    hangs.forEach((hang) => {
      if (hang.body && !hang.settled) dampToRest(hang, t);
      renderHang(hang);
    });
    const settled = t >= 1 || (t > 0.12 && posterAtRest(focusedHang));
    if (settled) {
      hangs.forEach((hang) => {
        restPose(hang);
        hang.settled = false;
        freezeHang(hang);
        renderHang(hang);
      });
      pinSettleStart = 0;
      physicsPaused = true;
      beginPosterGrow();
    }
    rafId = requestAnimationFrame(tick);
    return;
  }
  const elapsed = ts - lastMotionAt;
  for (const hang of hangs) {
    if (!physicsPaused && hang.engine && !hang.settled) {
      if (elapsed < SETTLE_AFTER_MS) {
        Engine.update(hang.engine, dt);
        tightenRope(hang.leftBeads, hang.ropeStep);
        tightenRope(hang.rightBeads, hang.ropeStep);
      } else if (elapsed < SETTLE_AFTER_MS + SETTLE_DURATION_MS) {
        const t = (elapsed - SETTLE_AFTER_MS) / SETTLE_DURATION_MS;
        Engine.update(hang.engine, dt);
        settleHang(hang, t);
        tightenRope(hang.leftBeads, hang.ropeStep);
        tightenRope(hang.rightBeads, hang.ropeStep);
      } else {
        freezeHang(hang);
      }
    }
    renderHang(hang);
  }
  rafId = requestAnimationFrame(tick);
}

function startLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  lastTs = 0;
  rafId = requestAnimationFrame(tick);
}

function applyHangSheet(hang) {
  const { w, h } = sheetSize(hang.poster);
  const s = posterScale(hang.poster);
  const apply = (node) => {
    if (!node) return;
    node.style.setProperty("--poster-w", `${w}px`);
    node.style.setProperty("--poster-h", `${h}px`);
    node.style.setProperty("--poster-scale", s);
  };
  apply(hang.el);
  apply(hang.slot);
}

function layout() {
  hall.style.setProperty("--poster-scale", hallScale());
  hangs.forEach(applyHangSheet);
  setX(restX(index), false);
  const firstLoad = !hangs.some((hang) => hang.body);
  hangs.forEach((hang) => {
    const prev = hang.body
      ? { vx: hang.body.velocity.x, vy: hang.body.velocity.y, w: hang.body.angularVelocity }
      : null;
    destroyPhysics(hang);
    createPhysics(hang, physicsPaused ? null : prev);
    if (physicsPaused) restPose(hang);
    renderHang(hang);
  });
  if (firstLoad && !reducedMotion && !physicsPaused) {
    hangs.forEach((hang) => {
      restPose(hang);
      if (hang.engine) hang.engine.gravity.scale = 0;
      hang.settled = true;
    });
    loadBounceStart = performance.now();
  }
  if (focusedHang) {
    hangs.forEach(restPose);
    liftPoster(focusedHang);
    reveal.classList.add("is-open");
    hall.classList.add("session-open");
    if (meta.classList.contains("is-open")) placeMeta();
  }
}

function snap(velocity) {
  let best = index;
  let bestDist = Infinity;
  for (let i = 0; i < posters.length; i++) {
    const dist = Math.abs(x - restX(i));
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  if (velocity < -0.55) best = clampIndex(best + 1);
  if (velocity > 0.55) best = clampIndex(best - 1);
  index = best;
  setX(restX(index), true);
  if (!physicsPaused) swayFromScroll(velocity * 18);
}

function swayPoster(hang, px) {
  if (!hang.body) return;
  const move = Math.max(-28, Math.min(28, px));
  const force = -move * 0.00009;
  const spin = -move * 0.000012;
  Body.applyForce(hang.body, hang.body.position, { x: force, y: 0 });
  const nextSpin = Math.max(-0.02, Math.min(0.02, hang.body.angularVelocity + spin));
  Body.setAngularVelocity(hang.body, nextSpin);
}

function swayFromScroll(px) {
  wakeMotion();
  for (const hang of hangs) swayPoster(hang, px);
}

track.innerHTML = posters.map(posterHtml).join("");
track.querySelectorAll(".hang").forEach((el, i) => {
  hangs.push({
    el,
    slot: el.querySelector(".poster-slot"),
    pathL: el.querySelector(".cord-l"),
    pathR: el.querySelector(".cord-r"),
    poster: posters[i],
  });
});
layout();
startLoop();

hall.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  if (event.target.closest("#exit-session, #meta-sidebar")) return;
  if (hall.classList.contains("session-open") || focusedHang) {
    event.preventDefault();
    return;
  }
  event.preventDefault();
  hall.setPointerCapture(event.pointerId);
  const slot = event.target.closest(".poster-slot");
  drag = {
    id: event.pointerId,
    startX: event.clientX,
    origin: x,
    lastX: event.clientX,
    lastT: performance.now(),
    velocity: 0,
    moved: false,
    hangIndex: slot ? hangs.findIndex((item) => item.slot === slot) : -1,
  };
});

hall.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.id || focusing) return;
  const dxFromStart = event.clientX - drag.startX;
  if (!drag.moved && Math.abs(dxFromStart) < 8) return;
  if (!drag.moved) {
    drag.moved = true;
    hall.classList.add("dragging");
    setX(x, false);
  }
  const now = performance.now();
  const dt = Math.max(now - drag.lastT, 1);
  const dx = event.clientX - drag.lastX;
  drag.velocity = dx / dt;
  drag.lastX = event.clientX;
  drag.lastT = now;
  setX(rubber(drag.origin + (event.clientX - drag.startX)), false);
  if (!physicsPaused) swayFromScroll(dx);
});

function endDrag(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const current = drag;
  drag = null;
  hall.classList.remove("dragging");
  if (focusing || focusedHang) return;
  if (!current.moved && current.hangIndex >= 0) {
    focusPoster(current.hangIndex);
    return;
  }
  if (current.moved) {
    snap(current.velocity);
  }
}

hall.addEventListener("pointerup", endDrag);
hall.addEventListener("pointercancel", endDrag);
hall.addEventListener("lostpointercapture", endDrag);
exitBtn.addEventListener("pointerdown", (event) => event.stopPropagation());
exitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  exitSession();
});
meta.addEventListener("click", (event) => {
  const demo = event.target.closest(".meta-demo");
  if (!demo) return;
  const poster = focusedHang?.poster || posters[index];
  if (!poster || !poster.demoMeta) return;
  event.preventDefault();
  event.stopPropagation();
  openMetaNext();
});
window.addEventListener("resize", layout);
