import styled from 'styled-components/macro';

export const StyleCarousel = styled.div`
  overflow: hidden;
  font-size: var(--font-size-sm);
  line-height: 18px;
  color: var(--primary-text-color);
  background: var(--white);
`;

export const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
  margin-bottom: 10px;
`;

export const StyleIndicators = styled.div`
  display: flex;
  justify-content: center;

  > button {
    display: block;
    width: 6px;
    height: 6px;
    padding: 0;
    margin: 5px;
    border: 0;
    outline: none;
    box-shadow: none;
    font-size: 0;
    line-height: 0;
    border-radius: 100%;
    opacity: 0.3;
    background: linear-gradient(221.92deg, #c8f261 9.65%, #88db3a 94.07%);

    &:hover,
    &.active {
      opacity: 1;
    }
  }
`;
