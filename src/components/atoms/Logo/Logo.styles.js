import styled, { css } from 'styled-components/macro';

export const StyledLogo = styled.div`
  max-width: 310px;
`;

export const LogoTransition = css`
  transition: all var(--animation-speed) linear;
`;

export const SmallLogo = styled.img`
  ${LogoTransition}
  opacity: 0;
  height: 0;
  width: 0;
  @media (max-width: 991px) {
    display: none;
  }
`;

export const LargeLogo = styled.img`
  ${LogoTransition}
  opacity: 1;
  height: auto;
  width: auto;
  @media (max-width: 991px) {
    display: block;
  }
`;

export const Anchor = styled.a``;
