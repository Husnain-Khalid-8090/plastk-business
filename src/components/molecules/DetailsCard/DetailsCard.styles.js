import styled from 'styled-components/macro';

import { StyledInfoCard } from '../InfoCard/InfoCard.styles';

export const StyledDetailsCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  color: ${({ primary }) => (primary ? 'var(--white)' : 'var(--primary-text-color)')};
  ${StyledInfoCard} {
    /* background: ${({ primary }) => (primary ? 'var(--primary)' : '#f6f8fa')}; */
    background: ${({ primary }) => (primary ? 'var(--primary)' : '#fff')};
  }
  .card-row {
    &:nth-child(even) {
      ${StyledInfoCard} {
        /* background: #e9edf0; */
        background: #fff;
      }
    }
  }
`;
