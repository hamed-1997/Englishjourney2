/* ENGLISH JOURNEY — app.js
   Vanilla JS. No framework, no backend. All state is local.
   CURRICULUM_DAYS / CURRICULUM_STAGES come from curriculum-data.js
*/

// ---------------------------------------------------------------
// Storage
// ---------------------------------------------------------------
const STORE_KEY = "ej_state_v1";
const APP_VERSION = "2026.09.06";

// Seeded default resources — real, verified, free tools (not placeholders).
// The user can edit or delete any of these; this just means Resources isn't empty on day one.
const DEFAULT_RESOURCES = [
  { id: "r-bbc", title: "BBC Learning English", link: "https://www.bbc.co.uk/learningenglish", type: "Listening" },
  { id: "r-voa", title: "VOA Learning English", link: "https://learningenglish.voanews.com/", type: "Listening" },
  { id: "r-elllo", title: "Elllo — Listening by Level", link: "https://elllo.org/", type: "Listening" },
  { id: "r-castbox", title: "Castbox — 6 Minute English", link: "https://castbox.fm/channel/6-Minute-English-id574393", type: "Listening" },
  { id: "r-youtube-listening", title: "YouTube — search English listening", link: "https://www.youtube.com/results?search_query=English%20listening%20practice", type: "Listening" },
  { id: "r-newsinlevels", title: "News in Levels", link: "https://www.newsinlevels.com/", type: "Reading" },
  { id: "r-bne", title: "Breaking News English", link: "https://breakingnewsenglish.com/", type: "Reading" },
  { id: "r-ereader", title: "English e-Reader (graded books)", link: "https://english-e-reader.net/", type: "Reading" },
  { id: "r-britishcouncil", title: "British Council — LearnEnglish Grammar", link: "https://learnenglish.britishcouncil.org/grammar", type: "Grammar" },
  { id: "r-writeimprove", title: "Write & Improve by Cambridge", link: "https://writeandimprove.com/", type: "Writing" },
  { id: "r-anki", title: "Anki (spaced-repetition flashcards)", link: "https://apps.ankiweb.net/", type: "Vocabulary" },
  { id: "r-camdict", title: "Cambridge Dictionary", link: "https://dictionary.cambridge.org/", type: "Vocabulary" },
  { id: "r-youglish", title: "YouGlish (hear words in real videos)", link: "https://youglish.com/", type: "Vocabulary" },
  { id: "r-tubeshad", title: "TubeShad — Shadowing app", link: "https://tubeshad.com/", type: "Shadowing" },
  { id: "r-youtube-shadow", title: "YouTube — search shadowing videos", link: "https://www.youtube.com/results?search_query=English%20shadowing%20practice%20video", type: "Shadowing" }
];

