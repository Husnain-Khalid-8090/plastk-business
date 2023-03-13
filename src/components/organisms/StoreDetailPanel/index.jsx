import React, { useRef, useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { convertToCurrencyFormat, getDateObject, getVisitNo } from '../../../helpers/common';
import StoreService from '../../../services/storeService';
// import { TextWrap } from '../../atoms/ProfileField/ProfileField.styles';
import storeimg from '../../../assets/images/store-img02.png';

import {
  ButtonClose,
  StyledStore,
  StoreImgBox,
  Status,
  StoreName,
  Title,
  Ul,
  Li,
  Btn,
  List,
  Ico,
  SpecialOffer,
  FlexHolder,
  TextBox,
  Heading,
  Text,
  TCText,
  PointsCol,
  Box,
  Points,
  PointText,
  Date as DateText,
  StoreAddress,
  Item,
  Link,
  Icon,
  ReviewBlock,
  ReviewHolder,
  ImgHolder,
  TextArea,
  Paragraph,
  Name,
  TimeList,
  OpenerIcon,
  Footer,
  Inner,
  SubText,
  VisitTrack,
  TrackBar,
  OfferList,
  FlexBox,
  OfferDetailsBox,
} from './StoreDetailPanel.styles';

import { AuthContext } from '../../../context/authContext';
// eslint-disable-next-line no-unused-vars
import StarRating from '../../molecules/StarRating';

const propTypes = {
  setPanelVisible: PropTypes.func,
};

function StoreDetail({ setPanelVisible, campaignDetails, storeData, mobileView }) {
  // eslint-disable-next-line no-underscore-dangle
  const { store } = StoreService.GetStoreDetails(storeData?._id);
  const wrapperRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const [offerDropdown, setOfferDropdown] = useState(false);
  const [visit, setVisit] = useState(1);
  const { user } = useContext(AuthContext);

  const handlePanelClose = () => {
    setPanelVisible(false);
    const p = document.getElementById('promotion-panel');
    p.classList.remove('panel-active');
  };

  const VisitBar = ({ totalVisits, visits }) => (
    <VisitTrack offer={campaignDetails?.promotion?.offer_type}>
      {[...Array(totalVisits)].map((_, index) => (
        <TrackBar
          className={index < visits && 'active'}
          onClick={() => {
            if (visit === index + 1 && index !== 0) {
              setVisit(visit - 1);
            } else {
              setVisit(index + 1);
            }
          }}
        />
      ))}
    </VisitTrack>
  );

  const getofferJsx = offer => {
    switch (offer) {
      case 'dollarBased':
        return (
          <SpecialOffer offer={offer}>
            <Title>Special Offer</Title>
            <FlexHolder>
              <TextBox>
                <Heading offer={offer}>
                  Spend at least {convertToCurrencyFormat(+campaignDetails?.promotion?.offer_details?.minimum_amount)}
                </Heading>
                <SubText offer={offer}>
                  And receive {campaignDetails?.promotion?.offer_details?.plastk_points_value} Plastk points
                </SubText>
              </TextBox>
              <PointsCol>
                <Box offer={offer}>
                  <Inner offer={offer}>
                    <Points>{campaignDetails?.promotion?.offer_details?.plastk_points_value}</Points>
                    <PointText>Plastk Points</PointText>
                  </Inner>
                </Box>
              </PointsCol>
            </FlexHolder>
            <Footer>
              <TCText>*Terms And Conditions Apply</TCText>
              <DateText>
                Expires{' '}
                {format(
                  getDateObject(new Date(campaignDetails?.promotion?.duration?.endDate).toString()),
                  ' MMM do yyyy hh:mm a',
                )}
              </DateText>
            </Footer>
          </SpecialOffer>
        );

      case 'repeatVisit':
        return (
          <SpecialOffer offer={offer}>
            <Title>Special Offer</Title>
            <FlexHolder>
              <TextBox>
                <Heading offer={offer}>Visit {campaignDetails?.promotion?.offer_details?.minimum_visit} Times</Heading>
                <SubText offer={offer}>
                  And receive {campaignDetails?.promotion?.offer_details?.plastk_points_value} Plastk points on the{' '}
                  {(() => {
                    switch (
                      +String(campaignDetails?.promotion?.offer_details?.minimum_visit).split('')[
                        String(campaignDetails?.promotion?.offer_details?.minimum_visit).split('').length - 1
                      ]
                    ) {
                      case 1:
                        return `${String(campaignDetails?.promotion?.offer_details?.minimum_visit)}st`;
                      case 2:
                        return `${String(campaignDetails?.promotion?.offer_details?.minimum_visit)}nd`;
                      case 3:
                        return `${String(campaignDetails?.promotion?.offer_details?.minimum_visit)}rd`;
                      default:
                        return `${String(campaignDetails?.promotion?.offer_details?.minimum_visit)}th`;
                    }
                  })()}{' '}
                  visit.
                </SubText>
                <VisitBar totalVisits={Number(campaignDetails?.promotion?.offer_details?.minimum_visit)} visits={0} />
              </TextBox>
              <PointsCol>
                <Box offer={offer}>
                  <Inner offer={offer}>
                    <Points>{campaignDetails?.promotion?.offer_details?.plastk_points_value}</Points>
                    <PointText>Plastk Points</PointText>
                  </Inner>
                </Box>
              </PointsCol>
            </FlexHolder>
            <Footer>
              <TCText>*Terms And Conditions Apply</TCText>
              <DateText>
                Expires{' '}
                {format(
                  getDateObject(new Date(campaignDetails?.promotion?.duration.endDate).toString()),
                  'MMM do yyyy hh:mm a',
                )}
              </DateText>
            </Footer>
          </SpecialOffer>
        );

      case 'percentBased':
        return (
          <SpecialOffer offer={offer}>
            <Title>Special Offer</Title>
            <FlexHolder>
              <TextBox>
                <Heading offer={offer}>
                  Spend {convertToCurrencyFormat(+campaignDetails?.promotion?.offer_details?.minimum_amount)} or more
                </Heading>
                <SubText offer={offer}>
                  And receive {campaignDetails?.promotion?.offer_details?.plastk_points}% in Plastk points, up to a
                  maximum of{' '}
                  {campaignDetails?.promotion?.offer_details?.plastk_points *
                    2 *
                    campaignDetails?.promotion?.offer_details?.maximum_amount}{' '}
                  points.
                </SubText>
              </TextBox>
              <PointsCol>
                <Box offer={offer}>
                  <Inner offer={offer}>
                    <Points>
                      {convertToCurrencyFormat(
                        campaignDetails?.promotion?.offer_details?.minimum_plastk_point_value,
                        0,
                        false,
                      )}
                    </Points>
                    <PointText>Plastk Points</PointText>
                  </Inner>
                </Box>
              </PointsCol>
            </FlexHolder>
            <Footer>
              <TCText>*Terms And Conditions Apply</TCText>
              <DateText>
                Expires{' '}
                {format(
                  getDateObject(new Date(campaignDetails?.promotion?.duration.endDate).toString()),
                  'MMM do yyyy hh:mm a',
                )}
              </DateText>
            </Footer>
          </SpecialOffer>
        );
      case 'initialOffer':
        return (
          <SpecialOffer offer={offer}>
            <Title>Introductory Offer</Title>
            <FlexHolder>
              <TextBox>
                <Heading offer={offer}>{getVisitNo(visit)} Visit</Heading>
                <SubText offer={offer}>
                  Spend {convertToCurrencyFormat(campaignDetails?.promotion?.offer_details?.minimum_amount)} or more and
                  receive&nbsp;
                  <strong className="bolder">{`${campaignDetails?.promotion?.offer_details?.initial_offer[visit]}%`}</strong>{' '}
                  in Plastk Points, up to&nbsp;
                  {(
                    (campaignDetails?.promotion?.offer_details?.initial_offer[visit] / 100) *
                    campaignDetails?.promotion?.offer_details?.maximum_amount *
                    200
                  ).toFixed(0) ?? 0}
                  &nbsp;points.
                </SubText>
                <VisitBar
                  totalVisits={Number(campaignDetails?.promotion?.offer_details?.minimum_visit)}
                  visits={visit}
                />
              </TextBox>
              <PointsCol>
                <Box offer={offer}>
                  <Inner offer={offer}>
                    <Points>
                      {(
                        (campaignDetails?.promotion?.offer_details?.initial_offer[visit] / 100) *
                        campaignDetails?.promotion?.offer_details?.maximum_amount *
                        200
                      ).toFixed(0) ?? 0}
                    </Points>
                    <PointText>Plastk Points</PointText>
                  </Inner>
                </Box>
              </PointsCol>
            </FlexHolder>
            <Footer>
              <TCText>*Terms And Conditions Apply</TCText>
              <DateText>
                Expires{' '}
                {format(
                  getDateObject(new Date(campaignDetails?.promotion?.duration.endDate).toString()),
                  'MMM do yyyy hh:mm a',
                )}
              </DateText>
            </Footer>
          </SpecialOffer>
        );
      default:
        return null;
    }
  };

  const textTruncate = (str, length, ending) => {
    if (length == null) {
      // eslint-disable-next-line no-param-reassign
      length = 100;
    }
    if (ending == null) {
      // eslint-disable-next-line no-param-reassign
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    }
    return str;
  };
  return (
    <>
      <StyledStore ref={wrapperRef} mobileView={mobileView}>
        <ButtonClose onClick={() => handlePanelClose()}>
          <i className="icon-close" />
        </ButtonClose>
        <StoreImgBox>
          <img
            src={
              campaignDetails?.promotion?.image_url
                ? campaignDetails?.promotion?.image_url
                : storeData?.image_url
                ? storeData?.image_url
                : user?.attachments?.business_logo?.cloudinary_url
                ? user?.attachments?.business_logo?.cloudinary_url
                : storeimg
            }
            alt={storeimg}
          />
        </StoreImgBox>
        <StoreName>
          <Status>
            {(() => {
              if (campaignDetails.promotion.status === 'Stopped') {
                if (campaignDetails.promotion?.history?.endDate >= campaignDetails.promotion?.duration?.endDate) {
                  return 'Completed';
                }
                if (!campaignDetails.promotion?.history?.endDate) {
                  return 'Completed';
                }
                if (campaignDetails.promotion?.history?.endDate < campaignDetails.promotion?.duration?.endDate) {
                  return 'Stopped';
                }
              }
              return campaignDetails.promotion.status;
            })()}
          </Status>
          <Title>{storeData?.name}</Title>
          {store?.store_type !== 'online' && (
            <Ul className="rating">
              <Li css="font-size:16px">{store?.rating}</Li>
              <StarRating value={store?.rating} />
            </Ul>
          )}
          <List>
            {store?.store_type !== 'online' && (
              <Li>
                <Btn
                  href={`https://maps.google.com/?ll=${storeData?.address?.latlng?.lat},${storeData?.address?.latlng?.lng}`}
                  target="_blank"
                  rel="noreferrer">
                  <Ico className="icon-directions" />
                  Direction
                </Btn>
              </Li>
            )}
            <Li>
              <Btn href={`tel:${store?.store_type !== 'online' ? store?.formatted_phone_number : store?.contact}`}>
                <Ico className="icon-call" />
                Call
              </Btn>
            </Li>
            <Li>
              <Btn href={store?.website} target="_blank">
                <Ico className="icon-link1" />
                Website
              </Btn>
            </Li>
            {storeData?.menu?.menu_url && (
              <Li>
                <Btn css="cursor:pointer" href={storeData?.menu?.menu_url} target="_blank">
                  <Ico className="icon-menu" />
                  Menu
                </Btn>
              </Li>
            )}
          </List>
        </StoreName>
        {getofferJsx(campaignDetails?.promotion?.offer_type)}
        <StoreAddress>
          <Item>
            <Icon className="icon-orix-pin" />
            <Text>{store?.name}</Text>
          </Item>
          {store?.store_type !== 'online' && (
            <Item className={dropdown && 'active'} onClick={() => setDropdown(!dropdown)} css="cursor:pointer">
              {store?.opening_hours?.open_now ? (
                <>
                  <Icon className="icon-clock" css="color: var(--success)" />
                  <Text css="color: var(--success)">Open now</Text>
                </>
              ) : (
                <>
                  <Icon className="icon-clock" css="color: var(--danger)" />
                  <Text css="color: var(--danger)">Closed</Text>
                </>
              )}
              <OpenerIcon className={`icon-arrow-next ${dropdown && 'icon-arrow-down1'}`} />
              {dropdown && store?.opening_hours?.weekday_text ? (
                <TimeList>
                  {store?.opening_hours?.weekday_text.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </TimeList>
              ) : null}
            </Item>
          )}
          <Item>
            <Icon className="icon-phonecall" />
            <Link href={`tel:${store?.store_type !== 'online' ? store?.formatted_phone_number : store?.contact}`}>
              {store?.store_type !== 'online'
                ? store?.formatted_phone_number
                  ? store?.formatted_phone_number
                  : 'N/A'
                : store?.contact}
            </Link>
          </Item>
          <Item>
            <Icon className="icon-link" />
            <Link href={`${store?.website}`} target="_blank">
              {store?.website ? textTruncate(store?.website, 30) : null}
            </Link>
          </Item>
        </StoreAddress>
        {campaignDetails?.promotion?.offer_type === 'initialOffer' && (
          <OfferDetailsBox>
            <FlexBox
              onClick={() => {
                setOfferDropdown(prev => !prev);
              }}>
              <Title>Offer Details</Title>
              <OpenerIcon css="cursor:pointer">
                <span className="material-icons-outlined"> {!offerDropdown ? 'expand_more' : 'expand_less'} </span>
              </OpenerIcon>
            </FlexBox>

            {offerDropdown && (
              <OfferList mobileView={mobileView}>
                {Object.values(campaignDetails?.promotion?.offer_details?.initial_offer).map((val, index) => (
                  <li key={index + 1}>
                    {`${getVisitNo(index + 1)} visit- ${val}% in Plastk Reward Points up to`}&nbsp;
                    <span className="points">{`${(
                      (val / 100) *
                      campaignDetails?.promotion?.offer_details?.maximum_amount *
                      200
                    ).toFixed(0)}`}</span>
                    Points
                  </li>
                ))}
                {campaignDetails?.promotion?.offer_details?.every_day_offer && (
                  <li>
                    {`Everyday visit- ${campaignDetails?.promotion?.offer_details?.every_day_offer}% in Plastk Reward Points up to`}
                    &nbsp;
                    <span className="points">{`${(
                      (campaignDetails?.promotion?.offer_details?.every_day_offer / 100) *
                      campaignDetails?.promotion?.offer_details?.maximum_amount *
                      200
                    ).toFixed(0)}`}</span>
                    Points
                  </li>
                )}
              </OfferList>
            )}
          </OfferDetailsBox>
        )}
        {store?.store_type !== 'online' && (
          <ReviewBlock>
            <Title>Reviews</Title>
            {store?.reviews?.slice(0, 2).map((item, index) => (
              <ReviewHolder key={index}>
                <ImgHolder>
                  <img src={item?.profile_photo_url} alt="img" />
                </ImgHolder>
                <TextArea>
                  <Name>{item?.author_name}</Name>
                  <Paragraph>{textTruncate(item?.text, 100)}</Paragraph>
                </TextArea>
              </ReviewHolder>
            ))}
          </ReviewBlock>
        )}
      </StyledStore>
    </>
  );
}

StoreDetail.propTypes = propTypes;

export default StoreDetail;
