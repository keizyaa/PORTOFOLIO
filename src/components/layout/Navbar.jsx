import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Beranda", id: "home" },
  { label: "Tentang", id: "about" },
  { label: "Pengalaman", id: "experience" },
  { label: "Teknologi", id: "tech-stack" },
  { label: "Proyek", id: "projects" },
  { label: "Kontak", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const listRef = useRef(null);

  // 1. Tentukan section aktif dari posisi scroll
  useEffect(() => {
    const update = () => {
      // Paling atas halaman = Home
      if (window.scrollY < 50) {
        setActive("home");
        return;
      }

      const line = window.innerHeight * 0.4;
      let current = "home";

      for (const { id } of links) {
        const el = document.getElementById(id);
        if (!el) continue; // section belum ada, lewati
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      // Mentok di dasar halaman = section terakhir yang ada
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) {
        const last = [...links]
          .reverse()
          .find(({ id }) => document.getElementById(id));
        if (last) current = last.id;
      }

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // 2. Geser pill ke menu aktif (berguna di HP)
  useEffect(() => {
    const ul = listRef.current;
    const el = ul?.querySelector(`[data-id="${active}"]`);
    if (!ul || !el) return;
    ul.scrollTo({
      left: el.offsetLeft - ul.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <ul
        ref={listRef}
        className="relative flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-neutral-200 bg-white px-2 py-2 shadow-lg shadow-black/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {links.map(({ label, id }) => {
          const isActive = active === id;
          return (
            <li key={id} data-id={id} className="shrink-0">
              <a
                href={`#${id}`}
                className={`block rounded-full px-3 py-1.5 text-xs font-semibold transition md:px-4 md:text-sm ${
                  isActive
                    ? "bg-lime-300 text-neutral-900"
                    : "text-neutral-500 hover:bg-lime-100 hover:text-neutral-900"
                }`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}