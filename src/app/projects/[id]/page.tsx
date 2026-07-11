import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ProjectMediaShowcase } from "@/components/project-media-showcase";
import { getProjectById, projects } from "@/lib/projects";

type ProjectRouteProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectRouteProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Yogesh Chandra Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectRouteProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const links = Object.entries(project.links ?? {}).flatMap(([label, value]) =>
    typeof value === "string" && value.length > 0 ? [{ label, href: value }] : [],
  );

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] transition-colors dark:bg-[#0a0a0a]">
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
              Project Detail
            </span>
          </div>
          <div className="col-span-2 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-7 pt-12 pb-20">
        <Link
          href="/"
          className="text-[#737373] text-xs font-medium tracking-[0.12em] uppercase transition-colors hover:text-[#171717] dark:text-[#a3a3a3] dark:hover:text-[#f5f5f5]"
        >
          ← Back to portfolio
        </Link>

        <section className="mt-8 grid grid-cols-12 gap-10">
          <ProjectMediaShowcase media={project.media} title={project.title} />

          <div className="col-span-4 flex flex-col gap-4">
            <p className="text-[#737373] text-xs font-medium tracking-[0.12em] uppercase dark:text-[#a3a3a3]">
              Project
            </p>
            <h1 className="text-[#0a0a0a] text-4xl font-semibold leading-tight dark:text-[#f5f5f5]">
              {project.title}
            </h1>
            {project.status ? (
              <p className="text-[#737373] text-[13px] font-medium uppercase tracking-wide dark:text-[#a3a3a3]">
                {project.status}
              </p>
            ) : null}
          </div>

          <div className="col-span-5 flex flex-col gap-8">
            <DetailSection label="What it does">
              <p>{project.whatItDoes ?? project.summary}</p>
            </DetailSection>

            {project.problem ? (
              <DetailSection label="Problem">
                <p>{project.problem}</p>
              </DetailSection>
            ) : null}

            {project.approach ? (
              <DetailSection label="Approach">
                <p>{project.approach}</p>
              </DetailSection>
            ) : null}

            {project.highlights?.length ? (
              <DetailSection label="Highlights">
                <ul className="flex list-disc flex-col gap-2 pl-5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </DetailSection>
            ) : null}
          </div>

          <aside className="col-span-3 flex flex-col gap-8 border-l border-[#e5e5e5] pl-8 dark:border-[#262626]">
            {links.length ? (
              <DetailSection label="Links">
                <div className="flex flex-col gap-3">
                  {links.map(({ label, href }) => (
                    <Button
                      key={label}
                      asChild
                      variant="outline"
                      size="sm"
                      className="justify-start rounded-[3px] border-[#bfbfbf] text-xs font-medium uppercase tracking-[0.12em] dark:border-[#525252] dark:bg-[#171717] dark:text-[#f5f5f5] dark:hover:bg-[#262626]"
                    >
                      <a href={href} target="_blank" rel="noreferrer">
                        {label.replace(/_/g, " ")}
                      </a>
                    </Button>
                  ))}
                </div>
              </DetailSection>
            ) : null}

            {project.technologies?.length ? (
              <DetailSection label="Technologies">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border border-[#d4d4d4] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#404040] dark:border-[#525252] dark:text-[#d4d4d4]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </DetailSection>
            ) : null}

            <DetailSection label="Role">
              <p>{project.role ?? "Project contributor"}</p>
            </DetailSection>
          </aside>
        </section>
      </main>
    </div>
  );
}

function DetailSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 text-[#0a0a0a] text-[15px] font-medium leading-relaxed dark:text-[#f5f5f5]">
      <p className="text-[#737373] text-xs font-medium tracking-[0.12em] uppercase dark:text-[#a3a3a3]">
        {label}
      </p>
      {children}
    </section>
  );
}
