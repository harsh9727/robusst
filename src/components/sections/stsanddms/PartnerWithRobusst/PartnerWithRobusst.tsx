"use client";

export default function PartnerWithRobusst() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl bg-[#0a0d18]">
        {/* Background accents */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="grid gap-12 px-10 py-16 md:grid-cols-2 md:px-16">
            {/* Left – Heading */}
            <div>
              <h2 className="text-4xl leading-tight font-extrabold md:text-5xl">
                <span className="text-pink-500">Partner with</span>
                <br />
                <span className="text-white">Robusst</span>
              </h2>

              <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500" />
            </div>

            {/* Right – Content */}
            <div>
              <p className="text-lg leading-relaxed text-gray-300">
                Scale faster and smarter with a partner who understands telecom
                distribution challenges. Contact the Robusst Sales Intelligence
                Team today for a personalized demo and roadmap.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button className="inline-flex items-center justify-center rounded-full bg-pink-500 px-10 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-pink-400 hover:shadow-[0_0_35px_rgba(236,72,153,0.6)]">
                  Request a Demo
                </button>

                <span className="text-sm text-gray-400">
                  No obligation • Personalized walkthrough
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
