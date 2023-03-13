import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import Styled from 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';

import { useMediaPredicate } from 'react-media-hook';
import { SideNavContext } from '../../../context/sideNavContext';
import { AuthContext } from '../../../context/authContext';
import { LoadingContext } from '../../../context/loadingContext';
import { getCookie } from '../../../helpers/common';
import UserActions from '../../molecules/UserActions';
import {
  SideNavbar,
  Nav,
  Ul,
  Li,
  StyledLink,
  StyledLogo,
  Title,
  CloseButton,
  BtnSignout,
  BtnText,
  StyledBadgeHolder,
} from './SideNav.styles';
import { SideNavData } from './SideNavData';

function Navbar() {
  const { toggleSideNav, sideNavState } = useContext(SideNavContext);
  const { onLogout, hasPermission, user } = useContext(AuthContext);
  const { isLoading } = useContext(LoadingContext);
  const MaxWidth991 = useMediaPredicate('(max-width: 991px)');
  const handleSideNavLinks = () => {
    if (getCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE)) {
      const allowed_pages = getCookie(process.env.REACT_APP_BAP_ALLOWED_PAGES_COOKIE);
      if (!allowed_pages?.length) {
        return [];
      }
      if (user?.status === 'Suspended') {
        return SideNavData.filter(_ => _?.path === 'dashboard');
      }
      return SideNavData.filter(_ => JSON.parse(allowed_pages)?.includes(_.path));
    }
    if (user?.status === 'Suspended') {
      return SideNavData.filter(_ => _?.path === 'dashboard');
    }
    return SideNavData.filter(_ => _.roles?.includes(user?.role));
  };
  // useEffect(() => !sideNavState && document.body.classList.remove('nav-active'), [sideNavState]);
  useEffect(() => {
    if (!sideNavState) {
      document.body.classList.remove('nav-active');
    }
  }, [sideNavState]);
  const handleTitle = title => {
    if (title === 'Statements' && user?.client_type !== 'Prepaid') {
      return 'Invoices';
    }
    return title;
  };
  return (
    <>
      <SideNavbar css={isLoading && 'background:var(--light-secondary);'} $loading={isLoading}>
        <StyledLogo logoNav id="NavigationLogo" black to="account-summary" css={isLoading ? 'background:none;' : ''} />
        <BtnSignout
          to="/"
          onClick={e => {
            e.preventDefault();
            onLogout();
          }}>
          <span className="icon icon-lock" />
          <BtnText>Sign Out</BtnText>
        </BtnSignout>
        {MaxWidth991 && (
          <CloseButton onClick={toggleSideNav}>
            <i className="icon-close" />
          </CloseButton>
        )}
        <Nav>
          <Ul>
            {handleSideNavLinks().map((item, index) => (
              <Li key={index} css={isLoading && 'text-align: center;'}>
                {isLoading ? (
                  <Skeleton circle height={40} width={40} />
                ) : (
                  <>
                    <StyledLink id={index} to={item.path} onClick={toggleSideNav}>
                      {item.icon}
                      <Title>{handleTitle(item.title)}</Title>
                      {item.badge && <StyledBadgeHolder>New</StyledBadgeHolder>}
                    </StyledLink>
                  </>
                )}
              </Li>
            ))}
          </Ul>
        </Nav>
        {hasPermission('business-profiles.details') && <UserActions toggleSideNav={toggleSideNav} />}
      </SideNavbar>
    </>
  );
}
export default Navbar;
