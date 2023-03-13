/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { subMonths } from 'date-fns';
import Form, { useForm } from '../Form';
import Button from '../../atoms/Button';
import Field from '../../molecules/Field';
import Grid from '../../atoms/Grid';
import Toast from '../../molecules/Toast';
import UserService from '../../../services/userService';
import { AuthContext } from '../../../context/authContext';
import ModalContainer from '../../molecules/ModalContainer';
import ConfirmationDialogueModal from '../ConfirmationDialogueModal';
import { amountForDeposit } from '../../../helpers/common';
import { BtnWrap, HeadingWrap, BtnHolder, BtnCol } from './CardInfoForm.style';
import loader from '../../../assets/images/loader.png';
import Heading from '../../atoms/Heading';
import Paragraph from '../../atoms/Paragraph';

const CardInfo = ({ onClose = () => {}, state, setState, type, setShowModal = () => {}, setIsClosable = () => {} }) => {
  const [form] = useForm();
  const { fetchUser, user, onLogout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [paymentSucces, setPaymentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(100);
  useEffect(() => {
    if (type === 'edit') {
      setState({ ...state, amount: amountForDeposit(user?.client_type, type, state?.amount) });
    } else {
      setState({ ...state, amount: amountForDeposit(user?.client_type, type, 100) });
      form.setFieldsValue({ amount: 100 });
    }
  }, []);

  useEffect(() => {
    if (state?.amount) {
      if (state.amount == 100) {
        setActiveTab(100);
      } else if (state.amount == 250) {
        setActiveTab(250);
      } else if (state.amount == 500) {
        setActiveTab(500);
      } else {
        setActiveTab();
      }
    }
  }, [state.amount]);
  const handleSubmit = async () => {
    setLoading(true);
    await UserService.updateCardDetails({
      ...state,
      client_type: user?.client_type,
      amount: amountForDeposit(user?.client_type, type, state?.amount),
    })
      .then(res => {
        setIsClosable(false);
        setPaymentSuccess(true);
      })
      .catch(err => {
        Toast({
          type: 'error',
          message: err?.message,
        });
        setIsConfirmationModalOpen(false);
      });
    setLoading(false);
    setIsConfirmationModalOpen(false);
  };

  const handleDate = value => {
    form.setFieldsValue({
      expiry_date: new Date(value).toLocaleDateString('en-us', { year: 'numeric', month: 'long' }),
    });
    setState({
      ...state,
      expiry_date: new Date(value).toLocaleDateString('en-us', { year: 'numeric', month: 'long' }),
    });
  };

  const openConfirmationModal = () => {
    if (type !== 'edit' && !state?.amount) {
      Toast({
        type: 'error',
        message: 'Please enter amount',
      });
      return;
    }
    setIsConfirmationModalOpen(true);
  };

  const handleAmount = val => {
    form.setFieldsValue({ amount: val });
    setState({
      ...state,
      amount: val,
    });
    setActiveTab(val);
  };
  const onSkip = async () => {
    await UserService.skipCardDetailProcess()
      .then(res => {
        fetchUser();
      })
      .catch(err => {
        Toast({
          type: 'error',
          message: err?.message,
        });
      });
  };

  return (
    <>
      {!paymentSucces ? (
        <>
          {type !== 'edit' && (
            <HeadingWrap>
              <Heading level={2}>Input Card Details</Heading>
              <Button type="button" onClick={onLogout}>
                Sign Out
              </Button>
            </HeadingWrap>
          )}
          <Paragraph
            css={`
              color: var(--black);
            `}>
            Please enter your card details!
          </Paragraph>
          <Form form={form} onSubmit={openConfirmationModal} onTouched={__ => setState(_ => ({ ..._, ...__ }))}>
            <Grid xs={1} sm={2} colGap={{ xs: 20 }}>
              <Form.Item
                type="text"
                gray
                label="Card Number"
                name="card_number"
                value={state?.card_number}
                placeholder="Enter Card Number (0000-0000-0000-0000)"
                rules={[
                  { required: true, message: 'Card Number Is Required' },
                  { changeRegex: 'card_number' },
                  {
                    pattern: /^[0-9]{4}[-]{1}[0-9]{4}[-]{1}[0-9]{4}[-]{1}[0-9]{4}$/,
                    message: 'Enter Valid Card Number',
                  },
                ]}>
                <Field />
              </Form.Item>
              <Form.Item
                gray
                type="text"
                label="Cardholder Name"
                name="cardholder_name"
                placeholder="Enter Cardholder Name"
                value={state?.cardholder_name}
                rules={[
                  { required: true, message: 'Cardholder Name Is Required' },
                  {
                    pattern: /^[a-zA-Z]{1,20}[\s]{1}([a-zA-Z]{1,20}[\s]{1})?[a-zA-Z]{3,20}$/,
                    message: 'Enter Valid Cardholder Name',
                  },
                ]}>
                <Field />
              </Form.Item>
            </Grid>
            <Grid xs={1} sm={2} md={3} colGap={{ xs: 20 }}>
              <Form.Item
                gray
                type="datepicker"
                label="Expiry Date"
                name="expiry_date"
                placeholder="Date (MM/YY)"
                rules={[{ required: true, message: 'Expiry Date Is Required' }]}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                customMaxDateLimit={new Date().setFullYear(new Date().getFullYear() + 7)}
                minDate={subMonths(new Date(), 1)}
                onChange={handleDate}>
                <Field />
              </Form.Item>
              <Form.Item
                gray
                type="number"
                label="CVC/CVV"
                name="cvc_cvv"
                placeholder="CVC/CVV Number"
                value={state?.cvc_cvv}
                rules={[
                  { required: true, message: 'CVC/CVV Is Required' },
                  {
                    pattern: /^.{0,3}$/,
                    message: 'Enter Valid CVC/CVV Number',
                  },
                  { max: 999, message: 'Enter Valid CVC/CVV Number' },
                ]}>
                <Field />
              </Form.Item>
              {type !== 'edit' && (
                <Form.Item
                  gray
                  type="number"
                  label="Amount"
                  prefix="$"
                  name="amount"
                  placeholder="Enter Amount"
                  rules={[
                    { required: true, message: 'Amount Is Required' },
                    {
                      min: 100,
                      message: 'Amount Should Be Greater Than or Equal to 100',
                    },
                    {
                      max: 10000,
                      message: 'Amount Should Be Less Than or Equal to 10,000',
                    },
                    { pattern: /^\d+$/, message: 'amount in decimals are not allowed' },
                  ]}>
                  <Field />
                </Form.Item>
              )}
            </Grid>

            <BtnHolder>
              {type !== 'edit' && (
                <>
                  <BtnCol>
                    <Button
                      sm
                      rounded
                      type="tertiary"
                      active={activeTab === 100}
                      onClick={() => {
                        handleAmount(100);
                      }}>
                      $100
                    </Button>
                    <Button
                      sm
                      rounded
                      type="tertiary"
                      active={activeTab === 250}
                      onClick={() => {
                        handleAmount(250);
                      }}>
                      $250
                    </Button>
                    <Button
                      sm
                      rounded
                      type="tertiary"
                      active={activeTab === 500}
                      onClick={() => {
                        handleAmount(500);
                      }}>
                      $500
                    </Button>
                  </BtnCol>
                </>
              )}
              <BtnWrap>
                <Button type="primary" htmlType="submit" width={180} sm rounded>
                  {type === 'edit' ? 'Update' : 'Confirm Payment'}
                </Button>
                {type !== 'edit' && user?.client_type === 'Credit' && (
                  <Button type="primary" htmlType="button" onClick={onSkip} width={154} sm rounded>
                    Skip
                  </Button>
                )}
              </BtnWrap>
            </BtnHolder>
            {isConfirmationModalOpen && (
              <ModalContainer
                isOpen
                sm
                isClosable={false}
                title={type !== 'edit' ? 'Initial Deposit' : 'Card Verification'}
                content={({ onClose: closeModal }) => (
                  <ConfirmationDialogueModal
                    onClose={() => {
                      setIsConfirmationModalOpen(false);
                      closeModal();
                    }}
                    text={`${`$${amountForDeposit(
                      user?.client_type,
                      type,
                      state?.amount,
                    )}`} will be charged to your card. Would you like to continue?`}
                    btn={
                      <Button type="danger" loading={loading} onClick={handleSubmit}>
                        Continue
                      </Button>
                    }
                  />
                )}
              />
            )}
          </Form>
        </>
      ) : (
        <div
          css={`
            min-height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          `}>
          <div
            css={`
              display: flex;
              flex-grow: 1;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
            `}>
            <Heading level={1}>Thank You !</Heading>
            <Paragraph css="width: 89%;">
              <strong
                css={`
                  color: black;
                `}>
                ${Number(state?.amount)?.toFixed(2)}
              </strong>
              &nbsp; payment successful. A reciept will be emailed to you shortly.
            </Paragraph>
            <div>
              <img src={loader} alt="loader" />
            </div>
          </div>
          <Button
            type="primary"
            rounded
            sm
            width={154}
            onClick={() => {
              setShowModal(false);
              fetchUser();
            }}>
            Close
          </Button>
        </div>
      )}
    </>
  );
};
export default CardInfo;
