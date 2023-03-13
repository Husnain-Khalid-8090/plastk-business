import styled, { css } from 'styled-components/macro';

export const IconWrap = styled.span`
  width: 20px;
  font-size: var(--font-size-base);
  line-height: 1;
  flex-shrink: 0;
  margin-right: 8px;
  color: var(--text-color-gray);

  @media (min-width: 576px) {
    width: 23px;
    font-size: var(--font-size-xl);
    margin-right: 13px;
  }
`;
export const TextWrap = styled.div`
  flex-grow: 1;
`;
export const Title = styled.strong`
  display: block;
  font-size: var(--font-size-sm);
  line-height: 20px;
  font-weight: 700;
  text-transform: capitalize;
  color: var(--primary-text-color);
  margin-bottom: 2px;

  @media (min-width: 576px) {
    font-size: var(--font-size-md);
    line-height: 22px;
  }
  /* @media (min-width: 768px) {
    font-size: var(--font-size-md);
    line-height: 24px;
  } */
`;
export const Value = styled.span`
  display: block;
  font-size: var(--font-size-xs);
  line-height: 18px;
  color: var(--primary-text-color);

  @media (min-width: 576px) {
    font-size: var(--font-size-sm);
    line-height: 20px;
  }
  /* @media (min-width: 768px) {
    font-size: var(--font-size-base);
  } */
`;

export const FieldBox = styled.div`
  position: relative;
  display: flex;

  ${({ sm }) =>
    sm &&
    css`
      ${IconWrap} {
        width: 20px;
        font-size: var(--font-size-lg);
        margin-right: 8px;

        @media (min-width: 576px) {
          width: 20px;
          font-size: var(--font-size-lg);
          margin-right: 8px;
        }
      }

      ${Title} {
        font-size: var(--font-size-sm);
        line-height: 18px;

        @media (min-width: 576px) {
          font-size: var(--font-size-sm);
          line-height: 18px;
        }
        @media (min-width: 768px) {
          font-size: var(--font-size-sm);
          line-height: 18px;
        }

      }

      ${Value} {
        font-size: var(--font-size-xs);
        line-height: 16px;

        @media (min-width: 576px) {
          font-size: var(--font-size-xs);
          line-height: 16px;
        }
        @media (min-width: 768px) {
          font-size: var(--font-size-xs);
      }
    `}
`;
