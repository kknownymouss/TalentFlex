import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './CommonUtls';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is not logged in
        // Otherwise, redirect the user to /feed page
        <Route {...rest} render={props => (
            !isLogin() ?
                <Component {...props} />
            : <Redirect to="/feed/Random" />
        )} />
    );
};

export default PublicRoute;