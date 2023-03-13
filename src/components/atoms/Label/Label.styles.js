import styled, { css } from 'styled-components/macro';

export const StyledLabel = styled.label`
  font-size: var(--font-size-sm);
  line-height: 1;
  /* font-weight: 700; */
  font-weight: 500;
  color: var(--primary-text-color);
  margin-bottom: 0.9rem;
  display: block;
  pointer-events: ${({ $onlyRead }) => $onlyRead && 'none'};
  ${({ labelIcon }) =>
    labelIcon &&
    css`
      display: flex;
      align-items: center;
    `}
`;

export const RequiredAsterisk = styled.span`
  color: var(--danger2);
  margin-right: 3px;
`;
