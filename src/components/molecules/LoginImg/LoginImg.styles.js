import styled from 'styled-components/macro';
import Pattern from '../../../assets/images/img01.jpg';
import Logo from '../../atoms/Logo';

export const BgHolder = styled.div`
  @media (min-width: 768px) {
    background-image: url(${Pattern});
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 1rem 2rem;
  }
  @media (min-width: 992px) {
    padding: 1rem 4rem;
  }
`;

export const ImgHolder = styled.div`
  margin: 0 auto;
`;

export const StyledLogo = styled(Logo)`
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 1;
  @media (min-width: 992px) {
    top: 60px;
    left: 60px;
  }
`;
