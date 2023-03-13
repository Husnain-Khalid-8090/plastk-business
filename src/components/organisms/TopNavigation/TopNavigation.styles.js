import styled from 'styled-components/macro';

export const BalanceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  font-size: 14px;
  padding-right: 10px;
`;

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (min-width: 1200px) {
    margin-bottom: 0px;
  }
  button {
    min-width: 160px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;
