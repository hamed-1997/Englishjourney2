# My Book — Full Specification

This document describes the "My Book" feature end to end: what it is, exactly
what appears on the page, where each piece of content comes from, and how the
PDF is technically assembled. Written so both a human and an AI implementing
this can follow it without needing the rest of the conversation history.

---

## 1. What this feature is

As the learner progresses through the 180-day / 30-stage curriculum, the app
lets them turn their own completed stages into a real, printable book:
**ENGLISH JOURNEY — a personal textbook**, one chapter per stage (30 chapters
total), built entirely client-side (no backend), downloadable as a standard
A4 PDF.

Two things can be downloaded at any time:
- **A single chapter** (one stage) — as soon as that stage is generated.
- **The full book so far** — cover + table of contents + introduction +
  every chapter generated up to that point. Chapters not yet generated show
  a short "not generated yet" placeholder instead of being skipped, so the
  table of contents and pagination stay consistent as the book grows. The
  book is only *complete* once all 30 chapters exist, but it can be
  downloaded in its partial form at any time.

---

## 2. Visual design system

- **Page size:** A4, portrait. Margins: 20mm on all sides.
- **Color:** strictly black/white/gray — no brand teal or orange. This is a
  print document, and color would waste ink for no benefit.
  - Body text: near-black (`#1A1A1A`)
  - Secondary/muted text: mid-gray (`#6E6E6E`)
  - Rules/dividers: light gray (`#B8B8B8`)
  - Panel backgrounds (grammar boxes, reading box): very light gray fill
    (`#F2F2F2`) with a slightly darker border (`#D8D8D8`)
- **Typography:** Helvetica family throughout (bold/regular/italic). No
  decorative fonts — keep it legible at print size.
- **Recurring page chrome** (every page except the cover):
  - Top-left: small caps "ENGLISH JOURNEY"
  - Top-right: current section label (e.g. "CHAPTER 1", "CONTENTS",
    "INTRODUCTION")
  - A thin horizontal rule under both
  - Bottom-center: page number
- **Section headers** inside a chapter: bold, uppercase, small, with a solid
  black rule directly underneath spanning the full content width (this is
  the same visual device used for "GRAMMAR", "KEY VOCABULARY", "READING",
  "SPEAKING & DISCUSSION", "PRACTICE", "CAN-DO CHECKLIST").
- **Level/day-range badge:** a small solid-black rounded pill under the
  chapter title, white text, e.g. `A2 · DAYS 1–6`.

---

## 3. Book structure, top to bottom

```
Cover
  ↓
Table of Contents  (1–2 pages, auto-generated)
  ↓
Introduction        (AI-drafted once, user-approved)
  ↓
Chapter 1 ... Chapter 30   (one per stage, in the app's stage order)
```

