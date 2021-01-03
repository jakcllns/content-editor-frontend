import { 
    AppBar, 
    Toolbar, 
    Typography, 
    IconButton ,
    Menu,
    MenuItem,
    Link,
    makeStyles,
    Button,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0, 2, 0, 2 )
    },
    link: {
        margin: theme.spacing(1, 1.5),
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
    const [anchorEl, setAnchorEl] = useState(null);
    const auth = props.isAuthenticated;
    const open = Boolean(anchorEl);
    const classes = useStyles();

    const handleClose = event => {
        setAnchorEl(null);    
    }

    const handleMenu =  event => {
        setAnchorEl(event.currentTarget);
    }

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
                <nav>
                    <Link variant="button" color="inherit" href="/" className={classes.link}>Home</Link>
                    <Link variant="button" color="inherit" href="/about" className={classes.link}>About Us</Link>
                    <Button 
                        variant="contained"
                        href="/signup"
                        color="secondary"
                        
                    >
                        Sign Up
                    </Button>
                    <IconButton
                        aria-label="current user account"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="secondary"
                    >
                        <AccountCircle />
                    </IconButton>
                    
                        {auth && (
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal:'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>My Posts</MenuItem>
                                <MenuItem component="button" onClick={props.onSignOut} >Sign Out</MenuItem>
                            </Menu>
                        )}
                        {!auth && (
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal:'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem component="button" onClick={props.onLogin}>Login</MenuItem>
                            </Menu>
                        )}
                </nav>
                
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;