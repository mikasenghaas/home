import * as md from '../styles/MarkdownStyles'

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

export default options
