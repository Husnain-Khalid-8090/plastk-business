import React from 'react';

import { StyledGrid } from './Grid.styles';

const Grid = ({ children, xs, sm, md, lg, xl, gap, rowGap, colGap, colWidth, ...props }) => (
  <StyledGrid
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
    gap={gap}
    rowGap={rowGap}
    colGap={colGap}
    colWidth={colWidth}
    {...props}>
    {children}
  </StyledGrid>
);

export default Grid;
