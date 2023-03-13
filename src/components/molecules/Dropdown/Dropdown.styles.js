// import styled, { css } from 'styled-components/macro';
// import Button from '../../atoms/Button';

// export const DropDownContainer = styled.div`
//   position: relative;
// `;

// export const DropDownButton = styled(Button)``;

// export const DropDownListContainer = styled.div`
//   position: absolute;
//   top: calc(100% + 16px);
//   right: 0;
//   z-index: var(--z-30);
//   width: max-content;
//   padding: 15px;
//   background: var(--bg-light);
//   box-shadow: -29px 60px 90px rgba(23, 18, 43, 0.55);
//   border-radius: 10px;
//   font-size: var(--font-size-sm);
//   line-height: calc(var(--font-size-sm) + 4px);

//   .light & {
//     background: var(--white);

//     &:before {
//       background: var(--white);
//     }
//   }
// `;
// export const Title = styled.strong`
//   margin-bottom: 1rem;
//   display: block;
//   ${({ sm }) =>
//     sm
//       ? css`
//           font-size: var(--font-size-xs);
//           line-height: calc(var(--font-size-xs) + 0.3125rem);
//         `
//       : css`
//           font-size: var(--font-size-sm);
//           line-height: calc(var(--font-size-sm) + 0.3125rem);
//         `}
// `;
// export const DropDownList = styled.ul``;

// export const ListItem = styled.li``;

// export const IconHolder = styled.div`
//   display: flex;
//   align-items: center;
// `;

// export const ListButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   color: #8786ab;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   &:hover {
//     background: var(--base-background-color);
//   }
// `;

import styled, { css } from 'styled-components/macro';
// import { ListboxInput, ListboxOption, ListboxPopover, ListboxList } from '@reach/listbox';
import { StyledListBoxButton } from '../../atoms/Button/Button.styles';

const MenuListStyles = css`
  box-shadow: 3px 18px 44px rgba(176, 183, 195, 0.28);
  padding: 16px 10px;
  border-radius: 0.875rem;
  background: var(--white);
  color: var(--primary-text-color);
  border: none;
  min-width: min-content;
  position: absolute;
  top: calc(100% + 13px);
  z-index: var(--z-30);
  ${({ $calendar }) =>
    $calendar
      ? css`
          right: ${({ $twoBtns }) => ($twoBtns ? '-21px' : '-63px')};
          @media (min-width: 576px) {
            right: 0;
          }
        `
      : 'right: 0;'}
`;

// export const StyledListboxPopover = styled(ListboxPopover)`
export const StyledListboxPopover = styled.div`
  ${MenuListStyles}
`;

export const Title = styled.strong`
  margin-bottom: 1rem;
  display: block;
  ${({ sm }) =>
    sm
      ? css`
          font-size: 0.75rem;
          line-height: 1rem;
        `
      : css`
          font-size: 0.875rem;
          line-height: 1rem;
        `}
`;

// export const StyledListboxOption = styled(ListboxOption)`
export const StyledListboxOption = styled.div`
  padding: 0.625rem 0.875rem;
  width: 100%;
  text-align: left;
  background-color: ${({ selected }) => (selected ? 'var(--light-secondary)' : 'transparent')};
  border: none;
  border-radius: 40px;
  margin-bottom: 3px;
  color: var(--primary-text-color);
  font-size: 0.6875rem;
  line-height: 0.75rem;
  min-width: max-content;

  &:hover,
  &:focus,
  &[data-current-selected] {
    cursor: pointer;
    background-color: var(--darkMosGreen);
    color: var(--white);
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

// export const ReachListBoxButton = styled(StyledListBoxButton)`
//   &[aria-expanded='true'] {
//     background: var(--darkMosGreen);
//     color: var(--white);
//   }
// `;

export const ReachListBoxButton = styled(StyledListBoxButton)`
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  padding: 0.625rem 1rem;
  font-size: 14px;
  line-height: 17px;
  &[aria-expanded='true'] {
    background: var(--primary);
    color: var(--white);
  }
  .icon-filter {
    margin-left: 5px;
  }
  ${({ $filter }) =>
    $filter &&
    css`
      background: none;
      width: auto;
      height: auto;
      padding: 9px 10px;
      &:hover,
      &.active {
        background: var(--secondary);
        color: var(--white);
      }
      &[aria-expanded='true'] {
        background: var(--secondary);
        color: var(--white);
      }
    `}
`;

// export const StyledListboxInput = styled(ListboxInput)`
export const StyledListboxInput = styled.div`
  position: relative;
`;

// export const StyledListboxList = styled(ListboxList)
export const StyledListboxList = styled.div`
  outline: none;
`;
