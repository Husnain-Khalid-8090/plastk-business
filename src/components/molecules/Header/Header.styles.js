import styled from 'styled-components/macro';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: start;
  background: var(--primary-gradient);
  padding: 1rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: var(--z-35);

  @media (min-width: 992px) {
    background: none;
    position: static;
    padding: 1.625rem 1.25rem;
    margin: -1.875rem -1.25rem 0;
  }

  @media (min-width: 1200px) {
    padding: 1.25rem 1.25rem 1.8125rem;
    margin: -1.875rem -1.25rem 0;
  }
`;

export const ButtonsHolder = styled.div`
  margin: 0 -10px;

  @media (min-width: 1200px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row-reverse;
  }
  @media (min-width: 992px) {
    margin: 0 -5px;
  }
  > * {
    gap: 10px;
  }
  @media (max-width: 991px) {
    [class^='icon-'],
    [class*=' icon-'] {
      color: var(--text-color-gray);
    }
  }
`;

export const MenuButton = styled.button`
  display: flex;
  color: var(--black);
  // @media (max-width: 767px) {
  //    {
  //     color: #fff;
  //   }
  // }
`;
export const MenuBtnMobile = styled.div`
  position: absolute;
  z-index: 1;
  top: 50px;
  left: 20px;
`;
