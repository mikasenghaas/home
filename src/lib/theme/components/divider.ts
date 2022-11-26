import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const inText = defineStyle({
    borderWidth: 1,
    borderStyle: 'solid',
    my: 3
})

const afterHeader = defineStyle({
    borderWidth: 1.5,
    borderStyle: 'solid',
    mt: 1,
    mb: 5,
})

const dividerTheme = defineStyleConfig({
    variants: { inText, afterHeader },
    defaultProps: {
        variant:'inText'
    }
})

export default dividerTheme;