### 3.1 Cover page
- App logo image, centered, near the top-middle of the page.
- Title, large bold: **ENGLISH JOURNEY**
- Subtitle, smaller gray: *A 180-Day Personal Journey to Practical English*
- Byline: **By {user's name}** — the name comes from a "Your Name" field in
  Settings (`state.userName`). If empty, show an em dash instead of a blank.
- Small gray line: the generation date.
- No page number/header on this page.

### 3.2 Table of Contents
- Reserve enough blank pages upfront (roughly 1 page per ~26 chapter
  entries — 30 chapters fit comfortably in 1–2 pages) and fill them in
  **after** all chapters have been laid out, once real page numbers are
  known (see §6.3 for how this works with jsPDF).
- One line per chapter: `Chapter N — {stage theme}` on the left, a dotted
  leader, and the starting page number right-aligned. Chapters not yet
  generated still get a row (so the reader always sees the full shape of
  the book) — position/page number just reflects wherever that placeholder
  chapter content actually landed.

### 3.3 Introduction
- Written once by Victor (AI), specifically for this learner:
  - Input to the AI: the learner's name (`state.userName`), and the fact
    that this is a 180-day A2→B2 practical-English journey.
  - Output: 3 short paragraphs, under ~180 words total, second person,
    warm/professional tone (matches Victor's voice elsewhere in the app),
    ends encouragingly. Signed "— Victor" at the bottom.
- **Approval flow:** generating the intro does not lock it in. It's shown to
  the learner in an editable text box; they can revise the wording, then
  tap **Approve**. Only an approved intro is used in the final book. If an
  intro exists but hasn't been approved yet, book builds fall back to one
  fixed generic paragraph instead (so the book never ships an unreviewed
  AI paragraph without the user's sign-off).
- Stored as `state.bookIntro = { text, approved }`.

### 3.4 Chapters (one per stage — 30 total)

Each chapter = one Stage = 6 curriculum days. Every chapter has exactly
seven sections, in this order:

| # | Section | Where the content comes from | Needs AI? |
|---|---|---|---|
| 1 | **Chapter opener** | Curriculum data: stage number, theme, CEFR level, day range, and a one-line summary generated from the six days' topics | No |
| 2 | **Grammar** | One boxed panel per day (6 boxes): the grammar point's name (from curriculum data) + a short explanation + two example sentences | Explanation + examples: **yes**. Point name: no |
| 3 | **Key Vocabulary** | ~20 terms drawn from the stage's topics, two-column layout, each with a short meaning | Yes |
| 4 | **Reading** | One original passage (~250–300 words) at the stage's CEFR level, using several of the stage's topics and grammar points, inside a shaded box, plus 3 comprehension questions below it | Yes |
| 5 | **Speaking & Discussion** | 3 conversation/roleplay prompts tied to the stage's topics | Yes |
| 6 | **Practice** | 5 fill-in-the-blank exercises using this chapter's grammar/vocabulary, each with two answer choices in parentheses | Yes |
| 7 | **Can-Do Checklist** | One checkbox line per day (6 lines), each line is that day's `communicationGoal` from curriculum data, verbatim | No |

Sections 1 and 7 are **always available**, even if the learner has never
connected Puter — they only need the curriculum data that already ships
with the app. Sections 2–6 need one AI call (see §4).

---

## 4. Content generation (the AI call)

One Puter AI call per stage produces sections 2–6 together, as strict JSON.
It is triggered manually (a "Generate" button next to that stage, visible
only once the stage is fully completed), and the result is cached — the AI
is never called twice for the same stage.

**Prompt inputs:** stage theme, CEFR level, the 6 days' topics and grammar
points (all pulled from curriculum data — never the full 180-day curriculum,
just this one stage, per the app's existing token-optimization principle).

**Expected JSON shape:**
```json
{
  "grammarNotes": [
    { "point": "...", "explanation": "...", "example1": "...", "example2": "..." }
    // one entry per day in the stage, 6 total, same order as the curriculum days
  ],
  "vocabulary": [
    { "term": "...", "meaning": "..." }
    // ~20 entries
  ],
  "reading": {
    "title": "...",
    "text": "...",
    "questions": ["...", "...", "..."]   // 3 comprehension questions
  },
  "speaking": ["...", "...", "..."],      // 3 discussion/roleplay prompts
  "exercises": [
    { "prompt": "... ______ ... (optionA / optionB)" }
    // 5 fill-in-the-blank items
  ]
}
```

Stored as:
```js
state.stageBooklets[stageNum] = {
  grammarNotes, vocabulary, reading, speaking, exercises,
  generatedDate: todayISO()
}
```

If generation fails (bad JSON, network error, model unavailable), the stage
stays in its "not generated" state and the UI shows a retry option — nothing
partial is saved.

---

## 5. Where this lives in the app

- **Settings → Journey Settings:** a "Your Name" text field
  (`state.userName`), used only for the book's cover byline.
- **Progress → "My Book" section** (new, below the existing Stage Roadmap):
  - Introduction status/generate/review-and-approve control.
  - A scrollable list of completed stages, each showing: chapter title,
    status (not generated / generating / ready), and a Generate or
    Download button as appropriate. Stages that aren't fully completed yet
    don't appear here at all.
  - A count ("X / 30 chapters ready") and a **Download Full Book (PDF)**
    button, always enabled.
- If Puter isn't connected, the Generate buttons are disabled with an
  explanatory note — the opener and can-do sections would still work, but
  generating new chapters requires it.

---

## 6. How the PDF is actually built (technical)

- **Library:** [jsPDF](https://github.com/parallax/jsPDF), loaded via a
  `<script>` tag from cdnjs (same pattern as the Puter SDK) — no bundler,
  no backend, fits the app's "lightweight, everything client-side"
  architecture.

### 6.1 A small layout helper
Because jsPDF has no built-in text flow/pagination, a small helper
(`createPdfWriter(doc)`) tracks a `y` cursor and exposes a `text(str, opts)`
method that:
- wraps long strings to the content width (`doc.splitTextToSize`),
- checks remaining vertical space before each line and calls `doc.addPage()`
  automatically when it would overflow,
- applies font/size/color/line-height from `opts`.

All prose in the document (grammar explanations, vocabulary, reading text,
etc.) is drawn through this helper so page breaks are never handled by hand.

### 6.2 Two build modes
One function, `buildBookPdf({ onlyStage })`, handles both cases:
- `onlyStage` set → skip the cover/TOC/intro, just lay out that one chapter
  starting on page 1. Used for the per-chapter "Download" button.
- `onlyStage` unset → build the full book: cover → reserved TOC pages →
  introduction → all 30 chapters in order.

### 6.3 Filling in the Table of Contents after the fact
Page numbers for each chapter aren't known until that chapter has actually
been laid out (chapters vary in length depending on how much AI content
came back). The trick:
1. Reserve 1–2 blank pages for the TOC right after the cover, and remember
   that page index.
2. Lay out the introduction and all 30 chapters normally, recording
   `chapterPageOf[stageNum] = doc.internal.getNumberOfPages()` at the start
   of each chapter.
3. Once everything is laid out, jump back with `doc.setPage(tocPageIndex)`
   and draw the actual TOC rows with their real page numbers — this works
   because those pages already exist (blank), we're just drawing on them
   after the fact rather than inserting new pages mid-document.

### 6.4 Header/footer pass
After all content exists, loop over every page (`doc.internal.getNumberOfPages()`),
`doc.setPage(p)` on each one, and draw the small running header and page
number — skipped only on the cover.

### 6.5 Images
The app logo (for the cover) is loaded as a data URL via `fetch` +
`FileReader` (it's a same-origin asset, so this works without CORS issues),
then placed with `doc.addImage()`.

### 6.6 Output
`doc.save("EnglishJourney_Book.pdf")` for the full book, or
`EnglishJourney_Chapter{NN}.pdf` for a single chapter — both trigger a
normal browser file download, which is what makes them printable: standard
A4 PDF, opens in any reader, prints from any device.

---

## 7. Data stored (all local, part of the existing app state)

```js
state.userName        // string, cover byline
state.bookIntro        // { text, approved } | null
state.stageBooklets    // { [stageNum]: { grammarNotes, vocabulary, reading, speaking, exercises, generatedDate } }
```

Included in Export/Import Backup so the learner doesn't lose generated
chapters if they move devices or reinstall.
