import React from 'react';

import { StyledGridCol } from './GridCol.styles';

const GridCol = ({ children, xs, sm, md, lg, xl, ...props }) => (
  <StyledGridCol xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...props}>
    {children}
  </StyledGridCol>
);

export default GridCol;
