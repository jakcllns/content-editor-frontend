import {
    Link,
    Button,
    IconButton,
    Menu,
    MenuItem,
    makeStyles
} from "@material-ui/core"

import AccountCircle from "@material-ui/icons/AccountCircle";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(1, 1.5),
    },
    blockLink: {
        margin: theme.spacing(1, 1.5),
        display: "block",
        textAlign: 'center'
    },
    blockButton: {
        display: "block"
    }
}));

const Nav = props => {
    const classes = useStyles();
    const auth = props.isAuthenticated;
    const [state, setState] = useState({
        open: false,
        anchorElement: null
    });

    const handleMenu = event => {
        setState({
            ...state,
            open: true,
            anchorElement: event.target
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
            anchorElement: null
        });
    };
    
    return (
        <nav>
            <Link 
                variant="button" 
                color="inherit" href="/" 
                className={props.isMobile ? classes.blockLink : classes.link}
            >
                Home
            </Link>
            <Link 
                variant="button" 
                color="inherit" 
                href="/about" 
                className={props.isMobile ? classes.blockLink : classes.link}
            >
                About Us
            </Link>
            <Button 
                variant="contained"
                href="/signup"
                color="secondary"
                className={props.isMobile ? classes.blockLink : ''}
            >
                Sign Up
            </Button>
            <IconButton
                aria-label="current user account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary"
                style={{margin: 'auto'}}
                className={props.isMobile ? classes.blockLink : ''}
                
            >
                <AccountCircle />
            </IconButton>
            
                {auth && (
                    <Menu
                        getContentAnchorEl={null}
                        id="menu-appbar"                        
                        elevation={0}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                        anchorEl={state.anchorElement}
                        open={state.open}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My Posts</MenuItem>
                        <MenuItem component="button" onClick={props.onSignOut} >Sign Out</MenuItem>
                    </Menu>
                )}
                {!auth && (
                    <Menu
                        id="menu-appbar"
                        anchorEl={state.anchorElement}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                        getContentAnchorEl={null}
                        open={state.open}
                        onClose={handleClose}
                    >
                        <MenuItem component="button" onClick={props.onLogin}>Login</MenuItem>
                    </Menu>
                )}
        </nav>
    )
};

export default Nav;