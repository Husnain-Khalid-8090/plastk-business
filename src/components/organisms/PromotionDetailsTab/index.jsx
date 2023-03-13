/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { differenceInBusinessDays, format, getMinutes, getSeconds, differenceInHours } from 'date-fns';
import Grid from '../../atoms/Grid';
import DetailsCard from '../../molecules/DetailsCard';
import InfoCard from '../../molecules/InfoCard';
import InfoTransactionsCard from '../../molecules/InfoTransactionsCard';
import InfoHistoryCard from '../../molecules/InfoHistoryCard';
import Button from '../../atoms/Button';
import {
  convertToCurrencyFormat,
  filterStatus,
  getDateObject,
  getOfferDetails,
  getRemainingTime,
  promotionOfferTypeConverter,
  shortenString,
} from '../../../helpers/common';
import { ContentHolder, Header, Heading, TextWrap, StoreRow, StoreName, Title } from './PromotionDetailsTab.styles';
import PromotionService from '../../../services/promotionsService';
import Loaders from '../../atoms/Loaders';
import ModalContainer from '../../molecules/ModalContainer';
import StoreDetail from '../StoreDetail';
import Table from '../../molecules/Table';
import Toast from '../../molecules/Toast';

function DetailsTab({ promotion }) {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');
  const [totalActiveTime, setTotalActiveTime] = useState('');
  let endInterval;
  let activeInterval;
  useEffect(() => {
    PromotionService.getPromotion(promotion._id)
      .then(res => {
        const stepsInfo = {};
        if (res.campaign.offer_type === 'repeatVisit') {
          const transactions = {};
          // eslint-disable-next-line no-plusplus
          for (let i = 1; i <= res?.campaign?.offer_details?.minimum_visit; i++) {
            stepsInfo[i] = 0;
          }
          res?.transactions_data?.totalCustomers?.forEach(x => {
            if (transactions[x._id]) {
              transactions[x._id] += x.visits;
            } else transactions[x._id] = x.visits;
          });
          Object.values(transactions)?.forEach(visit => {
            const reminder = visit % res.campaign?.offer_details?.minimum_visit;
            const quotient = visit / res.campaign?.offer_details?.minimum_visit;

            const stp = {};
            stp[reminder] = stp.reminder ? stp.reminder + 1 : 1;
            stepsInfo[reminder] = stepsInfo.reminder ? stepsInfo.reminder + 1 : 1; // current step

            stepsInfo[Object.keys(stepsInfo).length - 1] = +Math.ceil(quotient);
          });

          const totalExpectedCustomers = Object.values(stepsInfo)
            ?.filter(x => !x || !Number.isNaN(x))
            ?.reduce((a, b) => a + b);
          stepsInfo.totalExpectedCustomers = totalExpectedCustomers;
          stepsInfo.pointsGiven = res.transactions_data.rewardPoints ?? 0;
        }
        setDetails({
          ...res?.transactions_data,
          stepsInfo,
        });
        setLoading(false);
      })
      .catch(err => {
        Toast({
          type: 'error',
          message: err.message,
        });
        setLoading(false);
      });
  }, [promotion._id]);

  useEffect(() => {
    // find total time a campaign is active
    const startDate = new Date(promotion.history?.startDate);
    const endDate = new Date(promotion?.history?.endDate);

    if (promotion.status === 'Pending') {
      setTotalActiveTime('0 days 0 hours 0 minutes 0 seconds');
    } else if (filterStatus(promotion) === 'Stopped' || filterStatus(promotion) === 'Completed') {
      setTotalActiveTime(getRemainingTime(endDate, startDate));
    } else {
      activeInterval = setInterval(() => {
        setTotalActiveTime(getRemainingTime(new Date(), startDate));
      }, 1000);
    }
    return () => {
      clearInterval(activeInterval);
    };
  }, [totalActiveTime]);

  useEffect(() => {
    const endDate = new Date(promotion.duration.endDate);
    const now = new Date();
    const timeRemaining = endDate - now;
    const daysdiff = differenceInBusinessDays(endDate, new Date());
    const hoursdiff = differenceInHours(endDate, new Date());
    const minutes = getMinutes(timeRemaining);
    const secondsLeft = getSeconds(timeRemaining);

    endInterval = setInterval(() => {
      const newTime = `${daysdiff} days ${hoursdiff} hours ${minutes} minutes ${secondsLeft} seconds`;
      if (timeRemaining === 0 || promotion.status === 'Stopped' || promotion.status === 'Pending') {
        setTimeLeft(() => '0 days 0 hours 0 minutes 0 seconds');
        clearInterval(endInterval);
      } else {
        setTimeLeft(() => newTime);
      }
    }, 1000);

    return () => {
      clearInterval(endInterval);
    };
  }, [timeLeft]);
  const { rowsData, columnNames } = useMemo(
    () => ({
      rowsData: details?.stepsInfo ? [Object.values(details?.stepsInfo)?.map?.(_ => _)] : [],
      columnNames: [...new Array(promotion?.offer_details?.minimum_visit + 2)]?.map((x, i) =>
        i + 1 === promotion?.offer_details?.minimum_visit + 1
          ? `Total Customers`
          : i + 1 === promotion?.offer_details?.minimum_visit + 2
          ? `Points Given`
          : `${i + 1} visit`,
      ),
    }),
    [details?.stepsInfo],
  );

  const stores = useMemo(
    () =>
      promotion.stores.map(item => (
        <StoreRow>
          <StoreName>
            <Title>
              {shortenString(item?.name, 20)} #{item?.store_id} {shortenString(item?.address?.street_address, 20)}
            </Title>
          </StoreName>
          <ModalContainer
            title="More Details"
            xl
            btnComponent={({ onClick }) => (
              <Button type="primary" rounded onClick={onClick} sm width="150">
                Details
              </Button>
            )}
            content={() => <StoreDetail details={item} />}
          />
        </StoreRow>
      )),
    [promotion?.stores],
  );
  return (
    <Loaders loading={loading}>
      <ContentHolder>
        <DetailsCard>
          <Grid xs={1} sm={3} className="card-row">
            <InfoCard sm title="Promotion Name" value={promotion.name} />
            <InfoCard title="Status" value={filterStatus(promotion)} />
            <InfoCard title="Offer Type" value={promotionOfferTypeConverter(promotion.offer_type)} />
          </Grid>
          <Grid xs={1} sm={3} className="card-row">
            <InfoCard title="Impressions" value={promotion.impressions} />
            <InfoCard title="Clicks" value={promotion.clicks} />
            <InfoCard title="Conversions" value={promotion.conversions} />
          </Grid>
          <Grid xs={1} sm={3} className="card-row">
            <InfoCard
              title="Start Date"
              value={format(getDateObject(new Date(promotion.duration.startDate)), 'yyyy-MM-dd h:mm a')}
            />
            <InfoCard
              title="End Date"
              value={format(getDateObject(new Date(promotion.duration.endDate)), 'yyyy-MM-dd h:mm a')}
            />
          </Grid>
        </DetailsCard>
      </ContentHolder>
      <ContentHolder>
        <Header>
          <Heading>Offer Details</Heading>
        </Header>
        {/* <DetailsCard css="margin-bottom: 20px;">
          {promotion.offer_type === 'repeatVisit' ? (
            <Grid xs={1} sm={3} className="card-row">
              <InfoCard title="Offer Type" value={promotionOfferTypeConverter(promotion.offer_type)} />
              <InfoCard title="Minimum Visit" value={promotion.offer_details.minimum_visit} />
              <InfoCard
                title="Expected Budget"
                value={convertToCurrencyFormat(promotion.offer_details.max_spend_value)}
              />
              <InfoCard title="Offer On Final Visit" value={`$${promotion.offer_details.plastk_points}`} />
              <InfoCard title="Calculated Plastk Rewards Points" value={promotion.offer_details.plastk_points_value} />
            </Grid>
          ) : (
            <Grid xs={1} sm={3} className="card-row">
              <InfoCard title="Offer Type" value={promotionOfferTypeConverter(promotion.offer_type)} />
              <InfoCard
                title="Minimum Spent"
                value={convertToCurrencyFormat(promotion.offer_details.minimum_amount, 0)}
              />
              {(promotion.offer_type === 'percentBased' || promotion.offer_type === 'initialOffer') && (
                <InfoCard
                  title="Maximum Spent"
                  value={convertToCurrencyFormat(promotion.offer_details.maximum_amount, 0)}
                />
              )}
              <InfoCard
                title="Expected Budget"
                value={convertToCurrencyFormat(promotion.offer_details.max_spend_value, 0)}
              />
              <InfoCard
                title="Offer"
                value={
                  promotion.offer_type === 'dollarBased'
                    ? convertToCurrencyFormat(promotion.offer_details.plastk_points, 0)
                    : promotion.offer_type === 'percentBased'
                    ? `${promotion.offer_details.plastk_points} %`
                    : `${promotion?.offer_details?.initial_offer[promotion?.offer_details?.minimum_visit]} %`
                }
              />
              {promotion.offer_details?.every_day_offer && (
                <InfoCard title="Offer after Final Visit" value={`${promotion.offer_details?.every_day_offer}%`} />
              )}

              <InfoCard title="Calculated Plastk Rewards Points" value={promotion.offer_details.plastk_points_value} />
            </Grid>
          )}
        </DetailsCard> */}
        {promotion.offer_type === 'initialOffer' ? (
          getOfferDetails(promotion)
        ) : (
          <TextWrap>{getOfferDetails(promotion)}</TextWrap>
        )}
      </ContentHolder>
      <ContentHolder>
        <Header>
          <Heading>{promotionOfferTypeConverter(promotion.offer_type)} Promotion Details</Heading>
        </Header>
        <DetailsCard>
          {promotion.offer_type === 'repeatVisit' ? (
            <Table rowsData={rowsData} columnNames={columnNames} itemsPerPage={10} hideNoRow />
          ) : (
            <Grid xs={1} sm={2}>
              <InfoTransactionsCard
                title="Total Transations"
                value={details?.transactions ? details?.transactions : 0}
              />
              <InfoTransactionsCard title="Points Given" value={details?.rewardPoints ? details?.rewardPoints : 0} />
            </Grid>
          )}
        </DetailsCard>
      </ContentHolder>
      <ContentHolder>
        <Header>
          <Heading>Stores</Heading>
        </Header>
        {stores}
      </ContentHolder>
      <ContentHolder>
        <Header>
          <Heading>History</Heading>
        </Header>
        <Grid xs={1} sm={3}>
          <InfoHistoryCard
            title="Started"
            value={
              promotion?.status === 'Pending'
                ? '---'
                : format(getDateObject(new Date(promotion?.history?.startDate).toString()), 'yyyy-MM-dd h:mm a')
            }
          />
          <InfoHistoryCard title="Remaining" value={totalActiveTime} />
          <InfoHistoryCard title="Total Active Time" value={timeLeft} />
        </Grid>
      </ContentHolder>
    </Loaders>
  );
}

export default DetailsTab;
