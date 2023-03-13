import React, { lazy, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import { FormHolder } from '../../../styles/App.styles';
import Form, { useForm } from '../Form';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Link from '../../atoms/Link';
import Paragraph from '../../atoms/Paragraph';
import SubTitle from '../../atoms/SubTitle';
import Field from '../../molecules/Field';

import UserService from '../../../services/userService';
import Toast from '../../molecules/Toast';
import { useQuery } from '../../../helpers/common';

const UserTemplate = lazy(() => import('../../templates/UserTemplate'));

const SignUp = ({ history }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    setLoading(true);
    UserService.signUp(e)
      .then(({ message }) => {
        setLoading(false);
        history.push('/');
        Toast({
          message,
          type: 'success',
        });
      })
      .catch(({ message }) => {
        setLoading(false);
        Toast({
          message,
          type: 'error',
        });
      });
  };

  const emailFromQuey = useQuery('email');

  useEffect(() => {
    if (form.getFieldValue('email') !== '' && emailFromQuey) {
      form.setFieldsValue({
        email: emailFromQuey ?? '',
      });
    }
  }, []);

  return (
    <>
      <UserTemplate>
        <FormHolder>
          <Form form={form} onSubmit={onSubmit}>
            <Heading level={1}>
              <span className="mobile-hide">Sign Up</span>
            </Heading>
            <SubTitle>
              <span className="text">Please enter the following information to get started!</span>
            </SubTitle>

            <Form.Item
              type="email"
              label="Email"
              name="email"
              placeholder="Your Email"
              rounded
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
              label="Create Password"
              name="password"
              placeholder="Your Password"
              rounded
              prefix={<span className="icon-lock" />}
              rules={[
                {
                  required: true,
                },
                {
                  password: true,
                },
                { pattern: /^.{0,64}$/, message: 'Maximum Character Length is 64' },
                {
                  transform: value => {
                    if (form.getFieldValue('confirmpassword') && value !== form.getFieldValue('confirmpassword')) {
                      form.setFieldsError({ confirmpassword: { message: 'Passwords does not match' } });
                      return false;
                    }
                    return false;
                  },
                  message: 'Passwords does not match',
                },
              ]}>
              <Field />
            </Form.Item>

            <Form.Item
              type="password"
              label="Re-Enter Password"
              name="confirmpassword"
              placeholder="Your Password"
              rounded
              prefix={<span className="icon-lock" />}
              rules={[
                {
                  required: true,
                  message: 'Confirm password is required',
                },
                {
                  transform: value => value !== form.getFieldValue('password'),
                  message: 'Passwords does not match',
                },
              ]}>
              <Field />
            </Form.Item>

            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              rounded
              width={155}
              css="
                margin: 0 auto 1.25rem;
                @media (min-width: 768px) {
                  margin-bottom: 2.125rem;
                }
              ">
              Create Account
            </Button>
            <Paragraph className="text-center mb-0" css="color: var(--primary-text-color)">
              Already have an account?{' '}
              <Link to="/login" className="font-bold" id="signUpLink">
                Sign In
              </Link>
            </Paragraph>
          </Form>
        </FormHolder>
      </UserTemplate>
    </>
  );
};

export default withRouter(SignUp);
