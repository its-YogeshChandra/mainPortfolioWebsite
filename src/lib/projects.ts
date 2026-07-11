import imgHold from "@/imports/Iframe/b0603b97b88e17d5458cb256cb1629e1605ff2e3.png";
import imgMellu from "@/imports/Iframe/4a2c94e33fe5d45142c61ae9f404d70cfc566a46.png";
import imgLyoon from "@/imports/Iframe/6a3095d3a7a3e201e73ab71822d8cb8135a2055d.png";
import imgStevara from "@/imports/Iframe/01d0f120358c25947ab5a86f97206a4f748318d5.png";
import imgSard from "@/imports/Iframe/500678c7f347bfcb99dd29424a1dc36f24afdd6e.png";
import imgSip from "@/imports/Iframe/a168604a3c8914d84cdf00dd18b2745f64bcde7b.png";
import imgAboutTheBrand from "@/imports/Iframe/b6a16a484594f7353a8fe3d8141e5af4da6998ab.png";
import imgSahran from "@/imports/Iframe/70b687f976005a0b76eeada2977af6bd53604014.png";
import portfolioData from "../../context/portfolio-projects.json";

type ProjectLinks = Record<string, string | null | undefined>;

type RawProject = {
  id: string;
  title: string;
  summary: string;
  image?: string;
  mediaLinks?: string[];
  technologies?: string[];
  role?: string;
  whatItDoes?: string;
  problem?: string;
  approach?: string;
  highlights?: string[];
  links?: ProjectLinks;
  status?: string;
};

export type ProjectMediaType = "image" | "video" | "embed";

export type ProjectMedia = {
  src: string;
  type: ProjectMediaType;
};

export type PortfolioProject = RawProject & {
  id: string;
  category: string;
  col: number;
  imageSrc: string;
  media: ProjectMedia[];
  coverMedia: ProjectMedia;
};

const fallbackImages = [
  imgHold,
  imgStevara,
  imgSip,
  imgMellu,
  imgSard,
  imgAboutTheBrand,
  imgLyoon,
  imgSahran,
];

function getFallbackImage(index: number) {
  return fallbackImages[index % fallbackImages.length].src;
}

function resolveImage(project: RawProject, index: number) {
  if (project.image?.startsWith("http://") || project.image?.startsWith("https://")) {
    return project.image;
  }

  return getFallbackImage(index);
}

function getMediaType(src: string): ProjectMediaType {
  const lowerSrc = src.toLowerCase();
  const pathWithoutQuery = lowerSrc.split("?")[0];

  if (
    lowerSrc.includes("player.cloudinary.com/embed") ||
    lowerSrc.includes("youtube.com/embed") ||
    lowerSrc.includes("player.vimeo.com/video")
  ) {
    return "embed";
  }

  if (
    lowerSrc.includes("/video/upload/") ||
    /\.(mp4|webm|ogg|mov|m4v)$/.test(pathWithoutQuery)
  ) {
    return "video";
  }

  return "image";
}

function resolveMedia(project: RawProject, index: number): ProjectMedia[] {
  const mediaLinks = project.mediaLinks
    ?.filter((src): src is string => typeof src === "string" && src.trim().length > 0)
    .map((src) => {
      const trimmedSrc = src.trim();

      return {
        src: trimmedSrc,
        type: getMediaType(trimmedSrc),
      };
    });

  if (mediaLinks?.length) {
    return mediaLinks;
  }

  const imageSrc = resolveImage(project, index);

  return [{ src: imageSrc, type: getMediaType(imageSrc) }];
}

function getCategory(project: RawProject) {
  if (!project.technologies?.length) {
    return project.status ?? "Portfolio Project";
  }

  return project.technologies.slice(0, 2).join(" / ");
}

export const projects: PortfolioProject[] = portfolioData.projects.map(
  (project: RawProject, index: number) => {
    const media = resolveMedia(project, index);
    const coverMedia = media[0];

    return {
      ...project,
      category: getCategory(project),
      col: index % 3,
      imageSrc: coverMedia.src,
      media,
      coverMedia,
    };
  },
);

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
