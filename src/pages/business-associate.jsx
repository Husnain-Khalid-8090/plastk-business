import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../helpers/common';
import { AuthContext } from '../context/authContext';
import Loaders from '../components/atoms/Loaders';

const BusinessAssociate = () => {
  const [loading, setLoading] = useState(true);
  const { onLogout } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const token = useQuery('token');
  const { onLogin } = useContext(AuthContext);
  useEffect(() => {
    if (token) {
      onLogin({ token });
    } else {
      setLoading(false);
      history.push('/');
      onLogout();
    }
  }, []);
  return <Loaders pageLoader={loading} />;
};

export default BusinessAssociate;
