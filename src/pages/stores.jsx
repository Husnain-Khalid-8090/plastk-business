/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { useMemo, useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import DataLayout from '../components/molecules/DataLayout';
import Pagination from '../components/molecules/Pagination';
import Table from '../components/molecules/Table';
import FiltersJSX from '../components/organisms/FilterJSX';
import Button from '../components/atoms/Button';
import ModalContainer from '../components/molecules/ModalContainer';
import StoreDetail from '../components/organisms/StoreDetail';
import StoreVerificationModal from '../components/organisms/StoreVerification';
import StoreService from '../services/storeService';
import ConfirmationDialogueModal from '../components/organisms/ConfirmationDialogueModal';
import Toast from '../components/molecules/Toast';
import { AuthContext } from '../context/authContext';
import AddStoreModal from '../components/organisms/AddStoreModal';
import MenuModal from '../components/organisms/MenuModal';
import { capitalize, no_permission } from '../helpers/common';
import Tooltip from '../components/atoms/Tooltip';
import StoreCloseReason from '../components/organisms/StoreCloseReason';

const VerificationIcon = styled.div`
  font-size: 28px;
  color: var(--primary);
`;

function Stores() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeKey, setActiveKey] = useState('');
  const [searchQuery, setSearchQuery] = useState({
    searchText: '',
    filterText: '',
    sortBy: 'created_at',
    sortOrder: -1,
  });
  const { fetch, refetch, hasPermission } = useContext(AuthContext);
  const onDeactivateStore = id => {
    StoreService.deActivateStore(id)
      .then(res => {
        Toast({
          type: 'success',
          message: res.message,
        });
        refetch();
      })
      .catch(es => {
        Toast({
          type: 'error',
          message: es.message,
        });
      });
  };
  const onReactivateStore = id => {
    StoreService.activateStore(id)
      .then(res => {
        Toast({
          type: 'success',
          message: res.message,
        });
        refetch();
      })
      .catch(es => {
        Toast({
          type: 'error',
          message: es.message,
        });
      });
  };
  const { stores_data, stores_loading } = StoreService.GetStores(currentPage, pageSize, searchQuery, fetch);
  const { stores, totalItems } = useMemo(
    () => ({
      stores: stores_data?.data?.items
        ?.map(item => [
          item?.is_default ? (
            <span css="position:relative;">
              <Tooltip title="Default Store">
                <span className="material-icons-outlined" css="position:absolute;left:-36px;">
                  store
                </span>
              </Tooltip>
              {item.name}
            </span>
          ) : (
            item.name
          ),
          item.address?.street_address ?? '---',
          item?.is_verified ? (
            <VerificationIcon>
              <i className="icon-tick-circle" />
            </VerificationIcon>
          ) : hasPermission('bap.stores.verify') ? (
            <ModalContainer
              title="Enter Your Auth Code"
              btnComponent={({ onClick }) => (
                <Button
                  type="light"
                  width={75}
                  disabled={item?.status === 'Closed'}
                  xs
                  onClick={() => {
                    onClick();
                  }}>
                  Verify
                </Button>
              )}
              content={({ onClose }) => <StoreVerificationModal id={item._id} onClose={onClose} />}
            />
          ) : (
            'Not Verified'
          ),
          item.status === 'Closed' ? (
            <span
              css={`
                color: var(--danger);
              `}>
              {item.status}
            </span>
          ) : (
            item.status
          ),
          item?.store_type ? capitalize(item.store_type === 'online' ? item?.store_type : 'In Store') : 'In Store',
          hasPermission('bap.stores.details') ? (
            <ModalContainer
              title=""
              xl
              btnComponent={({ onClick }) => (
                <Button
                  type="link"
                  width={75}
                  sm
                  onClick={() => {
                    onClick();
                  }}>
                  More
                </Button>
              )}
              content={() => <StoreDetail details={item} />}
            />
          ) : (
            no_permission
          ),
          hasPermission('bap.stores.menu') ? (
            <ModalContainer
              onModalClose={() => {
                refetch();
              }}
              width={800}
              btnComponent={({ onClick }) => (
                <Button unStyled onClick={onClick} disabled={item?.status === 'Closed' || item?.campaign?.length}>
                  <span css={item.menu?.menu_url ? 'color: green' : 'color: black'}>Menu</span>
                </Button>
              )}
              content={() => <MenuModal store={item} />}
            />
          ) : (
            no_permission
          ),
          hasPermission() ? (
            <ModalContainer
              title="Update Store"
              xl
              btnComponent={({ onClick }) => (
                <Button
                  unStyled
                  onClick={() => {
                    onClick();
                  }}
                  disabled={item?.status === 'Closed' || item?.campaign?.length}>
                  <i className="icon-pencil" />
                </Button>
              )}
              content={({ onClose }) => <AddStoreModal onClose={onClose} store={item} />}
            />
          ) : (
            no_permission
          ),
          hasPermission('bap.stores.actions') ? (
            <ModalContainer
              title={item?.status === 'Active' ? 'Deactivate Store' : 'Reactivate Store'}
              btnComponent={({ onClick }) => (
                <button
                  type="button"
                  disabled={item.status === 'Pending' || item.status === 'Closed'}
                  onClick={() => {
                    onClick();
                  }}
                  css={
                    item?.status === 'Active'
                      ? 'color: var(--danger);'
                      : item?.status === 'Closed'
                      ? 'color:rgba(16, 16, 16, 0.3);'
                      : 'color: #296771;'
                  }>
                  {item?.status === 'Pending' ? '---' : item?.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                </button>
              )}
              content={({ onClose }) =>
                item?.status === 'Pending' ? null : item?.status === 'Active' ? (
                  <ConfirmationDialogueModal
                    onClose={onClose}
                    text="You are about to deactivate a store. Would you like to continue?"
                    btn={
                      <Button
                        type="danger"
                        onClick={() => {
                          onDeactivateStore(item._id);
                          onClose();
                        }}>
                        Deactivate
                      </Button>
                    }
                  />
                ) : (
                  <ConfirmationDialogueModal
                    onClose={onClose}
                    text="You are about to reactivate a store. Would you like to continue?"
                    btn={
                      <Button
                        type="reactivate"
                        onClick={() => {
                          onReactivateStore(item._id);
                        }}>
                        Reactivate
                      </Button>
                    }
                  />
                )
              }
            />
          ) : (
            no_permission
          ),
          hasPermission('bap.stores.actions') && item?.status === 'Pending' ? (
            '---'
          ) : hasPermission('bap.stores.actions') ? (
            <ModalContainer
              title="Close Store"
              btnComponent={({ onClick }) => (
                <button
                  type="button"
                  disabled={item?.status === 'Closed'}
                  onClick={() => {
                    onClick();
                  }}
                  css={item?.status === 'Closed' ? 'color:rgba(16, 16, 16, 0.3);' : 'color: var(--danger);'}>
                  Close Store
                </button>
              )}
              content={({ onClose }) => <StoreCloseReason onClose={onClose} id={item?._id} />}
            />
          ) : (
            no_permission
          ),
        ])
        .reduce((prev, curr) => {
          prev.push(curr.filter(item => item !== 'no_permission'));
          return prev;
        }, []),
      totalItems: stores_data?.data?.totalItems ?? 0,
    }),
    [stores_data],
  );
  const columnNames = [
    { name: `Store Names`, sort: true, sortKey: 'name' },
    { name: `Store Address`, sort: true, sortKey: 'address.street_address' },
    { name: `Verification`, sort: false },
    { name: `Status`, sort: false },
    { name: `Type`, sort: false },
    { name: `Details`, sort: false, permission: hasPermission('bap.stores.details') },
    { name: `Menu`, sort: false, permission: hasPermission('bap.stores.menu') },
    { name: `Edit`, sort: false, permission: hasPermission('bap.stores.edit') },
    { name: `Action`, sort: false, permission: hasPermission('bap.stores.actions') },
    { name: `Close Store`, sort: false, permission: hasPermission('bap.stores.actions') },
  ];
  const handleStoreType = val => {
    switch (val) {
      case 'Online':
        return 'online';

      case 'In Store':
        return 'in_store';
      default:
        return '';
    }
  };
  return (
    <>
      <DataLayout
        title="All Stores"
        filters={
          <FiltersJSX
            onFilterChange={({ searchText = '', filterText = '', sortOrder, sortBy, store_type }) => {
              setCurrentPage(() => 1);
              setSearchQuery(() => ({
                searchText,
                filterText,
                sortBy,
                sortOrder,
                store_type: handleStoreType(store_type),
              }));
            }}
            setActiveKey={setActiveKey}
          />
        }>
        <Table
          loading={stores_loading}
          rowsData={stores}
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
          totalCount={totalItems}
          pageSize={pageSize}
          onPageChange={page => {
            setCurrentPage(page);
          }}
          onPageSizeChange={e => setPageSize(e)}
        />
      </DataLayout>
    </>
  );
}

export default Stores;
