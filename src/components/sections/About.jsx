import { useEffect, useRef, useState } from "react";

const CARD_BLUE = "#0c3fa5";

const highlights = [
  "GPA 3.70 / 4.00",
  "3rd Place BISTIK 2025",
  "General Treasurer HMTI",
];

const ribbonItems = ["Data Analyst", "Data Engineer", "Full Stack", "Open to Internship"];

export default function About() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let frame = 0;

    const check = () => {
      frame = 0;
      const section = sectionRef.current;
      const trigger = triggerRef.current;
      if (!section || !trigger) return;

      const vh = window.innerHeight;
      const s = section.getBoundingClientRect();
      const t = trigger.getBoundingClientRect();

      if (s.top >= vh || s.bottom <= 0) {
        // About fully off-screen: ready to replay
        setPlaying(false);
      } else if (t.top < vh * 0.55) {
        // Top of the card is in view: drop it
        setPlaying(true);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="grid-bg relative overflow-x-clip"
    >
      {/* Running ribbon at the top of About */}
      <div className="absolute inset-x-0 top-12 z-20 -rotate-[1.5deg] scale-x-110 overflow-hidden bg-lime-300 py-2 text-neutral-900 shadow-lg sm:py-2.5">
        <div className="marquee flex w-max whitespace-nowrap">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="flex shrink-0 items-center gap-4 pr-4 text-xs font-bold uppercase tracking-widest sm:gap-6 sm:pr-6 sm:text-sm"
            >
              {[...ribbonItems, ...ribbonItems].map((t, i) => (
                <span key={i} className="flex items-center gap-4 sm:gap-6">
                  {t}
                  <span aria-hidden>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Trigger marker: outside the keyed div, level with the card area */}
      <div
        ref={triggerRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-20 h-px"
      />

      {/* key changes => element is re-created => animations restart */}
      <div
        key={playing ? "on" : "off"}
        className={`relative mx-auto grid min-h-screen max-w-6xl content-start gap-10 px-6 pb-20 pt-20 md:grid-cols-2 md:gap-6 portrait:md:min-h-0 ${
          playing ? "" : "invisible"
        }`}
      >
        {/* Hanging ID card (left): clipped just below the ribbon */}
        <div className="self-start [clip-path:inset(10px_-200px_-200px_-200px)]">
          <div className="card-drop">
            <div className="mx-auto w-[300px] origin-top max-[350px]:scale-90">
              <div className="swing">
                {/* Yellow lanyard */}
                <div className="relative h-[170px]">
                  <div className="absolute inset-x-0 top-0 -bottom-6 overflow-hidden">
                    <span className="absolute bottom-6 left-1/2 h-[230px] w-7 -translate-x-1/2 origin-bottom -rotate-[8deg] bg-yellow-400" />
                    <span className="absolute bottom-6 left-1/2 h-[230px] w-7 -translate-x-1/2 origin-bottom rotate-[8deg] bg-yellow-400" />
                  </div>
                  <span className="absolute -bottom-4 left-1/2 z-10 h-11 w-6 -translate-x-1/2 rounded-md bg-neutral-300 shadow-md" />
                </div>

                {/* Card */}
                <div
                  className="relative overflow-hidden rounded-[22px] shadow-2xl"
                  style={{ backgroundColor: CARD_BLUE }}
                >
                  <div className="relative h-[304px] overflow-hidden">
                    <img
                      src="/id-card.jpg"
                      alt="Tsabita Keizya, Informatics Engineering student"
                      className="-mt-[34px] block w-full"
                    />
                    <span className="absolute left-5 top-5 text-sm font-semibold tracking-wide">
                      Portfolio 2026
                    </span>
                    <span className="absolute left-1/2 top-3 h-3 w-14 -translate-x-1/2 rounded-full bg-black/40" />
                  </div>

                  <div className="flex h-[120px] flex-col justify-between pl-5 pt-3">
                    <div>
                      <p className="text-xs tracking-[0.25em] text-white/70">
                        OPEN TO INTERNSHIP
                      </p>
                      <p className="mt-1 text-sm leading-snug text-white/90">
                        D-IV Informatics Engineering
                        <br />
                        Politeknik Negeri Malang
                      </p>
                    </div>
                    <div className="h-3 bg-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text (right) */}
        <div className="mx-auto flex w-full max-w-lg flex-col justify-center pt-4 md:mx-0 md:max-w-none md:self-center md:pl-4 md:pt-12 lg:pl-8">
          <h2 className="fade-up text-3xl font-extrabold leading-tight [animation-delay:300ms] sm:text-4xl lg:text-5xl">
            Hi, I'm Tsabita Keizya Vanya Putri.
          </h2>

          <p
            lang="en"
            className="fade-up mt-5 max-w-lg text-left leading-relaxed text-blue-50 [animation-delay:400ms] lg:text-justify lg:hyphens-auto"
          >
            Informatics Engineering student at Politeknik Negeri Malang,
            interested in{" "}
            <strong className="font-bold text-white">data analysis</strong>,{" "}
            <strong className="font-bold text-white">data engineering</strong>,
            and full stack development. I label datasets for a{" "}
            <strong className="font-bold text-white">computer vision</strong>{" "}
            research project and build web and mobile apps on SQL databases.
            Currently looking for a Data Analyst or Data Engineer internship.
          </p>

          <div className="fade-up mt-6 flex max-w-lg flex-wrap gap-2 [animation-delay:500ms]">
            {highlights.map((h) => (
              <span
                key={h}
                className="rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-medium text-blue-900"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}