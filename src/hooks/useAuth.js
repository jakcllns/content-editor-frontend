import React, { useState, useContext, createContext } from 'react';
import { userApi } from '../api/api-client';

const authContext = createContext({
    user: null,
    jwt: null,
    expiry: null,
    error: null,
    login: (email, password) => {},
    signout: () => {},
    signup: (formData) => {},
});

export const ProvideAuth = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [expiry, setExpiry] = useState(null);
    const [error, setError] = useState(null);

    const login = (email, password) => {
        const graphqlQuery = {
            query: `
                query LogIn(
                    $email: String!,
                    $password: String!
                ){
                    login(userLoginData:{
                        email: $email,
                        password: $password
                    }){
                        userId
                        token
                        expiresIn
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };
        return userApi(graphqlQuery)
            .then(res => {
                return res.json();
            })
            .then(resData => {
                if(resData.errors){
                    const error = new Error(resData.errors.map(e => {
                        return e.message;
                    }).join('|'));
                    error.origin = 'server';
                    throw error;
                }
                
                setUser(resData.data.login.userId);
                setJwt(resData.data.login.token);
                setExpiry(resData.data.login.expiresIn);
                return true;
            })
            .catch(err => {
                setError(err);
                return false;
            })
        
    }

    const signout = () => {
        setUser(null);
        setJwt(null);
        setExpiry(null);
    };

    const signup = (formData) => {
        const graphqlQuery = {
            query: `
                mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!, $twoFactor: Boolean!){
                    signup(userSignUpData: {firstName: $firstName, lastName: $lastName, email: $email, password: $password, twoFactor: $twoFactor}){
                        _id
                        email
                        twoFactor
                    }
                }
            `,
            variables: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                twoFactor: formData.twoFactor
            }
        }
        return userApi(graphqlQuery)
            .then(res => res.json())
            .then(resData => {
                if(resData.errors) {
                    const error = new Error(resData.errors.map(e => {
                        return e.message;
                    }).join('|'));
                    throw error;
                }
                return true;
            })
    }

    return {
        user,
        jwt,
        expiry,
        error,
        login,
        signout,
        signup,
    };
}