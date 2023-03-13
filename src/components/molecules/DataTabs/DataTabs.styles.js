import styled, { css } from 'styled-components/macro';

export const StyledTabs = styled.div`
  flex-grow: 1;
`;

export const Wrap = styled.div`
  overflow-x: auto;
  border-bottom: 1px solid #e6e8ec;
  position: relative;

  &::-webkit-scrollbar {
    height: 8px;
    border-radius: 0;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledTabList = styled.div`
  display: flex;
  white-space: nowrap;
  margin: 0 0 3px;
  position: relative;
  z-index: 1;
`;

export const TabBtn = styled.div`
  padding: 0 5px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    padding: 0 5px;
  }
  &:first-child {
    padding-left: 0;
  }
`;

export const StyledTab = styled.button`
  font-size: var(--font-size-sm);
  line-height: 16px;
  font-weight: 700;
  text-transform: capitalize;
  color: rgba(74, 85, 104, 0.25);
  position: relative;
  padding: 20px 5px;
  border-radius: 6px;

  @media (min-width: 768px) {
    padding: 14px 10px;
  }

  &:after {
    /* display: none; */
    visibility: hidden;
    opacity: 0;
    transition: ease-in-out 0.5s;
    content: '';
    position: absolute;
    left: 50%;
    right: 0;
    bottom: -3px;
    transform: translateX(-50%);
    height: 1px;
    width: 0;
    background: var(--secondary-text-color);
  }

  &:hover {
    /* background: var(--primary); */
    color: var(--primary-text-color);

    &:after {
      visibility: visible;
      opacity: 1;
      width: 100%;
    }
  }
  ${({ active }) =>
    active &&
    css`
      /* background: var(--primary); */
      color: var(--primary-text-color);

      &:after {
        visibility: visible;
        opacity: 1;
        width: 100%;
      }
    `}
`;

export const StyledTabPanels = styled.div`
  /* overflow: hidden; */
  padding: 20px 0 20px;

  @media (min-width: 768px) {
    padding: 30px 0;
  }
`;

export const StyledTabPanel = styled.div`
  position: relative;
  opacity: 0;
  visibility: hidden;
  height: 0;
  transition: all 0.3s ease-in-out;
  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      visibility: visible;
      height: auto;
    `}
`;
