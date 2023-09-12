type Course =
  | "Algorithms and Data Structures"
  | "Introduction to Machine Learning"
  | "Applied Statistics";

export type Frontmatter = {
  title: string;
  description?: string;
  course?: Course;
  tags: string[];
  published: string;
  lastEdited: string;
};

export type FrontmatterWithSlug = Frontmatter & {
  slug: string;
};

export type GroupedFrontmatterWithSlug = Record<string, FrontmatterWithSlug[]>;

export type Heading = {
  id: string;
  title: string;
};
