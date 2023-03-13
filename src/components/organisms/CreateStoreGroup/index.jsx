import React, { useMemo, useEffect, useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Form, { useForm } from '../Form';
import Field from '../../molecules/Field';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Grid from '../../atoms/Grid';
import StoreService from '../../../services/storeService';
import { FieldHolder, BtnHolder } from './CreateStoreGroup.styles';
import Toast from '../../molecules/Toast';
import Loaders from '../../atoms/Loaders';
import { AuthContext } from '../../../context/authContext';

function CreateStoreGroup({ onClose, group }) {
  const { stores_data } = StoreService.GetStoresDashboard({
    searchText: '',
    page: 1,
    pageSize: 10,
    filterText: '',
    promotion: 'all',
    getAll: true,
    status: 'Active',
  });
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({});
  const [form] = useForm();
  const { storeOptions, start } = useMemo(() => {
    let stores = [];
    if (state?.stores?.find(item => item.value === 'all')) {
      stores.push({ value: 'all', label: 'All Stores' });
      stores = stores.concat(
        stores_data?.stores?.map(({ _id, name }) => ({
          label: name,
          value: _id,
          isDisabled: true,
        })),
      );
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
    return { storeOptions: stores, start: stores_data.stores.length ? '_' : '__' };
  }, [stores_data, state.stores]);
  const { refetch } = useContext(AuthContext);
  useEffect(() => {
    if (group?.stores) {
      const _ = {
        group_name: group.group_name,
        stores:
          storeOptions.length - 1 === group.stores.length
            ? [
                {
                  value: 'all',
                  label: 'All Stores',
                },
              ]
            : storeOptions.filter(({ value }) => group.stores.includes(value)),
      };
      form.setFieldsValue(_);
      setState(_);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [group?.stores, start]);
  const onSubmit = async values => {
    try {
      setLoading(true);
      if (group) {
        await StoreService.updateStoreGroups(group._id, {
          ...values,
          stores: state?.stores?.find(item => item.value === 'all')
            ? stores_data?.stores?.map(({ _id, name }) => ({
                label: name,
                value: _id,
              }))
            : values.stores,
        });
        Toast({
          type: 'success',
          message: 'Store Group Updated Successfully',
        });
      } else {
        await StoreService.createStoreGroups({
          ...values,
          stores: state?.stores?.find(item => item.value === 'all')
            ? stores_data?.stores?.map(({ _id, name }) => ({
                label: name,
                value: _id,
              }))
            : values.stores,
        });
        Toast({
          type: 'success',
          message: 'Store Group Created Successfully',
        });
      }
      refetch();
      onClose();
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      Toast({ type: 'error', message: ex.message });
    }
  };
  return (
    <Loaders loading={loading}>
      <Form
        form={form}
        onSubmit={onSubmit}
        onTouched={_ => {
          if (
            Object.keys(_).includes('stores') &&
            _?.stores?.length > 1 &&
            _?.stores?.find(item => item.value === 'all')
          ) {
            form.setFieldsValue({
              stores: [
                {
                  value: 'all',
                  label: 'All Stores',
                },
              ],
            });
          }
          setState(__ => ({ ...__, ..._ }));
        }}>
        <FieldHolder>
          <Grid xs={1} md={2} colGap={{ xs: 20, md: 28 }}>
            <Form.Item
              type="text"
              label="Group Name"
              name="group_name"
              placeholder="Group Name"
              rules={[
                { required: true, message: 'Group Name is required' },
                {
                  pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]*$/,
                  message: 'Enter a valid Group Name',
                },
                {
                  pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{3,}$/,
                  message: 'Group Name must be minimum 3 characters',
                },
                {
                  pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{2,100}$/,
                  message: 'Group Name must be maximum 100 characters',
                },
              ]}>
              <Field />
            </Form.Item>
            <Form.Item
              type="select"
              label="Select Store"
              name="stores"
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
          </Grid>
        </FieldHolder>

        <BtnHolder>
          <Button css="margin: 0 5px;" type="light" rounded sm width="150" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button loading={loading} css="margin: 0 5px;" type="primary" rounded sm width="150" htmlType="submit">
            {!group ? 'Create' : 'Update'}
          </Button>
        </BtnHolder>
      </Form>
    </Loaders>
  );
}

export default CreateStoreGroup;
