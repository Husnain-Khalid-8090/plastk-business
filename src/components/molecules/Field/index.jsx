import React, { forwardRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { StyledFormGroup } from '../../../styles/helpers.styles';
import { Error, InputHolder } from './Field.styles';

import Label from '../../atoms/Label';
import Input from '../../atoms/Input';
import InputIcon from '../../atoms/InputIcon';
import FakeLabel from '../../atoms/FakeLabel';
import FakeInput from '../../atoms/FakeInput';
import DatePicker from '../DatePicker';
import ChooseFile from '../../atoms/ChooseFile';

const defaultProps = {
  type: 'text',
};

const Field = forwardRef(
  (
    {
      rules,
      error,
      name,
      invalid,
      label,
      type,
      prefix,
      suffix,
      rounded,
      noMargin,
      margin,
      button,
      searchField,
      onlyRead,
      labelIcon,
      disabled,
      width,
      gray,
      customMaxDateLimit,
      ...props
    },
    ref,
  ) => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const inputProps = {
      id: props.id ?? name,
      name,
      type,
      invalid,
      'aria-describedby': `${name}Error`,
      label,
      ...props,
    };
    const renderInputFirst = type === 'checkbox' || type === 'radio';
    return (
      <StyledFormGroup
        $invalid={invalid || error}
        noMargin={noMargin}
        css={`
          margin-bottom: ${margin};
        `}>
        {renderInputFirst && label && (
          <Label
            htmlFor={inputProps.id}
            labelIcon={labelIcon}
            onlyRead={onlyRead}
            css="display: flex !important; align-items:center; margin-bottom:0 !important;">
            <Input
              {...inputProps}
              name={name}
              ref={ref}
              disabled={disabled}
              $invalid={invalid || error}
              checked={inputProps?.value}
              // eslint-disable-next-line no-shadow
              onChange={({ target: { name, checked } }) => inputProps?.onChange?.({ target: { name, value: checked } })}
            />
            <FakeInput>{type === 'checkbox' && <i className="icon-check icon-tick" />}</FakeInput>
            <FakeLabel required={rules?.filter(({ required }) => required).length}>{label}</FakeLabel>
          </Label>
        )}

        {renderInputFirst || (
          <>
            {label && (
              <Label
                labelIcon={labelIcon}
                htmlFor={inputProps.id}
                required={rules?.filter(({ required }) => required).length}>
                {label}
              </Label>
            )}
            <InputHolder $searchField={searchField} $width={width}>
              {/* input left icon */}
              {prefix && (
                <InputIcon
                  disabled={disabled}
                  as={type === 'search' && 'button'}
                  type={type === 'search' ? 'button' : undefined}
                  prefix={prefix}
                  invalid={invalid || error}
                  css={type === 'search' && 'color: var(--primary)'}>
                  {prefix}
                </InputIcon>
              )}
              {/* password field */}
              {type === 'password' ? (
                <>
                  <Input
                    ref={ref}
                    {...inputProps}
                    name={name}
                    $prefix={prefix}
                    $suffix={suffix}
                    $invalid={invalid || error}
                    type={isRevealPwd ? 'text' : 'password'}
                    $rounded={rounded}
                    disabled={disabled}
                    $button={button && true}
                    autoComplete="on"
                    $gray={gray}
                  />
                  <InputIcon
                    disabled={disabled}
                    suffix
                    css="cursor: pointer"
                    onClick={() => setIsRevealPwd(prevState => !prevState)}>
                    {/* {isRevealPwd ? <span className="icon-eye-open" /> : <span className="icon-eye-close" />} */}
                  </InputIcon>
                </>
              ) : type === 'datepicker' ? (
                <DatePicker {...inputProps} $gray={gray} prefix={prefix} customMaxDateLimit={customMaxDateLimit} />
              ) : type === 'chooseFile' ? (
                <ChooseFile {...inputProps} />
              ) : (
                <>
                  {/* any other input type */}
                  <Input
                    ref={ref}
                    {...inputProps}
                    name={name}
                    $prefix={prefix}
                    disabled={disabled}
                    $suffix={suffix}
                    $invalid={invalid || error}
                    $rounded={rounded}
                    $button={button && true}
                    $gray={gray}
                  />
                </>
              )}
              {/* input right icon */}
              {suffix && (
                <InputIcon suffix={suffix} disabled={disabled} invalid={invalid || error}>
                  {suffix}
                </InputIcon>
              )}
              {button ?? null}
            </InputHolder>
          </>
        )}
        {invalid ||
          (error && (
            <Error id={`${name}Error`} role="alert">
              {error}
            </Error>
          ))}
      </StyledFormGroup>
    );
  },
);

Field.defaultProps = defaultProps;

export default Field;
