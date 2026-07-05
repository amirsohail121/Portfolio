import React from "react";

function About() {
  const focus = [
    "MERN Stack",
    "AI Integration",
    "Socket.io",
    "Cloud",
  ];

  return (
    <section id="about" className="py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono">
            Get To Know Me
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mt-2"
            style={{ color: "var(--text-heading)" }}
          >
            About <span className="text-yellow-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 rounded-full mt-3" />
        </div>

        {/* About Card */}
        <div
          className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          {/* Terminal Bar - full width */}
          <div
            className="flex items-center gap-1.5 px-6 py-3 border-b"
            style={{  borderColor: "var(--border)" }}
          >
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
            <span
              className="ml-3 font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              about_me.js
            </span>
          </div>

          {/* Card Content */}
          <div className="p-8 md:p-10">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-center">

              {/* Left */}
              <div>
                <h3
                  className="text-3xl font-bold mb-5"
                  style={{ color: "var(--text-heading)" }}
                >
                  Hi, I'm Amir Sohail 👋
                </h3>

                <p
                  className="leading-8 text-base"
                  style={{ color: "var(--text-muted)" }}
                >
                  I'm a{" "}
                  <span className="font-semibold" style={{ color: "var(--text-heading)" }}>
                    third-year Computer Science student
                  </span>{" "}
                  and a{" "}
                  <span className="font-semibold" style={{ color: "var(--text-heading)" }}>
                    Full Stack MERN Developer
                  </span>
                  . I enjoy building modern web applications that solve real-world
                  problems through clean architecture, responsive interfaces, and
                  scalable backend systems.
                </p>

                <p
                  className="leading-8 mt-5"
                  style={{ color: "var(--text-muted)" }}
                >
                  I'm currently exploring AI integration, real-time applications,
                  and cloud technologies while continuously improving my
                  full-stack development skills. My goal is to become a{" "}
                  <span className="font-semibold" style={{ color: "var(--text-heading)" }}>
                    Full Stack AI Developer
                  </span>{" "}
                  building intelligent, production-ready software.
                </p>
              </div>

              {/* Right */}
              <div className="space-y-5">

                {/* Focus */}
                <div
                  className="rounded-2xl border p-5"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: "var(--text-heading)" }}>
                    🎯 Current Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {focus.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-2 rounded-full border border-yellow-500 text-yellow-500 text-xs hover:bg-yellow-500 hover:text-black transition"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* What Drives Me */}
                <div
                  className="rounded-2xl border p-5"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: "var(--text-heading)" }}>
                    💡 What Drives Me
                  </h4>
                  <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">✓</span> Building real-world applications
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">✓</span> Learning modern technologies
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">✓</span> Writing clean & maintainable code
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">✓</span> Solving meaningful problems
                    </li>
                  </ul>
                </div>

                {/* Resume Button */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-yellow-500 text-black transition-all duration-300 hover:bg-yellow-400"
                >
                  Download Resume ↓
                </a>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default About;