function defaultState() {
  return {
    currentDay: 1,
    stepIndex: 0,                 // index within current day's steps
    completedStepsToday: [],      // ids of completed steps for currentDay
    completedDays: [],            // list of day numbers fully completed
    streak: 0,
    bestStreak: 0,
    lastCompletionDate: null,     // ISO date string (yyyy-mm-dd) of last day completion
    lessonCredits: null,           // null = not yet initialized; otherwise, lessons the learner can start right now
    lastCreditGrantDate: null,     // last local date credits were granted for
    restDay: "Friday",
    resources: DEFAULT_RESOURCES.map(r => ({ ...r })),   // {id, title, link, type}
    settings: {
      puterConnected: false,
      model: "gpt-4o-mini"
    },
    victorChat: [],            // {role: "user"|"victor", content}
    userName: "",              // shown as author credit on the generated book
    bookIntro: null,           // {text, approved}
    stageBooklets: {},         // { [stageNum]: {vocabulary:[...], reading:{title,text}, generatedDate} }
    stageQuizzes: {},          // { [stageNum]: {questions:[...], completed, score, total} }
    bookSettings: {
      font: "helvetica",       // "helvetica" | "times"
      fontSizeScale: 1,        // 1 = normal, 1.15 = large
      extraInstructions: ""    // free-text, appended to the chapter-generation prompt
    }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

let state = loadState();

// ---------------------------------------------------------------
// Curriculum helpers
// ---------------------------------------------------------------
function getDayData(dayNum) {
  return CURRICULUM_DAYS.find(d => d.day === dayNum);
}

function getStageForDay(dayNum) {
  const stageNum = Math.ceil(dayNum / 6);
  return CURRICULUM_STAGES.find(s => s.stage === stageNum);
}

const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function todayIsRestDay() {
  const idx = new Date().getDay();
  return WEEKDAYS[idx] === state.restDay;
}

// Grants any lesson-credits the learner has earned since we last checked —
// one credit per eligible (non-rest) calendar day, using the LOCAL date. This
// recomputes fresh on every check, so it self-heals from any stale/incorrect
// data rather than trusting a single fixed "start date" forever.
function grantDueCredits() {
  const today = todayISO();
  if (state.lastCreditGrantDate === today) return;

  if (state.lessonCredits === null) {
    // First run (or migrating from an older version) — unlock exactly one
    // lesson right now rather than trying to reconstruct history.
    state.lessonCredits = 1;
    state.lastCreditGrantDate = today;
    saveState();
    return;
  }

  const from = new Date(state.lastCreditGrantDate + "T00:00:00");
  from.setDate(from.getDate() + 1);
  const end = new Date(today + "T00:00:00");
  let granted = 0;
  const d = new Date(from);
  while (d <= end) {
    if (WEEKDAYS[d.getDay()] !== state.restDay) granted++;
    d.setDate(d.getDate() + 1);
  }
  state.lessonCredits += granted;
  state.lastCreditGrantDate = today;
  saveState();
}

// True once the learner has used up today's allotted lesson(s) — i.e.
// starting another one now would be rushing ahead of the calendar pace.
function isPaceLockedToday() {
  if (state.completedDays.length === 0) return false; // never block the very first lesson
  if (todayIsRestDay()) return false; // rest-day screen already handles this
  grantDueCredits();
  return (state.lessonCredits || 0) <= 0;
}

// ---------------------------------------------------------------
// Puter AI models
// ---------------------------------------------------------------
const MODELS_RECOMMENDED = [
  { id: "gpt-4o-mini", name: "GPT-4o mini", desc: "Fast and well-suited for daily coaching conversations." },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", desc: "More nuanced feedback and correction, a bit slower." }
];
const MODELS_ALL = [
  ...MODELS_RECOMMENDED,
  { id: "gpt-4o", name: "GPT-4o", desc: "Stronger general reasoning." },
  { id: "gpt-4.1", name: "GPT-4.1", desc: "Longer context, careful with instructions." },
  { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku", desc: "Very fast, lighter-weight responses." },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", desc: "Fast, good for quick back-and-forth." }
];

// ---------------------------------------------------------------
// Resource Library — real, verified, free resources (not invented links)
// ---------------------------------------------------------------
const RESOURCE_LIBRARY = {
  Listening: [
    { title: "BBC Learning English", link: "https://www.bbc.co.uk/learningenglish", note: "Open '6 Minute English' and pick a recent episode close to today's topic." },
    { title: "VOA Learning English", link: "https://learningenglish.voanews.com/", note: "Slower, clearer speech — good if today feels tough." },
    { title: "Elllo — Listening by Level", link: "https://elllo.org/", note: "Choose your CEFR level, then a topic that's close to today's." }
  ],
  Reading: [
    { title: "News in Levels", link: "https://www.newsinlevels.com/", note: "Same story at 3 difficulty levels — start at your level." },
    { title: "Breaking News English", link: "https://breakingnewsenglish.com/", note: "Use the level slider under any article." },
    { title: "English e-Reader", link: "https://english-e-reader.net/", note: "Free graded short stories if you want longer reading." }
  ],
  Grammar: [
    { title: "British Council — LearnEnglish Grammar", link: "https://learnenglish.britishcouncil.org/grammar", note: "Search today's grammar point directly on the site." },
    { title: "BBC Learning English — Grammar", link: "https://www.bbc.co.uk/learningenglish", note: "Open the 'Grammar' section in the site menu." }
  ],
  Writing: [
    { title: "Write & Improve by Cambridge", link: "https://writeandimprove.com/", note: "Pick a task near your level — get instant AI feedback on grammar and style." }
  ],
  Vocabulary: [
    { title: "Anki", link: "https://apps.ankiweb.net/", note: "Add today's expressions as flashcards — it re-quizzes you right before you'd forget them." },
    { title: "Cambridge Dictionary", link: "https://dictionary.cambridge.org/", note: "Look up exact meaning and example sentences." },
    { title: "YouGlish", link: "https://youglish.com/", note: "Hear any word or phrase used in real YouTube videos." }
  ],
  Shadowing: [
    { title: "BBC Learning English — The English We Speak", link: "https://www.bbc.co.uk/learningenglish", note: "Short native-speaker clips — good shadowing length." },
    { title: "YouGlish", link: "https://youglish.com/", note: "Search a phrase, then shadow the pronunciation you hear." }
  ]
};

// Castbox — real, verified podcast channel (BBC's own 6 Minute English feed on
// Castbox), used specifically for Listening steps as a "podcast app" option.
const CASTBOX_RESOURCE = {
  title: "Castbox — 6 Minute English",
  link: "https://castbox.fm/channel/6-Minute-English-id574393",
  note: "Same BBC show, but as a podcast — good for listening on the go."
};

function youtubeSearchResource(dayData, type) {
  const q = `${dayData.topic} English ${type.toLowerCase()} ${dayData.cefr}`;
  return {
    title: "YouTube",
    link: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
    note: `Search results for "${dayData.topic}" — pick any short, clear video.`,
    query: q
  };
}

// Every step gets AT LEAST two concrete options: one curated site (rotates so
// consecutive days vary) plus a YouTube search built from today's actual topic.
// Listening also gets a verified Castbox podcast link as a third option.
// Every resource also carries a plain-text `query` — copyable, so it can be
// pasted into an app's own search bar (e.g. Castbox) even when we don't have
// a working deep-search link for that app.
function pickResources(type, dayData) {
  const list = RESOURCE_LIBRARY[type];
  const options = [];
  if (list && list.length) {
    const curated = list[dayData.day % list.length];
    options.push({ ...curated, query: `${dayData.topic}` });
  }
  options.push(youtubeSearchResource(dayData, type));
  if (type === "Listening") options.push({ ...CASTBOX_RESOURCE, query: `${dayData.topic} English` });
  return options;
}

function resourceStepBoxHTML(resources) {
  if (!resources || !resources.length) return "";
  return `
    <div class="step-box">
      <div class="label">Choose a resource</div>
      ${resources.map((r, i) => `
        <div class="resource-row">
          <div class="resource-row-text">
            <div class="rname">${r.title}</div>
            <div class="rnote small muted">${r.note}</div>
          </div>
          <div class="resource-row-btns">
            ${r.query ? `<button class="btn btn-outline resource-copy-btn" data-query="${escapeHTML(r.query)}">Copy</button>` : ""}
            <a href="${r.link}" target="_blank" rel="noopener" class="btn btn-secondary resource-open-btn">Open</a>
          </div>
        </div>`).join("")}
    </div>`;
}

function wireResourceCopyButtons(container) {
  container.querySelectorAll(".resource-copy-btn").forEach(btn => {
    btn.onclick = () => {
      navigator.clipboard?.writeText(btn.dataset.query);
      const original = btn.textContent;
      btn.textContent = "Copied ✓";
      setTimeout(() => { btn.textContent = original; }, 1300);
    };
  });
}

// Activity presentation metadata
const ACTIVITY_META = {
  Listening:  { icon: "🎧", verb: "Listen" },
  Reading:    { icon: "📖", verb: "Read" },
  Speaking:   { icon: "🗣", verb: "Speak" },
  Grammar:    { icon: "🧠", verb: "Practice" },
  Writing:    { icon: "✍️", verb: "Write" },
  Shadowing:  { icon: "🎙", verb: "Shadow" },
  Vocabulary: { icon: "📚", verb: "Learn" },
};

// Build the concrete Steps for a given day from its fixed curriculum metadata.
// The curriculum (topic/grammar/goal) never changes — this function only decides
// HOW to practice it today, per the "Activity Selection Rules" principle.
// Order is deliberate: review due words → learn today's words → THEN practice
// (listening/speaking/etc.) — so the learner always knows the vocabulary before
// being asked to use it, not the other way around.
function buildSteps(dayData) {
  if (dayData.isCheckpoint) return buildCheckpointSteps(dayData);
  const steps = [];
  const skills = [...dayData.primarySkills, ...dayData.secondarySkills];

  // 1) Quick warm-up recall — cheap, no tracking system behind it, just a nudge
  // to say a few sentences about yesterday before today's new material.
  if (dayData.day > 1) {
    const prevDay = getDayData(dayData.day - 1);
    steps.push({
      id: "recall",
      type: "Review",
      duration: "5 min",
      instructions: prevDay
        ? `Quick warm-up — say 2–3 sentences out loud about yesterday's topic: "${prevDay.topic}".`
        : `Quick warm-up — say 2–3 sentences out loud about what you practiced last time.`,
      promptToCopy: null,
      resource: null
    });
  }

  // 2) Today's vocabulary — the app doesn't generate or store a word list
  // itself (that's real content-engine territory). Instead it hands the
  // learner a ready-made prompt for ChatGPT/Victor, plus where to park the
  // words afterward (Anki/Leitner-style tools) — always BEFORE practice below.
  steps.push({
    id: "vocab-intro",
    type: "Vocabulary",
    duration: "10 min",
    instructions: `Review the key vocabulary for "${dayData.topic}" before practicing with it below.`,
    promptToCopy: `Give me 10 useful English words and phrases for the topic "${dayData.topic}" at ${dayData.cefr} level (related grammar: ${dayData.grammarFocus}). For each one, give a short meaning and one example sentence — formatted so I can add them straight into a Leitner box or flashcard app.`,
    resource: pickResources("Vocabulary", dayData)
  });

  skills.forEach((skill) => {
    if (skill === "Vocabulary") return; // handled above, always first
    if (skill === "Listening") {
      steps.push({
        id: "listening",
        type: "Listening",
        duration: "10–15 min",
        instructions: `Find a short audio or video about "${dayData.topic}" at ${dayData.cefr} level. Listen once for general meaning, then again for detail.`,
        promptToCopy: null,
        resource: pickResources("Listening", dayData)
      });
      return;
    }
    if (skill === "Reading") {
      steps.push({
        id: "reading",
        type: "Reading",
        duration: "10–15 min",
        instructions: `Read a short article or dialogue about "${dayData.topic}". Read once for general meaning, then again for detail.`,
        promptToCopy: null,
        resource: pickResources("Reading", dayData)
      });
      return;
    }
    if (skill === "Grammar") {
      steps.push({
        id: "grammar",
        type: "Grammar",
        duration: "10 min",
        instructions: `Today's grammar focus: ${dayData.grammarFocus}. Write 4–5 sentences about "${dayData.topic}" using this grammar.`,
        promptToCopy: null,
        resource: pickResources("Grammar", dayData)
      });
      return;
    }
    if (skill === "Speaking") {
      steps.push({
        id: "speaking",
        type: "Speaking",
        duration: dayData.isChallenge ? "20 min" : "15 min",
        instructions: `Goal: ${dayData.communicationGoal}`,
        promptToCopy: `Let's practice English together. The topic is "${dayData.topic}". Please play a natural role in this situation, ask me questions, and gently correct my mistakes. Focus on: ${dayData.grammarFocus}.`,
        resource: null
      });
      return;
    }
    if (skill === "Writing") {
      steps.push({
        id: "writing",
        type: "Writing",
        duration: "10–15 min",
        instructions: `Write a short paragraph (5–8 sentences) about "${dayData.topic}", using: ${dayData.grammarFocus}.`,
        promptToCopy: null,
        resource: pickResources("Writing", dayData)
      });
      return;
    }
    if (skill === "Shadowing") {
      steps.push({
        id: "shadowing",
        type: "Shadowing",
        duration: "10–15 min",
        instructions: `Shadow a short native-speaker video related to "${dayData.topic}". Focus on rhythm and linking, not just individual words.`,
        promptToCopy: null,
        resource: pickResources("Shadowing", dayData),
        externalNote: "Or open TubeShad to shadow the same video."
      });
      return;
    }
    // "Pronunciation" / "Problem Solving" fold into the adjacent Speaking step — no standalone step.
  });

  // Ensure at least one practice activity exists beyond recall/vocab-intro
  if (steps.every(s => s.id === "recall" || s.id === "vocab-intro")) {
    steps.push({
      id: "speaking",
      type: "Speaking",
      duration: "15 min",
      instructions: `Goal: ${dayData.communicationGoal}`,
      promptToCopy: `Let's talk in English about "${dayData.topic}". Ask me questions and correct my mistakes gently.`,
      resource: null
    });
  }
  return steps;
}

// Checkpoint days (30/60/90/120/150) don't teach anything new — they blend the
// last 5 stages together, right on the CEFR transition points.
function buildCheckpointSteps(dayData) {
  const themes = dayData.reviewStages.map(s => CURRICULUM_STAGES.find(cs => cs.stage === s).theme);
  const themeList = themes.join(", ");
  return [
    {
      id: "speaking-review",
      type: "Speaking",
      duration: "20 min",
      instructions: `Checkpoint conversation — blend at least two of the topics from this block into one natural chat: ${themeList}.`,
      promptToCopy: `Let's have a natural English conversation that touches on a few of these topics: ${themeList}. Mix them naturally, ask me questions, and gently correct my mistakes.`,
      resource: null
    },
    {
      id: "vocab-recap",
      type: "Vocabulary",
      duration: "10 min",
      instructions: `Open your Resources tab and skim what you saved for ${themeList}. Pick 5 expressions you'd half-forgotten and use each in a new sentence.`,
      promptToCopy: null,
      resource: [
        { title: "Anki", link: "https://apps.ankiweb.net/", note: "If you added past expressions as flashcards, this is exactly what they're for — review the due ones now." },
        youtubeSearchResource(dayData, "Vocabulary review")
      ]
    },
    {
      id: "writing-recap",
      type: "Writing",
      duration: "10 min",
      instructions: `Write a short paragraph (5–6 sentences) connecting two topics from this block, using at least one grammar point you remember from each.`,
      promptToCopy: null,
      resource: pickResources("Writing", dayData)
    }
  ];
}

// ---------------------------------------------------------------
// Progress / streak logic
// ---------------------------------------------------------------
// Local calendar date (NOT UTC — toISOString() would shift the date during
// the gap between local midnight and UTC midnight, e.g. 00:00-03:30 in Iran).
function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isoDateFor(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function completeDay(dayNum) {
  if (!state.completedDays.includes(dayNum)) {
    state.completedDays.push(dayNum);
  }
  const today = todayISO();
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = isoDateFor(y);

  if (state.lastCompletionDate === today) {
    // already completed a day today (edge case) — streak unchanged
  } else if (state.lastCompletionDate === yesterday) {
    state.streak += 1;
  } else {
    // check if the gap was only rest day(s)
    state.streak = state.streak > 0 ? state.streak + 1 : 1;
  }
  state.lastCompletionDate = today;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  state.lessonCredits = Math.max(0, (state.lessonCredits || 0) - 1);

  state.currentDay = Math.min(dayNum + 1, 180);
  state.stepIndex = 0;
  state.completedStepsToday = [];
  saveState();
}

function percentComplete() {
  return Math.round((state.completedDays.length / 180) * 1000) / 10;
}

// ---------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------
const VIEW_TITLES = { today: "Home", journey: "Journey", progress: "Progress", more: "More", resources: "Resources", book: "My Book", "book-settings": "Book Settings", settings: "Settings" };
const MORE_SUBVIEWS = ["resources", "book", "book-settings"];

function switchView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById("view-" + name).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => {
    const isMatch = b.dataset.view === name || (b.dataset.view === "more" && MORE_SUBVIEWS.includes(name));
    b.classList.toggle("active", isMatch);
  });
  document.getElementById("header-view-title").textContent = VIEW_TITLES[name] || "";
  if (name === "today") renderToday();
  if (name === "journey") renderJourney();
  if (name === "progress") renderProgress();
  if (name === "more") renderMore();
  if (name === "resources") renderResources();
  if (name === "book") renderBookView();
  if (name === "book-settings") renderBookSettings();
  if (name === "settings") renderSettings();
  window.scrollTo(0, 0);
}

function backRowHTML(toView, label) {
  return `<button class="back-row" data-back="${toView}">← ${label}</button>`;
}
function wireBackRow(el) {
  const btn = el.querySelector("[data-back]");
  if (btn) btn.onclick = () => switchView(btn.dataset.back);
}

function renderMore() {
  const el = document.getElementById("view-more");
  el.innerHTML = `
    <div class="card" style="padding:6px 12px;">
      <div class="row more-row" data-go="resources">
        <div class="row-title">Resources</div>
        <div class="chevron">›</div>
      </div>
      <div class="row more-row" data-go="book">
        <div class="row-title">My Book</div>
        <div class="chevron">›</div>
      </div>
    </div>
  `;
  el.querySelectorAll(".more-row").forEach(row => {
    row.onclick = () => switchView(row.dataset.go);
  });
}

// Measure a point (and tangent angle) along an SVG path definition, at a given
// fraction (0-1) of its length. Used to place the plane/pin on the road hero.
function getPathPoint(d, fraction) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", d);
  svg.style.position = "absolute";
  svg.style.opacity = "0";
  svg.style.pointerEvents = "none";
  svg.appendChild(path);
  document.body.appendChild(svg);
  const len = path.getTotalLength();
  const f = Math.max(0, Math.min(1, fraction));
  const p = path.getPointAtLength(len * f);
  const p2 = path.getPointAtLength(len * Math.min(1, f + 0.01));
  const angle = Math.atan2(p2.y - p.y, p2.x - p.x) * (180 / Math.PI);
  document.body.removeChild(svg);
  return { x: p.x, y: p.y, angle };
}

