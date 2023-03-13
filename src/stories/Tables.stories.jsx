import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { format } from 'date-fns';
import Table from '../components/molecules/Table';
import Pagination from '../components/molecules/Pagination';
import { TransactionMockRes } from '../helpers/mockResponse';

import GlobalStyles from '../styles/GlobalStyles.styles';
import { convertToCurrencyFormat } from '../helpers/common';

export default {
  title: 'Table',
  component: Table,
};

const columnNames = [`Transaction Date`, `Transaction Status`, `Description`, `Credit`, `Debit`, `Reward`];

const rowsData = TransactionMockRes.map(item => [
  format(new Date(item?.created_at.split('T')[0]))
    .parseZone()
    .format('DD-MM-YYYY'),
  item.SettlementStatus,
  item.Description,
  convertToCurrencyFormat(item.TransactionAmount),
  convertToCurrencyFormat(item.TransactionAmount),
  item.RewardPoints,
]);

const PageSize = 3;

const Template = ({ ...args }) => (
  <>
    <GlobalStyles />
    <Table {...args} />
  </>
);

const TemplateWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return TransactionMockRes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const columnNames2 = [`Transaction Date`, `Transaction Status`, `Description`, `Credit`, `Debit`, `Reward`];
  const rowsData2 = currentTableData.map(item => [
    format(new Date(item?.created_at.split('T')[0]))
      .parseZone()
      .format('DD-MM-YYYY'),
    item.SettlementStatus,
    item.Description,
    convertToCurrencyFormat(item.TransactionAmount),
    convertToCurrencyFormat(item.TransactionAmount),
    item.RewardPoints,
  ]);
  return (
    <>
      <GlobalStyles />
      <div css="position: relative;">
        <Table rowsData={rowsData2} columnNames={columnNames2} />
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={TransactionMockRes.length}
          pageSize={PageSize}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export const tableWithPagination = TemplateWithPagination.bind({});
tableWithPagination.args = {};

export const table = Template.bind({});
table.args = {
  rowsData,
  columnNames,
  height: 250,
};

export const centeredTable = Template.bind({});
centeredTable.args = {
  rowsData,
  columnNames,
  height: 250,
  center: true,
};

export const loadingTable = Template.bind({});
loadingTable.args = {
  rowsData,
  columnNames,
  height: 250,
  loading: true,
};

export const smallTable = Template.bind({});
smallTable.args = {
  rowsData,
  columnNames,
  height: 250,
  sm: true,
};
