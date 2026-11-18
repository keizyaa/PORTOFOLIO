import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ImageIcon, Mic, MousePointer2, Trophy } from "lucide-react";

const positions = [
  {
    file: "general-treasurer.fig",
    title: "General Treasurer",
    org: "Himpunan Mahasiswa Teknologi Informasi (HMTI)",
    period: "Mar 2026 – Present",
    points: [
      "Manage the budget and fund disbursement for the work programs of 5 departments.",
      "Prepare the association's financial reporting to the board and central finance.",
    ],
    tags: ["Budgeting", "Financial reporting"],
  },
  {
    file: "research-assistant.fig",
    title: "Research Assistant (Data Annotator)",
    org: "Lecturer Research Project: Vehicle Counting for Traffic Billboards",
    period: "May 2026 – Sep 2026",
    points: [
      "Labeled traffic footage images with Label Studio for a computer vision research project.",
      "Prepared labeled datasets used to train a Machine Learning model for counting vehicles.",
      "Helped the lecturer check and reformat IEIT papers.",
    ],
    tags: ["Label Studio", "Computer Vision", "Machine Learning"],
  },
  {
    file: "event-treasurer.fig",
    title: "Event Treasurer",
    org: "Semarak Pekan Olahraga (SPORTIF) HMTI",
    period: "Jul 2025 – Nov 2025",
    points: [
      "Prepared and managed an event budget totaling Rp15.000.000.",
      "Wrote the financial accountability report.",
    ],
    tags: ["Budgeting", "Accountability report"],
  },
];

const award = {
  title: "3rd Place BISTIK",
  category: "ICT Business Plan Competition",
  org: "Internal Competition, Politeknik Negeri Malang",
  period: "2025",
  note: "Won 3rd place in the ICT Business Plan Competition (BISTIK) at the Internal Competition of the Information Technology Department.",
  image: "/bistik.png",
};

const mc = {
  file: "master-of-ceremonies.fig",
  title: "Master of Ceremonies",
  event: "National Seminar x Workshop by NVIDIA",
  org: "Himpunan Mahasiswa Teknologi Informasi (HMTI), Politeknik Negeri Malang",
  period: "9 Nov 2025",
  theme:
    "Smart Solutions for a Sustainable Future Economy: Integrating Artificial Intelligence into the Modern Business World",
  points: [
    "Served as the Master of Ceremonies for the national seminar and workshop organized by HMTI.",
    "Guided the program flow and introduced the speakers, Fikri Ghifari (F&D Practitioner) and Esther Irawati (Professor at Institut STTS and Google Developer Expert in AI and Cloud).",
  ],
  tags: ["Public speaking", "Event hosting", "Communication"],
  image: "mc-seminar.jpg"
};

const tilts = ["-rotate-[1.5deg]", "rotate-[1deg]", "-rotate-[1deg]"];

const ribbonItems = [
  "Experience",
  "Achievements",
  "General Treasurer",
  "Research Assistant",
  "Master of Ceremonies",
  "3rd Place BISTIK",
];

const handle =
  "absolute h-3.5 w-3.5 bg-lime-300 opacity-0 transition group-hover:opacity-100";

const hoverCard =
  "group relative h-full cursor-pointer transition-transform duration-300 ease-out hover:z-20 hover:rotate-0 hover:scale-[1.05] active:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100";

