import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import MacBookView from '../MacBookView';
// import MobileView from '../MobileView';

import { SwitcherBtns, Button } from './ImgPreviewModal.style';

function ImgPreviewModal({ promotion }) {
  const [macBookView, setMacBookView] = useState(true);
  return (
    <>
      <SwitcherBtns>
        <Button type="button" className={`${macBookView && 'active'}`} onClick={() => setMacBookView(true)}>
          <span className="icon-mobile" />
        </Button>
        <Button type="button" className={`${!macBookView && 'active'}`} onClick={() => setMacBookView(false)}>
          <span className="icon-mackbook" />
        </Button>
      </SwitcherBtns>
      {macBookView ? <MacBookView promotion={promotion} mobileView /> : <MacBookView promotion={promotion} />}
    </>
  );
}

export default ImgPreviewModal;
