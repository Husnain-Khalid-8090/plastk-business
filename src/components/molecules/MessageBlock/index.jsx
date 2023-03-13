import React from 'react';
import logoImg from '../../../assets/images/plastk-logo-main.png';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';
import { TextWrap, Logo } from './MessageBlock.style';

function MessageBlock({ heading, description, button }) {
  return (
    <>
      <TextWrap>
        <Logo>
          <img src={logoImg} width="171" height="68" alt="BAP" />
        </Logo>

        <Heading level={1}>{heading}</Heading>
        <Paragraph>{description}</Paragraph>
        {button ?? null}
      </TextWrap>
    </>
  );
}

export default MessageBlock;