const ROAD_D = "M20,26 C 90,4 70,54 150,46 C 230,38 190,88 270,78 C 320,72 330,54 372,40";

// The road hero: a literal road winding toward a destination pin, with a plane
// marking the learner's current position, and small flags marking the 5
// Checkpoint days (30/60/90/120/150) — the journey/travel metaphor from the logo.
function buildRoadHeroSVG(pct, currentDay) {
  const frac = Math.max(0.03, Math.min(0.97, pct / 100));
  const planePt = getPathPoint(ROAD_D, frac);
  const pinPt = getPathPoint(ROAD_D, 1);
  const checkpointDays = CURRICULUM_DAYS.filter(d => d.isCheckpoint).map(d => d.day);

  const flags = checkpointDays.map(day => {
    const f = day / 180;
    const pt = getPathPoint(ROAD_D, f);
    const passed = currentDay > day || state.completedDays.includes(day);
    const color = passed ? "#F2C879" : "rgba(255,255,255,0.55)";
    return `
      <g transform="translate(${pt.x},${pt.y - 10})">
        <line x1="0" y1="0" x2="0" y2="12" stroke="${color}" stroke-width="1.6"/>
        <path d="M0,0 L7,2.5 L0,5 Z" fill="${color}"/>
      </g>`;
  }).join("");

  return `
    <svg viewBox="0 0 392 100" preserveAspectRatio="none">
      <path d="${ROAD_D}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="7" stroke-linecap="round"/>
      <path d="${ROAD_D}" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="7" stroke-linecap="round"
        pathLength="100" stroke-dasharray="${pct} 100"/>
      <path d="${ROAD_D}" fill="none" stroke="rgba(20,60,60,0.5)" stroke-width="1.4" stroke-linecap="round"
        stroke-dasharray="1.5 6"/>
      ${flags}
      <g class="pin-drop" transform="translate(${pinPt.x},${pinPt.y - 13})">
        <path d="M0,-12 C6,-12 10,-8 10,-2 C10,5 0,15 0,15 C0,15 -10,5 -10,-2 C-10,-8 -6,-12 0,-12 Z" fill="#B35F1B"/>
        <circle cx="0" cy="-2" r="3.4" fill="white"/>
      </g>
      <g class="plane-icon" transform="translate(${planePt.x},${planePt.y}) rotate(${planePt.angle})">
        <path d="M-9,0 L7,-3.5 L11,0 L7,3.5 Z M2,-1.5 L2,-7 L5,-3 Z M2,1.5 L2,7 L5,3 Z" fill="#FFFFFF"/>
      </g>
    </svg>`;
}

// ---------------------------------------------------------------
// TODAY view
// ---------------------------------------------------------------
function renderToday() {
  const el = document.getElementById("view-today");
  const dayNum = state.currentDay;
  const dayData = getDayData(dayNum);

  if (!dayData) {
    el.innerHTML = `
      <div class="card center">
        <div style="font-size:36px;">🏆</div>
        <h2 class="section-title" style="text-align:center;">Journey Complete!</h2>
        <p class="muted small">You've finished all 180 days. Amazing work.</p>
      </div>`;
    return;
  }

  if (todayIsRestDay() && !state.completedStepsToday.length) {
    el.innerHTML = `
      ${heroHTML(dayData)}
      ${victorRowHTML("Take today to rest and recharge. Your streak is safe — see you tomorrow.")}
      <div class="mission-section center" style="padding-top:18px;">
        <span class="tag rest">🌿 Rest Day</span>
        <p class="mt8" style="font-size:15px; font-weight:700;">No session today — enjoy the break.</p>
        <p class="muted small">Optional: watch a short English video for fun. It won't count toward progress.</p>
      </div>`;
    return;
  }

  const pendingStage = pendingQuizStage();
  if (pendingStage) {
    renderStageQuizGate(pendingStage);
    return;
  }

  const steps = buildSteps(dayData);
  const doneCount = state.completedStepsToday.length;
  const allDone = doneCount >= steps.length;

  if (!allDone && doneCount === 0 && isPaceLockedToday()) {
    renderPaceLockedView();
    return;
  }

  let victorMsg = dayData.isCheckpoint
    ? `Checkpoint day — no new material. Let's connect what you've learned across the last few stages into one real conversation.`
    : dayData.isChallenge
    ? `Today is a challenge day — pull together what you've practiced this stage. Don't aim for perfect, aim for clear.`
    : `Today you'll focus on "${dayData.topic}". Don't worry about mistakes — the goal is to communicate clearly.`;
  if (doneCount > 0 && !allDone) victorMsg = `Good progress so far — pick up right where you left off.`;
  if (allDone) victorMsg = `Day ${dayData.day} in the books. Proud of the consistency — see you tomorrow.`;

  el.innerHTML = `
    ${heroHTML(dayData)}
    ${victorRowHTML(victorMsg)}
    <div class="mission-section">
      <div class="mission-eyebrow">Today's Mission</div>
      <div class="session-topic">${dayData.topic}</div>
      <div class="session-meta">${steps.length} steps · ${dayData.communicationGoal}</div>
      ${allDone ? `
        <div class="center" style="padding:6px 0 16px;">
          <div style="font-size:30px;">🎉</div>
          <div style="font-weight:800; margin-top:4px;">Day ${dayData.day} Completed</div>
        </div>
        <button class="btn btn-primary" id="btn-continue-next">Continue to Day ${Math.min(dayData.day+1,180)}</button>
      ` : `
        <button class="btn btn-primary" id="btn-start-session">${doneCount === 0 ? "Start Session" : "Continue Session"}</button>
      `}
      ${upNextHTML(dayData)}
    </div>
  `;

  const startBtn = document.getElementById("btn-start-session");
  if (startBtn) startBtn.onclick = () => openSessionRunner(dayData, steps);
  const nextBtn = document.getElementById("btn-continue-next");
  if (nextBtn) nextBtn.onclick = () => { renderToday(); };
}

