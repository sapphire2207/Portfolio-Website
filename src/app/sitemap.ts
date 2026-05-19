import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteRoot = "https://demo.com";
  const lastModified = "2026-04-24";

  return [
    { url: siteRoot, lastModified },
    { url: `${siteRoot}/about`, lastModified },
    { url: `${siteRoot}/projects`, lastModified },
    {
      url: `${siteRoot}/project/fashora-ai-powered-full-stack-e-commerce-platform`,
      lastModified,
    },
    {
      url: `${siteRoot}/project/secretly-ai-powered-anonymous-messaging-platform`,
      lastModified,
    },
    { url: `${siteRoot}/project/youtube-twitter-backend-api`, lastModified },
  ];
}

