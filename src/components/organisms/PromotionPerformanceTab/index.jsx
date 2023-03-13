/* eslint-disable no-param-reassign */
import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Grid from '../../atoms/Grid';
import DetailsCard from '../../molecules/DetailsCard';
import InfoCard from '../../molecules/InfoCard';
import Table from '../../molecules/Table';
import PromotionService from '../../../services/promotionsService';

import { ContentHolder, Header, Heading } from './PromotionPerformanceTab.styles';
import Pagination from '../../molecules/Pagination';
import Loaders from '../../atoms/Loaders';
import { convertToCurrencyFormat, promotionOfferTypeConverter, shortenString } from '../../../helpers/common';
// eslint-disable-next-line import/no-named-as-default
import TableRow from '../../atoms/TableRow';
import TableCell from '../../atoms/TableCell';

function PromotionPerformanceTab({ promotion }) {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });
  const { stores_data, stores_loading } = PromotionService.GetStorePerformance(promotion._id);
  const { total_transactions, total_transaction_amount, total_reward_points, total_owed_to_plastk } = useMemo(
    () =>
      stores_data.reduce(
        (_, __) => {
          _.total_transactions += __.transactions;
          _.total_transaction_amount += __.transactions_amount;
          _.total_reward_points += __.reward_points;
          _.total_owed_to_plastk += __.owed_to_plastk;
          return _;
        },

        { total_transactions: 0, total_transaction_amount: 0, total_reward_points: 0, total_owed_to_plastk: 0 },
      ),

    [stores_data],
  );
  const stores = useMemo(
    () =>
      // impliment pagination
      stores_data
        .slice((pagination.page - 1) * pagination.pageSize, pagination.page * pagination.pageSize)
        .map(_ => [
          shortenString(_.name, 15),
          _.transactions,
          convertToCurrencyFormat(Number(_.transactions_amount)),
          _.reward_points,
          convertToCurrencyFormat(Number(_.owed_to_plastk)),
        ]),
    [stores_data, pagination],
  );
  const columnNames = [`Store Name`, `Transactions`, `Transactions Amount`, `Rewards Points`, `Owed To Plastk`];
  return (
    <Loaders loading={stores_loading}>
      <ContentHolder>
        <DetailsCard>
          <Grid xs={1} sm={3} className="card-row">
            <InfoCard sm title="Promotion Name" value={promotion.name} />
            <InfoCard title="Status" value={promotion.status} />
            <InfoCard title="Offer Type" value={promotionOfferTypeConverter(promotion.offer_type)} />
          </Grid>
          <Grid xs={1} sm={3} className="card-row">
            <InfoCard title="Impressions" value={promotion.impressions} />
            <InfoCard title="Clicks" value={promotion.clicks} />
            <InfoCard title="Conversions" value={promotion.conversions} />
          </Grid>
        </DetailsCard>
      </ContentHolder>
      <ContentHolder>
        <Header>
          <Heading>Promotion Performance Information</Heading>
        </Header>

        <Table
          rowsData={stores}
          loading={stores_loading}
          columnNames={columnNames}
          itemsPerPage={stores.length}
          hasBg
          customTopRows={[
            <TableRow
              css={`
                background-color: #f6f8fa;
              `}>
              <TableCell>Summary</TableCell>
              <TableCell>{total_transactions}</TableCell>
              <TableCell>{convertToCurrencyFormat(total_transaction_amount)}</TableCell>
              <TableCell>{total_reward_points}</TableCell>
              <TableCell>{convertToCurrencyFormat(total_owed_to_plastk)}</TableCell>
            </TableRow>,
          ]}
        />
        <Pagination
          className="pagination-bar"
          totalCount={stores_data.length}
          pageSize={pagination.pageSize}
          currentPage={pagination.page}
          onPageChange={page => setPagination(_ => ({ ..._, page }))}
          onPageSizeChange={pageSize => setPagination(_ => ({ ..._, pageSize, page: 1 }))}
        />
      </ContentHolder>
    </Loaders>
  );
}

export default PromotionPerformanceTab;
