import { BluetoothPanel } from "@/components/bluetooth-panel";
import { FeaturesGrid } from "@/components/features-grid";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%),linear-gradient(135deg,_#f8fbff_0%,_#f5f7fb_100%)] text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] dark:text-white">
      <div className="mx-auto flex max-w-7xl flex-col py-6 sm:py-8">
        <header className="flex items-center justify-between px-6 sm:px-8 lg:px-12">
          <div>
            <p className="text-xl font-semibold tracking-tight">Pulsentro</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Recovery, made calm and clear
            </p>
          </div>
          <div className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
            Open source • Web Bluetooth
          </div>
        </header>

        <HeroSection />
        <FeaturesGrid />

        <section id="recovery-dashboard" className="px-6 py-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600">
                  Recovery dashboard
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  A simple place to connect, observe, and reflect.
                </h2>
              </div>
              <div className="rounded-full border border-slate-200/80 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                Version 1 • Local session history
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <BluetoothPanel />

              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  Why this matters
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <li>• Recovery trends can reveal how your body responds after exercise.</li>
                  <li>• Clear visuals make it easier to notice patterns over time.</li>
                  <li>• The app is designed to be educational, not diagnostic.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
