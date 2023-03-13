/* eslint-disable no-unused-vars */
import React, { lazy, useState, useEffect, useContext, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import PageTemplate from '../components/templates/PageTemplate';
import { pages } from '../helpers/constants';
import { AuthContext } from '../context/authContext';
import Loaders from '../components/atoms/Loaders';
import { getCookie } from '../helpers/common';

// eslint-disable-next-line no-console
const importView = file => lazy(() => import(`./${file}`).catch(() => console.log(`Error in importing ${file}`)));

export default function Index({ history }) {
  const { user, loading_user } = useContext(AuthContext);

  const { view } = useParams();
  const metaViewData = pages;
  const [selectedView, setSelectedView] = useState([]);
  async function loadView(filtered) {
    const promise = filtered.map(async _view => {
      const View = await importView(_view.file);
      // eslint-disable-next-line no-use-before-define
      return <View key={_view.id} selectView={selectView} />;
    });
    Promise.all(promise).then(setSelectedView);
  }
  async function selectView(file) {
    const filtered = metaViewData.filter(elem => elem.file === file);
    loadView(filtered);
  }
  useEffect(() => {
    if (user) {
      let fileToLoad = view;
      const { hasProfileCreated, isEmailVerified, status, paymentInfo, client_type, card_skipped } = user;
      let redirectTo = getCookie(process.env.REACT_APP_REDIRECT_TO_COOKIE);
      switch (redirectTo) {
        case 'verify-email':
          fileToLoad = 'emailverification';
          break;
        case 'create-profile':
          fileToLoad = 'create-profile';
          break;
        case 'pending-approval':
          fileToLoad = 'profile-created';
          break;
        case 'card-detail':
          fileToLoad = 'card-detail';
          break;
        default:
          fileToLoad = view;
          break;
      }
      if (
        getCookie(process.env.REACT_APP_ADMIN_BAP_TOKEN_COOKIE) &&
        getCookie(process.env.REACT_APP_BAP_ALLOWED_PAGES_COOKIE)
      ) {
        const adminPages = JSON.parse(getCookie(process.env.REACT_APP_BAP_ALLOWED_PAGES_COOKIE));
        if (adminPages?.includes(view)) {
          fileToLoad = view;
        } else {
          // eslint-disable-next-line prefer-destructuring
          fileToLoad = adminPages[0];
        }
      } else if (
        (isEmailVerified && fileToLoad === 'emailverification') ||
        (status === 'Active' && fileToLoad === 'profile-created') ||
        (hasProfileCreated && fileToLoad === 'create-profile') ||
        (status === 'Active' && client_type === 'Prepaid' && !paymentInfo?.order_id) ||
        (status === 'Active' && client_type === 'Credit' && !card_skipped && !paymentInfo?.order_id)
      ) {
        fileToLoad = 'dashboard';
      }
      if (
        !metaViewData
          .filter(({ live }) => (process.env.REACT_APP_MAIN_URL === 'https://plastk.ca' ? live : true))
          .map(({ file }) => file)
          .includes(view) ||
        !fileToLoad ||
        fileToLoad === 'null' ||
        fileToLoad === 'account/null'
      ) {
        redirectTo = redirectTo.split('/')[redirectTo.split('/').length - 1];
        fileToLoad = redirectTo === 'null' ? 'dashboard' : redirectTo;
      }
      if (status === 'Suspended') {
        fileToLoad = 'dashboard';
      }
      const businessCount = history.location.pathname.split('/business').length - 1;
      if (businessCount > 1) {
        history.replace({
          pathname: `/business/${fileToLoad}`,
          isActive: true,
        });
      } else
        history.replace({
          pathname: fileToLoad,
          isActive: true,
        });
      selectView(fileToLoad);
    }
  }, [view, user, loading_user]);
  return (
    <>
      {loading_user ? (
        <Loaders pageLoader />
      ) : (
        <PageTemplate title={view} showTemplate={metaViewData?.filter(elem => elem.file === view)[0]?.navigations}>
          <Suspense fallback={<Loaders viewLoader />}>{selectedView}</Suspense>
        </PageTemplate>
      )}
    </>
  );
}
