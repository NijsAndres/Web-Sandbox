/*
  GSAP SANDBOX — EXERCISES
  ========================
  Each "#region" below is one exercise, matching a card on the page.
  The plumbing is done for you: elements exist, Replay buttons are wired to
  the functions below, and the plugins are registered. The function bodies
  are EMPTY — writing the animation code is the exercise.

  Workflow: read the concept, write your code where the ✍️ marker is,
  save, refresh the page, hit the card's Replay button. Then push further
  with the 👉 TRY list.

  Core mental model before you start:
  - A *tween* animates properties of a target over time: gsap.to(target, {vars}).
  - GSAP animates any numeric CSS property, plus shorthand transforms
    (x, y, rotation, scale, skew...) which are GPU-friendly — prefer
    x/y over left/top, always.
  - A *timeline* is a container that sequences tweens.
  - Docs: https://gsap.com/docs/v3/
*/

// Plugins must be registered once before use — done for you.
gsap.registerPlugin(ScrollTrigger, TextPlugin, Draggable, Flip);

// #region ***  01 · Your first tween - gsap.to()        ***********

/*
  CONCEPT
  gsap.to(target, vars) animates the target FROM its current state TO the
  values you pass. The target can be an element, a selector string like
  ".js-box-to", or an array of elements.

  Special (non-CSS) properties you can put in the vars object:
  - duration : seconds (default 0.5)
  - delay    : seconds to wait before starting
  - repeat   : how many extra times to play (-1 = forever)
  - yoyo     : true = play backwards on every other repeat
  - ease     : the acceleration curve (exercise 03 digs into this)

  YOUR TURN
  Make the box move to the right (the `x` property, in px), do a full
  rotation (the `rotation` property, in degrees) and take about 1 second.

  HINTS
  - One gsap.to() call with 3–4 properties is all you need.
  - `x` is shorthand for transform: translateX() — smoother than `left`.
  - Replay acting weird? Each Replay stacks a new tween on the old end
    state. Fix it by starting your function with:
      gsap.killTweensOf(box);              // stop running tweens
      gsap.set(box, { clearProps: "all" }); // wipe GSAP's inline styles

  DOCS  https://gsap.com/docs/v3/GSAP/gsap.to()

  👉 TRY: repeat: 1 with yoyo: true — it comes back by itself.
  👉 TRY: a non-transform property: borderRadius: "50%" or backgroundColor: "#ff4d6d".
  👉 TRY: xPercent: 300 instead of x — percent of the box's own width.
*/
const playTo = () => {
  const box = document.querySelector(".js-box-to");

  // ✍️ your code here

};

// #endregion

// #region ***  02 · from() & fromTo() - entrances       ***********

/*
  CONCEPT
  gsap.from() is gsap.to() in reverse: you define where the animation
  STARTS and it animates to the element's natural, CSS-defined state.
  That's the classic "fade in on page load" tool.

  gsap.fromTo(target, fromVars, toVars) pins BOTH ends. That makes it the
  safest choice for anything you replay, because the start point never
  depends on whatever state the last run left behind.

  YOUR TURN
  Give the box an entrance: start it lower down (y), invisible, and small
  (scale), and animate it to its natural state. Use fromTo().

  HINTS
  - fromTo takes TWO objects: fromTo(box, { ...from }, { ...to }).
  - duration/ease belong in the SECOND object.
  - Use autoAlpha instead of opacity: it's opacity + visibility in one,
    so invisible elements can't be clicked or tabbed to.

  DOCS  https://gsap.com/docs/v3/GSAP/gsap.fromTo()

  👉 TRY: the same effect with gsap.from() and one object. Hit Replay
          twice in a row — see why fromTo is safer for replays?
  👉 TRY: ease: "back.out(1.7)" for a landing with a little overshoot.
  👉 TRY: x: -300 in the from-state for a slide-in from the left.
*/
const playFromTo = () => {
  const box = document.querySelector(".js-box-fromto");

  // ✍️ your code here

};

// #endregion

// #region ***  03 · Eases - the personality of motion   ***********

