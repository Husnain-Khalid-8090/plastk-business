import React, { useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { StoreGroupDetailMock } from '../../../helpers/mockResponse';
import Grid from '../../atoms/Grid';
import DetailsCard from '../../molecules/DetailsCard';
import InfoCard from '../../molecules/InfoCard';
import Pagination from '../../molecules/Pagination';
import Table from '../../molecules/Table';
import StoreService from '../../../services/storeService';

function StoreGroupDetail({ group_id }) {
  const PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { storeGroup_data, storeGroup_loading } = StoreService.GetStoreGroupDetails(group_id);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return storeGroup_data?.stores?.slice(firstPageIndex, lastPageIndex) ?? [];
  }, [currentPage, storeGroup_data]);
  const columnNames = [`Store Name`, `Store ID`, `Address`, `Status`];
  const rowsData = currentTableData.map(item => [
    item.name,
    item.store_id,
    `${item?.address?.street_address ? item?.address?.street_address : '-'}
    ${item?.address?.city ? item?.address?.city : '-'}
    ${item?.address?.state ? item?.address?.state : '-'}`,
    item.status,
  ]);
  return (
    <>
      <DetailsCard primary css="border-radius: 10px 10px 0 0;">
        <Grid xs={1} className="card-row">
          <InfoCard title="Group Name" value={storeGroup_data?.group_name} />
        </Grid>
      </DetailsCard>
      <Table gray rowsData={rowsData} columnNames={columnNames} loading={storeGroup_loading} />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={StoreGroupDetailMock.length}
        pageSize={10}
        onPageChange={page => {
          setCurrentPage(page);
        }}
      />
    </>
  );
}

export default StoreGroupDetail;
