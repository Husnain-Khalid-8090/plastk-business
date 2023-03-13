/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { useMediaPredicate } from 'react-media-hook';
import { FormHolder, StyledForm } from '../../../styles/App.styles';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import Paragraph from '../../atoms/Paragraph';
import Link from '../../atoms/Link';
import SubTitle from '../../atoms/SubTitle';
import TitleHead from '../../molecules/TitleHead';
import CodeInput from '../../molecules/CodeInput';
import { AuthContext } from '../../../context/authContext';
import AuthService from '../../../services/authService';
import Toast from '../../molecules/Toast';

function EmailVerification() {
  const [forceClear, setForceClear] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const MinWidth768 = useMediaPredicate('(min-width: 768px)');
  const { onLogout, user } = useContext(AuthContext);
  const handleSubmit = () => {
    if (otp?.length !== 4) {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      setDisable(true);
      AuthService.verifyOtp(otp, true)
        .then(() => {
          setLoading(false);
          setDisable(false);
          Toast({ type: 'success', message: 'Verification Successful' });
          window.location.reload();
        })
        .catch(ex => {
          setForceClear(true);
          setOtp('');
          setLoading(false);
          setDisable(false);
          Toast({ type: 'error', message: ex.message });
        });
    }
  };

  const resendCode = () => {
    if (!disable) {
      setDisable(true);
      AuthService.resendOtp()
        .then(() => {
          setDisable(false);

          Toast({ type: 'success', message: 'Verification code sent' });
        })
        .catch(ex => {
          setDisable(false);

          Toast({ type: 'error', message: ex.message });
        });
    }
  };

  const title = 'Email Verification';
  const email = user?.message?.split('Welcome Back, ')[1].split('!')[0];
  return (
    <FormHolder>
      <TitleHead title={title} signOutBtn onBackClick={onLogout} />
      <StyledForm onSubmit={handleSubmit}>
        {MinWidth768 && <Heading level={1}>{title}</Heading>}
        <SubTitle base>Please enter the 4-digit code sent to you at {email}</SubTitle>
        <CodeInput
          numInputs={4}
          value={otp}
          onChange={({ target: { value } }) => setOtp(value)}
          error={error}
          forceClear={forceClear}
          setForceClear={setForceClear}
        />
        <Button
          loading={loading}
          disabled={disable}
          type="primary"
          htmlType="submit"
          width={155}
          rounded
          // sm
          css="
            margin-bottom: 1.25rem;
            @media (min-width: 768px) {
              margin-bottom: 2.125rem;
            }
          ">
          Submit
        </Button>
        <Paragraph className="mb-0 font-medium">
          Haven&apos;t received it?{' '}
          <Link className="font-bold" onClick={resendCode} disabled>
            Resend a new code
          </Link>
        </Paragraph>
      </StyledForm>
    </FormHolder>
  );
}

export default EmailVerification;
