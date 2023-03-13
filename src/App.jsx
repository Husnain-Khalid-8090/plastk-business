/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
// import '@reach/dialog/styles.css';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import { SideNavContextProvider } from './context/sideNavContext';
import { LoadingContextProvider } from './context/loadingContext';
import GlobalStyles from './styles/GlobalStyles.styles';
import { StyledToastContainer } from './styles/App.styles';
import { theme } from './config/theme';
import Router from './Router';
import { AuthContextProvider } from './context/authContext';
import Loaders from './components/atoms/Loaders';
import 'swiper/swiper.css';
import 'swiper/swiper-bundle.min.css';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LoadingContextProvider>
          <SideNavContextProvider>
            <GlobalStyles />
            <BrowserRouter>
              <Suspense fallback={<Loaders pageLoader />}>
                <AuthContextProvider>
                  <Router />
                </AuthContextProvider>
              </Suspense>
            </BrowserRouter>
            <StyledToastContainer />
          </SideNavContextProvider>
        </LoadingContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
