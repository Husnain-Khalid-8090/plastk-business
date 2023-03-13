/* eslint-disable no-unused-vars */
import React, { lazy, useContext, useEffect, useState } from 'react';

import Toast from '../components/molecules/Toast';
import Form, { useForm } from '../components/organisms/Form';
import UserService from '../services/userService';
import { FormHolder } from '../styles/App.styles';
import { AuthContext } from '../context/authContext';

const CreateBusinessStepOne = lazy(() => import('../components/organisms/CreateBusinessStepOne'));
const CreateBusinessStepTwo = lazy(() => import('../components/organisms/CreateBusinessStepTwo'));
const CreateBusinessStepThree = lazy(() => import('../components/organisms/CreateBusinessStepThree'));

export default function CreateBusiness() {
  const { fetchUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [state, setState] = useState({});
  const [form] = useForm();
  useEffect(() => {
    if (state?.category?.label) form.setFieldsValue({ sub_category: { value: null, label: null } });
  }, [state.category]);

  const onSubmit = () => {
    setLoading(true);
    const payload = {
      ...state,
      category: state.category.value,
      sub_category: state.sub_category?.value,
      store_type: state?.store_type.value,
    };
    if (state.store_type.value === 'online') {
      delete payload?.isSameBusiness;
      delete payload?.isSameName;
      delete payload?.store_address;
      payload.useDefault = false;
    } else {
      delete payload?.website;
    }

    UserService.createProfile(payload)
      .then(() => {
        fetchUser();
        setLoading(false);
        Toast({
          type: 'success',
          message: 'Profile created successfully',
        });
      })
      .catch(err => {
        setLoading(false);
        Toast({
          type: 'error',
          message: err.message,
        });
      });
  };
  return (
    <FormHolder>
      {step === 1 && (
        <Form
          form={form}
          initialValues={{
            ...state,
          }}
          onSubmit={() => {
            setStep(2);
          }}
          onTouched={e => {
            setState(_ => ({ ..._, ...e }));
          }}
          onError={() => {
            Toast({
              type: 'error',
              message: 'Please fill all the required fields',
            });
          }}>
          <CreateBusinessStepOne state={state} form={form} setStep={setStep} />
        </Form>
      )}
      {step === 2 && (
        <Form
          form={form}
          initialValues={{ ...state }}
          onSubmit={() => {
            setStep(3);
          }}
          onTouched={e => {
            setState(_ => ({ ..._, ...e }));
          }}
          onError={() => {
            Toast({
              type: 'error',
              message: 'Please fill all the required fields',
            });
          }}>
          <CreateBusinessStepTwo state={state} setState={setState} form={form} setStep={setStep} loading={loading} />
        </Form>
      )}
      {step === 3 && (
        <Form
          form={form}
          initialValues={{ ...state }}
          onSubmit={onSubmit}
          onTouched={e => {
            setState(_ => ({ ..._, ...e }));
          }}
          onError={() => {
            Toast({
              type: 'error',
              message: 'Please fill all the required fields',
            });
          }}>
          <CreateBusinessStepThree state={state} form={form} setStep={setStep} loading={loading} />
        </Form>
      )}
    </FormHolder>
  );
}
