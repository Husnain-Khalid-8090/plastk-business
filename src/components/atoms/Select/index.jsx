// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import React from 'react';
import { components } from 'react-select';

import { StyledFormGroup } from '../../../styles/helpers.styles';
import { Error } from '../../molecules/Field/Field.styles';
import { StyledSelect } from './Select.styles';
import InputIcon from '../InputIcon';
import Label from '../Label';

const DropdownIndicator = props =>
  components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <InputIcon css="font-size: var(--font-size-xs);" $suffix>
        <i className="icon-arrow-down1" />
      </InputIcon>
    </components.DropdownIndicator>
  );

function Select({ options, label, noMargin, error, rules, invalid, isMulti, gray, labelIcon, ...props }) {
  return (
    <StyledFormGroup $invalid={invalid || error} noMargin={noMargin}>
      {label && (
        <Label required={rules?.filter(({ required }) => required).length} labelIcon={labelIcon}>
          {label}
        </Label>
      )}
      <StyledSelect
        {...props}
        isMulti={isMulti}
        $gray={gray}
        options={options}
        classNamePrefix="react-select"
        error={error}
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        onChange={_ => {
          props.onChange({ target: { value: _, name: props.name } });
        }}
      />

      {error && (
        <Error id={`${props.name}Error`} role="alert">
          {error}
        </Error>
      )}
    </StyledFormGroup>
  );
}

export default Select;
