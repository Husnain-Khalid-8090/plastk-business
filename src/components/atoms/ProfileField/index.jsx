import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { FieldBox, IconWrap, TextWrap, Title, Value } from './ProfileField.styles';

function ProfileField({ icon, title, value, sm }) {
  return (
    <>
      {value && (
        <FieldBox sm={sm}>
          {icon && <IconWrap>{icon}</IconWrap>}
          <TextWrap>
            <Title>{title}</Title>
            <Value>{value}</Value>
          </TextWrap>
        </FieldBox>
      )}
    </>
  );
}

export default ProfileField;
