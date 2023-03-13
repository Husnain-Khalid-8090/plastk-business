/* eslint-disable no-unused-vars */
import styled from 'styled-components/macro';

export const TableWrap = styled.div`
  width: 100%;
  padding: 0 10px 0 0;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #ebecf3;
  }
  &::-webkit-scrollbar-thumb {
    background: #6f7c97;
  }
`;
