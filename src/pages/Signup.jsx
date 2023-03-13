import React, { lazy } from 'react';

const SignUp = lazy(() => import('../components/organisms/SignUp'));

export default function SignUpPage() {
  return (
    <>
      <SignUp />
    </>
  );
}
