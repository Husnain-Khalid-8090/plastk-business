/* eslint-disable no-shadow */
/* eslint-disable consistent-return */

import { setCookie, getCookie } from '../helpers/common';
import { Fetch } from '../helpers/fetchWaper';

const AuthService = {
  _url: process.env.REACT_APP_AUTH_API_URL,
  _token(token) {
    if (typeof token !== 'undefined') {
      setCookie(process.env.REACT_APP_BAP_TOKEN_COOKIE, token);
      return;
    }
    return getCookie(process.env.REACT_APP_BAP_TOKEN_COOKIE);
  },
  _redirectTo(redirectTo) {
    if (typeof redirectTo !== 'undefined') {
      setCookie(process.env.REACT_APP_REDIRECT_TO_COOKIE, redirectTo);
      return;
    }
    return getCookie(process.env.REACT_APP_REDIRECT_TO_COOKIE);
  },
  async login(email, password, adminToken) {
    let res = await Fetch.post(
      `${process.env.REACT_APP_AUTH_API_URL}/bpauth/login`,
      {
        email,
        password,
        token: adminToken,
      },
      false,
    );

    if (res.status >= 200 && res.status < 300) {
      res = await res.json();
      if (adminToken) {
        setCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE, adminToken);
      }

      const { token } = res;
      this._token(token);

      return res;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async forgotPassword(email) {
    const res = await Fetch.post(`${this._url}/bpauth/forgot-password`, {
      email,
    });
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async resetPassword(payload) {
    const res = await Fetch.post(`${this._url}/bpauth/reset-password`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async verifyOtp(token, emailVerify = false) {
    const res = await Fetch.get(`${this._url}/bpauth/verify-otp?token=${token}&verify_email=${emailVerify}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async verifyOtpForgotPassword(token, email) {
    const res = await Fetch.get(`${this._url}/bpauth/verify-otp-forgot-password?token=${token}&email=${email}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getUser(adminToken = '') {
    const res = await Fetch.get(`${this._url}/bpauth/me?token=${adminToken}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      const redirectTo = () => {
        if (!data.isEmailVerified) {
          return 'verify-email';
        }
        if (!data.hasProfileCreated) {
          return 'create-profile';
        }
        if (data.status !== 'Active' && data.status !== 'Suspended') {
          return 'pending-approval';
        }
        // if (
        //   (data.status === 'Active' && !data?.paymentInfo?.order_id && data?.client_type === 'Prepaid') ||
        //   (data?.card_skipped === false &&
        //     data.status === 'Active' &&
        //     data?.client_type === 'Credit' &&
        //     !data?.paymentInfo?.order_id)
        // ) {
        //   return 'card-detail';
        // }

        return 'dashboard';
      };
      this._redirectTo(redirectTo());
      return { ...data, email: data.message.split(', ')[1].replace('!', '') };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async resendOtp() {
    const res = await Fetch.post(`${this._url}/bpauth/resend-otp`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
};

export default AuthService;
