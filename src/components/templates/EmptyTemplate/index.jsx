import React from 'react';

// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { TemplateHolder, ContentHolder, LogoWrap, StyledLogo, ButtonStyled } from './EmptyTemplate.styles';

function EmptyTemplate({ children }) {
  return (
    <>
      <TemplateHolder>
        <ButtonStyled
          type="white"
          width={120}
          suffix={<i className="icon-logoff" css="color: var(--danger)" />}
          rounded
          mobileCircle
          sm>
          <span className="text">Logout</span>
        </ButtonStyled>

        <LogoWrap>
          <StyledLogo black to="/" />
        </LogoWrap>
        <ContentHolder>{children}</ContentHolder>
      </TemplateHolder>
    </>
  );
}

export default EmptyTemplate;
