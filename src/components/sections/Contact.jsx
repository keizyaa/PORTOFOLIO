import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, Mail, MousePointer2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const EMAIL = "tsabitakeizya@gmail.com";

const contacts = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/keizyaa", href: "https://www.linkedin.com/in/keizyaa/", icon: FaLinkedin },
  { label: "GitHub", value: "github.com/keizyaa", href: "https://github.com/keizyaa", icon: FaGithub },
  { label: "WhatsApp", value: "+62 8989507669", href: "https://wa.me/628989507669", icon: FaWhatsapp },
];

const ribbonItems = ["Terbuka untuk magang", "Siap berkontribusi", "Kirim pesan"];

export default function Contact() {
  const sectionRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Putar animasi saat section terlihat, reset saat keluar layar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setPlaying(false);
        else if (entry.intersectionRatio >= 0.2) setPlaying(true);
      },
      { threshold: [0, 0.2] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="grid-bg relative scroll-mt-24 overflow-x-clip"
    >
      {/* Pita transisi (diturunkan agar tidak bertabrakan dengan navbar) */}
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

      <div
        key={playing ? "on" : "off"}
        className={`mx-auto max-w-6xl px-6 pb-10 pt-40 md:pt-48 ${
          playing ? "" : "invisible"
        }`}
      >
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Kiri: ajakan (rata tengah di HP dan iPad, rata kiri di laptop) */}
          <div className="text-center lg:text-left">
            <h2 className="fade-up text-3xl font-extrabold leading-[1.3] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl">
              Terbuka untuk
              <br />
              <span className="bg-lime-300 px-3 text-neutral-900 box-decoration-clone">
                kesempatan magang.
              </span>
            </h2>

            <p className="fade-up mx-auto mt-6 max-w-md leading-relaxed text-blue-50 [animation-delay:200ms] lg:mx-0">
              Tertarik dengan profil ini? Silakan hubungi melalui email atau
              kanal di samping untuk mengatur wawancara. CV lengkap dapat
              diunduh melalui tombol di bawah.
            </p>

            <div className="fade-up mt-8 flex flex-wrap justify-center gap-3 [animation-delay:300ms] lg:justify-start">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-3 text-sm font-bold text-neutral-900 transition hover:-translate-y-0.5 sm:px-6"
              >
                <Mail size={16} />
                Kirim email
              </a>
              <a
                href="/cv-tsabita.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-bold transition hover:bg-white/10 sm:px-6"
              >
                <Download size={16} />
                Unduh CV
              </a>
            </div>
          </div>

          {/* Kanan: kartu kontak ala pop-up Figma */}
          <div className="fade-up relative [animation-delay:400ms]">
            <div className="relative mx-auto max-w-md rotate-[1deg] rounded-2xl bg-neutral-900 p-2 shadow-2xl sm:rotate-[1.5deg] sm:p-3">
              <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-widest text-neutral-500 sm:px-4">
                Temukan aku di sini
              </p>

              <ul>
                {contacts.map(({ label, value, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 text-neutral-200 transition hover:bg-lime-300 hover:text-neutral-900 sm:gap-4 sm:px-4 sm:py-3.5"
                    >
                      <Icon size={20} className="shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-neutral-500 transition group-hover:text-neutral-700">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-semibold">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 opacity-40 transition group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Label kursor: sejajar tepi kartu, tidak keluar layar di HP */}
            <div className="absolute -bottom-9 right-1/2 flex translate-x-1/2 items-end gap-1 sm:right-6 sm:translate-x-0">
              <MousePointer2 size={20} className="fill-orange-500 text-orange-500" />
              <span className="whitespace-nowrap rounded-md bg-orange-500 px-2.5 py-1 text-[11px] font-medium text-white sm:px-3 sm:text-xs md:text-sm">
                Tsabita Keizya Vanya Putri
              </span>
            </div>
          </div>
        </div>

        {/* Penutup */}
        <p className="fade-up mt-20 border-t border-white/20 pt-6 text-center text-[11px] leading-relaxed text-blue-100 [animation-delay:600ms] sm:mt-24 sm:text-xs">
          © 2026 Tsabita Keizya Vanya Putri. Dibuat dengan React dan Tailwind CSS.
        </p>
      </div>
    </section>
  );
}