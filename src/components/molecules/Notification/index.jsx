import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { toast } from 'react-toastify';
import { StyledNotification, TextHolder } from './Notification.styles';

import AlertIcon from '../../atoms/AlertIcon';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

function Notification({ type, message, title, ...props }) {
  return toast(
    <>
      <StyledNotification $type={type} {...props}>
        <AlertIcon $type={type} />
        <TextHolder>
          <Heading level={5} css="margin-bottom:4px;">
            {title}
          </Heading>
          <Paragraph $type={type} css="margin:0; color: var(--base-text-color) !important;">
            {message}
          </Paragraph>
        </TextHolder>
      </StyledNotification>
    </>,
    {
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: true,
    },
  );
}

export default Notification;
