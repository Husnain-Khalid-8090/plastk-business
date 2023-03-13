import React, { lazy } from 'react';

const EmailVerification = lazy(() => import('../components/organisms/EmailVerification'));

export default function EmailVerificationPage() {
  return (
    <>
      <EmailVerification />
    </>
  );
}
