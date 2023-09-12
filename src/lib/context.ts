import React from "react";

import { FrontmatterWithSlug } from "./types";

export const PostContext = React.createContext<Record<
  string,
  FrontmatterWithSlug[]
> | null>(null);
