import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const UserWrap = styled(Link)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  height: auto;
  padding: 6px;
  @media (min-width: 992px) {
    padding: 0px;
  }

  .icon-chevron-down {
    font-size: var(--font-size-xs);
    line-height: 1;
    color: #78d328;
    margin: 0 6px 0 0;
  }
`;

export const ImgBox = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: var(--white);
  overflow: hidden;

  ${({ active }) =>
    active &&
    css`
      img {
        border: 4px solid var(--primary);
      }
    `}

  @media (min-width: 992px) {
    padding: 2px;
  }
  img {
    display: block;
    border-radius: 100%;
    object-fit: cover;
    width: 100%;
    height: auto;
  }
`;

export const TextBox = styled.div`
  flex-grow: 1;
  padding: 0 0 0 10px;

  @media (min-width: 992px) {
    display: none;
  }
`;

export const Name = styled.strong`
  display: block;
  font-size: var(--font-size-sm);
  line-height: 17px;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--primary-text-color);
`;

export const Designation = styled.span`
  display: block;
  font-size: var(--font-size-xs);
  line-height: 15px;
  font-weight: 400;
  color: var(--primary-text-color);
  text-transform: capitalize;
`;

export const ProfileHolder = styled.div`
  flex-shrink: 0;
  overflow: hidden;
  max-width: 190px;
  width: 100%;
  position: relative;
  z-index: 2;
  margin-top: 20px;

  @media (min-width: 992px) {
    max-width: 40px;
  }
`;
export const PlaceHolder = styled.span`
  background: #edfad6;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #9dcb4c;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  border-radius: 100%;
`;
