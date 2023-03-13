import styled, { css } from 'styled-components/macro';
import { NavLink } from 'react-router-dom';
import { ProfileHolder, TextBox, ImgBox } from '../../molecules/UserActions/UserActions.styles';
import Logo from '../../atoms/Logo';
import { BadgeHolder } from '../../atoms/Button/Button.styles';

export const StyledBadgeHolder = styled(BadgeHolder)`
  right: 0 !important;
  top: 14px !important;
  bottom: auto !important;
  left: auto !important;

  @media (min-width: 992px) {
    top: auto !important;
    right: auto !important;
    bottom: -13px !important;
    left: 18px !important;
  }

  @media (min-width: 1200px) {
    left: 3px !important;
  }

  .nav-active & {
    @media (max-width: 991px) {
      right: 0 !important;
      top: 14px !important;
      bottom: auto !important;
      left: auto !important;
    }
  }
`;

export const StyledLogo = styled(Logo)`
  width: 147px;
  margin-bottom: 25px;

  @media (max-width: 991px) {
    align-self: self-start;
  }

  @media (min-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.03);
  }
`;

export const BtnSignout = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: var(--primary-text-color);

  span.icon {
    display: inline-block;
    font-size: var(--font-size-lg);
    line-height: 1;
    margin: 0;
  }

  @media (max-width: 991px) {
    align-self: flex-start;
  }
`;
export const BtnText = styled.span`
  display: block;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: var(--primary-text-color);
  position: relative;
  left: 15px;
  white-space: nowrap;

  @media (min-width: 992px) {
    width: 0;
    left: 30px;
    visibility: hidden;
    opacity: 0;
  }
`;

export const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  position: relative;
  margin: 20px 0;
  padding-top: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  border-width: 1px 0;
  border-style: solid;
  border-color: var(--light-secondary);
`;

export const Ul = styled.ul`
  list-style: none;
  font-size: var(--font-size-sm);
  line-height: 20px;
  font-weight: 400;
  text-transform: capitalize;
  color: var(--text-color-gray);
`;

export const Li = styled.li`
  padding: 5px 0;
`;

export const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: var(--primary-text-color);
  position: relative;
  transition: none;
  padding: 16px 16px;

  @media (min-width: 992px) {
    border-radius: 50px;
    justify-content: center;
  }

  &:hover,
  &.active {
    @media (min-width: 992px) {
      color: var(--white);
      background: var(--darkMosGreen);
    }
  }

  &.active {
    &:after {
      visibility: visible;
      opacity: 1;
    }
    ${StyledBadgeHolder} {
      bottom: -22px !important;
    }
  }

  span.icon {
    display: inline-block;
    font-size: var(--font-size-lg);
    line-height: 1;
    margin: 0;
  }
`;

export const Title = styled.span`
  position: relative;
  left: 15px;
  white-space: nowrap;

  @media (min-width: 992px) {
    width: 0;
    left: 30px;
    visibility: hidden;
    opacity: 0;
  }
`;

export const SideNavbar = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 20px;
  transform: translateX(-100%);
  background: var(--white);
  filter: drop-shadow(5px 5px 10px rgba(112, 125, 152, 0.1));
  transition: linear 0.3s;
  z-index: var(--z-40);

  @media (min-width: 992px) {
    padding: 30px 25px;
  }

  .nav-active & {
    transform: translateX(0);
  }

  @media (min-width: 576px) {
    width: 250px;
  }

  @media (min-width: 992px) {
    left: 0;
    width: 72px;
    padding: 30px 5px;
    transform: none;
    .large-logo {
      opacity: 0;
      height: 0;
      width: 0;
    }
    .small-logo {
      opacity: 1;
      height: auto;
      width: auto;
    }

    ${({ $loading }) =>
      !$loading &&
      css`
        &:hover,
        &.hover {
          width: 250px;
          padding: 30px 25px;
          align-items: flex-start;

          .large-logo {
            opacity: 1;
            height: auto;
            width: auto;
          }

          .small-logo {
            opacity: 0;
            height: 0;
            width: 0;
          }

          ${StyledLogo} {
            display: block;
            width: 147px;
            margin-bottom: 25px;
            background: none;
            box-shadow: none;
            border-radius: 0;
            padding-top: 0;

            &:before {
              left: -30px;
            }
          }

          ${StyledLink} {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: auto;
            height: auto;
            position: relative;
            background: none;

            &:hover,
            &.active {
              color: var(--white);
              background: var(--darkMosGreen);
            }

            &.active {
              &:after {
                visibility: hidden;
                opacity: 0;
              }
            }

            &:before {
              left: -30px;
            }
          }

          ${Title} {
            opacity: 1;
            visibility: visible;
            width: auto;
            left: 8px;
          }

          ${BtnText} {
            opacity: 1;
            visibility: visible;
            width: auto;
            left: 8px;
          }

          i.icon,
          .plastk-badge-icon {
            margin-right: 10px;
          }

          .plastk-badge-icon {
            margin-left: -5px;
          }

          ${ProfileHolder} {
            max-width: 190px;
          }

          ${ImgBox} {
            padding: 0;
          }

          ${TextBox} {
            display: block;
          }

          ${StyledBadgeHolder} {
            right: 0 !important;
            top: 0 !important;
            bottom: auto !important;
            left: auto !important;
          }
        }
      `}
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  color: var(--black);
`;
