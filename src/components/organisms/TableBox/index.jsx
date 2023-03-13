import { format } from 'date-fns';
import React, { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { getDateObject, convertToCurrencyFormat } from '../../../helpers/common';
import Table from '../../molecules/Table';
import { TableWrap } from './TableBox.style';

function TableBox({ data, total_transactions, column, graphType, group }) {
  const columnNames = [`Date`, `${column}`];
  const { transactions } = useMemo(
    () => ({
      transactions: data.map(item => [
        format(
          getDateObject(item.date_key),
          group === 'day' ? '  MMM ,dd,yyyy - h a ' : group === 'year' ? 'MMM ,yyyy' : 'MMM ,dd,yyyy',
        ),
        ['conversions', 'clicks', 'impressions'].includes(graphType.toLowerCase()) || column === 'Points'
          ? `${
              parseFloat(item?.amount) % 1 !== 0
                ? convertToCurrencyFormat(item?.amount, 2, false)
                : convertToCurrencyFormat(item?.amount, 0, false)
            }`
          : `${
              parseFloat(item?.amount) % 1 !== 0
                ? convertToCurrencyFormat(item?.amount)
                : convertToCurrencyFormat(item?.amount, 0)
            }`,
      ]),
    }),
    [data],
  );
  return (
    <>
      <TableWrap>
        <Table
          graphType={graphType}
          extraSmall
          columnNames={columnNames}
          rowsData={total_transactions ? transactions : null}
        />
      </TableWrap>
    </>
  );
}

export default TableBox;
