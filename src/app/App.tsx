"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects, type PortfolioProject, type ProjectMedia } from "@/lib/projects";

const skills = [
  { label: "Languages", value: "HTML, CSS, JavaScript, TypeScript, Rust" },
  { label: "Frameworks", value: "Vite React, Next.js, Express, Actix, Tokio, Actix WebSocket" },
  { label: "Tools", value: "FFmpeg, Multer, Axios, Mongoose, Prisma, Diesel, SQLx, Zod, React Hook Form" },
  { label: "Messaging", value: "Redis, RabbitMQ" },
  { label: "Databases", value: "PostgreSQL, MongoDB" },
  { label: "DevOps", value: "Docker, Podman, Nginx, WireGuard" },
];

const sectionHeadingClass =
  "text-[#0a0a0a] text-[19px] font-semibold leading-snug tracking-[0.04em] uppercase dark:text-[#f5f5f5]";
const sectionBodyClass =
  "text-[#737373] text-[16px] font-medium leading-relaxed dark:text-[#a3a3a3]";
const keywordClass = "font-semibold text-[#171717] dark:text-[#f5f5f5]";

export default function App() {
  const contactRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] transition-colors dark:bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#e5e5e5] bg-white transition-colors dark:border-[#262626] dark:bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-7 py-3 grid grid-cols-12 items-center gap-5">
          <div className="col-span-4">
            <Link
              href="/"
              className="font-medium text-[#171717] text-sm tracking-wide dark:text-[#f5f5f5]"
            >
              YOGESH CHANDRA
            </Link>
          </div>
          <div className="col-span-6">
            <span className="font-medium text-[#171717] text-sm dark:text-[#f5f5f5]">
              Full-stack Developer &nbsp;|&nbsp; Blockchain Enthusiast
            </span>
          </div>
          <div className="col-span-2 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-[1400px] mx-auto px-7 pt-20 pb-20">
        {/* Info Section — 3 columns */}
        <section className="grid grid-cols-3 gap-10 mb-16">
          {/* About */}
          <div className="flex flex-col gap-4">
            <p className={sectionHeadingClass}>
              About
            </p>
            <p className={sectionBodyClass}>
              <strong className={keywordClass}>Full-stack developer</strong> with a
              strong interest in <strong className={keywordClass}>blockchain</strong>,
              <strong className={keywordClass}> Rust</strong>, and
              <strong className={keywordClass}> Solana</strong>. I enjoy building
              scalable systems, clean APIs, and reliable backends with modern web
              technologies.
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-4">
            <p className={sectionHeadingClass}>
              Description
            </p>
            <p className={sectionBodyClass}>
              I build <strong className={keywordClass}>full-stack products</strong>
              across modern web and blockchain ecosystems, with a strong focus on
              <strong className={keywordClass}> Solana-based applications</strong>.
              My work spans frontend interfaces, backend APIs,
              <strong className={keywordClass}> smart contracts</strong>,
              infrastructure, and integrations that turn complex technical systems
              into reliable user-facing products. I enjoy working at the
              intersection of performant web platforms,
              <strong className={keywordClass}> secure on-chain flows</strong>, and
              clean developer-friendly architecture.
            </p>
            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs tracking-[0.12em] uppercase px-5 h-10 font-medium rounded-[3px] border-[#bfbfbf] dark:border-[#525252] dark:bg-[#171717] dark:text-[#f5f5f5] dark:hover:bg-[#262626]"
              >
                Resume
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={scrollToContact}
                className="text-xs tracking-[0.12em] uppercase px-5 h-10 font-medium rounded-[3px]"
              >
                Contact
              </Button>
            </div>
          </div>

          {/* Skills & Tech */}
          <div className="flex flex-col gap-4">
            <p className={sectionHeadingClass}>
              Skills &amp; tech
            </p>
            <div className="flex flex-col gap-[10px]">
              {skills.map((skill) => (
                <p
                  key={skill.label}
                  className="text-[#737373] text-[16px] font-medium leading-relaxed dark:text-[#a3a3a3]"
                >
                  <strong className={keywordClass}>{skill.label}:</strong> {skill.value}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid — 3 columns */}
        <section className="grid grid-cols-3 gap-5">
          {/* Column 0 */}
          <div className="flex flex-col gap-5">
            {projects
              .filter((project) => project.col === 0)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
          {/* Column 1 */}
          <div className="flex flex-col gap-5">
            {projects
              .filter((project) => project.col === 1)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-5">
            {projects
              .filter((project) => project.col === 2)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </section>
      </main>

      {/* Footer / Contact Section */}
      <footer
        ref={contactRef}
        className="border-t border-[#e5e5e5] bg-white transition-colors dark:border-[#262626] dark:bg-[#0a0a0a]"
        id="contact"
      >
        <div className="max-w-[1400px] mx-auto px-7 py-16">
          {/* Top row: portfolio info + contact */}
          <div className="flex items-start justify-between mb-10">
            {/* Left */}
            <div className="flex flex-col gap-2">
              <p className="text-[#737373] text-xs tracking-[0.18em] uppercase dark:text-[#a3a3a3]">
                Portfolio
              </p>
              <p className="text-[#171717] text-[13px] font-semibold dark:text-[#f5f5f5]">
                Last updated May 28, 2025
              </p>
              <p className="text-[#737373] text-[13px] dark:text-[#a3a3a3]">
                All rights reserved 2026
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-1">
              <p className="text-[#737373] text-xs tracking-[0.18em] uppercase dark:text-[#a3a3a3]">
                Contact
              </p>
              <p className="text-[#171717] text-2xl font-semibold mt-1 dark:text-[#f5f5f5]">
                {"Let's build something together."}
              </p>
              <a
                href="itsurychandra@gmail.com"
                className="text-[#171717] text-base font-medium underline decoration-[#a3a3a3] mt-1 hover:decoration-[#171717] transition-colors dark:text-[#f5f5f5] dark:hover:decoration-[#f5f5f5]"
              >
                itsurychandra@gmail.com
              </a>
              <p className="text-[#737373] text-sm dark:text-[#a3a3a3]">Uttarakhand, India</p>
            </div>
          </div>

          {/* Bottom border + social links */}
          <div className="border-t border-[#e5e5e5] pt-6 dark:border-[#262626]">
            <div className="flex gap-7">
              {["X.com", "LinkedIn", "Github"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#404040] text-[13px] font-medium hover:text-[#0a0a0a] transition-colors dark:text-[#d4d4d4] dark:hover:text-[#ffffff]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Link className="group block cursor-pointer" href={`/projects/${project.id}`}>
      <div className="overflow-hidden border border-[#e5e7eb] bg-white transition-colors dark:border-[#262626] dark:bg-[#171717]">
        <ProjectCardMedia media={project.coverMedia} title={project.title} />
      </div>
      <div className="mt-4">
        <p className="text-[#0a0a0a] text-[13px] font-medium uppercase tracking-wide dark:text-[#f5f5f5]">
          {project.title}
        </p>
        <p className="text-[#6b7280] text-[11px] uppercase tracking-wide mt-0.5 dark:text-[#a3a3a3]">
          {project.category}
        </p>
      </div>
    </Link>
  );
}

function ProjectCardMedia({ media, title }: { media: ProjectMedia; title: string }) {
  const mediaClassName =
    "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]";

  if (media.type === "embed") {
    return (
      <iframe
        src={media.src}
        title={`${title} preview`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className={`${mediaClassName} pointer-events-none border-0`}
      />
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={media.src}
        muted
        playsInline
        loop
        preload="metadata"
        className={mediaClassName}
      />
    );
  }

  return <img src={media.src} alt={title} className={mediaClassName} />;
}