// Shown once today's single lesson is done and the learner isn't behind
// schedule — keeps the app to one lesson per calendar day by default, while
// offering unlimited extra speaking practice on today's topic with Victor.
function renderPaceLockedView() {
  const el = document.getElementById("view-today");
  const lastDay = getDayData(Math.max(1, state.currentDay - 1)) || getDayData(1);
  el.innerHTML = `
    ${heroHTML(lastDay)}
    ${victorRowHTML(`Nice work today. Tomorrow's lesson unlocks after midnight — no rush. Want to keep practicing "${lastDay.topic}" with me in the meantime?`)}
    <div class="mission-section center" style="padding-top:10px;">
      <span class="tag done">✓ Today's lesson complete</span>
      <p class="mt8" style="font-size:15px; font-weight:700;">Day ${lastDay.day + 1} unlocks tomorrow</p>
      <p class="muted small">Missed a day recently? Opening the app again after midnight will let you catch up automatically.</p>
      <button class="btn btn-primary mt16" id="btn-extra-practice">Practice More with Victor</button>
    </div>
  `;
  const extraBtn = document.getElementById("btn-extra-practice");
  if (extraBtn) extraBtn.onclick = () => openExtraPractice(lastDay);
}

function openExtraPractice(dayData) {
  openVictorChat();
  const input = document.getElementById("chat-input");
  if (input) {
    input.value = `Can we do some extra speaking practice about "${dayData.topic}"? Ask me questions and correct my mistakes gently.`;
    input.focus();
  }
}

// ---------------------------------------------------------------
// Stage Quiz gate — shown between finishing Stage N and starting Stage N+1
// ---------------------------------------------------------------
function renderStageQuizGate(stageNum) {
  const el = document.getElementById("view-today");
  const stage = CURRICULUM_STAGES.find(s => s.stage === stageNum);
  const connected = !!state.settings.puterConnected;
  const quiz = state.stageQuizzes[stageNum];

  el.innerHTML = `
    ${victorRowHTML(`Before Stage ${stageNum + 1}, let's check what stuck from "${stage.theme}" — six quick questions, no pressure.`)}
    <div class="mission-section center" style="padding-top:10px;">
      <span class="tag accent">🧠 Stage ${stageNum} Quiz</span>
      <p class="mt8" style="font-size:15px; font-weight:700;">${stage.theme}</p>
      ${!connected ? `
        <p class="muted small">Connect Puter in Settings for a quick quiz — or skip for now.</p>
        <button class="btn btn-outline mt16" id="btn-skip-quiz">Skip for now</button>
      ` : quiz?.error ? `
        <p class="small" style="color:#DC2626;">Couldn't build the quiz. Try again, or skip.</p>
        <button class="btn btn-primary mt16" id="btn-start-quiz">Try Again</button>
        <button class="btn btn-outline mt8" id="btn-skip-quiz">Skip for now</button>
      ` : `
        <p class="muted small">Six multiple-choice questions on this stage's grammar and vocabulary.</p>
        <button class="btn btn-primary mt16" id="btn-start-quiz">${quiz?.questions ? "Continue Quiz" : "Start Quiz"}</button>
        <button class="btn btn-outline mt8" id="btn-skip-quiz">Skip for now</button>
      `}
    </div>
  `;

  const startBtn = document.getElementById("btn-start-quiz");
  if (startBtn) startBtn.onclick = () => runStageQuiz(stageNum);
  const skipBtn = document.getElementById("btn-skip-quiz");
  if (skipBtn) skipBtn.onclick = () => {
    state.stageQuizzes[stageNum] = state.stageQuizzes[stageNum] || {};
    state.stageQuizzes[stageNum].completed = true;
    state.stageQuizzes[stageNum].skipped = true;
    saveState();
    renderToday();
  };
}

async function runStageQuiz(stageNum) {
  const el = document.getElementById("view-today");
  let quiz = state.stageQuizzes[stageNum];

  if (!quiz || !quiz.questions) {
    el.innerHTML = `
      <div class="card center">
        <div class="chat-bubble victor typing" style="margin:20px auto;"><span></span><span></span><span></span></div>
        <p class="muted small">Victor is putting the quiz together…</p>
      </div>`;
    try {
      quiz = await generateStageQuiz(stageNum);
    } catch (e) {
      state.stageQuizzes[stageNum] = { ...(state.stageQuizzes[stageNum] || {}), error: true };
      saveState();
      renderStageQuizGate(stageNum);
      return;
    }
  }

  let idx = 0;
  let correctCount = 0;
  const answers = [];

  function renderQuestion() {
    const q = quiz.questions[idx];
    const dots = quiz.questions.map((_, i) => {
      const cls = i < idx ? "done" : (i === idx ? "current" : "");
      return `<div class="step-dot ${cls}"></div>`;
    }).join("");

    el.innerHTML = `
      <div class="card">
        <div class="step-progress">${dots}</div>
        <div class="step-duration">Question ${idx + 1} of ${quiz.questions.length}</div>
        <div class="step-title" style="margin-top:6px;">${q.question}</div>
        <div class="quiz-options mt16" id="quiz-options">
          ${q.options.map((opt, i) => `<button class="quiz-option-btn" data-i="${i}">${opt}</button>`).join("")}
        </div>
        <div id="quiz-feedback"></div>
      </div>`;

    el.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.onclick = () => {
        const chosen = Number(btn.dataset.i);
        const correct = chosen === q.correctIndex;
        if (correct) correctCount++;
        answers.push(chosen);

        el.querySelectorAll(".quiz-option-btn").forEach((b, i) => {
          b.disabled = true;
          if (i === q.correctIndex) b.classList.add("correct");
          else if (i === chosen) b.classList.add("incorrect");
        });

        document.getElementById("quiz-feedback").innerHTML = `
          <div class="step-box mt16">
            <div class="label">${correct ? "Correct" : "Not quite"}</div>
            ${q.explanation || ""}
          </div>
          <button class="btn btn-primary mt8" id="btn-quiz-next">${idx < quiz.questions.length - 1 ? "Next" : "See Results"}</button>
        `;
        document.getElementById("btn-quiz-next").onclick = () => {
          if (idx < quiz.questions.length - 1) { idx++; renderQuestion(); }
          else finishQuiz();
        };
      };
    });
  }

  function finishQuiz() {
    quiz.completed = true;
    quiz.score = correctCount;
    quiz.total = quiz.questions.length;
    saveState();
    el.innerHTML = `
      <div class="card center">
        <div style="font-size:34px;">🎯</div>
        <div style="font-weight:800; font-size:18px; margin-top:6px;">${correctCount} / ${quiz.questions.length}</div>
        <p class="muted small">Nice work — on to the next stage.</p>
        <button class="btn btn-primary mt16" id="btn-quiz-done">Continue</button>
      </div>`;
    document.getElementById("btn-quiz-done").onclick = () => renderToday();
  }

  renderQuestion();
}

function heroHTML(dayData) {
  const pct = percentComplete();
  return `
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-eyebrow">Your journey to B2</div>
          <div class="hero-daylabel">Day ${dayData.day} <span style="opacity:0.6;">/ 180</span></div>
        </div>
        <div class="hero-streak">🔥 ${state.streak}</div>
      </div>
      <div class="hero-road-wrap">${buildRoadHeroSVG(pct, dayData.day)}</div>
      <div class="hero-bottom">
        <div class="hero-stage-label">Stage ${dayData.stage} · ${dayData.cefr} · ${dayData.stageTheme}</div>
        <div class="hero-pct">${pct}%</div>
      </div>
    </div>`;
}

function victorAvatarSVG() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="8" r="4.2"></circle>
    <path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7"></path>
  </svg>`;
}

function victorRowHTML(message) {
  return `
    <div class="victor-row">
      <div class="victor-avatar">${victorAvatarSVG()}<span class="pulse-dot"></span></div>
      <div class="victor-bubble">
        <div class="victor-name-row"><span class="victor-name">Victor</span></div>
        <div class="victor-text">${message}</div>
      </div>
    </div>`;
}

function upNextHTML(dayData) {
  const items = [];
  for (let d = dayData.day + 1; d <= Math.min(dayData.day + 4, 180) && items.length < 3; d++) {
    items.push(getDayData(d));
  }
  if (!items.length) return "";
  return `
    <div class="mission-eyebrow">Up Next</div>
    <div class="upnext-strip">
      ${items.map(d => `
        <div class="upnext-card">
          <div class="d">Day ${d.day}</div>
          <div class="t">${d.topic}</div>
        </div>`).join("")}
    </div>`;
}

// ---------------------------------------------------------------
// Session runner
// ---------------------------------------------------------------
function openSessionRunner(dayData, steps) {
  let idx = state.completedStepsToday.length; // resume where left off
  if (idx >= steps.length) idx = steps.length - 1;

  const el = document.getElementById("view-today");

  function stepDotsHTML(step) {
    return steps.map((s, i) => {
      const cls = i < state.completedStepsToday.length ? "done" : (i === idx ? "current" : "");
      return `<div class="step-dot ${cls}"></div>`;
    }).join("");
  }

  function completeCurrentStep() {
    const step = steps[idx];
    if (!state.completedStepsToday.includes(step.id)) {
      state.completedStepsToday.push(step.id);
      saveState();
    }
    const isLastStep = idx >= steps.length - 1;
    showSuccessAnimation(() => {
      if (!isLastStep) {
        idx += 1;
        render();
      } else {
        completeDay(dayData.day);
        renderToday();
      }
    }, isLastStep);
  }

  function render() {
    const step = steps[idx];
    const meta = ACTIVITY_META[step.type] || { icon: "•" };
    el.innerHTML = `
      <div class="card">
        <div class="step-progress">${stepDotsHTML(step)}</div>
        <div class="step-icon-badge">${meta.icon}</div>
        <div class="step-title">${step.type}</div>
        <div class="step-duration">${step.duration} · Day ${dayData.day}</div>
        <div class="step-instructions">${step.instructions}</div>
        ${resourceStepBoxHTML(step.resource)}
        ${step.externalNote ? `<div class="small" style="color:var(--primary); font-weight:600; margin:-6px 0 12px;">${step.externalNote}</div>` : ""}
        ${step.promptToCopy ? `
          <div class="step-box">
            <div class="label">Prompt for ChatGPT / Victor</div>
            ${step.promptToCopy}
            <div class="copy-row">
              <button class="btn btn-secondary" id="btn-copy-prompt">Copy Prompt</button>
            </div>
          </div>` : ""}
        <button class="btn btn-primary mt16" id="btn-complete-step">Complete</button>
        <button class="btn btn-outline mt8" id="btn-exit-session">Back to Today</button>
      </div>`;

    const copyBtn = document.getElementById("btn-copy-prompt");
    if (copyBtn) copyBtn.onclick = () => {
      navigator.clipboard?.writeText(step.promptToCopy);
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => { copyBtn.textContent = "Copy Prompt"; }, 1500);
    };
    wireResourceCopyButtons(el);
    document.getElementById("btn-exit-session").onclick = () => renderToday();
    document.getElementById("btn-complete-step").onclick = completeCurrentStep;
  }
  render();
}

const STEP_DONE_MESSAGES = ["Nice work!", "Well done!", "Great job!", "Keep going!", "That's it!"];

function showSuccessAnimation(cb, big) {
  const overlay = document.getElementById("success-overlay");
  const msgEl = document.getElementById("success-msg");
  const subEl = document.getElementById("success-submsg");
  overlay.classList.toggle("big", !!big);

  if (big) {
    msgEl.textContent = "Day complete! 🎉";
    subEl.textContent = "One more step on your journey to B2.";
    spawnConfetti();
  } else {
    msgEl.textContent = STEP_DONE_MESSAGES[Math.floor(Math.random() * STEP_DONE_MESSAGES.length)];
    subEl.textContent = "";
  }

  overlay.classList.add("show");
  const duration = big ? 1400 : 750;
  setTimeout(() => {
    overlay.classList.remove("show");
    cb();
  }, duration);
}

function spawnConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["#0EA79E", "#14C4B6", "#B35F1B", "#F2C879", "#063B3C"];
  const pieces = [];
  const count = 26;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    const left = 50 + (Math.random() * 60 - 30);
    const drift = (Math.random() * 160 - 80) + "px";
    const spin = (Math.random() * 720 - 360) + "deg";
    const duration = 1.1 + Math.random() * 0.7;
    const delay = Math.random() * 0.15;
    el.style.left = left + "%";
    el.style.background = colors[i % colors.length];
    el.style.setProperty("--drift", drift);
    el.style.setProperty("--spin", spin);
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = delay + "s";
    el.style.borderRadius = Math.random() > 0.5 ? "2px" : "50%";
    container.appendChild(el);
    pieces.push(el);
  }
  setTimeout(() => pieces.forEach(p => p.remove()), 2200);
}

// ---------------------------------------------------------------
// JOURNEY view
// ---------------------------------------------------------------
let expandedStage = null;

