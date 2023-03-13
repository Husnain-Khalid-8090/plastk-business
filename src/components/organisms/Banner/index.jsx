/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AuthContext } from '../../../context/authContext';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import Modal from '../../molecules/Modal';
import ModalContainer from '../../molecules/ModalContainer';
import CardInfo from '../CardInfoForm';
import RechargeAccount from '../RechargeAccount';
import { Banner, BtnClose, BtnHolder, IconHolder, Text } from './Banner.styles';

const BannerTop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const handleClose = () => setIsOpen(false);
  const { user, loading_user } = useContext(AuthContext);
  const [state, setState] = useState({ ...user?.cardInfo });
  const [isClosable, setIsClosable] = useState(true);
  const { view } = useParams();

  useEffect(() => {
    const { percentageUsed, credit_limit, account_balance } = user;
    const currentPercentage = 100 - (account_balance / credit_limit) * 100;
    setPercentage(percentageUsed);
    if (
      (user?.client_type === 'Prepaid' &&
        user?.paymentInfo?.order_id &&
        percentageUsed >= 75 &&
        currentPercentage >= 75) ||
      (user?.client_type === 'Credit' && percentageUsed >= 75 && currentPercentage >= 75)
    ) {
      window.scrollTo(0, 0);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [user, loading_user]);
  const getPercentageText = () => {
    if (user?.client_type !== 'Credit' && user?.status !== 'Suspended' && percentage >= 75 && percentage < 85) {
      return 'Your account balance is at 25% and we were unable to recharge your credit card. Please update your credit card details and recharge your account';
    }
    if (user?.client_type !== 'Credit' && user?.status !== 'Suspended' && percentage >= 85 && percentage < 95) {
      return 'Your account balance is at 15% and we were unable to recharge your credit card. Please update your credit card details and recharge your account';
    }
    if (user?.client_type !== 'Credit' && user?.status !== 'Suspended' && percentage >= 95 && percentage < 100) {
      return 'Your account balance is at 5% and we were unable to recharge your credit card. Please update your credit card details and recharge your account';
    }
    if (user?.client_type !== 'Credit' && user?.status !== 'Suspended' && percentage >= 100) {
      return 'Your account balance is at 0% and we were unable to recharge your credit card. Please update your credit card details and recharge your account';
    }
    if (user?.client_type !== 'Credit' && user?.status === 'Suspended') {
      return 'Your account is suspended. Please click the "Update Card Details" button to update your credit card details and recharge your account';
    }
    if (user?.status !== 'Suspended' && percentage >= 75 && percentage < 85) {
      return 'You have used 75% of your credit limit and need to make a payment to avoid any interruptions is service. Your promotions will be suspended if your available credit balance goes to zero. Please recharge your account';
    }
    if (user?.status !== 'Suspended' && percentage >= 85 && percentage < 95) {
      return 'You have used 85% of your credit limit and need to make a payment to avoid any interruptions is service. Your promotions will be suspended if your available credit balance goes to zero. Please recharge your account';
    }
    if (user?.status !== 'Suspended' && percentage >= 95 && percentage < 100) {
      return 'You have used 95% of your credit limit and need to make a payment to avoid any interruptions is service. Your promotions will be suspended if your available credit balance goes to zero. Please recharge your account';
    }
    if (user?.status !== 'Suspended' && percentage >= -10) {
      return 'You have used -10% of your credit limit and need to make a payment to avoid any interruptions is service. Your promotions will be suspended if your available credit balance goes to $0.00. Please recharge your account';
    }
    if (user?.status === 'Suspended') {
      return 'Your account has been suspended. Please recharge your account and reactivate your account';
    }
    return false;
  };
  return (
    <>
      {isOpen && view === 'dashboard' && user?.status !== 'Suspended' && (
        <Banner>
          <Text>{getPercentageText()}</Text>
          {user?.status !== 'Suspended' && (
            <BtnClose onClick={handleClose}>
              <i className="icon-close" />
            </BtnClose>
          )}
        </Banner>
      )}
      {isOpen && view === 'dashboard' && user?.status === 'Suspended' && (
        <Modal
          isOpen={showModal}
          setIsOpen={setShowModal}
          width="750"
          title="Account Suspended!"
          isClosable={false}
          alignTitle="center"
          suspended
          onClose={() => {
            // refetch();
          }}>
          <>
            <IconHolder>
              <span className="material-icons-outlined">error_outline</span>
            </IconHolder>
            <Paragraph
              lg
              css={`
                text-align: center;
                font-weight: 500;
                margin-bottom: 30px;
                line-height: 30px;
              `}>
              {user?.client_type !== 'Credit' ? (
                <>
                  Your account is suspended. Please click the <strong>Update Card Details</strong> <br /> button to
                  update your credit card details and recharge your account
                </>
              ) : (
                <>
                  Your account has been suspended.
                  <br /> Please recharge your account and reactivate your account
                </>
              )}
            </Paragraph>
            <BtnHolder>
              <ModalContainer
                title="Update Card Details"
                width="400"
                isClosable
                btnComponent={({ onClick }) => (
                  <Button
                    type="white"
                    sm
                    suffix={<span className="icon-pencil" />}
                    onClick={() => {
                      onClick();
                    }}>
                    Update Card Details
                  </Button>
                )}
                content={({ onClose }) => (
                  <CardInfo
                    onClose={onClose}
                    state={state}
                    setState={setState}
                    type="edit"
                    action="update"
                    setIsClosable={setIsClosable}
                  />
                )}
              />
              <ModalContainer
                title={view === 'statements' ? 'Pay Invoice' : 'Recharge Account'}
                btnComponent={({ onClick }) => (
                  <Button
                    type="primary"
                    sm
                    onClick={() => {
                      onClick();
                    }}>
                    <span className="text">Recharge Account</span>
                  </Button>
                )}
                content={({ onClose }) => <RechargeAccount onClose={onClose} />}
              />
            </BtnHolder>
          </>
        </Modal>
      )}
    </>
  );
};

export default BannerTop;
