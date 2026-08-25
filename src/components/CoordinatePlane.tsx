import { useMemo } from "react";

export type Pt = { x: number; y: number; label?: string; tone?: "primary" | "accent" | "success" | "destructive" };
export type Seg = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  dashed?: boolean;
  tone?: "primary" | "accent" | "success" | "destructive";
};

const toneColor = {
  primary: "var(--chart-1)",
  accent: "var(--chart-2)",
  success: "var(--chart-3)",
  destructive: "var(--chart-4)",
} as const;

type Props = {
  range?: number;
  points?: Pt[];
  segments?: Seg[];
  showQuadrantLabels?: boolean;
  size?: number;
  className?: string;
  onPlot?: (p: { x: number; y: number }) => void;
  ariaLabel?: string;
};

export function CoordinatePlane({
  range = 6,
  points = [],
  segments = [],
  showQuadrantLabels = false,
  size = 340,
  className = "",
  onPlot,
  ariaLabel = "Coordinate plane",
}: Props) {
  const unit = size / (range * 2);
  const sx = (x: number) => size / 2 + x * unit;
  const sy = (y: number) => size / 2 - y * unit;

  const ticks = useMemo(
    () => Array.from({ length: range * 2 + 1 }, (_, i) => i - range),
    [range],
  );

  function handleClick(e: React.MouseEvent<SVGSVGElement>) {
    if (!onPlot) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * size;
    const py = ((e.clientY - rect.top) / rect.height) * size;
    const x = Math.round((px - size / 2) / unit);
    const y = Math.round((size / 2 - py) / unit);
    if (Math.abs(x) > range || Math.abs(y) > range) return;
    onPlot({ x, y });
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={`w-full max-w-full rounded-lg bg-card ${onPlot ? "cursor-crosshair" : ""} ${className}`}
    >
      {ticks.map((t) => (
        <g key={`g${t}`}>
          <line x1={sx(t)} y1={0} x2={sx(t)} y2={size} stroke="var(--grid)" strokeWidth={1} />
          <line x1={0} y1={sy(t)} x2={size} y2={sy(t)} stroke="var(--grid)" strokeWidth={1} />
        </g>
      ))}

      {showQuadrantLabels && (
        <g fill="var(--muted-foreground)" fontSize={11} fontFamily="var(--font-sans)">
          <text x={size - 34} y={18}>1st (+,+)</text>
          <text x={8} y={18}>2nd (−,+)</text>
          <text x={8} y={size - 8}>3rd (−,−)</text>
          <text x={size - 34} y={size - 8}>4th (+,−)</text>
        </g>
      )}

      <line x1={0} y1={sy(0)} x2={size} y2={sy(0)} stroke="var(--axis)" strokeWidth={1.6} />
      <line x1={sx(0)} y1={0} x2={sx(0)} y2={size} stroke="var(--axis)" strokeWidth={1.6} />
      <text x={size - 12} y={sy(0) - 6} fontSize={12} fill="var(--axis)" fontFamily="var(--font-mono)">x</text>
      <text x={sx(0) + 6} y={12} fontSize={12} fill="var(--axis)" fontFamily="var(--font-mono)">y</text>

      {ticks
        .filter((t) => t !== 0 && t % 2 === 0)
        .map((t) => (
          <g key={`t${t}`} fontSize={9} fill="var(--muted-foreground)" fontFamily="var(--font-mono)">
            <text x={sx(t) - 4} y={sy(0) + 12}>{t}</text>
            <text x={sx(0) + 5} y={sy(t) + 3}>{t}</text>
          </g>
        ))}

      {segments.map((s, i) => (
        <g key={`s${i}`}>
          <line
            x1={sx(s.from.x)}
            y1={sy(s.from.y)}
            x2={sx(s.to.x)}
            y2={sy(s.to.y)}
            stroke={toneColor[s.tone ?? "primary"]}
            strokeWidth={2.4}
            strokeDasharray={s.dashed ? "5 4" : undefined}
            strokeLinecap="round"
          />
          {s.label && (
            <text
              x={(sx(s.from.x) + sx(s.to.x)) / 2 + 6}
              y={(sy(s.from.y) + sy(s.to.y)) / 2 - 6}
              fontSize={11}
              fill={toneColor[s.tone ?? "primary"]}
              fontFamily="var(--font-mono)"
            >
              {s.label}
            </text>
          )}
        </g>
      ))}

      {points.map((p, i) => (
        <g key={`p${i}`}>
          <circle cx={sx(p.x)} cy={sy(p.y)} r={4.5} fill={toneColor[p.tone ?? "primary"]} />
          {p.label && (
            <text
              x={sx(p.x) + 8}
              y={sy(p.y) - 8}
              fontSize={11}
              fill={toneColor[p.tone ?? "primary"]}
              fontFamily="var(--font-mono)"
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
