import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CoordinatePlane } from "@/components/CoordinatePlane";
import { PageHero, Section, KeyList } from "@/components/Lesson";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities, Drills & Games — Coordinates Lesson" },
      {
        name: "description",
        content:
          "Interactive coordinate games: click-to-plot challenge, quadrant sprint, projection drill, midpoint challenge and a scored multiple-choice quiz.",
      },
      { property: "og:title", content: "Coordinates — Activities, Drills & Games" },
      {
        property: "og:description",
        content:
          "Practise plotting points, naming quadrants, projecting on the axes and finding midpoints with five interactive activities.",
      },
    ],
  }),
  component: ActivitiesPage,
});

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nonZero(range: number) {
  const v = randInt(-range, range);
  return v === 0 ? 1 : v;
}

function quadrantOf(x: number, y: number) {
  if (x === 0 && y === 0) return "The origin";
  if (x === 0) return "On the y-axis";
  if (y === 0) return "On the x-axis";
  if (x > 0 && y > 0) return "1st quadrant";
  if (x < 0 && y > 0) return "2nd quadrant";
  if (x < 0 && y < 0) return "3rd quadrant";
  return "4th quadrant";
}

/* ---------------- Activity 1: click to plot ---------------- */

function PlotGame() {
  const [target, setTarget] = useState(() => ({ x: nonZero(5), y: nonZero(5) }));
  const [picked, setPicked] = useState<{ x: number; y: number } | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const correct = picked && picked.x === target.x && picked.y === target.y;

  function handlePlot(p: { x: number; y: number }) {
    if (picked) return;
    setPicked(p);
    setScore((s) => ({
      right: s.right + (p.x === target.x && p.y === target.y ? 1 : 0),
      total: s.total + 1,
    }));
  }

  function next() {
    setPicked(null);
    setTarget({ x: nonZero(5), y: nonZero(5) });
  }

  return (
    <div className="surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold">Activity 1 — Click to Plot</h3>
        <span className="math text-xs text-muted-foreground">
          Score {score.right} / {score.total}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Click on the plane at the position of the point{" "}
        <span className="math text-foreground">
          ({target.x} , {target.y})
        </span>
        .
      </p>

      <div className="mt-4 grid gap-5 md:grid-cols-2 md:items-center">
        <CoordinatePlane
          range={6}
          onPlot={picked ? undefined : handlePlot}
          ariaLabel="Click the plane to plot the requested point"
          points={[
            ...(picked ? [{ ...picked, label: `you(${picked.x},${picked.y})`, tone: (correct ? "success" : "destructive") as const }] : []),
            ...(picked && !correct
              ? [{ ...target, label: `correct(${target.x},${target.y})`, tone: "accent" as const }]
              : []),
          ]}
        />
        <div className="space-y-3 text-sm">
          {!picked && <p className="text-muted-foreground">Move right/left for x, up/down for y.</p>}
          {picked && correct && (
            <p className="text-success">Correct! That is exactly ({target.x} , {target.y}).</p>
          )}
          {picked && !correct && (
            <p className="text-destructive">
              Not quite — you clicked ({picked.x} , {picked.y}). The orange point shows the right place.
            </p>
          )}
          {picked && (
            <button
              onClick={next}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Next point
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Activity 2: quadrant sprint ---------------- */

const quadrantOptions = [
  "1st quadrant",
  "2nd quadrant",
  "3rd quadrant",
  "4th quadrant",
  "On the x-axis",
  "On the y-axis",
];

function QuadrantSprint() {
  const [pt, setPt] = useState(() => ({ x: randInt(-6, 6), y: randInt(-6, 6) }));
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const truth = quadrantOf(pt.x, pt.y);

  function choose(opt: string) {
    if (answer) return;
    setAnswer(opt);
    setScore((s) => ({ right: s.right + (opt === truth ? 1 : 0), total: s.total + 1 }));
  }

  function next() {
    setAnswer(null);
    let p = { x: randInt(-6, 6), y: randInt(-6, 6) };
    if (p.x === 0 && p.y === 0) p = { x: 2, y: 3 };
    setPt(p);
  }

  return (
    <div className="surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold">Activity 2 — Quadrant Sprint</h3>
        <span className="math text-xs text-muted-foreground">
          Score {score.right} / {score.total}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Where is the point{" "}
        <span className="math text-foreground">
          ({pt.x} , {pt.y})
        </span>{" "}
        located?
      </p>

      <div className="mt-4 grid gap-5 md:grid-cols-2 md:items-center">
        <CoordinatePlane
          range={6}
          showQuadrantLabels
          points={answer ? [{ ...pt, label: `(${pt.x},${pt.y})`, tone: "accent" }] : []}
        />
        <div>
          <div className="grid grid-cols-2 gap-2">
            {quadrantOptions.map((opt) => {
              const state =
                !answer
                  ? "idle"
                  : opt === truth
                    ? "right"
                    : opt === answer
                      ? "wrong"
                      : "idle";
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  className={[
                    "rounded-md border px-3 py-2 text-left text-sm transition-colors",
                    state === "right"
                      ? "border-success bg-success/15 text-foreground"
                      : state === "wrong"
                        ? "border-destructive bg-destructive/10 text-foreground"
                        : "border-border bg-card hover:bg-secondary",
                  ].join(" ")}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {answer && (
            <button
              onClick={next}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Next point
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Activity 3: projection drill ---------------- */

function ProjectionDrill() {
  const [seg, setSeg] = useState(() => ({
    a: { x: nonZero(5), y: nonZero(5) },
    b: { x: nonZero(5), y: nonZero(5) },
  }));
  const [vx, setVx] = useState("");
  const [vy, setVy] = useState("");
  const [checked, setChecked] = useState(false);

  const lenX = Math.abs(seg.b.x - seg.a.x);
  const lenY = Math.abs(seg.b.y - seg.a.y);
  const okX = checked && Number(vx) === lenX;
  const okY = checked && Number(vy) === lenY;

  function next() {
    setChecked(false);
    setVx("");
    setVy("");
    setSeg({ a: { x: nonZero(5), y: nonZero(5) }, b: { x: nonZero(5), y: nonZero(5) } });
  }

  return (
    <div className="surface p-5">
      <h3 className="text-base font-semibold">Activity 3 — Projection Drill</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        For the segment AB with{" "}
        <span className="math text-foreground">
          A({seg.a.x} , {seg.a.y})
        </span>{" "}
        and{" "}
        <span className="math text-foreground">
          B({seg.b.x} , {seg.b.y})
        </span>
        , give the length of its projection on each axis.
      </p>

      <div className="mt-4 grid gap-5 md:grid-cols-2 md:items-center">
        <CoordinatePlane
          range={6}
          points={[
            { x: seg.a.x, y: seg.a.y, label: "A" },
            { x: seg.b.x, y: seg.b.y, label: "B" },
          ]}
          segments={[
            { from: seg.a, to: seg.b },
            { from: { x: seg.a.x, y: 0 }, to: { x: seg.b.x, y: 0 }, tone: "accent" },
            { from: { x: 0, y: seg.a.y }, to: { x: 0, y: seg.b.y }, tone: "success" },
            { from: seg.a, to: { x: seg.a.x, y: 0 }, dashed: true, tone: "accent" },
            { from: seg.b, to: { x: seg.b.x, y: 0 }, dashed: true, tone: "accent" },
          ]}
        />
        <div className="space-y-3 text-sm">
          <label className="block">
            <span className="text-muted-foreground">Length on the x-axis = |x₂ − x₁|</span>
            <input
              value={vx}
              onChange={(e) => setVx(e.target.value)}
              inputMode="numeric"
              className="math mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="block">
            <span className="text-muted-foreground">Length on the y-axis = |y₂ − y₁|</span>
            <input
              value={vy}
              onChange={(e) => setVy(e.target.value)}
              inputMode="numeric"
              className="math mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setChecked(true)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Check
            </button>
            <button
              onClick={next}
              className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              New segment
            </button>
          </div>
          {checked && (
            <p className={okX && okY ? "text-success" : "text-destructive"}>
              {okX && okY
                ? "Both projections are correct!"
                : `Correct answers: x-axis = ${lenX} units, y-axis = ${lenY} units.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Activity 4: midpoint challenge ---------------- */

function MidpointChallenge() {
  const [seg, setSeg] = useState(() => ({
    a: { x: randInt(-5, 5) * 2 === 0 ? 2 : randInt(-5, 5), y: randInt(-5, 5) },
    b: { x: randInt(-5, 5), y: randInt(-5, 5) },
  }));
  const [mx, setMx] = useState("");
  const [my, setMy] = useState("");
  const [checked, setChecked] = useState(false);

  const target = useMemo(
    () => ({ x: (seg.a.x + seg.b.x) / 2, y: (seg.a.y + seg.b.y) / 2 }),
    [seg],
  );
  const ok = checked && Number(mx) === target.x && Number(my) === target.y;

  function next() {
    setChecked(false);
    setMx("");
    setMy("");
    setSeg({
      a: { x: randInt(-5, 5), y: randInt(-5, 5) },
      b: { x: randInt(-5, 5), y: randInt(-5, 5) },
    });
  }

  return (
    <div className="surface p-5">
      <h3 className="text-base font-semibold">Activity 4 — Midpoint Challenge</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Find the midpoint M of the segment joining{" "}
        <span className="math text-foreground">
          A({seg.a.x} , {seg.a.y})
        </span>{" "}
        and{" "}
        <span className="math text-foreground">
          B({seg.b.x} , {seg.b.y})
        </span>
        . Decimals such as 2.5 are allowed.
      </p>

      <div className="mt-4 grid gap-5 md:grid-cols-2 md:items-center">
        <CoordinatePlane
          range={6}
          points={[
            { x: seg.a.x, y: seg.a.y, label: "A" },
            { x: seg.b.x, y: seg.b.y, label: "B" },
            ...(checked ? [{ x: target.x, y: target.y, label: "M", tone: "accent" as const }] : []),
          ]}
          segments={[{ from: seg.a, to: seg.b }]}
        />
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-muted-foreground">x of M</span>
              <input
                value={mx}
                onChange={(e) => setMx(e.target.value)}
                inputMode="decimal"
                className="math mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="block">
              <span className="text-muted-foreground">y of M</span>
              <input
                value={my}
                onChange={(e) => setMy(e.target.value)}
                inputMode="decimal"
                className="math mt-1 w-full rounded-md border border-input bg-card px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChecked(true)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Check
            </button>
            <button
              onClick={next}
              className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              New segment
            </button>
          </div>
          {checked && (
            <p className={ok ? "text-success" : "text-destructive"}>
              {ok
                ? "Correct — well done!"
                : `The midpoint is (${target.x} , ${target.y}).`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Activity 5: quiz ---------------- */

type Q = { q: string; options: string[]; answer: number; why: string };

const quiz: Q[] = [
  {
    q: "In which quadrant does the point (-7 , 3) lie?",
    options: ["1st quadrant", "2nd quadrant", "3rd quadrant", "4th quadrant"],
    answer: 1,
    why: "x is negative and y is positive, which describes the 2nd quadrant.",
  },
  {
    q: "The projection of the point (5 , -2) on the x-axis is:",
    options: ["(0 , -2)", "(5 , 0)", "(-5 , 0)", "(0 , 5)"],
    answer: 1,
    why: "Projecting on the x-axis keeps x and replaces y with 0.",
  },
  {
    q: "The projection of the point (5 , -2) on the y-axis is:",
    options: ["(0 , -2)", "(5 , 0)", "(0 , 2)", "(-2 , 0)"],
    answer: 0,
    why: "Projecting on the y-axis keeps y and replaces x with 0.",
  },
  {
    q: "The midpoint of the segment joining (2 , 6) and (8 , 2) is:",
    options: ["(10 , 8)", "(6 , 4)", "(5 , 4)", "(4 , 5)"],
    answer: 2,
    why: "x = (2+8)/2 = 5 and y = (6+2)/2 = 4.",
  },
  {
    q: "A point with coordinates (0 , -4) lies:",
    options: ["In the 3rd quadrant", "In the 4th quadrant", "On the x-axis", "On the y-axis"],
    answer: 3,
    why: "When x = 0 the point sits on the vertical axis, the y-axis.",
  },
  {
    q: "The length of the projection of AB on the x-axis, where A(-3 , 1) and B(4 , 5), is:",
    options: ["1 unit", "4 units", "7 units", "9 units"],
    answer: 2,
    why: "|4 − (−3)| = 7 units.",
  },
  {
    q: "M(1 , 0) is the midpoint of AB and A(-2 , 3). Then B is:",
    options: ["(4 , -3)", "(-5 , 3)", "(3 , -3)", "(0 , 3)"],
    answer: 0,
    why: "(-2 + x)/2 = 1 gives x = 4, and (3 + y)/2 = 0 gives y = -3.",
  },
  {
    q: "Which statement is always true?",
    options: [
      "(3 , 5) and (5 , 3) are the same point",
      "The origin is (1 , 1)",
      "Any point on the x-axis has y = 0",
      "A midpoint must have whole-number coordinates",
    ],
    answer: 2,
    why: "Every point lying on the x-axis has a y-coordinate equal to 0.",
  },
];

function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce<number>(
    (acc, a, i) => acc + (a === quiz[i].answer ? 1 : 0),
    0,
  );

  return (
    <div className="surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold">Activity 5 — Final Quiz</h3>
        {submitted && (
          <span className="math text-xs text-muted-foreground">
            Score {score} / {quiz.length}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Answer all eight questions, then submit to see your score and the explanations.
      </p>

      <ol className="mt-5 space-y-5">
        {quiz.map((item, qi) => (
          <li key={qi} className="rounded-lg border border-border p-4">
            <p className="text-sm font-medium">
              {qi + 1}. {item.q}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {item.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const state = !submitted
                  ? selected
                    ? "selected"
                    : "idle"
                  : oi === item.answer
                    ? "right"
                    : selected
                      ? "wrong"
                      : "idle";
                return (
                  <button
                    key={oi}
                    onClick={() => {
                      if (submitted) return;
                      setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)));
                    }}
                    className={[
                      "math rounded-md border px-3 py-2 text-left text-sm transition-colors",
                      state === "right"
                        ? "border-success bg-success/15"
                        : state === "wrong"
                          ? "border-destructive bg-destructive/10"
                          : state === "selected"
                            ? "border-accent bg-accent/15"
                            : "border-border bg-card hover:bg-secondary",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && <p className="mt-2 text-xs text-muted-foreground">{item.why}</p>}
          </li>
        ))}
      </ol>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setSubmitted(true)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Submit answers
        </button>
        <button
          onClick={() => {
            setAnswers(quiz.map(() => null));
            setSubmitted(false);
          }}
          className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Section 4"
        title="Activities, Drills & Games"
        intro="Practice is what turns a rule into a skill. Work through the five activities below: plot points by clicking, name quadrants against the clock, measure projections, compute midpoints, and finish with a scored quiz covering the whole lesson."
      />

      <Section title="How to use this section" kicker="Guide">
        <KeyList
          items={[
            "Activity 1 trains plotting: read the ordered pair, then click the exact spot.",
            "Activity 2 trains the sign rule for quadrants and the special cases on the axes.",
            "Activity 3 trains projections and the length |x₂ − x₁| and |y₂ − y₁|.",
            "Activity 4 trains the midpoint formula, including fractional answers.",
            "Activity 5 is a final quiz with explanations for every question.",
          ]}
        />
      </Section>

      <Section title="Interactive Activities" kicker="Play & learn">
        <PlotGame />
        <QuadrantSprint />
        <ProjectionDrill />
        <MidpointChallenge />
      </Section>

      <Section title="Assessment" kicker="Check your mastery">
        <Quiz />
      </Section>

      <Section title="Extra Written Exercises" kicker="Homework">
        <div className="surface p-5 text-sm">
          <ol className="space-y-2 text-muted-foreground">
            <li>1. Plot A(4 , 0), B(0 , -5), C(-3 , -3) and name the position of each.</li>
            <li>2. Find the projections of D(-6 , 2) on both axes.</li>
            <li>3. AB has A(-2 , 7) and B(6 , -1). Find the length of each projection.</li>
            <li>4. Find the midpoint of the segment joining (-9 , 4) and (3 , -10).</li>
            <li>5. M(-1 , 2) is the midpoint of PQ with P(3 , 5). Find Q.</li>
            <li>
              6. ABCD has A(-3 , 0), B(0 , 4), C(5 , 0), D(2 , -4). Show that the diagonals have the
              same midpoint.
            </li>
          </ol>
        </div>
      </Section>
    </>
  );
}
