/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { Fetch } from '../helpers/fetchWaper';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const CampaignService = {
  _url: process.env.REACT_APP_BPCAMPAIGN_API_URL,
  // hooks
  GetMatricsStats(searchQuery) {
    const [metricsStats, setMetricsStats] = useState({
      group: 'year',
      total_impressions: 0,
      total_clicks: 0,
      total_conversions: 0,
      chart_data: {
        impressions: [],
        clicks: [],
        conversions: [],
      },
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getMatericsStats(searchQuery))
        .then(res => {
          setMetricsStats(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [searchQuery?.store, searchQuery?.promotion, searchQuery?.startDate, searchQuery?.endDate, searchQuery?.year]);
    return {
      metricsStats_loading: status === STATUS.LOADING,
      metricsStats_error: status === STATUS.ERROR ? status : '',
      metricsStats_data: metricsStats,
    };
  },
  GetPromotions(searchQuery, refetch) {
    const [promotions, setPromotions] = useState({
      promotions: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getPromotions(searchQuery))
        .then(res => {
          setPromotions(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery.page,
      searchQuery.pageSize,
      searchQuery.searchText,
      searchQuery.filterText,
      searchQuery.startDate,
      searchQuery.endDate,
      searchQuery.sortBy,
      searchQuery.sortOrder,
      refetch,
    ]);
    return {
      promotions_loading: status === STATUS.LOADING,
      promotions_error: status === STATUS.ERROR ? status : '',
      promotions_data: promotions,
    };
  },
  GetPromotion(id) {
    const [promotion, setPromotion] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getPromotion(id))
        .then(res => {
          setPromotion(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [id]);
    return {
      promotion_loading: status === STATUS.LOADING,
      promotion_error: status === STATUS.ERROR ? status : '',
      promotion_data: promotion,
    };
  },
  GetStatements(searchQuery) {
    const [statements, setStatements] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(
        this.getStatements(
          searchQuery?.page,
          searchQuery?.pageSize,
          searchQuery?.startDate,
          searchQuery?.endDate,
          searchQuery?.sortBy,
          searchQuery?.sortOrder,
        ),
      )
        .then(res => {
          setStatements(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery?.page,
      searchQuery?.pageSize,
      searchQuery?.startDate,
      searchQuery?.endDate,
      searchQuery?.sortBy,
      searchQuery?.sortOrder,
    ]);
    return {
      statements_loading: status === STATUS.LOADING,
      statements_error: status === STATUS.ERROR ? status : '',
      statements_data: statements,
    };
  },
  GetTransactions(searchQuery) {
    const [transactions, setTransactions] = useState({
      transactions: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getTransactions(searchQuery))
        .then(res => {
          setTransactions(() => res);

          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery?.page,
      searchQuery?.pageSize,
      searchQuery?.store,
      searchQuery?.promotion,
      searchQuery?.searchText,
      searchQuery?.startDate,
      searchQuery?.endDate,
      searchQuery?.sortBy,
      searchQuery?.sortOrder,
    ]);
    return {
      transactions_loading: status === STATUS.LOADING,
      transactions_error: status === STATUS.ERROR ? status : '',
      transactions_data: transactions,
    };
  },
  GetSingleStatement(id) {
    const [statement, setStatement] = useState();
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getSingleStatement(id))
        .then(res => {
          setStatement(res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [id]);
    return {
      statement_loading: status === STATUS.LOADING,
      statement_error: status === STATUS.ERROR ? status : '',
      statement_data: statement,
    };
  },
  GetReviews(searchQuery) {
    const [campaignsReviews, setCampaignsReviews] = useState({
      reviews: [],
      totalItems: 0,
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getCampaignsReviews(searchQuery))
        .then(res => {
          setCampaignsReviews(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [
      searchQuery?.promotion,
      searchQuery?.store,
      searchQuery?.page,
      searchQuery?.pageSize,
      searchQuery?.sortBy,
      searchQuery?.sortOrder,
    ]);
    return {
      campaignsReviews_loading: status === STATUS.LOADING,
      campaignsReviews_error: status === STATUS.ERROR ? status : '',
      campaignsReviews_data: campaignsReviews,
    };
  },
  GetDisputes(id) {
    const [disputes, setDisputes] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getDisputes(id))
        .then(res => {
          setDisputes(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [id]);
    return {
      disputes_loading: status === STATUS.LOADING,
      disputes_error: status === STATUS.ERROR ? status : '',
      disputes_data: disputes,
    };
  },
  GetStorePerformance(promotion) {
    const [stores_data, setStoresData] = useState([]);
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getStoresPerformance(promotion))
        .then(res => {
          setStoresData(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [promotion]);
    return {
      stores_loading: status === STATUS.LOADING,
      stores_error: status === STATUS.ERROR ? status : '',
      stores_data,
    };
  },
  GetRevenueStats(searchQuery) {
    const [revenueStats, setRevenueStats] = useState({
      group: 'year',
      total_transactions: 0,
      total_reward_points: 0,
      total_owed_to_plastk: 0,
      chart_data: {
        transactions: [],
        reward_points: [],
        owed_to_plastk: [],
      },
    });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getRevenueStats(searchQuery))
        .then(res => {
          setRevenueStats(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [searchQuery?.store, searchQuery?.promotion, searchQuery?.startDate, searchQuery?.endDate, searchQuery?.year]);
    return {
      revenueStats_loading: status === STATUS.LOADING,
      revenueStats_error: status === STATUS.ERROR ? status : '',
      revenueStats_data: revenueStats,
    };
  },
  GetPromotionsStoreNames(searchQuery) {
    const [promotionsStoreNames, setPromotionsStoreNames] = useState({ promotions: [], stores: [] });
    const { cancellablePromise } = useCancellablePromise();
    const [status, setStatus] = useState(STATUS.LOADING);
    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getPromotionsStoreNames(searchQuery))
        .then(res => {
          setPromotionsStoreNames(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => setStatus(STATUS.ERROR));
    }, [searchQuery?.promotion]);
    return {
      promotionsStoreNames_loading: status === STATUS.LOADING,
      promotionsStoreNames_error: status === STATUS.ERROR ? status : '',
      ...promotionsStoreNames,
    };
  },
  async getCampaignsReviews({ promotion, store, page, pageSize, sortBy, sortOrder = -1 }) {
    const res = await Fetch.get(
      `${
        this._url
      }/bpcampaign/get-reviews?campaign=${promotion}&store=${store}&page=${page}&pageSize=${pageSize}&sortBy=${
        sortBy ?? 'name'
      }&sortOrder=${sortOrder}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return {
        reviews: data.items,
        totalItems: data.totalItems,
      };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getPromotionsStoreNames({ promotion }) {
    const res = await Fetch.get(`${this._url}/bpcampaign/promotion-store-names?promotion=${promotion}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return {
        promotions: data.promotions,
        stores: data.stores,
      };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getRevenueStats({ store = '', promotion = '', startDate = '', endDate = '', year = false }) {
    const res = await Fetch.get(
      `${this._url}/bpcampaign/revenue-stats?store=${store}&promotion=${promotion}&startDate=${startDate}&endDate=${endDate}&year=${year}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getStoresPerformance(promotion) {
    const res = await Fetch.get(`${this._url}/bpcampaign/stores-performance?promotion=${promotion}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async createPromotion(promotion) {
    const res = await Fetch.post(`${this._url}/bpcampaign/create-campaign`, promotion);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async deletePromotion(id) {
    const res = await Fetch.delete(`${this._url}/bpcampaign/delete-campaign/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async stopPromotion(id) {
    const res = await Fetch.put(`${this._url}/bpcampaign/stop-campaign/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async updatePromotion(id, payload) {
    const res = await Fetch.put(`${this._url}/bpcampaign/update-campaign/${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getPromotions({ page, pageSize, searchText, filterText, startDate, endDate, sortBy, sortOrder = -1 }) {
    if (filterText === 'Completed' || filterText === 'Stopped') {
      // eslint-disable-next-line no-param-reassign
      filterText = 'Stopped';
    }
    const res = await Fetch.get(
      `${
        this._url
      }/bpcampaign/get-campaigns?page=${page}&itemsPerPage=${pageSize}&text=${searchText}&filter=${filterText}&startDate=${startDate}&endDate=${endDate}&sortBy=${
        sortBy ?? 'created_at'
      }&sortOrder=${sortOrder}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const { data } = await res.json();
      return {
        promotions: data.records.items.map(_ => ({
          ..._,
          conversions: data?.conversions?.find(__ => __.campaign_id === _._id)?.conversion ?? 0,
        })),
        totalItems: data.records.totalItems,
      };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getPromotion(id) {
    const res = await Fetch.get(`${this._url}/bpcampaign/get-campaign/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const { data } = await res.json();
      return {
        campaign: data?.campaign ?? {},
        transactions_data: data?.transactions_data?.[0] ?? {},
      };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getReviews(promotion, store) {
    const res = await Fetch.get(`${this._url}/get-reviews?campaign=${promotion ?? ''}&store=${store}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getStatements(page = 1, pageSize, startDate, endDate = '', sortBy, sortOrder = -1) {
    const res = await Fetch.get(
      `${this._url}/bpcampaign/get-statements?page=${page}&itemsPerPage=${pageSize}&startDate=${
        startDate ?? ''
      }&endDate=${endDate}&sortBy=${sortBy ?? 'created_at'}&sortOrder=${sortOrder}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getSingleStatement(id) {
    const res = await Fetch.get(`${this._url}/bpcampaign/get-statement/${id}`, {
      responseType: 'arraybuffer',
      responseEncoding: 'binary',
      method: 'GET',
    });
    if (res.status >= 200 && res.status < 300) {
      const data = await res?.arrayBuffer();

      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getMatericsStats({ store = '', promotion = '', startDate = '', endDate = '', year = true }) {
    const res = await Fetch.get(
      `${this._url}/bpcampaign/metrics-stats?store=${store}&promotion=${promotion}&startDate=${startDate}&endDate=${endDate}&year=${year}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getTransactions({
    store = '',
    promotion = '',
    page = 1,
    pageSize = 10,
    searchText = '',
    startDate = '',
    endDate = '',
    filterText = '',
    sortBy,
    sortOrder = -1,
  }) {
    const res = await Fetch.get(
      `${
        this._url
      }/bpcampaign/get-transactions-details?store=${store}&promotion=${promotion}&id=${promotion}&page=${page}&itemsPerPage=${pageSize}&searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&filterText=${filterText}&sortBy=${
        sortBy ?? 'created_at'
      }&sortOrder=${sortOrder}`,
    );
    if (res.status >= 200 && res.status < 300) {
      const { data } = await res.json();
      return {
        transactions: data.items,
        totalItems: data.totalItems,
      };
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  // settlement disputes api calls
  async createSettlement(id, payload) {
    const res = await Fetch.post(`${this._url}/bpcampaign/create-settlement?id=${id}`, payload);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getDisputes(id) {
    const res = await Fetch.get(`${this._url}/bpcampaign/get-settlements/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async deleteSettlement(id) {
    const res = await Fetch.delete(`${this._url}/bpcampaign/delete-settlement/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async checkStoresInOtherCampaigns({ stores, startDate, id = '', selected_stores = [] }) {
    const res = await Fetch.post(`${this._url}/bpcampaign/check-stores-for-already-existing-campaigns`, {
      stores,
      startDate,
      id,
      selected_stores,
    });
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();

    throw Error(message ?? 'Something went wrong');
  },
  async allowInitiaPromotion() {
    const res = await Fetch.post(`${this._url}/bpcampaign/allow-initial-promotion`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async activatePromotion(id) {
    const res = await Fetch.post(`${this._url}/bpcampaign/activate-promotion/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
};

export default CampaignService;
