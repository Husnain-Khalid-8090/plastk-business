// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

export const InformationHolder = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const ImgColumn = styled.div`
  width: 200px;
  flex-shrink: 0;
  margin: 0 auto 20px;

  @media (min-width: 768px) {
    width: 264px;
    margin: 0;
  }
  @media (min-width: 1200px) {
    width: 375px;
  }
`;

export const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 184px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.1);
  border: 2px solid var(--light-secondary);
  border-radius: 5px;
  margin: 0 0 30px;
  padding: 15px;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

export const RadioWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FieldColumn = styled.div`
  flex-grow: 1;

  @media (min-width: 768px) {
    padding: 0 0 0 25px;
  }
  @media (min-width: 1200px) {
    padding: 0 0 0 50px;
  }
`;

export const BtnHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const LogoSize = styled.span`
  display: block;
  font-size: var(--font-size-sm);
  line-height: calc(var(--font-size-sm) + 0.3125rem);
  margin-top: -10px;
`;
