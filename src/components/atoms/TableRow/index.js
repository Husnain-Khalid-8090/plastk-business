import styled, { css } from 'styled-components/macro';

export const TableRow = styled.tr`
  background: var(--white);
  border: 1px solid rgba(111, 124, 151, 0.25);
  display: block;
  padding: 15px;
  position: relative;
  ${({ hasHover }) =>
    hasHover &&
    css`
      &:hover {
        background: var(--light-secondary);
        cursor: pointer;
      }
    `}

  @media (min-width: 768px) {
    border-radius: 10px;
  }
  @media (min-width: 992px) {
    border: none;
    border-bottom: 1px solid rgba(111, 124, 151, 0.25);
    background: none;
    display: table-row;
    width: 100%;
    border-radius: 0;
    padding: 0;
  }
`;

export default TableRow;
