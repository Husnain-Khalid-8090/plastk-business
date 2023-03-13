/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

import Form from '../Form';
import Heading from '../../atoms/Heading';
import Button from '../../atoms/Button';
import SubTitle from '../../atoms/SubTitle';
import Field from '../../molecules/Field';
import TitleHead from '../../molecules/TitleHead';
import Select from '../../atoms/Select';
import CategoryService from '../../../services/categoryService';
import GoogleLocationSelector from '../GoogleLocationSelector';
import Tooltip from '../../atoms/Tooltip';
import { BtnWraper } from './CreateBusinessStepThree.styles';
import ModalContainer from '../../molecules/ModalContainer';
import Link from '../../atoms/Link';
import TermConditionModal from '../TermConditionModal';

const CreateBusinessStepThree = ({ setStep, loading, form, state }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);

  const store_types = [
    { label: 'Online', value: 'online' },
    { label: 'In Store', value: 'in_store' },
  ];
  const { categories_data, categories_loading } = CategoryService.GetCategories();
  const { categories } = useMemo(
    () => ({
      categories: categories_data.map(x => ({ label: x.category_name, value: x._id })),
    }),
    [categories_data],
  );

  const handleSameAddress = () => {
    form.setFieldsValue({
      store_address: form.getFieldValue('address'),
      store_name: form.getFieldValue('business_name'),
      isSameBusiness: true,
      isSameName: true,
    });
  };
  const getSubCategory = categoryId => {
    setSubCategoryLoading(true);
    CategoryService.getSubCategoryByParentId(categoryId)
      .then(res => {
        const data = res?.map(subCategory => ({ value: subCategory?._id, label: subCategory?.sub_category_name }));
        setSubCategories(data);
        form.setFieldsValue({
          sub_category: {
            value: data[0]?.value,
            label: data.filter(({ value }) => value === data[0].value)[0]?.label,
          },
        });
        setSubCategoryLoading(false);
      })
      .catch(() => {
        setSubCategories([]);
        setSubCategoryLoading(false);
      });
  };

  const handleSubCategory = ({ target: { value } }) => {
    form.setFieldsValue({
      sub_category: {
        value: value?.value,
        label: value?.label,
      },
    });
  };
  const handleCategory = ({ target }) => {
    form.setFieldsValue({
      category: {
        value: target.value?.value,
        label: target.value?.label,
      },
    });
    const id = target.value.value;
    getSubCategory(id);
  };
  const handleStoreAddress = ({ target: { value } }) => {
    form.setFieldsValue({
      store_address: value,
    });
  };
  return (
    <>
      <TitleHead backBtn signOutBtn onBackClick={() => setStep(2)} />
      <Heading level={1}>Create Store</Heading>
      <SubTitle>
        <span className="text">Please enter the following information for your store!</span>
      </SubTitle>
      {state?.store_type?.value === 'in_store' && (
        <BtnWraper>
          <Tooltip title="Set store name and address same as business">
            <Button type="primary" xs width={150} onClick={handleSameAddress}>
              Same as business
            </Button>
          </Tooltip>
        </BtnWraper>
      )}
      <Form.Item
        type="select"
        label="Store Type"
        name="store_type"
        options={store_types}
        placeholder="Select Type"
        rules={[{ required: true, message: 'Store Type is required' }]}>
        <Select />
      </Form.Item>
      <Form.Item
        type="text"
        label="Store Name"
        name="store_name"
        placeholder="Store Name"
        rules={[
          { required: true, message: 'Store Name is required' },
          {
            pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]*$/,
            message: 'Store Name only allows letters, numbers, and special characters',
          },
          {
            pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{2,}$/,
            message: 'Store Name must be minimum 2 characters',
          },
          {
            pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{2,100}$/,
            message: 'Store Name must be maximum 100 characters',
          },
        ]}>
        <Field />
      </Form.Item>
      {state?.store_type?.value === 'in_store' && (
        <Form.Item
          type="text"
          label="Store address"
          name="store_address"
          placeholder="Store Address"
          onChange={handleStoreAddress}
          rules={[{ required: true, message: 'Store Address is required' }]}>
          <GoogleLocationSelector name="address" />
        </Form.Item>
      )}
      {state?.store_type?.value === 'online' && (
        <Form.Item
          type="text"
          label="Website Link"
          name="website"
          placeholder="https://www.google.com"
          rules={[
            { required: true, message: 'Website link is required' },
            {
              pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
              message: 'Please enter a valid url',
            },
            {
              pattern: /^(?=.{6,80}$)(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]$/,
              message: 'url length should be less than 80',
            },
          ]}>
          <Field />
        </Form.Item>
      )}
      <Form.Item
        type="text"
        allowSearch
        loading={categories_loading}
        label="Category"
        options={categories}
        onChange={handleCategory}
        name="category"
        placeholder="Category"
        rules={[{ required: true, message: 'Category is required' }]}>
        <Select />
      </Form.Item>
      <Form.Item
        type="text"
        allowSearch
        loading={subCategoryLoading}
        options={subCategories}
        onChange={handleSubCategory}
        label="Sub-Category"
        name="sub_category"
        placeholder="Sub-Category"
        rules={[
          { required: true, message: 'Sub-Category is required' },
          {
            pattern: /^[a-zA-Z0-9 ]*$/,
            message: 'Sub-Category is required',
          },
        ]}>
        <Select />
      </Form.Item>

      <div
        css={`
          position: relative;
          margin-bottom: 20px;
        `}>
        <Form.Item
          type="checkbox"
          checked={form.getFieldValue('readandagree')}
          label="I read and agree to the "
          name="readandagree"
          noMargin
          rules={[{ required: true, message: 'Please Check the Terms and Conditions' }]}>
          <Field />
        </Form.Item>
        <div
          css={`
            position: absolute;
            left: 194px;
            top: 1px;
          `}>
          <ModalContainer
            title="Terms & Conditions"
            width={900}
            btnComponent={({ onClick }) => (
              <Link
                css="margin-left: 3px;"
                onClick={() => {
                  onClick();
                }}>
                {' '}
                Terms & Conditions.
              </Link>
            )}
            content={({ onClose }) => <TermConditionModal onClose={onClose} form={form} />}
          />
        </div>
      </div>
      <Button
        loading={loading}
        type="primary"
        htmlType="submit"
        rounded
        sm
        width={155}
        css={`
          margin: 0 auto 1.25rem;
          @media (min-width: 768px) {
            margin-bottom: 2.125rem;
          }
        `}>
        Submit
      </Button>
    </>
  );
};

export default CreateBusinessStepThree;
