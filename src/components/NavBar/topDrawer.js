import { 
    AppBar, 
    Toolbar,
    makeStyles,
    Typography,
    IconButton,
    Drawer,
    Grid
} from "@material-ui/core";
import {
    Menu as MenuIcon,
    Close as CloseIcon
} from "@material-ui/icons";
import { useState } from "react";
import Nav from "./nav/nav";

const useStyles = makeStyles(theme => ({
    toolbar: {
        flexWrap: 'wrap',
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    menuButton: {

    },
    drawerTitle: {
        margin: theme.spacing(2,8,1,2),
        flexGrow: 1,
    },
    closeButton: {
        right: 0,
        top: 0,
        marginTop: theme.spacing(1),
        position: "absolute"

    }
}));

const TopDrawer = props => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleSideDrawerOpen = event => {
        setOpen(true);
    };

    const handleSideDrawerClose =  () => {
        setOpen(false);
    };

    return(
        <nav>
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
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="secondary"
                        aria-label="Side Drawer Toggle"
                        onClick={handleSideDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor='top'
                open={open}
                onClose={handleSideDrawerClose}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{flex: "wrap"}}>
                        <Typography
                        variant="h6"
                        noWrap
                        color="inherit"
                        className={classes.drawerTitle}
                        >
                            My Website
                        </Typography>
                        <IconButton
                            edge="start"
                            color="secondary"
                            onClick={handleSideDrawerClose}
                            className={classes.closeButton}
                            
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
               <Nav
                    isAuthenticated={props.isAuthenticated}
                    onSignOut={props.onSignOut}
                    onLogin={props.onLogin}
                    isMobile={true}
                />
            </Drawer>
        </nav>
    ); 
};

export default TopDrawer;