function renderJourney() {
  const el = document.getElementById("view-journey");
  const total = CURRICULUM_STAGES.length;

  const blocks = CURRICULUM_STAGES.map((stage, i) => {
    const stageDays = CURRICULUM_DAYS.filter(d => d.stage === stage.stage);
    const doneCount = stageDays.filter(d => state.completedDays.includes(d.day)).length;
    const isDone = doneCount === 6;
    const isActive = !isDone && stageDays.some(d => d.day === state.currentDay);
    const isLocked = !isDone && !isActive && stageDays[0].day > state.currentDay;
    const cls = isDone ? "done" : (isActive ? "active" : "locked");
    const icon = isDone ? "✓" : (isLocked ? "🔒" : stage.stage);
    const isExpanded = expandedStage === stage.stage;

    const dayChips = stageDays.map(d => {
      const dDone = state.completedDays.includes(d.day);
      const dActive = !dDone && d.day === state.currentDay;
      const dCls = dDone ? "done" : (dActive ? "active" : "");
      const marker = d.isCheckpoint ? " 🚩" : (d.isChallenge ? " ★" : "");
      const label = d.isCheckpoint ? (d.originalTopic + " · Checkpoint") : d.topic;
      return `
        <div class="day-chip ${dCls}">
          <div class="num">DAY ${d.day}${marker}</div>
          <div class="topic">${label}</div>
        </div>`;
    }).join("");

    return `
      <div class="stage-block">
        <div class="stage-item ${isExpanded ? "expanded" : ""}" data-stage="${stage.stage}">
          <div class="stage-node ${cls}">${icon}</div>
          <div class="stage-info">
            <div class="name">Stage ${stage.stage} · ${stage.theme}</div>
            <div class="sub">${stage.cefr} · ${doneCount}/6 sessions</div>
          </div>
          <div class="stage-chevron">▾</div>
        </div>
        <div class="stage-days ${isExpanded ? "show" : ""}">${dayChips}</div>
        ${i < total - 1 ? `<div class="stage-connector ${isDone ? "done" : ""}"></div>` : ""}
      </div>`;
  }).join("");

  el.innerHTML = `
    <h2 class="section-title">Your Journey</h2>
    <div class="journey-path">${blocks}</div>
  `;

  el.querySelectorAll(".stage-item").forEach(item => {
    item.onclick = () => {
      const s = Number(item.dataset.stage);
      expandedStage = expandedStage === s ? null : s;
      renderJourney();
    };
  });
}

// ---------------------------------------------------------------
// PROGRESS view
// ---------------------------------------------------------------
function renderProgress() {
  const el = document.getElementById("view-progress");
  const pct = percentComplete();
  const stage = getStageForDay(state.currentDay);

  el.innerHTML = `
    <h2 class="section-title">Progress</h2>
    <div class="card">
      <div class="small muted">Day ${state.currentDay} / 180</div>
      <div class="progress-track mt8"><div class="progress-fill" style="width:${pct}%;"></div></div>
      <div class="small muted mt8">${pct}% complete</div>
    </div>
    <div class="stats-row">
      <div class="stat-box"><div class="stat-value">${stage ? "S" + stage.stage : "—"}</div><div class="stat-label">Stage</div></div>
      <div class="stat-box"><div class="stat-value">🔥 ${state.streak}</div><div class="stat-label">Streak</div></div>
      <div class="stat-box"><div class="stat-value">🏆 ${state.bestStreak}</div><div class="stat-label">Best</div></div>
      <div class="stat-box"><div class="stat-value">${state.completedDays.length}</div><div class="stat-label">Days Done</div></div>
    </div>
    <h2 class="section-title">Stage Roadmap</h2>
    <div class="card" style="padding:6px 12px; max-height:340px; overflow-y:auto;">
      ${CURRICULUM_STAGES.map(s => {
        const stageDays = CURRICULUM_DAYS.filter(d => d.stage === s.stage);
        const doneCount = stageDays.filter(d => state.completedDays.includes(d.day)).length;
        const symbol = doneCount === 6 ? "✓" : (stageDays.some(d => d.day === state.currentDay) ? "→" : "🔒");
        return `<div class="row"><div class="row-title">Stage ${s.stage}</div><div class="row-sub">${symbol} ${s.theme}</div></div>`;
      }).join("")}
    </div>
  `;
}

// ---------------------------------------------------------------
// My Book — turns completed stages into printable chapters
// ---------------------------------------------------------------
let bookGenState = {}; // { [stageNum]: "generating" | "error" }
let introGenState = null; // "generating" | "error" | null

function renderBookView() {
  const el = document.getElementById("view-book");
  el.innerHTML = backRowHTML("more", "More") + renderMyBookSection();
  wireBackRow(el);
  wireMyBookSection(el);
}

function renderMyBookSection() {
  const completedStages = CURRICULUM_STAGES.filter(s => {
    const stageDays = CURRICULUM_DAYS.filter(d => d.stage === s.stage);
    return stageDays.every(d => state.completedDays.includes(d.day));
  });
  const readyCount = completedStages.filter(s => state.stageBooklets[s.stage]).length;
  const connected = !!state.settings.puterConnected;

  return `
    <h2 class="section-title">My Book</h2>
    <div class="card center">
      <div style="font-weight:700; margin-bottom:4px;">${readyCount} / ${CURRICULUM_STAGES.length} chapters ready</div>
      <button class="btn btn-primary" id="btn-download-book">Download Full Book (PDF)</button>
    </div>

    ${!connected ? `<div class="card"><p class="small" style="color:#B35F1B; margin:0;">Connect Puter in Settings to generate vocabulary and reading passages. Grammar-only chapters still work without it.</p></div>` : ""}

    ${completedStages.length ? `
    <h2 class="section-title">Chapters</h2>
    <div class="card" style="padding:6px 12px; max-height:300px; overflow-y:auto;">
      ${completedStages.map(s => {
        const booklet = state.stageBooklets[s.stage];
        const genState = bookGenState[s.stage];
        let action;
        if (booklet) {
          action = `<button class="btn btn-secondary book-download-btn" data-stage="${s.stage}" style="width:auto; padding:8px 12px; font-size:12.5px;">Download</button>`;
        } else if (genState === "generating") {
          action = `<span class="small muted">Writing…</span>`;
        } else {
          action = `<button class="btn btn-outline book-generate-btn" data-stage="${s.stage}" style="width:auto; padding:8px 12px; font-size:12.5px;" ${!connected ? "disabled" : ""}>Generate</button>`;
        }
        return `
          <div class="row">
            <div>
              <div class="row-title">Chapter ${s.stage} · ${s.theme}</div>
              <div class="row-sub">${booklet ? "Ready" : (genState === "error" ? "Failed — tap Generate to retry" : "Not generated yet")}</div>
            </div>
            ${action}
          </div>`;
      }).join("")}
    </div>` : `<div class="card center small muted">Finish your first stage to unlock its chapter.</div>`}
  `;
}

function wireMyBookSection(el) {
  el.querySelectorAll(".book-generate-btn").forEach(btn => {
    btn.onclick = async () => {
      const stageNum = Number(btn.dataset.stage);
      bookGenState[stageNum] = "generating";
      renderBookView();
      try {
        await generateStageBooklet(stageNum);
        delete bookGenState[stageNum];
      } catch (e) {
        bookGenState[stageNum] = "error";
      }
      renderBookView();
    };
  });

  el.querySelectorAll(".book-download-btn").forEach(btn => {
    btn.onclick = () => downloadStageChapterPdf(Number(btn.dataset.stage));
  });

  const downloadBookBtn = document.getElementById("btn-download-book");
  if (downloadBookBtn) downloadBookBtn.onclick = async () => {
    downloadBookBtn.textContent = "Preparing…";
    try {
      await downloadFullBookPdf();
    } finally {
      downloadBookBtn.textContent = "Download Full Book (PDF)";
    }
  };
}

function openIntroReviewModal() {
  const backdrop = document.getElementById("modal-backdrop");
  const intro = state.bookIntro;
  backdrop.innerHTML = `
    <div class="modal-sheet">
      <h3>Introduction</h3>
      <p>Edit if you like, then approve to lock it into your book.</p>
      <textarea id="intro-textarea" rows="8" style="width:100%; border:1px solid var(--border); border-radius:var(--radius-sm); padding:10px; font-size:13.5px; font-family:inherit;">${intro?.text || ""}</textarea>
      <div class="modal-actions">
        <button class="btn btn-outline" id="intro-cancel">Close</button>
        <button class="btn btn-primary" id="intro-approve">Approve</button>
      </div>
    </div>`;
  backdrop.classList.add("show");
  document.getElementById("intro-cancel").onclick = () => backdrop.classList.remove("show");
  document.getElementById("intro-approve").onclick = () => {
    state.bookIntro = { text: document.getElementById("intro-textarea").value.trim(), approved: true };
    saveState();
    backdrop.classList.remove("show");
    renderBookSettings();
  };
}

// ---------------------------------------------------------------
// Book Settings — cover, introduction, font, and generation prompt
// ---------------------------------------------------------------
function renderBookSettings() {
  const el = document.getElementById("view-book-settings");
  const connected = !!state.settings.puterConnected;
  const bs = state.bookSettings;

  const introStatus = !state.bookIntro
    ? `<button class="btn btn-secondary" id="btn-gen-intro" ${!connected ? "disabled" : ""}>${introGenState === "generating" ? "Writing…" : "Generate Introduction"}</button>`
    : !state.bookIntro.approved
      ? `<button class="btn btn-secondary" id="btn-review-intro">Review Introduction</button>`
      : `<div class="row"><div class="row-title">✓ Introduction ready</div><button class="icon-btn" id="btn-review-intro">Edit</button></div>`;

  el.innerHTML = `
    ${backRowHTML("settings", "Settings")}
    <h2 class="section-title">Cover</h2>
    <div class="card">
      <p class="small muted" style="margin:0 0 10px;">Your cover is a custom-designed image (not generated by the app). To change the name, subtitle, or artwork on it, replace <code>assets/book-cover.png</code> with a new A4-ratio image.</p>
      <div class="row-title small" style="margin-bottom:6px;">Your Name</div>
      <input type="text" id="book-author-input" placeholder="Used in the introduction text" value="${state.userName || ""}">
    </div>

    <h2 class="section-title">Introduction</h2>
    <div class="card">
      <p class="small muted" style="margin-top:0;">Victor writes this once, for you — you can edit or regenerate it any time before approving.</p>
      ${!connected ? `<p class="small" style="color:#B35F1B;">Connect Puter in Settings to generate one.</p>` : ""}
      <div class="mt8">${introStatus}</div>
    </div>

    <h2 class="section-title">Typography</h2>
    <div class="card">
      <div class="row-title small" style="margin-bottom:6px;">Font</div>
      <select id="book-font-select">
        <option value="helvetica" ${bs.font === "helvetica" ? "selected" : ""}>Sans-serif (Helvetica)</option>
        <option value="times" ${bs.font === "times" ? "selected" : ""}>Serif (Times)</option>
      </select>
      <div class="row-title small mt16" style="margin-bottom:6px;">Text Size</div>
      <select id="book-size-select">
        <option value="1" ${bs.fontSizeScale === 1 ? "selected" : ""}>Normal</option>
        <option value="1.15" ${bs.fontSizeScale === 1.15 ? "selected" : ""}>Large</option>
      </select>
    </div>

    <h2 class="section-title">Chapter Generation</h2>
    <div class="card">
      <p class="small muted" style="margin-top:0;">Optional — anything you add here is included every time Victor writes a new chapter (grammar notes, vocabulary, reading, speaking prompts and exercises).</p>
      <textarea id="book-extra-instructions" rows="4" placeholder="e.g. Keep example sentences workplace-related." style="width:100%; border:1px solid var(--border); border-radius:var(--radius-sm); padding:10px; font-size:13.5px; font-family:inherit;">${bs.extraInstructions || ""}</textarea>
    </div>
  `;

  wireBackRow(el);
  document.getElementById("book-author-input").onchange = (e) => { state.userName = e.target.value; saveState(); };
  document.getElementById("book-font-select").onchange = (e) => { state.bookSettings.font = e.target.value; saveState(); };
  document.getElementById("book-size-select").onchange = (e) => { state.bookSettings.fontSizeScale = Number(e.target.value); saveState(); };
  document.getElementById("book-extra-instructions").onchange = (e) => { state.bookSettings.extraInstructions = e.target.value; saveState(); };

  const genIntroBtn = document.getElementById("btn-gen-intro");
  if (genIntroBtn) genIntroBtn.onclick = async () => {
    introGenState = "generating";
    renderBookSettings();
    try {
      await generateBookIntro();
    } catch (e) {
      introGenState = "error";
    }
    introGenState = null;
    renderBookSettings();
    if (state.bookIntro) openIntroReviewModal();
  };
  const reviewIntroBtn = document.getElementById("btn-review-intro");
  if (reviewIntroBtn) reviewIntroBtn.onclick = openIntroReviewModal;
}

