import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { useHistory } from 'react-router';
import { FormHolder, StyledForm } from '../../../styles/App.styles';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import SubTitle from '../../atoms/SubTitle';
import Form, { useForm } from '../Form';
import Toast from '../../molecules/Toast';
import Field from '../../molecules/Field';
import AuthService from '../../../services/authService';
import { useQuery } from '../../../helpers/common';
import TitleHead from '../../molecules/TitleHead';

function NewPassword() {
  const history = useHistory();

  const [form] = useForm();
  const [loading_t, setLoadingT] = React.useState(true);
  const token = useQuery('token');

  const w = window.location.search;
  const mail = w?.split('&')[1];
  const newEmail = mail?.split('=')[1];

  useEffect(() => {
    if (token) {
      AuthService.verifyOtpForgotPassword(token, newEmail)
        .then(res => {
          form.setFieldsValue({ email: res.email });
          setLoadingT(false);
        })
        .catch(err => {
          Toast({
            type: 'error',
            message: err?.response?.data?.message ?? err.message,
          });
        });
    } else {
      Toast({
        type: 'error',
        message: 'Invalidsssssssss Token',
      });
    }
  }, [token]);
  const onSubmit = e => {
    setLoadingT(true);
    AuthService.resetPassword({ ...e, token })
      .then(() => {
        history.push('/');
        Toast({
          type: 'success',
          message: 'Password reset successfully',
        });
      })
      .catch(err => {
        setLoadingT(false);
        Toast({
          type: 'error',
          message: err?.response?.data?.message ?? err.message,
        });
      });
  };
  const title = 'Add New password';
  return (
    <FormHolder>
      <TitleHead title={title} backBtn onBackClick={() => history.push('/')} />
      <StyledForm
        onSubmit={onSubmit}
        onTouched={e => {
          if (Object.keys(e)[0] === 'password') {
            const { password } = e;
            form.setFieldsValue({ '8char_con': password?.length >= 8 });
            form.setFieldsValue({
              alphabet_con: /(?=.*[a-z])/.test(password) && /(?=.*[A-Z])/.test(password),
            });
            form.setFieldsValue({ number_con: /(?=.*\d)/.test(password) });
          }
        }}
        form={form}
        onError={() => {
          Toast({ type: 'error', message: 'Please fill/check all the fields' });
        }}>
        <Heading level={1}>{title}</Heading>
        <Form.Item
          disabled
          type="input"
          label="Email"
          name="email"
          placeholder="Your Email"
          // prefix={<i className="icon-email" />}
          rounded
          rules={[{ email: true, message: 'Enter a valid email address' }, { required: true }]}>
          <Field />
        </Form.Item>
        <SubTitle base>Add new password</SubTitle>
        <Form.Item
          disabled={loading_t}
          type="password"
          label="New password"
          name="password"
          placeholder="New password"
          rounded
          // prefix={<i className="icon-lock" />}
          margin="1.25rem"
          rules={[{ required: true }, { password: true }]}>
          <Field />
        </Form.Item>
        <Paragraph className="font-bold" css="margin-bottom: 1rem;">
          Your password needs to be at least
        </Paragraph>
        <Form.Item type="checkbox" label="8 Characters long" name="8char_con" margin="1rem" disabled>
          <Field />
        </Form.Item>
        <Form.Item
          type="checkbox"
          label="Including 1 uppercase and 1 lowercase"
          name="alphabet_con"
          margin="1rem"
          disabled>
          <Field />
        </Form.Item>
        <Form.Item type="checkbox" label="And 1 number" name="number_con" margin="1.25rem" disabled>
          <Field />
        </Form.Item>
        <Form.Item
          disabled={loading_t}
          type="password"
          label="Confirm password"
          name="confirm_password"
          placeholder="Confirm password"
          rules={[
            { required: true, message: 'Please Confirm your password again' },
            {
              transform: value => value !== form.getFieldValue('password'),
              message: 'Passwords do not match',
            },
          ]}
          // prefix={<i className="icon-lock" />}
        >
          <Field />
        </Form.Item>
        <Button disabled={loading_t} rounded type="primary" width={155} htmlType="submit">
          Save
        </Button>
      </StyledForm>
    </FormHolder>
  );
}

export default NewPassword;
