const features = [
  {
    title: "Connect in seconds",
    description:
      "Use the Web Bluetooth API to pair with compatible heart-rate wearables directly from your browser.",
  },
  {
    title: "See recovery clearly",
    description:
      "Track the shift from exercise to rest with graceful graphs that make trends easier to understand.",
  },
  {
    title: "Save your sessions",
    description:
      "Keep your improvement visible over time with local session history built for version one.",
  },
  {
    title: "Learn safely",
    description:
      "Every insight is educational and informational only, so the experience stays helpful without crossing into medical advice.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="px-6 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600">
            Designed around recovery
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            A calm product for understanding your cardiovascular recovery.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.25rem] border border-slate-200/70 bg-slate-50/80 p-5 transition hover:-translate-y-1 hover:bg-white dark:border-slate-800 dark:bg-slate-950/60 dark:hover:bg-slate-900"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
