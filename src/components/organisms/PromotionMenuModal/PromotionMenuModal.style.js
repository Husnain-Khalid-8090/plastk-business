// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 14px;
  line-height: 17px;

  button {
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: 13px 5px;
    border-radius: 50px;
    text-align: center;
    background: var(--white);

    &:hover {
      color: var(--white);
      background: var(--darkMosGreen);
    }
  }
`;

export const Li = styled.li`
  display: block;
  padding: 2px 0;
`;

export const Header = styled.div`
  margin: 0 0 16px;
`;

export const Holder = styled.div`
  color: var(--dark);
`;
export const ParaHolder = styled.div`
  padding: 15px;
  margin: 0 0 15px;
  font-weight: 600;
  color: var(--danger2);
  border-radius: 10px;
  background: #fafafa;
`;
export const BtnHolder = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;
export const Title = styled.strong`
  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  display: block;

  span {
    font-weight: 600;
  }
`;
