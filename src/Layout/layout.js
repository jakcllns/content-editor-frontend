import NavBar from "../components/NavBar/navBar";
import TopDrawer from "../components/NavBar/topDrawer";
import theme from  "../components/Theme/theme";
import { Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CopyRight from "../components/copyRight/copyRight";
import { Box, useMediaQuery } from "@material-ui/core";

const Layout = props => {
    const isMobile = useMediaQuery('(max-width:800px)');
    
    return(
        <Fragment>
            <ThemeProvider theme={theme}>
                <header>
                    {
                        isMobile ?
                        <TopDrawer
                            isAuthenticated={props.isAuth}
                            onSignOut={props.handleSignOut}
                            onLogin={props.handleLogin}
                        /> :
                        <NavBar
                            isAuthenticated={props.isAuth}
                            onSignOut={props.handleSignOut}
                            onLogin={props.handleLogin}
                        />
                    }
                </header>
                <main>
                    {props.children}
                </main>
                <footer>
                    <Box mt={5}>
                        <CopyRight />
                    </Box>
                </footer>
            </ThemeProvider>
        </Fragment>
    );
};

export default Layout