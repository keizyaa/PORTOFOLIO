import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

const bgStyle = {
  backgroundColor: "#1d3fe0",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

const lightStyle = {
  backgroundImage:
    "linear-gradient(115deg, transparent 20%, rgba(255,255,255,.14) 32%, transparent 44%, transparent 58%, rgba(255,255,255,.10) 68%, transparent 80%)",
};

export default function App() {
  return (
    <>
      <Navbar />

      <div className="relative text-white" style={bgStyle}>
        <div className="pointer-events-none absolute inset-0" style={lightStyle} />
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </div>
    </>
  );
}