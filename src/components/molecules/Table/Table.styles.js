import styled, { css } from 'styled-components/macro';

export const TableHolder = styled.div`
  padding: ${({ noPadding }) => (noPadding ? '0' : '1.25rem 1rem 0.5625rem')};
  background: ${({ extraSmall }) => (extraSmall ? 'none' : 'var(--base-background-color)')};
  padding-top: 10px;
  /* min-height: 450px; */

  @media (min-width: 768px) {
    padding: 1.25rem;
  }
  @media (min-width: 992px) {
    background: ${({ extraSmall }) => (extraSmall ? 'none' : 'var(--white)')};
    padding: 0;
  }
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;

  ${({ extraSmall }) =>
    extraSmall &&
    css`
      overflow-x: inherit;
    `}
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  color: var(--primary-text-color);

  @media (min-width: 992px) {
    min-width: ${({ $width }) => $width && `${$width}px`}; /* width on which horizontal scroll will appear */
  }
`;

export const Thead = styled.thead`
  @media (max-width: 991px) {
    display: none;
  }
  tr {
    border-bottom: none;
  }
`;

export const TBody = styled.tbody`
  /* display: block; */
  max-height: ${({ $height }) => $height && `${$height}px`};

  @media (max-width: 991px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    gap: 10px;
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
`;

export const NoRecord = styled.div`
  background: ${({ further }) => (further ? '#d2ecf1' : '#ffebeb')};
  border-radius: 5px;
  max-width: 200px;
  font-size: var(--font-size-xs);
  line-height: 1;
  padding: 14px;
  color: ${({ further }) => (further ? '#296771' : '#ff6565')};
  text-align: center;
  margin: 0 auto;
`;

export const SortBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
