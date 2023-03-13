import styled, { css } from 'styled-components/macro';
import OtpInput from 'react18-input-otp';

const StyledOtpInput = styled(OtpInput)`
  input {
    flex-shrink: 0;
    border: none;
    background-color: var(--bg-light-grey);
    color: var(--primary-text-color);
    border-radius: 15px;
    outline: none;
    padding: 0.75rem;
    text-align: center;
    transition: border var(--animation-speed) ease-in-out, box-shadow var(--animation-speed) ease-in-out;
    font-size: 1.25rem;
    line-height: 1.8125rem;
    ${({ sm }) =>
      sm
        ? css`
            width: 44px !important;
            height: 44px;
            margin: 0 0.1875rem;
          `
        : css`
            width: 50px !important;
            height: 50px;
            margin: 0 0.1875rem;
          `};

    @media (min-width: 576px) {
      ${({ sm }) =>
        sm
          ? css`
              width: 60px !important;
              height: 60px;
              margin: 0 0.4375rem;
            `
          : css`
              width: 70px !important;
              height: 70px;
              margin: 0 0.3125rem;
            `};
    }
    @media (min-width: 1400px) {
      ${({ sm }) =>
        sm
          ? css`
              width: 84px !important;
              height: 84px;
              font-size: 1.625rem;
              line-height: 1.5rem;
              margin: 0 0.9375rem;
            `
          : css`
              width: 100px !important;
              height: 100px;
              font-size: 2rem;
              line-height: 2.125rem;
              margin: 0 1.4375rem;
            `};
    }
    &:focus {
      border-color: var(--primary);
      box-shadow: 0px 12px 23px rgba(55, 125, 255, 0.06);
    }
  }
`;

export default StyledOtpInput;
