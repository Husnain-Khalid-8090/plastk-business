import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Button from '../../atoms/Button';

import { TextHolder, BtnHolder } from './ConfirmationDialogueModal.style';

function ConfirmationDialogueModal({ text, btn, onClose, hideCancel }) {
  return (
    <>
      <TextHolder>
        <p>{text}</p>
        <BtnHolder>
          {!hideCancel && (
            <Button type="light" css="width: 48.5%;" onClick={() => onClose()}>
              Cancel
            </Button>
          )}
          <div css="width: 48.5%;">{btn}</div>
        </BtnHolder>
      </TextHolder>
    </>
  );
}

export default ConfirmationDialogueModal;
