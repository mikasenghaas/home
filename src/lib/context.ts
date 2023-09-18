import React from "react";

import { FrontmatterWithSlug } from "./types";

export const PostFrontmatterContext = React.createContext<Record<
  string,
  FrontmatterWithSlug[]
> | null>(null);
