import {
    makeStyles, 
    Avatar, 
    Typography,
    Grid,
    TextField,
    FormControlLabel,
    Button,
    CircularProgress,
    Checkbox
} from "@material-ui/core";
import { useState } from "react";
import { LockOutlined } from "@material-ui/icons";
import { useAuth } from '../hooks/useAuth';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
        "&": {
            color: theme.palette.text.primary,
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3,0,-1),
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            color: "#000",
        },
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const LoginForm = props => {
    const authContext = useAuth();
    const classes = useStyles();
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [formData, setFormData] = useState({
        email: null,
        password: null,
        rememberMe: false
    });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleChange = event => {
        const { name, value, checked } = event.target;

        const newFormData = {...formData};
        newFormData[name] = name === "remember"?  checked : value;
        setFormData(newFormData);

        if(newFormData.email && newFormData.password){
           return setButtonEnabled(true);
        }

        setButtonEnabled(false);

    };

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const result = await authContext.login(formData.email, formData.password);

        setLoading(false);

        console.log(result);
        
        if(result){
            console.log(history);
            return history.location.state ? history.push(history.location.state.from) : history.goBack()   
        }

        setError('Invalid email or password');
    }

    return(
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>
            <form 
                className={classes.form} 
                onSubmit={handleSubmit} 
                onChange={handleChange}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h5" color="error" align="center">
                            {error}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            color="secondary"
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            id="email"
                            label="Email"
                            type="email"
                            autoFocus
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            color="secondary"
                            name="password"
                            variant="outlined"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox id="remeber"  color="secondary" />}
                            label="Remember me"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        disabled={!buttonEnabled || loading}
                    >
                        Sign In
                        {
                            loading &&
                            <CircularProgress
                                size={24}
                                className={classes.buttonProgress}
                            />
                        }
                    </Button>
                </Grid>
            </form>
        </div>
    );
};

export default LoginForm;