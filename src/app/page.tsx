export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1
        className="text-4xl font-bold tracking-tight"
        style={{ color: "var(--uniform)" }}
      >
        GuardTrack
      </h1>
      <p
        className="text-lg"
        style={{ color: "var(--uniform-secondary)" }}
      >
        E-learning platform voor beveiligers
      </p>
      <div className="flex gap-4">
        <div
          className="rounded-xl px-6 py-3 font-semibold text-white"
          style={{ backgroundColor: "var(--vest)" }}
        >
          Primaire Accent
        </div>
        <div
          className="rounded-xl border px-6 py-3 font-semibold"
          style={{
            borderColor: "var(--perimeter)",
            backgroundColor: "var(--briefing-elevated)",
            color: "var(--uniform)",
          }}
        >
          Kaart Oppervlak
        </div>
      </div>
    </main>
  );
}
