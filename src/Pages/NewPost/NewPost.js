import { Container, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const NewPost = props => {
    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant = "h1">
                New Post Editor
            </Typography>
        </Container>
    )
        
}

export default withRouter(NewPost);