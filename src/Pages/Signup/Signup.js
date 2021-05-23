import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    Avatar,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container,
    CircularProgress
} from  "@material-ui/core"
import { LockOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
        "&": {
            color: theme.palette.text.primary,
        },
    },
    submit: {
        margin: theme.spacing(3, 0, -1),
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
        "&:hover" : {
            backgroundColor: theme.palette.secondary.light,
            color: "#000"
        },
    },
    error: {
        marginTop: theme.spacing(3),
        fontWeight: 'bold'
    },
    buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const Signup = props => {
    //Look into adding recaptcha
    const classes = useStyles();
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        twoFactor: false
    });
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleChange = event => {
        // event.preventDefault();
        const { name, value, checked } = event.target;
        const error = {message: '', origin: ''};
        const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        const newFormData = {...formData};
            newFormData[name] = name === 'twoFactor' ? checked :value;
            setFormData(newFormData);

            switch(name){
                case 'firstName':
                    error.message = value.length < 2 ? 
                        'First name must be at least 2 characters long.' : 
                        '';
                    error.origin = name;
                    break;
                case 'lastName':
                    error.message = value.length < 2 ?
                        'Last name must be at least 2 characters long.' :
                        '';
                    error.origin = name;
                    break;
                case 'password':
                    error.message = !passwordRegEx.test(value) ?
                        'Password must be at least 8 characters long, contain ' + 
                        'one lowercase letter, one uppercase letter and one ' +
                        'special character.' :
                        '';
                    error.origin = name;
                    break;
                case 'confirmPassword':
                    error.message = formData.password !== value ?
                        'Must match the password you provided.' :
                        '';
                    error.origin = name
                    break;
                default: 
                    break;
            }
            if(error.message.length > 0){
            return catchError(error);
            }
            setError([...errors.filter(e => e.origin !== name && e.origin !== 'server')]);
        }

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);

        signup(formData)
            .then(result => {
                setLoading(false);
                props.history.push("/login");
            })
            .catch(err =>{
                setLoading(false);
                if(!err.origin){
                    err.origin = 'server'
                }
                catchError(err);
            });
    };

    const catchError = error => {
        const newErrors = [...errors.filter(e => e.origin !== error.origin)]
        newErrors.push(error);
        setError(newErrors);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} onChange={handleChange}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                color="secondary"
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                id="firstName"
                                label="First Name"
                                autoFocus
                                fullWidth
                                required
                                error={errors.some(e => e.origin === 'firstName')}
                                helperText={
                                    errors.some(e => e.origin === 'firstName')? 
                                    errors.find(e => e.origin === 'firstName').message: 
                                    ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                color="secondary"
                                autoComplete="lname"
                                name="lastName"
                                variant="outlined"
                                id="lastName"
                                label="Last Name"
                                fullWidth
                                required
                                error={errors.some(e => e.origin === 'lastName')}
                                helperText={
                                    errors.some(e => e.origin === 'lastName')? 
                                    errors.find(e => e.origin === 'lastName').message: 
                                    ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                color="secondary"
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                type="email"
                                id="email"
                                label="Email Address"
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
                                error={errors.some(e => e.origin === 'password')}
                                helperText={
                                    errors.some(e => e.origin === 'password')? 
                                    errors.find(e => e.origin === 'password').message: 
                                    ''}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                color="secondary"
                                name="confirmPassword"
                                variant="outlined"
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                required
                                error={errors.some(e => e.origin === 'confirmPassword')}
                                helperText={
                                    errors.some(e => e.origin === 'confirmPassword')? 
                                    errors.find(e => e.origin === 'confirmPassword').message: 
                                    ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox id="twoFactor"  color="secondary" />}
                                label="Enable two factor authentication via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        className={classes.submit}
                        fullWidth
                        disabled={errors.some(e => e.message !== '') || loading}
                    >
                        Sign Up
                        {
                            loading && 
                            <CircularProgress 
                                size={24} 
                                className={classes.buttonProgress} 
                            />
                        }
                    </Button>
                        
                    <Typography color="error" align="center" variant="body2" className={classes.error}>
                        {
                            errors.some(e => e.origin === 'server') ? 
                            errors.find(e => e.origin === 'server').message : 
                            null
                        }
                    </Typography>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2" color="inherit">
                                Already have an account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Signup;