// ---------------------------------------------------------------
// RESOURCES view
// ---------------------------------------------------------------
const RESOURCE_TYPES = ["Listening","Reading","Speaking","Grammar","Writing","Shadowing","Vocabulary"];

function renderResources() {
  const el = document.getElementById("view-resources");
  const grouped = RESOURCE_TYPES.map(type => {
    const items = state.resources.filter(r => r.type === type);
    if (!items.length) return "";
    return `
      <h2 class="section-title">${ACTIVITY_META[type]?.icon || ""} ${type}</h2>
      <div class="card" style="padding:6px 12px;">
        ${items.map(r => `
          <div class="row">
            <div>
              <div class="row-title">${r.title}</div>
              <div class="row-sub">${r.link}</div>
            </div>
            <div>
              <button class="icon-btn" data-edit="${r.id}">✎</button>
              <button class="icon-btn" data-del="${r.id}">🗑</button>
            </div>
          </div>`).join("")}
      </div>`;
  }).join("");

  el.innerHTML = `
    ${backRowHTML("more", "More")}
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
      <h2 class="section-title" style="margin:0;">Resources</h2>
      <button class="btn btn-secondary" style="width:auto; padding:8px 14px;" id="btn-add-resource">+ Add</button>
    </div>
    ${state.resources.length === 0 ? `<div class="card center muted small">No resources saved yet.</div>` : grouped}
  `;

  document.getElementById("btn-add-resource").onclick = () => openResourceModal();
  wireBackRow(el);
  el.querySelectorAll("[data-edit]").forEach(btn => {
    btn.onclick = () => openResourceModal(state.resources.find(r => r.id === btn.dataset.edit));
  });
  el.querySelectorAll("[data-del]").forEach(btn => {
    btn.onclick = () => openConfirmModal("Delete this resource?", () => {
      state.resources = state.resources.filter(r => r.id !== btn.dataset.del);
      saveState();
      renderResources();
    });
  });
}

function openResourceModal(existing) {
  const backdrop = document.getElementById("modal-backdrop");
  backdrop.innerHTML = `
    <div class="modal-sheet">
      <h3>${existing ? "Edit Resource" : "Add Resource"}</h3>
      <input type="text" id="res-title" placeholder="Title" value="${existing ? existing.title : ""}">
      <input type="text" id="res-link" placeholder="Link (URL)" value="${existing ? existing.link : ""}">
      <select id="res-type">
        ${RESOURCE_TYPES.map(t => `<option value="${t}" ${existing && existing.type === t ? "selected" : ""}>${t}</option>`).join("")}
      </select>
      <div class="modal-actions">
        <button class="btn btn-outline" id="res-cancel">Cancel</button>
        <button class="btn btn-primary" id="res-save">Save</button>
      </div>
    </div>`;
  backdrop.classList.add("show");
  document.getElementById("res-cancel").onclick = () => backdrop.classList.remove("show");
  document.getElementById("res-save").onclick = () => {
    const title = document.getElementById("res-title").value.trim();
    const link = document.getElementById("res-link").value.trim();
    const type = document.getElementById("res-type").value;
    if (!title || !link) return;
    if (existing) {
      Object.assign(existing, { title, link, type });
    } else {
      state.resources.push({ id: "r" + Date.now(), title, link, type });
    }
    saveState();
    backdrop.classList.remove("show");
    renderResources();
  };
}

function openConfirmModal(message, onConfirm) {
  const backdrop = document.getElementById("modal-backdrop");
  backdrop.innerHTML = `
    <div class="modal-sheet">
      <h3>Are you sure?</h3>
      <p>${message}</p>
      <div class="modal-actions">
        <button class="btn btn-outline" id="confirm-cancel">Cancel</button>
        <button class="btn btn-danger" id="confirm-ok">Confirm</button>
      </div>
    </div>`;
  backdrop.classList.add("show");
  document.getElementById("confirm-cancel").onclick = () => backdrop.classList.remove("show");
  document.getElementById("confirm-ok").onclick = () => {
    backdrop.classList.remove("show");
    onConfirm();
  };
}

// ---------------------------------------------------------------
// SETTINGS view
// ---------------------------------------------------------------
function renderSettings() {
  const el = document.getElementById("view-settings");
  const connected = !!state.settings.puterConnected;
  const currentModel = state.settings.model;
  const updating = window.__ejUpdating === true;

  el.innerHTML = `
    <h2 class="section-title">AI / Puter</h2>
    <div class="card">
      <div class="row">
        <div>
          <div class="row-title">Connection</div>
          <div class="row-sub">Victor needs this for AI-generated coaching</div>
        </div>
        <span class="pill ${connected ? "connected" : "disconnected"}">${connected ? "🟢 Connected" : "🔴 Not Connected"}</span>
      </div>
      <button class="btn ${connected ? "btn-outline" : "btn-primary"} mt16" id="btn-puter-toggle">${connected ? "Sign Out" : "Sign In"}</button>
      <button class="btn btn-secondary mt8" id="btn-test-connection">Test Connection</button>
    </div>

    <h2 class="section-title">AI Model</h2>
    <div class="card">
      <div class="small muted" style="margin-bottom:10px;">Recommended for ENGLISH JOURNEY</div>
      ${MODELS_RECOMMENDED.map(m => modelOptionHTML(m, currentModel)).join("")}
      <div class="small muted" style="margin:14px 0 10px;">All Models</div>
      ${MODELS_ALL.filter(m => !MODELS_RECOMMENDED.find(r => r.id === m.id)).map(m => modelOptionHTML(m, currentModel)).join("")}
    </div>

    <h2 class="section-title">Journey Settings</h2>
    <div class="card">
      <div class="row-title small" style="margin-bottom:6px;">Rest Day</div>
      <select id="rest-day-select">
        ${WEEKDAYS.map(d => `<option value="${d}" ${state.restDay === d ? "selected" : ""}>${d}</option>`).join("")}
      </select>
    </div>

    <h2 class="section-title">My Book</h2>
    <div class="card">
      <div class="row more-row" data-go="book-settings">
        <div class="row-title">Book Settings</div>
        <div class="chevron">›</div>
      </div>
    </div>

    <h2 class="section-title">Backup</h2>
    <div class="card">
      <button class="btn btn-secondary" id="btn-export">Export Backup</button>
      <button class="btn btn-outline mt8" id="btn-import">Import Backup</button>
      <input type="file" id="import-file" accept="application/json" style="display:none;">
    </div>

    <h2 class="section-title">Reset</h2>
    <div class="card">
      <button class="btn btn-outline" id="btn-reset-progress">Reset Progress</button>
      <button class="btn btn-danger mt8" id="btn-full-reset">Full Reset</button>
    </div>

    <h2 class="section-title">Update</h2>
    <div class="card">
      <div class="row">
        <div>
          <div class="row-title">App version</div>
          <div class="row-sub">${APP_VERSION}</div>
        </div>
      </div>
      <button class="btn btn-secondary mt16" id="btn-check-update">${updating ? "Checking…" : "Check for Updates"}</button>
      <div class="small muted mt8">Fetches the latest files from the server and reloads — use this after a new version is deployed.</div>
    </div>
  `;

  document.getElementById("btn-puter-toggle").onclick = async () => {
    if (state.settings.puterConnected) {
      await puterSignOut();
    } else {
      await puterSignIn();
    }
    renderSettings();
  };
  document.getElementById("btn-test-connection").onclick = testPuterConnection;
  el.querySelectorAll(".model-option").forEach(opt => {
    opt.onclick = () => {
      state.settings.model = opt.dataset.model;
      saveState();
      renderSettings();
    };
  });
  document.getElementById("rest-day-select").onchange = (e) => {
    state.restDay = e.target.value;
    saveState();
  };
  el.querySelectorAll("[data-go]").forEach(row => {
    row.onclick = () => switchView(row.dataset.go);
  });
  document.getElementById("btn-export").onclick = exportBackup;
  document.getElementById("btn-import").onclick = () => document.getElementById("import-file").click();
  document.getElementById("import-file").onchange = importBackup;
  document.getElementById("btn-check-update").onclick = checkForUpdates;
  document.getElementById("btn-reset-progress").onclick = () => {
    openConfirmModal("This will erase your day-by-day progress and streak. Resources and settings stay.", () => {
      const keep = { restDay: state.restDay, resources: state.resources, settings: state.settings };
      state = Object.assign(defaultState(), keep);
      saveState();
      switchView("today");
    });
  };
  document.getElementById("btn-full-reset").onclick = () => {
    openConfirmModal("This erases everything — progress, resources and settings — permanently.", () => {
      state = defaultState();
      saveState();
      switchView("today");
    });
  };
}