/*
  CONCEPT
  The ease controls HOW a tween moves between start and end — it's what
  makes motion feel snappy, heavy, springy or robotic.

  Naming: <name>.<in|out|inOut>
  - .out   = fast start, slow end  (most UI animation — feels responsive)
  - .in    = slow start, fast end  (elements leaving the screen)
  - .inOut = slow both ends        (elements moving A -> B on screen)

  YOUR TURN
  Tween the box to the right (a long distance, slowish duration ~1.5s so
  you can feel the curve), using the ease chosen in the dropdown. The
  selected value is already read into `selectedEase` for you.

  HINTS
  - It's exercise 01 again, plus `ease: selectedEase`.
  - Reset the box first (gsap.set(box, { x: 0 })) so replays restart
    from the left.

  DOCS  https://gsap.com/docs/v3/Eases  ← bookmark this page, the
        interactive visualizer is the most useful page in the GSAP docs.

  👉 TRY: every option in the dropdown, especially back vs elastic.
  👉 TRY: tweak the numbers: "back.out(4)" overshoots harder,
          "elastic.out(1, 0.2)" wobbles longer.
  👉 TRY: add your own <option> in index.html, e.g. "expo.inOut".
*/
const playEase = () => {
  const box = document.querySelector(".js-box-ease");
  const selectedEase = document.querySelector(".js-ease-select").value;

  // ✍️ your code here

};

// #endregion

// #region ***  04 · Staggers - one tween, many targets  ***********

/*
  CONCEPT
  When a tween targets MULTIPLE elements, the `stagger` property offsets
  each one's start time. A plain number is the gap in seconds between
  each. An OBJECT unlocks the fun stuff:

    stagger: {
      each: 0.05,       // seconds between each element
      grid: [5, 5],     // tell GSAP the grid dimensions [rows, columns]
      from: "center",   // where the wave starts
    }

  That's what powers every "wave through a grid of tiles" animation on
  award sites.

  YOUR TURN
  The 25 dots are already on the page (built by buildStaggerGrid below).
  Pop them all in — from scale 0 and invisible to full size — as a wave
  from the center, with ONE tween.

  HINTS
  - Target all dots at once: gsap.utils.toArray(".js-stagger-grid > *")
  - fromTo() from exercise 02 makes replays reliable here too.
  - An .out ease with overshoot (back.out) makes pops feel alive.

  DOCS  https://gsap.com/docs/v3/Staggers

  👉 TRY: from: "edges", "random", "start" — or an index number like 12.
  👉 TRY: amount: 1 instead of each — total seconds spread over all dots,
          handy when you don't know how many elements there are.
  👉 TRY: y: -20 instead of scale for a ripple instead of a pop.
*/
const playStagger = () => {
  const dots = gsap.utils.toArray(".js-stagger-grid > *");

  // ✍️ your code here

};

// Plumbing (not part of the exercise): builds the 5x5 grid of dots at load.
const buildStaggerGrid = () => {
  const grid = document.querySelector(".js-stagger-grid");
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement("div");
    dot.className = "c-gsap__dot";
    grid.appendChild(dot);
  }
};

// #endregion

// #region ***  05 · Timelines - choreographing          ***********

/*
  CONCEPT
  Without timelines you'd sequence tweens by stacking `delay` values — and
  changing one duration would break every delay after it. A timeline
  places tweens relative to each other instead:

    const tl = gsap.timeline({ defaults: { duration: 0.7 } });
    tl.to(".a", { x: 300 })          // starts at 0
      .to(".b", { x: 300 })          // starts when .a finishes (default)
      .to(".c", { x: 300 }, "-=0.4") // 3rd arg = POSITION parameter

  The position parameter is the superpower:
  - (nothing) : after the previous tween ends
  - "<"       : together WITH the previous tween
  - "-=0.4"   : 0.4s before the previous ends (overlap)
  - "+=0.4"   : 0.4s after the previous ends (gap)
  - "myLabel" : at a label you placed with .addLabel("myLabel")

  YOUR TURN
  Choreograph the three boxes (.js-tl-box-1/2/3): slide them to the right
  one after another with a slight overlap, then rotate ALL three at the
  end. Use `defaults` in the timeline options so you don't repeat
  duration/ease on every step.

  HINTS
  - Reset first so replays work:
      gsap.set([".js-tl-box-1", ".js-tl-box-2", ".js-tl-box-3"], { clearProps: "all" });
  - The final rotation can target an array of all three selectors, and
    stagger works inside timelines too.

  DOCS  https://gsap.com/docs/v3/GSAP/Timelines

  👉 TRY: swap "-=0.4" for "<" and for nothing — feel the rhythm change.
  👉 TRY: tl.timeScale(2) — replay the whole sequence at double speed.
  👉 TRY: { repeat: -1, yoyo: true } in the timeline options.
  👉 TRY: type your timeline variable in the browser console and call
          .reverse(), .pause(), .seek(1) on it — timelines are players.
*/
const playTimeline = () => {

  // ✍️ your code here

};

