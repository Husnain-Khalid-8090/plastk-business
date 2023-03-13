/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { Fetch } from '../helpers/fetchWaper';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const UserService = {
  _url: process.env.REACT_APP_BPUSER_API_URL,

  GetStoreUsers(searchQuery = {}, refetch) {
    const [storeUsers, setStoreUsers] = useState({
      store_users: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getStoreUsers({ ...searchQuery, refetch }))
        .then(res => {
          setStoreUsers(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery?.page,
      searchQuery?.pageSize,
      searchQuery?.searchText,
      searchQuery?.getAll,
      searchQuery?.sortBy,
      searchQuery?.sortOrder,
      refetch,
    ]);
    return {
      user_loading: status === STATUS.LOADING,
      user_error: status === STATUS.ERROR,
      user_data: storeUsers,
    };
  },

  GetPaymentHistory(searchQuery) {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getPaymentHistory(searchQuery))
        .then(res => {
          setPaymentHistory(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery?.page,
      searchQuery?.pageSize,
      searchQuery?.searchText,
      searchQuery?.sortBy,
      searchQuery?.sortOrder,
      searchQuery?.filterText,
    ]);
    return {
      history_loading: status === STATUS.LOADING,
      history_error: status === STATUS.ERROR,
      history_data: paymentHistory,
    };
  },

  GetAccountDetails() {
    const [accountDetails, setAccountDetails] = useState({});
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getAccountDetails())
        .then(res => {
          setAccountDetails(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, []);
    return {
      account_loading: status === STATUS.LOADING,
      account_error: status === STATUS.ERROR,
      account_data: accountDetails,
    };
  },
  async signUp({ email, password }) {
    const res = await Fetch.post(`${this._url}/bpuser/sign-up`, { email, password });
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async updateProfile(payload) {
    const res = await Fetch.put(`${this._url}/bpuser/update-profile`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async updateBannerImage(payload) {
    const res = await Fetch.put(`${this._url}/bpuser/update-banner-image`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getBPUser() {
    const res = await Fetch.post(`${this._url}/bpuser/businees-user-by-id`, {});
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async createProfile(payload) {
    const res = await Fetch.post(`${this._url}/bpuser/create-profile`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  // store user calls
  async createStoreUser(payload) {
    const res = await Fetch.post(`${this._url}/bpuser/create-store-user`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getStoreUsers({ page, pageSize, searchText, sortBy, sortOrder = -1 }) {
    const res = await Fetch.get(
      `${this._url}/bpuser/get-store-user?page=${page}&itemsPerPage=${pageSize}&text=${searchText}&sortBy=${
        sortBy ?? 'created_at'
      }&sortOrder=${sortOrder}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const { paginatedData: data } = await res.json();
      return { store_users: data.items, totalItems: data?.totalItems ?? 0 };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async deletStoreUser(id) {
    const res = await Fetch.delete(`${this._url}/bpuser/delete-store-user/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async updateStoreUser(payload) {
    const res = await Fetch.put(`${this._url}/bpuser/update-store-user`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async rechargeAccount(payload) {
    const res = await Fetch.post(`${this._url}/bpuser/recharge-account`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async payInvoiceInterac(payload, id) {
    const res = await Fetch.post(`${this._url}/bpuser/pay-invoice-interac/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getPaymentHistory({ page = 1, pageSize = 10, searchText, sortBy, sortOrder = -1, filterText = '' }) {
    const res = await Fetch.get(
      `${this._url}/bpuser/get-payment-history?page=${page}&itemsPerPage=${pageSize}&text=${searchText}&sortBy=${
        sortBy ?? 'created_at'
      }&sortOrder=${sortOrder}&type=${filterText}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async updateCardDetails(payload) {
    const res = await Fetch.put(`${this._url}/bpuser/update-card-details`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async rechargeAccountWithCard(payload) {
    const res = await Fetch.post(`${this._url}/bpuser/recharge-account-with-card`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async skipCardDetailProcess() {
    const res = await Fetch.post(`${this._url}/bpuser/skip-card-detail-process`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async payInvoiceWithCard(payload, id) {
    const res = await Fetch.post(`${this._url}/bpuser/pay-invoice-card/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getAccountDetails() {
    const res = await Fetch.get(`${this._url}/bpuser/account-details`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getBanner() {
    const res = await Fetch.get(`${this._url}/bpuser/get-banner`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
};

export default UserService;
