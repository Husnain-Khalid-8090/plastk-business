import React, { useContext, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import DataLayout from '../components/molecules/DataLayout';
import Pagination from '../components/molecules/Pagination';
import Table from '../components/molecules/Table';
import FiltersJSX from '../components/organisms/FilterJSX';
import Button from '../components/atoms/Button';
import StoreGroupDetail from '../components/organisms/StoreGroupDetail';
import ModalContainer from '../components/molecules/ModalContainer';
import StoreService from '../services/storeService';
import ConfirmationDialogueModal from '../components/organisms/ConfirmationDialogueModal';
import CreateStoreGroup from '../components/organisms/CreateStoreGroup';
import Toast from '../components/molecules/Toast';
import { AuthContext } from '../context/authContext';
import { no_permission } from '../helpers/common';

function StoreGroups() {
  const [searchQuery, setSearchQuery] = useState({
    searchText: '',
    filterText: 'All',
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: 10,
    sortBy: 'created_at',
    sortOrder: -1,
  });
  const { fetch, refetch, hasPermission } = useContext(AuthContext);
  const [activeKey, setActiveKey] = useState('');
  const { storeGroups_data, storeGroups_loading } = StoreService.GetStoreGroups(searchQuery, fetch);

  const onDeleteStoreGroup = id => {
    StoreService.deleteStoreGroups(id)
      .then(() => {
        refetch();
        Toast({
          type: 'success',
          message: 'Store Group Deleted Successfully',
        });
      })
      .catch(es => {
        Toast({
          type: 'error',
          message: es.message,
        });
      });
  };

  const { store_groups, totalItems } = useMemo(
    () => ({
      store_groups: storeGroups_data.store_groups
        .map(stg => [
          stg.group_name,

          stg.stores.length,
          hasPermission('bap.store-groups.view') ? (
            <ModalContainer
              title="More Details"
              xl
              btnComponent={({ onClick }) => (
                <Button
                  type="light"
                  width={75}
                  xs
                  onClick={() => {
                    onClick();
                  }}>
                  More
                </Button>
              )}
              content={() => <StoreGroupDetail group_id={stg._id} />}
            />
          ) : (
            no_permission
          ),
          stg.status,
          hasPermission('bap.store-groups.update') ? (
            <ModalContainer
              title="Update Store Group"
              xl
              btnComponent={({ onClick }) => (
                <Button unStyled onClick={onClick} disabled={stg.status === 'Active'}>
                  <i className="icon-pencil" />
                </Button>
              )}
              content={({ onClose }) => <CreateStoreGroup onClose={onClose} group={stg} />}
            />
          ) : (
            no_permission
          ),

          hasPermission('bap.store-groups.remove') ? (
            <ModalContainer
              title="Delete Store Group"
              btnComponent={({ onClick }) => (
                <button
                  disabled={stg.status === 'Active'}
                  type="button"
                  onClick={() => {
                    onClick();
                  }}
                  css={`
                    color: ${stg.status === 'Active' ? 'var(--gray)' : 'var(--danger);'};
                  `}>
                  Delete
                </button>
              )}
              content={({ onClose }) => (
                <ConfirmationDialogueModal
                  onClose={onClose}
                  text="You are about to delete a store group. Would you like to continue?"
                  btn={
                    <Button type="danger" onClick={() => onDeleteStoreGroup(stg._id)}>
                      Delete
                    </Button>
                  }
                />
              )}
            />
          ) : (
            no_permission
          ),
        ])
        .reduce((prev, curr) => {
          prev.push(curr.filter(item => item !== no_permission));
          return prev;
        }, []),
      totalItems: storeGroups_data.totalItems,
    }),
    [storeGroups_data],
  );

  const columnNames = [
    { name: `Group Name`, sort: true, sortKey: 'group_name' },
    { name: `Store Count`, sort: false },
    { name: `Details`, sort: false, permission: hasPermission('bap.store-groups.view') },
    { name: `Status`, sort: false },
    { name: `Edit`, sort: false, permission: hasPermission('bap.store-groups.update') },
    { name: `Action`, sort: false, permission: hasPermission('bap.store-groups.remove') },
  ];

  return (
    <>
      <DataLayout
        title="Store Groups"
        filters={
          <FiltersJSX
            onFilterChange={__ => {
              setSearchQuery(_ => ({
                ..._,
                ...__,
                page: 1,
                pageSize: 10,
                filterText: __.filterText !== 'All' ? __.filterText : '',
              }));
            }}
            setActiveKey={setActiveKey}
          />
        }>
        <Table
          rowsData={store_groups}
          columnNames={columnNames}
          loading={storeGroups_loading}
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
          onPageChange={page => {
            setSearchQuery(_ => ({ ..._, page }));
          }}
          onPageSizeChange={pageSize => {
            setSearchQuery(_ => ({ ..._, pageSize, page: 1 }));
          }}
        />
      </DataLayout>
    </>
  );
}

export default StoreGroups;
