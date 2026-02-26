import emailjs from '@emailjs/browser';
import { useState, useEffect, useRef } from "react";

// --- DATA ---
const NAV_LINKS = ["Work", "About", "Skills", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Login and Sign up System",
    category: "Full-Stack · Tailwind CSS",
    year: "2026",
    description:
      "A clean and responsive Login & Signup system built with React and Tailwind CSS. Features form validation, smooth animations, and a modern designed for a seamless user experience.",
    tags: [ "Tailwind CSS", "JavaScript", "HTML"],
    color: "#C8FF00",
    featured: true,
    link: "https://login-and-sign-up-page-beta.vercel.app/",
  },
];

const SKILLS = [
  { name:"HTML & CSS", level:85},
  { name: "React ", level: 78 },
  { name: "TypeScript", level: 70 },
  { name: "Node.js ", level: 70 },
  { name: "Tailwind CSS", level: 90 },
  {name:"Visual Studio Code", level:90},
  {name:"GitHub", level:85},
  {name:"Vercel", level:80},
];

// --- HOOKS ---
function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

// --- COMPONENTS ---

function Noise() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", opacity: 0.035,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat", backgroundSize: "128px",
    }} />
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHovered(!!e.target.closest("a, button, [data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <>
      <div style={{
        position: "fixed", left: pos.x, top: pos.y, width: hovered ? 40 : 8, height: hovered ? 40 : 8,
        borderRadius: "50%", background: "#C8FF00", zIndex: 10000, pointerEvents: "none",
        transform: "translate(-50%, -50%)", transition: "width 0.2s, height 0.2s, opacity 0.2s",
        opacity: hovered ? 0.3 : 1, mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", left: pos.x, top: pos.y, width: 2, height: 2,
        borderRadius: "50%", background: "#C8FF00", zIndex: 10001, pointerEvents: "none",
        transform: "translate(-50%, -50%)", mixBlendMode: "difference",
      }} />
    </>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.25rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      background: scrolled ? "rgba(8,8,10,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.4s",
    }}>
      <a href="#hero" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff", textDecoration: "none", letterSpacing: "-0.02em" }}>
        Neha<span style={{ color: "#C8FF00" }}>.</span>
      </a>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {NAV_LINKS.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em",
            textTransform: "uppercase", color: active === l.toLowerCase() ? "#C8FF00" : "rgba(255,255,255,0.55)",
            textDecoration: "none", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#C8FF00"}
            onMouseLeave={e => e.target.style.color = active === l.toLowerCase() ? "#C8FF00" : "rgba(255,255,255,0.55)"}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "0 2.5rem 5rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div style={{
        position: "absolute", top: "15%", right: "-5%", width: "55vw", height: "55vw",
        borderRadius: "50%", zIndex: 0,
        background: "radial-gradient(ellipse at center, rgba(200,255,0,0.07) 0%, transparent 65%)",
        filter: "blur(40px)",
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px" }}>
        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "#C8FF00", marginBottom: "1.5rem",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(12px)",
          transition: "all 0.7s ease 0.1s",
        }}>Available for freelance · 2026</p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 10vw, 9rem)",
          fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.03em", color: "#fff", margin: 0,
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(24px)",
          transition: "all 0.8s ease 0.25s",
        }}>
          Neha<br />
          <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>Gowda</span>
        </h1>
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginTop: "2.5rem", flexWrap: "wrap", gap: "1.5rem",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
          transition: "all 0.8s ease 0.45s",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
            color: "rgba(255,255,255,0.55)", maxWidth: "40ch", lineHeight: 1.5, margin: 0, fontStyle: "italic",
          }}>
            Full-stack developer intern crafting secure, elegant digital experiences.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#work" data-hover style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#08080A", background: "#C8FF00",
              padding: "0.85rem 2rem", textDecoration: "none", display: "inline-block", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >View Work</a>
            <a href="#contact" data-hover style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#fff", padding: "0.85rem 2rem", textDecoration: "none",
              display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.target.style.borderColor = "#C8FF00"}
              onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
            >Get in Touch</a>
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        opacity: mounted ? 0.4 : 0, transition: "opacity 1s ease 1.2s",
      }}>
        <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, #C8FF00, transparent)", animation: "pulse 2s ease infinite" }} />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `1px solid ${project.featured ? "rgba(200,255,0,0.2)" : "rgba(255,255,255,0.1)"}`,
        padding: "2.5rem 0",
        cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
        position: "relative",
        background: project.featured && hovered ? "rgba(200,255,0,0.02)" : "transparent",
      }}
    >
      {project.featured && (
        <div style={{
          position: "absolute", top: "2.5rem", right: "0",
          fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em",
          textTransform: "uppercase", color: "#08080A", background: "#C8FF00",
          padding: "0.3rem 0.85rem",
        }}>★ Featured</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>0{project.id}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{project.category}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>{project.year}</span>
          </div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700, color: hovered ? project.color : "#fff",
            margin: "0 0 1rem", letterSpacing: "-0.02em", transition: "color 0.3s",
          }}>{project.title}</h3>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", maxWidth: "55ch", lineHeight: 1.6, margin: 0,
          }}>{project.description}</p>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "0.3rem 0.75rem",
                border: `1px solid ${hovered && project.featured ? "rgba(200,255,0,0.4)" : "rgba(255,255,255,0.12)"}`,
                color: hovered && project.featured ? "#C8FF00" : "rgba(255,255,255,0.45)",
                transition: "all 0.3s",
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "0.5rem" }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
  <div style={{
    width: "52px", height: "52px", borderRadius: "50%",
    border: `1px solid ${hovered ? project.color : "rgba(255,255,255,0.15)"}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    transform: hovered ? "rotate(45deg)" : "none", transition: "all 0.3s",
  }}>
    <span style={{ color: hovered ? project.color : "rgba(255,255,255,0.4)", fontSize: "1.2rem" }}>→</span>
  </div>
</a>
        </div>
      </div>
    </div>
  );
}

function Work() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="work" style={{ padding: "8rem 2.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div ref={ref} style={{
        display: "flex", alignItems: "baseline", gap: "1.5rem", marginBottom: "4rem",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.7s",
      }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>Selected Work</h2>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", color: "#C8FF00", textTransform: "uppercase" }}>— 2026</span>
      </div>
      <div>{PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}</div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="about" style={{ padding: "8rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-30px)", transition: "all 0.8s" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8FF00", marginBottom: "1.5rem" }}>About</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 2rem" }}>
            Building with purpose, learning with precision.
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.15rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            I'm Neha — a full-stack development learner passionate about crafting products that are thoughtfully designed and built with care.
From intuitive user interfaces to reliable backend systems, I enjoy learning and working across every layer of the web.</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.15rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            My Login System project reflects my dedication to secure-by-design thinking — A responsive and user-friendly authentication interface with clean layouts, form validation, and intuitive user experience.
          </p>
          <div style={{ display: "flex", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
            {[["4th", "Year BE"], ["Ready to Build", "Projects"], ["Good", "Learner"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 700, color: "#C8FF00", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginTop: "0.4rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(30px)", transition: "all 0.8s 0.2s", position: "relative" }}>
          <div style={{
            aspectRatio: "4/5", background: "linear-gradient(135deg, rgba(200,255,0,0.06) 0%, rgba(100,255,218,0.04) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "8rem", color: "rgba(255,255,255,0.04)", fontWeight: 700, letterSpacing: "-0.05em" }}>NG</span>
          </div>
          <div style={{
            position: "absolute", bottom: "-1rem", right: "-1rem",
            padding: "1.25rem 1.5rem", background: "#08080A", border: "1px solid rgba(200,255,0,0.3)",
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: "#C8FF00", textTransform: "uppercase" }}>Currently</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#fff", marginTop: "0.25rem" }}>Open to Opportunities</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: `all 0.6s ease ${index * 0.07}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>{skill.name}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#C8FF00" }}>{skill.level}%</span>
      </div>
      <div style={{ height: "2px", background: "rgba(255,255,255,0.08)", position: "relative" }}>
        <div style={{ height: "100%", background: "#C8FF00", width: inView ? `${skill.level}%` : "0%", transition: `width 1s ease ${index * 0.07 + 0.3}s` }} />
      </div>
    </div>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <section id="skills" style={{ padding: "8rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.7s" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8FF00", marginBottom: "1rem" }}>Expertise</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.03em" }}>Skills & Tools</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {SKILLS.slice(0, 4).map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {SKILLS.slice(4).map((s, i) => <SkillBar key={s.name} skill={s} index={i + 4} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
 const handleSubmit = (e) => {
  e.preventDefault();
  emailjs.send(
    "service_pp8aupd",   // ← paste your Service ID here
    "template_qdd6y1f",  // ← paste your Template ID here
    {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    },
    "p2wggfgMQULUgjpsM"    // ← paste your Public Key here
  ).then(() => {
    setSent(true);
  }).catch((error) => {
    alert("Something went wrong. Please try again!");
    console.error(error);
  });
};
  return (
    <section id="contact" style={{ padding: "8rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-30px)", transition: "all 0.8s" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8FF00", marginBottom: "1.5rem" }}>Contact</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 2rem" }}>
            Let's build something remarkable.
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "3rem" }}>
            Available for freelance projects, consulting, and full-time roles. Whether it's a login system, a full product, or anything in between — let's talk.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
  ["Email", "mailto:nehamkgowda18@gmail.com"],
  ["LinkedIn", "https://linkedin.com/in/neha-632b5425a"],
  ["GitHub", "https://github.com/nehagowda18"]
].map(([l, v]) => (
  <div key={l} style={{ display: "flex", gap: "1.5rem", alignItems: "baseline" }}>
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", width: "4rem", flexShrink: 0 }}>{l}</span>
    <a href={v} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#C8FF00", cursor: "pointer", textDecoration: "none" }}
      onMouseEnter={e => e.target.style.textDecoration = "underline"}
      onMouseLeave={e => e.target.style.textDecoration = "none"}
    >{v.replace("mailto:", "")}</a>
  </div>
))}
          </div>
        </div>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(30px)", transition: "all 0.8s 0.2s" }}>
          {sent ? (
            <div style={{
              padding: "3rem", border: "1px solid rgba(200,255,0,0.3)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px", gap: "1rem",
            }}>
              <div style={{ fontSize: "2.5rem" }}>✓</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#C8FF00", textAlign: "center" }}>Message received. I'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[["name", "Name"], ["email", "Email"]].map(([field, label]) => (
                <div key={field}>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "0.6rem" }}>{label}</label>
                  <input
                    type={field === "email" ? "email" : "text"} required value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "0.85rem 1rem",
                      outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#C8FF00"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: "0.6rem" }}>Message</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "0.85rem 1rem",
                    outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#C8FF00"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
              <button type="submit" data-hover style={{
                background: "#C8FF00", border: "none", color: "#08080A",
                fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.12em",
                textTransform: "uppercase", padding: "1rem 2rem", cursor: "pointer",
                transition: "opacity 0.2s", alignSelf: "flex-start",
              }}
                onMouseEnter={e => e.target.style.opacity = "0.8"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "2rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
        © 2026 Neha Gowda · Designed & Built with care
      </span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
        React · TypeScript · Tailwind
      </span>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #08080A; color: #fff; cursor: none; overflow-x: hidden; }
        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08080A; }
        ::-webkit-scrollbar-thumb { background: #C8FF00; border-radius: 2px; }
        @media (max-width: 768px) { body { cursor: auto; } }
      `}</style>
      <Cursor />
      <Noise />
      <Nav active={activeSection} />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}