const posters = [
  {
    kicker: "Stanford University • Human-Computer Interaction",
    title: "Spatial Interfaces: Physical Spatial Metaphors in Virtual Environments",
    author: "Velde, M.",
    lab: "Design Research Lab",
    abstract:
      "This study evaluates how translating physical room/architecture paradigms into virtual file systems impacts spatial recall and processing fatigue. We mapped digital file arrays onto volumetric physical shelves.",
    methodology:
      'Subjects completed search procedures in standard tree-directory interfaces vs. our immersive physicalized spatial corridor. <strong>System tracking</strong> utilized micro-state eye movement tracking and cognitive load EEG measures.',
    figure: "Figure A: Search Speed (seconds)",
    conclusion:
      "Physical-spatial metaphors boosted spatial memory retention by 31% over traditional folder navigation structures, demonstrating strong benefits for immersive VR workspace design.",
    bars: [16, 30, 22, 36, 24, 18, 32, 38, 12],
    wall: "#1e1b4b",
    accent: "#eab308",
    shortTitle: "Spatial Interfaces",
    blurb:
      "An exploratory project examining ergonomic virtual environments through spatial, environmental, and somatic interactions.",
    tech: ["Unity", "React Three Fiber", "WebXR", "GLSL Shaders"],
    github: "github.com/velde/spatial",
    githubUrl: "https://github.com/velde/spatial",
    date: "Oct 2024",
  },
  {
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
    wall: "#0f172a",
    accent: "#38bdf8",
    shortTitle: "Neural Light Fields",
    blurb:
      "An end-to-end framework for neural rendering that turns sparse captures into photorealistic real-time view synthesis.",
    tech: ["PyTorch", "NeRF", "WebGPU", "CUDA"],
    github: "github.com/velde/lightfields",
    githubUrl: "https://github.com/velde/lightfields",
    date: "Oct 2024",
  },
  {
    kicker: "Stanford University • Robotics",
    title: "Tactile Feedback Optimization on Soft Actuator Assemblies",
    author: "Velde, M.",
    lab: "Soft Robotics Lab",
    abstract:
      "Soft pneumatic actuators were instrumented with high-density tactile skins so contact forces could be shaped in closed loop during grasp and slip events.",
    methodology:
      "A closed-loop optimizer tuned pressure profiles against perceived stiffness and slip, using high-density tactile skins on the actuator surface.",
    figure: "Figure A: Slip Events per Trial",
    conclusion:
      "Slip events dropped while keeping contact forces inside a comfortable haptic range, supporting safer human-robot collaboration.",
    bars: [38, 24, 14, 32, 20, 36, 18, 28, 12],
    wall: "#7c2d12",
    accent: "#fb923c",
    shortTitle: "Tactile Feedback",
    blurb:
      "A closed-loop optimizer for soft pneumatic actuators that shapes contact forces during grasp and slip events.",
    tech: ["ROS 2", "Soft Robotics", "Python", "C++"],
    github: "github.com/velde/tactile",
    githubUrl: "https://github.com/velde/tactile",
    date: "Oct 2024",
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
const track = document.getElementById("track");
const reveal = document.getElementById("reveal");
const focusLayer = document.getElementById("focus-layer");
const exitBtn = document.getElementById("exit-session");
const meta = document.getElementById("meta-sidebar");
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
let posterShrinkTimer = 0;
let posterPeelTimer = 0;
let lastMotionAt = 0;
let loadBounceStart = 0;
let lastSwayX = null;
let typeTl = null;
let pinSettleStart = 0;

const SETTLE_AFTER_MS = 1500;
const SETTLE_DURATION_MS = 1300;
const LOAD_BOUNCE_MS = 1500;
const LOAD_BOUNCES = 2;
const REVEAL_AFTER_MS = 1000;
const REVEAL_MS = 850;
const EXIT_POP_AFTER_MS = 1000;
const POSTER_GROW_AFTER_MS = 500;
const POSTER_GROW_MS = 500;
const POSTER_GROW_TO = 1.15;
const POSTER_SHRINK_AFTER_MS = 500;
const TRACK_SLIDE_MS = 620;
const PIN_SETTLE_MS = 2000;

const hangs = [];

function posterScale() {
  return Math.min((window.innerHeight * 0.74) / POSTER_H, (window.innerWidth * 0.46) / POSTER_W, 1);
}

function restX(i) {
  const s = posterScale();
  return window.innerWidth / 2 - 560 * s - i * STEP * s;
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
  track.style.transition = animate ? "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
  track.style.transform = `translate3d(${x}px, 0, 0)`;
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

function posterHtml(poster) {
  return `
    <article class="hang">
      <div class="swing-rig">
        <svg class="strings" aria-hidden="true">
          <polyline class="cord-l" />
          <polyline class="cord-r" />
        </svg>
        <div class="poster-slot">
          <div class="poster">
            <div class="poster-fill"></div>
            <img class="weave" src="assets/fabric-weave.png" alt="" draggable="false" />
            <div class="edge edge-t"></div>
            <div class="edge edge-r"></div>
            <div class="edge edge-b"></div>
            <div class="edge edge-l"></div>
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
            <div class="inset"></div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function hangMetrics() {
  const s = posterScale();
  const L = Math.max(56, hall.clientHeight / 2 - 380 * s);
  return {
    s,
    L,
    posterW: POSTER_W * s,
    posterH: POSTER_H * s,
    pivotX: 270 * s,
    anchorL: 80 * s,
    anchorR: 460 * s,
    attach: 190 * s,
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
  const m = hangMetrics();
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
  const s = posterScale();
  return window.innerWidth / 2 - 560 * s;
}

function liftPoster(hang) {
  if (!hang?.slot) return;
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

function openReveal(color) {
  reveal.style.backgroundColor = color;
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
  meta.style.setProperty("--meta-accent", poster.accent);
  meta.style.setProperty("--meta-badge-bg", hexRgba(poster.accent, 0.16));
  meta.style.setProperty("--meta-badge-border", hexRgba(poster.accent, 0.32));
  meta.querySelector(".meta-chips").innerHTML = poster.tech
    .map((item) => `<span class="meta-chip">${item}</span>`)
    .join("");
  const git = meta.querySelector(".meta-git");
  git.href = poster.githubUrl;
  git.querySelector("span").textContent = poster.github;
  meta.querySelector(".meta-date").textContent = poster.date;
  meta.querySelector(".meta-demo").href = poster.githubUrl;
}

function placeMeta() {
  const s = posterScale();
  const posterLeft = focusLeft();
  const posterW = POSTER_W * s;
  const posterH = POSTER_H * s;
  const grownRight = posterLeft + posterW / 2 + (posterW * POSTER_GROW_TO) / 2;
  meta.style.left = `${grownRight + 160 * s}px`;
  meta.style.top = `${hangMetrics().L + posterH / 2}px`;
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

  if (reducedMotion) {
    peelAway();
    return;
  }

  exitBtn.classList.remove("is-visible");
  void exitBtn.offsetWidth;
  exitBtn.classList.add("is-leaving");
  let peeled = false;
  const afterButton = () => {
    if (peeled) return;
    peeled = true;
    exitBtn.classList.remove("is-visible", "is-leaving");
    posterShrinkTimer = window.setTimeout(() => {
      if (token !== focusToken) return;
      posterShrinkStart = performance.now();
      posterPeelTimer = window.setTimeout(() => {
        if (token !== focusToken) return;
        peelAway();
      }, POSTER_GROW_MS);
    }, POSTER_SHRINK_AFTER_MS);
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
      posterGrowTimer = window.setTimeout(() => {
        if (token !== focusToken) return;
        posterGrowStart = performance.now();
        showMeta(posters[next]);
      }, POSTER_GROW_AFTER_MS);
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

function posterGrowScale(slot) {
  if (slot.parentElement !== focusLayer) return 1;
  if (posterShrinkStart) {
    const t = Math.min(1, Math.max(0, (performance.now() - posterShrinkStart) / POSTER_GROW_MS));
    return POSTER_GROW_TO + (1 - POSTER_GROW_TO) * easeOutCubic(t);
  }
  if (!posterGrowStart) return 1;
  const t = Math.min(1, Math.max(0, (performance.now() - posterGrowStart) / POSTER_GROW_MS));
  return 1 + (POSTER_GROW_TO - 1) * easeOutCubic(t);
}

function renderHang(hang) {
  const { body, leftBeads, rightBeads, metrics, slot, pathL, pathR } = hang;
  if (!body) return;
  pathL.setAttribute("points", ropePoints(leftBeads));
  pathR.setAttribute("points", ropePoints(rightBeads));
  const ox = body.position.x - metrics.posterW / 2;
  const oy = body.position.y - metrics.posterH / 2;
  const left = slot.parentElement === focusLayer ? focusLeft() + ox : ox;
  const grow = posterGrowScale(slot);
  slot.style.transform = `translate(${left}px, ${oy}px) rotate(${body.angle}rad) scale(${grow})`;
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
      if (t >= 1) {
        restPose(hang);
        hang.settled = false;
        freezeHang(hang);
      }
      renderHang(hang);
    });
    if (t >= 1) {
      pinSettleStart = 0;
      physicsPaused = true;
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

function layout() {
  hall.style.setProperty("--poster-scale", posterScale());
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
  const s = posterScale();
  const step = STEP * s;
  let raw = (restX(0) - x) / step;
  if (velocity < -0.55) raw = Math.ceil(raw - 0.12);
  if (velocity > 0.55) raw = Math.floor(raw + 0.12);
  index = clampIndex(Math.round(raw));
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
track.querySelectorAll(".hang").forEach((el) => {
  hangs.push({
    el,
    slot: el.querySelector(".poster-slot"),
    pathL: el.querySelector(".cord-l"),
    pathR: el.querySelector(".cord-r"),
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
window.addEventListener("resize", layout);
