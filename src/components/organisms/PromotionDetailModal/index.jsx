import React, { useState } from 'react';

// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import PromotionDetailsTab from '../PromotionDetailsTab';
import PromotionPerformanceTab from '../PromotionPerformanceTab';

import { SwitcherBtns, Button } from './PromotionDetailModal.style';

function PromotionDetailModal({ promotion }) {
  const [detailsTab, setDetailsTab] = useState(true);
  return (
    <>
      <SwitcherBtns>
        <Button type="button" className={`${detailsTab && 'active'}`} onClick={() => setDetailsTab(true)}>
          <span>Details</span>
        </Button>
        <Button type="button" className={`${!detailsTab && 'active'}`} onClick={() => setDetailsTab(false)}>
          <span>Store Performance</span>
        </Button>
      </SwitcherBtns>
      {detailsTab ? <PromotionDetailsTab promotion={promotion} /> : <PromotionPerformanceTab promotion={promotion} />}
    </>
  );
}

export default PromotionDetailModal;
