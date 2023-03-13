import React from 'react';

import { v4 } from 'uuid';
import { StyledTooltip } from './Tooltip.styles';

function Tooltip({ children, title, type }) {
  const id = v4();
  return (
    <>
      <span data-for={id} data-tip data-iscapture="true">
        {children}
      </span>
      <StyledTooltip id={id} place="top" type={type} effect="solid">
        {title}
      </StyledTooltip>
    </>
  );
}

export default Tooltip;
