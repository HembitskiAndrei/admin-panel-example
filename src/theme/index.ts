import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      "#root": {
        display: 'flex',
        flexDirection: 'column',
        minHeight: "100vh",
      },
      "form": {
        minHeight: "100%",
        minWidth: "100%",
      }
    },
  },
  textStyles: {
    h1: {
      fontSize: ['24px', '36px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['18px', '24px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  },
  
})

export default theme