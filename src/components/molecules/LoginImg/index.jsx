import React from 'react';
import { BgHolder, StyledLogo } from './LoginImg.styles';

function LoginImg() {
  return (
    <BgHolder>
      <StyledLogo href={process.env.REACT_APP_MAIN_URL} />
    </BgHolder>
  );
}

export default LoginImg;
