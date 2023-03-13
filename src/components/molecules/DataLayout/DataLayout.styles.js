import styled from 'styled-components/macro';
import Heading from '../../atoms/Heading';

export const DataHolder = styled.div`
  background: var(--white);
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  padding-top: 30px;
  padding-bottom: 25px;

  @media (min-width: 992px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;

export const FiltersHolder = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > * {
    flex-shrink: 0;
    margin-left: 10px;

    &:only-child {
      flex-grow: 0;
    }
  }
`;

export const StyledHeading = styled(Heading)`
  margin: 0 5px 0 0;
  flex-shrink: 0;
`;

export const ContentWrap = styled.div`
  position: relative;
  z-index: 1;
`;

export const HeadingHolder = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  button {
    max-width: 90px;
    flex-shrink: 0;

    @media (min-width: 768px) {
      max-width: 125px;
    }
  }
`;
