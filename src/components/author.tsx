"use client"

import React from "react";
import type { Author } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Author({ author, includeFirstName, className }: { author: Author; includeFirstName: boolean, className: string }) {
  if (!author) return null;
  const name = includeFirstName ? `${author.firstName.at(0)}. ${author.lastName}` : author.lastName;

  if (author.href) {
    return (
      <a
        href={author.href}
        target="_blank"
        className={cn("cursor-pointer text-nowrap", className)}
      >
        {name}
      </a>
    );
  } else {
    return (
      <span
        className={cn("text-nowrap", className)}
      >
        {name}
      </span>
    );
  }
}


export function AuthorList({ authors, short }: { authors: Author[] | undefined, short?: boolean }) {
  if (!authors) return null;

  if (short) {
    return (
      <>
        <Author
          author={authors[0]}
          includeFirstName={false}
          className="text-base font-light text-muted-foreground sm:text-lg"
        />
        <span className="font-light text-muted-foreground sm:text-lg">et al.</span>
      </>
    );
  }
  return (
    <div className="flex flex-wrap items-center text-muted-foreground truncate">
      {authors.map((author, index) => (
        <React.Fragment key={`${author.firstName}_${author.lastName}`}>
          <Author
            author={author}
            includeFirstName={true}
            className={`text-base font-light text-muted-foreground sm:text-lg ${
              author.firstName === 'Mika' && author.lastName === 'Senghaas' ? 'underline underline-offset-4 ' : ''
            }`}
          />
          {index < authors.length - 1 && <span>,</span>}
          {index < authors.length - 1 && <span>&nbsp;</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
