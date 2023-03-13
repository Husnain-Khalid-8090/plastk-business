import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { StyledLabel, RequiredAsterisk } from './Label.styles';

function Label({ children, onlyRead, required, labelIcon, ...props }) {
  return (
    <>
      <StyledLabel $onlyRead={onlyRead} labelIcon={labelIcon} {...props}>
        {required ? <RequiredAsterisk>*</RequiredAsterisk> : ''}
        {children}
        {labelIcon && <span css="margin-left: 5px;">{labelIcon}</span>}
      </StyledLabel>
    </>
  );
}

export default Label;
