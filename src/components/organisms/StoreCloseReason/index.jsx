/* eslint-disable no-unused-vars */
import React from 'react';
import StoreService from '../../../services/storeService';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import Field from '../../molecules/Field';
import Toast from '../../molecules/Toast';
import Form from '../Form/Form';

const StoreCloseReason = ({ onClose, id }) => {
  const handleSubmit = ({ reason }) => {
    StoreService.closeStoreReq(id, reason)
      .then(res => {
        Toast({
          type: 'success',
          message: res?.message,
        });
        onClose();
      })
      .catch(err => {
        Toast({
          type: 'error',
          message: err?.message,
        });
      });
  };
  return (
    <div>
      <Heading>Enter your reason to close the store.On submission, request will be sent to business associate</Heading>
      <Form onSubmit={handleSubmit}>
        <Form.Item
          type="text"
          name="reason"
          label="Reason"
          rules={[
            { required: true, message: 'Reason is required' },
            { pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{3,}$/, message: 'minimum 3 characters ' },
            { pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{1,200}$/, message: 'Maximum 200 characters allowed' },
          ]}>
          <Field />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default StoreCloseReason;
