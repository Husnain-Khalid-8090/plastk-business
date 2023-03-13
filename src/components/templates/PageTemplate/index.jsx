/* eslint-disable no-unused-vars */
import React from 'react';

import { useParams } from 'react-router-dom';
import TopNavigation from '../../organisms/TopNavigation';
import SideNav from '../../organisms/SideNav';
import BannerBlock from '../../organisms/BannerBlock';
import { Content } from './PageTemplate.styles';
import UserTemplate from '../UserTemplate';
import BannerTop from '../../organisms/Banner';

function PageTemplate({ title, children, showTemplate }) {
  const { view } = useParams();
  return (
    <>
      {showTemplate ? (
        <Content>
          <BannerTop />
          <TopNavigation title={title} />
          <SideNav />
          <BannerBlock profilePage={view === 'profile'} />
          {children}
        </Content>
      ) : (
        <UserTemplate>{children}</UserTemplate>
      )}
    </>
  );
}

export default PageTemplate;
