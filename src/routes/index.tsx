import { createFileRoute, Link } from "@tanstack/react-router";
import { CoordinatePlane } from "@/components/CoordinatePlane";
import { PageHero, Section, Rule, KeyList, Formula } from "@/components/Lesson";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coordinates — Lesson Eight: Plot, Project, Find Midpoints" },
      {
        name: "description",
        content:
          "A complete English guide to Lesson Eight: Coordinates — the coordinate plane, quadrants, projections on the axes, midpoints, plus activities and games.",
      },
      { property: "og:title", content: "Coordinates — Lesson Eight Study Site" },
      {
        property: "og:description",
        content:
          "Learn the coordinate plane, quadrants, projections and midpoints with diagrams, worked examples and interactive games.",
      },
    ],
  }),
  component: Index,
});

const outcomes = [
  "Plot a point on the coordinate plane.",
  "Determine the quadrant in which a point is located.",
  "Determine the projection of a point on the coordinate axes.",
  "Determine the projection of a line segment on the coordinate axes.",
  "Determine the coordinates of the midpoint of a line segment.",
];

const vocabulary = [
  ["x-axis", "The horizontal number line of the plane."],
  ["y-axis", "The vertical number line of the plane."],
  ["x-coordinate", "First number of an ordered pair: horizontal position."],
  ["y-coordinate", "Second number of an ordered pair: vertical position."],
  ["The origin point", "O (0 , 0) — where the two axes intersect."],
  ["Quadrants", "The four regions 1st, 2nd, 3rd and 4th formed by the axes."],
  ["Midpoint", "The point of a line segment equidistant from its two endpoints."],
];

const map = [
  {
    to: "/plotting-points" as const,
    title: "Plotting Points & Quadrants",
    text: "Ordered pairs, signs in each quadrant, points that lie on an axis.",
  },
  {
    to: "/projections" as const,
    title: "Projections on the Axes",
    text: "Projection of a point and of a line segment, and how to find its length.",
  },
  {
    to: "/midpoint" as const,
    title: "Midpoint of a Line Segment",
    text: "The midpoint formula, missing endpoints, and quadrilateral proofs.",
  },
  {
    to: "/activities" as const,
    title: "Activities, Drills & Games",
    text: "Click-to-plot game, quadrant sprint, midpoint challenge and a full quiz.",
  },
];

function Index() {
  return (
    <>
      <PageHero
        eyebrow="Lesson Eight · Unit 3: Geometry and Measurement"
        title="Coordinates"
        intro="Every location on a map, a screen or a game board is described by a pair of numbers. This lesson explains the coordinate plane step by step in English: how to plot points, name quadrants, project points and segments onto the axes, and compute midpoints — with diagrams, worked examples and practice games."
      />

      <Section title="Learning Outcomes" kicker="Start here">
        <div className="grid gap-5 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div className="surface p-5">
            <KeyList items={outcomes} />
            <Link
              to="/plotting-points"
              className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Begin the lesson
            </Link>
          </div>
          <div className="surface p-4">
            <CoordinatePlane
              range={6}
              showQuadrantLabels
              points={[
                { x: 4, y: 3, label: "A(4,3)" },
                { x: -3, y: 2, label: "B(-3,2)", tone: "accent" },
                { x: -4, y: -3, label: "C(-4,-3)", tone: "success" },
                { x: 3, y: -4, label: "D(3,-4)", tone: "destructive" },
              ]}
            />
            <p className="mt-2 text-center text-xs text-muted-foreground">
              One point in each of the four quadrants.
            </p>
          </div>
        </div>
      </Section>

      <Section title="The Coordinate Plane in One Minute" kicker="Big idea">
        <div className="grid gap-4 md:grid-cols-3">
          <Rule title="Two axes, one origin">
            <p>
              The x-axis and the y-axis are perpendicular number lines meeting at the origin
              O (0 , 0). Together they form the coordinate plane.
            </p>
          </Rule>
          <Rule title="Ordered pairs">
            <p>
              A point is written as (x , y). The order matters: (3 , 5) and (5 , 3) are two
              different points.
            </p>
          </Rule>
          <Rule title="Signs decide the quadrant">
            <p>
              Reading the signs of x and y tells you instantly which quadrant contains the point,
              or whether it lies on an axis.
            </p>
          </Rule>
        </div>
        <Formula>
          Midpoint of AB, where A(x₁ , y₁) and B(x₂ , y₂) : M = ( (x₁ + x₂)/2 , (y₁ + y₂)/2 )
        </Formula>
      </Section>

      <Section title="Lesson Map" kicker="Navigate">
        <div className="grid gap-4 sm:grid-cols-2">
          {map.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="surface block p-5 transition-transform hover:-translate-y-0.5"
            >
              <h3 className="font-semibold">{m.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Vocabulary" kicker="Reference">
        <dl className="surface divide-y divide-border">
          {vocabulary.map(([term, def]) => (
            <div key={term} className="grid gap-1 px-5 py-3 sm:grid-cols-[180px_1fr]">
              <dt className="math text-sm font-semibold">{term}</dt>
              <dd className="text-sm text-muted-foreground">{def}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
