import React, { lazy } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

const ProfileComp = lazy(() => import('../components/organisms/ProfileComp'));

export default function Profile() {
  return <ProfileComp />;
}
