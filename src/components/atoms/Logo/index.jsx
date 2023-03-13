/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components/macro';

import { Link as ReactLink } from 'react-router-dom';
import { LoadingContext } from '../../../context/loadingContext';
import LogoNav from '../../../assets/images/logo-new.svg';
import PlastkLogo from '../../../assets/images/logo.svg';
import PlastkLogoSmall from '../../../assets/images/logo-small.svg';
import { StyledLogo, LargeLogo, SmallLogo, Anchor } from './Logo.styles';

export const StyledLink = styled(({ ...props }) => <ReactLink {...props} />)``;

function Logo({ black, href, logoNav, to, ...props }) {
  return (
    <>
      <StyledLogo {...props}>
        <LogoLink black={black} href={href} to="/" logoNav={logoNav} />
      </StyledLogo>
    </>
  );
}

function LogoLink({ black, logoNav, ...props }) {
  const { to } = props;
  const { isLoading } = useContext(LoadingContext);

  const LogoImages = ({ logoNav }) => (
    <>
      <LargeLogo className="large-logo" src={logoNav ? LogoNav : PlastkLogo} alt="Plastk" width="147" height="50" />
      <SmallLogo className="small-logo" src={PlastkLogoSmall} alt="Plastk" width="50" height="50" />
    </>
  );

  if (to) {
    return isLoading ? (
      <Skeleton circle height={50} width={50} />
    ) : (
      <StyledLink css="display:flex;" {...props}>
        <LogoImages logoNav={logoNav} />
      </StyledLink>
    );
  }
  return (
    <Anchor {...props}>
      <LogoImages logoNav={logoNav} />
    </Anchor>
  );
}

export default Logo;
