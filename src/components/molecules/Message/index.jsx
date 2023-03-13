import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import Paragraph from '../../atoms/Paragraph';
import { MessageHolder } from './Message.styles';

function Message({ text, width, lg, ...props }) {
  return (
    <MessageHolder $width={width} $lg={lg} {...props}>
      <Paragraph css="color:var(--primary)" noMargin lg={!lg} xl={lg}>
        {text}
      </Paragraph>
    </MessageHolder>
  );
}

export default Message;
