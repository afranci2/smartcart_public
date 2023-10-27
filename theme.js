import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  // fonts: {
  //   heading: "Montserrat",
  //   body: "Noto Sans",
  // },
  // components: {
  //   Button: {
  //     baseStyle: {
  //       fontFamily: "Noto Sans"
  //     }
  //   }
  // },
  
  styles: {
    global: {
      main: {
        // Too distracting for boomers?
        // bg: "linear-gradient(to right, #74ebd5, #acb6e5)",
        // bg: "radial-gradient(circle, rgba(192,221,242,0.5) 0%, rgba(34,119,179,0.60) 100%);",
        height: "100vh",
        overflow: "auto"
      },
      html: {
        overflow: "hidden",
        height: "100%"
      },
      a: {
        textDecor: "none"
      }
    },
  },
});

export default theme;