// #endregion

// #region ***  06 · quickTo() - buttery mouse follow    ***********

/*
  CONCEPT
  Calling gsap.to() on every mousemove creates and destroys hundreds of
  tweens per second. gsap.quickTo() creates ONE reusable tween per
  property and hands you back a function you call with just a number:

    const xTo = gsap.quickTo(box, "x", { duration: 0.4, ease: "power3.out" });
    xTo(200); // retarget x to 200px, smoothly, whenever you like

  Built exactly for pointer-following, and dramatically faster.

  YOUR TURN
  Make the ball chase the cursor inside the arena:
  1. Create a quickTo for "x" and one for "y".
  2. Listen to "mousemove" on `arena`.
  3. In the handler, convert the mouse position to arena-relative
     coordinates and feed them to your two quickTo functions.

  HINTS
  - Arena-relative x = event.clientX - arena.getBoundingClientRect().left
  - Subtract half the ball's size (box.offsetWidth / 2) to center it
    on the cursor instead of hanging off its top-left corner.
  - This runs once at load (no Replay button) — as soon as your code is
    right, the arena is alive forever.

  DOCS  https://gsap.com/docs/v3/GSAP/gsap.quickTo()

  👉 TRY: duration: 1.5 — the ball turns lazy and floaty.
  👉 TRY: ease: "back.out(3)" — it overshoots the cursor like a spring.
  👉 TRY: add a second, bigger ball with a longer duration for a
          trailing-comet effect.
*/
const initQuickTo = () => {
  const arena = document.querySelector(".js-arena");
  const box = document.querySelector(".js-box-quickto");

  // ✍️ your code here

};

// #endregion

// #region ***  07 · TextPlugin - typewriter effects     ***********

/*
  CONCEPT
  TextPlugin animates an element's TEXT CONTENT instead of a CSS
  property. You tween a `text` property to the sentence you want:

    gsap.to(target, { duration: 2, text: "new text...", ease: "none" });

  ease: "none" (linear) gives an even typewriter pace — any other ease
  makes the typing speed up or slow down.

  YOUR TURN
  Type a sentence of your choice into the paragraph. Clear it first
  (target.textContent = "") so every replay starts from an empty line.

  DOCS  https://gsap.com/docs/v3/Plugins/TextPlugin

  👉 TRY: text: { value: "...", delimiter: " " } — types word by word.
  👉 TRY: an ease like "power4.in" — the typing accelerates as it goes.
  👉 TRY: build a terminal prompt in a timeline: type a command, pause
          (position parameter "+=1"), then animate text back to "".
*/
const playText = () => {
  const target = document.querySelector(".js-typewriter");

  // ✍️ your code here

};

// #endregion

// #region ***  08 · ScrollTrigger - scroll-linked       ***********

/*
  CONCEPT
  ScrollTrigger ties an animation to the scrollbar. Add a `scrollTrigger`
  object to any tween's vars:

    gsap.to(".box", {
      x: 400,
      scrollTrigger: {
        trigger: ".box",     // element whose position drives things
        start: "top 90%",    // "<trigger-edge> <viewport-edge>"
        end: "top 30%",
        scrub: 1,            // tie progress to scroll (1 = 1s smoothing)
      },
    });

  Two big modes:
  1. SCRUBBED (`scrub`): scroll position IS the playhead — scroll down,
     it plays forward; scroll up, it rewinds.
  2. TRIGGERED (`toggleActions: "play none none reverse"`): the tween
     plays on its own when the trigger scrolls into view.

  start: "top 90%" reads as: "when the TRIGGER's top edge hits 90% of
  the way down the VIEWPORT".

  YOUR TURN
  1. Scrub .js-box-scroll to the right (and give it a rotation) as its
     card travels through the viewport.
  2. Bonus: animate .js-scroll-progress to scaleX: 1 with the whole page
     as the range — trigger: document.body, start: "top top",
     end: "bottom bottom" — and you've built a reading-progress bar.
     (Its CSS already sets scaleX(0) and transform-origin: left.)

  HINTS
  - This also runs once at load — ScrollTrigger listens from then on.
  - THE debug tool: add `markers: true` and GSAP draws the start/end
    lines right on the page. Use it, then remove it.
  - Progress bar looks jumpy? ease: "none" — you want raw progress.

  DOCS  https://gsap.com/docs/v3/Plugins/ScrollTrigger

  👉 TRY: scrub: true vs scrub: 1 — feel the smoothing disappear.
  👉 TRY: remove scrub and use toggleActions: "play reverse play reverse".
  👉 TRY: pin: true — the trigger element freezes on screen while the
          animation plays out.
*/
const initScrollTrigger = () => {

  // ✍️ your code here

};

