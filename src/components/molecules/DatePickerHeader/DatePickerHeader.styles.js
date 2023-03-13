import styled from 'styled-components/macro';

export const HeadHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const Arrows = styled.button`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 1;
`;

export const Select = styled.select`
  border: none;
  background: none;
  outline: none;
  font-weight: bold;
  font-size: 20px;
  line-height: 1;
  text-align: center;
  option {
    font-size: 12px;
  }
`;

export const SelectHolder = styled.div`
  display: flex;
  align-items: center;
  select {
    margin: 0 10px;
  }
`;
