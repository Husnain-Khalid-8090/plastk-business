import styled from 'styled-components/macro';

export const ProfileSection = styled.div`
  position: relative;
`;

export const ProfileWrap = styled.div`
  position: relative;

  @media (min-width: 992px) {
    display: flex;
    align-items: flex-start;
  }
  @media (min-width: 1400px) {
    padding: 3px 80px 0;
  }
`;
