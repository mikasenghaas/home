// H1.tsx
// By: Mika Senghaas

import { Heading } from '@chakra-ui/react'

export const H1 = (props: any) => {
  return (
    <Heading
      size='xl'
      ml='-12px'
      _before={{
        content: '"#"',
        position: 'relative',
        bottom: 0,
        fontSize: 16,
      }}
    >{props.children}</Heading>
  )
}

export const H2 = (props: any) => {
  return (
    <Heading
      size='l'
      ml='-12px'
      _before={{
        content: '"##"',
        position: 'relative',
        bottom: 0,
        fontSize: 16,
      }}
    >{props.children}</Heading>
  )
}
