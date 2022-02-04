import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      white: '#FFFFFF',
      black: '#050301',
      beige: ' #FDD5C0',
      pink: '#FB8289',
      red: '#F46161',
      orange: '#F89D5B',
      yellow: '#FFCF62',
    }
  },
  fonts: {
    logo: 'Oleo Script',
    heading: 'Open Sans',
    body: 'Raleway',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.white',
        color: 'brand.black',
        height: "100vh",
      },
      header: {
        bg: 'brand.red',
        color: 'brand.white',
        padding: '1rem',
      },
    }
  }
});

export default theme;