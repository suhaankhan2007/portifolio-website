// pages/index.js
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

function FadeInSection({ children, className = "" }) {
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
      className={`${className} fade-preserve transform transition duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const projects = [
    {
      title: "Dark Matter Detection via AI-Enhanced Gravitational Microlensing",
      desc: 'Developed an ML model that detects microlensing events 10x faster with 97% accuracy. Used 600,000 stars from The Zwicky Transient Facility to train AI models for dark matter detection. Achieved 3rd place at Texas Science & Engineering Fair (out of 20,000+ entries) and 2nd place at Texas Junior Academy of Science. Research paper in progress.',
      tags: ["Python", "PyTorch", "KNN", "Astrophysics"],
      href: "#microlensing",
      paperLink: "https://www.researchgate.net/publication/393538243_The_Utilization_of_AI_in_Gravitational_Microlensing_Techniques_to_Further_Dark_Matter_Detection",
      paperThumbnail: "/images/ResearchPaperThumbnail.png",
    },
    {
      title: "Texas Science & Engineering Fair - 3rd Place",
      desc: "Achieved 3rd place out of 20,000+ entries at TXSEF for dark matter detection research using AI-enhanced microlensing. Developed ML model with 97% accuracy that detects microlensing events 10x faster than traditional methods. Research paper in progress.",
      tags: ["AI", "Research", "Astrophysics", "Machine Learning"],
      href: "#txsef",
      paperLink: "https://txsef.tamu.edu/awards/2025-category-awards/",
      paperThumbnail: "/images/TXSEF_Photo.png",
    },
    {
      title: "BOSS Algorithm Research at SMU",
      desc: "Conducted research on $2000 grant at Southern Methodist University with graduate students on BOSS Algorithm and its capabilities in enhancing machine learning techniques. Presented findings to SMU professors and graduate students.",
      tags: ["Research", "Machine Learning", "SMU", "Grant"],
      href: "#boss",
    },
    {
      title: "Exoplanet Detection AI Model",
      desc: "Pioneered novel AI model for exoplanet detection using Python, Convolutional Neural Networks, and KNN algorithms. Presented findings to 100+ researchers in virtual conference. Also developed AI model for breast cancer cell detection.",
      tags: ["AI", "Python", "CNN", "Astronomy"],
      href: "#exoplanet",
    },
  ];

  return (
    <>
      <Head>
        <meta name="author" content="Suhaan Khan" />
      </Head>

      <div className="min-h-screen py-12">
        <div className="main-container">
          {/* NAV */}
          <nav className="flex items-center justify-between mb-8">
            <div className="text-white">
              <a href="/" className="text-xl font-semibold hover:opacity-95">Suhaan Khan</a>
            </div>
            <div className="space-x-4 text-sm text-slate-300">
              <a className="inline-link nav-link" href="#projects">Projects</a>
              <a className="inline-link nav-link" href="#achievements">Achievements</a>
              <a className="inline-link nav-link" href="#about">About</a>
              <a className="inline-link nav-link" href="#contact">Contact</a>
              <a className="inline-link nav-link" href="https://www.linkedin.com/in/suhaan-khan-333ab22ba/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </nav>

          {/* HERO */}
          <header className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-14">
            <FadeInSection>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Hi — I’m <span className="text-indigo-400">Suhaan</span>.
              </h1>
              <p className="mt-4 text-slate-300 max-w-2xl">
                <em className="text-slate-400">
                  I'm passionate about AI, astrophysics research, and entrepreneurship.
                </em>
              </p>

              <div className="mt-6 text-slate-300 max-w-3xl">
                <p className="text-slate-300 mb-4">
                  <strong> Hi everyone! My name is Suhaan Khan and I am an incoming freshman at UIUC </strong> I am interested in AI and astrophysics research, love playing the clarinet, and enjoy reading books and playing Cricket in my free time! I am almost always interested in working on research projects or startupso so contact me if you want to work together on a new idea.
                </p>
                
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-indigo-300 font-semibold">Education</p>
                    <p className="text-slate-400">McNeil High School • Class of 2025</p>
                    <p className="text-slate-400">GPA: 3.9 Unweighted • 5.5/6.0 Weighted</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="#projects" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow btn-primary">See my work</a>
                <a href="#contact" className="px-4 py-2 border border-indigo-400 text-indigo-200 rounded-md btn-primary">Get in touch</a>
              </div>
            </FadeInSection>

            <FadeInSection className="flex justify-center">
              {/* Replace /images/profile.jpg with your photo (recommended 800x800) */}
              
            <Image
              src="/images/profile2.jpg"
              alt="Suhaan Khan"
              width={800}
              height={800}
              className="object-cover rounded-full w-72 h-72 shadow-lg border-4 border-indigo-400 profile-image"
            />
            </FadeInSection>
          </header>

          {/* PROJECTS */}
          <section id="projects" className="mb-16">
            <FadeInSection>
              <h2 className="text-2xl font-bold mb-4">Featured work</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((p) => (
                  <article key={p.title} className="glass p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold text-white">
                      <a href={p.href} className="inline-link">{p.title}</a>
                    </h3>
                    <p className="mt-2 text-slate-300 text-sm">{p.desc}</p>


                  {p.paperLink && (
                    <a
                      href={p.paperLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block research-link"
                    >
                      <img
                        src={p.paperThumbnail}
                        alt={`Thumbnail for ${p.title}`}
                        className="rounded-lg border border-slate-700"
                      />
                    </a>
                  )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => <span key={t} className="text-xs px-2 py-1 rounded border text-slate-200 tag">{t}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </FadeInSection>
          </section>

          {/* ACHIEVEMENTS */}
          <section id="achievements" className="mb-16">
            <FadeInSection>
              <h2 className="text-2xl font-bold mb-4">Notable Achievements</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="glass p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-white mb-3">Research Excellence</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Texas Science & Engineering Fair: 3rd Place (20,000+ entries)</li>
                    <li>• Texas Junior Academy of Science: 2nd Place</li>
                    <li>• International Research Olympiad Scholar (2x)</li>
                    <li>• Research paper on dark matter detection in progress</li>
                  </ul>
                </div>
                
                <div className="glass p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-white mb-3">Cybersecurity</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• CyberPatriots National Semifinalist (Top 1%)</li>
                    <li>• SANS Scholarship ($3,400 value)</li>
                    <li>• Led McNeil to Nationals (Top 0.5%)</li>
                    <li>• Taught 33+ students cybersecurity principles</li>
                  </ul>
                </div>

                <div className="glass p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-white mb-3">Leadership & Innovation</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Texas Science & Engineering Fair 3rd Place (20,000+ entries)</li>
                    <li>• Reached 14+ countries, 500+ students</li>
                    <li>• AI Ambassador teaching AI Ethics globally</li>
                    <li>• Published game with 10,000+ downloads</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href="https://github.com/suhaankhan07" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  View My GitHub
                </a>
              </div>
            </FadeInSection>
          </section>

          {/* ABOUT */}
          <section id="about" className="mb-16">
            <FadeInSection>
              <h2 className="text-2xl font-bold mb-4">About me</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-slate-300">
                  <p className="mb-3">
                    I'm an incoming freshman at UIUC passionate about AI, ML, and astrophysics research. I enjoy exploring how machine learning can help solve complex problems in astronomy and physics, and I'm always excited to learn from others in the field.
                  </p>

                  <div className="mb-3">
                    <strong>Research & Collaboration Areas</strong>
                    <ul className="list-disc ml-6 text-slate-400 mt-2">
                      <li>Working on dark matter detection using AI-enhanced microlensing techniques</li>
                      <li>Texas Science & Engineering Fair 3rd Place - AI-enhanced dark matter detection research</li>
                      <li>Collaborating on BOSS Algorithm research at SMU</li>
                      <li>Exploring AI models for exoplanet detection and medical imaging</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="glass p-4 rounded-lg">
                    <h4 className="font-semibold text-white">Tech stack</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Python","PyTorch","TensorFlow","C++","Java","React Native","JavaScript","HTML/CSS","Linux","Git"].map(t => (
                        <span key={t} className="px-3 py-1 border rounded text-sm text-slate-200 tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 text-slate-300 text-sm">
                    <h4 className="font-semibold mb-2">Awards & Recognition</h4>
                    <ul className="text-slate-400 text-xs space-y-1">
                      <li>• International Research Olympiad Scholar (2x)</li>
                      <li>• Texas Science & Engineering Fair 3rd Place</li>
                      <li>• CyberPatriots National Semifinalist</li>
                      <li>• SANS Scholarship ($3400 value)</li>
                      <li>• AP Scholar with Distinction</li>
                    </ul>
                  </div>

                  <div className="mt-4 text-slate-300 text-sm">
                    <h4 className="font-semibold mb-2">Availability</h4>
                    <p>Always excited to collaborate on research projects, internships, and entrepreneurship ideas. I love learning from others and working together to solve interesting problems. Feel free to reach out if you'd like to work on something together.</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </section>

          {/* CONTACT */}
          <section id="contact" className="mb-12">
            <FadeInSection>
              <div className="glass p-6 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Get in touch</h3>
                  <p className="text-slate-300 mt-1">Email: <a className="inline-link" href="mailto:suhaankhanisme@gmail.com">suhaankhanisme@gmail.com</a></p>
                  <p className="text-slate-300 mt-1">GitHub: <a className="inline-link" href="https://github.com/suhaankhan07" target="_blank" rel="noreferrer">github.com/suhaankhan07</a></p>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-3">
                  <a href="https://github.com/suhaankhan07" target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md btn-primary">GitHub</a>
                  <a href="https://www.linkedin.com/in/suhaan-khan-333ab22ba/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white btn-primary">LinkedIn</a>
                </div>
              </div>
            </FadeInSection>
          </section>

          <footer className="text-slate-500 text-sm py-8">© {new Date().getFullYear()} Suhaan Khan — built with Next.js & Tailwind</footer>
        </div>
      </div>
    </>
  );
}
