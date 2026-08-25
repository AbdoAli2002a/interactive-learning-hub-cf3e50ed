import { createFileRoute } from "@tanstack/react-router";
import { CoordinatePlane } from "@/components/CoordinatePlane";
import { PageHero, Section, Rule, Example, Steps, KeyList } from "@/components/Lesson";

export const Route = createFileRoute("/plotting-points")({
  head: () => ({
    meta: [
      { title: "Plotting Points & Quadrants — Coordinates Lesson" },
      {
        name: "description",
        content:
          "How to plot ordered pairs on the coordinate plane and decide the quadrant of a point from the signs of x and y, with worked examples.",
      },
      { property: "og:title", content: "Plotting Points & Quadrants" },
      {
        property: "og:description",
        content: "Plot ordered pairs and identify quadrants with clear diagrams and examples.",
      },
    ],
  }),
  component: PlottingPage,
});

const quadrantRows = [
  ["1st quadrant", "x > 0", "y > 0", "(4 , 3)"],
  ["2nd quadrant", "x < 0", "y > 0", "(-3 , 2)"],
  ["3rd quadrant", "x < 0", "y < 0", "(-4 , -3)"],
  ["4th quadrant", "x > 0", "y < 0", "(3 , -4)"],
];

function PlottingPage() {
  return (
    <>
      <PageHero
        eyebrow="Section 1"
        title="Plotting Points & Quadrants"
        intro="A point is described by an ordered pair (x , y): move x units horizontally from the origin, then y units vertically. The signs of the two coordinates place the point in exactly one quadrant — unless one coordinate is zero, in which case the point sits on an axis."
      />

      <Section title="How to Plot a Point" kicker="Method">
        <div className="grid gap-5 md:grid-cols-2 md:items-start">
          <div className="surface p-5">
            <Steps
              items={[
                "Start at the origin O (0 , 0).",
                "Read the x-coordinate: move right if positive, left if negative.",
                "Read the y-coordinate: move up if positive, down if negative.",
                "Mark the point with a dot and label it with its capital letter and coordinates.",
              ]}
            />
          </div>
          <div className="surface p-4">
            <CoordinatePlane
              range={6}
              points={[{ x: 4, y: 3, label: "A(4,3)" }]}
              segments={[
                { from: { x: 0, y: 0 }, to: { x: 4, y: 0 }, dashed: true, tone: "accent", label: "4 right" },
                { from: { x: 4, y: 0 }, to: { x: 4, y: 3 }, dashed: true, tone: "accent", label: "3 up" },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section title="The Four Quadrants" kicker="Signs">
        <div className="surface overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left">
              <tr>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">x</th>
                <th className="px-4 py-3">y</th>
                <th className="px-4 py-3">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {quadrantRows.map((r) => (
                <tr key={r[0]}>
                  <td className="px-4 py-3 font-medium">{r[0]}</td>
                  <td className="math px-4 py-3 text-muted-foreground">{r[1]}</td>
                  <td className="math px-4 py-3 text-muted-foreground">{r[2]}</td>
                  <td className="math px-4 py-3">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <KeyList
          items={[
            "A point of the form (a , 0) lies on the x-axis; a point of the form (0 , b) lies on the y-axis. Points on an axis belong to no quadrant.",
            "If x·y > 0 the point is in the 1st or 3rd quadrant; if x·y < 0 it is in the 2nd or 4th quadrant.",
            "The origin O (0 , 0) is the only point lying on both axes.",
          ]}
        />
      </Section>

      <Section title="Worked Examples" kicker="Practice with solutions">
        <Example n="1" question="Plot A(-2 , 3), B(4 , -1), C(0 , -3) and D(2 , 0) and name the position of each.">
          <CoordinatePlane
            range={6}
            showQuadrantLabels
            points={[
              { x: -2, y: 3, label: "A(-2,3)" },
              { x: 4, y: -1, label: "B(4,-1)", tone: "accent" },
              { x: 0, y: -3, label: "C(0,-3)", tone: "success" },
              { x: 2, y: 0, label: "D(2,0)", tone: "destructive" },
            ]}
          />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><span className="math text-foreground">A(-2 , 3)</span> — x is negative, y is positive → 2nd quadrant.</p>
            <p><span className="math text-foreground">B(4 , -1)</span> — x is positive, y is negative → 4th quadrant.</p>
            <p><span className="math text-foreground">C(0 , -3)</span> — x = 0 → lies on the y-axis (below the origin).</p>
            <p><span className="math text-foreground">D(2 , 0)</span> — y = 0 → lies on the x-axis (right of the origin).</p>
          </div>
        </Example>

        <Example n="2" question="If a > 0, in which quadrant does the point (-2a , a + 1) lie?">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Test the sign of each coordinate using a &gt; 0:</p>
            <p className="math text-foreground">-2a &lt; 0 (negative) , a + 1 &gt; 0 (positive)</p>
            <p>A negative x with a positive y means the point lies in the <strong className="text-foreground">2nd quadrant</strong>, for every positive value of a.</p>
          </div>
          <CoordinatePlane
            range={6}
            points={[
              { x: -2, y: 2, label: "a = 1" },
              { x: -4, y: 3, label: "a = 2", tone: "accent" },
              { x: -6, y: 4, label: "a = 3", tone: "success" },
            ]}
          />
        </Example>

        <Example n="3" question="The point A(4k + 4 , -k + 3) lies on the y-axis. Where is B(-2k , 4k + 1)?">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>A point on the y-axis has x = 0:</p>
            <p className="math text-foreground">4k + 4 = 0 → 4k = -4 → k = -1</p>
            <p>Substitute k = -1 into B:</p>
            <p className="math text-foreground">B(-2(-1) , 4(-1) + 1) = B(2 , -3)</p>
            <p>x positive, y negative → B lies in the <strong className="text-foreground">4th quadrant</strong>.</p>
          </div>
          <CoordinatePlane
            range={6}
            showQuadrantLabels
            points={[
              { x: 0, y: 4, label: "A(0,4)" },
              { x: 2, y: -3, label: "B(2,-3)", tone: "destructive" },
            ]}
          />
        </Example>
      </Section>

      <Section title="Try It Yourself" kicker="Your turn">
        <div className="surface p-5">
          <KeyList
            items={[
              "Plot A(3 , 5), B(-2 , -4), C(0 , 5) and D(5 , 0) and state the position of each.",
              "The point (| -5 | , (-2)²) lies in which quadrant?",
              "A teacher asks about (x , y) where x·y < 0. Ahmed says 2nd quadrant, Hend says 4th quadrant — who is correct?",
              "If A(-3k , 2k - 4) lies on the x-axis, determine the quadrant of B(k - 6 , -3k).",
            ]}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Answers: 1st / on the y-axis / on the x-axis appear in the Activities section, where you
            can also check your plotting by clicking on a live grid.
          </p>
        </div>
      </Section>
    </>
  );
}
