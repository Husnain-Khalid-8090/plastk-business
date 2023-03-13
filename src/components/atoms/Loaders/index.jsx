import React from 'react';

import {
  PageLoaderWrapper,
  PageLoader,
  ComponentLoader,
  ViewLoader,
  Line,
  LinesHolder,
  Logo,
  BtnLoader,
  LoaderWrap,
  BlurBackground,
  ComponentLoaderHolder,
} from './Loaders.styles';
import PlastkLogo from '../../../assets/images/logo-small.svg';

function Loaders({ pageLoader, viewLoader, buttonLoader, height, loading, children }) {
  return (
    <>
      {pageLoader && (
        <PageLoaderWrapper>
          <PageLoader>
            <Logo src={PlastkLogo} />
          </PageLoader>
        </PageLoaderWrapper>
      )}
      {loading ? (
        <ComponentLoaderHolder height={height}>
          <BlurBackground />
          <LoaderWrap>
            <ComponentLoader />
          </LoaderWrap>
          {children}
        </ComponentLoaderHolder>
      ) : (
        <>{children}</>
      )}
      {viewLoader && (
        <ViewLoader>
          <LinesHolder>
            <Line className="line-1" />
            <Line className="line-2" />
            <Line className="line-3" />
            <Line className="line-4" />
            <Line className="line-5" />
            <Line className="line-6" />
            <Line className="line-7" />
            <Line className="line-8" />
            <Line className="line-9" />
          </LinesHolder>
          <span>Loading</span>
        </ViewLoader>
      )}
      {buttonLoader && (
        <BtnLoader>
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="loading"
            width="1em"
            height="1em"
            fill="#000"
            aria-hidden="true">
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
          </svg>
        </BtnLoader>
      )}
    </>
  );
}

export default Loaders;
