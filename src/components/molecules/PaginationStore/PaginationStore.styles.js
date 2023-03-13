import styled, { css } from 'styled-components/macro';
import Button from '../../atoms/Button';

export const PaginationList = styled.ul`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-radius: 50px;
  padding: 0.625rem;
  background: var(--white);
  /* position: absolute;
  bottom: -24px;
  right: 10px; */
  /* box-shadow: 0px 23px 44px rgba(176, 183, 195, 0.14); */
`;

export const PaginationButton = styled(Button)`
  font-size: 0.625rem;
  line-height: 1;
  border: none;
  position: relative;
  ${({ $pageNumBtn }) =>
    $pageNumBtn &&
    css`
      &:after {
        content: '';
        position: absolute;
        left: 8px;
        right: 8px;
        bottom: 5px;
        border-bottom: 2px solid var(--purple-dark);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--animation-speed) ease-in-out, visibility var(--animation-speed) ease-in-out;
      }
      &:hover,
      &.selected {
        box-shadow: none;
        color: var(--purple-dark);
        opacity: 0.75;
        &:after {
          opacity: 1;
          visibility: visible;
        }
      }
    `}
`;
