import styled from 'styled-components/macro';
import Link from '../../atoms/Link';

export const a = styled(Link)`
  font-weight: bold;
`;
export const LogoSize = styled.span`
  display: block;
  margin: 0 0 15px;
  font-size: var(--font-size-sm);
`;

export const BtnWraper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const ImgColumn = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 49%;
  }
`;

export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  background: var(--white);
  border: 2px solid var(--light-secondary);
  border-radius: 5px;
  margin: 0 0 20px;
  overflow: hidden;
  position: relative;

  img {
    display: block;
    max-width: 110px;
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
