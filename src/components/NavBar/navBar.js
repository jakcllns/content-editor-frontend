import { 
    AppBar, 
    Toolbar, 
    Typography, 
    makeStyles,
} from "@material-ui/core";

import Nav from "./nav/nav";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0, 2, 0, 2 )
    },
    toolbar: {
        flexWrap: 'wrap',
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(4)
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));

const NavBar = props => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography 
                    variant="h6" 
                    noWrap 
                    color="inherit" 
                    className={classes.toolbarTitle}
                >
                    My Website
                </Typography>
                <Nav
                    isAuthenticated={props.isAuthenticated}
                    onSignOut={props.onSignOut}
                    onLogin={props.onLogin}
                    isMobile={false}
                    authToken={props.authToken}
                />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;