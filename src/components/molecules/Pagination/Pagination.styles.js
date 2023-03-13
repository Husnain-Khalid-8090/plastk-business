import styled, { css } from 'styled-components/macro';
import Button from '../../atoms/Button';

export const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  background: var(--white);
  border-radius: 50px;
  padding: 0.625rem;
  border: 1px solid #ddd;

  li {
    padding: 0 4px;
  }
`;

export const PaginationButton = styled(Button)`
  font-size: 0.625rem;
  line-height: 1;
  border: none;
  color: var(--primary-text-color) !important;
  position: relative;
  ${({ $pageNumBtn }) =>
    $pageNumBtn &&
    css`
      &:after {
        display: none;
        content: '';
        position: absolute;
        left: 8px;
        right: 8px;
        bottom: 5px;
        border-bottom: 2px solid var(--primary);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--animation-speed) ease-in-out, visibility var(--animation-speed) ease-in-out;
      }
      &:hover,
      &.selected {
        box-shadow: none;
        color: var(--white) !important;
        background: var(--darkMosGreen);
      }
    `}
`;

export const TotalItems = styled.span`
  font-size: var(--font-size-xs);

  @media (max-width: 575px) {
    display: block;
    text-align: center;
    margin: 0 0 12px;
  }
`;

export const PaginationHolder = styled.div`
  max-width: 270px;
  margin: 15px auto 0;

  @media (min-width: 576px) {
    max-width: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin: 20px 0 0;
  }
  @media (min-width: 768px) {
    gap: 23px;
  }
`;

export const SelectHolder = styled.div`
  min-width: 134px;

  @media (max-width: 575px) {
    margin: 0 0 12px;
  }

  .react-select__control {
    font-size: var(--font-size-xs);
  }
`;
