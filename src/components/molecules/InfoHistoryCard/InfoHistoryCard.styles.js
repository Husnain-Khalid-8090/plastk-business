import styled from 'styled-components/macro';

export const HistoryCard = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.strong`
  font-size: ${({ fontbase }) => (fontbase ? 'var(--font-size-base)' : 'var(--font-size-xs)')};
  line-height: ${({ fontbase }) =>
    fontbase ? 'calc(var(--font-size-base) + 0.3125rem)' : 'calc(var(--font-size-xs) + 0.3125rem)'};
  font-weight: bold;

  display: flex;
  align-items: center;
  width: 50%;
  min-height: 60px;
  padding: 10px 25px;
  background: var(--bg-light-grey);
`;

export const Value = styled.span`
  font-size: ${({ fontbase }) => (fontbase ? 'var(--font-size-base)' : 'var(--font-size-xs)')};
  line-height: ${({ fontbase }) =>
    fontbase ? 'calc(var(--font-size-base) + 0.3125rem)' : 'calc(var(--font-size-xs) + 0.3125rem)'};
  font-weight: bold;

  width: 50%;
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  background: var(--light-secondary);
`;
