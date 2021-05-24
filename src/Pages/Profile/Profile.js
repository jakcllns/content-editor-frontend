import { Paper, makeStyles, Grid, Typography } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';
import { profileApi } from '../../api/api-client';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        marginTop: theme.spacing(2),
        maxWidth: '800px',
        minWidth: '600px',
        padding: '10px'        
    },
    paper: {
        marginTop: theme.spacing(1),
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))
const Profile = props => {
    const classes = useStyles();
    const authContext = useAuth();
    const [profileData, setProfileData] = useState(null);
    

    useEffect( () => {
        const graphqlQuery = {
            query: `
                {
                    getProfile{
                        firstName,
                        lastName,
                        createdAt,
                        totalPosts
                    }
                }
            `
        }

        profileApi(graphqlQuery ,authContext.jwt)
            .then(res => {
                return res.json();
            })
            .then(resData => {
                if(resData.errors){
                    const error = new Error(resData.errors.map(e => {
                        return e.message;
                    }).join('|'));
                    throw error;
                }
                
                setProfileData({
                    ...resData.data.getProfile,
                    createdAt: new Date(resData.data.getProfile.createdAt).toLocaleDateString()
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, [authContext.jwt])
           

    return (
        <div className={classes.paper}>
            <Paper 
                elevation={3}
                variant="elevation"
                square
                className={classes.card}
            >
                <Grid container spacing={3} alignContent="center">
                    <Grid item xs={12} spacing={2} alignItems="center">
                        <Typography component="h5" align="left" variant="h5" spacing={3}>
                            Name: {profileData && profileData.firstName + ' ' + profileData.lastName}
                        </Typography>
                        <Typography component="h5" align="left" variant="h5">
                            Joined: {profileData && profileData.createdAt}
                        </Typography>
                        <Typography component="h5" align="left" variant="h5">
                            Total posts: {profileData && profileData.totalPosts}
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Paper>
            
        </div>
        
        
    )
};

export default withRouter(Profile);
