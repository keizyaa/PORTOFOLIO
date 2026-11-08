import { useEffect, useRef, useState } from "react";
import {
  MousePointer2, Hand, ExternalLink, Frame, Circle, PenTool, Type,
  MessageCircle, Code, Check, Plus, Smile, AtSign, Image,
} from "lucide-react";

const roles = [
  { name: "Front End", key: "F", icon: MousePointer2 },
  { name: "UI/UX", key: "U", icon: Hand },
  { name: "Full Stack", key: "S", icon: ExternalLink },
];

const tools = [MousePointer2, Frame, Circle, PenTool, Type, MessageCircle, Code];

const panel = "rounded-xl bg-neutral-900 shadow-xl";

const gridStyle = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.22) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.22) 2px, transparent 2px)",
  backgroundSize: "56px 56px",
};

const titleStyle = {
  fontFamily: "'Archivo Black', 'Archivo', sans-serif",
  fontWeight: 900,
  WebkitTextStroke: "0.025em #fff",
  paintOrder: "stroke fill",
};

export default function Hero() {
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Putar animasi saat Home terlihat, reset saat Home keluar layar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setPlaying(false);
        } else if (entry.intersectionRatio >= 0.4) {
          setPlaying(true);
        }
      },
      { threshold: [0, 0.4] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden text-white"
    >
      
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-44 pt-28 md:pb-28 md:pt-32">
        {/* key berubah => elemen dibuat ulang => semua animasi mulai dari awal */}
        <div
          key={playing ? "on" : "off"}
          className={`relative -rotate-[1.5deg] ${playing ? "" : "invisible"}`}
        >
          {/* Teks judul */}
          <div className="px-6 py-8 md:px-10 md:py-10 xl:px-20 xl:py-14">
            <h1
              className="fade-up text-left uppercase leading-[0.85] tracking-tight [font-size:clamp(3rem,19vw,16rem)] md:[font-size:clamp(4rem,min(13vw,22vh),16rem)] xl:[font-size:clamp(4rem,min(15vw,26vh),16rem)]"
              style={titleStyle}
            >
              Porto
              <br />
              folio
            </h1>
          </div>

          {/* Kotak seleksi: ditarik dari kiri atas ke kanan bawah */}
          <div className="select-box pointer-events-none absolute inset-0 border-[3px] border-lime-300">
            <span className="absolute -left-2.5 -top-2.5 h-5 w-5 bg-lime-300 xl:-left-3 xl:-top-3 xl:h-6 xl:w-6" />
            <span className="absolute -bottom-2.5 -right-2.5 h-5 w-5 bg-lime-300 xl:-bottom-3 xl:-right-3 xl:h-6 xl:w-6" />

            {/* Kursor + label nama */}
            <div
              className="appear absolute -bottom-12 right-0 flex items-end gap-1 md:-bottom-14 md:right-4"
              style={{ animationDelay: "0.5s" }}
            >
              <MousePointer2 className="h-4 w-4 fill-orange-500 text-orange-500 xl:h-5 xl:w-5" />
              <span className="whitespace-nowrap rounded-md bg-orange-500 px-2.5 py-1 text-[11px] font-medium md:text-sm xl:px-3">
                Tsabita Keizya Vanya Putri
              </span>
            </div>
          </div>

          {/* Menu role: menimpa sudut kanan atas */}
          <div
            className="appear absolute right-0 -top-[5.5rem] z-10 w-40 rotate-[6deg] md:-top-16 md:w-48 md:translate-x-[76%] md:rotate-[1.5deg] xl:-top-2 xl:w-60 xl:translate-x-[72%]"
            style={{ animationDelay: "1.7s" }}
          >
            <div className={`float p-1.5 text-xs md:p-2 md:text-sm xl:p-2.5 xl:text-base ${panel}`}>
              {roles.map((r, i) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-neutral-200 xl:px-3 xl:py-2.5"
                >
                  <span className="flex items-center gap-1.5 xl:gap-2.5">
                    <span className="w-3 xl:w-4">
                      {i === 0 && <Check className="h-3 w-3 xl:h-4 xl:w-4" />}
                    </span>
                    <r.icon className="h-3.5 w-3.5 xl:h-[18px] xl:w-[18px]" />
                    {r.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 xl:text-sm">{r.key}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kartu 2026 Edition: menimpa sudut kiri bawah */}
          <div
            className="appear absolute -bottom-[8.5rem] left-0 z-10 w-40 rotate-[4deg] md:-bottom-12 md:-left-32 md:w-48 md:rotate-[1.5deg] xl:-left-40 xl:w-56"
            style={{ animationDelay: "1.9s" }}
          >
            <div
              className={`float text-xs md:text-sm ${panel}`}
              style={{ animationDelay: "1s" }}
            >
              <p className="px-3 pb-4 pt-3 font-semibold text-neutral-100 xl:px-4 xl:pb-5">
                2026 Edition
              </p>
              <div className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-neutral-400 xl:px-4 xl:py-2.5">
                <span className="flex gap-2.5 xl:gap-3">
                  <Smile className="h-3.5 w-3.5" />
                  <AtSign className="h-3.5 w-3.5" />
                  <Image className="h-3.5 w-3.5" />
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white xl:h-6 xl:w-6">
                  <Plus className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar bawah */}
      <div
        className={`absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-0.5 p-1.5 md:bottom-6 md:gap-1 md:p-2 ${panel}`}
      >
        {tools.map((Icon, i) => (
          <span
            key={i}
            className={`flex h-8 w-8 items-center justify-center rounded-lg md:h-9 md:w-9 ${
              i === 0 ? "bg-blue-500 text-white" : "text-neutral-300"
            }`}
          >
            <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </span>
        ))}
      </div>
    </section>
  );
}