/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { Fetch } from '../helpers/fetchWaper';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const StoreService = {
  _url: process.env.REACT_APP_BPSTORE_API_URL,
  // hooks
  GetStores(page = 1, pageSize = 5, searchQuery, refetch) {
    const [stores, setStores] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(
      () => {
        setStatus(STATUS.LOADING);
        cancellablePromise(this.getStores(page, pageSize, searchQuery))
          .then(res => {
            setStores(res);
            setStatus(STATUS.SUCCESS);
          })
          .catch(() => setStatus(STATUS.ERROR));
      },
      [
        // page,
        // pageSize,
        // searchQuery?.searchText,
        // refetch,
        // searchQuery?.getAll,
        // searchQuery?.sortBy,
        // searchQuery?.sortOrder,
        // searchQuery?.filterText,
        // searchQuery?.store_type,
      ],
    );
    return {
      stores_loading: status === STATUS.LOADING,
      stores_error: status === STATUS.ERROR ? status : '',
      stores_data: stores,
    };
  },

  GetSingleStore(storeId) {
    const [store, setStore] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getSingleStore(storeId))
        .then(res => {
          setStore(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [storeId]);
    return {
      store_loading: status === STATUS.LOADING,
      store_error: status === STATUS.ERROR ? status : '',
      store_data: store,
    };
  },

  GetStoresDashboard(searchQuery) {
    const [stores, setStores] = useState({
      stores: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(
        this.getStoresDashboard(
          searchQuery?.page,
          searchQuery?.pageSize,
          searchQuery?.searchText,
          searchQuery?.promotion,
          searchQuery?.getAll,
          searchQuery?.status,
        ),
      )
        .then(res => {
          setStores(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery?.page,
      searchQuery?.pageSize,
      searchQuery?.searchText,
      searchQuery?.promotion,
      searchQuery?.getAll,
      searchQuery?.status,
    ]);
    return {
      stores_loading: status === STATUS.LOADING,
      stores_error: status === STATUS.ERROR ? status : '',
      stores_data: stores,
    };
  },

  GetStoreGroups(searchQuery, refetch) {
    const [storeGroups, setStoreGroups] = useState({ store_groups: [], totalItems: 0 });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(
        this.getStoreGroups(
          searchQuery?.page,
          searchQuery?.pageSize,
          searchQuery?.searchText,
          searchQuery?.filterText,
          searchQuery?.getAll,
          searchQuery?.sortBy,
          searchQuery?.sortOrder,
          searchQuery?.filterText,
        ),
      )
        .then(res => {
          setStoreGroups(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery?.page,
      searchQuery?.pageSize,
      searchQuery?.searchText,
      searchQuery?.filterText,
      searchQuery?.getAll,
      searchQuery?.sortBy,
      searchQuery?.sortOrder,

      refetch,
    ]);
    return {
      storeGroups_loading: status === STATUS.LOADING,
      storeGroups_error: status === STATUS.ERROR ? status : '',
      storeGroups_data: storeGroups,
    };
  },
  GetStoreGroupDetails(id) {
    const [storeGroup, setStoreGroup] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getStoreGroupDetails(id))
        .then(res => {
          setStoreGroup(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [id]);
    return {
      storeGroup_loading: status === STATUS.LOADING,
      storeGroup_error: status === STATUS.ERROR ? status : '',
      storeGroup_data: storeGroup,
    };
  },
  GetStoreDetails(id) {
    const [status, setStatus] = useState(STATUS.LOADING);
    const [store, setStore] = useState({});
    useEffect(() => {
      setStatus(STATUS.LOADING);
      this.getStoreDetails(id)
        .then(res => {
          setStore(() => ({ ...res, ...res?.details_from_google }));
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, []);
    return {
      store_loading: status === STATUS.LOADING,
      store_error: status === STATUS.ERROR ? status : '',
      store,
    };
  },

  GetStoreVerifications(searchQuery, refetch) {
    const [status, setStatus] = useState(STATUS.LOADING);
    const [storeVerifications, setStoreVerifications] = useState([]);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      this.getStoreVerifications(searchQuery)
        .then(res => {
          setStoreVerifications(() => res?.records);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [refetch]);
    return {
      storeVerifications_loading: status === STATUS.LOADING,
      storeVerifications_error: status === STATUS.ERROR ? status : '',
      storeVerifications,
    };
  },

  // api calls
  async createStore(newStore) {
    const res = await Fetch.post(`${this._url}/bpstore/create-store`, newStore);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async deActivateStore(id) {
    const res = await Fetch.put(`${this._url}/bpstore/deactivate-store/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async activateStore(id) {
    const res = await Fetch.put(`${this._url}/bpstore/activate-store/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async getMerchantDetails(id) {
    const res = await Fetch.get(`${this._url}/bpstore/get-merchant-details?reference_no=${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async verifyStore(id, payload) {
    const res = await Fetch.put(`${this._url}/bpstore/verify-store/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async updateStore(id, updatedStore) {
    const res = await Fetch.put(`${this._url}/bpstore/update-store/${id}`, updatedStore);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async updateMenu(id, payload) {
    const res = await Fetch.put(`${this._url}/bpstore/update-menu/${id}`, {
      menuBase64: payload?.menuBase64,
      menuType: payload?.menuType,
    });
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getSingleStoreData(id) {
    const res = await Fetch.get(`${this._url}/bpstore/single-store-details/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getStores(page, pageSize, { searchText, filterText, getAll = false, sortBy, sortOrder = -1, store_type = '' }) {
    const res = await Fetch.get(
      `${
        this._url
      }/bpstore/get-store?page=${page}&itemsPerPage=${pageSize}&text=${searchText}&filterText=${filterText}&getAll=${getAll}&sortBy=${
        sortBy ?? 'created_at'
      }&sortOrder=${sortOrder}&storeType=${store_type}`,
    );
    if (res.status >= 200 && res.status < 309) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async getStoresDashboard(
    page = 1,
    itemsPerPage = 10,
    searchText = '',
    promotion = 'all',
    getAll = 'false',
    status = '',
  ) {
    const res = await Fetch.get(
      `${this._url}/bpstore/get-stores-dashboard?page=${page}&itemsPerPage=${itemsPerPage}&searchText=${searchText}&campaign=${promotion}&getAll=${getAll}&status=${status}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const { data } = await res.json();
      return {
        stores: data.items,
        totalItems: data.totalItems,
      };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async closeStoreReq(id, reason) {
    const res = await Fetch.post(`${this._url}/bpstore/close-store-req/${id}`, { reason });
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  /**
   * --------------------- Store Group Section Start -------------------------
   */
  async getStoreGroups(
    page = 1,
    pageSize = 10,
    searchText = '',
    filterText = '',
    getAll = 'false',
    sortBy,
    sortOrder = -1,
  ) {
    const res = await Fetch.get(
      `${
        this._url
      }/bpstore/store-groups?page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&filterText=${filterText}&getAll=${getAll}&sortBy=${
        sortBy ?? 'created_at'
      }&sortOrder=${sortOrder}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return { store_groups: data.items, totalItems: data.totalItems };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async updateStoreGroups(id, payload) {
    const res = await Fetch.put(`${this._url}/bpstore/store-groups/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },

  async createStoreGroups(payload) {
    const res = await Fetch.post(`${this._url}/bpstore/store-groups`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async deleteStoreGroups(id) {
    const res = await Fetch.delete(`${this._url}/bpstore/store-groups/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getStoreGroupDetails(id) {
    const res = await Fetch.get(`${this._url}/bpstore/store-groups/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  /**
   * Extra
   */
  async getImageFromPlaceId(placeId) {
    const res = await Fetch.get(`${this._url}/bpstore/get-store-image?placeid=${placeId}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getStoreDetails(id) {
    const res = await Fetch.get(`${this._url}/bpstore/single-store-details/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getStoreVerifications({ id, page, itemsPerPage }) {
    const res = await Fetch.get(
      `${this._url}/bpstore/store-verifications/${id}?page=${page}&itemsPerPage=${itemsPerPage}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
};

export default StoreService;
