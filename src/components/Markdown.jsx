import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkGemoji from "remark-gemoji";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// syntax highlighting of code
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism";

import * as md from "../styles/MarkdownStyles";

const Markdown = (props: any) => {
  return (
    <ReactMarkdown
      children={props.children}
      remarkPlugins={[remarkGfm, remarkSlug, remarkGemoji, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ node, ...props }) => <md.H1 {...props} />,
        h2: ({ node, ...props }) => <md.H2 {...props} />,
        h3: ({ node, ...props }) => <md.H3 {...props} />,
        hr: ({ node, ...props }) => <md.Divider {...props} />,
        p: ({ node, ...props }) => <md.P {...props} />,
        a: ({ node, ...props }) => <md.Link {...props} />,
        b: ({ node, ...props }) => <md.P {...props} fontWeight="bold" />,
        ul: ({ node, ...props }) => (
          <ul style={{ marginLeft: "20px" }} {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol style={{ marginLeft: "20px" }} {...props} />
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={solarizedDarkAtom}
              PreTag="div"
              {...props}
            />
          ) : (
            <md.InlineCode {...props}>{children}</md.InlineCode>
          );
        },
      }}
    />
  );
};

export default Markdown;
