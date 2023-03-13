import styled from 'styled-components/macro';
import Button from '../../atoms/Button';
import Logo from '../../atoms/Logo';

export const LogoWrap = styled.div`
  position: relative;
`;

export const StyledLogo = styled(Logo)`
  margin: 0 0 1.875rem;
`;

export const TemplateHolder = styled.div`
  background: var(--primary-gradient);
  padding: 1.25rem;

  @media (min-width: 992px) {
    padding: 2.5rem 1.875rem 1.875rem;
    min-height: 100vh;
  }
`;

export const ContentHolder = styled.div`
  background: var(--white);
  padding: 2.5rem 1.25rem 1.25rem;
  box-shadow: 0px 23px 44px rgba(176, 183, 195, 0.14);
  border-radius: 30px;
`;

export const ButtonStyled = styled(Button)`
  position: absolute;
  top: 19px;
  right: 19px;
  z-index: 1;
  @media (min-width: 768px) {
    top: 17px;
    right: 20px;
  }
  @media (min-width: 992px) {
    top: 36px;
    right: 30px;
  }
`;
