/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components/macro';

export const UploadFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 16px;
  border: 1px dashed rgba(74, 85, 104, 0.25);

  ${({ columnBlock }) =>
    columnBlock &&
    css`
      flex-direction: column;
    `}

  .btn-remove {
    display: inline-block;
    font-size: 12px;
    line-height: 15px;
    color: #d74120;
  }
`;

export const InputFile = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 96px; */
  width: 100%;
  height: 32px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  text-transform: capitalize;
  color: var(--white);
  color: #4a5568;
  cursor: pointer;
  /* background: #c4c4c4;
  border: 2px solid #eff2f8; */
  border-radius: 5px;

  input[type='file'] {
    display: none;
  }
  ${({ uploadImg }) =>
    uploadImg &&
    css`
      width: 263px;
      height: 120px;
      border: 1px dashed rgba(74, 85, 104, 0.25);
      border-radius: 16px;
      color: #4a5568;
      background: transparent;
    `}
`;

export const LabelText = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;
