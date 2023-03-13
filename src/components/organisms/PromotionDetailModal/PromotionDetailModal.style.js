// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

export const SwitcherBtns = styled.div`
  width: 380px;
  display: flex;
  align-items: center;
  margin: 0 0 30px;
  padding: 0 0 0 9px;
  border-radius: 50px;
  background: var(--bg-light-grey);
`;

export const Button = styled.button`
  border: 0;
  width: 50%;
  border-radius: 50px;
  font-size: var(--font-size-sm);
  line-height: 1;
  padding: 15px 10px;
  font-weight: 600;
  color: var(--primary-text-color);
  outline: none;
  box-shadow: none;
  transition: 0.3s linear;
  background: var(--light-secondary);

  &.active,
  &:focus,
  &:hover {
    background: var(--white);
    color: var(--primary-text-color);
    outline: none;
    box-shadow: none;
    box-shadow: 2.35px 2.35px 11.75px rgba(0, 0, 0, 0.1);
  }

  span {
    display: block;
  }
`;
