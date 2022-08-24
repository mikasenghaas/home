// Material.tsx
// By: Mika Senghaas
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";

const Material = (props: any) => {
  const { material_name } = useParams();
  const { material } = props.state;
  console.log(material, material_name);

  const document = material.find((m: any) => m.short_title === material_name);

  const options = {
    overrides: {
      h1: { component: md.H1 },
      h2: { component: md.H2 },
      h3: { component: md.H3 },
      code: { component: md.CodeBlock },
      a: { component: md.Link },
      hr: { component: md.Divider },
      InlineMath: {
        component: md.InlineMath,
      },
      MathBlock: {
        component: md.MathBlock,
      },
      Emoji: {
        component: md.Emoji,
      },
    },
  };

  return (
    <PageBox>
      <TraceBack />
      <Markdown options={options}>{document.markdown}</Markdown>
    </PageBox>
  );
};

export default Material;
