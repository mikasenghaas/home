// Not Found.tsx
// By: Mika Senghaas

// custom Styles
import * as md from '../styles/MarkdownStyles'

// custom components
import PageBox from '../components/PageBox'

const NotFound = () => {
  return (
    <PageBox>
      <md.H1 mt='1.5rem'>NotFound</md.H1>
      <md.Divider />
      <md.P><md.Emoji>satelite</md.Emoji> Something seemed to have gone wrong. This page does not exist.</md.P>
      <md.P>Go back <md.Link to="/">home</md.Link></md.P>
    </PageBox>
  )
}

export default NotFound;
