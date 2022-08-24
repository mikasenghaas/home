// Material.tsx
// By: Mika Senghaas
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from '../components/PageBox'

const Material = (props: any) => {
  const { course_short, material_name } = useParams();
  const material = props.state.courses
    .find((c: any) => c.short === course_short)
    .materials.find((m: any) => m.name === material_name);

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
      }
    },
  };

  console.log(material.markdown)

  return (
    <PageBox>
      <md.Accent>
        {"> "}teaching{" > "}
        {course_short}
      </md.Accent>
      <Markdown options={options}>{material.markdown}</Markdown>
    </PageBox>
  );
};

export default Material;
