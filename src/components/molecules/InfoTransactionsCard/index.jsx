import React from 'react';

import { InfoCard, Title, Value } from './InfoTransactionsCard.styles';

function InfoTransactionsCard({ title, value, fontbase, ...props }) {
  return (
    <InfoCard {...props}>
      <Title fontbase={fontbase}>{title}:</Title>
      <Value fontbase={fontbase}> {value}</Value>
    </InfoCard>
  );
}

export default InfoTransactionsCard;
