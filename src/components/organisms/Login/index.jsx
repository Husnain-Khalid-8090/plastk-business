import React, { lazy, useContext } from 'react';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { Flex } from '../../../styles/helpers.styles';
import { FormHolder } from '../../../styles/App.styles';
import Form, { useForm } from '../Form';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import Link from '../../atoms/Link';
import SubTitle from '../../atoms/SubTitle';
import Field from '../../molecules/Field';
import { ForgotPassLink } from './Login.styles';
import { AuthContext } from '../../../context/authContext';

const UserTemplate = lazy(() => import('../../templates/UserTemplate'));

const Login = () => {
  const [form] = useForm();
  const { onLogin, loading_user } = useContext(AuthContext);
  if (window?.localStorage?.userName) {
    form.setFieldsValue({ email: window?.localStorage?.userName });
  }
  return (
    <>
      <UserTemplate>
        <FormHolder>
          <Form form={form} onSubmit={onLogin}>
            <Heading level={1}>Sign in</Heading>
            <SubTitle>Welcome to Plastk Business Accelerator!</SubTitle>

            <Form.Item
              type="email"
              label="Email"
              rounded
              name="email"
              placeholder="Your Email"
              prefix={<span className="icon-email" />}
              rules={[
                { required: true },
                { email: true },
                { pattern: /^.{0,256}$/, message: 'Maximum Character Length is 256' },
              ]}>
              <Field />
            </Form.Item>

            <Form.Item
              type="password"
              rounded
              label="Password"
              name="password"
              placeholder="Your Password"
              prefix={<span className="icon-lock" />}
              rules={[
                {
                  required: true,
                },
                { pattern: /^.{0,64}$/, message: 'Maximum Character Length is 64' },
              ]}>
              <Field />
            </Form.Item>
            <Flex
              justify="space-between"
              align="middle"
              css="
                margin-bottom: 1.875rem;
                @media (min-width: 768px) {
                  margin-bottom: 2.25rem;
                }">
              <Form.Item type="checkbox" label="Remember Me" name="rememberMe" noMargin>
                <Field />
              </Form.Item>
              <ForgotPassLink to="/forgot-password">Forgot Password?</ForgotPassLink>
            </Flex>
            <Button
              loading={loading_user}
              type="primary"
              htmlType="submit"
              rounded
              // sm
              width={155}
              css="
                margin: 0 auto 1.25rem;
                @media (min-width: 768px) {
                  margin-bottom: 2.125rem;
                }
              ">
              Login
            </Button>
            <Paragraph className="text-center mb-0" css="color: var(--primary-text-color)">
              Don&apos;t have an account yet?{' '}
              <Link to="/sign-up" className="font-bold" id="signUpLink">
                Sign Up
              </Link>
            </Paragraph>
          </Form>
        </FormHolder>
      </UserTemplate>
    </>
  );
};

export default withRouter(Login);
