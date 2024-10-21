import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

// Mock authentication function
const isAuthenticated = () => {
    // Replace with your actual authentication logic
    return localStorage.getItem('authToken') !== null;
};

// PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

export default PrivateRoute;
