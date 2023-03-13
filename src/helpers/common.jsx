/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import Compress from 'react-image-file-resizer';
import React from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import styled from 'styled-components/macro';
import { pdfjs } from 'react-pdf';
import Grid from '../components/atoms/Grid';

export const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;

  return true;
};

export const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const clearCookie = name => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

  return true;
};

export const compressImage = file => {
  let fileType = 'JPEG';
  if (file?.type.includes('png')) {
    fileType = 'PNG';
  }
  return new Promise(resolve => {
    Compress.imageFileResizer(
      file,
      Infinity,
      Infinity,
      fileType,
      100,
      0,
      uri => {
        resolve(uri);
      },
      'base64',
    );
  });
};
export const convertUrlToBase64 = url =>
  new Promise(resolve => {
    if (url) {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          resolve(reader.result);
        });
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    } else resolve('');
  });

export const convertPdfBase64 = file =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });

export const capitalize = str => {
  const arr = str.toLowerCase().split(' ');

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};

export const getStatusIconClass = (status = '') => {
  switch (status.trim().toLowerCase()) {
    case 'pending':
      return 'icon-clock';
    case 'processing':
      return 'icon-clock';
    case 'approved':
      return 'icon-check-circle';
    case 'rejected':
      return 'icon-error-circle';
    case 'cancelled':
      return 'icon-times-circle';
    default:
      return 'icon-warning';
  }
};
export const getDateObject = e => {
  if (typeof e === 'number') {
    return new Date(e);
  }
  const date = new Date(String(e)?.replace('Z', ''));
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(date?.getTime())) return new Date();
  return date;
};

export const useQuery = key => new URLSearchParams(window.location.search).get(key);

// export const GeoCoder = new window.google.maps.Geocoder();
// gecode based on type = "address" or "latlng" or "place_id"
export const GeoCode = async value => {
  try {
    const { results } = typeof window !== 'undefined' && (await new window.google.maps.Geocoder().geocode(value));

    if (!results) {
      throw Error('Unable to load maps');
    }
    const { address_components, geometry, place_id, formatted_address, types } = results[0];
    const address = {};
    // eslint-disable-next-line no-shadow
    address_components?.forEach(({ short_name, types }) => {
      if (types.includes('administrative_area_level_1')) {
        address.state = short_name;
      } else if (types.includes('administrative_area_level_2')) {
        address.county = short_name;
      } else if (types.includes('locality')) {
        address.city = short_name;
      } else address[types[0]] = short_name;
    });

    return {
      ...address,
      types,
      place_id,
      latlng: {
        lat: geometry?.location?.lat(),
        lng: geometry?.location?.lng(),
      },
      formatted_address,
    };
  } catch (err) {
    throw Error(err?.message ?? 'Unable to load maps');
  }
};

export const POINTS_REDEEMED_VALUE = 0.005;

export const getBarList = n => {
  const items = [];
  for (let i = 0; i < n; i++)
    items.push(
      <li
        key={i}
        style={{
          width: `${(1 / n) * 100}%`,
          borderRight: i + 1 !== n ? '1px solid #fadb13' : 'none',
        }}
      />,
    );
  return items;
};

