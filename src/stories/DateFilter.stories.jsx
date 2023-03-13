import React, { useState } from 'react';
import Field from '../components/molecules/Field';

import GlobalStyles from '../styles/GlobalStyles.styles';

export default {
  title: 'DateRangeFilter',
  component: Field,
};

const Template = ({ ...args }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <GlobalStyles />
      <Field
        type="datepicker"
        name="start_date"
        placeholder="Start Date"
        selected={startDate}
        onChange={date => setStartDate(date)}
        suffix={<i className="icon-calendar" />}
        sm
        noMargin
        {...args}
      />
      <Field
        type="datepicker"
        name="end_date"
        placeholder="End Date"
        selected={startDate}
        onChange={date => setStartDate(date)}
        suffix={<i className="icon-calendar" />}
        sm
        noMargin
        {...args}
      />
    </>
  );
};

export const dateFilter = Template.bind({});
dateFilter.args = {};
