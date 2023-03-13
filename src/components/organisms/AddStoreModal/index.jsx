/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useMemo, useRef, useCallback, useEffect, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Form, { useForm } from '../Form';
import Field from '../../molecules/Field';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Grid from '../../atoms/Grid';
import Img01 from '../../../assets/images/prototype-img1.png';
import Toast from '../../molecules/Toast';
import GoogleMap from '../GoogleMap';
import PlacesAutoComplete from '../PlacesAutoComplete';
import storesService from '../../../services/storeService';
import { GeoCode } from '../../../helpers/common';

import {
  Holder,
  ImgColumn,
  ImgBox,
  MapColumn,
  MapHolder,
  RadioWrap,
  FieldHolder,
  BtnHolder,
  FileBtnHolder,
  MapSection,
  UploadMenu,
  ImgCol,
} from './AddStoreModal.style';
import CategoryService from '../../../services/categoryService';
import ChooseFile from '../../atoms/ChooseFile';
import { AuthContext } from '../../../context/authContext';
import Loaders from '../../atoms/Loaders';

function AddStoreModal({ onClose, store }) {
  const [form] = useForm();
  const [subCategories, setSubCategories] = useState([]);
  const { categories_data, categories_loading } = CategoryService.GetCategories();
  const [loading, setLoading] = useState(false);
  const map = useRef(null);
  const [marker, setMarker] = useState({});
  const [address, setAddress] = useState({});
  const [mapValue] = useState({});
  const { refetch, setShowStoreModal } = useContext(AuthContext);
  const [addressError, setAddressError] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [reRender, setReRender] = useState(false);
  const { categories } = useMemo(
    () => ({
      categories: categories_data.map(x => ({ label: x.category_name, value: x._id })),
    }),
    [categories_data],
  );
  const store_types = [
    { label: 'Online', value: 'online' },
    { label: 'In Store', value: 'in_store' },
  ];
  const getSubCategory = categoryId => {
    CategoryService.getSubCategoryByParentId(categoryId)
      .then(res => {
        const data = res?.map(subCategory => ({ value: subCategory?._id, label: subCategory?.sub_category_name }));
        setSubCategories(data);
        if (store) {
          form.setFieldsValue({
            sub_category: data?.filter(({ value }) => store?.store_category?.sub_category_id?.includes(value))[0],
          });
        }
        form.setFieldsValue({
          sub_category: {
            value: data[0]?.value,
            label: data.filter(({ value }) => value === data[0].value)[0]?.label,
          },
        });
      })
      .catch(() => setSubCategories([]));
  };

  useEffect(() => {
    if (store) {
      form.setFieldsValue({
        name: store?.name,
        store_contact_person: store?.store_contact_person,
        contact: store?.contact,
        store_type:
          store.store_type === 'online'
            ? { label: 'Online', value: 'online' }
            : { label: 'In Store', value: 'in_store' },
      });
      if (categories?.length) {
        form.setFieldsValue({
          category: categories.filter(({ value }) => store?.store_category?.category_id?.includes(value))[0],
        });
        getSubCategory(store?.store_category?.category_id);
        if (store?.store_type && store?.store_type !== 'online') {
          GeoCode({ placeId: store?.address?.place_id })
            .then(res => {
              setMarker(res.latlng);
              setAddress(res);
              map.current.panTo(res.latlng);
              onChange({ target: { value: { ...res, image: store?.image_url }, name: 'store address' } });
            })
            .catch(() => {
              Toast({
                type: 'warning',
                message: 'Please Select A Valid Location',
              });
            });
        } else {
          form.setFieldsValue({ website: store.website });
        }
      }
    }
  }, [categories]);

  useEffect(() => {
    if (!store) {
      form.setFieldsValue({ store_type: { label: 'In Store', value: 'in_store' } });
    }
  }, []);

  useEffect(() => {
    if (form.getFieldsValue()?.store_type?.value === 'online') {
      if (store && store?.website) {
        form.setFieldsValue({ website: store.website });
      }
    }
  }, [form.getFieldsValue()?.store_type?.value]);
  const onChange = ({ target: { value } }) => {
    if (value?.place_id) {
      setAddressError('');
    }
    form.setFieldsValue({
      address: value,
    });
    setBtnDisabled(false);
  };

  const onLoad = useCallback(_ => {
    map.current = _;
  }, []);
  const onUnmount = useCallback(() => {
    map.current = null;
  }, []);
  const handleInputChange = useCallback(
    _ => {
      setBtnDisabled(true);
      setAddress(_.target.value);
      setMarker({ ..._.target.value.latlng });
      map.current.panTo({ ..._.target.value.latlng });
      onChange({ target: { name: _.target.name, value: { ..._.target.value } } });
    },
    [onChange],
  );
  const handleMapClick = React.useCallback(
    ({ placeId }) => {
      setBtnDisabled(true);
      if (!placeId) {
        Toast({
          type: 'warning',
          message: 'Please Select A Valid Location',
        });
        setBtnDisabled(false);

        return;
      }
      GeoCode({
        placeId,
      })
        .then(res => {
          setMarker(res.latlng);
          setAddress(res);
          map.current.panTo(res.latlng);
          onChange({ target: { value: { ...res }, name: 'store address' } });
        })
        .catch(() => {
          setBtnDisabled(false);
          Toast({
            type: 'warning',
            message: 'Please Select A Valid Location',
          });
        });
    },
    [onChange],
  );

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
  const handleSubCategory = ({ target: { value } }) => {
    form.setFieldsValue({
      sub_category: {
        value: value?.value,
        label: value?.label,
      },
    });
  };

  const onSubmit = e => {
    const { store_type } = form.getFieldsValue();
    setLoading(true);
    const errors = Object.values(form.validateFields()).filter(X => X?.hasError);
    if (errors.length) {
      setLoading(false);
      return;
    }
    if (store_type.value === 'in_store' && !Object.keys(address).length) {
      setAddressError('Please Select A Location');
      setLoading(false);
      return;
    }

    const payload = {
      ...e,
      store_type: e?.store_type?.value,
      category: e?.category?.value,
      sub_category: e?.sub_category?.value,
    };

    if (store) {
      if (payload?.store_type === 'online') {
        delete payload?.address;
      }
      storesService
        .updateStore(store._id, payload)
        .then(res => {
          setLoading(false);
          Toast({
            type: 'success',
            message: res?.message,
          });
          onClose();
          refetch();
        })
        .catch(err => {
          setLoading(false);
          Toast({
            type: 'error',
            message: err?.message,
          });
        });
    } else {
      storesService
        .createStore(payload)
        .then(res => {
          setLoading(false);
          onClose();
          setShowStoreModal(false);

          refetch();
          Toast({
            type: 'success',
            message: res?.message,
          });
        })
        .catch(err => {
          setLoading(false);
          Toast({
            type: 'error',
            message: err?.message,
          });
        });
    }
  };
  return (
    <>
      <Loaders loading={false}>
        <Form
          form={form}
          onSubmit={onSubmit}
          onTouched={() => {
            setReRender(prev => !prev);
          }}>
          <FieldHolder>
            <Grid xs={1} md={2} lg={4} colGap={{ xs: 20, md: 20 }}>
              <Form.Item
                gray
                type="text"
                label="Store Name"
                name="name"
                placeholder="STORE NAME"
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
              <Form.Item
                gray
                type="select"
                label="Store Type"
                name="store_type"
                options={store_types}
                placeholder="Select Type"
                rules={[{ required: true, message: 'Store Type is required' }]}>
                <Select />
              </Form.Item>
              <Form.Item
                gray
                type="select"
                label="Category"
                name="category"
                options={categories}
                loading={categories_loading}
                onChange={handleCategory}
                placeholder="Category"
                rules={[{ required: true, message: 'Category is required' }]}>
                <Select />
              </Form.Item>
              <Form.Item
                gray
                type="select"
                label="Sub-Category"
                name="sub_category"
                options={subCategories}
                onChange={handleSubCategory}
                placeholder="Sub-Category"
                rules={[{ required: true, message: 'Sub-Category is required' }]}>
                <Select />
              </Form.Item>
              <Form.Item
                gray
                type="text"
                label="Store Contact Person"
                name="store_contact_person"
                placeholder="CONTACT NAME"
                rules={[
                  { required: true, message: "Store contact person's is required" },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Store contact person's should be alphabets!",
                  },
                  {
                    pattern: /^[a-zA-Z_ ]{2,}$/,
                    message: "Store contact person's name must be a minimum 2 characters.",
                  },
                  {
                    pattern: /^[a-zA-Z_ ]{2,40}$/,
                    message: "Store contact person's name must be a maximum 40 characters.",
                  },
                ]}>
                <Field />
              </Form.Item>
              <Form.Item
                gray
                type="text"
                label="Store Contact Number"
                name="contact"
                placeholder="(000) 000-0000"
                rules={[
                  { required: true, message: 'Contact Number is required' },
                  {
                    pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                    message: 'Enter Complete Store Contact Number',
                  },
                  {
                    changeRegex: 'phone_number',
                  },
                ]}>
                <Field />
              </Form.Item>

              <div className="addressField">
                {form.getFieldsValue()?.store_type?.value === 'in_store' && (
                  <Form.Item
                    gray
                    rules={[{ required: true, message: 'Address is required' }]}
                    type="text"
                    label="Store Address"
                    name="address"
                    placeholder="Address"
                    search={address?.formatted_address}
                    onChange={handleInputChange}
                    value={mapValue}>
                    <PlacesAutoComplete error={addressError} />
                  </Form.Item>
                )}
              </div>
              {form.getFieldsValue()?.store_type?.value === 'online' && (
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
                  ]}>
                  <Field />
                </Form.Item>
              )}
            </Grid>
          </FieldHolder>

          <MapSection>
            <UploadMenu>
              <ImgCol>
                <img src={Img01} alt="img description" />
              </ImgCol>
            </UploadMenu>
            <Holder $type={form.getFieldsValue()?.store_type?.value === 'online'}>
              {form.getFieldsValue()?.store_type?.value === 'in_store' && (
                <MapColumn>
                  <MapHolder>
                    <GoogleMap
                      marker={marker}
                      center={marker.lat ? marker : { lat: 51.0666293, lng: -114.0581756 }}
                      onClick={handleMapClick}
                      handleMapClick={handleMapClick}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                    />
                  </MapHolder>
                </MapColumn>
              )}
              <BtnHolder>
                <Button css="margin: 0 5px;" type="light" rounded sm width="150" onClick={() => onClose()}>
                  Cancel
                </Button>
                <Button
                  css="margin: 0 5px;"
                  type="primary"
                  rounded
                  sm
                  width="150"
                  htmlType="submit"
                  loading={loading}
                  disabled={btnDisabled}>
                  {store ? 'Update' : 'Create'}
                </Button>
              </BtnHolder>
            </Holder>
          </MapSection>
        </Form>
      </Loaders>
    </>
  );
}

export default AddStoreModal;
