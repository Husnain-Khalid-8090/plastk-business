import React, { useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import Form from '../Form';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import SubTitle from '../../atoms/SubTitle';
import Field from '../../molecules/Field';
import GoogleLocationSelector from '../GoogleLocationSelector';

import TitleHead from '../../molecules/TitleHead';
import { AuthContext } from '../../../context/authContext';

const CreateBusinessStepOne = () => {
  const { onLogout } = useContext(AuthContext);
  // useEffect(() => {
  //   if (state?.address && state?.isSameBusiness) {
  //     form.setFieldsValue({
  //       // prev_place_id: state?.store_address?.place_id,
  //       store_address: state?.address,
  //       // store_image: '',
  //     });
  //   }
  // }, [state?.address]);
  // useEffect(() => {
  //   if (state?.business_name && state?.isSameName && state?.business_name !== state?.store_name) {
  //     form.setFieldsValue({
  //       store_name: state?.business_name,
  //       isSameName: false,
  //     });
  //   }
  // }, [state?.business_name]);
  return (
    <>
      <TitleHead signOutBtn onBackClick={onLogout} />
      <Heading level={1}>Create Business</Heading>
      <SubTitle>
        <span className="text">Please enter the following information for your business!</span>
      </SubTitle>
      <Form.Item
        type="text"
        label="Business Name"
        name="business_name"
        placeholder="Business Name"
        rounded
        rules={[
          { required: true, message: 'Business Name is required' },
          {
            pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]*$/,
            message: 'Enter a valid business name',
          },
          {
            pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{3,}$/,
            message: 'Business name must be minimum 3 characters',
          },
          {
            pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{3,100}$/,
            message: 'Business name must be maximum 100 characters',
          },
        ]}>
        <Field />
      </Form.Item>
      <Form.Item
        type="text"
        name="address"
        label="Address"
        placeholder="Business Address"
        rounded
        rules={[{ required: true, message: 'Business Address is required' }]}>
        <GoogleLocationSelector name="address" />
      </Form.Item>
      <Form.Item
        type="text"
        label="Business Contact Number"
        name="contact_number"
        placeholder="Business Contact Number"
        rounded
        rules={[
          { required: true, message: 'Business Contact Number is required' },
          {
            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            message: 'Enter Complete Business Contact Number',
          },
          {
            changeRegex: 'phone_number',
          },
        ]}>
        <Field />
      </Form.Item>

      <Form.Item
        type="text"
        label="GST/HST Number"
        name="business_gst"
        placeholder="GST/HST Number i.e. (23ASDSS2323A2Z2)"
        rounded
        rules={[
          { pattern: /^.{0,20}$/, message: 'Maximum Character Length is 20' },
          {
            pattern: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[A-Z]{1}[A-Z\d]{1}$/,
            message: 'Enter a valid GST/HST Number',
          },
        ]}>
        <Field />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        rounded
        width={155}
        css={`
          margin: 0 auto 1.25rem;
          @media (min-width: 768px) {
            margin-bottom: 2.125rem;
          }
        `}>
        Next
      </Button>
    </>
  );
};

export default CreateBusinessStepOne;
