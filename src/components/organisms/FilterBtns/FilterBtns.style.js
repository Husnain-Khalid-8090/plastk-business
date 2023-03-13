import styled from 'styled-components/macro';
import Select from '../../atoms/Select';

export const FiltersHolder = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }

  .btn-clear {
    display: inline-block;
    margin-top: 15px;

    @media (min-width: 768px) {
      margin: 0;
    }
  }
`;

export const SelectStyled = styled(Select)`
  width: 160px;
  margin: 0 3px;
  color: var(--primary-text-color);

  @media (min-width: 768px) {
    width: 185px;
    margin: 0 5px;
  }
  @media (min-width: 992px) {
    width: 200px;
    margin: 0 0 0 10px;
  }
  @media (min-width: 1366px) {
    width: 220px;
  }
`;

export const BtnsList = styled.div`
  display: flex;
  padding: 5px;
  margin: 15px 10px 0 0;
  border-radius: 50px;
  background: #f6f8fa;

  @media (min-width: 768px) {
    margin: 0 10px 0 10px;
  }
  @media (min-width: 1440px) {
    margin: 0 25px 0 10px;
  }
`;

export const Button = styled.button`
  display: block;
  min-width: 60px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  color: var(--primary-text-color);
  text-transform: capitalize;
  padding: 8px 10px;
  margin: 0 2px;
  border-radius: 50px;
  text-align: center;
  background: none;

  @media (min-width: 992px) {
    min-width: 70px;
  }
  @media (min-width: 1366px) {
    min-width: 80px;
  }

  &:hover,
  &.active {
    color: var(--white);
    background: var(--secondary);
  }
  &.active {
    font-weight: 700;
  }
`;
