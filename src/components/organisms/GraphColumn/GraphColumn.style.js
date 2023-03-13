/* eslint-disable no-unused-vars */
import styled, { css } from 'styled-components/macro';

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -40px;
    right: 0;
    border-radius: 0 50px 50px 0;
    background: linear-gradient(270deg, #11475a 0%, rgba(17, 71, 90, 0.1) 100%);
    z-index: -1;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

export const GraphCol = styled.div`
  width: 100%;
  padding: 25px 20px;
  border-radius: 10px;
  background: var(--white);
  overflow: hidden;
  border: 1px solid rgba(74, 85, 104, 0.1);
  border-radius: 25px;

  @media (min-width: 1366px) {
    padding: 30px 30px 50px;
  }

  ${({ title }) =>
    title === 'Total Transactions' &&
    css`
      /* background: rgba(53, 131, 234, 0.05); */

      ${IconBox} {
        &:before {
          background: linear-gradient(270deg, #11475a 0%, rgba(17, 71, 90, 0.1) 100%);
        }
      }
    `}

  ${({ title }) =>
    title === 'Rewards Points Summary' &&
    css`
      /* background: rgba(171, 223, 101, 0.05); */

      ${IconBox} {
        &:before {
          background: linear-gradient(270deg, #a0d800 0%, rgba(160, 216, 0, 0.1) 100%);
        }
      }
    `}

  ${({ title }) =>
    title === 'Amount Owed to Plastk' &&
    css`
      /* background: rgba(251, 93, 59, 0.05); */

      ${IconBox} {
        &:before {
          background: linear-gradient(270deg, #d74120 0%, rgba(215, 65, 32, 0.1) 100%);
        }
      }
    `}

    ${({ title }) =>
    title === 'Impressions' &&
    css`
      /* background: rgba(68, 144, 250, 0.05); */

      ${IconBox} {
        &:before {
          background: linear-gradient(270deg, #6c1a45 0%, rgba(108, 26, 69, 0.1) 100%);
        }
      }
    `}

    ${({ title }) =>
    title === 'Clicks' &&
    css`
      /* background: rgba(54, 192, 219, 0.05); */

      ${IconBox} {
        &:before {
          background: linear-gradient(270deg, #e3f8cf 0%, rgba(227, 248, 207, 0.1) 100%);
        }
      }
    `}

    ${({ title }) =>
    title === 'Conversions' &&
    css`
      /* background: rgba(214, 47, 104, 0.05); */

      ${IconBox} {
        &:before {
          background: linear-gradient(270deg, #c197ce 0%, rgba(193, 151, 206, 0.1) 100%);
        }
      }
    `}
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 0 30px;

  @media (min-width: 1366px) {
    margin: 0 0 35px;
  }
`;

export const TextBox = styled.div`
  flex-grow: 1;
  padding: 0 0 0 10px;
`;

export const Title = styled.strong`
  display: block;
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
  text-transform: capitalize;
  margin: 0 0 3px;
`;

export const Value = styled.span`
  display: block;
  font-size: 14px;
  line-height: 17px;
`;

export const GraphBox = styled.div``;

export const BtnSwitch = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const Button = styled.button`
  display: block;
`;

export const TableBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
`;
