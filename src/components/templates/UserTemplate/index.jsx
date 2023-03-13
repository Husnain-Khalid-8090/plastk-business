import React from 'react';

import PhoneImg from '../../molecules/LoginImg';
import { TemplateHolder, Content, ImgHolder } from './UserTemplate.styles';

function UserTemplate({ children }) {
  return (
    <TemplateHolder>
      <ImgHolder>
        <PhoneImg />
      </ImgHolder>
      <Content>{children}</Content>
    </TemplateHolder>
  );
}

export default UserTemplate;