// Forces the app to fetch fresh files from the server instead of the cached
// copy, then reloads. Use after deploying a new version.
async function checkForUpdates() {
  window.__ejUpdating = true;
  renderSettings();
  try {
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map(n => caches.delete(n)));
    }
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
  } catch (e) {
    // best effort — reload regardless
  }
  location.reload();
}

function exportBackup() {
  const backup = {
    progress: {
      currentDay: state.currentDay,
      completedDays: state.completedDays,
      streak: state.streak,
      bestStreak: state.bestStreak,
      lastCompletionDate: state.lastCompletionDate,
      lessonCredits: state.lessonCredits,
      lastCreditGrantDate: state.lastCreditGrantDate
    },
    resources: state.resources,
    settings: { restDay: state.restDay, userName: state.userName },
    book: { bookIntro: state.bookIntro, stageBooklets: state.stageBooklets }
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = todayISO();
  a.href = url;
  a.download = `EnglishJourney_Backup_${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importBackup(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const backup = JSON.parse(reader.result);
      const backdrop = document.getElementById("modal-backdrop");
      backdrop.innerHTML = `
        <div class="modal-sheet">
          <h3>Backup Found</h3>
          <p>${backup.progress?.completedDays?.length || 0} completed sessions<br>
          ${backup.resources?.length || 0} resources<br>
          Settings update available</p>
          <div class="modal-actions">
            <button class="btn btn-outline" id="backup-cancel">Cancel</button>
            <button class="btn btn-primary" id="backup-merge">Merge</button>
          </div>
        </div>`;
      backdrop.classList.add("show");
      document.getElementById("backup-cancel").onclick = () => backdrop.classList.remove("show");
      document.getElementById("backup-merge").onclick = () => {
        mergeBackup(backup);
        backdrop.classList.remove("show");
        switchView("progress");
      };
    } catch (err) {
      alert("This file isn't a valid ENGLISH JOURNEY backup.");
    }
  };
  reader.readAsText(file);
}

function mergeBackup(backup) {
  if (backup.progress) {
    const merged = Array.from(new Set([...state.completedDays, ...(backup.progress.completedDays || [])])).sort((a,b)=>a-b);
    state.completedDays = merged;
    state.currentDay = Math.max(state.currentDay, backup.progress.currentDay || 1);
    state.bestStreak = Math.max(state.bestStreak, backup.progress.bestStreak || 0);
  }
  if (backup.resources) {
    const existingLinks = new Set(state.resources.map(r => r.link));
    backup.resources.forEach(r => {
      if (!existingLinks.has(r.link)) state.resources.push(r);
    });
  }
  if (backup.settings && backup.settings.restDay) {
    state.restDay = backup.settings.restDay;
  }
  if (backup.settings && backup.settings.userName && !state.userName) {
    state.userName = backup.settings.userName;
  }
  if (backup.book) {
    if (backup.book.bookIntro && !state.bookIntro) state.bookIntro = backup.book.bookIntro;
    if (backup.book.stageBooklets) {
      state.stageBooklets = { ...backup.book.stageBooklets, ...state.stageBooklets };
    }
  }
  saveState();
}

// ---------------------------------------------------------------
// Puter AI integration
// ---------------------------------------------------------------
function modelOptionHTML(m, currentModel) {
  return `
    <div class="model-option ${m.id === currentModel ? "selected" : ""}" data-model="${m.id}">
      <div class="mname">${m.name}${MODELS_RECOMMENDED.find(r => r.id === m.id) ? " ⭐" : ""}</div>
      <div class="mdesc">${m.desc}</div>
    </div>`;
}

function puterAvailable() {
  return typeof window.puter !== "undefined" && window.puter.auth;
}

async function checkPuterAuthOnLoad() {
  if (!puterAvailable()) return;
  try {
    const signedIn = await window.puter.auth.isSignedIn();
    state.settings.puterConnected = !!signedIn;
    saveState();
  } catch (e) {
    // Puter not reachable — app still works fully offline
  }
}

async function puterSignIn() {
  if (!puterAvailable()) {
    alert("Puter isn't available right now. Check your connection and try again.");
    return;
  }
  try {
    await window.puter.auth.signIn();
    state.settings.puterConnected = true;
    saveState();
  } catch (e) {
    alert("Sign in was cancelled or failed.");
  }
}

async function puterSignOut() {
  if (puterAvailable()) {
    try { window.puter.auth.signOut(); } catch (e) {}
  }
  state.settings.puterConnected = false;
  saveState();
}

async function testPuterConnection() {
  if (!puterAvailable()) {
    alert("Puter SDK not available.");
    return;
  }
  try {
    const signedIn = await window.puter.auth.isSignedIn();
    if (signedIn) {
      alert("Connected ✓");
      state.settings.puterConnected = true;
    } else {
      alert("Not connected. Sign in first.");
      state.settings.puterConnected = false;
    }
    saveState();
    renderSettings();
  } catch (e) {
    alert("Could not reach Puter. Please try again.");
  }
}

// Ask Victor — sends ONLY the current day's data, never the full 180-day curriculum
// (Token Optimization principle).
async function askVictor(userMessage) {
  const dayData = getDayData(state.currentDay) || {};
  const systemContext =
`You are Victor, the English coach inside the ENGLISH JOURNEY app. Tone: professional, friendly, motivational — never childish, never scolding. Keep replies concise (2-5 sentences unless asked for more). If the learner writes with mistakes, you may gently note ONE correction, without derailing the conversation.

Learner's current context:
Day: ${dayData.day || "-"} / 180
Stage: ${dayData.stage || "-"} (${dayData.stageTheme || ""})
CEFR level: ${dayData.cefr || "-"}
Today's topic: ${dayData.topic || "-"}
Grammar focus: ${dayData.grammarFocus || "-"}
Communication goal: ${dayData.communicationGoal || "-"}
Current streak: ${state.streak} days`;

  const prompt = `${systemContext}\n\nLearner says: ${userMessage}`;

  const result = await window.puter.ai.chat(prompt, { model: state.settings.model });
  return extractPuterText(result);
}

function extractPuterText(result) {
  if (typeof result === "string") return result;
  if (result?.message?.content) {
    return Array.isArray(result.message.content)
      ? result.message.content.map(c => c.text || "").join(" ")
      : result.message.content;
  }
  if (result?.toString) return result.toString();
  return "";
}

// ---------------------------------------------------------------
// My Book — per-stage chapters (vocabulary + reading passage, AI-generated
// once and cached) assembled into a printable PDF via jsPDF.
// ---------------------------------------------------------------
async function generateStageBooklet(stageNum) {
  const stageDays = CURRICULUM_DAYS.filter(d => d.stage === stageNum && !d.isCheckpoint);
  const stage = CURRICULUM_STAGES.find(s => s.stage === stageNum);
  const topics = stageDays.map(d => d.topic).join(", ");
  const grammarList = stageDays.map(d => d.grammarFocus).join("; ");

  const prompt =
`For an English learner at ${stage.cefr} level, covering this stage of study — theme: "${stage.theme}", topics covered: ${topics}, grammar covered: ${grammarList} —
produce:
1) 15-18 key vocabulary words/phrases from these topics, each with a short meaning and one example sentence.
2) One short original reading passage (150-220 words) at ${stage.cefr} level, naturally using several of these topics and at least one of the grammar points.

Respond ONLY with strict JSON, no markdown, no commentary, in this exact shape:
{"vocabulary":[{"term":"...","meaning":"...","example":"..."}],"reading":{"title":"...","text":"..."}}`;

  const result = await window.puter.ai.chat(prompt, { model: state.settings.model });
  let text = extractPuterText(result).trim().replace(/^```json\s*|^```\s*|```$/g, "");
  const parsed = JSON.parse(text);
  if (!parsed.vocabulary || !parsed.reading) throw new Error("Unexpected response shape");

  state.stageBooklets[stageNum] = {
    vocabulary: parsed.vocabulary.slice(0, 20),
    reading: parsed.reading,
    generatedDate: todayISO()
  };
  saveState();
  return state.stageBooklets[stageNum];
}