export const convertToCurrencyFormat = (amount = '0', fixed = 2, dollar = true) =>
  `${dollar ? '$' : ''}${Number(amount)
    .toFixed(fixed)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export const getTimeFromDateTillNow = int => {
  let isValid = true;
  int?.forEach(({ startDate, endDate }) => {
    if (!startDate || !endDate) isValid = false;
  });
  if (!isValid || !int) return 'Not Yet Stopped';
  const duration = int.map(({ startDate, endDate }) => ({
    days: differenceInDays(endDate, startDate),
    hours: differenceInHours(endDate, startDate),
    minutes: differenceInMinutes(endDate, startDate),
    seconds: differenceInSeconds(endDate, startDate),
  }));
  let t = { d: 0, h: 0, m: 0, s: 0 };
  duration.forEach(d => {
    t = {
      d: t.d + d.days,
      h: t.h + d.hours,
      m: t.m + d.minutes,
      s: t.s + d.seconds,
    };
  });
  return `${t.d} Days ${t.h} Hours ${t.m} Minutes ${t.s} Seconds`;
};

export const shortenString = (str, len = 10) => {
  if (!str) return null;
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
};
export const convertReadable = amount =>
  `${
    Math.abs(amount) > 999
      ? `${Math.sign(amount) * (Math.abs(amount) / 1000).toFixed(1)}K`
      : Math.sign(amount) * Math.abs(amount)
  }`;
export const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const convertBase64PdfToImages = async base64 => {
  const images = [];
  const pdf = await pdfjs.getDocument(base64).promise;
  const canvas = document.createElement('canvas');
  for (let i = 0; i < pdf.numPages; i++) {
    // eslint-disable-next-line no-await-in-loop
    const page = await pdf.getPage(i + 1);
    const viewport = page.getViewport({ scale: 1.2 });
    const context = canvas.getContext('2d');
    canvas.height = viewport.height / 1.02;
    canvas.width = viewport.width / 1.01;
    // eslint-disable-next-line no-await-in-loop
    await page.render({ canvasContext: context, viewport }).promise;
    images.push(canvas.toDataURL());
  }
  canvas.remove();
  return images;
};
export const promotionOfferTypeConverter = type => {
  switch (type) {
    case 'dollarBased':
      return 'Dollar Based';
    case 'repeatVisit':
      return 'Visit Based';
    case 'percentBased':
      return 'Percent Based';
    case 'initialOffer':
      return 'Initial Offer';
    default:
      return 'Unknown';
  }
};

export const MinimumVisits = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const convertTZ = (date, tzString) =>
  new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));

export const filterStatus = promotion => {
  if (promotion.status === 'Stopped') {
    if (promotion?.history?.endDate >= promotion?.duration?.endDate) {
      return 'Completed';
    }
    if (!promotion?.history?.endDate) {
      return 'Completed';
    }
    if (promotion?.history?.endDate < promotion?.duration?.endDate) {
      return 'Stopped';
    }
  }

  return promotion.status;
};

export const getRemainingTime = (endDate, startDate) => {
  const dateFuture = new Date(endDate);
  const dateNow = new Date(startDate);

  let seconds = Math.floor((dateFuture - dateNow) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  hours -= days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
};
export const no_permission = 'no_permission';

export const getVisitNo = visit => {
  switch (visit) {
    case 1:
      return `${String(visit)}st`;
    case 2:
      return `${String(visit)}nd`;
    case 3:
      return `${String(visit)}rd`;
    default:
      return `${String(visit)}th`;
  }
};
export const showEditCardModal = user => {
  let showCard;
  if (user.status === 'Active' && user?.paymentInfo?.order_id && user?.client_type === 'Prepaid') {
    showCard = true;
  } else if (user?.card_skipped === true && user.status === 'Active' && user?.client_type === 'Credit') {
    showCard = true;
  } else if (user?.paymentInfo?.order_id && user.status === 'Active' && user?.client_type === 'Credit') {
    showCard = true;
  } else {
    showCard = true;
  }
  return showCard;
};

export const amountForDeposit = (clientType, action, selected_amount) => {
  if (selected_amount) {
    return selected_amount;
  }
  let amount;
  if (action === 'edit') {
    amount = 1;
  } else {
    // eslint-disable-next-line no-lonely-if
    if (clientType === 'Prepaid') {
      amount = 100;
    } else {
      amount = 1;
    }
  }
  return amount;
};

export const getOfferDetails = ({
  offer_type,
  // eslint-disable-next-line no-unused-vars
  offer_details: { minimum_amount, minimum_visit, maximum_amount, plastk_points_value, plastk_points, every_day_offer },
  stores,
  state,
  duration: { startDate, endDate },
}) => {
  if (!stores.length || !offer_type || !startDate || !endDate) return '';
  const Text = styled.span`
    display: block;
    margin: 0 0 15px;

    &:last-child {
      margin: 0;
    }
  `;
  const TextWrap = styled.div`
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #dadada;
    border-radius: 5px;
    margin: 0 0 20px;
    padding: 25px 20px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  try {
    switch (offer_type) {
      case 'dollarBased':
        return (
          <>
            <Text>
              Spend at least {convertToCurrencyFormat(minimum_amount, 0)} and receive {plastk_points_value} plastk
              points.
            </Text>
            <Text>
              Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} To ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );

      case 'repeatVisit':
        return (
          <>
            <Text>
              Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
              {(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}{' '}
              visit.
            </Text>
            <Text>
              Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );

      case 'percentBased':
        return (
          <>
            <Text>
              Spend ${minimum_amount} or more and receive {plastk_points}% in plastk points, <br />
              up to a maximum of{' '}
              {plastk_points_value % 1 !== 0
                ? convertToCurrencyFormat(plastk_points_value, 2, false)
                : convertToCurrencyFormat(plastk_points_value, 0, false)}
              points.
            </Text>
            <Text>
              Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );
      case 'initialOffer':
        return (
          <Grid xs={1} sm={2} gap={20}>
            <TextWrap>
              <Text>
                Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
                {(() => {
                  switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                    case 1:
                      return `${String(minimum_visit)}st`;
                    case 2:
                      return `${String(minimum_visit)}nd`;
                    case 3:
                      return `${String(minimum_visit)}rd`;
                    default:
                      return `${String(minimum_visit)}th`;
                  }
                })()}{' '}
                visit.
              </Text>
              <Text>
                Offer valid between{' '}
                {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                  getDateObject(new Date(endDate).toString()),
                  'MMM do yyyy hh:mm a',
                )}`}
              </Text>
              <Text>*Terms And Conditions Apply</Text>
            </TextWrap>
            <TextWrap>
              {Object.values(state?.initial_offer).map((val, index) => (
                <Text key={index + 1}>
                  {`${getVisitNo(index + 1)} visit- ${val}% in Plastk Reward Points up to`}&nbsp;
                  {`${((val / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
                </Text>
              ))}
              {every_day_offer && (
                <Text>
                  {`Everyday visit- ${every_day_offer}% in Plastk Reward Points up to`}&nbsp;
                  {`${((every_day_offer / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
                </Text>
              )}
            </TextWrap>
          </Grid>
        );
      default:
        return (
          <>
            <Text>Wrong Offer Type ....</Text>
            <Text>Offer valid between ---- ----</Text>
            <Text>*Terms And Conditions Apply</Text>
          </>
        );
    }
  } catch (e) {
    return (
      <>
        <Text>{e.message}</Text>
        <Text>Offer valid between ---- ----</Text>
        <Text>*Terms And Conditions Apply</Text>
      </>
    );
  }
};

export const getOfferText = ({
  offer_type,
  // eslint-disable-next-line no-unused-vars
  offer_details: {
    minimum_amount,
    minimum_visit,
    maximum_amount,
    plastk_points_value,
    plastk_points,
    initial_offer,
    every_day_offer,
  },
  stores,
  duration: { startDate, endDate },
}) => {
  if (!stores.length || !offer_type || !plastk_points_value || !startDate || !endDate) return '';
  try {
    switch (offer_type) {
      case 'dollarBased':
        return (
          <>
            <p>
              Spend at least {convertToCurrencyFormat(minimum_amount, 0)} and receive {plastk_points_value} plastk
              points.
            </p>
          </>
        );

      case 'repeatVisit':
        return (
          <>
            <p>
              Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
              {(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}{' '}
              visit.
            </p>
          </>
        );

      case 'percentBased':
        return (
          <>
            <p>
              Spend ${minimum_amount} or more and receive {plastk_points}% in plastk points, up to a maximum of &nbsp;
              {plastk_points_value % 1 !== 0
                ? convertToCurrencyFormat(plastk_points_value, 2, false)
                : convertToCurrencyFormat(plastk_points_value, 0, false)}
              &nbsp; points.
            </p>

            {/* <p>
              Spend ${minimum_amount} or more and receive {plastk_points}% &nbsp; in plastk points.
            </p> */}
          </>
        );
      case 'initialOffer':
        return (
          <p>
            Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
            {(() => {
              switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                case 1:
                  return `${String(minimum_visit)}st`;
                case 2:
                  return `${String(minimum_visit)}nd`;
                case 3:
                  return `${String(minimum_visit)}rd`;
                default:
                  return `${String(minimum_visit)}th`;
              }
            })()}{' '}
            visit.
            {/* {Object.values(initial_offer).map((val, index) => (
              <div key={index + 1}>
                {`${getVisitNo(index + 1)} visit- ${val}% in Plastk Reward Points up to`}&nbsp;
                {`${((val / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
              </div>
            ))}
            {every_day_offer && (
              <div>
                {`Everyday visit- ${every_day_offer}% in Plastk Reward Points up to`}&nbsp;
                {`${((every_day_offer / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
              </div>
            )} */}
          </p>
        );
      default:
        return (
          <>
            <p>Wrong Offer Type ....</p>
            <p>Offer valid between ---- ----</p>
            <p>*Terms And Conditions Apply</p>
          </>
        );
    }
  } catch (e) {
    return (
      <>
        <p>{e.message}</p>
        <p>Offer valid between ---- ----</p>
        <p>*Terms And Conditions Apply</p>
      </>
    );
  }
};

export const getOfferDetailsAppView = ({
  offer_type,
  // eslint-disable-next-line no-unused-vars
  offer_details: {
    minimum_amount,
    minimum_visit,
    maximum_amount,
    plastk_points_value,
    plastk_points,
    initial_offer,
    every_day_offer,
  },
  stores,
  duration: { startDate, endDate },
}) => {
  if (!stores.length || !offer_type || !plastk_points_value || !startDate || !endDate) return '';
  try {
    switch (offer_type) {
      case 'dollarBased':
        return (
          <>
            <p>
              Spend at least {convertToCurrencyFormat(minimum_amount, 0)} and receive {plastk_points_value} plastk
              points. Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} To ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>
          </>
        );

      case 'repeatVisit':
        return (
          <>
            <p>
              Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
              {(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}{' '}
              visit. Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>
          </>
        );

      case 'percentBased':
        return (
          <>
            <p>
              Spend ${minimum_amount} or more and receive {plastk_points}% in plastk points, up to a maximum of{' '}
              {plastk_points_value % 1 !== 0
                ? convertToCurrencyFormat(plastk_points_value, 2, false)
                : convertToCurrencyFormat(plastk_points_value, 0, false)}
              points. Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>
          </>
        );
      case 'initialOffer':
        return (
          <>
            <p>
              Visit {minimum_visit} times and receive {plastk_points_value} plastk points on the{' '}
              {(() => {
                switch (+String(minimum_visit).split('')[String(minimum_visit).split('').length - 1]) {
                  case 1:
                    return `${String(minimum_visit)}st`;
                  case 2:
                    return `${String(minimum_visit)}nd`;
                  case 3:
                    return `${String(minimum_visit)}rd`;
                  default:
                    return `${String(minimum_visit)}th`;
                }
              })()}{' '}
              visit. Offer valid between{' '}
              {`${format(getDateObject(new Date(startDate).toString()), 'MMM do yyyy hh:mm a')} to ${format(
                getDateObject(new Date(endDate).toString()),
                'MMM do yyyy hh:mm a',
              )}`}
            </p>
            <p>*Terms And Conditions Apply</p>

            {/* {Object.values(initial_offer).map((val, index) => (
              <p key={index + 1}>
                {`${getVisitNo(index + 1)} visit- ${val}% in Plastk Reward Points up to`}&nbsp;
                {`${((val / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
              </p>
            ))}
            {every_day_offer && (
              <p>
                {`Everyday visit- ${every_day_offer}% in Plastk Reward Points up to`}&nbsp;
                {`${((every_day_offer / 100) * maximum_amount * 200).toFixed(0)}`}&nbsp;Points
              </p>
            )} */}
          </>
        );
      default:
        return (
          <>
            <p>Wrong Offer Type ....</p>
            <p>Offer valid between ---- ----</p>
            <p>*Terms And Conditions Apply</p>
          </>
        );
    }
  } catch (e) {
    return (
      <>
        <p>{e.message}</p>
        <p>Offer valid between ---- ----</p>
        <p>*Terms And Conditions Apply</p>
      </>
    );
  }
};

export const getFileNameFromURL = url => {
  const fileName = url.substr(url.lastIndexOf('/') + 1);

  return fileName.includes('?') ? fileName.split('?')[0] : fileName;
};

export const getOfferPercent = promotion => {
  const {
    offer_type,
    offer_details: { minimum_amount, plastk_points_value, plastk_points, initial_offer, minimum_visit },
  } = promotion;
  switch (offer_type) {
    case 'percentBased':
      return plastk_points;
    case 'repeatVisit':
      return plastk_points_value;
    case 'dollarBased':
      return ((plastk_points / minimum_amount) * 100)?.toFixed(0);
    // default will be 'initialOffer'
    default:
      return initial_offer[minimum_visit];
  }
};
