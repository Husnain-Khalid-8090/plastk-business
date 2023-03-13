import styled from 'styled-components/macro';

export const Banner = styled.div`
  background-color: #ef5350;
  padding: 15px;
  margin: -29px -30px 20px -30px;
  position: relative;
  text-align: center;
`;

export const Text = styled.h4`
  color: #fff;
  margin: 0;
`;
export const BtnClose = styled.span`
  position: absolute;
  top: 10px;
  right: 18px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const BtnHolder = styled.div`
  display: flex;
  justify-content: 'space-between';
  gap: 10px;
`;

export const IconHolder = styled.div`
  text-align: center;
  color: #ef5350;
  span {
    font-size: 50px;
  }
`;
