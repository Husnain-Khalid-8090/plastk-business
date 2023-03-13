import React, { useContext } from 'react';

import Skeleton from 'react-loading-skeleton';
import { StyledHeading, DataHolder, Head, FiltersHolder, ContentWrap, HeadingHolder } from './DataLayout.styles';
import { LoadingContext } from '../../../context/loadingContext';

function DataLayout({ viewTransferFields, title, filters, children, ...props }) {
  const { isLoading } = useContext(LoadingContext);

  return (
    <DataHolder {...props}>
      {viewTransferFields ?? null}
      {(title || filters) && (
        <Head>
          <HeadingHolder>
            <StyledHeading level={4}>{isLoading ? <Skeleton width={130} height={25} /> : title}</StyledHeading>
          </HeadingHolder>
          {filters && <FiltersHolder>{filters}</FiltersHolder>}
        </Head>
      )}
      <ContentWrap>{children}</ContentWrap>
    </DataHolder>
  );
}

export default DataLayout;
