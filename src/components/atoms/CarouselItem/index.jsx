import React from 'react';

import { StyledCarouselItem } from './CarouselItem.styles';

function CarouselItem({ children, width }) {
  return (
    <>
      <StyledCarouselItem style={{ width }}>{children}</StyledCarouselItem>
    </>
  );
}

export default CarouselItem;
