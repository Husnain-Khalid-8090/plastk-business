import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { StyledTitleHead, Title } from './TitleHead.styles';
import Button from '../../atoms/Button';
import { AuthContext } from '../../../context/authContext';

function TitleHead({ title, btnTitle, backBtn, signOutBtn, skipBtn, onBackClick, style = {} }) {
  const { onLogout, user } = useContext(AuthContext);
  return (
    <>
      <StyledTitleHead>
        {backBtn && (
          <Button
            style={{ ...style }}
            type="white"
            prefix={<span className="icon-arrow-prev" />}
            width={130}
            sm
            rounded
            mobileCircle
            onClick={() => {
              onBackClick();
            }}>
            <span className="text">{btnTitle || 'Go Back'}</span>
          </Button>
        )}
        {signOutBtn && (
          <Button
            css={skipBtn && user?.client_type === 'Prepaid' ? 'margin: 0 0 0 auto;' : ''}
            style={{ ...style }}
            type="white"
            prefix={<span className="icon-lock" />}
            width={130}
            sm
            rounded
            mobileCircle
            onClick={onLogout}>
            <span className="text">Sign Out</span>
          </Button>
        )}
        {skipBtn && user?.client_type === 'Credit' && (
          <Button
            css="margin: 0 0 0 auto; "
            style={{ ...style }}
            type="primary"
            suffix={<span className="material-icons-outlined">skip_next</span>}
            width={130}
            sm
            rounded
            mobileCircle
            onClick={() => {
              onBackClick();
            }}>
            <span className="text">Skip</span>
          </Button>
        )}
        {title && <Title>{title}</Title>}
      </StyledTitleHead>
    </>
  );
}

export default TitleHead;
