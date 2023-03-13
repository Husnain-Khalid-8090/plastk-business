import styled from 'styled-components/macro';

export const Title = styled.strong`
  font-size: ${({ fontbase }) => (fontbase ? 'var(--font-size-base)' : 'var(--font-size-xs)')};
  line-height: ${({ fontbase }) =>
    fontbase ? 'calc(var(--font-size-base) + 0.3125rem)' : 'calc(var(--font-size-xs) + 0.3125rem)'};
  font-weight: bold;
`;

export const Value = styled.span`
  font-size: ${({ fontbase }) => (fontbase ? 'var(--font-size-base)' : 'var(--font-size-xs)')};
  line-height: ${({ fontbase }) =>
    fontbase ? 'calc(var(--font-size-base) + 0.3125rem)' : 'calc(var(--font-size-xs) + 0.3125rem)'};
`;
export const StyledInfoCard = styled.div`
  display: flex;
  align-items: center;
  padding: 22px 32px;

  ${({ vertical }) => vertical && 'display: block;'}
  ${Title} {
    ${({ vertical }) => vertical && 'display: block;'}
  }
  ${Value} {
    ${({ vertical }) => vertical && 'display: block;'}
  }
  /* ${Title} { */
  ${({ center }) => center && 'justify-content:center;'}/* } */
`;
