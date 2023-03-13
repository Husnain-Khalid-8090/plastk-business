import styled from 'styled-components/macro';

export const TemplateHolder = styled.div`
  min-height: 100vh;
  height: 100%;
  @media (min-width: 768px) {
    display: flex;
    flex-flow: row wrap;
  }
`;

export const ImgHolder = styled.div`
  display: none;
  @media (min-width: 768px) {
    width: 48%;
    display: flex;
  }
`;

export const Content = styled.div`
  padding: 1rem 1.875rem;
  @media (min-width: 768px) {
    width: 52%;
    display: flex;
    justify-content: center;
    padding: 1rem 2rem;
  }
  @media (min-width: 992px) {
    padding: 3.75rem 4rem;
  }
`;
