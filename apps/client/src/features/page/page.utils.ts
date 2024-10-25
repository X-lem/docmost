import slugify from "@sindresorhus/slugify";

const buildPageSlug = (pageSlugId: string, pageTitle?: string): string => {
  const titleSlug = slugify(pageTitle?.substring(0, 70) || "untitled", {
    customReplacements: [
      ["♥", ""],
      ["🦄", ""],
    ],
  });

  return `p/${titleSlug}-${pageSlugId}`;
};

export const buildPageUrl = (
  spaceSlug: string | undefined,
  pageSlugId: string,
  pageTitle?: string,
): string => {
  if (spaceSlug === undefined) {
    return `/${buildPageSlug(pageSlugId, pageTitle)}`;
  }
  return `/s/${spaceSlug}/${buildPageSlug(pageSlugId, pageTitle)}`;
};
