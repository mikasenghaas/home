// Projects.tsx
// By: Mika Senghaas
import { Box } from '@chakra-ui/react'

// custom styles
import * as md from '../styles/MarkdownStyles'

// custom components
import PageBox from '../components/PageBox'

const Projects = (props: any) => {
  return (
    <PageBox>
      <md.H1 mt='1.5rem'>Projects</md.H1>
      <md.Divider />
      <md.P>Project will appear here soon.</md.P>
    </PageBox>
  )
}

export default Projects;
