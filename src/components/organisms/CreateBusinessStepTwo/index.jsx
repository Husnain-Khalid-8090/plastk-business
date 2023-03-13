import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import Form from '../Form';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import SubTitle from '../../atoms/SubTitle';
import Field from '../../molecules/Field';
import TitleHead from '../../molecules/TitleHead';
import { UploadImgBusiness } from './CreateBusinessStepTwo.styles';

const CreateBusinessStepTwo = ({ setStep, loading }) => (
  <>
    <TitleHead backBtn signOutBtn onBackClick={() => setStep(1)} />
    <Heading level={1}>Create Business</Heading>
    <SubTitle>
      <span className="text">Please enter the following information for your business!</span>
    </SubTitle>

    <Form.Item
      type="text"
      label="Primary Contact Person"
      name="primary_contact_person"
      placeholder="Primary Contact"
      rounded
      rules={[
        { required: true, message: 'Primary Contact is required' },
        {
          pattern: /^[a-zA-Z ]*$/,
          message: 'Enter a valid Name',
        },
        {
          pattern: /^[a-zA-Z ]{3,}$/,
          message: 'Name must be minimum 3 characters',
        },
        {
          pattern: /^[a-zA-Z ]{2,40}$/,
          message: 'Name must be maximum 40 characters',
        },
      ]}>
      <Field />
    </Form.Item>

    <Form.Item
      type="text"
      label="Primary Contact Number"
      name="primary_contact_number"
      placeholder="Primary Contact Number"
      rounded
      rules={[
        { required: true, message: 'Primary Contact Number is required' },
        {
          pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
          message: 'Enter Complete Primary Contact Number',
        },
        {
          changeRegex: 'phone_number',
        },
      ]}>
      <Field />
    </Form.Item>
    <UploadImgBusiness>
      <div className="upload-img">
        <Form.Item
          name="business_logo"
          type="chooseFile"
          image
          label="Business Logo"
          fileReqText="max file size 25MB (.png)"
          columnBlock
          rules={[{ required: true, message: 'Business Logo is required' }]}>
          <Field />
        </Form.Item>
      </div>
      <div className="upload-img">
        <Form.Item
          name="banner_img"
          type="chooseFile"
          image
          label="Business Banner"
          fileReqText="max file size 25MB (.png)"
          columnBlock
          rules={[{ required: true, message: 'Business Banner is required' }]}>
          <Field />
        </Form.Item>
        {/* <LogoSize>Recommended Business logo size is 250 x 250 px</LogoSize> */}
      </div>
    </UploadImgBusiness>
    <Button
      loading={loading}
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

export default CreateBusinessStepTwo;
