import React, { useMemo, useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import DataLayout from '../components/molecules/DataLayout';
import Pagination from '../components/molecules/Pagination';
import Table from '../components/molecules/Table';
import FiltersJSX from '../components/organisms/FilterJSX';
import Button from '../components/atoms/Button';
import ModalContainer from '../components/molecules/ModalContainer';
import UserService from '../services/userService';
import ConfirmationDialogueModal from '../components/organisms/ConfirmationDialogueModal';
import Toast from '../components/molecules/Toast';
import AddStoreManager from '../components/organisms/AddStoreManager';

import { AuthContext } from '../context/authContext';
import { no_permission } from '../helpers/common';
import AssignedStores from '../components/organisms/AssignedStores';

function StoreManagers() {
  const [searchQuery, setSearchQuery] = useState({
    searchText: '',
    filterText: '',
    startDate: '',
    endDate: '',
    page: 1,
    pageSize: 10,
    sortBy: 'created_at',
    sortOrder: -1,
  });
  const [activeKey, setActiveKey] = useState('');
  const { fetch, refetch, hasPermission } = useContext(AuthContext);
  const { user_data, user_loading } = UserService.GetStoreUsers(searchQuery, fetch);
  const onDeleteStoreManager = id => {
    UserService.deletStoreUser(id)
      .then(() => {
        refetch();
        Toast({
          type: 'success',
          message: 'Store manager Disabled Successfully',
        });
      })
      .catch(es => {
        Toast({
          type: 'error',
          message: es.message,
        });
      });
  };
  const { store_users, totalItems } = useMemo(
    () => ({
      store_users: user_data.store_users
        .map(item => [
          <span
            css={`
              color: ${item.is_deleted && 'var(--gray)'};
            `}>
            {item.first_name}
          </span>,
          <span
            css={`
              color: ${item.is_deleted && 'var(--gray)'};
            `}>
            {item.middle_name ? item.middle_name : '---'}
          </span>,
          <span
            css={`
              color: ${item.is_deleted && 'var(--gray)'};
            `}>
            {item.last_name}
          </span>,
          <span
            css={`
              color: ${item.is_deleted && 'var(--gray)'};
            `}>
            {item?.login_info?.email}
          </span>,
          item?.all_stores_selected ? (
            'All'
          ) : (
            <ModalContainer
              title="Assigned Stores"
              width="700px"
              btnComponent={({ onClick }) => (
                <Button
                  type="light"
                  width={75}
                  disabled={item.is_deleted}
                  xs
                  onClick={() => {
                    onClick();
                  }}>
                  More
                </Button>
              )}
              content={() => <AssignedStores stores={item?.store_details} />}
            />
          ),

          <span
            css={`
              color: ${item.is_deleted && 'var(--gray)'};
            `}>
            {item?.permission ?? '---'}
          </span>,
          hasPermission('bap.store-managers.edit') ? (
            <ModalContainer
              title="Update Store Manager"
              xl
              btnComponent={({ onClick }) => (
                <button
                  type="button"
                  onClick={onClick}
                  disabled={item.is_deleted}
                  css={`
                    color: ${item.is_deleted && 'var(--gray)'};
                    cursor: ${item.is_deleted && 'text'};
                  `}>
                  <i className="icon-pencil" />
                </button>
              )}
              content={({ onClose }) => <AddStoreManager onClose={onClose} manager={item} />}
            />
          ) : (
            no_permission
          ),
          hasPermission('bap.store-managers.disable') ? (
            <ModalContainer
              title="Disable Store Manager"
              btnComponent={({ onClick }) => (
                <button
                  type="button"
                  onClick={() => {
                    onClick();
                  }}
                  disabled={item.is_deleted}
                  css={`
                    color: ${item.is_deleted ? 'var(--gray)' : 'var(--danger);'};
                    cursor: ${item.is_deleted && 'text'};
                  `}>
                  Disable
                </button>
              )}
              content={({ onClose }) => (
                <ConfirmationDialogueModal
                  onClose={onClose}
                  text="You are about to disable a store manager. Would you like to continue?"
                  btn={
                    <Button type="danger" onClick={() => onDeleteStoreManager(item._id)}>
                      Confirm
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
      totalItems: user_data.totalItems,
    }),
    [user_data],
  );
  const columnNames = [
    { name: `First Name`, sort: true, sortKey: 'first_name' },
    { name: `Middle Name`, sort: true, sortKey: 'middle_name' },
    { name: `Last Name`, sort: true, sortKey: 'last_name' },
    { name: `Email`, sort: false },
    { name: `Stores`, sort: false },
    { name: `Permission`, sort: false },
    { name: `Edit`, sort: false, permission: hasPermission('bap.store-managers.edit') },
    { name: `Action`, sort: false, permission: hasPermission('bap.store-managers.disable') },
  ];
  return (
    <>
      <DataLayout
        title="Store Managers"
        filters={
          <FiltersJSX
            onFilterChange={__ => {
              setSearchQuery(_ => ({
                ..._,
                ...__,
                page: 1,
                pageSize: 10,
              }));
            }}
            setActiveKey={setActiveKey}
          />
        }>
        <Table
          rowsData={store_users}
          columnNames={columnNames}
          loading={user_loading}
          itemsPerPage={searchQuery.pageSize}
          onSort={(sortBy, sortOrder) => {
            setSearchQuery(_ => ({ ..._, sortBy, sortOrder }));
          }}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
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

export default StoreManagers;
