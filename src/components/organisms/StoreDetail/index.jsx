import React, { useMemo, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { format } from 'date-fns';
import Toast from '../../molecules/Toast';
import DetailsCard from '../../molecules/DetailsCard';
import InfoCard from '../../molecules/InfoCard';
import Grid from '../../atoms/Grid';
// import GridCol from '../../atoms/GridCol';
import StoreService from '../../../services/storeService';
import { getDateObject } from '../../../helpers/common';
import Table from '../../molecules/Table';
import Button from '../../atoms/Button';
import ModalContainer from '../../molecules/ModalContainer';
import StoreVerificationModal from '../StoreVerification';
import { AuthContext } from '../../../context/authContext';
import { HeadingHolder } from './StoreDetail.styles';

function StoreDetail({ details }) {
  const { name, address, status, contact, store_contact_person, store_id, _id, store_type, image_url } = details;

  const { refetch } = useContext(AuthContext);

  const { storeVerifications_loading, storeVerifications } = StoreService.GetStoreVerifications(
    {
      id: _id,
      page: 1,
      itemsPerPage: 10,
    },
    refetch,
  );
  const { items } = useMemo(
    () => ({
      items: storeVerifications?.items
        ?.map(_ => [
          format(getDateObject(_.created_at), 'yyyy-MM-dd'),
          _.transaction_id.AuthorzationCode,
          status === 'Closed' ? _.description.split('_Closed_')[0] : _.description,
        ])
        .reduce((prev, curr) => {
          prev.push(curr.filter(item => item !== 'no_permission'));
          return prev;
        }, []),
      totalItems: storeVerifications?.totalItems ?? 0,
    }),
    [storeVerifications],
  );

  return (
    <>
      <DetailsCard css="margin-bottom:1rem">
        <HeadingHolder>More Details</HeadingHolder>
        <Grid xs={1} sm={3} className="card-row">
          <InfoCard title="Store Name" value={name} />
          <InfoCard title="Store Address" value={address?.street_address ?? '--'} />
          <InfoCard title="Status" value={status} />
        </Grid>
        <Grid xs={1} sm={3} className="card-row">
          <InfoCard title="Store ID" value={store_id ?? '--'} />
          <InfoCard title="Store Contact Person" value={store_contact_person} />
          <InfoCard title="Store Contact No:" value={contact} />
        </Grid>
        <Grid xs={1} sm={3} className="card-row">
          <InfoCard title="Store Type" value={store_type === 'online' ? 'Online' : 'In Store'} />
          <InfoCard
            title="Store Image"
            value={
              image_url ? (
                <ModalContainer
                  title="Store Image"
                  btnComponent={({ onClick }) => (
                    <Button
                      type="light"
                      xs
                      onClick={() => {
                        onClick();
                      }}>
                      View Image
                    </Button>
                  )}
                  content={() => (
                    <img
                      src={image_url}
                      css={`
                        width: 100%;
                      `}
                      alt="store_img"
                    />
                  )}
                />
              ) : (
                '---'
              )
            }
          />
        </Grid>
      </DetailsCard>
      <Table
        loading={storeVerifications_loading}
        rowsData={items}
        columnNames={['Date', 'Auth Code', 'Description']}
        itemsPerPage={10}
        recordBtn={false}
        // onSort={(sortBy, sortOrder) => {
        //   setSearchQuery(_ => ({ ..._, sortBy, sortOrder }));
        // }}
      />
      <ModalContainer
        title="Enter Your Auth Code"
        btnComponent={({ onClick }) => (
          <Button
            css="margin:0 auto"
            type="light"
            width={150}
            sm
            disabled={status === 'Closed'}
            onClick={() => {
              if (status === 'Deactivated') {
                Toast({
                  type: 'error',
                  message: 'You need to reactivate store to verify',
                });
                return;
              }
              onClick();
            }}>
            Verify
          </Button>
        )}
        content={({ onClose }) => <StoreVerificationModal id={_id} onClose={onClose} refreshData={refetch} hideModal />}
      />
    </>
  );
}

export default StoreDetail;
