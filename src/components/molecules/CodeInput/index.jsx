import React, { useEffect, useState } from 'react';

import { CodeInputHolder } from './CodeInput.styles';
import OtpInput from '../../atoms/OtpInput';
import Label from '../../atoms/Label';
import { Error } from '../Field/Field.styles';
import { StyledFormGroup } from '../../../styles/helpers.styles';

function ReactCodeInput({ sm, error, name, label, value, onChange, forceClear, setForceClear, ...props }) {
  const [v, setV] = useState(value);
  useEffect(() => {
    if (forceClear) {
      setV('');
      setForceClear(false);
    } else if (value || v) {
      onChange({ target: { name, value: v } });
    }
  }, [v, forceClear]);
  return (
    <StyledFormGroup>
      <Label>{label}</Label>
      <CodeInputHolder sm={sm}>
        <OtpInput
          sm={sm}
          isInputNum
          hasErrored={error}
          errorStyle={{ borderColor: 'var(--danger)' }}
          value={v}
          onChange={setV}
          {...props}
        />
      </CodeInputHolder>
      {error && (
        <Error id={`${name}Error`} role="alert">
          {error}
          <span> Varification code is required</span>
        </Error>
      )}
    </StyledFormGroup>
  );
}

export default ReactCodeInput;
