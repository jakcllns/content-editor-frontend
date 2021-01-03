import {
    Typography,
    Link
} from "@material-ui/core";

const CopyRight = props => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={props.designerUrl || '/'}>
                {props.designerName || 'My Website'}
            </Link>{' ' + new Date().getFullYear().toString() + '.'}
        </Typography>
    );
};

export default CopyRight;