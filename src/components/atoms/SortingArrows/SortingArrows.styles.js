import styled from 'styled-components/macro';

export const IconHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  i {
    font-size: 12px;
    cursor: pointer;
    &:hover {
      color: #639a63;
    }
    &.active {
      color: #639a63;
    }
  }
`;
