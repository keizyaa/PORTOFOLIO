import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { projects } from "../../data/projects";

const ribbonItems = ["SkinLy", "EFWAN", "JTIFY", "IVSS Lab"];

// Ukuran foto web
function webSize(desktop) {
  return desktop ? "aspect-[2.1/1] w-[300px]" : "aspect-[2.1/1] w-full";
}

function Shot({ project, src, className = "" }) {
  const mobile = project.layout === "mobile";
  const img = src !== undefined ? src : project.image;
  return (
    <div
      className={`overflow-hidden shadow-lg ${
        mobile
          ? "rounded-[1.5rem] border-[5px] border-neutral-900 bg-neutral-900"
          : "rounded-xl ring-1 ring-neutral-900/15"
      } ${className}`}
    >
      {img ? (
        <img
          src={img}
          alt={`Tampilan proyek ${project.name}`}
          className={`h-full w-full ${
            project.fit === "contain" ? "object-contain" : "object-cover object-top"
          }`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 px-2 text-center text-neutral-400">
          <ImageIcon size={24} />
          <span className="text-[10px] font-semibold">
            {mobile ? "Screenshot HP" : `Screenshot ${project.name}`}
          </span>
        </div>
      )}
    </div>
  );
}

// Tiga HP berjajar seperti kipas
function PhoneSet({ project, size }) {
  const list = project.images?.length ? project.images : ["", "", ""];
  const pose = ["-rotate-6", "-translate-y-3", "rotate-6"];

  return (
    <div className="flex items-center justify-center">
      {list.slice(0, 3).map((src, i) => (
        <Shot
          key={i}
          project={project}
          src={src}
          className={`relative ${size} ${pose[i]} ${i > 0 ? "-ml-5" : ""} ${
            i === 1 ? "z-10" : ""
          }`}
        />
      ))}
    </div>
  );
}

function Detail({ project }) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-600">
        {project.period}
      </p>

      <ul className="mt-3 space-y-2 leading-relaxed text-neutral-800">
        {project.points.map((pt, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-neutral-900" />
            {pt}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white"
          >
            {t}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 underline underline-offset-4"
        >
          Lihat proyek <ArrowUpRight size={16} />
        </a>
      )}
    </>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(null);

  // Putar animasi saat section terlihat, reset saat keluar layar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setPlaying(false);
          setActive(null);
        } else if (entry.intersectionRatio >= 0.15) {
          setPlaying(true);
        }
      },
      { threshold: [0, 0.15] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-x-clip">
      {/* Pita transisi */}
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

      <div
        key={playing ? "on" : "off"}
        className={`mx-auto max-w-7xl px-6 pb-24 pt-40 md:pb-32 md:pt-48 ${
          playing ? "" : "invisible"
        }`}
      >
        <h2 className="fade-up text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Proyek yang
          <br />
          <span className="inline-block -rotate-[2deg] bg-lime-300 px-3 text-neutral-900">
            kubuat.
          </span>
        </h2>

        <p className="fade-up mt-5 text-center text-blue-100 [animation-delay:200ms]">
          <span className="hidden lg:inline">Arahkan kursor ke kartu untuk melihat detail.</span>
          <span className="lg:hidden">Ketuk kartu untuk melihat detail.</span>
        </p>

        <div className="mt-14 flex flex-col gap-4 lg:h-[470px] lg:flex-row">
          {projects.map((p, i) => {
            const open = active === i;
            const isMobile = p.layout === "mobile";

            return (
              // Elemen ini berada langsung di dalam baris, jadi flex-grow dipasang di sini
              <div
                key={p.name}
                className="fade-up lg:h-full lg:min-w-0 lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                style={{
                  animationDelay: `${300 + i * 150}ms`,
                  flexGrow: open ? 4 : 1,
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(open ? null : i)}
                  className={`relative h-full w-full cursor-pointer overflow-hidden rounded-3xl p-6 text-neutral-900 shadow-2xl outline-none transition-colors duration-500 ${
                    open ? "bg-lime-300" : "bg-white"
                  }`}
                >
                  <div className="flex h-full">
                    {/* Foto web (desktop): di kiri */}
                    {!isMobile && (
                      <div
                        className={`hidden shrink-0 self-center overflow-hidden transition-all duration-500 lg:block ${
                          open
                            ? "mr-6 w-[300px] opacity-100 delay-200"
                            : "mr-0 w-0 opacity-0"
                        }`}
                      >
                        <Shot project={p} className={webSize(true)} />
                      </div>
                    )}

                    {/* Teks */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-xs font-bold tracking-widest text-neutral-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-neutral-600">
                        {p.role}
                      </p>

                      <p
                        className={`mt-3 text-sm leading-relaxed text-neutral-700 ${
                          open ? "lg:hidden" : ""
                        }`}
                      >
                        {p.summary}
                      </p>

                      {/* Detail desktop */}
                      <div
                        className={`hidden overflow-hidden text-sm transition-all duration-500 lg:block ${
                          open ? "mt-3 max-h-[280px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <Detail project={p} />
                      </div>

                      {/* Detail layar kecil: terbuka ke bawah */}
                      <div
                        className={`grid transition-[grid-template-rows] duration-500 lg:hidden ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="pt-5">
                            {isMobile ? (
                              <div className="mb-4">
                                <PhoneSet project={p} size="aspect-[9/19] w-[95px]" />
                              </div>
                            ) : (
                              <Shot project={p} className={`mb-4 ${webSize(false)}`} />
                            )}
                            <Detail project={p} />
                          </div>
                        </div>
                      </div>

                      {/* Tombol panah */}
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-sm font-bold">
                          {open ? "Tutup" : "Lihat detail"}
                        </span>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition duration-500 ${
                            open
                              ? "rotate-45 bg-neutral-900 text-lime-300"
                              : "bg-lime-300 text-neutral-900"
                          }`}
                        >
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </div>

                    {/* Tiga foto HP (desktop): di kanan */}
                    {isMobile && (
                      <div
                        className={`hidden shrink-0 self-center transition-all duration-500 lg:block ${
                          open
                            ? "ml-4 w-[340px] overflow-visible opacity-100 delay-200"
                            : "ml-0 w-0 overflow-hidden opacity-0"
                        }`}
                      >
                        <div className="px-5 py-8">
                          <PhoneSet project={p} size="aspect-[9/19] w-[105px]" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}