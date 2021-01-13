import {
    Link,
    Button,
    IconButton,
    Menu,
    MenuItem,
    makeStyles
} from "@material-ui/core"

import {Link as RouterLink} from  'react-router-dom';
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
    const auth = props.authToken;
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
                color="inherit" 
                className={props.isMobile ? classes.blockLink : classes.link}
                component={RouterLink}
                to="/"
            >
                Home
            </Link>
            <Link
                component={RouterLink} 
                variant="button" 
                color="inherit" 
                to="/about" 
                className={props.isMobile ? classes.blockLink : classes.link}
            >
                About Us
            </Link>
            { !auth &&
                <Button 
                    component={RouterLink}
                    variant="contained"
                    to="/signup"
                    color="secondary"
                    className={props.isMobile ? classes.blockLink : ''}
                >
                    Sign Up
                </Button>
            }
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
                        <MenuItem component="button" onClick={props.onSignOut} >
                            Sign Out
                        </MenuItem>
                    </Menu>
                )}
                {!auth && (
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
                        <MenuItem component="button" >
                            <Link component={RouterLink} to="/login"  color="inherit">
                                Login
                            </Link>
                        </MenuItem>
                    </Menu>
                )}
        </nav>
    )
};

export default Nav;