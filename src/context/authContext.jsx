import React, { useState, createContext, useEffect, useRef, useMemo } from 'react';

import debounce from 'lodash/debounce';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { clearCookie, getCookie, setCookie } from '../helpers/common';
import AuthService from '../services/authService';
import Toast from '../components/molecules/Toast';
import { useCancellablePromise } from '../helpers/promiseHandler';
import { SideNavData } from '../components/organisms/SideNav/SideNavData';

const context = {};
export const AuthContext = createContext(context);

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie(process.env.REACT_APP_BAP_TOKEN_COOKIE));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [loading_user, setLoadingUser] = useState(false);
  // const [allowed_pages,setAllowedPages]=useState([]);
  const [fetch_user, setFetchUser] = useState(false);
  const { cancellablePromise } = useCancellablePromise();
  const [reFetch, setRefetch] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const debounceRef = useRef(0);
  let ideal_time = 0;
  let adminInterval = null;
  const history = useHistory();

  const onLogout = () => {
    if (getCookie(process.env.REACT_APP_BAP_TOKEN_COOKIE)) {
      //   UserService.logout()
      //     .then(() => {
      //       setIsLoggedIn(false);
      //       setRedirectTo(null);
      //     })
      //     .catch(() => {
      //       setIsLoggedIn(false);
      //       setRedirectTo(null);
      //     });
    }
    clearCookie(process.env.REACT_APP_BAP_TOKEN_COOKIE);
    clearCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE);
    clearCookie(process.env.REACT_APP_BAP_ALLOWED_PAGES_COOKIE);
    clearCookie(process.env.REACT_APP_REDIRECT_TO_COOKIE);

    setIsLoggedIn(false);
  };

  const resetTimer = useMemo(
    () =>
      debounce(() => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          clearTimeout(ideal_time); // as soon as an event is triggered we stop the timeout count
          if (LocalRef === debounceRef.current) {
            ideal_time = setTimeout(onLogout, 500 * 60 * 1000);
          }
        }, 1);
      }, 300), // incase multiple events are triggered at once or user scrolls we dont run our function 100s of time,we only run it once for all events in 300 millisecond's time span
    [],
  );

  useEffect(() => {
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;
    window.onkeydown = resetTimer;
    window.addEventListener('scroll', resetTimer, true);
    return () => {
      window.removeEventListener('scroll', resetTimer, true);
    };
  }, []);

  useEffect(() => {
    function listenCookieChange(callback, interval) {
      let old_bap_token = getCookie(process.env.REACT_APP_BAP_TOKEN_COOKIE);
      setInterval(() => {
        const new_bap_token = getCookie(process.env.REACT_APP_BAP_TOKEN_COOKIE);
        if (new_bap_token !== old_bap_token) {
          try {
            callback(new_bap_token, process.env.REACT_APP_BAP_TOKEN_COOKIE);
          } finally {
            old_bap_token = new_bap_token;
          }
        }
      }, interval);
    }
    listenCookieChange((value, cookie) => {
      if (cookie === process.env.REACT_APP_BAP_TOKEN_COOKIE) {
        if (!value) {
          onLogout();
        }

        // check time out and then logout
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.adminExp) {
      adminInterval = setInterval(() => {
        const admin_token = getCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE);
        if (isLoggedIn && admin_token) {
          const decoded = jwtDecode(admin_token);
          const expiryDate = new Date(decoded?.exp * 1000);
          const currentDate = new Date();
          if (expiryDate <= currentDate) {
            clearInterval(adminInterval);
            onLogout();
          }
        }
      }, 1000);
    }
  }, [isLoggedIn, user?.adminExp]);

  const filterPages = permissions => {
    const regex = /^bap.+.nav/i;
    const allowed_pages = permissions?.filter(perm => regex.test(perm));
    return allowed_pages;
  };
  useEffect(() => {
    if (isLoggedIn) {
      const adminToken = getCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE);
      setLoadingUser(true);
      cancellablePromise(AuthService.getUser(adminToken ?? ''))
        .then(res => {
          setLoadingUser(false);
          setUser(res);
        })
        .catch(err => {
          setLoadingUser(false);
          Toast({
            type: 'error',
            message: err.message,
          });
          onLogout();
        });
    }
  }, [isLoggedIn, fetch_user]);

  const onLogin = async ({ email = '', password = '', token = '', rememberMe = false }) => {
    setLoadingUser(true);
    if (rememberMe && email !== '') {
      localStorage.userName = email;
    }
    try {
      const res = await AuthService.login(email, password, token);
      setIsLoggedIn(true);
      setUser(res);
      if (token) {
        if (res?.permissions?.length) {
          const pages = SideNavData.filter(page => filterPages(res?.permissions)?.includes(page.permission))?.map(
            page => page?.path,
          );
          if (pages?.length) {
            history.push(`/business/${pages[0]}`);
            setCookie(process.env.REACT_APP_BAP_ALLOWED_PAGES_COOKIE, JSON.stringify(pages));
            setLoadingUser(false);
          } else {
            history.push('/');
            setIsLoggedIn(false);
            setUser({});
          }
        } else {
          history.push('/');
          setIsLoggedIn(false);
          setUser({});
          Toast({
            type: 'error',
            message: 'You do not have permission to access this page',
          });
        }
      }
    } catch ({ message }) {
      setIsLoggedIn(false);
      setLoadingUser(false);
      Toast({ type: 'error', message });
    }
  };

  const hasPermission = perm => {
    const admin_token = getCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE);
    const permissionsToAllow = [
      'bap.recharge-account',
      'bap.statements.pay-invoice',
      'bap.statements.details',
      'bap.statements.download',
      'bap.stores.details',
      'bap.store-groups.view',
      'bap.promotions.details',
      'bap.promotions.preview',
      'bap.dashboard.update-card-details',
    ];
    if (admin_token) {
      const { adminId } = jwtDecode(admin_token);
      if (adminId) {
        if (user?.status === 'Suspended') {
          const isPermExists = permissionsToAllow?.includes(perm) && user?.permissions?.includes(perm);
          if (isPermExists) {
            return true;
          }
          return false;
        }
        return user?.permissions?.includes(perm);
      }
    }

    if (user?.role === 'store_user') {
      if (user?.permission_type === 'Read Only') {
        return false;
      }

      return true;
    }

    if (user?.permission_type === 'Full Access') {
      if (user?.status === 'Suspended') {
        if (permissionsToAllow.includes(perm)) {
          return true;
        }
        return false;
      }
      return true;
    }

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        setIsLoggedIn,
        onLogout,
        onLogin,
        refetch: () => setRefetch(_ => !_),
        fetchUser: () => setFetchUser(() => !fetch_user),
        setLoading,
        loading,
        isLoggedIn,
        hasPermission,
        fetch: reFetch,
        user,
        loading_user,
        showStoreModal,
        setShowStoreModal,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
