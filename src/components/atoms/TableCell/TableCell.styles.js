import styled, { css } from 'styled-components/macro';

const styles = css`
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  font-size: var(--font-size-sm);
  font-weight: bold;

  @media (min-width: 992px) {
    display: table-cell;
    padding: 1rem 0.5rem;

    &:first-child {
      padding-left: 1.5rem;
    }
    &:last-child {
      padding-right: 1.5rem;
    }
  }

  ${({ extraSmall }) =>
    extraSmall &&
    css`
      font-size: 12px;
      line-height: 15px;
      border: 0.5px solid rgba(111, 124, 151, 0.1);
      background: none;

      @media (min-width: 992px) {
        padding: 4px 10px;

        &:first-child {
          padding-left: 10px;
        }
        &:last-child {
          width: 120px;
          padding-right: 10px;
        }
      }
    `}
`;

export const Th = styled.th`
  ${styles}
  background: ${({ gray }) => (gray ? '#F6F8FA' : 'var(--bg-light-grey)')};
  color: ${({ gray }) => (gray ? 'var(--primary-text-color)' : 'var(--primary-text-color)')};
  display: none;
  font-weight: 700;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  text-align: center;

  &:first-child {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  &:last-child {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  ${({ extraSmall, graphType }) =>
    extraSmall &&
    graphType &&
    css`
      border: 0;
      padding-top: 4px;
      padding-bottom: 4px;
      text-align: left;
      color: #fff;
      background: ${graphType === 'transactions'
        ? '#11475A'
        : graphType === 'rewards'
        ? '#A0D800'
        : graphType === 'owed'
        ? '#D74120'
        : graphType === 'clicks'
        ? '#E3F8CF'
        : graphType === 'conversions'
        ? '#C197CE'
        : '#6C1A45'};

      &:first-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &:last-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}

  ${({ hasBg }) =>
    hasBg &&
    css`
      color: var(--white);
      background: var(--darkMosGreen);

      &:first-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &:last-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `}
`;

export const Td = styled.td`
  ${styles}
  display: flex;
  justify-content: space-between;
  font-weight: normal;
  text-align: center;

  @media (max-width: 991px) {
    padding: 10px 15px;

    &:nth-child(odd) {
      background: var(--light);
      border-radius: 8px;
    }
  }
  button {
    margin: 0 auto;
  }

  &:before {
    content: attr(data-th);
    font-weight: bold;
    display: inline-block;
    color: var(--primary-text-color);

    @media (min-width: 992px) {
      display: none;
    }
  }
  ${({ extraSmall }) =>
    extraSmall &&
    css`
      text-align: left;
    `}
`;
