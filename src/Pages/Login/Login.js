import LoginForm from "../../components/loginForm";
import { Container } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Login = props => {
    return (
        <Container component="main" maxWidth="xs">
            <LoginForm {...props}/>
        </Container>
    );
};

export default withRouter(Login);