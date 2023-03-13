import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { LoadingContext } from '../../../context/loadingContext';

import { UserWrap, ProfileHolder, ImgBox, TextBox, Name, Designation, PlaceHolder } from './UserActions.styles';

import { AuthContext } from '../../../context/authContext';

function UserActions() {
  const { view } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useContext(LoadingContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      {isLoading ? (
        <Skeleton circle height={40} width={40} />
      ) : (
        <ProfileHolder>
          <UserWrap to="/business/profile" onClick={() => setIsOpen(!isOpen)}>
            <ImgBox active={view === 'profile'}>
              <PlaceHolder>
                {user?.primary_contact_person?.split('')[0]}
                {user?.primary_contact_person?.split('')[1]}
              </PlaceHolder>
            </ImgBox>
            <TextBox>
              {user?.primary_contact_person && (
                <Name>{user?.primary_contact_person.split(' ').slice(0, 2).join(' ')}</Name>
              )}
              {user?.email && <Designation>{user?.email}</Designation>}
            </TextBox>
            <i className="icon-chevron-down" />
          </UserWrap>
        </ProfileHolder>
      )}
    </>
  );
}

export default UserActions;
