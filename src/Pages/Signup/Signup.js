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
    Container
} from  "@material-ui/core"

import { LockOutlined } from "@material-ui/icons"
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
}))

const Signup = props => {
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        const elements = event.target.elements;

        const formData = {
            firstName: elements.firstName.value,
            lastName: elements.lastName.value,
            email: elements.email.value,
            password: elements.password.value,
            twoFactor: elements.twoFactor.checked
        }

        console.log(formData);
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                color="secondary"
                                autoComplete="email"
                                name="email"
                                variant="outlined"
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
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
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