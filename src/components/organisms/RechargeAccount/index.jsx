/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import UserService from '../../../services/userService';
import Button from '../../atoms/Button';
import Field from '../../molecules/Field';
import Toast from '../../molecules/Toast';
import Form, { useForm } from '../Form';
import { AuthContext } from '../../../context/authContext';
import Select from '../../atoms/Select';
import Loaders from '../../atoms/Loaders';

const RechargeAccount = ({ onClose }) => {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const { fetchUser, user } = useContext(AuthContext);
  const { account_data, account_loading } = UserService.GetAccountDetails();

  const rechargeAccountWithInteracCode = async val => {
    setLoading(true);
    await UserService.rechargeAccount(val)
      .then(res => {
        if (res?.data?.less_balance) {
          Toast({
            type: 'warning',
            message: `${res?.message}.Your account balance is less than the credit limit. Please make another transaction`,
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

  const rechargeAccountWithCard = async val => {
    setLoading(true);
    await UserService.rechargeAccountWithCard(val)
      .then(res => {
        if (res?.less_balance) {
          Toast({
            type: 'warning',
            message: `${res?.message}.Your account balance is less than the credit limit. Please make another transaction`,
          });
        } else {
          Toast({
            type: 'success',
            message: res?.message,
          });
        }
        onClose();
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
    setLoading(true);
    if (user?.client_type === 'Credit') {
      if (form.getFieldsValue().recharge_type?.value === 'card') {
        rechargeAccountWithCard({
          amount: val.amount,
          balance_to_load: account_data?.recharge_details?.balance_to_load,
        });
      } else {
        rechargeAccountWithInteracCode({ interac_code: val.interac_code });
      }
    } else if (user?.client_type === 'Prepaid') {
      rechargeAccountWithCard({ amount: val.amount, balance_to_load: account_data?.recharge_details?.balance_to_load });
    }
  };

  return (
    <>
      {account_loading ? (
        <Loaders loading={account_loading} />
      ) : (
        <>
          <Form
            form={form}
            onSubmit={handleSubmit}
            onTouched={_ => {
              setState(__ => ({ ...__, ..._ }));
            }}>
            {user?.paymentInfo?.order_id && user?.client_type === 'Credit' && (
              <Form.Item
                name="recharge_type"
                options={[
                  { value: 'interac', label: 'Recharge Via Interac Code' },
                  { value: 'card', label: 'Recharge Via Card' },
                ]}
                noMargin
                isSearchable={false}
                rules={[{ required: true, message: 'Please select recharge method' }]}
                placeholder="Select Recharging Method"
                css="margin-bottom:1rem">
                <Select />
              </Form.Item>
            )}
            {form.getFieldsValue().recharge_type?.value === 'interac' && user?.client_type === 'Credit' && (
              <>
                <Form.Item
                  type="text"
                  name="interac_code"
                  label="Interac Code"
                  placeholder="Enter Interac Code"
                  rules={[{ required: true, message: 'Please enter your Interac Code' }]}>
                  <Field />
                </Form.Item>
              </>
            )}
            {!form.getFieldsValue().recharge_type?.value &&
              user?.client_type === 'Credit' &&
              !user?.paymentInfo?.order_id && (
                <>
                  <Form.Item
                    type="text"
                    name="interac_code"
                    label="Interac Code"
                    placeholder="Enter Interac Code"
                    rules={[
                      { required: true, message: 'Please enter your Interac Code' },
                      {
                        pattern: /^.{8,8}$/,
                        message: 'Interac Code must be 8 characters',
                      },
                    ]}>
                    <Field />
                  </Form.Item>
                </>
              )}
            {(user?.client_type === 'Prepaid' ||
              (form.getFieldsValue().recharge_type?.value === 'card' && user?.paymentInfo?.order_id)) && (
              <Form.Item
                gray
                type="number"
                label="Amount"
                name="amount"
                placeholder="Enter Amount"
                prefix="$"
                rules={[
                  { required: true, message: 'Amount Is Required' },
                  {
                    min: 1,
                    message: 'Amount must be greater than or equal to $1',
                  },
                  {
                    max: 10000,
                    message: 'Amount must be less than or equal to $10,000',
                  },
                  {
                    transform: value => {
                      if (account_data?.percentageUsed >= 75) {
                        return Number(value) < account_data?.recharge_details?.balance_to_load;
                      }
                      return false;
                    },
                    message: `You need to add minimum of $${account_data?.recharge_details?.balance_to_load}`,
                  },
                  { pattern: /^\d+$/, message: 'Only Whole Numbers Are Allowed' },
                ]}>
                <Field />
              </Form.Item>
            )}
            <Button htmlType="submit" type="primary" rounded loading={loading}>
              Recharge
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default RechargeAccount;
