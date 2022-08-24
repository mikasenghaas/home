// Home.tsx
// By: Mika Senghaas

// custom styles
import * as md from "../styles/MarkdownStyles";

// custom components
import PageBox from '../components/PageBox'

const Home = () => {
  return (
    <PageBox>
      <md.H1 mt='1.5rem'>Home</md.H1>
      <md.Divider />
      <md.Emoji>sparkles</md.Emoji>
    </PageBox>
  );
};

export default Home;
