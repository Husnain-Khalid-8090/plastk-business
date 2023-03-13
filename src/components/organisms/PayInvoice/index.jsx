import React, { useState, useContext, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Select from '../../atoms/Select';
import { AuthContext } from '../../../context/authContext';
import Form, { useForm } from '../Form';
import Field from '../../molecules/Field';
import Button from '../../atoms/Button';
import UserService from '../../../services/userService';
import Toast from '../../molecules/Toast';
import Paragraph from '../../atoms/Paragraph';
import { convertToCurrencyFormat } from '../../../helpers/common';

function PayInvoice({ onClose, statementId, statement }) {
  const [state, setState] = useState({
    method: '',
    client_type: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [form] = useForm();
  const { fetchUser } = useContext(AuthContext);
  useEffect(() => {
    if (user?.client_type === 'Prepaid') {
      setState(prev => ({ ...prev, method: 'card' }));
      form.setFieldsValue({ method: { value: 'card', label: 'Pay via Card' } });
    } else if (user?.client_type === 'Credit' && !user?.paymentInfo?.order_id) {
      setState(prev => ({ ...prev, method: 'interac' }));
      form.setFieldsValue({ method: { value: 'interac', label: 'Pay via Interac Code' } });
    }
  }, []);

  useEffect(() => {
    if (form.getFieldValue('method')?.value === 'card') {
      form.setFieldsValue({ auto_payment: true });
    }
  }, [state?.method?.value]);
  const options = () =>
    user?.paymentInfo?.order_id
      ? [
          { value: 'interac', label: 'Pay via Interac Code' },
          { value: 'card', label: 'Pay via Card' },
        ]
      : [{ value: 'interac', label: 'Pay via Interac Code' }];

  const { rem_amount } = useMemo(() => ({
    rem_amount:
      statement?.total_amount_in_dollers - statement?.payments?.reduce((prev, curr) => prev + curr?.amount, 0),
  }));
  const payInvoiceInterac = async val => {
    setLoading(true);
    await UserService.payInvoiceInterac({ interac_code: val }, statementId)
      .then(res => {
        if (res?.data?.less_balance) {
          Toast({
            type: 'warning',
            message: `${res?.message}.Y`,
          });
          form.setFieldsValue({ interac_code: '' });
          form.setFieldsError({ interac_code: { message: '' } });
        } else {
          onClose();
          Toast({
            type: 'success',
            message: res?.message,
          });
        }
        fetchUser();
      })
      .catch(err => {
        Toast({
          type: 'error',
          message: err.message,
        });
      });
    setLoading(false);
  };

  const payInvoiceWithCard = async (val, auto_payment = false) => {
    setLoading(true);
    await UserService.payInvoiceWithCard({ amount: val, auto_payment }, statementId)
      .then(res => {
        if (res?.data?.less_balance) {
          Toast({
            type: 'warning',
            message: `${res?.message}.Y`,
          });
          form.setFieldsValue({ amount: '' });
        } else {
          onClose();
          Toast({
            type: 'success',
            message: res?.message,
          });
        }
        fetchUser();
      })
      .catch(err => {
        Toast({
          type: 'error',
          message: err.message,
        });
      });
    setLoading(false);
  };

  const handleSubmit = val => {
    if (val.method?.value === 'interac') {
      payInvoiceInterac(val.interac_code);
    } else {
      payInvoiceWithCard(val.amount, val?.auto_payment);
    }
  };

  return (
    <>
      <Paragraph
        css={`
          text-align: right !important;
          font-size: 14px;
          color: var(--black);
          font-weight: 700;
        `}>
        Amount Due:
        {rem_amount > 0
          ? convertToCurrencyFormat(rem_amount)
          : convertToCurrencyFormat(statement?.total_amount_in_dollers)}
      </Paragraph>
      <Form
        form={form}
        onSubmit={handleSubmit}
        onTouched={_ => {
          setState(__ => ({ ...__, ..._ }));
        }}>
        <Form.Item
          name="method"
          label="Payment Method"
          noMargin
          rules={[{ required: true, message: 'Please select payment method' }]}
          isSearchable={false}
          placeholder="Select Payment Method"
          options={options()}
          isDisabled={
            user?.client_type === 'Prepaid' || (user?.client_type === 'Credit' && !user?.paymentInfo?.order_id)
          }
          css="margin-bottom:1rem">
          <Select />
        </Form.Item>
        {form.getFieldValue('method')?.value === 'card' && (
          <>
            <Form.Item
              name="amount"
              label="Amount"
              placeholder="Enter Amount"
              type="number"
              prefix="$ "
              rules={[
                { required: true, message: 'Please enter amount' },
                {
                  min: 1,
                  message: `Amount should be greater than $0`,
                },
                {
                  max: 10000,
                  message: `Amount should be less than or equal to $10,000`,
                },
              ]}>
              <Field />
            </Form.Item>
            <Form.Item
              type="checkbox"
              name="auto_payment"
              label="Save card for Auto Payment"
              value={form.getFieldValue('auto_payment') === true}>
              <Field />
            </Form.Item>
          </>
        )}

        {form.getFieldValue('method')?.value === 'interac' && (
          <Form.Item
            type="text"
            name="interac_code"
            label="Interac Code"
            placeholder="Enter Interac Code"
            rules={[
              { required: true, message: 'Please enter your interac code' },
              {
                pattern: /^[0-9a-zA-Z]{8}[^\s]{1}$/,
                message: 'Enter a valid interac code',
              },
            ]}>
            <Field />
          </Form.Item>
        )}
        <Button htmlType="submit" type="primary" loading={loading}>
          Pay
        </Button>
      </Form>
    </>
  );
}

export default PayInvoice;
