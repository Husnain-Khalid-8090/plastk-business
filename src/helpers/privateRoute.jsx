import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo = '/', isLoggedIn, ...rest }) => (
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page

  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} redirectTo={`business/${String(redirectTo).replace('business/', '').replace('/', '')}`} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
