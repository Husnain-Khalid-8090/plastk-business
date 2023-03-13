import React from 'react';

import { toast } from 'react-toastify';
import { StyledAlert, Message } from './Toast.styles';
import AlertIcon from '../../atoms/AlertIcon';

function Toast({ type, message, ...props }) {
  const { duplicateOff, id } = props;
  if (duplicateOff && id?.current) {
    if (!toast.isActive(id.current)) {
      id.current = toast(
        <>
          <StyledAlert $type={type} {...props}>
            <AlertIcon $type={type} />
            <Message $type={type}>{message}</Message>
          </StyledAlert>
        </>,
        {
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        },
      );
    }
    return null;
  }
  return toast(
    <>
      <StyledAlert $type={type} {...props}>
        <AlertIcon $type={type} />
        <Message $type={type}>{message}</Message>
      </StyledAlert>
    </>,
    {
      position: toast.POSITION.BOTTOM_CENTER,
      hideProgressBar: true,
    },
  );
}

export default Toast;
