import React from 'react';

import { StyledAlert, Message } from './Alert.styles';
import AlertIcon from '../../atoms/AlertIcon';

function Alert({ type, message, ...props }) {
  return (
    <>
      <StyledAlert $type={type} {...props}>
        <AlertIcon $type={type} />
        <Message $type={type}>{message}</Message>
      </StyledAlert>
    </>
  );
}

export default Alert;
