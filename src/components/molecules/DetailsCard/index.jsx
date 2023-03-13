import React from 'react';

import { StyledDetailsCard } from './DetailsCard.styles';
import Heading from '../../atoms/Heading';

function DetailsCard({ title, children, primary, ...props }) {
  return (
    <StyledDetailsCard primary={primary} {...props}>
      <>
        {title && <Heading level={4}>{title}</Heading>}
        {children}
      </>
    </StyledDetailsCard>
  );
}

export default DetailsCard;
