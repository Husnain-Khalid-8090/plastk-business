import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { getCookie } from '../../../helpers/common';
import { Time } from './Timer.styles';

const Timer = ({ type }) => {
  const [timer, setTimer] = useState({ m: 0, s: 0 });
  const [time, setTime] = useState(null);
  useEffect(() => {
    if (type === 'admin') {
      const token = getCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE);
      if (token) {
        const decoded = jwtDecode(token);
        const expTime = decoded.exp * 1000;
        setTime(expTime);
      }
    }
  }, []);

  let timeInterval = null;

  useEffect(() => {
    if (time) {
      timeInterval = setInterval(() => {
        const currentTime = new Date();
        const expiryTime = new Date(time);
        const diff = expiryTime.getTime() - currentTime.getTime();
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimer({ min: minutes, sec: seconds });
      }, 1000);
    }
    return () => clearInterval(timeInterval);
  }, [time]);
  return (
    <Time>
      {timer.min} <span>min</span>:{timer.sec} <span>sec</span>
    </Time>
  );
};

export default Timer;
