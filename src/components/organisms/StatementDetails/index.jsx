import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { convertToCurrencyFormat, getDateObject } from '../../../helpers/common';
import Grid from '../../atoms/Grid';
import DetailsCard from '../../molecules/DetailsCard';
import InfoCard from '../../molecules/InfoCard';
import Table from '../../molecules/Table';

const StatementDetails = ({ item }) => {
  const {
    statement_date,
    statement_due_date,
    payment_date,
    status,
    unresolved_amount,
    invoice_period_start,
    invoice_period_end,
    total_amount_in_dollers,
    payments,
  } = item;
  const { payments_data } = useMemo(
    () => ({
      payments_data: payments?.map(itm => [
        format(getDateObject(itm.created_at), 'yyyy-MM-dd'),
        itm?.type,
        convertToCurrencyFormat(itm?.amount),
      ]),
    }),
    [payments],
  );
  const payment_columns = ['Date', 'Payment Type', 'Amount'];
  return (
    <>
      <DetailsCard>
        <Grid xs={1} sm={3} className="card-row">
          <InfoCard
            title="Statement Date"
            value={format(getDateObject(new Date(statement_date).toString()), 'yyyy-MM-dd ')}
          />
          <InfoCard
            title="Statement Due Date"
            value={format(getDateObject(new Date(statement_due_date).toString()), 'yyyy-MM-dd ') ?? '--'}
          />
          <InfoCard
            title="Invoice Period Start"
            value={format(getDateObject(new Date(invoice_period_start).toString()), 'yyyy-MM-dd ') ?? '--'}
          />
          <InfoCard
            title="Invoice Period End"
            value={format(getDateObject(new Date(invoice_period_end).toString()), 'yyyy-MM-dd ') ?? '--'}
          />

          <InfoCard title="Status" value={status} />
          <InfoCard title="Total Amount" value={convertToCurrencyFormat(total_amount_in_dollers)} />

          <InfoCard
            title="Payment Date"
            value={payment_date ? format(getDateObject(new Date(payment_date).toString()), 'yyyy-MM-dd ') : '--'}
          />
          {!!unresolved_amount && (
            <InfoCard title="Amount Remaining" value={convertToCurrencyFormat(unresolved_amount) ?? 0} />
          )}
        </Grid>
      </DetailsCard>
      <Table
        loading={false}
        rowsData={payments_data}
        columnNames={payment_columns}
        itemsPerPage={payments_data?.length}
        recordBtn={false}
      />
    </>
  );
};

export default StatementDetails;
