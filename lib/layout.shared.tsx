import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import {
  appName,
  gitConfig,
  SELECTOR_URL,
} from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <img
            src="/brand/logo/favicon-32.png"
            alt=""
            width={22}
            height={22}
            className="rounded-sm"
          />
          {appName}
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: "Docs",
        url: "/docs",
        active: "nested-url",
      },
      {
        text: "Files",
        url: "/docs/files",
        active: "url",
      },
      {
        text: "Series",
        url: "/docs/series",
        active: "url",
      },
      {
        text: "Selector ↗",
        url: SELECTOR_URL,
        external: true,
      },
    ],
  };
}
