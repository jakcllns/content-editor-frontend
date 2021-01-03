import NavBar from "../components/NavBar/navBar";
import theme from  "../components/Theme/theme";
import { Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CopyRight from "../components/copyRight/copyRight";
import Box from "@material-ui/core/Box";

const Layout = props => {
    return(
        <Fragment>
            <ThemeProvider theme={theme}>
                <header>
                    <NavBar
                    isAuthenticated={props.isAuth}
                    onSignOut={props.handleSignOut}
                    onLogin={props.handleLogin}
                    />
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