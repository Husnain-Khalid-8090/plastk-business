import styled from 'styled-components/macro';

export const BtnHolder = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-top: 20px;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
`;
export const BtnCol = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;

  button {
    width: 150px;
  }
`;
export const HeadingWrap = styled.div`
  /* display: flex; */
  display: none;
  align-items: center;
  margin-bottom: 15px;
  h2 {
    margin: 0;
    flex-grow: 1;
  }
  button {
    width: 100px;
    padding: 10px 10px;
    font-size: 12px;
    line-height: 15px;
    display: inline-block;
    color: #0f2546;
    border: 1px solid rgba(74, 85, 104, 0.1);
    filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.05));
    border-radius: 69px;
    cursor: pointer;
  }
`;
