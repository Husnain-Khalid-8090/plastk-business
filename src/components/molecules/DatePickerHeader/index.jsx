/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import { HeadHolder, Arrows, Select, SelectHolder } from './DatePickerHeader.styles';

function DatePickerHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  customMaxDateLimit,
}) {
  const years = range(1990, getYear(customMaxDateLimit ?? new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <HeadHolder>
      <Arrows type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <i className="icon-arrow-prev" />
      </Arrows>
      <SelectHolder>
        <Select value={getYear(date)} onChange={({ target: { value } }) => changeYear(value)}>
          {years.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Select value={months[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
          {months.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </SelectHolder>
      <Arrows type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <i className="icon-arrow-next" />
      </Arrows>
    </HeadHolder>
  );
}

export default DatePickerHeader;
