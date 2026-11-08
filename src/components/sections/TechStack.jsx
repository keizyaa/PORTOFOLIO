import { useEffect, useRef, useState } from "react";
import { Webhook } from "lucide-react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaPhp, FaJava, FaReact, FaLaravel,
  FaGithub, FaFigma, FaTrello, FaFileWord, FaFileExcel, FaPalette,
} from "react-icons/fa";
import {
  SiTypescript, SiDart, SiNextdotjs, SiTailwindcss, SiFlutter,
  SiAndroidstudio,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const groups = [
  {
    title: "Bahasa Pemrograman",
    items: [
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F0B400" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "PHP", icon: FaPhp, color: "#777BB4" },
      { name: "Java", icon: FaJava, color: "#E76F00" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
    ],
  },
  {
    title: "Framework & Pustaka",
    items: [
      { name: "React.js", icon: FaReact, color: "#1FB6E0" },
      { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "REST API", icon: Webhook, color: "#1d3fe0" },
    ],
  },
  {
    title: "Perangkat Kerja",
    items: [
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
      { name: "GitHub", icon: FaGithub, color: "#181717" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
      { name: "Trello", icon: FaTrello, color: "#0052CC" },
      { name: "Canva", icon: FaPalette, color: "#00C4CC" },
      { name: "MS Word", icon: FaFileWord, color: "#2B579A" },
      { name: "MS Excel", icon: FaFileExcel, color: "#217346" },
    ],
  },
];

const ribbonItems = ["React.js", "Next.js", "Tailwind CSS", "Flutter", "Laravel", "Figma"];

const tilts = [-3, 2, -2, 3, -1.5, 2.5, -3.5, 1.5];

function Chip({ name, icon: Icon, color, index }) {
  return (
    <li
      className="flex items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 shadow-md transition-transform duration-300 ease-out [transform:rotate(var(--r))] hover:z-10 hover:[transform:rotate(0deg)_translateY(-4px)_scale(1.1)] motion-reduce:transition-none"
      style={{ "--r": `${tilts[index % tilts.length]}deg` }}
    >
      <Icon size={20} color={color} />
      <span className="text-sm font-bold leading-none text-neutral-800">{name}</span>
    </li>
  );
}

export default function TechStack() {
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
    <section ref={sectionRef} id="tech-stack" className="relative overflow-x-clip">
      {/* Pita transisi */}
      <div className="absolute inset-x-0 top-20 z-20 -rotate-[1.5deg] scale-x-110 overflow-hidden bg-lime-300 py-2 text-neutral-900 shadow-lg sm:py-2.5">
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

      {/* key berubah => animasi mulai dari awal */}
      <div
        key={playing ? "on" : "off"}
        className={`mx-auto max-w-6xl px-6 pb-24 pt-40 md:pb-28 md:pt-48 ${
          playing ? "" : "invisible"
        }`}
      >
        <h2 className="fade-up text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Teknologi yang
          <br />
          <span className="inline-block -rotate-[2deg] bg-lime-300 px-3 text-neutral-900">
            kupakai.
          </span>
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <div
              key={g.title}
              className="fade-up rounded-2xl bg-neutral-900 p-6 shadow-2xl"
              style={{ animationDelay: `${250 + gi * 200}ms` }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-lime-300 px-4 py-1.5 text-sm font-extrabold text-neutral-900">
                  {g.title}
                </span>
                <span className="text-xs font-semibold tracking-widest text-neutral-500">
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((it, i) => (
                  <Chip key={it.name} {...it} index={i + gi * 2} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}