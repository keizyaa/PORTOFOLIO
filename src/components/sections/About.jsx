import { useEffect, useRef, useState } from "react";

const CARD_BLUE = "#0c3fa5";

const achievements = ["Juara 3 BISTIK 2025", "Bendahara Umum HMTI"];

const ribbonItems = ["Front End", "UI/UX", "Full Stack", "Open to Internship"];

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
        // About sepenuhnya di luar layar: siap diputar ulang
        setPlaying(false);
      } else if (t.top < vh * 0.55) {
        // Atas kartu sudah masuk bagian atas layar: jatuhkan
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
      {/* Pita berjalan di atas About */}
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

      {/* Penanda pemicu: di luar div ber-key, sejajar area kartu */}
      <div
        ref={triggerRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-20 h-px"
      />

      {/* key berubah => elemen dibuat ulang => animasi mulai dari awal */}
      <div
        key={playing ? "on" : "off"}
        className={`relative mx-auto grid min-h-screen max-w-6xl content-start gap-10 px-6 pb-20 pt-20 md:grid-cols-2 md:gap-6 portrait:md:min-h-0 ${
          playing ? "" : "invisible"
        }`}
      >
        {/* ID card menggantung (kiri): dipotong tepat di bawah pita */}
        <div className="self-start [clip-path:inset(10px_-200px_-200px_-200px)]">
          <div className="card-drop">
            <div className="mx-auto w-[300px] origin-top max-[350px]:scale-90">
              <div className="swing">
                {/* Tali kuning */}
                <div className="relative h-[170px]">
                  <div className="absolute inset-x-0 top-0 -bottom-6 overflow-hidden">
                    <span className="absolute bottom-6 left-1/2 h-[230px] w-7 -translate-x-1/2 origin-bottom -rotate-[8deg] bg-yellow-400" />
                    <span className="absolute bottom-6 left-1/2 h-[230px] w-7 -translate-x-1/2 origin-bottom rotate-[8deg] bg-yellow-400" />
                  </div>
                  <span className="absolute -bottom-4 left-1/2 z-10 h-11 w-6 -translate-x-1/2 rounded-md bg-neutral-300 shadow-md" />
                </div>

                {/* Kartu */}
                <div
                  className="relative overflow-hidden rounded-[22px] shadow-2xl"
                  style={{ backgroundColor: CARD_BLUE }}
                >
                  <div className="relative h-[304px] overflow-hidden">
                    <img
                      src="/id-card.jpg"
                      alt="Tsabita Keizya, Front End Developer"
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
                        TERBUKA UNTUK MAGANG
                      </p>
                      <p className="mt-1 text-sm leading-snug text-white/90">
                        D-IV Teknik Informatika
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

        {/* Teks (kanan) */}
        <div className="mx-auto flex w-full max-w-lg flex-col justify-center pt-4 md:mx-0 md:max-w-none md:self-center md:pl-4 md:pt-12 lg:pl-8">
          <h2 className="fade-up text-3xl font-extrabold leading-tight [animation-delay:300ms] sm:text-4xl lg:text-5xl">
            Halo, aku Tsabita Keizya Vanya Putri.
          </h2>

          <p
            lang="id"
            className="fade-up mt-5 max-w-lg text-left leading-relaxed text-blue-50 [animation-delay:400ms] lg:text-justify lg:hyphens-auto"
          >
            Mahasiswa Teknik Informatika yang suka mengubah desain di Figma
            menjadi tampilan web yang rapi dan nyaman dipakai. Sejauh ini aku
            sudah membangun portal informasi 17 halaman (JTIFY), halaman admin
            voucher (EFWAN), dan aplikasi deteksi jenis kulit berbasis AI
            (SkinLy). Di luar ngoding, aku menjadi Bendahara Umum HMTI dan
            mengelola anggaran program kerja 5 departemen. Sekarang aku
            mencari magang sebagai Front End Developer.
          </p>

          <div className="fade-up mt-6 flex max-w-lg flex-wrap gap-2 [animation-delay:500ms]">
            {achievements.map((a) => (
              <span
                key={a}
                className="rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-medium text-blue-900"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}