function PositionCard({ item, tilt }) {
  return (
    <div className={`${hoverCard} ${tilt}`}>
      {/* Selection frame (shown on hover) */}
      <span className="pointer-events-none absolute -inset-2 border-2 border-lime-300 opacity-0 transition group-hover:opacity-100" />
      <span className={`${handle} -left-3.5 -top-3.5`} />
      <span className={`${handle} -right-3.5 -top-3.5`} />
      <span className={`${handle} -bottom-3.5 -left-3.5`} />
      <span className={`${handle} -bottom-3.5 -right-3.5`} />

      <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
        {/* Figma-style window bar */}
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 truncate text-xs text-neutral-500">{item.file}</span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="w-fit rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-neutral-900">
            {item.period}
          </span>

          <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-400">{item.org}</p>

          <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-neutral-200">
            {item.points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime-300" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Play animations when the section is visible, reset when it leaves the screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setPlaying(false);
        else if (entry.intersectionRatio >= 0.15) setPlaying(true);
      },
      { threshold: [0, 0.15] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-x-clip">
      {/* Transition ribbon from About: tilted and running the opposite way */}
      <div className="absolute inset-x-0 top-20 z-20 rotate-[1.5deg] scale-x-110 overflow-hidden bg-lime-300 py-2 text-neutral-900 shadow-lg sm:py-2.5">
        <div className="marquee-reverse flex w-max whitespace-nowrap">
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

      {/* key changes => element is re-created => animations restart */}
      <div
        key={playing ? "on" : "off"}
        className={`mx-auto max-w-6xl px-6 pb-24 pt-40 md:pb-32 md:pt-48 ${
          playing ? "" : "invisible"
        }`}
      >
        <h2 className="fade-up text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Experience
          <br />
          <span className="inline-block -rotate-[2deg] bg-lime-300 px-3 text-neutral-900">
            & Achievements.
          </span>
        </h2>

        {/* Row of three position cards */}
        <div className="mt-20 grid items-stretch gap-14 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {positions.map((item, i) => (
            <div
              key={item.title}
              className={`fade-up ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
              style={{ animationDelay: `${300 + i * 200}ms` }}
            >
              <p className="mb-4 text-xs font-semibold tracking-widest text-blue-100">
                {String(i + 1).padStart(2, "0")} / {i === 1 ? "RESEARCH" : "POSITION"}
              </p>
              <div className="h-[calc(100%-2.25rem)]">
                <PositionCard item={item} tilt={tilts[i]} />
              </div>
            </div>
          ))}
        </div>

      {/* Activity: MC at the national seminar */}
      <div className="fade-up mt-20" style={{ animationDelay: "800ms" }}>
        <p className="mb-4 text-xs font-semibold tracking-widest text-blue-100">
          04 / ACTIVITY
        </p>

        <div className="group relative transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100">
          {/* Selection frame (shown on hover) */}
          <span className="pointer-events-none absolute -inset-2 border-2 border-lime-300 opacity-0 transition group-hover:opacity-100" />
          <span className={`${handle} -left-3.5 -top-3.5`} />
          <span className={`${handle} -right-3.5 -top-3.5`} />
          <span className={`${handle} -bottom-3.5 -left-3.5`} />
          <span className={`${handle} -bottom-3.5 -right-3.5`} />

          <div className="relative overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
            {/* Figma-style window bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-3 truncate text-xs text-neutral-500">{mc.file}</span>
            </div>

            <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-5 md:gap-10 md:p-10">
              {/* Photo (top on mobile, right on desktop) */}
              <div className="md:order-2 md:col-span-3">
                <div className="rotate-2 rounded-lg bg-white p-2 shadow-xl transition duration-300 group-hover:rotate-0 motion-reduce:transition-none">
                  {mc.image ? (
                    <img
                      src={mc.image}
                      alt="Tsabita Keizya as Master of Ceremonies at the HMTI National Seminar x Workshop"
                      className="block h-auto w-full rounded"
                    />
                  ) : (
                    <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-2 rounded bg-neutral-100 text-neutral-400">
                      <ImageIcon size={32} />
                      <span className="text-xs font-semibold">MC photo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text */}
              <div className="md:order-1 md:col-span-2">
                <Mic size={30} className="text-lime-300" />

                <span className="mt-4 inline-block rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-neutral-900">
                  {mc.period}
                </span>

                <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">
                  {mc.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-neutral-200">{mc.event}</p>
                <p className="text-sm text-neutral-400">{mc.org}</p>
                <p className="mt-1 text-xs text-neutral-500">{mc.place}</p>

                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-neutral-200">
                  {mc.points.map((p, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-lime-300" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-xs italic leading-relaxed text-neutral-400">
                  Theme: {mc.theme}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {mc.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cursor label */}
          <div className="absolute -bottom-5 right-8 flex items-end gap-1">
            <MousePointer2 size={18} className="fill-orange-500 text-orange-500" />
            <span className="rounded-md bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white">
              Host
            </span>
          </div>
        </div>
      </div>

        {/* Achievement: wide card with certificate */}
        <div className="fade-up mt-20" style={{ animationDelay: "900ms" }}>
          <p className="mb-4 text-xs font-semibold tracking-widest text-blue-100">
            04 / ACHIEVEMENT
          </p>

          <div className="relative transition-transform duration-300 ease-out hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100">
            <div className="relative overflow-hidden rounded-2xl bg-lime-300 p-6 text-neutral-900 shadow-2xl sm:p-8 md:p-10">
              {/* Giant "3" as decoration */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-12 select-none text-[16rem] font-extrabold leading-none text-neutral-900/10"
              >
                3
              </span>

              <div className="relative grid items-center gap-8 md:grid-cols-5 md:gap-10">
                {/* Certificate (left) */}
                <a
                  href={award.image}
                  target="_blank"
                  rel="noreferrer"
                  className="group block md:col-span-3"
                  aria-label="Open the full certificate"
                >
                  <div className="-rotate-2 rounded-lg bg-white p-2 shadow-xl transition duration-300 group-hover:rotate-0 group-hover:scale-[1.03] motion-reduce:transition-none">
                    {award.image ? (
                      <img
                        src={award.image}
                        alt="Certificate: 3rd Place, ICT Business Plan Competition, Politeknik Negeri Malang 2025"
                        className="block h-auto w-full rounded"
                      />
                    ) : (
                      <div className="flex aspect-[1.414/1] w-full flex-col items-center justify-center gap-2 rounded bg-neutral-100 text-neutral-400">
                        <ImageIcon size={32} />
                        <span className="text-xs font-semibold">Certificate</span>
                      </div>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-neutral-800">
                    View full certificate <ArrowUpRight size={14} />
                  </span>
                </a>

                {/* Text (right) */}
                <div className="md:col-span-2">
                  <Trophy size={36} />

                  <span className="mt-5 inline-block rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                    {award.period}
                  </span>

                  <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                    {award.title}
                  </h3>
                  <p className="mt-1 font-semibold text-neutral-800">{award.category}</p>
                  <p className="text-sm text-neutral-700">{award.org}</p>
                  <p className="mt-5 leading-relaxed text-neutral-800">{award.note}</p>
                </div>
              </div>
            </div>

            {/* Cursor label */}
            <div className="absolute -bottom-5 right-8 flex items-end gap-1">
              <MousePointer2 size={18} className="fill-orange-500 text-orange-500" />
              <span className="rounded-md bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white">
                Achievement
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}