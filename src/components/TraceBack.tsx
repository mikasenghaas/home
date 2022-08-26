// TraceBack.tsx
// By: Mika Senghaas

import { Flex } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

// custom styles
import * as md from "../styles/MarkdownStyles";

const TraceBack = () => {
  const { pathname } = useLocation()
  const pages = pathname.substring(1).split('/')

  const prevPage = (page: string) => {
    const startIndex = pathname.match(page)?.index || -1
    const endIndex = startIndex + page.length
    const res = pathname.slice(0, endIndex)
    return res
  }

  return (
    <Flex align='baseline'>
      <Flex align='center'>
        <md.Link to='/'>
          <md.Accent fontSize='13px'>home</md.Accent>
        </md.Link>
        <md.P mx='5px' fontSize='12px'>➡️</md.P>
      </Flex>
      {
        pages.slice(0, -1).map((page: string, i: number) => {
          return (
            <Flex align='center' key={i}>
              <md.Link to={prevPage(page)}>
                <md.Accent key={i} fontSize='13px'>{page}</md.Accent>
              </md.Link>
              <md.P mx='5px' fontSize='12px'>➡️</md.P>
            </Flex>
          )
        })
      }
    </Flex>
  );
};

export default TraceBack;
