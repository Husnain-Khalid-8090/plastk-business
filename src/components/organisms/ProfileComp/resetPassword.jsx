import React, { useEffect, useContext, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { FormHolder, StyledForm } from '../../../styles/App.styles';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import Form, { useForm } from '../Form';
import Toast from '../../molecules/Toast';
import Field from '../../molecules/Field';
import AuthService from '../../../services/authService';
import { AuthContext } from '../../../context/authContext';
import TitleHead from '../../molecules/TitleHead';
import ModalContainer from '../../molecules/ModalContainer';

const ResetPassword = ({ onClose }) => {
  const [isSuccess, setSuccess] = useState(false);
  const [form] = useForm();
  const { user } = useContext(AuthContext);
  const [loading_t, setLoadingT] = React.useState(true);
  const token = user?.totp;
  const newEmail = user?.email;

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
        message: 'Invalid Token',
      });
    }
  }, [token]);

  const title = 'Update password';

  const onSubmit = async e => {
    setLoadingT(true);
    try {
      const { currentPassword, newPassword, ...rest } = e;
      await AuthService.resetPassword({ ...rest, newPassword, token, currentPassword }).then(() => {
        Toast({
          type: 'success',
          message: 'Password reset successfully',
        });
        setSuccess(true);
      });
    } catch (err) {
      setLoadingT(false);
      Toast({
        type: 'error',
        message: err.message,
      });
    }
  };

  return isSuccess === true ? (
    <ModalContainer
      title="Successfully Updated Profile!"
      isOpen
      isClosable
      content={() => (
        <>
          <Button
            rounded
            css={`
              margin-left: 25%;
            `}
            type="primary"
            width={220}
            onClick={() => {
              onClose();
            }}>
            Back
          </Button>
        </>
      )}
    />
  ) : (
    <FormHolder>
      <TitleHead title={title} />
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
            form.validateFields(['password', 'confirm_password']);
          }
        }}
        form={form}
        onError={() => {
          Toast({ type: 'error', message: 'Please fill/check all the fields' });
        }}>
        <Heading level={1}>{title}</Heading>
        <Form.Item
          type="password"
          label="Current Password"
          name="currentPassword"
          placeholder="Current password"
          prefix={<i className="icon-lock" />}
          rules={[{ password: true }, { required: true }]}>
          <Field />
        </Form.Item>

        <Paragraph className="font-bold text-dark" css="margin-bottom: 1rem;">
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
          label="New password"
          name="password"
          placeholder="New password"
          prefix={<i className="icon-lock" />}
          margin="1.25rem"
          rules={[
            { required: true, message: 'Please Confirm your password again' },
            {
              transform: value => value === form.getFieldValue('currentPassword'),
              message: 'Current passwrod and New password should be different',
            },
          ]}>
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
          prefix={<i className="icon-lock" />}>
          <Field />
        </Form.Item>
        <Button disabled={loading_t} type="primary" htmlType="submit">
          Save
        </Button>
      </StyledForm>
    </FormHolder>
  );
};

export default ResetPassword;
