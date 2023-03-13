// eslint-disable-next-line no-unused-vars
import styled, { css } from 'styled-components/macro';

export const FieldHolder = styled.div`
  padding: 0 0 5px;

  /* .addressField {
    @media (min-width: 992px) {
      grid-column: span 3;
    }
  } */

  @media (min-width: 768px) {
    padding: 0 0 20px;
  }
`;

export const MapSection = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

export const InputFlie = styled.div`
  position: relative;
`;

export const UploadMenu = styled.div`
  width: 50%;
`;
export const ImgCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 200px;
  flex-shrink: 0;
  background: var(--white);
  border: 2px solid var(--light-secondary);
  border-radius: 12px;
  margin: 0 0 20px;
  overflow: hidden;
  position: relative;
  padding-top: 10px;

  @media (min-width: 768px) {
    height: 250px;
  }

  img {
    display: block;
    max-width: 100%;
    /* object-fit: contain;
    height: 100%; */
  }
`;

export const Holder = styled.div`
  width: 50%;
  margin: 0 0 30px;
  border-radius: 12px;

  @media (min-width: 768px) {
    /* display: flex;
    justify-content: space-between; */
  }

  ${({ $type }) =>
    $type &&
    $type === 'online' &&
    css`
      border: 2px solid var(--light);
      border-radius: 8px;
      max-width: 500px;
    `}
`;

export const MapColumn = styled.div`
  width: 100%;
`;
export const MapHolder = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin: 0 0 20px;

  @media (min-width: 768px) {
    height: 250px;
  }

  > div {
    width: 100%;
    height: 100%;
  }
`;

export const ImgColumn = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 49%;
  }
  ${({ $type }) =>
    $type &&
    $type === 'online' &&
    css`
      width: 100% !important;
    `}
`;

export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 200px;
  flex-shrink: 0;
  background: var(--white);
  border: 2px solid var(--light-secondary);
  border-radius: 5px;
  margin: 0 0 20px;
  overflow: hidden;
  position: relative;
  padding-top: 10px;

  @media (min-width: 768px) {
    height: 250px;
  }

  img {
    display: block;
    width: 100%;

    object-fit: contain;
    height: 100%;
  }
`;

export const RadioWrap = styled.div`
  display: flex;
  align-items: center;

  > div {
    padding: 0 10px;
  }
`;

export const BtnHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FileBtnHolder = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  background: var(--white);
  border: 2px solid var(--light-secondary);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
