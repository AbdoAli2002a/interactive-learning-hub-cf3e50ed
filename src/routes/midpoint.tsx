import { createFileRoute, Link } from "@tanstack/react-router";
import { CoordinatePlane } from "@/components/CoordinatePlane";
import { PageHero, Section, Rule, Example, Steps, KeyList, Formula } from "@/components/Lesson";

export const Route = createFileRoute("/midpoint")({
  head: () => ({
    meta: [
      { title: "Midpoint of a Line Segment — Coordinates Lesson" },
      {
        name: "description",
        content:
          "The midpoint formula explained in English: find the midpoint of a segment, recover a missing endpoint, and use diagonals of parallelograms, with worked examples and diagrams.",
      },
      { property: "og:title", content: "Midpoint of a Line Segment" },
      {
        property: "og:description",
        content:
          "Learn the midpoint formula M = ((x₁+x₂)/2 , (y₁+y₂)/2) with step-by-step examples, diagrams and practice.",
      },
    ],
  }),
  component: MidpointPage,
});

function MidpointPage() {
  return (
    <>
      <PageHero
        eyebrow="Section 3"
        title="The Midpoint of a Line Segment"
        intro="The midpoint of a line segment is the point that lies on the segment and is equidistant from its two endpoints. On the coordinate plane you do not need a ruler: the midpoint is simply the average of the two x-coordinates and the average of the two y-coordinates."
      />

      <Section title="The Midpoint Formula" kicker="Definition">
        <Formula>
          If A(x₁ , y₁) and B(x₂ , y₂), then the midpoint M of AB is M = ( (x₁ + x₂)/2 , (y₁ + y₂)/2 )
        </Formula>

        <div className="grid gap-4 md:grid-cols-3">
          <Rule title="Average the x's">
            <p>Add the two x-coordinates and divide by 2. This gives the horizontal position of M.</p>
          </Rule>
          <Rule title="Average the y's">
            <p>Add the two y-coordinates and divide by 2. This gives the vertical position of M.</p>
          </Rule>
          <Rule title="Order does not matter">
            <p>
              Addition is commutative, so starting from A or from B gives exactly the same midpoint.
            </p>
          </Rule>
        </div>

        <div className="surface p-4">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <CoordinatePlane
              range={6}
              points={[
                { x: -4, y: -2, label: "A(-4,-2)" },
                { x: 2, y: 4, label: "B(2,4)" },
                { x: -1, y: 1, label: "M(-1,1)", tone: "accent" },
              ]}
              segments={[{ from: { x: -4, y: -2 }, to: { x: 2, y: 4 } }]}
            />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="math text-foreground">x = (-4 + 2) / 2 = -2 / 2 = -1</p>
              <p className="math text-foreground">y = (-2 + 4) / 2 = 2 / 2 = 1</p>
              <p>
                So M(-1 , 1). Notice that M is exactly halfway along the drawn segment: the distance
                from A to M equals the distance from M to B.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Worked Examples" kicker="Practice with me">
        <Example n="1" question="Find the midpoint of the segment joining A(3 , 5) and B(7 , 1).">
          <Steps
            items={[
              "Write the formula: M = ( (x₁ + x₂)/2 , (y₁ + y₂)/2 ).",
              "Substitute: M = ( (3 + 7)/2 , (5 + 1)/2 ).",
              "Simplify: M = ( 10/2 , 6/2 ).",
              "Answer: M(5 , 3).",
            ]}
          />
          <CoordinatePlane
            range={8}
            points={[
              { x: 3, y: 5, label: "A(3,5)" },
              { x: 7, y: 1, label: "B(7,1)" },
              { x: 5, y: 3, label: "M(5,3)", tone: "accent" },
            ]}
            segments={[{ from: { x: 3, y: 5 }, to: { x: 7, y: 1 } }]}
          />
        </Example>

        <Example
          n="2"
          question="M(2 , -1) is the midpoint of AB, and A(-3 , 4). Find the coordinates of B."
        >
          <Steps
            items={[
              "The midpoint of the x's gives: (-3 + x₂)/2 = 2.",
              "Multiply both sides by 2: -3 + x₂ = 4, so x₂ = 7.",
              "The midpoint of the y's gives: (4 + y₂)/2 = -1.",
              "Multiply both sides by 2: 4 + y₂ = -2, so y₂ = -6.",
              "Answer: B(7 , -6).",
            ]}
          />
          <CoordinatePlane
            range={8}
            points={[
              { x: -3, y: 4, label: "A(-3,4)" },
              { x: 2, y: -1, label: "M(2,-1)", tone: "accent" },
              { x: 7, y: -6, label: "B(7,-6)", tone: "success" },
            ]}
            segments={[{ from: { x: -3, y: 4 }, to: { x: 7, y: -6 } }]}
          />
        </Example>

        <Example
          n="3"
          question="A segment has endpoints on the axes: A(0 , 6) and B(-8 , 0). Find its midpoint."
        >
          <Steps
            items={[
              "x = (0 + (-8)) / 2 = -8/2 = -4.",
              "y = (6 + 0) / 2 = 6/2 = 3.",
              "Answer: M(-4 , 3) — it lies in the 2nd quadrant.",
            ]}
          />
          <CoordinatePlane
            range={9}
            points={[
              { x: 0, y: 6, label: "A(0,6)" },
              { x: -8, y: 0, label: "B(-8,0)" },
              { x: -4, y: 3, label: "M(-4,3)", tone: "accent" },
            ]}
            segments={[{ from: { x: 0, y: 6 }, to: { x: -8, y: 0 } }]}
          />
        </Example>
      </Section>

      <Section title="Midpoints and Quadrilaterals" kicker="Application">
        <p className="text-muted-foreground">
          In a parallelogram (and therefore in a rectangle, a rhombus and a square) the two diagonals
          bisect each other. That means the two diagonals share the same midpoint — a very useful test.
        </p>

        <div className="surface p-4">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <CoordinatePlane
              range={7}
              points={[
                { x: -4, y: 1, label: "A(-4,1)" },
                { x: 0, y: 4, label: "B(0,4)" },
                { x: 4, y: 1, label: "C(4,1)" },
                { x: 0, y: -2, label: "D(0,-2)" },
                { x: 0, y: 1, label: "M(0,1)", tone: "accent" },
              ]}
              segments={[
                { from: { x: -4, y: 1 }, to: { x: 0, y: 4 } },
                { from: { x: 0, y: 4 }, to: { x: 4, y: 1 } },
                { from: { x: 4, y: 1 }, to: { x: 0, y: -2 } },
                { from: { x: 0, y: -2 }, to: { x: -4, y: 1 } },
                { from: { x: -4, y: 1 }, to: { x: 4, y: 1 }, dashed: true, tone: "accent" },
                { from: { x: 0, y: 4 }, to: { x: 0, y: -2 }, dashed: true, tone: "accent" },
              ]}
            />
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="math text-foreground">
                Midpoint of AC = ( (-4 + 4)/2 , (1 + 1)/2 ) = (0 , 1)
              </p>
              <p className="math text-foreground">
                Midpoint of BD = ( (0 + 0)/2 , (4 + (-2))/2 ) = (0 , 1)
              </p>
              <p>
                The diagonals AC and BD have the same midpoint (0 , 1), so ABCD is a parallelogram.
                Here the diagonals are also perpendicular, so ABCD is in fact a rhombus.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Special Cases & Tips" kicker="Remember">
        <KeyList
          items={[
            "A horizontal segment (same y for both endpoints) keeps that y: only the x is averaged.",
            "A vertical segment (same x for both endpoints) keeps that x: only the y is averaged.",
            "The midpoint may have a fraction: A(1 , 2) and B(4 , 3) give M(2.5 , 2.5). This is correct — the midpoint does not have to be a lattice point.",
            "Always divide by 2 at the end; a common mistake is to report the sum instead of the average.",
            "If the midpoint is the origin (0 , 0), the two endpoints are opposites: B = (-x₁ , -y₁).",
          ]}
        />
      </Section>

      <Section title="Quick Check" kicker="Before you move on">
        <div className="surface p-5">
          <ol className="space-y-3 text-sm">
            <li>
              <span className="text-foreground">1.</span> Find the midpoint of A(-6 , 2) and B(2 , 8).{" "}
              <span className="math text-muted-foreground">Answer: (-2 , 5)</span>
            </li>
            <li>
              <span className="text-foreground">2.</span> M(0 , 3) is the midpoint of CD with C(-5 , 1).
              Find D. <span className="math text-muted-foreground">Answer: (5 , 5)</span>
            </li>
            <li>
              <span className="text-foreground">3.</span> Find the midpoint of the segment joining
              (7 , -4) and (7 , 10).{" "}
              <span className="math text-muted-foreground">Answer: (7 , 3)</span>
            </li>
          </ol>
          <Link
            to="/activities"
            className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to Activities & Games
          </Link>
        </div>
      </Section>
    </>
  );
}
