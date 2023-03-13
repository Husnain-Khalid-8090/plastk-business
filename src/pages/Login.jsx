import React, { lazy } from 'react';

const Login = lazy(() => import('../components/organisms/Login'));

export default function LoginPage() {
  return <Login />;
}
