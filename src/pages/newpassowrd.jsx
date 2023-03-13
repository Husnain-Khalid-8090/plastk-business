import React, { lazy } from 'react';
import NewPassword from '../components/organisms/NewPassword';

const UserTemplate = lazy(() => import('../components/templates/UserTemplate'));

export default function NewPasswordPage() {
  return (
    <>
      <UserTemplate>
        <NewPassword />
      </UserTemplate>
    </>
  );
}
