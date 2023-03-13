/* eslint-disable no-unused-vars */
import styled from 'styled-components/macro';

export const ContentHead = styled.div`
  width: 100%;
  position: relative;
  padding-top: 35px;
  padding-bottom: 35px;

  @media (min-width: 1200px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  @media (min-width: 1366px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

export const TabsCol = styled.div`
  max-width: 220px;
  width: 100%;
  flex-shrink: 0;
  margin: 0 auto 20px;

  @media (min-width: 1366px) {
    margin: 0;
    max-width: 300px;
  }
  @media (min-width: 1440px) {
    margin: 0;
    max-width: 400px;
  }
`;

export const RightCol = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;

  @media (min-width: 1200px) {
    justify-content: flex-end;
  }
`;

export const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 450px;

  select {
    width: 49%;
  }
`;

export const DashboardBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--light-secondary);
  border-radius: 50px;
  padding: 6px;
  width: 100%;
`;

export const Button = styled.button`
  width: 50%;

  border-radius: 50px;
  color: var(--white);
  font-size: var(--font-size-xs);
  line-height: 1;
  padding: 10px;
  font-weight: bold;
  color: #0f2546;
  transition: 0.3s linear;
  &.active,
  &:hover {
    background: var(--secondary);
    color: var(--white);
  }
`;
