import React, { lazy } from 'react';

const UserTemplate = lazy(() => import('../components/templates/UserTemplate'));
const ForgotPassword = lazy(() => import('../components/organisms/ForgotPassword'));

export default function ForgotPasswordPage() {
  return (
    <UserTemplate>
      <ForgotPassword />
    </UserTemplate>
  );
}
