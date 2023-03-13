import React, { useState, useContext } from 'react';
import Heading from '../components/atoms/Heading';
import SubTitle from '../components/atoms/SubTitle';
import TitleHead from '../components/molecules/TitleHead';
import UserService from '../services/userService';
import Toast from '../components/molecules/Toast';
import { AuthContext } from '../context/authContext';
import CardInfoForm from '../components/organisms/CardInfoForm';

const CardDetail = () => {
  const [state, setState] = useState();
  const { fetchUser } = useContext(AuthContext);

  const handleSkip = async () => {
    await UserService.skipCardDetailProcess()
      .then(res => {
        Toast({
          type: 'success',
          message: res?.message,
        });
        fetchUser();
      })
      .catch(err => {
        Toast({
          type: 'error',
          message: err?.message,
        });
      });
  };

  return (
    <div>
      <TitleHead skipBtn signOutBtn onBackClick={handleSkip} />
      <Heading level={1}>Pay with Card</Heading>
      <SubTitle>
        <span className="text">Please enter your card details!</span>
      </SubTitle>
      <CardInfoForm state={state} setState={setState} type="save" />
    </div>
  );
};

export default CardDetail;
