import styled from 'styled-components/macro';
import Logo from '../../atoms/Logo';

export const StyledLogo = styled(Logo)`
  margin: 0 auto 1.875rem;
`;

export const TemplateHolder = styled.div`
  background: var(--white);
  padding: 1.875rem;
  display: flex;
  min-height: 100vh;
  @media (min-width: 992px) {
    padding: 3.75rem;
  }
`;

export const ContentHolder = styled.div`
  background: var(--primary-gradient);
  padding: 1.875rem;
  border-radius: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