// #endregion

// #region ***  09 · Draggable - grab the box            ***********

/*
  CONCEPT
  Draggable makes any element drag/spin/toss-able, handling mouse, touch
  and pointer events for you:

    Draggable.create(".box", {
      type: "x,y",              // or "x", "y", "rotation"
      bounds: someElement,      // can't be dragged outside this
      edgeResistance: 0.75,     // rubber-band feel at the edges
    });

  YOUR TURN
  Make the box draggable inside its stage (the box's parentElement):
  constrained by bounds, with some edge resistance, snapping to a 60px
  grid when released.

  HINTS
  - Snapping on release:
      snap: { x: (value) => Math.round(value / 60) * 60,
              y: (value) => Math.round(value / 60) * 60 }
  - Draggable has callbacks like onDragStart/onRelease — inside them,
    `this.target` is the dragged element. Scale it up while dragging
    for a nice "picked up" feel.

  DOCS  https://gsap.com/docs/v3/Plugins/Draggable

  👉 TRY: type: "rotation" — the box spins around its center instead.
  👉 TRY: liveSnap: true — snaps WHILE dragging, not just on release.
  👉 TRY: add the InertiaPlugin script tag in index.html, register it,
          set inertia: true — then flick the box and watch it glide.
*/
const initDraggable = () => {
  const box = document.querySelector(".js-box-drag");

  // ✍️ your code here

};

// #endregion

// #region ***  10 · Flip - animating layout changes     ***********

/*
  CONCEPT
  Some changes can't be tweened directly: reordering DOM elements, moving
  a node to a new parent, toggling a class that changes the layout...
  Flip solves this in three steps:

    1. const state = Flip.getState(targets); // photograph current positions
    2. ...change the DOM however you like (instant, no animation)...
    3. Flip.from(state, { duration: 0.7 });  // animate old layout -> new

  The name is the technique: First, Last, Invert, Play.

  YOUR TURN
  The shuffle is already written for you below (step 2) — it reorders the
  tiles instantly. Wrap it: photograph the state BEFORE the shuffle,
  Flip.from() it AFTER, and the jump becomes a smooth morph.

  DOCS  https://gsap.com/docs/v3/Plugins/Flip

  👉 TRY: stagger: 0.02 in the Flip.from() vars — the tiles cascade.
  👉 TRY: absolute: true — tiles can overlap mid-flight instead of
          pushing each other around.
  👉 TRY: the classic use case: between getState and Flip.from, toggle a
          class on the grid that changes grid-template-columns from 6 to
          2 — the whole layout morphs.
*/
const playFlip = () => {
  const grid = document.querySelector(".js-flip-grid");
  const items = gsap.utils.toArray(grid.children);

  // ✍️ step 1: photograph the current layout here

  // step 2 (done for you): shuffle the DOM order — without Flip this jumps.
  items
    .sort(() => Math.random() - 0.5)
    .forEach((item) => grid.appendChild(item));

  // ✍️ step 3: animate from the photographed layout here

};

// Plumbing (not part of the exercise): builds the numbered tiles at load.
const buildFlipGrid = () => {
  const grid = document.querySelector(".js-flip-grid");
  for (let i = 1; i <= 12; i++) {
    const tile = document.createElement("div");
    tile.className = "c-gsap__tile";
    tile.textContent = i;
    grid.appendChild(tile);
  }
};

// #endregion

// #region ***  Plumbing: replay buttons + init          ***********

// Every card's Replay button carries data-experiment="<key>"; this map
// routes each key to its exercise function above.
const experimentPlayers = {
  to: playTo,
  fromto: playFromTo,
  ease: playEase,
  stagger: playStagger,
  timeline: playTimeline,
  text: playText,
  flip: playFlip,
};

const listenToReplayButtons = () => {
  document.querySelectorAll(".js-replay").forEach((button) => {
    button.addEventListener("click", () => {
      experimentPlayers[button.dataset.experiment]();
    });
  });
};

const init = () => {
  buildStaggerGrid();
  buildFlipGrid();
  listenToReplayButtons();

  // The always-on exercises (no Replay button) initialize once, here:
  initQuickTo();
  initScrollTrigger();
  initDraggable();
};

document.addEventListener("DOMContentLoaded", init);

// #endregion
