/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Skeleton from 'react-loading-skeleton';
import { useMediaPredicate } from 'react-media-hook';
import ModalContainer from '../../molecules/ModalContainer';
import AddStoreModal from '../AddStoreModal';
import CreatePromotionModal from '../CreatePromotionModal';
import CreateStoreGroup from '../CreateStoreGroup';

import { LoadingContext } from '../../../context/loadingContext';
import { PageButtons } from '../../../helpers/headerButtons';
import { getCookie, convertToCurrencyFormat } from '../../../helpers/common';
import Header from '../../molecules/Header';
import Button from '../../atoms/Button';
import AddStoreManager from '../AddStoreManager';
import { AuthContext } from '../../../context/authContext';
import Timer from '../Timer';
import AdminRoles from '../AdminRoles';
import RechargeAccount from '../RechargeAccount';
import { BalanceWrap, BtnWrap } from './TopNavigation.styles';

function TopNavigation({ title: pageTitle }) {
  const { isLoading } = useContext(LoadingContext);
  const { hasPermission, user, refetch, showStoreModal, setShowStoreModal } = useContext(AuthContext);
  const { view } = useParams();
  const MinWidth1200 = useMediaPredicate('(min-width: 1200px)');
  const RangeWidth = useMediaPredicate('(min-width: 992px) and (max-width: 1199.98px)');
  const MaxWidth991 = useMediaPredicate('(max-width: 991px) ');
  const addStoreBtn = document.getElementById('add-store-btn');
  const ButtonsSkeleton = () => (
    <>
      {MinWidth1200 && <Skeleton rectangle height={46} width={173} css="border-radius:75px !important;" />}
      {RangeWidth && <Skeleton circle height={46} width={46} />}
      {MaxWidth991 && <Skeleton circle height={18} width={18} />}
    </>
  );
  useEffect(() => {
    if (addStoreBtn && showStoreModal) {
      addStoreBtn.click();
    }
  }, [addStoreBtn, showStoreModal]);
  const buttons = PageButtons[pageTitle] ?? [];
  if (view === 'profile') return MaxWidth991 && <Header />;

  const handlePageTitle = title => {
    if (title === 'statements') {
      if (user?.client_type === 'Credit') {
        return 'Invoices';
      }
    }
    return title?.split('-')?.join(' ');
  };
  return (
    <>
      <Header title={handlePageTitle(pageTitle)}>
        <>
          <BtnWrap>
            {getCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE) && <Timer type="admin" />}
            {buttons.includes('recharge-account') && hasPermission('bap.recharge-account') && (
              <ModalContainer
                title={view === 'statements' ? 'Pay Invoice' : 'Recharge Account'}
                btnComponent={({ onClick }) =>
                  isLoading ? (
                    ButtonsSkeleton()
                  ) : (
                    <Button
                      type="primary"
                      sm
                      rounded
                      onClick={() => {
                        onClick();
                      }}>
                      <span className="text">{view === 'statements' ? 'Pay Invoice' : 'Recharge Account'}</span>
                    </Button>
                  )
                }
                content={({ onClose }) => <RechargeAccount onClose={onClose} />}
              />
            )}

            {buttons.includes('create-promotion') &&
              hasPermission('bap.promotions.create') &&
              user?.show_create_campaigns_button && (
                <ModalContainer
                  xl
                  btnComponent={({ onClick }) =>
                    isLoading ? (
                      ButtonsSkeleton()
                    ) : (
                      <Button
                        type="primary"
                        sm
                        rounded
                        onClick={() => {
                          onClick();
                        }}>
                        <span className="text">Create Promotion</span>
                      </Button>
                    )
                  }
                  content={({ onClose }) => <CreatePromotionModal onClose={onClose} />}
                />
              )}
            {buttons.includes('add-store') && hasPermission('bap.stores.create') && (
              <ModalContainer
                title="Input Store Details"
                xl
                onModalClose={() => {
                  if (view === 'stores' && showStoreModal) {
                    setShowStoreModal(false);
                    refetch();
                  }
                }}
                btnComponent={({ onClick }) =>
                  isLoading ? (
                    ButtonsSkeleton()
                  ) : (
                    <Button
                      type="primary"
                      id="add-store-btn"
                      sm
                      rounded
                      onClick={() => {
                        onClick();
                      }}>
                      <span className="text">Add Store</span>
                    </Button>
                  )
                }
                content={({ onClose }) => <AddStoreModal onClose={onClose} />}
              />
            )}
            {buttons.includes('create-store-group') && hasPermission('bap.store-groups.create') && (
              <ModalContainer
                title="Create Store Group"
                width={1000}
                btnComponent={({ onClick }) =>
                  isLoading ? (
                    ButtonsSkeleton()
                  ) : (
                    <Button
                      type="primary"
                      sm
                      rounded
                      onClick={() => {
                        onClick();
                      }}>
                      <span className="text">Create Store Group</span>
                    </Button>
                  )
                }
                content={({ onClose }) => <CreateStoreGroup onClose={onClose} />}
              />
            )}
            {buttons.includes('add-store-manager') && hasPermission('bap.store-managers.create') && (
              <ModalContainer
                title="Add New Store Manager"
                width="1000"
                btnComponent={({ onClick }) =>
                  isLoading ? (
                    ButtonsSkeleton()
                  ) : (
                    <Button
                      type="primary"
                      sm
                      rounded
                      onClick={() => {
                        onClick();
                      }}>
                      <span className="text">Add Store Manager</span>
                    </Button>
                  )
                }
                content={({ onClose }) => <AddStoreManager onClose={onClose} />}
              />
            )}
            {/* {isLoading ? (
              ButtonsSkeleton()
            ) : (
              <Button as={Link} to="/" type="white" size={46} shape="circle" rounded>
                <span className="icon icon-bell" />
              </Button>
            )} */}
          </BtnWrap>
          <BalanceWrap>
            {getCookie('admin_bap_token') && user?.adminRoleTypes?.length && <AdminRoles />}
            {user?.client_type === 'Credit' &&
              (isLoading ? (
                ButtonsSkeleton()
              ) : (
                <span type="white" size={100} disabled>
                  Credit Limit:&nbsp;{convertToCurrencyFormat(user?.credit_limit ?? '0')}
                </span>
              ))}
            {isLoading ? (
              ButtonsSkeleton()
            ) : (
              <span type="white" size={100} disabled>
                Account Balance:&nbsp;{convertToCurrencyFormat(user?.account_balance ?? '0')}
              </span>
            )}
          </BalanceWrap>
        </>
      </Header>
    </>
  );
}

export default TopNavigation;
