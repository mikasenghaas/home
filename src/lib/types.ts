type Course =
  | "Algorithms and Data Structures"
  | "Introduction to Machine Learning"
  | "Applied Statistics";

export type Frontmatter = {
  title: string;
  description?: string;
  course?: Course;
  links?: Link[];
  authors?: Author[];
  organisation?: string;
  tags: string[];
  published: string;
  lastEdited: string;
  released?: string;
  publish?: boolean;
};

export type FrontmatterWithSlug = Frontmatter & {
  slug: string;
};

export type GroupedFrontmatterWithSlug = Record<string, FrontmatterWithSlug[]>;

export type Link = {
  title: string;
  href: string;
  description?: string;
};

export type Author = {
  firstName: string;
  lastName: string;
  href?: string;
};

export type Heading = {
  id: string;
  title: string;
};

// from next
export type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
