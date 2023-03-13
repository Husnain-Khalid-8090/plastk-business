import React from 'react';

import { HistoryCard, Title, Value } from './InfoHistoryCard.styles';

function InfoHistoryCard({ title, value, fontbase, ...props }) {
  return (
    <HistoryCard {...props}>
      <Title fontbase={fontbase}>{title}:</Title>
      <Value fontbase={fontbase}> {value}</Value>
    </HistoryCard>
  );
}

export default InfoHistoryCard;
