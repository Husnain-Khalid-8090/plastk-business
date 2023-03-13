import styled from 'styled-components/macro';

export const StyledTitleHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  &:only-child(button) {
    align-items: flex-end;
  }
`;

export const Title = styled.strong`
  font-size: var(--font-size-lg);
  flex-grow: 1;
  color: var(--headings-color);
  margin-left: 20px;
  @media (min-width: 768px) {
    display: none;
  }
`;
