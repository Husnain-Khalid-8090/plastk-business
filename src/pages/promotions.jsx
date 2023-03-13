/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { format } from 'date-fns';
import React, { useContext, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Button from '../components/atoms/Button';

import DataLayout from '../components/molecules/DataLayout';
import ModalContainer from '../components/molecules/ModalContainer';
import Pagination from '../components/molecules/Pagination';
import Table from '../components/molecules/Table';
import Toast from '../components/molecules/Toast';
import ConfirmationDialogueModal from '../components/organisms/ConfirmationDialogueModal';
import FiltersJSX from '../components/organisms/FilterJSX';
import PromotionMenuModal from '../components/organisms/PromotionMenuModal';
// import Prototype from '../components/organisms/prototype/prototype';
import { AuthContext } from '../context/authContext';
import { filterStatus, getDateObject, promotionOfferTypeConverter } from '../helpers/common';
import PromotionService from '../services/promotionsService';

function Promotions() {
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
  const [totalCompletedCount, setTotalCompletedCount] = useState(0);
  const { fetch, refetch } = useContext(AuthContext);
  const { promotions_data, promotions_loading } = PromotionService.GetPromotions(searchQuery, fetch);
  const [activeKey, setActiveKey] = useState('');
  const columnNames = [
    { name: `Promotion Name`, sort: true, sortKey: 'name' },
    { name: `Start Date`, sort: true, sortKey: 'duration.startDate' },
    { name: `End Date`, sort: true, sortKey: 'duration.endDate' },
    { name: `Status`, sort: false },
    { name: `Offer Type`, sort: false },

    { name: `Impressions`, sort: false },
    { name: `Clicks`, sort: false },
    { name: `Conversions`, sort: false },
    { name: `Activate Promotion`, sort: false },
  ];

  const onActivatePromotion = async (id, onClose) => {
    try {
      const res = await PromotionService.activatePromotion(id);
      Toast({ type: 'success', message: res?.message });
      onClose();
      refetch();
    } catch (error) {
      Toast({
        type: 'error',
        message: error?.message ?? 'Something went wrong',
      });
      onClose();
    }
  };
  const handleCompletedPromotions = status => {
    const completedPromotions = promotions_data?.promotions
      ?.filter(promotion =>
        status === 'Completed'
          ? (promotion.status === 'Stopped' && promotion?.history?.endDate >= promotion?.duration?.endDate) ||
            !promotion?.history?.endDate
          : promotion.status === 'Stopped' && promotion?.history?.endDate < promotion?.duration?.endDate,
      )
      ?.map(item => [
        <ModalContainer
          width={300}
          btnComponent={({ onClick }) => <span onClick={onClick}>{item.name}</span>}
          content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
        />,
        <ModalContainer
          width={300}
          btnComponent={({ onClick }) => (
            <span onClick={onClick}>
              {format(getDateObject(new Date(item.duration.startDate).toString()), 'yyyy-MM-dd HH:mm a')}
            </span>
          )}
          content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
        />,
        <ModalContainer
          width={300}
          btnComponent={({ onClick }) => (
            <span onClick={onClick}>
              {format(getDateObject(new Date(item.duration.endDate).toString()), 'yyyy-MM-dd HH:mm a')}
            </span>
          )}
          content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
        />,
        (() => {
          switch (filterStatus(item)) {
            case 'Active':
              return (
                <ModalContainer
                  width={300}
                  btnComponent={({ onClick }) => (
                    <span onClick={onClick} css="color:green;">
                      {filterStatus(item)}
                    </span>
                  )}
                  content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                />
              );

            case 'Pending':
              return (
                <ModalContainer
                  width={300}
                  btnComponent={({ onClick }) => (
                    <span onClick={onClick} css="color:orange;">
                      {filterStatus(item)}
                    </span>
                  )}
                  content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                />
              );
            case 'Stopped':
              return (
                <ModalContainer
                  width={300}
                  btnComponent={({ onClick }) => (
                    <span onClick={onClick} css="color:red;">
                      {filterStatus(item)}
                    </span>
                  )}
                  content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                />
              );
            default:
              return (
                <ModalContainer
                  width={300}
                  btnComponent={({ onClick }) => <span onClick={onClick}>{filterStatus(item)}</span>}
                  content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                />
              );
          }
        })(),

        <ModalContainer
          width={300}
          btnComponent={({ onClick }) => <span onClick={onClick}>{promotionOfferTypeConverter(item.offer_type)}</span>}
          content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
        />,
        <ModalContainer
          width={300}
          btnComponent={({ onClick }) => <span onClick={onClick}>{item.impressions}</span>}
          content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
        />,
        <ModalContainer
          width={300}
          btnComponent={({ onClick }) => <span onClick={onClick}>{item.clicks}</span>}
          content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
        />,
        <ModalContainer
          width={300}
          btnComponent={({ onClick }) => <span onClick={onClick}>{item.conversions}</span>}
          content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
        />,
        <ModalContainer
          md
          title="Activate Promotion"
          btnComponent={({ onClick }) => (
            <button
              type="button"
              onClick={() => {
                onClick();
              }}
              disabled={item?.status === 'Active' || item?.status === 'Stopped'}>
              <span className="material-icons-outlined">play_arrow</span>
            </button>
          )}
          content={({ onClose }) => (
            <ConfirmationDialogueModal
              onClose={() => {
                onClose();
              }}
              text="Are you sure you want to activate this Promotion?"
              btn={
                <Button
                  type="danger"
                  onClick={() => {
                    onActivatePromotion(item._id, onClose);
                  }}
                  loading={false}>
                  Activate
                </Button>
              }
            />
          )}
        />,
      ]);
    setTotalCompletedCount(completedPromotions?.length);

    return completedPromotions;
  };

  const { promotions, totalCount } = useMemo(
    () => ({
      promotions:
        searchQuery.filterText === 'Completed' || searchQuery.filterText === 'Stopped'
          ? handleCompletedPromotions(searchQuery?.filterText)
          : promotions_data?.promotions?.map(item => [
              <ModalContainer
                width={320}
                btnComponent={({ onClick }) => <span onClick={onClick}>{item.name}</span>}
                content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
              />,
              <ModalContainer
                width={300}
                btnComponent={({ onClick }) => (
                  <span onClick={onClick}>
                    {format(getDateObject(new Date(item.duration.startDate).toString()), 'yyyy-MM-dd h:mm a')}
                  </span>
                )}
                content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
              />,
              <ModalContainer
                width={300}
                btnComponent={({ onClick }) => (
                  <span onClick={onClick}>
                    {format(getDateObject(new Date(item.duration.endDate).toString()), 'yyyy-MM-dd h:mm a')}
                  </span>
                )}
                content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
              />,
              (() => {
                switch (filterStatus(item)) {
                  case 'Active':
                    return (
                      <ModalContainer
                        width={300}
                        btnComponent={({ onClick }) => (
                          <span onClick={onClick} css="color:green;">
                            {filterStatus(item)}
                          </span>
                        )}
                        content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                      />
                    );

                  case 'Pending':
                    return (
                      <ModalContainer
                        width={300}
                        btnComponent={({ onClick }) => (
                          <span onClick={onClick} css="color:orange;">
                            {filterStatus(item)}
                          </span>
                        )}
                        content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                      />
                    );
                  case 'Stopped':
                    return (
                      <ModalContainer
                        width={300}
                        btnComponent={({ onClick }) => (
                          <span onClick={onClick} css="color:red;">
                            {filterStatus(item)}
                          </span>
                        )}
                        content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                      />
                    );
                  default:
                    return (
                      <ModalContainer
                        width={300}
                        btnComponent={({ onClick }) => <span onClick={onClick}>{filterStatus(item)}</span>}
                        content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
                      />
                    );
                }
              })(),

              <ModalContainer
                width={300}
                btnComponent={({ onClick }) => (
                  <span onClick={onClick}>{promotionOfferTypeConverter(item.offer_type)}</span>
                )}
                content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
              />,
              <ModalContainer
                width={300}
                btnComponent={({ onClick }) => <span onClick={onClick}>{item.impressions}</span>}
                content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
              />,
              <ModalContainer
                width={300}
                btnComponent={({ onClick }) => <span onClick={onClick}>{item.clicks}</span>}
                content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
              />,
              <ModalContainer
                width={300}
                btnComponent={({ onClick }) => <span onClick={onClick}>{item.conversions}</span>}
                content={({ onClose }) => <PromotionMenuModal onClose={onClose} promotion={item} />}
              />,
              <ModalContainer
                md
                title="Activate Promotion"
                btnComponent={({ onClick }) => (
                  <button
                    type="button"
                    disabled={item?.status === 'Active' || item?.status === 'Stopped'}
                    onClick={() => {
                      onClick();
                    }}>
                    <span className="material-icons-outlined">play_arrow</span>
                  </button>
                )}
                content={({ onClose }) => (
                  <ConfirmationDialogueModal
                    onClose={() => {
                      onClose();
                    }}
                    text="Are you sure you want to activate this Promotion?"
                    btn={
                      <Button
                        type="danger"
                        onClick={() => {
                          onActivatePromotion(item._id, onClose);
                        }}
                        loading={false}>
                        Activate
                      </Button>
                    }
                  />
                )}
              />,
            ]),
      totalCount: searchQuery.filterText === 'Completed' ? totalCompletedCount : promotions_data?.totalItems ?? 0,
    }),
    [promotions_data],
  );
  return (
    <>
      <DataLayout
        title="Promotions"
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
          rowsData={promotions}
          loading={promotions_loading}
          columnNames={columnNames}
          itemsPerPage={searchQuery.pageSize}
          hasHover
          tooltipText="Click on the promotion name to see the details"
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          onSort={(sortBy, sortOrder) => {
            setSearchQuery(_ => ({ ..._, sortBy, sortOrder }));
          }}
          modal="promotion"
        />
        <Pagination
          className="pagination-bar"
          currentPage={searchQuery.page}
          totalCount={totalCount}
          pageSize={searchQuery.pageSize}
          onPageChange={page => {
            setSearchQuery(_ => ({ ..._, page }));
          }}
          onPageSizeChange={pageSize => {
            setSearchQuery(_ => ({ ..._, page: 1, pageSize }));
          }}
        />
      </DataLayout>
    </>
  );
}

export default Promotions;
