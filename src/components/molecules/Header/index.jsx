import React, { useContext, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';

import { useMediaPredicate } from 'react-media-hook';
import { LoadingContext } from '../../../context/loadingContext';
import { SideNavContext } from '../../../context/sideNavContext';
import Heading from '../../atoms/Heading';
import { StyledHeader, ButtonsHolder, MenuButton, MenuBtnMobile } from './Header.styles';

function Header({ title, children, ...props }) {
  const { toggleSideNav, sideNavState } = useContext(SideNavContext);
  const { isLoading } = useContext(LoadingContext);
  const MinWidth992 = useMediaPredicate('(min-width: 992px)');
  const MaxWidth991 = useMediaPredicate('(max-width: 991px)');
  const MaxWidth767 = useMediaPredicate('(max-width: 767px)');
  const MinWidth768 = useMediaPredicate('(min-width: 768px)');

  useEffect(() => {
    if (sideNavState) {
      document.body.classList.add('nav-active');
    }
  }, [sideNavState]);

  return (
    <>
      {MinWidth768 && (
        <div>
          <StyledHeader css={isLoading && 'background: transparent;'} {...props}>
            {MaxWidth991 && (
              <MenuButton type="button" onClick={toggleSideNav}>
                {isLoading ? <Skeleton rectangle height={16} width={16} /> : <i className="icon-menu-hamburger" />}
              </MenuButton>
            )}
            {MinWidth992 && title && (
              <Heading level={3} className="mb-0" css="text-transform: capitalize;">
                {isLoading ? <Skeleton rectangle height={25} width={200} /> : title}
              </Heading>
            )}
            <ButtonsHolder>{children}</ButtonsHolder>
          </StyledHeader>

          {MaxWidth991 && title && (
            <Heading level={3} css="text-transform: capitalize;">
              {isLoading ? <Skeleton rectangle height={25} width={200} /> : title}
            </Heading>
          )}
        </div>
      )}
      {MaxWidth767 && (
        <MenuBtnMobile>
          <MenuButton type="button" onClick={toggleSideNav}>
            {isLoading ? <Skeleton rectangle height={16} width={16} /> : <i className="icon-menu-hamburger" />}
          </MenuButton>
        </MenuBtnMobile>
      )}
    </>
  );
}

export default Header;
