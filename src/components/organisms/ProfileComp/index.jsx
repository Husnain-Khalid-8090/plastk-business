import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import ProfileCard from '../../molecules/ProfileCard';
import DataTabs from '../../molecules/DataTabs';
import PersonalInfo from './PersonalInfo';
import ProfileAddress from './ProfileAddress';
import Security from './loginSecurity';
import { ProfileSection, ProfileWrap } from './ProfileComp.styles';

function ProfileComp() {
  const tabData = [
    {
      label: 'Personal Information',
      content: <PersonalInfo />,
    },
    {
      label: 'Address Info',
      content: <ProfileAddress />,
    },
    {
      label: 'Login & security',
      content: <Security />,
    },
  ];

  return (
    <ProfileSection>
      <ProfileWrap>
        <ProfileCard />
        <DataTabs data={tabData} />
      </ProfileWrap>
    </ProfileSection>
  );
}

export default ProfileComp;
