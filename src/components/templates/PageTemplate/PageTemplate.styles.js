import styled from 'styled-components/macro';

export const Content = styled.div`
  padding: 7rem 1rem 1.875rem;
  @media (min-width: 1200px) {
    padding: 1.875rem 1.875rem 1.875rem 6.375rem;
  }
  @media (min-width: 992px) {
    padding: 1.875rem 1rem 1.875rem 5.5625rem;
    min-height: 100vh;
  }
  @media (max-width: 767px) {
    padding: 0;
    min-height: 100vh;
  }
`;
