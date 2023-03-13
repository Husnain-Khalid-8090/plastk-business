import React, { useContext } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './helpers/publicRoute';
import PrivateRoute from './helpers/privateRoute';

// pages
import Login from './pages/Login';
import SignUp from './pages/Signup';
import ForgotPassword from './pages/forgotpassword';
import EmailVerification from './pages/emailverification';
import { AuthContext } from './context/authContext';
import NewPasswordPage from './pages/newpassowrd';
import Pages from './pages';
import Development from './pages/development';
import BusinessAssociate from './pages/business-associate';

function Router() {
  const { isLoggedIn, status } = useContext(AuthContext);
  return (
    <Switch>
      <PrivateRoute path="/business/:view" component={Pages} status={status} isLoggedIn={isLoggedIn} />
      <PublicRoute path="/development" component={Development} />
      <PublicRoute restricted path="/set-password" component={NewPasswordPage} isLoggedIn={isLoggedIn} />
      <PublicRoute restricted path="/forgot-password" component={ForgotPassword} isLoggedIn={isLoggedIn} />
      <PublicRoute restricted path="/email-verification" component={EmailVerification} isLoggedIn={isLoggedIn} />
      <PublicRoute restricted path="/sign-up" component={SignUp} isLoggedIn={isLoggedIn} />
      <PublicRoute path="/business-associate" component={BusinessAssociate} isLoggedIn={isLoggedIn} />
      <PublicRoute restricted path="*" component={Login} isLoggedIn={isLoggedIn} redirectTo="/dashboard" />
    </Switch>
  );
}

export default Router;
