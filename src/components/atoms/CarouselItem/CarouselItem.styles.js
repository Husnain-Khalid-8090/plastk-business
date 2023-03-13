import styled from 'styled-components/macro';

export const StyledCarouselItem = styled.div`
  display: inline-flex;
  align-items: flex-start;
  height: 75px;
  overflow-y: auto;
  justify-content: center;
  color: var(--primary-text-color);

  p {
    white-space: normal;
  }
`;
