/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import React, { useEffect, useMemo, useContext, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { format } from 'date-fns';
import DataLayout from '../../molecules/DataLayout';
import Pagination from '../../molecules/Pagination';
import FiltersJSX from '../FilterJSX';
import GraphColumn from '../GraphColumn';
import Grid from '../../atoms/Grid';
import Table from '../../molecules/Table';

import IconImg1 from '../../../assets/icons/ico-multiplecard.svg';
import IconImg2 from '../../../assets/icons/ico-point.svg';
import IconImg3 from '../../../assets/icons/ico-warning.svg';
import Loaders from '../../atoms/Loaders';
import PromotionService from '../../../services/promotionsService';
import { getDateObject, POINTS_REDEEMED_VALUE, convertToCurrencyFormat } from '../../../helpers/common';
import { AuthContext } from '../../../context/authContext';

function RevenueTab({ searchQuery, setSearchQuery }) {
  const [activeKey, setActiveKey] = useState('');
  const columnNames = [
    { name: `Date`, sort: true, sortKey: 'created_at' },
    { name: `Store Name`, sort: true, sortKey: 'store_name' },
    { name: `Transaction ID`, sort: false },
    { name: `Amount Spent`, sort: false },
    { name: `Reward Points`, sort: true, sortKey: 'RewardPoints' },
    { name: `Owed to Plastk`, sort: false },
  ];
  const { setLoading } = useContext(AuthContext);
  const { transactions_data, transactions_loading } = PromotionService.GetTransactions(searchQuery);

  const {
    revenueStats_data: { total_transactions, total_reward_points, total_owed_to_plastk, chart_data, group },
    revenueStats_loading,
  } = PromotionService.GetRevenueStats(searchQuery);
  const { transactions, totalItems } = useMemo(
    () => ({
      transactions: transactions_data.transactions.map(item => [
        format(
          getDateObject(item?.transaction_created_at ? item.transaction_created_at : item.created_at),
          'dd/MM/yyyy',
        ),
        item.store_name,
        `${item.ReferenceNumber ?? '----'}`,
        convertToCurrencyFormat(item.TransactionAmount),
        item.bapRewardPoints ? item.bapRewardPoints : 0,
        `${convertToCurrencyFormat((item.bapRewardPoints ? item.bapRewardPoints : 0) * POINTS_REDEEMED_VALUE)}`,
      ]),

      totalItems: transactions_data.totalItems,
    }),
    [transactions_data],
  );

  useEffect(() => {
    if (revenueStats_loading || transactions_loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [revenueStats_loading, transactions_loading]);

  return (
    <>
      <Grid xs={1} lg={3} gap={{ xs: 20 }}>
        <Loaders loading={revenueStats_loading}>
          <GraphColumn
            group={group}
            dateRange={{ startDate: searchQuery.startDate, endDate: searchQuery.endDate }}
            data={chart_data.transactions}
            loading={revenueStats_loading}
            iconImg={<img src={IconImg1} width="22" height="20" alt="img" />}
            title="Total Transactions"
            value={total_transactions ? `${convertToCurrencyFormat(total_transactions)} CAD` : 0}
            columnName="Dollar Amount"
            graphType="transactions"
          />
        </Loaders>
        <Loaders loading={revenueStats_loading}>
          <GraphColumn
            group={group}
            dateRange={{ startDate: searchQuery.startDate, endDate: searchQuery.endDate }}
            data={chart_data.reward_points}
            loading={revenueStats_loading}
            iconImg={<img src={IconImg2} width="40" height="40" alt="img" />}
            title="Rewards Points Summary"
            value={
              total_reward_points
                ? total_reward_points % 1 !== 0
                  ? `${convertToCurrencyFormat(total_reward_points, 2, false)} Plastk Rewards Pts.`
                  : `${convertToCurrencyFormat(total_reward_points, 0, false)} Plastk Rewards Pts.`
                : 0
            }
            columnName="Points"
            graphType="rewards"
          />
        </Loaders>
        <Loaders loading={revenueStats_loading}>
          <GraphColumn
            group={group}
            dateRange={{ startDate: searchQuery.startDate, endDate: searchQuery.endDate }}
            data={chart_data.owed_to_plastk}
            loading={revenueStats_loading}
            iconImg={<img src={IconImg3} width="24" height="24" alt="img" />}
            title="Amount Owed to Plastk"
            value={total_owed_to_plastk ? `${convertToCurrencyFormat(total_owed_to_plastk)} CAD` : 0}
            columnName="Dollar Amount"
            graphType="owed"
          />
        </Loaders>
      </Grid>
      <DataLayout
        title="Transaction List View"
        filters={
          <FiltersJSX
            onFilterChange={__ => {
              delete __.startDate;
              delete __.endDate;
              setSearchQuery(_ => ({ ..._, ...__, page: 1, pageSize: 10 }));
            }}
            setActiveKey={setActiveKey}
          />
        }>
        <Table
          loading={transactions_loading}
          rowsData={transactions}
          columnNames={columnNames}
          itemsPerPage={searchQuery.pageSize}
          onSort={(sortBy, sortOrder) => {
            const newSearchQuery = { ...searchQuery, sortBy, sortOrder };
            setSearchQuery(newSearchQuery);
          }}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
        />
        <Pagination
          className="pagination-bar"
          currentPage={searchQuery.page}
          totalCount={totalItems}
          pageSize={searchQuery.pageSize}
          onPageSizeChange={pageSize => {
            setSearchQuery(_ => ({ ..._, page: 1, pageSize }));
          }}
          onPageChange={page => {
            setSearchQuery(_ => ({ ..._, page }));
          }}
        />
      </DataLayout>
    </>
  );
}

export default RevenueTab;
