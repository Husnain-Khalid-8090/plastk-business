import styled from 'styled-components/macro';

export const TeamConditionModal = styled.div`
  position: relative;
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  color: var(--primary-text-color);
`;

export const TextHolder = styled.div`
  width: 100%;
  position: relative;
  height: 450px;
  overflow: auto;
  font-size: 14px;
  line-height: 20px;
  color: var(--primary-text-color);
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  p {
    margin: 0 0 20px;
  }

  .uppercase {
    text-transform: uppercase;
  }
`;

export const BtnHolder = styled.div`
  display: flex;
  justify-content: flex-end;
`;
