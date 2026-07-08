import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-slate-200">
            Open-source recovery insights for your heart health journey
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Understand your heart-rate recovery with calm, beautiful clarity.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Pulsentro helps you connect a compatible Bluetooth heart-rate monitor and visualize how your heart settles after exercise, all in a premium and easy-to-read experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#recovery-dashboard"
              className="rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Explore the dashboard
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white/70 p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-slate-800 to-slate-600 p-8 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
              Recovery snapshot
            </p>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-5xl font-semibold">72</p>
                <p className="mt-2 text-sm text-slate-300">beats per minute</p>
              </div>
              <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                Calm and steady
              </div>
            </div>
            <div className="mt-8 h-24 rounded-[1.25rem] border border-white/10 bg-white/10 p-4">
              <div className="flex h-full items-end gap-2">
                {[48, 58, 63, 72, 70, 68, 66].map((height) => (
                  <div
                    key={height}
                    className="flex-1 rounded-full bg-gradient-to-t from-sky-400 to-cyan-200"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
