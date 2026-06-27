// pages/index.js
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import ParticleField from "../components/ParticleField";

/* Reveal-on-scroll wrapper (IntersectionObserver). */
function FadeInSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (ref.current) obs.unobserve(ref.current);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} fade-preserve transform transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

/* Mouse-tracking 3D tilt card. When `href` is set, the whole card is clickable. */
function TiltCard({ children, className = "", href }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const max = 6;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(-4px)`;
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
  }
  function open() {
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={href ? open : undefined}
      onKeyDown={
        href
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
              }
            }
          : undefined
      }
      role={href ? "link" : undefined}
      tabIndex={href ? 0 : undefined}
      className={`tilt-card grad-card ${href ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="dot" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
    </div>
  );
}

/* ---- icons ---- */
const GitHubIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" {...props}>
    <path
      fillRule="evenodd"
      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
      clipRule="evenodd"
    />
  </svg>
);
const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const LinkIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const LINKEDIN = "https://www.linkedin.com/in/suhaan-khan-333ab22ba/";
const GITHUB = "https://github.com/suhaankhan2007";

/* Small labelled link used on cards. */
function CardLink({ href, children, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
    >
      {icon}
      {children}
    </a>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${Math.min(window.scrollY * 0.12, 60)}px)`;
      }
      if (progressRef.current) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? doc.scrollTop / max : 0;
        progressRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const ventures = [
    {
      name: "Framelight",
      role: "Co-Founder & AI Engineer",
      blurb:
        "A startup I co-founded that coaches your photo's composition in real time, before you even press the shutter. I build the computer-vision and ML core that turns a live camera frame into instant, human-feeling aesthetic feedback.",
      tags: ["OpenCV", "PyTorch", "FastAPI", "React Native", "NIMA"],
      thumb: "/images/framelight.png",
      links: [{ label: "framelight.ai", href: "https://framelight.ai/", icon: <LinkIcon /> }],
    },
    {
      name: "CogniSol: AI Forge",
      role: "AI Engineer",
      blurb:
        "On an agentic team of grad and undergrad builders, designing multi-agent systems for an emerging healthcare platform and a multi-tenant backend meant to scale to thousands of teams.",
      tags: ["LangGraph", "LangChain", "MongoDB", "Milvus", "Redis", "PostgreSQL"],
    },
    {
      name: "Youth Inquiry Network",
      role: "Co-Founder · 501(c)(3)",
      blurb:
        "A nonprofit I co-founded to hand real research opportunities to high schoolers around the world, with an ML matching layer that pairs curious students with mentors and projects.",
      tags: ["Nonprofit", "NLP", "Semantic Search", "Mentorship"],
    },
    {
      name: "G-Fellows",
      role: "Venture Fellow · Smart Venture Media",
      blurb:
        "An invite-only cohort of student VCs and founders from schools like Stanford, Harvard, Penn, and Illinois. I source promising startups, track emerging trends, and nominate founders to pitch top investors, learning directly from partners at a16z, Pear, IVP, and OpenAI. It's the network, the reps, and the credibility to walk into any room in venture and belong.",
      tags: ["Venture Capital", "Sourcing", "Founders", "Trends"],
      links: [{ label: "smartventuremedia.com", href: "https://www.smartventuremedia.com/fellowship", icon: <LinkIcon /> }],
    },
  ];

  const research = [
    {
      name: "Post-Quantum Cryptography @ NCSA",
      blurb:
        "As an undergraduate research fellow, I study how the world is actually migrating to quantum-safe cryptography. I wrote a memory-safe Rust engine that watches live network traffic and classifies cryptographic signals by heuristic to help tools like Zeek see the post-quantum transition as it happens.",
      tags: ["Rust", "libpcap", "tls-parser", "PyTorch", "Network Security"],
      status: "Paper pending submission · IEEE",
    },
    {
      name: "Dark Matter via Gravitational Microlensing",
      blurb:
        "First-author astrophysics research using AI to spot gravitational microlensing events far faster than traditional pipelines, opening a new lens on detecting dark matter. Presented at state and national science fairs and symposia.",
      tags: ["Python", "PyTorch", "Astrophysics", "Research"],
      link: "https://www.researchgate.net/publication/393538243_The_Utilization_of_AI_in_Gravitational_Microlensing_Techniques_to_Further_Dark_Matter_Detection",
    },
  ];

  const projects = [
    {
      name: "Rem",
      where: "UC Berkeley AI Hackathon 2026",
      blurb:
        "Relive your memories by walking through them. Rem turns your photos and videos into a navigable 3D scene with Gaussian Splatting, so a moment becomes a space you can move inside. I built the video-to-splat pipeline (frame extraction, COLMAP camera poses, gsplat training) and the backend wiring across Redis, Supabase, and Arize.",
      tags: ["Gaussian Splatting", "COLMAP", "Three.js", "Redis"],
      thumb: "/images/rem.jpg",
      links: [
        { label: "GitHub", href: "https://github.com/haileyl6171/rem", icon: <GitHubIcon width="16" height="16" /> },
        { label: "Devpost", href: "https://devpost.com/software/rem-xk6i7d", icon: <LinkIcon /> },
      ],
    },
    {
      name: "Signify",
      where: "TreeHacks 2026",
      blurb:
        "A Zoom-integrated ASL translation platform so the Deaf and hard-of-hearing community can learn from meetings and educational content in real time, using multimodal pipelines that turn talks into ASL learning sessions.",
      tags: ["Zoom RTS", "GPT-4o", "WebSockets", "Express"],
      thumb: "/images/signify.png",
      links: [
        { label: "GitHub", href: "https://github.com/suhaankhan2007/Signify", icon: <GitHubIcon width="16" height="16" /> },
        { label: "Devpost", href: "https://devpost.com/software/signify-ca8xp7", icon: <LinkIcon /> },
      ],
    },
    {
      name: "GeneAI",
      where: "HackIllinois 2026 · Winner",
      blurb:
        "Predicts drug-interaction severity from molecular structure (SMILES) and CYP450 gene signals, with a backend that integrates a massive compound library for real-time queries, validated alongside physicians.",
      tags: ["FastAPI", "Pydantic", "ML", "Bioinformatics"],
      thumb: "/images/geneai.png",
      links: [
        { label: "GitHub", href: "https://github.com/Topupchips/GeneAI", icon: <GitHubIcon width="16" height="16" /> },
        { label: "Devpost", href: "https://devpost.com/software/geneai", icon: <LinkIcon /> },
      ],
    },
    {
      name: "MemoryMap",
      where: "Systems · C++",
      blurb:
        "A visualization of the stack and heap that makes dynamic memory allocation in C++ click. I built it to teach the thing everyone finds hardest to picture.",
      tags: ["C++", "JavaScript", "Visualization"],
      thumb: "/images/memorymap.png",
      links: [
        { label: "Live", href: "https://memorymap-psi.vercel.app/", icon: <LinkIcon /> },
        { label: "GitHub", href: "https://github.com/suhaankhan2007/MemoryMap", icon: <GitHubIcon width="16" height="16" /> },
      ],
    },
    {
      name: "AQI Forecasting",
      where: "NASA Space Apps",
      blurb:
        "Air-quality forecasting that predicts the next 24 hours for hundreds of cities and tells you the best time to be outside, replacing hours of manual lookup with ensemble ML.",
      tags: ["Next.js", "XGBoost", "FastAPI", "Ensemble ML"],
      links: [{ label: "GitHub", href: GITHUB, icon: <GitHubIcon width="16" height="16" /> }],
    },
  ];

  const recognition = [
    "Hoveida Foundation Entrepreneurship Prize · Cozad",
    "HackIllinois 2026 · Winner",
    "TreeHacks 2026 · Finalist",
    "UC Berkeley AI Hackathon 2026",
    "International Research Olympiad Scholar",
    "Texas Science & Engineering Fair · 3rd Place",
  ];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Suhaan Khan",
              url: "https://suhaankhan.com",
              image: "https://suhaankhan.com/images/Suhaan_Khan_Chicago_Headshot_2.jpg",
              jobTitle: "AI Engineer, Researcher & Founder",
              description:
                "AI engineer, researcher, and founder at the University of Illinois Urbana-Champaign. Co-founder of Framelight, post-quantum cryptography researcher at NCSA, and award-winning hackathon builder.",
              worksFor: { "@type": "Organization", name: "Framelight", url: "https://framelight.ai/" },
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "University of Illinois Urbana-Champaign",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Illinois Urbana-Champaign",
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Computer Vision",
                "Post-Quantum Cryptography",
                "Cybersecurity",
                "Astrophysics",
                "Entrepreneurship",
              ],
              sameAs: [
                "https://www.linkedin.com/in/suhaan-khan-333ab22ba/",
                "https://github.com/suhaankhan2007",
                "https://devpost.com/suhaankhanisme",
              ],
            }),
          }}
        />
      </Head>

      {/* animated backdrop + interactive flourishes */}
      <div className="bg-aurora" />
      <div className="cursor-glow" />
      <div ref={progressRef} className="scroll-progress" />

      {/* NAV */}
      <div className={`nav-bar ${scrolled ? "scrolled" : ""}`}>
        <div className="main-container flex items-center justify-between py-4">
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-white">
            Suhaan<span className="gradient-text"> Khan</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm">
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#research">Research</a>
            <a className="nav-link" href="#playground">Playground</a>
            <a className="nav-link" href="#about">About</a>
          </div>
          <div className="flex items-center gap-2">
            <a className="icon-btn" href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a className="icon-btn" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      <main id="top" className="main-container">
        {/* HERO */}
        <section className="relative min-h-[88vh] flex items-center">
          <div className="absolute inset-0 -mx-5">
            <ParticleField />
          </div>

          <div ref={heroRef} className="relative grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-center w-full py-16">
            <FadeInSection>
              <p className="eyebrow mb-4">Founder, Framelight · G-Fellow · UIUC</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white">
                Hi, I'm <span className="gradient-text">Suhaan</span>.
              </h1>
              <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed">
                I'm a sophomore at the University of Illinois Urbana-Champaign, broadly interested in
                Artificial Intelligence, Research, Cybersecurity, Astronomy, and Entrepreneurship.
              </p>
              <p className="mt-3 text-slate-400 max-w-2xl">
                I'm always looking to collaborate on research and hear your crazy entrepreneurial
                ideas, so DM or email me.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#work" className="btn btn-primary">See my work</a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <LinkedInIcon width="18" height="18" /> LinkedIn
                </a>
                <a href={GITHUB} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <GitHubIcon width="18" height="18" /> GitHub
                </a>
              </div>
            </FadeInSection>

            <FadeInSection delay={120} className="flex justify-center md:justify-end">
              <div className="profile-ring w-60 h-60 md:w-72 md:h-72">
                <img src="/images/Suhaan_Khan_Chicago_Headshot_2.jpg" alt="Suhaan Khan" width="800" height="800" />
              </div>
            </FadeInSection>
          </div>
        </section>

        <hr className="hr-grad my-4" />

        {/* ABOUT */}
        <section id="about" className="py-20">
          <FadeInSection>
            <SectionHeading eyebrow="About" title="My story" />
          </FadeInSection>
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-8">
            <FadeInSection>
              <div className="text-slate-300 text-lg leading-relaxed space-y-4">
                <p>
                  I immigrated from India at five without a word of English, then moved five times in two
                  years (Chicago, Denver, Miami, and Mississippi) before my family finally settled in
                  Austin. Constantly starting over taught me to adapt fast and stay curious about
                  wherever I land.
                </p>
                <p>
                  These days I'm building my own startup, <strong className="text-white font-semibold">Framelight</strong>,
                  where we guide people to where the best composition in a scene lies so they can take
                  better photos. I source startups as a <strong className="text-white font-semibold">G-Fellow</strong>,
                  and I do research across AI, astronomy, and cybersecurity.
                </p>
                <p className="text-slate-400">
                  And when I step away from the screen, you'll find me playing the clarinet, playing
                  cricket, or travelling somewhere new.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={100}>
              <div className="grad-card p-6">
                <h3 className="font-display font-semibold text-white mb-4">Things I work with</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python", "C++", "Rust", "TypeScript", "Java", "SQL",
                    "PyTorch", "TensorFlow", "scikit-learn", "LangChain",
                    "FastAPI", "React Native", "Docker", "CUDA", "PostgreSQL", "Linux",
                  ].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* WORK / VENTURES */}
        <section id="work" className="py-20">
          <FadeInSection>
            <SectionHeading eyebrow="What I build" title="Ventures & teams" />
          </FadeInSection>
          <div className="grid gap-6 md:grid-cols-3">
            {ventures.map((v, i) => (
              <FadeInSection key={v.name} delay={i * 90}>
                <TiltCard href={v.links && v.links[0] && v.links[0].href} className="p-6 h-full flex flex-col">
                  {v.thumb && (
                    <div className="thumb mb-5">
                      <img src={v.thumb} alt={`${v.name} preview`} />
                    </div>
                  )}
                  <p className="eyebrow mb-2">{v.role}</p>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{v.name}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">{v.blurb}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {v.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {v.links && (
                    <div className="flex flex-wrap gap-4 pt-1">
                      {v.links.map((l) => (
                        <CardLink key={l.label} href={l.href} icon={l.icon}>{l.label}</CardLink>
                      ))}
                    </div>
                  )}
                </TiltCard>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="py-20">
          <FadeInSection>
            <SectionHeading eyebrow="Research" title="Questions worth chasing" />
          </FadeInSection>
          <div className="grid gap-6 md:grid-cols-2">
            {research.map((r, i) => (
              <FadeInSection key={r.name} delay={i * 90}>
                <TiltCard href={r.link} className="p-6 h-full">
                  <h3 className="font-display text-xl font-bold text-white mb-3">{r.name}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{r.blurb}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {r.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  {r.status && (
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-violet-200 bg-violet-500/10 border border-violet-400/20 rounded-full px-3 py-1">
                      <span className="dot" /> {r.status}
                    </span>
                  )}
                  {r.link && (
                    <a href={r.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-link text-sm text-cyan-300 font-medium">
                      Read the paper →
                    </a>
                  )}
                </TiltCard>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* PLAYGROUND */}
        <section id="playground" className="py-20">
          <FadeInSection>
            <SectionHeading eyebrow="Playground" title="Hackathons & things I've made" />
          </FadeInSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {projects.map((p, i) => (
              <FadeInSection key={p.name} delay={(i % 3) * 90}>
                <TiltCard href={p.links && p.links[0] && p.links[0].href} className="p-6 flex flex-col">
                  {p.thumb && (
                    <div className="thumb mb-5">
                      <img src={p.thumb} alt={`${p.name} preview`} />
                    </div>
                  )}
                  <h3 className="font-display text-lg font-bold text-white">{p.name}</h3>
                  <p className="eyebrow mb-3 mt-1">{p.where}</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{p.blurb}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-1">
                    {p.links.map((l) => (
                      <CardLink key={l.label} href={l.href} icon={l.icon}>{l.label}</CardLink>
                    ))}
                  </div>
                </TiltCard>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* RECOGNITION */}
        <section className="py-16">
          <FadeInSection>
            <SectionHeading eyebrow="Recognition" title="A few highlights" />
            <div className="marquee">
              <div className="marquee-track">
                {recognition.map((r) => (
                  <span key={r} className="marquee-item grad-card px-5 py-3 text-sm text-slate-200">{r}</span>
                ))}
                {recognition.map((r) => (
                  <span key={`dup-${r}`} aria-hidden="true" className="marquee-item grad-card px-5 py-3 text-sm text-slate-200">{r}</span>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>

        <hr className="hr-grad my-6" />

        {/* CONTACT */}
        <section id="contact" className="py-20">
          <FadeInSection>
            <div className="grad-card p-8 md:p-12 text-center">
              <p className="eyebrow mb-3">Let's build something</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">
                Got an idea? <span className="gradient-text">Let's talk.</span>
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                I'm always up for research collaborations, startups, and late-night hackathon ideas.
                The fastest way to reach me is email or LinkedIn.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=suhaankhanisme@gmail.com&su=Hi%20Suhaan"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Email me
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <LinkedInIcon width="18" height="18" /> LinkedIn
                </a>
                <a href={GITHUB} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <GitHubIcon width="18" height="18" /> GitHub
                </a>
              </div>
            </div>
          </FadeInSection>
        </section>

        <footer className="text-slate-500 text-sm py-10 text-center">
          © {new Date().getFullYear()} Suhaan Khan · built with Next.js &amp; Tailwind
        </footer>
      </main>
    </>
  );
}
