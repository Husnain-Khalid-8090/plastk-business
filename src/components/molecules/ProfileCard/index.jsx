import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { AuthContext } from '../../../context/authContext';
// import Button from '../../atoms/Button';
import { StyledProfileCard, ImgBox, TextBox, Title, Designation, PlaceHolder } from './ProfileCard.styles';
// import BusinessInformationModal from '../../organisms/BusinessInformationModal';
// import ModalContainer from '../ModalContainer';

function ProfileCard() {
  const { user } = useContext(AuthContext);

  const dateString = user?.created_at;
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <>
      <StyledProfileCard>
        <ImgBox>
          <PlaceHolder>
            {user?.role === 'bp_user' ? user?.primary_contact_person?.split('')[0] : user?.first_name?.split('')[0]}
            {user?.role === 'bp_user' ? user?.primary_contact_person?.split('')[1] : user?.last_name?.split('')[0]}
          </PlaceHolder>
        </ImgBox>
        <TextBox>
          <Title>{`${
            user?.role === 'bp_user'
              ? user?.primary_contact_person
              : [user?.first_name, user?.middle_name, user?.last_name].join(' ')
          } `}</Title>
          <Designation>
            {user?.role === 'bp_user' ? 'Admin' : 'Store Manager'} | {user?.permission_type}
          </Designation>
          <p>{user?.job_description}</p>
          {/* <ModalContainer
            title="Update Business Information"
            xl
            btnComponent={({ onClick }) => (
              <Button
                type="primary"
                sm
                rounded
                width={220}
                onClick={() => {
                  onClick();
                }}>
                Edit Profile
              </Button>
            )}
            content={({ onClose }) => <BusinessInformationModal onClose={onClose} />}
          /> */}
          ;<p>Member since {formattedDate}</p>
        </TextBox>
      </StyledProfileCard>
    </>
  );
}

export default ProfileCard;
