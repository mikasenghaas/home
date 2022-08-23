// Home.tsx
// By: Mika Senghaas

// custom styles
import { H2, H3, P, InlineCode, CodeBlock, InlineMath, MathBlock, Link, Divider } from "../styles/MarkdownStyles";

const Home = () => {
  const testCode = `def main(): 
  print('Hello World')
`

  const inlineMath = `This is inline math: $a^2 + b^2 = c^2$`
  const test = `
$$
A =
\\begin{bmatrix}
   1 & 0 \\\\
   0 & 1
\\end{bmatrix}\\newline
B =
\\begin{bmatrix}
   0 & 1 \\\\
   1 & 0
\\end{bmatrix}
$$
`

  return (
    <>
      <div style={{height: 100}}></div>
      <H2>Home</H2>
      <Divider height={1}/>
      <P>This is a test, let's see if this code snippet <InlineCode>works</InlineCode>. This looks good so far. Does line breakign also work well? This is really important</P>
      <CodeBlock>{testCode}</CodeBlock>
      <P>Check out my <Link url='https://github.com/jonas-mika/dotfiles'>GitHub page</Link></P>
      <InlineMath>{inlineMath}</InlineMath>
      <MathBlock>{test}</MathBlock>
      <P>This is a test, let's see if this code snippet <InlineCode>works</InlineCode>. This looks good so far. Does line breakign also work well? This is really important</P>
      <P>This is a test, let's see if this code snippet <InlineCode>works</InlineCode>. This looks good so far. Does line breakign also work well? This is really important</P>
      <P>This is a test, let's see if this code snippet <InlineCode>works</InlineCode>. This looks good so far. Does line breakign also work well? This is really important</P>
    </>
  );
};

export default Home;
