import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, redirectTo = '/', isLoggedIn, ...rest }) => (
  // restricted = false meaning public route. (a route that can be accessed at any time dosent matter if you are logged in or not )
  // restricted = true meaning restricted route. (means if logged in you cant access them ) i.e login, forgot Password etc
  <Route
    {...rest}
    render={props =>
      isLoggedIn && restricted ? (
        <Redirect to={`business/${String(redirectTo).replace('business/', '').replace('/', '')}`} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PublicRoute;
