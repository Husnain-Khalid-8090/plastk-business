/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { Fetch } from '../helpers/fetchWaper';
import { useCancellablePromise } from '../helpers/promiseHandler';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
const CategoryService = {
  _url: process.env.REACT_APP_CATEGORIES_API_URL,
  GetCategories() {
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState(STATUS.LOADING);
    const { cancellablePromise } = useCancellablePromise();

    useEffect(() => {
      setStatus(STATUS.LOADING);
      cancellablePromise(this.getCategories())
        .then(res => {
          setCategories(() => res);
          setStatus(STATUS.SUCCESS);
        })
        .catch(() => {
          setStatus(STATUS.ERROR);
        });
    }, []);
    return {
      categories_loading: status === STATUS.LOADING,
      categories_error: status === STATUS.ERROR,
      categories_data: categories,
    };
  },
  GetSubCategories(categoryId) {
    const [subCategories, setSubCategories] = useState([]);
    const [status, setStatus] = useState(STATUS.LOADING);
    const { cancellablePromise } = useCancellablePromise();

    useEffect(() => {
      if (categoryId)
        cancellablePromise(this.getSubCategoryByParentId(categoryId))
          .then(res => {
            setSubCategories(() => res);
            setStatus(STATUS.SUCCESS);
          })
          .catch(() => {
            setStatus(STATUS.ERROR);
          });
    }, [categoryId]);
    return {
      sub_categories_loading: status === STATUS.LOADING,
      sub_categories_error: status === STATUS.ERROR,
      sub_categories_data: subCategories,
    };
  },

  async getCategories() {
    const res = await Fetch.get(`${this._url}/bpcategories/category/get`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data.data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
  async getSubCategoryByParentId(id) {
    const res = await Fetch.get(`${this._url}/bpcategories/sub-category/by-parent/${id}`);
    if (res.status >= 200 && res.status < 300) {
      const data = await res.json();
      return data.data;
    }
    const { message } = await res.json();
    throw Error(message ?? 'Something went wrong');
  },
};

export default CategoryService;
