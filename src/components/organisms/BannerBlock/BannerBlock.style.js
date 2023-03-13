// eslint-disable-next-line no-unused-vars
import styled, { css } from 'styled-components/macro';

export const Banner = styled.div`
  display: flex;
  justify-content: ${({ profilePage }) => (profilePage ? 'flex-end' : 'space-between')};
  padding: 20px 15px;
  /* margin: 0 0 50px; */
  border-radius: 25px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 768px) {
    padding: 25px;
  }
  @media (max-width: 767px) {
    height: 400px;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    clip-path: circle(144% at 50% -50%);
  }
  ${({ profilePage }) =>
    profilePage &&
    css`
      margin: -30px -30px 0;
      min-height: 368px;
    `}
`;

export const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 115px;
  height: 115px;
  border-radius: 100%;
  // background: var(--white);
  padding: 5px;

  @media (min-width: 768px) {
    width: 165px;
    height: 165px;
  }

  img {
    display: block;
    max-width: 100%;
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 100%;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Logo = styled.a`
  display: block;
  width: 120px;
  background: white;
  border-radius: 5px;
  padding: 5px 10px;
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;
export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  max-width: 450px;
  width: 100%;
  justify-content: flex-end;
  button {
    margin: 0 0 0 10px;
  }
`;
export const IconHolder = styled.div`
  position: 'absolute';
  display: flex;
  gap: 10px;
  top: '100px';
  right: '30px';
  width: 50px;
`;
