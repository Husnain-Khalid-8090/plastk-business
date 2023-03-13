import React from 'react';

import { StyledSwitch, SwitchLabel, SwitchHolder, LabelHolder } from './Switch.styles';

function Switch({ label, name, noMargin, ...props }) {
  const switchProps = {
    id: name,
    name,
    ...props,
  };
  return (
    <>
      <SwitchHolder noMargin={noMargin}>
        <StyledSwitch type="checkbox" {...switchProps} />
        <SwitchLabel htmlFor={switchProps.id}>
          {label && <LabelHolder>{label}</LabelHolder>}
          <span />
        </SwitchLabel>
      </SwitchHolder>
    </>
  );
}

export default Switch;
