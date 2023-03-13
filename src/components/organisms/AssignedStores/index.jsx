import React from 'react';
import DetailsCard from '../../molecules/DetailsCard';
import InfoCard from '../../molecules/InfoCard';
import Grid from '../../atoms/Grid';

function AssignedStores({ stores }) {
  const { length } = stores;

  return (
    <>
      <DetailsCard>
        <Grid lg={2} xs={2} sm={2}>
          {stores.map(store => (
            <InfoCard title="Store Name" value={store.name} vertical center={length === 1} />
          ))}
        </Grid>
      </DetailsCard>
    </>
  );
}

export default AssignedStores;
