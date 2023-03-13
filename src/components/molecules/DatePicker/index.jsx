/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import DatePickerHeader from '../DatePickerHeader';
import { StyledDatePicker } from './DatePicker.styles';

function ReactDateRange({ prefix, suffix, disabled, invalid, error, placeholder, customMaxDateLimit, ...props }) {
  return (
    <StyledDatePicker
      placeholderText={placeholder}
      disabled={disabled}
      prefix={prefix}
      suffix={suffix}
      invalid={invalid || error}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <DatePickerHeader
          date={date}
          changeYear={changeYear}
          changeMonth={changeMonth}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
          prevMonthButtonDisabled={prevMonthButtonDisabled}
          nextMonthButtonDisabled={nextMonthButtonDisabled}
          customMaxDateLimit={customMaxDateLimit}
        />
      )}
      {...props}
    />
  );
}

export default ReactDateRange;