// ---------------------------------------------------------------
// Stage Quiz — a short gate between stages. Testing retention, not gatekeeping
// on a passing score: the learner always sees their result and can continue.
// ---------------------------------------------------------------
async function generateStageQuiz(stageNum) {
  const stageDays = CURRICULUM_DAYS.filter(d => d.stage === stageNum && !d.isCheckpoint);
  const stage = CURRICULUM_STAGES.find(s => s.stage === stageNum);
  const topics = stageDays.map(d => d.topic).join(", ");
  const grammarList = stageDays.map(d => d.grammarFocus).join("; ");

  const prompt =
`Write a short 6-question multiple-choice quiz for an English learner at ${stage.cefr} level, testing the
grammar and vocabulary from this stage — theme: "${stage.theme}", topics: ${topics}, grammar: ${grammarList}.
Mix grammar and vocabulary questions. Each question has exactly 4 options, one correct.

Respond ONLY with strict JSON, no markdown, no commentary, in this exact shape:
{"questions":[{"question":"...","options":["...","...","...","..."],"correctIndex":0,"explanation":"short reason the correct answer is right"}]}`;

  const result = await window.puter.ai.chat(prompt, { model: state.settings.model });
  let text = extractPuterText(result).trim().replace(/^```json\s*|^```\s*|```$/g, "");
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed.questions) || !parsed.questions.length) throw new Error("Unexpected response shape");

  state.stageQuizzes[stageNum] = {
    questions: parsed.questions.slice(0, 8),
    completed: false,
    score: null,
    total: null
  };
  saveState();
  return state.stageQuizzes[stageNum];
}

// The stage that just finished and needs a quiz gate before the next stage
// can start, or null if no gate is pending right now.
function pendingQuizStage() {
  const prevDay = getDayData(state.currentDay - 1);
  if (!prevDay || prevDay.isCheckpoint) return null;
  if (prevDay.day % 6 !== 0) return null;
  const quiz = state.stageQuizzes[prevDay.stage];
  if (quiz && quiz.completed) return null;
  return prevDay.stage;
}

async function generateBookIntro() {
  const name = state.userName?.trim() || "this learner";
  const prompt =
`Write a short, warm introduction (3 short paragraphs, under 180 words total) for the front of a personal English-learning book titled "ENGLISH JOURNEY", written for ${name}. It should mention: a 180-day practical journey from A2 to B2 English, built around real daily practice rather than rote memorization, and end on an encouraging note. Written in second person ("you"), warm and professional, not childish. Plain text only, no markdown, no headers.`;

  const result = await window.puter.ai.chat(prompt, { model: state.settings.model });
  const text = extractPuterText(result).trim();
  if (!text) throw new Error("Empty response");
  state.bookIntro = { text, approved: false };
  saveState();
  return state.bookIntro;
}

async function loadImageAsDataURL(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Small helper that tracks a y-cursor and wraps/paginates text automatically,
// so the book-building code below doesn't have to do manual layout math.
function createPdfWriter(doc) {
  const margin = 50;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  const w = { doc, margin, pageWidth, pageHeight, contentWidth, y: margin };

  w.newPage = () => { doc.addPage(); w.y = margin; };
  w.ensureSpace = (h) => { if (w.y + h > pageHeight - margin) w.newPage(); };
  w.spacer = (h) => { w.y += h; };
  w.text = (str, opts = {}) => {
    const size = opts.size || 11;
    const style = opts.style || "normal";
    const color = opts.color || [16, 48, 46];
    const lineHeight = opts.lineHeight || size * 1.45;
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(str, contentWidth);
    lines.forEach(line => {
      w.ensureSpace(lineHeight);
      doc.text(line, margin, w.y);
      w.y += lineHeight;
    });
    w.y += (opts.gapAfter ?? 6);
  };
  return w;
}

// Builds either one standalone chapter PDF (onlyStage set) or the full book
// (cover + TOC + introduction + every generated chapter).
async function buildBookPdf({ onlyStage } = {}) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const w = createPdfWriter(doc);

  if (!onlyStage) {
    // Full-bleed designed cover (the name/subtitle are baked into this image —
    // if either ever needs to change, replace assets/book-cover.png).
    const coverDataUrl = await loadImageAsDataURL("assets/book-cover.png").catch(() => null);
    if (coverDataUrl) {
      doc.addImage(coverDataUrl, "PNG", 0, 0, w.pageWidth, w.pageHeight);
    }
    w.newPage();
  }

  let tocStartPage = null;
  if (!onlyStage) {
    tocStartPage = doc.internal.getNumberOfPages();
    w.newPage(); // reserve a 2nd TOC page (filled in later; blank pages are harmless)
    w.newPage();

    w.text("Introduction", { size: 20, style: "bold", gapAfter: 14 });
    const introText = (state.bookIntro && state.bookIntro.approved)
      ? state.bookIntro.text
      : "Welcome to your personal English Journey book \u2014 a record of 180 days of practical English practice, from everyday conversations to workplace communication.";
    w.text(introText, { size: 11.5 });
    w.newPage();
  }

  const chapterPageOf = {};
  const stagesToRender = onlyStage ? [onlyStage] : CURRICULUM_STAGES.map(s => s.stage);

  stagesToRender.forEach((stageNum) => {
    const stage = CURRICULUM_STAGES.find(s => s.stage === stageNum);
    const stageDays = CURRICULUM_DAYS.filter(d => d.stage === stageNum && !d.isCheckpoint);
    const booklet = state.stageBooklets[stageNum];

    if (w.y > w.margin + 4) w.newPage();
    chapterPageOf[stageNum] = doc.internal.getNumberOfPages();

    w.text(`Chapter ${stageNum} \u2014 ${stage.theme}`, { size: 18, style: "bold", gapAfter: 2 });
    w.text(`${stage.cefr} level`, { size: 10, color: [100, 120, 118], gapAfter: 16 });

    w.text("Grammar Points", { size: 13, style: "bold", gapAfter: 6 });
    stageDays.forEach(d => w.text(`\u2022  ${d.topic}: ${d.grammarFocus}`, { size: 10.5, gapAfter: 4 }));
    w.spacer(8);

    w.text("Key Vocabulary", { size: 13, style: "bold", gapAfter: 6 });
    if (booklet?.vocabulary?.length) {
      booklet.vocabulary.forEach(v => {
        w.text(`\u2022  ${v.term} \u2014 ${v.meaning}`, { size: 10.5, gapAfter: 1 });
        w.text(`   "${v.example}"`, { size: 10, style: "italic", color: [14, 167, 158], gapAfter: 5 });
      });
    } else {
      w.text("Not generated yet \u2014 open ENGLISH JOURNEY and generate this chapter with Victor.", { size: 10.5, color: [150, 90, 30] });
    }
    w.spacer(8);

    w.text("Reading", { size: 13, style: "bold", gapAfter: 6 });
    if (booklet?.reading) {
      w.text(booklet.reading.title, { size: 11.5, style: "bold", gapAfter: 6 });
      w.text(booklet.reading.text, { size: 10.5, gapAfter: 6 });
    } else {
      w.text("Not generated yet.", { size: 10.5, color: [150, 90, 30] });
    }
    w.newPage();
  });

  if (!onlyStage && tocStartPage) {
    doc.setPage(tocStartPage);
    let ty = w.margin;
    let curPage = tocStartPage;
    doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(6, 59, 60);
    doc.text("Table of Contents", w.margin, ty);
    ty += 30;
    CURRICULUM_STAGES.forEach(s => {
      if (ty > w.pageHeight - w.margin) {
        curPage += 1;
        doc.setPage(curPage);
        ty = w.margin;
      }
      doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(16, 48, 46);
      doc.text(`Chapter ${s.stage} \u2014 ${s.theme}`, w.margin, ty);
      doc.text(String(chapterPageOf[s.stage] || "\u2014"), w.pageWidth - w.margin, ty, { align: "right" });
      ty += 20;
    });
  }

  const total = doc.internal.getNumberOfPages();
  for (let p = onlyStage ? 1 : 2; p <= total; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(160, 175, 173);
    doc.text("ENGLISH JOURNEY", w.margin, 28);
    doc.text(String(p), w.pageWidth / 2, w.pageHeight - 24, { align: "center" });
  }

  return doc;
}

async function downloadStageChapterPdf(stageNum) {
  const doc = await buildBookPdf({ onlyStage: stageNum });
  doc.save(`EnglishJourney_Chapter${String(stageNum).padStart(2, "0")}.pdf`);
}

async function downloadFullBookPdf() {
  const doc = await buildBookPdf({});
  doc.save("EnglishJourney_Book.pdf");
}

function openVictorChat() {
  document.getElementById("chat-overlay").classList.add("show");
  renderChatMessages();
  if (state.victorChat.length === 0) {
    const dayData = getDayData(state.currentDay);
    pushChatMessage("victor", `Hi, I'm Victor 👋 I'm here as your English coach. ${dayData ? `We're on Day ${dayData.day}: "${dayData.topic}." ` : ""}Ask me anything — vocabulary, grammar, or just practice a conversation.`);
  }
}

function closeVictorChat() {
  document.getElementById("chat-overlay").classList.remove("show");
}

function pushChatMessage(role, content) {
  state.victorChat.push({ role, content });
  if (state.victorChat.length > 40) state.victorChat = state.victorChat.slice(-40);
  saveState();
  renderChatMessages();
}

function renderChatMessages() {
  const wrap = document.getElementById("chat-messages");
  const connected = !!state.settings.puterConnected;
  document.getElementById("chat-status").textContent = connected ? "Your English coach" : "Not connected — sign in from Settings";

  if (!connected) {
    wrap.innerHTML = `
      <div class="chat-connect-prompt">
        <div style="font-size:32px;">🔒</div>
        <p style="font-weight:700; color:var(--text); margin-top:8px;">Connect Puter to talk with Victor</p>
        <p class="small muted">Victor uses Puter AI to have real conversations with you. Sign in from Settings to get started — the rest of the app works fine without it.</p>
        <button class="btn btn-primary mt8" id="chat-goto-settings">Go to Settings</button>
      </div>`;
    const btn = document.getElementById("chat-goto-settings");
    if (btn) btn.onclick = () => { closeVictorChat(); switchView("settings"); };
    return;
  }

  wrap.innerHTML = state.victorChat.map(m =>
    `<div class="chat-bubble ${m.role === "user" ? "user" : "victor"}">${escapeHTML(m.content)}</div>`
  ).join("");
  wrap.scrollTop = wrap.scrollHeight;
}

function escapeHTML(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

async function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text || !state.settings.puterConnected) return;
  input.value = "";
  pushChatMessage("user", text);

  const wrap = document.getElementById("chat-messages");
  const typingEl = document.createElement("div");
  typingEl.className = "chat-bubble victor typing";
  typingEl.innerHTML = "<span></span><span></span><span></span>";
  wrap.appendChild(typingEl);
  wrap.scrollTop = wrap.scrollHeight;

  try {
    const reply = await askVictor(text);
    typingEl.remove();
    pushChatMessage("victor", reply);
  } catch (e) {
    typingEl.remove();
    pushChatMessage("victor", "Selected model is unavailable. Please choose another model in Settings.");
  }
}

// ---------------------------------------------------------------
// Init
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.onclick = () => switchView(btn.dataset.view);
  });
  document.getElementById("modal-backdrop").onclick = (e) => {
    if (e.target.id === "modal-backdrop") e.target.classList.remove("show");
  };

  document.getElementById("victor-fab").onclick = openVictorChat;
  document.getElementById("chat-close").onclick = closeVictorChat;
  document.getElementById("chat-send").onclick = sendChatMessage;
  document.getElementById("chat-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendChatMessage();
  });

  grantDueCredits();
  switchView("today");
  checkPuterAuthOnLoad();

  runSplashSequence();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});

// Icon fades in → glow travels the road → plane launches from where the road
// ends → wordmark slides in → whole splash fades out into the app.
function runSplashSequence() {
  const splash = document.getElementById("splash");
  const iconBox = document.getElementById("splashIconBox");
  const glow = document.getElementById("splashGlow");
  const plane = document.getElementById("splashPlane");
  const textBox = document.getElementById("splashTextBox");
  if (!splash) return;
  if (!iconBox || !glow || !plane || !textBox) {
    splash.classList.add("hide");
    return;
  }
  setTimeout(() => iconBox.classList.add("show"), 50);
  setTimeout(() => glow.classList.add("travel"), 480);
  setTimeout(() => plane.classList.add("launch"), 1300);
  setTimeout(() => textBox.classList.add("show"), 1850);
  setTimeout(() => splash.classList.add("hide"), 2650);
  // Safety net: never let the splash get stuck on screen.
  setTimeout(() => splash.classList.add("hide"), 4000);
}
