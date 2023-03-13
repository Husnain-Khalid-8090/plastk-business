import styled from 'styled-components/macro';

export const PdfHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  .demo-book.stf__parent {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086);
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:hover {
      cursor: grab;
    }
  }
`;
export const ButtonHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  * {
    margin: 0 10px;
  }
`;
