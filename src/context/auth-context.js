//Convert this into a custom hook for handling authentication

import React, {useState} from 'react';

export const AuthContext = React.createContext({
    jwt: null,
    expiration: 0,
    login: () => {

    },
    signout: () => {

    }
})

const AuthContextProvider = props => {
    const [authToken, setAuthToken] = useState();
    const [expiresIn, setExpiresIn] = useState(0);

    const loginHandler = (token, expire) => {
        setAuthToken(token);
        setExpiresIn(expire);
    }

    const signoutHandler = () => {
        setAuthToken(null);
        setExpiresIn(0);
        console.log(props.history)
    }

    return (
        <AuthContext.Provider
            value={{login: loginHandler, jwt: authToken, expiration: expiresIn, signout: signoutHandler}}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;