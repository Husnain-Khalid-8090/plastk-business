import styled from 'styled-components/macro';
import { ToastContainer } from 'react-toastify';
import Form from '../components/organisms/Form';

export const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`;

export const FormHolder = styled.div`
  @media (min-width: 768px) {
    max-width: 542px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  padding: 1.875rem 0;
`;

export const StyledToastContainer = styled(ToastContainer)`
  z-index: var(--z-90);

  .Toastify__toast {
    padding: 0;
    min-height: 0;
    border-radius: 8px;
    font-family: inherit;
  }
  .Toastify__toast--default {
    background: none;
  }
  .Toastify__toast-body {
    padding: 0;
  }
  .Toastify__close-button {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  }
`;
