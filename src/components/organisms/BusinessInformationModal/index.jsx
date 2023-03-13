/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled, { css } from 'styled-components/macro';
import Form, { useForm } from '../Form';
import Field from '../../molecules/Field';
import Button from '../../atoms/Button';
import Grid from '../../atoms/Grid';
import Img1 from '../../../assets/images/prototype-img.svg';
import {
  InformationHolder,
  ImgColumn,
  ImgBox,
  FieldColumn,
  BtnHolder,
  LogoSize,
} from './BusinessInformationModal.style';
import Toast from '../../molecules/Toast';
import { AuthContext } from '../../../context/authContext';
import GoogleLocationSelector from '../GoogleLocationSelector';
import Loaders from '../../atoms/Loaders';
import UserService from '../../../services/userService';

function BusinessInformationModal({ onClose }) {
  const [form] = useForm();
  const [initial_loading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, fetchUser } = React.useContext(AuthContext);
  const [state, setState] = useState({});
  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    setInitialLoading(true);
    form.setFieldsValue({
      business_logo: `${user?.attachments?.business_logo?.cloudinary_url}?${new Date().getTime()}` ?? Img1,
      banner_img: user?.attachments?.banner_img?.cloudinary_url,
      alternate_logo: user?.attachments?.alternate_logo?.cloudinary_url,
      business_name: user?.business_name,
      address: user.address,
      contact_number: user.contact_number,
      business_gst: user.business_gst,
      primary_contact_number: user.primary_contact_number,
      primary_contact_person: user.primary_contact_person,
    });
    setSelectedImg(`${user?.attachments?.business_logo?.cloudinary_url}?${new Date().getTime()}`);
    setInitialLoading(false);
  }, []);

  const onSubmit = e => {
    setLoading(true);
    UserService.updateProfile(e)
      .then(() => {
        setInitialLoading(false);
        onClose();
        fetchUser();
        Toast({
          type: 'success',
          message: 'Profile updated successfully',
        });
      })
      .catch(ex => {
        setLoading(false);
        Toast({
          type: 'error',
          message: ex.message,
        });
      });
  };
  return (
    <>
      <Loaders loading={initial_loading}>
        <Form
          form={form}
          onSubmit={onSubmit}
          onTouched={e => {
            setState(_ => ({ ..._, ...e }));
          }}
          onError={() => {
            Toast({
              type: 'error',
              message: 'kindly fill all the fields',
            });
          }}>
          <InformationHolder>
            <ImgColumn>
              {/* <ImgBox>
                {selectedImg ? (
                  <img
                    css={`
                      object-fit: cover !important;
                    `}
                    src={selectedImg}
                    alt="img-description"
                  />
                ) : (
                  'No Image Found'
                )}
              </ImgBox> */}
              <Form.Item
                disabled={initial_loading}
                name="business_logo"
                type="chooseFile"
                image
                showDel
                label="Primary Logo"
                fileReqText="max file size 25MB (.png)"
                rules={[
                  { required: true, message: 'Primary Logo is required' },
                  {
                    transform: e => {
                      if (!e?.length) {
                        setSelectedImg('');
                      } else {
                        setSelectedImg(e);
                      }
                      const stringLength = e?.length - 'data:image/png;base64,'.length;
                      const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
                      if (sizeInBytes / 1048576 > 1) {
                        return true;
                      }
                      return false;
                    },
                    message: 'Business Logo should be less then 1MB',
                  },
                ]}>
                <Field />
              </Form.Item>
              <Form.Item
                disabled={initial_loading}
                name="alternate_logo"
                type="chooseFile"
                image
                showDel
                label="Alternate Logo"
                fileReqText="max file size 25MB (.png)"
                rules={[
                  {
                    transform: e => {
                      const stringLength = e?.length - 'data:image/png;base64,'.length;
                      const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
                      if (sizeInBytes / 1048576 > 1) {
                        return true;
                      }
                      return false;
                    },
                    message: 'Logo should be less then 1MB',
                  },
                ]}>
                <Field />
              </Form.Item>
              <Form.Item
                disabled={initial_loading}
                name="banner_img"
                type="chooseFile"
                image
                showDel
                label="Business Banner Image"
                fileReqText="max file size 25MB (.png)"
                rules={[
                  {
                    transform: e => {
                      const stringLength = e?.length - 'data:image/png;base64,'.length;
                      const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
                      if (sizeInBytes / 1048576 > 1) {
                        return true;
                      }
                      return false;
                    },
                    message: 'Banner Image should be less then 1MB',
                  },
                  { required: true, message: 'Banner image is required' },
                ]}>
                <Field />
              </Form.Item>
              <LogoSize>Recommended Business logo size is 250 x 250 px</LogoSize>
            </ImgColumn>

            <FieldColumn>
              {/* <Grid xs={1} md={1} colGap={{ xs: 20, md: 50 }}></Grid> */}
              <Grid xs={1} md={2} colGap={{ xs: 20, md: 25, xl: 50 }}>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  label="Business Name"
                  name="business_name"
                  placeholder="Business Name"
                  rules={[
                    { required: true, message: 'Business Name is required' },
                    {
                      pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]*$/,
                      message: 'Enter a valid business name',
                    },
                    {
                      pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{3,}$/,
                      message: 'business name must be minimum 3 characters',
                    },
                    {
                      pattern: /^[a-zA-Z0-9\s`!@#$%^&*()_+-=:";'<>,.]{2,100}$/,
                      message: 'business name must be maximum 100 characters',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  label="Primary Contact Name"
                  name="primary_contact_person"
                  placeholder="Primary Contact Person"
                  rules={[
                    { required: true, message: 'Primary Contact Person is required' },
                    {
                      pattern: /^[a-zA-Z ]*$/,
                      message: 'Enter a valid Name',
                    },
                    {
                      pattern: /^[a-zA-Z ]{3,}$/,
                      message: 'Name must be minimum 3 characters',
                    },
                    {
                      pattern: /^[a-zA-Z ]{3,40}$/,
                      message: 'Name must be maximum 40 characters',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  label="Business Contact Number"
                  name="contact_number"
                  placeholder="Business Contact Number"
                  rules={[
                    { required: true, message: 'Business Contact Number is required' },
                    {
                      pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                      message: 'Phone number should be 10 digits!',
                    },
                    {
                      changeRegex: 'phone_number',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  label="Primary Contact Number"
                  name="primary_contact_number"
                  placeholder="Primary Contact Number"
                  rules={[
                    { required: true, message: 'Primary Contact Number is required' },
                    {
                      pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                      message: 'Primary Contact Number should be 10 digits!',
                    },
                    {
                      changeRegex: 'phone_number',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  label="GST Number"
                  name="business_gst"
                  placeholder="GST/HST Number i.e. (23ASDSS2323A2Z2)"
                  rules={[
                    {
                      pattern: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[A-Z]{1}[A-Z\d]{1}$/,
                      message: 'Enter a valid GST/HST Number',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  name="address"
                  label="Business Address"
                  placeholder="Business Address"
                  rules={[{ required: true, message: 'Business Address is required' }]}>
                  <GoogleLocationSelector name="address" />
                </Form.Item>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  label="City/Province"
                  name="province"
                  placeholder="Toronto, Ontario">
                  <Field />
                </Form.Item>
                <Form.Item
                  gray
                  disabled={initial_loading}
                  type="text"
                  label="Postal Code"
                  name="postal_cde"
                  placeholder="L4T6Y6">
                  <Field />
                </Form.Item>
              </Grid>
            </FieldColumn>
          </InformationHolder>

          <BtnHolder>
            <Button css="margin: 0 5px;" type="light" rounded sm width="150" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button disabled={loading} css="margin: 0 5px;" type="light" rounded sm width="150" htmlType="submit">
              Update
            </Button>
          </BtnHolder>
        </Form>
      </Loaders>
    </>
  );
}

export default BusinessInformationModal;
