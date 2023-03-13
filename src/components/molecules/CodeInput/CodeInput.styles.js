import styled, { css } from 'styled-components/macro';

export const CodeInputHolder = styled.div`
  display: flex !important;

  @media (min-width: 576px) {
    align-items: center;
    justify-content: center;
  }

  ${({ sm }) =>
    sm
      ? css`
          margin: 0 -0.4375rem 1.875rem;
        `
      : css`
          margin: 0 -0.3125rem 1.25rem;
        `}
  @media (min-width: 1400px) {
    ${({ sm }) =>
      sm
        ? css`
            margin: 0 -0.9375rem 1.875rem;
          `
        : css`
            margin: 0 -1.4375rem 1.875rem;
          `}
  }
`;
