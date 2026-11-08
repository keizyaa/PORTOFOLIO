import { useEffect, useRef, useState } from "react";
import { MousePointer2, Trophy } from "lucide-react";

// GANTI org, period, dan points sesuai pengalaman aslimu.
const role = {
  title: "Bendahara Umum",
  org: "Himpunan Mahasiswa Teknologi Informasi (HMTI)",
  period: "Mar 2026 – Sekarang",
  points: [
    "Mengelola anggaran dan pencairan dana program kerja 5 departemen.",
    "Menyusun pelaporan keuangan himpunan kepada pengurus serta keuangan pusat.",
  ],
  tags: ["Anggaran", "Pelaporan keuangan", "5 departemen"],
};

const award = {
  title: "Juara 3 Intercomp",
  org: "Internal Competition HMTI, Politeknik Negeri Malang",
  period: "2025",
  note: "Meraih juara 3 pada cabang Lomba Bisnis Bidang TIK (BISTIK) di Internal Competition HMTI.",
};

const ribbonItems = ["Pengalaman", "Prestasi", "Bendahara Umum", "Juara 3 Intercomp"];

const handle = "absolute h-3.5 w-3.5 bg-lime-300";

const hoverCard =
  "relative h-full cursor-pointer transition-transform duration-300 ease-out hover:z-20 hover:rotate-0 hover:scale-[1.05] active:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100";

export default function Experience() {
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Putar animasi saat section terlihat, reset saat keluar layar
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
      {/* Pita transisi dari About: miring sebaliknya, jalan ke arah sebaliknya */}
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

      {/* key berubah => elemen dibuat ulang => animasi mulai dari awal */}
      <div
        key={playing ? "on" : "off"}
        className={`mx-auto max-w-5xl px-6 pb-24 pt-40 md:pb-32 md:pt-48 ${
          playing ? "" : "invisible"
        }`}
      >
        <h2 className="fade-up text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Pengalaman
          <br />
          <span className="inline-block -rotate-[2deg] bg-lime-300 px-3 text-neutral-900">
            & Prestasi.
          </span>
        </h2>

        <div className="mt-20 grid items-stretch gap-14 md:grid-cols-2 md:gap-16">
          {/* Frame 1: jabatan */}
          <div className="fade-up" style={{ animationDelay: "300ms" }}>
            <p className="mb-4 text-xs font-semibold tracking-widest text-blue-100">
              01 / JABATAN
            </p>

            <div className="h-[calc(100%-2.25rem)]">
              <div className={`${hoverCard} -rotate-[1.5deg]`}>
                {/* Bingkai seleksi */}
                <span className="pointer-events-none absolute -inset-2 border-2 border-lime-300" />
                <span className={`${handle} -left-3.5 -top-3.5`} />
                <span className={`${handle} -right-3.5 -top-3.5`} />
                <span className={`${handle} -bottom-3.5 -left-3.5`} />
                <span className={`${handle} -bottom-3.5 -right-3.5`} />

                <div className="relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-xl bg-neutral-900 shadow-2xl">
                  {/* Bar jendela ala Figma */}
                  <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs text-neutral-500">
                      bendahara-umum.fig
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <span className="w-fit rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-neutral-900">
                      {role.period}
                    </span>

                    <h3 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-neutral-400">{role.org}</p>

                    <ul className="mt-6 space-y-3 leading-relaxed text-neutral-200">
                      {role.points.map((p, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-lime-300" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-2 pt-7">
                      {role.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-neutral-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frame 2: prestasi */}
          <div className="fade-up" style={{ animationDelay: "500ms" }}>
            <p className="mb-4 text-xs font-semibold tracking-widest text-blue-100">
              02 / PRESTASI
            </p>

            <div className="h-[calc(100%-2.25rem)]">
              <div className={`${hoverCard} rotate-[1.5deg]`}>
                <div className="relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-xl bg-lime-300 p-7 text-neutral-900 shadow-2xl">
                  {/* Angka 3 raksasa sebagai dekorasi */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-1 -top-10 select-none text-[12rem] font-extrabold leading-none text-neutral-900/10"
                  >
                    3
                  </span>

                  <Trophy size={36} className="relative" />

                  <span className="relative mt-5 w-fit rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                    {award.period}
                  </span>

                  <h3 className="relative mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
                    {award.title}
                  </h3>
                  <p className="relative mt-1 text-neutral-700">{award.org}</p>
                  <p className="relative mt-6 leading-relaxed text-neutral-800">
                    {award.note}
                  </p>

                  {/* Podium mini: juara 3 disorot */}
                  <div className="relative mt-auto flex items-end justify-center gap-2 pt-8">
                    {[
                      { n: 2, h: "h-14", on: false },
                      { n: 1, h: "h-20", on: false },
                      { n: 3, h: "h-10", on: true },
                    ].map((p) => (
                      <div
                        key={p.n}
                        className={`flex w-16 items-start justify-center rounded-t-md pt-1.5 text-sm font-extrabold ${p.h} ${
                          p.on
                            ? "bg-neutral-900 text-lime-300"
                            : "bg-neutral-900/15 text-neutral-900/50"
                        }`}
                      >
                        {p.n}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Label kursor */}
                <div className="absolute -bottom-5 right-5 flex items-end gap-1">
                  <MousePointer2
                    size={18}
                    className="fill-orange-500 text-orange-500"
                  />
                  <span className="rounded-md bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white">
                    Prestasi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}