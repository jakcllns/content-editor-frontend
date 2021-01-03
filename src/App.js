import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './components/NavBar/navBar';
import { useState } from 'react';
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

function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  const handleSignOut = event => {
    //Add clean up code for once routing is added
    setIsAuth(false);
  }
  
  const handleLogin = event => {
    //Authentication code once we start adding the backend in
    setIsAuth(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <NavBar 
          isAuthenticated={isAuth}
          onSignOut={handleSignOut}
          onLogin={handleLogin}
        />
      </header>
    </ThemeProvider>
  );
}

export default App;
