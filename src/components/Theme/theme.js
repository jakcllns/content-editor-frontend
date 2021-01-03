import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#ffffff',
        main: '#ffffff',
        dark: '#cccccc',
        contrastText: '#000000'
      },
      secondary: {
        light: '#438141',
        main: '#115417',
        dark: '#002a00',
        contrastText: '#ffffff'
      },
      test: {
        light: '#6a96ff',
        main: '#2569d6',
        dark: '#003fa4',
        contrastText: '#ffffff'
      }
    },
  });

  export default theme;