import styled, { css } from 'styled-components/macro';

export const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${({ history }) =>
    history &&
    css`
      gap: inherit;
      background: #000;
    `}
`;

export const Title = styled.strong`
  font-size: ${({ fontbase }) => (fontbase ? 'var(--font-size-base)' : 'var(--font-size-xs)')};
  line-height: ${({ fontbase }) =>
    fontbase ? 'calc(var(--font-size-base) + 0.3125rem)' : 'calc(var(--font-size-xs) + 0.3125rem)'};
  font-weight: bold;

  flex-grow: 1;
  padding: 12px 22px;
  border-radius: 50px;
  background: var(--bg-light-grey);
`;

export const Value = styled.span`
  font-size: ${({ fontbase }) => (fontbase ? 'var(--font-size-base)' : 'var(--font-size-xs)')};
  line-height: ${({ fontbase }) =>
    fontbase ? 'calc(var(--font-size-base) + 0.3125rem)' : 'calc(var(--font-size-xs) + 0.3125rem)'};
  font-weight: bold;

  width: 100px;
  flex-shrink: 0;
  text-align: center;
  padding: 12px 22px;
  border-radius: 50px;
  background: var(--bg-light-grey);
`;
