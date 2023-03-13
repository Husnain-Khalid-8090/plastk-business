import React from 'react';

import { StyledInfoCard, Title, Value } from './InfoCard.styles';

function InfoCard({ title, value, fontbase, center, ...props }) {
  return (
    <StyledInfoCard {...props}>
      <Title fontbase={fontbase}>{title}&nbsp;:&nbsp;</Title>
      <Value fontbase={fontbase}>{value}</Value>
    </StyledInfoCard>
  );
}

export default InfoCard;
