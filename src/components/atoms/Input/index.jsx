import React, { forwardRef } from 'react';

import { StyledTextarea, StyledInput } from './Input.styles';

const Input = forwardRef(({ name, ...props }, ref) => {
  const { type } = props;
  if (type === 'textarea') {
    return <StyledTextarea {...props} name={name} ref={ref} />;
  }
  return <StyledInput {...props} name={name} ref={ref} />;
});

export default Input;
