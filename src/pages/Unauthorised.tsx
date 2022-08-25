// Unauthorised.tsx
// By: Mika Senghaas

import PageBox from '../components/PageBox'
import * as md from '../styles/MarkdownStyles'

const Unauthorised = () => {
  return (
    <PageBox>
      <md.H1>Unauthorised</md.H1>
      <md.Divider />
      <md.P>
        Go back <md.Link to='/'>Home</md.Link>
      </md.P>
    </PageBox>
  )
}

export default Unauthorised
