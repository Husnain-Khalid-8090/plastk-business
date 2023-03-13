/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { useMediaPredicate } from 'react-media-hook';
import { useHistory } from 'react-router';
import { FormHolder, StyledForm } from '../../../styles/App.styles';
import Toast from '../../molecules/Toast';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import SubTitle from '../../atoms/SubTitle';
import TitleHead from '../../molecules/TitleHead';
import Field from '../../molecules/Field';
import Form, { useForm } from '../Form';
import authService from '../../../services/authService';

const ForgotPassword = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const MinWidth768 = useMediaPredicate('(min-width: 768px)');
  const onSubmit = () => {
    if (!loading) {
      setLoading(true);
      const { email } = form.getFieldsValue();
      form.setFieldsValue({ email });
      const errors = Object.values(form.validateFields()).filter(X => X?.hasError);
      if (errors.length) {
        setLoading(false);
        return;
      }
      authService
        .forgotPassword(email)
        .then(() => {
          setLoading(false);
          Toast({
            type: 'success',
            message: 'If that email address is in our database, we will send you an email to reset your password',
          });
          history.push('/');
        })
        .catch(err => {
          setLoading(false);
          Toast({
            type: 'error',
            message: err?.response?.data?.message ?? err.message,
          });
        });
    }
  };
  const title = 'Forgot Password?';
  return (
    <FormHolder>
      <TitleHead title={title} backBtn onBackClick={() => history.push('/')} />
      <StyledForm
        form={form}
        onSubmit={onSubmit}
        onError={() => {
          Toast({ type: 'error', message: 'Enter your email' });
        }}>
        {MinWidth768 && <Heading level={1}>{title}</Heading>}
        <SubTitle>
          To reset your password, please enter the email address you used to create your account and we&apos;ll send you
          a link.
        </SubTitle>
        <Form.Item
          type="email"
          label="Email"
          name="email"
          rounded
          placeholder="Your Email"
          // prefix={<span className="icon-email" />}
          rules={[
            { required: true, message: 'Please input your email' },
            { email: true },
            { pattern: /^.{0,50}$/, message: 'Maximum Character Length Is 50 Characters' },
          ]}>
          <Field />
        </Form.Item>
        <Paragraph
          className="font-medium"
          css="
            margin-bottom: 1.25rem; 
            @media (min-width: 768px) {
              margin-bottom: 1.875rem;
            }
          ">
          Didn&apos;t receive an email?{' '}
          <span style={{ color: '#ABDF65', cursor: 'pointer' }} className="font-bold" onClick={onSubmit}>
            Resend
          </span>
        </Paragraph>
        <Button loading={loading} rounded width={155} type="primary" htmlType="submit">
          Submit
        </Button>
      </StyledForm>
    </FormHolder>
  );
};

export default ForgotPassword;
