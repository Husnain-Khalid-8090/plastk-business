/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { startOfDay } from 'date-fns';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import FilterBtns from '../components/organisms/FilterBtns';
import {
  ContentHead,
  TabsCol,
  RightCol,
  Button as Btn,
  DashboardBtns,
} from '../components/organisms/DashboardContent/DashboardContent.style';
import RevenueTab from '../components/organisms/RevenueTab';
import MetricsTab from '../components/organisms/MetricsTab';
import PromotionService from '../services/promotionsService';
import { getDateObject } from '../helpers/common';
import { AuthContext } from '../context/authContext';
import Modal from '../components/molecules/Modal';
import CardInfoForm from '../components/organisms/CardInfoForm';
import Heading from '../components/atoms/Heading';
import Paragraph from '../components/atoms/Paragraph';

function Dashboard() {
  const [revenueTab, setRevenueTab] = useState(true);
  const { user } = useContext(AuthContext);
  const [state, setState] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    searchText: '',
    filterText: '',
    startDate: user?.created_at,
    endDate: startOfDay(getDateObject()).toISOString(),
    store: '',
    year: true,
    promotion: '',
    sortBy: 'created_at',
    sortOrder: -1,
  });
  const { promotions, stores, promotionsStoreNames_loading } = PromotionService.GetPromotionsStoreNames(searchQuery);
  useEffect(() => {
    setSearchQuery(_ => ({ ..._, page: 1, pageSize: 10, searchText: '', filterText: '', sortBy: null }));
  }, [revenueTab]);

  useEffect(() => {
    if (
      (user.status === 'Active' && !user?.paymentInfo?.order_id && user?.client_type === 'Prepaid') ||
      (user?.card_skipped === false &&
        !user?.paymentInfo?.order_id &&
        user.status === 'Active' &&
        user?.client_type === 'Credit')
    ) {
      setShowModal(true);
    }
  }, []);
  return (
    <>
      {showModal && (
        <Modal title="Recharge Now" isOpen={showModal} setIsOpen={setShowModal} width="1000">
          <>
            <CardInfoForm state={state} setState={setState} type="save" setShowModal={setShowModal} />
          </>
        </Modal>
      )}
      <ContentHead>
        <TabsCol>
          <DashboardBtns>
            <Btn type="button" className={`${revenueTab && 'active'}`} onClick={() => setRevenueTab(true)}>
              Revenue
            </Btn>
            <Btn type="button" className={`${!revenueTab && 'active'}`} onClick={() => setRevenueTab(false)}>
              Metrics
            </Btn>
          </DashboardBtns>
        </TabsCol>
        <RightCol>
          <FilterBtns
            loading_ps={promotionsStoreNames_loading}
            stores={stores}
            promotions={promotions}
            onFilterChange={__ => {
              setSearchQuery(_ => ({ ..._, ...__, page: 1 }));
            }}
          />
        </RightCol>
      </ContentHead>
      {revenueTab ? (
        <RevenueTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      ) : (
        <MetricsTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
    </>
  );
}

export default Dashboard;
