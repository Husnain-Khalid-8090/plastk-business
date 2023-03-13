/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { format } from 'date-fns';
import DataLayout from '../components/molecules/DataLayout';
import FiltersJSX from '../components/organisms/FilterJSX';
import Pagination from '../components/molecules/Pagination';
import Table from '../components/molecules/Table';
import UserService from '../services/userService';
import { no_permission, getDateObject, convertToCurrencyFormat } from '../helpers/common';

const PaymentHistory = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeKey, setActiveKey] = useState('');
  const [searchQuery, setSearchQuery] = useState({
    searchText: '',
    sortBy: 'created_at',
    sortOrder: -1,
    page: 1,
    pageSize: 10,
    filterText: '',
  });

  const { history_data, history_loading } = UserService.GetPaymentHistory(searchQuery);

  const { payment_history, totalItems } = useMemo(
    () => ({
      payment_history: history_data?.records?.items
        ?.map(item => [
          format(getDateObject(item.created_at), 'yyyy-MM-dd'),
          convertToCurrencyFormat(item.amount),
          item?.linking_id ? item?.linking_id : item.reference_number,
          item.type,
          convertToCurrencyFormat(item.previous_balance),
          convertToCurrencyFormat(item.active_balance),
        ])
        .reduce((prev, curr) => {
          prev.push(curr.filter(item => item !== no_permission));
          return prev;
        }, []),
      totalItems: history_data?.records?.totalItems,
    }),
    [history_data],
  );

  const columnNames = [
    { name: 'Date', sort: true, sortKey: 'created_at' },
    { name: 'Amount' },
    { name: 'Reference Number' },
    { name: 'Transaction Type' },
    { name: 'Previous Balance' },
    { name: 'Active Balance' },
  ];

  return (
    <DataLayout
      title="Payment History"
      // filters={
      //   <FiltersJSX
      //     onFilterChange={({ searchText = '', sortOrder, sortBy, filterText }) => {
      //       setCurrentPage(() => 1);
      //       setSearchQuery(() => ({
      //         searchText,
      //         sortBy,
      //         sortOrder,
      //         filterText,
      //       }));
      //     }}
      //     setActiveKey={setActiveKey}
      //   />
      // }
    >
      <Table
        loading={history_loading}
        rowsData={payment_history}
        columnNames={columnNames}
        itemsPerPage={pageSize}
        onSort={(sortBy, sortOrder) => {
          setSearchQuery(_ => ({ ..._, sortBy, sortOrder }));
        }}
        setActiveKey={setActiveKey}
        activeKey={activeKey}
      />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalItems ?? 0}
        pageSize={pageSize}
        onPageChange={page => {
          setCurrentPage(page);
        }}
        onPageSizeChange={e => setPageSize(e)}
      />
    </DataLayout>
  );
};

export default PaymentHistory;
