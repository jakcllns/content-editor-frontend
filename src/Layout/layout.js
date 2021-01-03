import NavBar from "../components/NavBar/navBar";
import theme from  "../components/Theme/theme";
import { Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";


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
            </ThemeProvider>
        </Fragment>
    );
};

export default Layout