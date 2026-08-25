import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="hero-surface border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-14">
        <p className="math text-xs uppercase tracking-[0.25em] opacity-70">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base opacity-85">{intro}</p>
      </div>
    </header>
  );
}

export function Section({
  id,
  title,
  kicker,
  children,
}: {
  id?: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-5 py-10">
      {kicker && <p className="math text-xs uppercase tracking-[0.2em] text-accent-foreground">{kicker}</p>}
      <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-5 text-[0.975rem] leading-relaxed">{children}</div>
    </section>
  );
}

export function Rule({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="surface p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-2 space-y-2 text-muted-foreground">{children}</div>
    </div>
  );
}

export function Formula({ children }: { children: ReactNode }) {
  return (
    <p className="math rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground">
      {children}
    </p>
  );
}

export function Example({
  n,
  question,
  children,
}: {
  n: string;
  question: string;
  children: ReactNode;
}) {
  return (
    <div className="surface overflow-hidden">
      <div className="flex items-baseline gap-3 border-b border-border bg-secondary/60 px-5 py-3">
        <span className="math rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
          Example {n}
        </span>
        <p className="text-sm font-medium">{question}</p>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-2 md:items-start">{children}</div>
    </div>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-2 text-sm text-muted-foreground">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="math mt-0.5 h-5 w-5 shrink-0 rounded-full bg-secondary text-center text-xs leading-5 text-secondary-foreground">
            {i + 1}
          </span>
          <span className="text-foreground/85">{it}</span>
        </li>
      ))}
    </ol>
  );
}

export function KeyList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-muted-foreground">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="text-foreground/85">{it}</span>
        </li>
      ))}
    </ul>
  );
}
