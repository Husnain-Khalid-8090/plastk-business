/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Form, { useForm } from '../Form';
import Field from '../../molecules/Field';
// import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Grid from '../../atoms/Grid';
import Select from '../../atoms/Select';

import { FieldHolder, BtnHolder } from './AddStoreManager.styles';
import StoreService from '../../../services/storeService';
import userService from '../../../services/userService';
import Toast from '../../molecules/Toast';
import Loaders from '../../atoms/Loaders';
import { AuthContext } from '../../../context/authContext';
import ConfirmationDialogueModal from '../ConfirmationDialogueModal';
import ModalContainer from '../../molecules/ModalContainer';

function AddStoreManager({ onClose, manager }) {
  const { user, refetch } = useContext(AuthContext);
  const [state, setState] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { stores_data } = StoreService.GetStoresDashboard({
    searchText: '',
    page: 1,
    pageSize: 10,
    filterText: '',
    promotion: 'all',
    getAll: true,
    status: 'Active',
  });
  const [initial_loading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const { storeOptions, start } = useMemo(() => {
    let stores = [];
    if (stores_data?.stores?.length) {
      if (state?.selected_stores?.find(item => item.value === 'all')) {
        stores.push({ value: 'all', label: 'All Stores' });
        stores = stores.concat(
          stores_data?.stores?.map(({ _id, name }) => ({
            label: name,
            value: _id,
            isDisabled: true,
          })),
        );
      } else if (state?.selected_stores?.length) {
        stores = stores.concat(
          stores_data?.stores?.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
        );
        stores.unshift({
          value: 'all',
          label: 'All Stores',
          isDisabled: true,
        });
      } else {
        stores = stores.concat(
          stores_data?.stores?.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
        );
        stores.unshift({
          value: 'all',
          label: 'All Stores',
        });
      }
    }
    return { storeOptions: stores, start: stores_data.stores.length ? '_' : '__' };
  }, [stores_data, state?.selected_stores]);

  useEffect(() => {
    if (manager) {
      const _ = {
        selected_stores: manager?.all_stores_selected
          ? [{ value: 'all', label: 'All Stores' }]
          : storeOptions.filter(({ value }) => manager.stores.includes(value)),

        permission: { value: manager.permission, label: manager.permission },
        first_name: manager.first_name,
        last_name: manager.last_name,
        email: manager.login_info?.email,
        middle_name: manager.middle_name,
      };

      form.setFieldsValue(_);
      setInitialLoading(false);
    } else {
      setInitialLoading(false);
      if (!showModal) {
        setTimeout(() => {
          form.setFieldsValue({
            email: '',
            password: '',
          });
          form.setFieldsError({ email: undefined, password: undefined });
        }, 900);
      }
    }
  }, [start, manager]);

  const getSelectedStores = selected => {
    if (selected.length > 0) {
      if (selected[0].value === 'all') {
        return [];
      }
      return selected.map(({ value }) => value);
    }
    return [];
  };

  const getPayload = values => {
    const payload = {
      ...values,
      store_ids: getSelectedStores(values.selected_stores),
      all_stores_selected: !!values.selected_stores.find(item => item.value === 'all'),
      permission: values?.permission?.value,
      user_id: user?.role === 'store_user' ? user?.businessId : manager ? manager._id : user._id,
    };
    delete payload?.selected_stores;

    return payload;
  };

  const onSubmit = async values => {
    setLoading(true);
    try {
      if (manager) {
        await userService.updateStoreUser(getPayload(values));
        Toast({
          type: 'success',
          message: 'Store Manager Updated Successfully',
        });
        setLoading(false);
        onClose();
        refetch();
      } else {
        setLoading(false);
        setShowModal(true);
      }
    } catch (ex) {
      setLoading(false);
      Toast({ type: 'error', message: ex.message });
    }
  };
  const selectPermission = [
    { value: 'Full Access', label: 'Full Access' },
    { value: 'Read Only', label: 'Read Only' },
  ];
  const onOk = async () => {
    setLoading(true);
    await userService
      .createStoreUser(getPayload(form.getFieldsValue()))
      .then(() => {
        Toast({
          type: 'success',
          message: 'Store Manager Created Successfully',
        });
        refetch();
        onClose();
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setShowModal(false);

        Toast({ type: 'error', message: err.message });
      });
  };
  const ConfirmationModal = () => (
    <>
      <ModalContainer
        isOpen
        title="Grant Access"
        isClosable={false}
        width="900"
        content={({ onClose }) => (
          <ConfirmationDialogueModal
            onClose={() => {
              onClose();
              setShowModal(false);
            }}
            text={`You are about to
                 give  ${
                   form.getFieldValue('permission')?.value === 'Read Only' ? 'Read Only Access' : 'Full Access'
                 } to ${form.getFieldValue('email')}. Would you like to continue?`}
            btn={
              <Button
                type="danger"
                onClick={() => {
                  onClose();
                  onOk();
                }}
                loading={loading}>
                Continue
              </Button>
            }
          />
        )}
      />
    </>
  );
  return (
    <>
      <Loaders loading={initial_loading}>
        <Form
          form={form}
          onSubmit={onSubmit}
          onTouched={_ => {
            setState(__ => ({ ...__, ..._ }));
          }}>
          <FieldHolder>
            <Grid xs={1} md={2} colGap={{ xs: 20, md: 28 }}>
              <div>
                <Form.Item
                  type="text"
                  label="First Name"
                  name="first_name"
                  placeholder="First Name"
                  rules={[
                    { required: true, message: 'First Name is required' },
                    {
                      pattern: /^[a-zA-Z ]*$/,
                      message: 'Enter a valid First Name',
                    },
                    {
                      pattern: /^.{3,}$/,
                      message: 'First Name must be minimum 3 characters',
                    },
                    {
                      pattern: /^.{3,40}$/,
                      message: 'First Name must be maximum 40 characters',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="text"
                  label="Middle Name"
                  name="middle_name"
                  placeholder="Middle Name"
                  rules={[
                    { required: false },
                    {
                      pattern: /^[a-zA-Z ]*$/,
                      message: 'Enter a valid Middle Name',
                    },
                    {
                      pattern: /^.{3,}$/,
                      message: 'Middle Name must be minimum 3 characters',
                    },
                    {
                      pattern: /^.{3,40}$/,
                      message: 'Middle Name must be maximum 40 characters',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="text"
                  label="Last Name"
                  name="last_name"
                  placeholder="Last Name"
                  rules={[
                    { required: true, message: 'Last Name is required' },
                    {
                      pattern: /^[a-zA-Z ]*$/,
                      message: 'Enter a valid Last Name',
                    },
                    {
                      pattern: /^.{3,}$/,
                      message: 'Last Name must be minimum 3 characters',
                    },
                    {
                      pattern: /^.{3,40}$/,
                      message: 'Last Name must be maximum 40 characters',
                    },
                  ]}>
                  <Field />
                </Form.Item>

                <Form.Item
                  type="select"
                  name="permission"
                  label="Permissions Level"
                  options={selectPermission}
                  placeholder="Select One"
                  rules={[{ required: true, message: 'Permissions level is required' }]}>
                  <Select />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  type="select"
                  label="Select a Store"
                  name="selected_stores"
                  isMulti
                  hideSelectedOptions={false}
                  closeMenuOnSelect={false}
                  options={storeOptions}
                  placeholder="Select Store"
                  rules={[
                    { required: true, message: 'Select atleast one store' },
                    {
                      transform: value => !value?.length,
                      message: 'Select at least one store',
                    },
                  ]}>
                  <Select />
                </Form.Item>
                <Form.Item
                  type="email"
                  label="Email Address"
                  name="email"
                  placeholder="Email"
                  rules={[
                    { required: true },
                    {
                      pattern: /^.{0,264}$/,
                      message: 'Maximum Character Limit Is 264',
                    },
                    { email: true },
                  ]}>
                  <Field />
                </Form.Item>
                {!manager && (
                  <Form.Item
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Password"
                    rules={[
                      { required: true },
                      {
                        pattern: /^.{0,64}$/,
                        message: 'Last Name must be maximum 64 characters',
                      },
                      {
                        password: true,
                      },
                    ]}>
                    <Field />
                  </Form.Item>
                )}
                <Form.Item
                  type="password"
                  label="Confirm Password"
                  name="password"
                  placeholder="Password"
                  rules={[
                    { required: true },
                    {
                      pattern: /^.{0,64}$/,
                      message: 'Last Name must be maximum 64 characters',
                    },
                    {
                      password: true,
                    },
                  ]}>
                  <Field />
                </Form.Item>
              </div>
            </Grid>
          </FieldHolder>

          <BtnHolder>
            <Button css="margin: 0 5px;" type="light" rounded sm width="150" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button loading={loading} css="margin: 0 5px;" type="primary" rounded sm width="150" htmlType="submit">
              {!manager ? 'Create' : 'Update'}
            </Button>
          </BtnHolder>
        </Form>
      </Loaders>
      {showModal && ConfirmationModal()}
    </>
  );
}

export default AddStoreManager;
