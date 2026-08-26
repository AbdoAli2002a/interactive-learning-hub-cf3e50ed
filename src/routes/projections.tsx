import { createFileRoute } from "@tanstack/react-router";
import { CoordinatePlane } from "@/components/CoordinatePlane";
import { PageHero, Section, Rule, Example, KeyList, Formula } from "@/components/Lesson";

export const Route = createFileRoute("/projections")({
  head: () => ({
    meta: [
      { title: "Projections on the Coordinate Axes — Coordinates Lesson" },
      {
        name: "description",
        content:
          "Projection of a point and of a line segment on the x-axis and y-axis, the length of a projection, and fully worked examples.",
      },
      { property: "og:title", content: "Projections on the Coordinate Axes" },
      {
        property: "og:description",
        content:
          "Learn how points and line segments project onto the axes and how to compute the length of a projection.",
      },
    ],
  }),
  component: ProjectionsPage,
});

function ProjectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Section 2"
        title="Projections on the Coordinate Axes"
        intro="The projection of a point on an axis is the place where a perpendicular dropped from the point meets that axis — like the shadow of the point cast straight down (or straight across). Projecting a whole line segment simply means projecting both of its endpoints."
      />

      <Section title="Projection of a Point" kicker="Definition">
        <div className="grid gap-4 md:grid-cols-2">
          <Rule title="On the x-axis">
            <p className="math text-foreground">(x , y) → (x , 0)</p>
            <p>Keep the x-coordinate, replace the y-coordinate with 0.</p>
          </Rule>
          <Rule title="On the y-axis">
            <p className="math text-foreground">(x , y) → (0 , y)</p>
            <p>Keep the y-coordinate, replace the x-coordinate with 0.</p>
          </Rule>
        </div>

        <div className="surface p-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <CoordinatePlane
                range={6}
                points={[
                  { x: 3, y: 4, label: "A(3,4)" },
                  { x: 3, y: 0, label: "A'(3,0)", tone: "accent" },
                ]}
                segments={[{ from: { x: 3, y: 4 }, to: { x: 3, y: 0 }, dashed: true, tone: "accent" }]}
              />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Perpendicular to the x-axis gives A'(3 , 0).
              </p>
            </div>
            <div>
              <CoordinatePlane
                range={6}
                points={[
                  { x: 3, y: 4, label: "A(3,4)" },
                  { x: 0, y: 4, label: "A''(0,4)", tone: "success" },
                ]}
                segments={[{ from: { x: 3, y: 4 }, to: { x: 0, y: 4 }, dashed: true, tone: "success" }]}
              />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Perpendicular to the y-axis gives A''(0 , 4).
              </p>
            </div>
          </div>
        </div>

        <Rule title="Notice that">
          <KeyList
            items={[
              "If a point lies on an axis, its projection on that axis is the point itself, and its projection on the other axis is the origin.",
              "A(3 , 0) lies on the x-axis: its projection on the x-axis is A(3 , 0), and on the y-axis it is O(0 , 0).",
              "B(0 , -8) lies on the y-axis: its projection on the y-axis is B(0 , -8), and on the x-axis it is O(0 , 0).",
            ]}
          />
        </Rule>
      </Section>

      <Section title="Worked Example: Projecting Four Points" kicker="Example">
        <Example
          n="1"
          question="Plot A(-2 , 3), B(4 , -1), C(0 , -3), D(2 , 0), then find the projection of each point on both axes."
        >
          <CoordinatePlane
            range={6}
            points={[
              { x: -2, y: 3, label: "A" },
              { x: -2, y: 0, label: "A'", tone: "accent" },
              { x: 0, y: 3, label: "A''", tone: "success" },
              { x: 4, y: -1, label: "B" },
              { x: 4, y: 0, label: "B'", tone: "accent" },
              { x: 0, y: -1, label: "B''", tone: "success" },
            ]}
            segments={[
              { from: { x: -2, y: 3 }, to: { x: -2, y: 0 }, dashed: true, tone: "accent" },
              { from: { x: -2, y: 3 }, to: { x: 0, y: 3 }, dashed: true, tone: "success" },
              { from: { x: 4, y: -1 }, to: { x: 4, y: 0 }, dashed: true, tone: "accent" },
              { from: { x: 4, y: -1 }, to: { x: 0, y: -1 }, dashed: true, tone: "success" },
            ]}
          />
          <div className="math space-y-1 text-sm">
            <p>A(-2 , 3) → x-axis: A'(-2 , 0) · y-axis: A''(0 , 3)</p>
            <p>B(4 , -1) → x-axis: B'(4 , 0) · y-axis: B''(0 , -1)</p>
            <p>C(0 , -3) → x-axis: O(0 , 0) · y-axis: C(0 , -3) itself</p>
            <p>D(2 , 0) → x-axis: D(2 , 0) itself · y-axis: O(0 , 0)</p>
          </div>
        </Example>
      </Section>

      <Section title="Projection of a Line Segment" kicker="Definition">
        <p className="text-muted-foreground">
          The projection of a line segment on an axis is the projection of every one of its points
          on that axis. In practice: if A' is the projection of A and B' the projection of B, then
          A'B' is the projection of AB.
        </p>
        <Formula>
          Length of the projection on the x-axis = | x₂ − x₁ | · Length on the y-axis = | y₂ − y₁ |
        </Formula>
        <div className="grid gap-4 md:grid-cols-3">
          <Rule title="Rule 1">
            <p>The projection length is less than or equal to the length of the segment itself.</p>
          </Rule>
          <Rule title="Rule 2">
            <p>If the segment is parallel to an axis, its projection on that axis equals its own length.</p>
          </Rule>
          <Rule title="Rule 3">
            <p>If the segment is perpendicular to an axis, its projection on that axis is a single point (length 0).</p>
          </Rule>
        </div>
      </Section>

      <Section title="Worked Examples: Lengths of Projections" kicker="Examples">
        <Example n="2" question="Find the length of the projection of AB on the x-axis, where A(2 , 3) and B(-4 , -1).">
          <CoordinatePlane
            range={6}
            points={[
              { x: 2, y: 3, label: "A(2,3)" },
              { x: -4, y: -1, label: "B(-4,-1)" },
              { x: 2, y: 0, label: "A'", tone: "accent" },
              { x: -4, y: 0, label: "B'", tone: "accent" },
            ]}
            segments={[
              { from: { x: 2, y: 3 }, to: { x: -4, y: -1 } },
              { from: { x: 2, y: 3 }, to: { x: 2, y: 0 }, dashed: true, tone: "accent" },
              { from: { x: -4, y: -1 }, to: { x: -4, y: 0 }, dashed: true, tone: "accent" },
              { from: { x: -4, y: 0 }, to: { x: 2, y: 0 }, tone: "accent", label: "6 units" },
            ]}
          />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Project both endpoints onto the x-axis:</p>
            <p className="math text-foreground">A(2 , 3) → A'(2 , 0) , B(-4 , -1) → B'(-4 , 0)</p>
            <p>The projection is A'B', so its length is</p>
            <p className="math text-foreground">| -4 | + | 2 | = 6 length units</p>
            <p>Equivalently | x₂ − x₁ | = | 2 − (−4) | = 6.</p>
          </div>
        </Example>

        <Example n="3" question="Draw C(1 , 4) and D(5 , 1), then find the length of the projection of CD on the y-axis.">
          <CoordinatePlane
            range={6}
            points={[
              { x: 1, y: 4, label: "C(1,4)" },
              { x: 5, y: 1, label: "D(5,1)" },
              { x: 0, y: 4, label: "C'", tone: "success" },
              { x: 0, y: 1, label: "D'", tone: "success" },
            ]}
            segments={[
              { from: { x: 1, y: 4 }, to: { x: 5, y: 1 } },
              { from: { x: 1, y: 4 }, to: { x: 0, y: 4 }, dashed: true, tone: "success" },
              { from: { x: 5, y: 1 }, to: { x: 0, y: 1 }, dashed: true, tone: "success" },
              { from: { x: 0, y: 4 }, to: { x: 0, y: 1 }, tone: "success", label: "3 units" },
            ]}
          />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="math text-foreground">C(1 , 4) → C'(0 , 4) , D(5 , 1) → D'(0 , 1)</p>
            <p>Length of C'D' = | 4 | − | 1 | = <span className="math text-foreground">3 length units</span>.</p>
          </div>
        </Example>

        <Example n="4" question="Special cases: A(-4 , 3), B(-2 , 3) and then A(5 , 5), B(5 , -1).">
          <CoordinatePlane
            range={6}
            points={[
              { x: -4, y: 3, label: "A" },
              { x: -2, y: 3, label: "B" },
              { x: 5, y: 5, label: "A₂", tone: "success" },
              { x: 5, y: -1, label: "B₂", tone: "success" },
            ]}
            segments={[
              { from: { x: -4, y: 3 }, to: { x: -2, y: 3 } },
              { from: { x: -4, y: 0 }, to: { x: -2, y: 0 }, tone: "accent", label: "2" },
              { from: { x: 5, y: 5 }, to: { x: 5, y: -1 }, tone: "success" },
            ]}
          />
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              AB with A(-4 , 3), B(-2 , 3) is <strong className="text-foreground">parallel</strong> to
              the x-axis, so its projection there has the same length: | −2 − (−4) | = 2 units.
            </p>
            <p>
              A₂B₂ with A₂(5 , 5), B₂(5 , -1) is <strong className="text-foreground">perpendicular</strong>{" "}
              to the x-axis, so its projection on the x-axis is the single point (5 , 0) — length 0,
              while its projection on the y-axis has length | 5 − (−1) | = 6 units.
            </p>
          </div>
        </Example>
      </Section>

      <Section title="Try It Yourself" kicker="Your turn">
        <div className="surface p-5">
          <KeyList
            items={[
              "If A(-3 , 2) and B(4 , -4), find the length of the projection of AB on the x-axis and on the y-axis.",
              "Find the projection length on the x-axis for A(-2 , 1), B(3 , 6) and for A(-3 , 4), B(2 , 2).",
              "The projection of the point (a + 3 , a − 2) on the x-axis is the point itself. Find the point.",
              "A point projects to (3 , 0) on the x-axis and to (0 , −2) on the y-axis. What is the point?",
            ]}
          />
        </div>
      </Section>
    </>
  );
}
