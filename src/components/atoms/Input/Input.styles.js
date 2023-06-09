import styled, { css } from 'styled-components/macro';
import { darken, cssVar } from 'polished';
import FakeInput from '../FakeInput';

export const styles = css`
  border: 1px solid ${({ $invalid }) => ($invalid ? 'var(--danger) !important' : 'var(--borderLight)')};
  background: ${({ type, $gray }) => (type === 'search' || $gray ? 'var(--light-secondary)' : 'var(--white)')};
  outline: none;
  height: ${({ sm }) => (sm ? '40px' : '50px')};
  padding: ${({ sm }) => (sm ? '0.3125rem 1.4375rem' : 'var(--form-element-padding)')};
  width: 100%;
  transition: border var(--animation-speed) ease-in-out;
  color: var(--secondary-text-color);
  font-size: var(--font-size-xs);
  border-radius: ${({ $rounded }) => ($rounded ? '85px' : '50px')};
  padding-left: ${({ $prefix }) => $prefix && '2.8rem'};
  padding-right: ${({ $suffix, $button }) => {
    if ($suffix) return '2.8rem';
    if ($button) return '3.6rem';
    return '';
  }};

  ${({ $gray }) =>
    $gray &&
    css`
      border-color: var(--light-secondary);
    `}

  ${({ type }) =>
    type === 'search' &&
    css`
      border: none;
      transition: all var(--animation-speed) ease-in-out;

      ${({ responsive }) =>
        responsive &&
        css`
          @media (max-width: 767px) {
            position: absolute;
            top: 30px;
            right: 10px;
            z-index: 9;
            box-shadow: 0px 23px 44px rgba(176, 183, 195, 0.3);
            background: var(--white);
            border: 1px solid var(--light);
            opacity: 0;
            visibility: hidden;
            transform: translateX(10px);
            width: 0;
          }
          @media (max-width: 575px) {
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
          }
        `}

      ${({ openSearch }) =>
        openSearch &&
        css`
          @media (max-width: 767px) {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
            width: 350px;
          }
          @media (max-width: 575px) {
            transform: translateY(0);
            width: 100%;
          }
        `}
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background: var(--light);
      cursor: not-allowed;
      border-color: #eee;
      color: var(--light-gray);
    `}

  &:focus {
    border-color: ${({ $invalid }) => !$invalid && `${darken(0.1, cssVar('--light'))}`};
  }

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: var(--placeholder-color);
    opacity: 1;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: var(--placeholder-color);
    opacity: 1;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: var(--placeholder-color);
    opacity: 1;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: var(--placeholder-color);
    opacity: 1;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }

  &[type='radio'] {
    + ${FakeInput} {
      border-radius: 100%;
      border: 1px solid #ebecf3;

      &:before {
        content: '';
        background: var(--primary);
        border-radius: 100%;
        width: 12px;
        height: 12px;
      }
    }
  }

  + ${FakeInput} {
    transition: background var(--animation-speed) ease-in-out;

    &:before,
    .icon-tick {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity var(--animation-speed) ease-in-out;
    }
  }

  &[type='checkbox'] {
    + ${FakeInput} {
      .icon-tick {
        color: var(--white);
        font-size: var(--font-size-xs);
      }
    }
  }

  &[type='checkbox'] {
    display: none;
    &:checked {
      + ${FakeInput} {
        background: var(--primary);
        .icon-check,
        &:before {
          opacity: 1;
        }
      }
    }
    &:disabled {
      + ${FakeInput} {
        opacity: 0.5;
      }
    }
  }

  &[type='radio'] {
    display: none;
    &:checked {
      + ${FakeInput} {
        background: var(--white);
        &:before {
          opacity: 1;
        }
      }
    }
    &:disabled {
      + ${FakeInput} {
        opacity: 0.5;
      }
    }
  }
`;

export const StyledTextarea = styled.textarea`
  ${styles}
  resize: vertical;
  min-height: 9.375rem;
`;

export const StyledInput = styled.input`
  ${styles}
`;
