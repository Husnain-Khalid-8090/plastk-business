/* eslint-disable dot-notation */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useMemo, useState, useEffect, useCallback, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled, { css } from 'styled-components/macro';
import { formatISO } from 'date-fns/esm';
import * as htmlToImage from 'html-to-image';
import Form, { useForm } from '../Form';
import Field from '../../molecules/Field';
import Select from '../../atoms/Select';
import Button from '../../atoms/Button';
import Grid from '../../atoms/Grid';
import Heading from '../../atoms/Heading';
import StoreService from '../../../services/storeService';
import {
  TextWrap,
  Holder,
  LeftColumn,
  ImgColumn,
  RadioWrap,
  VisitsHolder,
  FieldHolder,
  BtnHolder,
  StyledList,
  FieldWrap,
  BtnWrap,
  ColorField,
  ImgField,
  ImgHolder,
  BannerHolder,
  BannerText,
  LogoHolder,
  LogoBox,
  BannerImg,
  Img,
} from './CreatePromotionModal.style';
import Toast from '../../molecules/Toast';
import PromotionService from '../../../services/promotionsService';
import { SelectProvince, SelectCity, SelectOfferType } from '../../../helpers/constants';
import ChooseFile from '../../atoms/ChooseFile';
import {
  getOfferDetails,
  getOfferText,
  getOfferDetailsAppView,
  convertUrlToBase64,
  MinimumVisits,
  getOfferPercent,
} from '../../../helpers/common';
import ModalContainer from '../../molecules/ModalContainer';
import { AuthContext } from '../../../context/authContext';
import RcPicker from '../../atoms/RcPicker';
import Icon from '../../atoms/Icon';
import Paragraph from '../../atoms/Paragraph';
import Label from '../../atoms/Label';
import ImgPreviewModal from '../ImgPreviewModal';
import MacBookView from '../MacBookView';
import PromotionMobileView from '../PromotionMobileView';
import ColorPicker from '../../atoms/ColorPicker';
import logoImg from '../../../assets/images/logo-small.svg';

// import Prototype from '../prototype/prototype';

function CreatePromotionModal({ promotion, clone, onClose, extend, edit }) {
  const [form] = useForm();
  const [combinedOptions, setCombinedOptions] = useState([]); // TODO SHFT BACKEND
  const [filteredCities, setFilteredCities] = useState(SelectCity);
  const [filteredProvinces] = useState(SelectProvince);
  const [state, setState] = useState({ initial_offer: {}, primary_logo: true });
  const [promotionInfo, setPromotionInfo] = useState({});
  const [customImg, setCustomImg] = useState(false);
  const [defaultImg, setDefaultImg] = useState(true);
  const [customImgSrc, setCustomImgSrc] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [storeNames, setStoreNames] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateCheck, setDateCheck] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [dateValid, setDateValid] = useState(false);
  const [removedStores, setRemovedStores] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [filteredStores, setFilteredStores] = useState([]);
  const [prevDuration, setPrevDuration] = useState(null);
  const [current1, setCurrent1] = useState(null);
  const [current2, setCurrent2] = useState(null);
  const { refetch, user } = useContext(AuthContext);
  const [loadingImg, setLoadingImg] = useState(false);
  const firstThree = SelectOfferType.slice(0, 3);
  const { stores_data, stores_loading } = StoreService.GetStores(1, 10, {
    searchText: '',
    filterText: 'Active',
    getAll: true,
  });
  const { storeGroups_data } = StoreService.GetStoreGroups({
    page: 1,
    pageSize: 10,
    searchText: '',
    getAll: true,
  });
  const { stores } = useMemo(
    () => ({
      stores: stores_data?.data?.items?.length
        ? stores_data?.data?.items?.map(({ name, _id, ...data }) => ({
            _id,
            name,
            value: _id,
            label: name,
            ...data,
          }))
        : [],
    }),
    [stores_data, stores_loading],
  );

  const { storeGroups } = useMemo(
    () => ({
      storeGroups: storeGroups_data?.store_groups,
    }),
    [storeGroups_data],
  );
  const filterStoresAndGroups = ({ selectedStores, selectedStoreGroups, disabledOptions = [] }) => {
    const { province, city } = form.getFieldsValue();
    const selected_provinces = province?.map(({ value }) => value.toLowerCase());
    const selected_cities = city?.map(({ label }) => label.toLowerCase());
    const all_province_check = selected_provinces.includes('all');
    const all_cities_check = selected_cities.includes('all');
    let tempStores = [];
    let tempStoreGroups = [];

    tempStores =
      disabledOptions && disabledOptions.length
        ? [
            ...disabledOptions
              .filter(grp => !grp.stores)
              ?.map(data => ({
                ...data,
                isDisabled:
                  selectedStoreGroups.length && !data.isDisabled
                    ? !!selectedStoreGroups?.filter(({ stores }) => stores?.includes(data?.value))?.length
                    : data.isDisabled,
              })),
          ]
        : [];

    tempStoreGroups =
      disabledOptions && disabledOptions.length
        ? [
            ...disabledOptions
              .filter(grp => grp.stores)
              ?.map(data => ({
                ...data,
                isDisabled: !data.isDisabled
                  ? !!(
                      data?.stores?.filter(x => selectedStores?.map(({ _id }) => _id).includes(x))?.length ||
                      selectedStoreGroups?.filter(
                        ({ stores, _id }) =>
                          stores?.filter(n => data?.stores?.indexOf(n) !== -1)?.length && _id !== data?._id, // checking the intersection of the stores
                      )?.length
                    )
                  : data.isDisabled,
              })),
          ]
        : [];

    if (all_province_check && all_cities_check) {
      setCombinedOptions(() => [...tempStores, ...tempStoreGroups]);
    } else {
      let stores = [];
      if (all_cities_check) {
        stores = tempStores.filter(item => selected_provinces?.includes(item?.address?.state?.toLowerCase?.()));
      } else if (all_province_check) {
        stores = tempStores.filter(item => selected_cities?.includes(item?.address?.city?.toLowerCase?.()));
      } else {
        stores = tempStores?.filter(
          item =>
            selected_provinces.includes(item?.address?.state?.toLowerCase?.()) &&
            selected_cities.includes(item?.address?.city?.toLowerCase?.()),
        );
      }
      const store_ids = stores?.map(({ _id }) => _id);
      const groups = tempStoreGroups?.filter(({ stores }) => !stores?.filter(id => !store_ids?.includes(id)).length);
      setCombinedOptions([...stores, ...groups]);
    }
  };
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  const textColor = bgColor => {
    const rgb = hexToRgb(bgColor);

    const r = rgb.r * 255;
    const g = rgb.g * 255;
    const b = rgb.b * 255;
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    const col = yiq >= 30000 ? 'black' : 'white';
    return col;
  };
  const handlePromotionInfo = (value, type, storeId) => {
    const tempData = promotionInfo;
    if (type === 'clear_all') {
      setPromotionInfo({});
      return;
    }
    if (type === 'clear') {
      tempData[storeId][`font_color`] = '#000000';
      tempData[storeId][`font_color_label`] = 'black';
      tempData[storeId][`card_bg_color`] = '#FFFFFF';
      tempData[storeId][`card_bg_color_label`] = 'black';
      tempData[storeId][`background_image_url`] = null;
      form.setFieldsValue({ [`font_color_${storeId}`]: '#000000' });
      form.setFieldsValue({ [`font_color_label_${storeId}`]: 'black' });
      form.setFieldsValue({ [`card_bg_color_${storeId}`]: '#FFFFFF' });
      form.setFieldsValue({ [`card_bg_color_label_${storeId}`]: 'black' });
      form.setFieldsValue({ [`background_image_url_${storeId}`]: null });
    } else {
      if (tempData[storeId] === undefined) {
        tempData[storeId] = {};
      }
      if (tempData[storeId].storeId === undefined) {
        tempData[storeId].storeId = storeId;
      }

      if (type === 'font_color') {
        tempData[storeId].font_color_label = textColor(value);
      }

      if (type === 'card_bg_color') {
        tempData[storeId].card_bg_color_label = textColor(value);
      }

      if (tempData[storeId][type] === undefined) {
        tempData[storeId][type] = '';
      }
      tempData[storeId][type] = value;
      setPromotionInfo(tempData);
      form.setFieldsValue({ [`${type}_${storeId}`]: value });
    }
  };
  const handlePromotionPreview = async storeId => {
    const tempData = promotionInfo;
    try {
      const node = document.getElementById(storeId);

      if (tempData[storeId]?.card_image_url === undefined) {
        tempData[storeId].card_image_url = '';
      }

      const dataUrl = await htmlToImage.toPng(node);
      tempData[storeId].card_image_url = dataUrl;
      setPromotionInfo(tempData);
    } catch (err) {
      tempData[storeId].card_image_url = undefined;
    }
  };
  useEffect(() => {
    if (promotion && stores?.length) {
      setLoadingImg(true);
      const { promotions } = promotion;
      form.setFieldsValue({
        name: clone ? promotion?.name.concat(' cloned') : promotion.name,

        offer_type: {
          label: promotion.offer_type,
          value: user?.adminRoleTypes.length !== 0 ? [{ value: 'initialOffer', label: 'Initial Offer' }] : firstThree,
        },

        minimum_amount: promotion?.offer_details?.minimum_amount,
        maximum_amount: promotion?.offer_details?.maximum_amount,
        max_spend_value: promotion?.offer_details?.max_spend_value,
        minimum_visit: promotion?.offer_details?.minimum_visit,
        point_value: promotion?.offer_details?.plastk_points,
        selected_stores: stores?.filter(store => promotion?.stores?.map(({ _id }) => _id)?.includes(store._id)),
        store_groups: promotion?.store_groups ?? [],
      });
      // setPromotion inFO
      const obj = {};
      promotions?.forEach(async v => {
        obj[v.store_id] = {
          background_image_url: {
            target: {
              name: 'Image',
              type: 'image/png',
              value: v.background_base64,
            },
          },
          card_bg_color: v.card_bg_color,
          card_bg_color_label: 'white',
          font_color: v.font_color,
          font_color_label: 'black',
          card_image_url: v.card_image_url,
          storeId: v.store_id,
          _id: v?._id,
        };
      });
      setPromotionInfo(obj);
      setSelectedStores(
        stores?.filter(store => promotion?.stores?.map(({ _id }) => _id)?.includes(store._id)).map(({ _id }) => _id),
      );

      //
      if (!clone) {
        form.setFieldsValue({
          duration: {
            startDate: new Date(promotion.duration.startDate),
            endDate: new Date(promotion.duration.endDate),
          },
        });
        if (!extend) {
          // eslint-disable-next-line no-use-before-define
          handleDate({
            target: {
              value: {
                startDate: new Date(promotion.duration.startDate),
                endDate: new Date(promotion.duration.endDate),
                isValid: true,
              },
            },
          });
        }
      }
      setStoreNames(
        stores
          ?.filter(store => promotion?.stores?.map(({ _id }) => _id)?.includes(store._id))
          .map(({ name }) => `"${name}"`),
      );

      if (!clone) {
        // setStoreNames(
        //   stores
        //     ?.filter(store => promotion?.stores?.map(({ _id }) => _id)?.includes(store._id))
        //     .map(({ name }) => `"${name}"`),
        // );
        // setSelectedStores(
        //   stores?.filter(store => promotion?.stores?.map(({ _id }) => _id)?.includes(store._id)).map(({ _id }) => _id),
        // );

        if (promotion?.image_url) {
          setCustomImg(true);
          setCustomImgSrc(`${promotion.image_url}?${new Date().getTime()}`);
          setDefaultImg(false);
        } else {
          setDefaultImg(true);
        }
      }
      setLoadingImg(false);
    }
    const all_city_label = SelectCity.filter(({ label }) => label === 'All');
    form.setFieldsValue({
      province: [{ label: 'All', value: 'All' }],
      city: all_city_label,
    });
  }, [stores]);
  const handleProvince = ({ target: { value } }) => {
    if (value?.length) {
      const selected_provinces = value.map(({ value }) => value.toLowerCase());
      const all_check = selected_provinces.includes('all');
      const last_value = value[value.length - 1].value === 'All';
      if (all_check && selected_provinces.length >= 1) {
        selected_provinces.shift();

        const cities = SelectCity.filter(_ => selected_provinces.includes(_.myValue.toLowerCase()));
        setFilteredCities(() => cities);
      } else if (selected_provinces.length >= 2) {
        const cities = SelectCity.filter(_ => selected_provinces.includes(_.myValue.toLowerCase()));
        setFilteredCities(() => cities);
      } else {
        setFilteredCities(() => filteredCities);
      }
      if (last_value) {
        form.setFieldsValue({ province: value.filter(({ value }) => value === 'All') });
      } else if (selected_provinces.length > 2) {
        form.setFieldsValue({ province: value.filter(({ value }) => value !== 'All') });
      } else {
        form.setFieldsValue({ province: value });
      }
      if (dateCheck) {
        const storeGroupIds = form.getFieldValue('selected_stores')?.map(({ _id }) => _id) ?? [];
        const selectedStores = disabledOptions?.filter(({ value }) => storeGroupIds?.includes(value));
        let selectedStoreGroups =
          disabledOptions?.filter(grps => grps.stores)?.filter(({ _id }) => storeGroupIds?.includes(_id)) ?? [];
        selectedStoreGroups = selectedStoreGroups.length
          ? selectedStoreGroups?.map(({ stores }) => stores)?.flat()
          : [];
        filterStoresAndGroups({ selectedStores, selectedStoreGroups, disabledOptions });
      }
    } else {
      setFilteredCities(() => SelectCity);
      form.setFieldsValue({ province: { label: 'All', value: 'All' } });
    }
  };
  const handleCity = ({ target: { value } }) => {
    const prev_all = form
      .getFieldsValue()
      ?.city?.map(({ label }) => label)
      ?.includes('All');
    const all_check = value?.map(({ label }) => label)?.includes('All');
    if (!prev_all && all_check) {
      const curr_cities = value?.filter(v => v?.label === 'All');
      form.setFieldsValue({ city: curr_cities });
    } else {
      const curr_cities = value?.filter(v => v?.label !== 'All');
      form.setFieldsValue({ city: curr_cities });
    }
    if (dateCheck) {
      const storeGroupIds = form.getFieldValue('selected_stores')?.map(({ _id }) => _id) ?? [];
      const selectedStores = disabledOptions?.filter(({ value }) => storeGroupIds?.includes(value));
      let selectedStoreGroups =
        disabledOptions?.filter(grps => grps.stores)?.filter(({ _id }) => storeGroupIds?.includes(_id)) ?? [];
      selectedStoreGroups = selectedStoreGroups.length ? selectedStoreGroups?.map(({ stores }) => stores)?.flat() : [];
      filterStoresAndGroups({ selectedStores, selectedStoreGroups, disabledOptions });
    }
  };
  const handleStore = ({ target: { value } }) => {
    if (dateCheck) {
      if (!value?.length) {
        setCombinedOptions(disabledOptions);
        form.setFieldsValue({ selected_stores: [], store_groups: [] });
        form.setFieldsError({ selected_stores: { message: 'Please select a store' } });
        handlePromotionInfo(null, 'clear_all');
        if (!promotion) {
          // eslint-disable-next-line no-use-before-define
          resetOfferFields();
        }

        setSelectedStores([]);
        setStoreNames([]);
        return;
      }

      form.setFieldsValue({ selected_stores: value });
      const storeGroupIds = form.getFieldValue('selected_stores')?.map(({ _id }) => _id) ?? [];
      const selectedStores = disabledOptions
        ?.filter(grps => !grps.stores)
        ?.filter(({ value }) => storeGroupIds?.includes(value));
      let selectedStoreGroups =
        disabledOptions?.filter(grps => grps.stores)?.filter(({ _id }) => storeGroupIds?.includes(_id)) ?? [];
      form.setFieldsValue({ store_groups: selectedStoreGroups?.map(({ _id }) => _id) });
      filterStoresAndGroups({ selectedStores, selectedStoreGroups, disabledOptions });

      selectedStoreGroups = selectedStoreGroups.length ? selectedStoreGroups?.map(({ stores }) => stores)?.flat() : [];
      const selectedStoreIds = [...selectedStores.map(({ _id }) => _id), ...selectedStoreGroups];
      selectedStoreIds.forEach(id => {
        handlePromotionInfo('#000000', 'font_color', id);
      });
      setSelectedStores(selectedStoreIds);
      setStoreNames([
        ...new Set([
          ...selectedStores.map(({ name }) => name),
          ...stores.filter(({ _id }) => selectedStoreGroups?.includes(_id))?.map(({ name }) => name),
        ]),
      ]);
    } else if (!value?.length) {
      form.setFieldsValue({ selected_stores: [], store_groups: [] });
      form.setFieldsError({ selected_stores: { message: 'Please select a store' } });

      if (!promotion) {
        // eslint-disable-next-line no-use-before-define
        resetOfferFields();
      }

      // here empty arrays are assigned because storeGroupIds are empty and after the filter's applied they will still remain empty
      filterStoresAndGroups({ selectedStores: [], selectedStoreGroups: [], disabledOptions: [] });
    } else {
      form.setFieldsValue({ selected_stores: value });
      const storeGroupIds = form.getFieldValue('selected_stores')?.map(({ _id }) => _id) ?? [];
      const selectedStores = stores?.filter(({ value }) => storeGroupIds?.includes(value));
      let selectedStoreGroups = storeGroups?.filter(({ _id }) => storeGroupIds?.includes(_id)) ?? [];

      filterStoresAndGroups({ selectedStores, selectedStoreGroups, disabledOptions });
      selectedStoreGroups = selectedStoreGroups?.map(({ stores }) => stores)?.flat();

      setSelectedStores([...selectedStores.map(({ _id }) => _id), ...selectedStoreGroups]);

      setStoreNames([
        ...new Set([
          ...selectedStores.map(({ name }) => name),
          ...stores.filter(({ _id }) => selectedStoreGroups?.includes(_id))?.map(({ name }) => name),
        ]),
      ]);
    }
  };
  useEffect(() => {
    const filteredKeys = Object.keys(promotionInfo)?.filter(v => selectedStores?.includes(v));
    const filtered = filteredKeys.reduce((obj, key) => ({ ...obj, [key]: promotionInfo[key] }), {});
    setPromotionInfo(filtered);
  }, [selectedStores]);

  const getPayload = e => {
    const promotions = [];
    Object.values(promotionInfo).forEach(item => {
      const itm = {
        store_id: item.storeId,
        font_color: item.font_color,
        card_bg_color: item.card_bg_color,
        card_image_url: item.card_image_url,
        background_image_url: item.background_image_url.target.value,
      };
      if (item?._id && !clone) {
        itm._id = item._id;
      }

      promotions.push(itm);
    });

    const data = {
      ...e,
      business_logo_url: state?.primary_logo
        ? user?.attachments?.business_logo?.cloudinary_url
        : user?.attachments?.alternate_logo?.cloudinary_url, // TODO CHANGE URL
      promotions: JSON.stringify(promotions),
      offer_type: e?.offer_type?.value,
      minimum_amount: e?.minimum_amount ?? 0,
      maximum_amount: e?.maximum_amount ?? 0,
      point_value: e?.point_value ?? 0,
      max_spend_value: e?.max_spend_value ?? 0,
      duration: [new Date(e?.duration?.startDate), new Date(e?.duration?.endDate)],
      plastk_points: e?.point_value ?? 0,
      minimum_visit: e?.minimum_visit ?? 0,
      stores: selectedStores,
      extend: !!extend,
      image: defaultImg ? null : customImg ? e?.image : null,
      store_groups: e?.store_groups ?? [],
    };
    return data;
  };
  const validateStores = async () => {
    if (extend) {
      return true;
    }
    try {
      const res = await PromotionService.checkStoresInOtherCampaigns({
        stores: selectedStores,
        startDate: state?.duration?.startDate,
        id: clone ? '' : promotion?._id,
      });
      if (res?.stores?.length) {
        const s = stores?.filter(stores => res?.stores?.includes(stores?._id))?.map(({ name }) => `"${name}"`);
        form.setFieldsError({ selected_stores: { message: `Existing stores are ${s?.join(', ')}` } });
        Toast({
          type: 'error',
          message: res?.message,
        });
        setLoading(false);

        return false;
      }
      form.setFieldsError({ selected_stores: { message: '' } });
      // setLoading(false);
      return true;
    } catch (er) {
      Toast({
        type: 'error',
        message: er.message,
      });
      setLoading(false);
      return false;
    }
  };
  const handleSubmit = async e => {
    // checking time
    const startDate = new Date(state.duration.startDate);
    const currentDate = new Date();
    if (startDate.toDateString() === currentDate.toDateString()) {
      const currentTime = currentDate.getTime();
      const startTime = startDate.getTime();
      if (currentTime < startTime) {
        Toast({
          type: 'error',
          message: 'Current time is less than start date time',
        });
        return;
      }
    }
    setLoading(true);
    if (selectedStores.length !== Object.keys(promotionInfo).length) {
      Toast({
        type: 'error',
        message: 'Please select all fields',
      });
      setLoading(false);

      return;
    }
    for (const item of Object.values(promotionInfo)) {
      if (item.card_bg_color === undefined || item.card_bg_color === '') {
        Toast({
          type: 'error',
          message: 'Please select promotion color',
        });
        setLoading(false);
        return;
      }

      if (!item?.background_image_url) {
        Toast({
          type: 'error',
          message: 'Please select promotion image',
        });
        setLoading(false);
        return;
      }
    }
    await Promise.all(
      Object.values(promotionInfo).map(async item => {
        await handlePromotionPreview(item.storeId);
      }),
    );
    if (await validateStores()) {
      if (!promotion || clone) {
        PromotionService.createPromotion(getPayload(e))
          .then(res => {
            Toast({
              type: 'success',
              message: res?.message,
            });
            setLoading(false);
            refetch();
            onClose();
          })
          .catch(err => {
            Toast({
              type: 'error',
              message: err?.message,
            });
            setLoading(false);
          });
      } else {
        PromotionService.updatePromotion(promotion?._id, getPayload(e))
          .then(res => {
            Toast({
              type: 'success',
              message: res?.message,
            });
            setLoading(false);
            refetch();
            onClose();
          })
          .catch(err => {
            Toast({
              type: 'error',
              message: err?.message,
            });
            setLoading(false);
          });
      }
    }
  };
  const offerText = useCallback(() => {
    const _ = form.getFieldsValue();
    return getOfferDetails({
      offer_type: extend || clone || edit ? promotion?.offer_type : _?.offer_type?.value,
      offer_details: {
        minimum_amount: _?.minimum_amount ?? 0,
        minimum_visit: _?.minimum_visit.value ? _?.minimum_visit?.value : _?.minimum_visit ?? 0,
        maximum_amount: _?.maximum_amount ?? 0.0,
        plastk_points_value:
          _?.offer_type?.value === 'initialOffer'
            ? ((state?.initial_offer[_?.minimum_visit ?? 1] / 100) * _?.maximum_amount * 200).toFixed(0)
            : _?.offer_type?.value === 'percentBased'
            ? (_?.maximum_amount * _?.point_value ?? 1) / 100 / 0.005
            : _?.point_value / 0.005,
        plastk_points: _?.point_value ?? 0.0,
      },
      duration: { startDate: _?.duration?.startDate, endDate: _?.duration?.endDate },
      stores: storeNames,

      state,
    });
  }, [state]);

  const offerShortText = useCallback(() => {
    const _ = form.getFieldsValue();
    return getOfferText({
      offer_type: _?.offer_type?.value,
      offer_details: {
        minimum_amount: _?.minimum_amount ?? 0,
        minimum_visit: _?.minimum_visit?.value ? _?.minimum_visit?.value : _?.minimum_visit,
        maximum_amount: _?.maximum_amount ?? 0.0,
        plastk_points_value:
          _?.offer_type?.value === 'initialOffer'
            ? ((state?.initial_offer[_?.minimum_visit?.value] / 100) * _?.maximum_amount * 200).toFixed(0)
            : _?.offer_type?.value === 'percentBased'
            ? (_?.maximum_amount * _?.point_value) / 100 / 0.005
            : _?.point_value / 0.005,
        plastk_points: _?.point_value ?? 0.0,
      },
      duration: { startDate: _?.duration?.startDate, endDate: _?.duration?.endDate },
      stores: storeNames,
    });
  }, [state]);
  const getOfferDetailsApp = useCallback(() => {
    const _ = form.getFieldsValue();
    return getOfferDetailsAppView({
      offer_type: _?.offer_type?.value,
      offer_details: {
        minimum_amount: _?.minimum_amount ?? 0,
        minimum_visit: _?.minimum_visit?.value ? _?.minimum_visit?.value : _?.minimum_visit ?? 0,
        maximum_amount: _?.maximum_amount ?? 0.0,
        plastk_points_value:
          _?.offer_type?.value === 'initialOffer'
            ? ((state?.initial_offer[_?.minimum_visit?.value] / 100) * _?.maximum_amount * 200).toFixed(0)
            : _?.offer_type?.value === 'percentBased'
            ? (_?.maximum_amount * _?.point_value) / 100 / 0.005
            : _?.point_value / 0.005,
        plastk_points: _?.point_value ?? 0.0,
      },
      duration: { startDate: _?.duration?.startDate, endDate: _?.duration?.endDate },
      stores: storeNames,
    });
  }, [state]);

  const onPreviewModalClose = () => {
    setPreviewData([]);
  };
  const handlePreview = async (onClick, storeId) => {
    const __ = form.getFieldsValue();
    if (storeId !== 'all') {
      if (!promotionInfo[storeId]) {
        Toast({
          type: 'error',
          message: 'Please select all fields',
        });
        return;
      }

      if (promotionInfo[storeId].card_bg_color === undefined || promotionInfo[storeId].card_bg_color === '') {
        Toast({
          type: 'error',
          message: 'Please select promotion color',
        });
        return;
      }

      if (!promotionInfo[storeId].background_image_url) {
        Toast({
          type: 'error',
          message: 'Please select promotion image',
        });
        return;
      }
    } else {
      if (selectedStores.length !== Object.keys(promotionInfo).length) {
        Toast({
          type: 'error',
          message: 'Please select all fields',
        });
        return;
      }
      for (const item of Object.values(promotionInfo)) {
        if (item.card_bg_color === undefined || item.card_bg_color === '') {
          Toast({
            type: 'error',
            message: 'Please select promotion color',
          });
          return;
        }

        if (!item?.background_image_url) {
          Toast({
            type: 'error',
            message: 'Please select promotion image',
          });
          return;
        }
      }
    }

    if (__.offer_type?.value === 'percentBased') {
      if (
        !__.minimum_amount ||
        !__.maximum_amount ||
        !__.point_value ||
        __.maximum_amount === '' ||
        __.minimum_amount === '' ||
        __.point_value === ''
      ) {
        Toast({
          type: 'error',
          message: 'Please fill all the required fields',
        });
        return;
      }
    } else if (__.offer_type?.value === 'repeatVisit') {
      if (!__.minimum_visit || !__.point_value || (__.minimum_visit === '' && __.point_value === '')) {
        Toast({
          type: 'error',
          message: 'Please fill all the required fields',
        });
        return;
      }
    } else if (__.offer_type?.value === 'dollarBased') {
      if (!__.minimum_amount || !__.point_value || (__.minimum_amount === '' && __.point_value === '')) {
        Toast({
          type: 'error',
          message: 'Please fill all the required fields',
        });
        return;
      }
    }

    if (
      !!__?.offer_type?.value &&
      !!__.duration?.startDate &&
      !!__.duration?.endDate &&
      !!__.name &&
      !!__.selected_stores?.length
    ) {
      if (await validateStores()) {
        const promotions = [];
        if (storeId === 'all') {
          await Promise.all(
            Object.values(promotionInfo).map(async item => {
              await handlePromotionPreview(item.storeId);
              const data = {
                name: stores?.filter(s => s?._id === item.storeId)[0]?.name,
                business_logo_url: state?.primary_logo
                  ? `${user?.attachments?.business_logo?.cloudinary_url}?${new Date().getTime()}`
                  : `${user?.attachments?.alternate_logo?.cloudinary_url}?${new Date().getTime()}`,
                store_id: item?.storeId,
                font_color: item?.font_color,
                card_bg_color: item?.card_bg_color,
                card_image_url: item?.card_image_url,
                background_image_url: item?.background_image_url.target.value,
                banner_image_url: user?.attachments?.banner_img?.cloudinary_url,
                offer_text: getOfferDetailsApp(),
                offer_short_text: offerShortText(),
                plastk_points: __?.point_value,
                minimum_amount: __?.minimum_amount,
                offer_percent: getOfferPercent({
                  offer_type: state?.offer_type?.value,
                  offer_details: {
                    minimum_amount: state?.minimum_amount,
                    maximum_amount: state?.maximum_amount,
                    initial_offer: state?.initial_offer,
                    plastk_points: state?.point_value,
                    plastk_points_value: state?.plastk_points,
                  },
                }),
                offer_type: __?.offer_type?.value,
                minimum_visit: __?.minimum_visit.value ? __?.minimum_visit?.value : __?.minimum_visit,
                plastk_points_value:
                  __?.offer_type?.value === 'initialOffer'
                    ? ((state.initial_offer[__?.minimum_visit?.value] / 100) * __?.maximum_amount * 200).toFixed(0)
                    : __?.offer_type?.value === 'percentBased'
                    ? (__?.maximum_amount * __?.point_value) / 100 / 0.005
                    : __?.point_value / 0.005,
              };
              promotions.push(data);
            }),
          );

          if (promotions.length > 0) {
            setPreviewData(promotions);
            onClick();
          }
        } else {
          await handlePromotionPreview(storeId);
          const data = {
            name: stores?.filter(s => s?._id === storeId)[0]?.name,
            business_logo_url: state?.primary_logo
              ? `${user?.attachments?.business_logo?.cloudinary_url}?${new Date().getTime()}`
              : `${user?.attachments?.alternate_logo?.cloudinary_url}?${new Date().getTime()}`,
            store_id: promotionInfo[storeId]?.storeId,
            font_color: promotionInfo[storeId]?.font_color,
            card_bg_color: promotionInfo[storeId]?.card_bg_color,
            card_image_url: promotionInfo[storeId]?.card_image_url,
            // background_image_url: promotionInfo[storeId]?.background_image_url.target.value,
            background_image_url: user?.attachments?.banner_img?.cloudinary_url,
            offer_text: getOfferDetailsApp(),
            offer_short_text: offerShortText(),
            plastk_points: __?.point_value,
            minimum_amount: __?.minimum_amount,
            offer_percent: getOfferPercent({
              offer_type: state?.offer_type?.value,
              offer_details: {
                minimum_amount: state?.minimum_amount,
                maximum_amount: state?.maximum_amount,
                initial_offer: state?.initial_offer,
                plastk_points: state?.point_value,
                plastk_points_value: state?.plastk_points,
              },
            }),
            plastk_points_value:
              __?.offer_type?.value === 'percentBased'
                ? (__?.maximum_amount * __?.point_value) / 100 / 0.005
                : __?.point_value / 0.005,
          };
          promotions.push(data);
          if (promotions.length > 0) {
            setPreviewData(promotions);
            onClick();
          }
        }
      }
    } else {
      Toast({
        type: 'error',
        message: 'Please fill all the required fields',
      });
    }
  };
  const handleDate = async ({ target: value, message, isValid = true }) => {
    if (value?.value?.startDate) {
      form.setFieldsValue({ duration: value?.value });
      if (!isValid) {
        setDateValid(false);

        form.setFieldsError({ duration: { message } });
      } else {
        setDateValid(true);

        if (!current1) {
          setCurrent1(value?.value);
        } else {
          setPrevDuration(current1);
          setCurrent2(value?.value);
        }
      }
      if (isValid) {
        if (!extend) {
          if (stores?.length) {
            try {
              const res = await PromotionService.checkStoresInOtherCampaigns({
                stores: stores?.map(({ _id }) => _id),
                startDate: formatISO(value?.value?.startDate),
                id: clone ? '' : promotion?._id,
                selected_stores: selectedStores,
              });
              if (res?.options?.length) {
                setDisabledOptions(res?.options);

                const storeGroupIds = form?.getFieldValue('selected_stores')?.map(({ _id }) => _id) ?? [];
                const selectedStores = res?.options?.filter(({ value }) => storeGroupIds?.includes(value));
                let selectedStoreGroups =
                  res?.options?.filter(grps => grps.stores)?.filter(({ _id }) => storeGroupIds?.includes(_id)) ?? [];
                selectedStoreGroups = selectedStoreGroups.length
                  ? selectedStoreGroups?.map(({ stores }) => stores)?.flat()
                  : [];

                filterStoresAndGroups({ selectedStores, selectedStoreGroups, disabledOptions: res?.options });
                //-----------------------------

                setDateCheck(true);

                const stores = form?.getFieldValue('selected_stores') ?? [];

                if (stores?.length) {
                  const disabledStores = res?.options
                    .filter(store => stores.map(({ _id }) => _id).includes(store._id) && store.isDisabled)
                    .map(({ _id }) => _id);
                  const filteredStores = stores.filter(_ => !disabledStores?.includes(_._id));

                  //------------------------------

                  //------------------------------

                  // disabled stores = storesId that will be removed from the list
                  const removeStores = stores
                    ?.filter(grp => !grp.stores)
                    ?.filter(stores => disabledStores?.includes(stores._id))
                    .map(({ name }) => name);
                  const removeGrps = stores
                    ?.filter(grp => grp.stores)
                    .filter(grp => grp.stores.map(id => disabledStores.includes(id)))
                    .map(({ label }) => `${label}-Group`);

                  if (disabledStores?.length) {
                    setRemovedStores([...removeStores, ...removeGrps]); // names of stores which will be removed
                    setFilteredStores(filteredStores); // stores which will be kept
                    // open modal
                    setIsVisible(true);
                  }

                  if (!promotion && !clone && disabledStores?.length) {
                    Toast({
                      type: 'error',
                      message: res?.message,
                    });
                  }
                }
              }
            } catch (er) {
              Toast({
                type: 'error',
                message: er?.message,
              });
            }
          }
        }
      }
    } else {
      setDateCheck(false);
      setPrevDuration(null);
      setCurrent1(null);
      setCurrent2(null);
      filterStoresAndGroups({ selectedStores: [], selectedStoreGroups: [], disabledOptions: [] });

      form.setFieldsValue({ duration: '', selected_stores: [] });
      form.setFieldsError({ selected_stores: undefined });
      setSelectedStores([]);
    }
  };
  const handleOfferType = async ({ target: value }) => {
    if (value?.value) {
      form.setFieldsValue({
        offer_type: value?.value,
        minimum_amount: '',
        maximum_amount: '',
        max_spend_value: '',
        point_value: '',
        minimum_visit: '',
        plastk_points: '',
      });
      form.setFieldsError({
        minimum_amount: undefined,
        maximum_amount: undefined,
        max_spend_value: undefined,
        point_value: undefined,
        minimum_visit: undefined,
        plastk_points: undefined,
      });
    }
  };

  const resetOfferFields = () => {
    form.setFieldsValue({
      offer_type: '',
      minimum_amount: '',
      maximum_amount: '',
      max_spend_value: '',
      point_value: '',
      minimum_visit: '',
      plastk_points: '',
    });
    form.setFieldsError({
      offer_type: undefined,
      minimum_amount: undefined,
      maximum_amount: undefined,
      max_spend_value: undefined,
      point_value: undefined,
      minimum_visit: undefined,
      plastk_points: undefined,
    });
  };
  const ExistingStores = ({ stores, filteredStores }) => {
    const onRemove = () => {
      if (!filteredStores.length) {
        form.setFieldsValue({ selected_stores: [], store_groups: [] });
        // remove all stores from selected stores
        setSelectedStores([]);
      } else {
        // remove disabled ones
        form.setFieldsValue({ selected_stores: filteredStores });
        // get store names from selected stores which will be removed
        setSelectedStores([filteredStores?.map(({ _id }) => _id)]);
      }
      setIsVisible(false);
    };
    const onCancel = () => {
      if (!prevDuration) {
        form.setFieldsValue({ duration: '' });
        setCurrent1(null);
      } else {
        form.setFieldsValue({ duration: prevDuration });
        setCurrent2(null);
      }
      setIsVisible(false);
    };
    return (
      <div>
        <Paragraph xl>
          These stores already exists in other promotions and will be <strong>removed</strong> on clicking Remove. If
          you cancel, your promotion duration will be set to <strong>previous</strong> selected duration
        </Paragraph>
        <StyledList ordered>
          {stores.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </StyledList>
        <BtnHolder>
          <Button type="light" css="margin: 0 5px;" rounded sm width="150" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            type="danger"
            css="margin: 0 5px;"
            rounded
            sm
            width="150"
            onClick={() => {
              onRemove();
            }}>
            Remove
          </Button>
        </BtnHolder>
      </div>
    );
  };
  const ExistingStoresModal = () => (
    <>
      <ModalContainer
        isOpen
        title="Remove Stores"
        isClosable={false}
        width="900"
        content={() => <ExistingStores stores={removedStores} filteredStores={filteredStores} />}
      />
    </>
  );

  const handleOfferVisits = (value, field_name, visit) => {
    form.setFieldsValue({ [field_name]: value });

    const initial_offr = {
      ...state?.initial_offer,
      [visit]: value,
    };
    setState(prev => ({ ...prev, initial_offer: initial_offr }));
  };

  useEffect(() => {
    if (state?.offer_type?.value === 'initialOffer') {
      const newEndDate = new Date(state?.duration?.startDate);
      newEndDate.setMonth(newEndDate.getMonth() + 6);
      form.setFieldsValue({ duration: { startDate: state?.duration?.startDate, endDate: newEndDate } });
    }
  }, [state?.offer_type?.value]);

  return (
    <>
      {isVisible && <ExistingStoresModal />}
      <Form
        form={form}
        onSubmit={handleSubmit}
        onTouched={e => {
          setState(_ => ({ ..._, ...e }));
        }}>
        <FieldHolder>
          <Heading level={2}>Step 1: Promotion Details</Heading>
          <Grid xs={1} md={2} lg={3} colGap={{ xs: 20, md: 28 }} rowGap={1}>
            <Form.Item
              gray
              type="text"
              label="Promotion Name"
              name="name"
              disabled={!!extend}
              placeholder="Promotion #4"
              rules={[
                { required: true, message: 'Promotion Name is required' },
                {
                  pattern: /^[A-Z][a-zA-Z0-9 .;:'"/?,[\]{}()-=_+*&^%$#@!~`]+$/,
                  message: 'The first letter of Promotion Name should be capital',
                },
                {
                  pattern: /^[a-zA-Z0-9 .;:'"/?,[\]{}()-=_+*&^%$#@!~`]{3,40}$/,

                  message: 'Please Enter a valid Promotion Name (minimum 3 and maximum 40 characters)',
                },
              ]}>
              <Field />
            </Form.Item>
            <Form.Item
              gray
              label="Promotion Duration"
              name="duration"
              extend={extend}
              // value={state?.duration}
              promotion={!!promotion}
              rules={[
                { required: true, message: 'Date is required' },
                // {
                //   transform: value => {
                //     if (value?.startDate < new Date() && value?.isValid === false) {
                //       Toast({
                //         type: 'error',
                //         message: 'start date time should be greater or equal to current time',
                //       });
                //       return true;
                //     }
                //     return false;
                //   },
                //   message: 'Please select a valid duration',
                // },
              ]}
              onChange={handleDate}
              form={form}
              labelIcon={
                <Icon
                  size="1rem"
                  showTooltip
                  toolTipContent="On remove duration all selected stores will be removed"
                  className="icon-error-circle"
                  css="color:#000;"
                />
              }>
              <RcPicker />
            </Form.Item>
          </Grid>
        </FieldHolder>
        <FieldHolder>
          <Heading level={2}>Step 2: Select Stores</Heading>
          <Grid xs={1} md={2} lg={3} colGap={{ xs: 20, md: 28 }} rowGap={1}>
            <Form.Item
              id="province"
              type="select"
              label="Select Province"
              name="province"
              isMulti
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              labelIcon={
                <Icon
                  size="1rem"
                  showTooltip
                  toolTipContent="Select duration to see provinces"
                  className="icon-error-circle"
                  css="color:#000;"
                />
              }
              disabled={!form?.getFieldValue('duration')?.startDate || !!extend || !dateValid}
              isDisabled={!form?.getFieldValue('duration')?.startDate || !!extend || !dateValid}
              options={filteredProvinces}
              onChange={handleProvince}
              placeholder="All"
              rules={[{ required: true, message: 'Select a Province' }]}>
              <Select />
            </Form.Item>
            <Form.Item
              id="city"
              type="select"
              label="Select City"
              name="city"
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              isMulti
              labelIcon={
                <Icon
                  size="1rem"
                  showTooltip
                  toolTipContent="Select duration to see cities"
                  className="icon-error-circle"
                  css="color:#000;"
                />
              }
              options={filteredCities}
              onChange={handleCity}
              placeholder="All"
              disabled={!form?.getFieldValue('duration')?.startDate || !!extend || !dateValid}
              isDisabled={!form?.getFieldValue('duration')?.startDate || !!extend || !dateValid}
              rules={[{ required: true, message: 'Select a City' }]}>
              <Select />
            </Form.Item>
            <Form.Item
              id="store"
              type="select"
              label="Select Stores / Groups"
              name="selected_stores"
              loading={stores_loading}
              options={combinedOptions}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              isMulti
              labelIcon={
                <Icon
                  size="1rem"
                  showTooltip
                  toolTipContent="Select duration to see stores"
                  className="icon-error-circle"
                  css="color:#000;"
                />
              }
              disabled={!form?.getFieldValue('duration')?.startDate || !!extend || !dateValid}
              isDisabled={!form?.getFieldValue('duration')?.startDate || !!extend || !dateValid}
              onChange={handleStore}
              placeholder="All"
              rules={[{ message: 'Please select a store' }]}>
              <Select />
            </Form.Item>
          </Grid>
        </FieldHolder>
        <FieldHolder>
          <Heading level={2}>Step 3: Offer Details</Heading>
          <Grid xs={1} md={2} lg={3} colGap={{ xs: 20, md: 28 }} rowGap={1}>
            <Form.Item
              id="offer"
              type="select"
              label="Offer type"
              name="offer_type"
              labelIcon={
                <Icon
                  size="1rem"
                  showTooltip
                  toolTipContent="Select Stores to see offer types"
                  className="icon-error-circle"
                  css="color:#000;"
                />
              }
              disabled={
                !!extend ||
                form.getFieldValue('selected_stores')?.length === 0 ||
                form.getFieldValue('selected_stores')?.length === undefined
              }
              isDisabled={
                !!extend ||
                form.getFieldValue('selected_stores')?.length === 0 ||
                form.getFieldValue('selected_stores')?.length === undefined
              }
              options={
                user && user?.adminRoleTypes.length !== 0 && user?.ShowCreateCampaignButton === true
                  ? [{ value: 'initialOffer', label: 'Initial Offer' }]
                  : firstThree
              }
              placeholder="Offer Type"
              onChange={handleOfferType}
              rules={[{ message: 'Please Select an Offer Type' }]}>
              <Select />
            </Form.Item>
            {state?.offer_type?.value === 'dollarBased' && (
              <>
                <Form.Item
                  type="number"
                  label="Minimum Amount"
                  name="minimum_amount"
                  disabled={!!extend}
                  prefix="$"
                  placeholder="$0"
                  rules={[
                    { required: true, message: 'Minimum Amount is required' },
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    {
                      pattern: /^.{0,20}$/,
                      message: 'Maximum Character Limit Is 20',
                    },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Offer"
                  disabled={!!extend}
                  name="point_value"
                  prefix="$"
                  placeholder="in Plastk Points"
                  rules={[
                    { required: true, message: 'Amount is required' },
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    {
                      pattern: /^.{0,15}$/,
                      message: 'Maximum Character Limit Is 15',
                    },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      max: 10000,
                      message: 'Maximum $10,000 is allowed',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Expected Budget"
                  prefix="$"
                  name="max_spend_value"
                  placeholder="MAX Limit you want to spend on this promotion"
                  rules={[
                    { required: true, message: 'Expected Budget is required' },
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value => +value < +form.getFieldValue('minimum_amount'),
                      message: `Amount should be greater than or equal to Minimum Amount`,
                    },
                    {
                      max: 10000,
                      message: 'Maximum $10,000 is allowed',
                    },
                  ]}>
                  <Field />
                </Form.Item>
              </>
            )}
            {state?.offer_type?.value === 'percentBased' && (
              <>
                <Form.Item
                  type="number"
                  label="Minimum Amount Spent"
                  name="minimum_amount"
                  prefix="$"
                  placeholder="$0"
                  rules={[
                    { required: true, message: 'Minimum Amount is required' },
                    { pattern: /^[1-9]+[0-9]*$/, message: 'Enter whole numbers only' },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value =>
                        form.getFieldValue('maximum_amount') && +value >= +form.getFieldValue('maximum_amount'),
                      message: `Amount should be less than maximum amount`,
                    },
                    {
                      max: 10000,
                      message: 'Amount should be less than $10,000',
                    },
                  ]}
                  dependencies={['maximum_amount']}>
                  <Field />
                </Form.Item>

                <Form.Item
                  type="number"
                  label="Maximum Amount Spent"
                  name="maximum_amount"
                  disabled={!!extend}
                  placeholder="$0"
                  prefix="$"
                  rules={[
                    { required: true, message: 'Maximum Amount is required' },
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value => +value <= +form.getFieldValue('minimum_amount'),
                      message: `Amount should be greater than minimum amount`,
                    },
                    {
                      transform: value => +value >= 10001,
                      message: `Amount should be less than $ 10000`,
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Offer"
                  name="point_value"
                  disabled={!!extend}
                  prefix="%"
                  placeholder="in Plastk Points"
                  rules={[
                    { required: true, message: 'Amount is required' },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      pattern: /^.{0,20}$/,
                      message: 'Maximum Character Limit Is 20',
                    },
                    { min: 1, message: 'Minimum value should be 1' },
                    { max: 100, message: 'Maximum value allowed is 100' },
                    // regex for not taking points value
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Expected Budget"
                  prefix="$"
                  name="max_spend_value"
                  placeholder="MAX Limit you want to spend on this promotion"
                  rules={[
                    { required: true, message: 'Expected Budget is required' },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value => +value < +form.getFieldValue('maximum_amount'),
                      message: `Amount should be greater than or equal to Maximum Amount`,
                    },
                    {
                      transform: value => +value >= 10000,
                      message: `Amount should be less than $ 10000`,
                    },
                    // regex for not taking points value
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                  ]}>
                  <Field />
                </Form.Item>
              </>
            )}
            {state?.offer_type?.value === 'repeatVisit' && (
              <>
                <Form.Item
                  type="number"
                  label="Minimum Visits"
                  name="minimum_visit"
                  disabled={!!extend}
                  placeholder="no of visits"
                  rules={[
                    { required: true, message: 'Minimum Visits is required' },
                    {
                      transform: value => +value <= 0,
                      message: `Minimum Visits should be greater than  0`,
                    },
                    { max: 10, message: 'Maximum visits can be 10' },
                    // regex for not taking points value
                    { pattern: /^[1-9]+[0-9]*$/, message: 'Enter whole numbers only' },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Offer On Final Visit"
                  name="point_value"
                  prefix="$"
                  disabled={!!extend}
                  placeholder="in Plastk Points"
                  rules={[
                    { required: true, message: 'Amount is required' },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      min: 1,
                      message: 'Amount must be greater than or equal to $1',
                    },
                    {
                      max: 10000,
                      message: 'Amount must be less than or equal to $10,000',
                    },
                    // regex for not taking points value
                    { pattern: /^[1-9]+[0-9]*$/, message: 'Enter whole numbers only' },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Expected Budget"
                  name="max_spend_value"
                  placeholder="MAX Limit you want to spend on this promotion"
                  prefix="$"
                  rules={[
                    { required: true, message: 'Expected Budget is required' },
                    {
                      // regex for amount start from 1 to 9 and then 0 to 9
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value => +value >= 10000,
                      message: `Amount should be less than $ 10000`,
                    },
                    {
                      transform: value => +value < +form.getFieldValue('point_value'),
                      message: `Amount should be greater than or equal to Offer on Final Visit`,
                    },
                  ]}>
                  <Field />
                </Form.Item>
              </>
            )}

            {state?.offer_type?.value === 'initialOffer' && (
              <>
                <Form.Item
                  type="number"
                  label="Minimum Amount Spent"
                  disabled={!!extend}
                  prefix="$"
                  name="minimum_amount"
                  placeholder="$0"
                  rules={[
                    { required: true, message: 'Minimum Amount is required' },
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    {
                      pattern: /^.{0,20}$/,
                      message: 'Maximum Character Limit Is 20',
                    },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value =>
                        form.getFieldValue('maximum_amount') && +value >= +form.getFieldValue('maximum_amount'),
                      message: `Amount should be less than maximum amount`,
                    },
                    {
                      max: 10000,
                      message: 'Amount should be less than $10,000',
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Maximum Amount"
                  name="maximum_amount"
                  disabled={!!extend}
                  placeholder="$0"
                  prefix="$"
                  rules={[
                    { required: true, message: 'Maximum Amount is required' },
                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value => +value <= +form.getFieldValue('minimum_amount'),
                      message: `Amount should be greater than minimum amount`,
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  type="number"
                  label="Expected Budget"
                  prefix="$"
                  name="max_spend_value"
                  placeholder="MAX Limit you want to spend on this promotion"
                  rules={[
                    { required: true, message: 'Expected Budget is required' },
                    { pattern: /^[0-9]*(\.[0-9]{0,2})?$/, message: 'Only 2 decimal places allowed' },
                    {
                      transform: value => +value <= 0,
                      message: `Amount should be greater than $ 0`,
                    },
                    {
                      transform: value => +value < +form.getFieldValue('maximum_amount'),
                      message: `Amount should be greater than or equal to Maximum Amount`,
                    },
                  ]}>
                  <Field />
                </Form.Item>
                <Form.Item
                  label="Maximum Visits"
                  name="minimum_visit"
                  disabled={!!extend}
                  options={MinimumVisits}
                  placeholder="no of visits"
                  rules={[{ required: true, message: 'Minimum Visits is required' }]}>
                  <Select />
                </Form.Item>
              </>
            )}
            {state?.offer_type?.value !== 'initialOffer' && (
              <Form.Item
                type="text"
                disabled
                value={
                  state?.offer_type?.value === 'percentBased'
                    ? `${(state?.minimum_amount * state?.point_value) / 100 / 0.005}-${
                        (state?.maximum_amount * state?.point_value) / 100 / 0.005
                      }`
                    : state?.point_value
                    ? state?.point_value / 0.005
                    : 0
                }
                label="Calculated Plastk Rewards Points"
                id="points"
                name="plastk_points"
                placeholder="0">
                <Field />
              </Form.Item>
            )}
          </Grid>

          {state?.minimum_visit && state.offer_type.value === 'initialOffer' && (
            <VisitsHolder>
              <Heading level={4}>Enter amount per visit</Heading>
              <Grid xs={1} md={2} lg={5} colGap={{ xs: 20, md: 15 }} rowGap={1}>
                {Array.from({ length: state?.minimum_visit?.value })

                  .fill(null)
                  .map((_, i) => i + 1)
                  .map(visit => (
                    <>
                      <Form.Item
                        type="number"
                        label={`${(() => {
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
                        })()} Visit`}
                        name={`offer_on_visit_${visit}`}
                        onChange={({ target: { value } }) => {
                          handleOfferVisits(value, `offer_on_visit_${visit}`, visit);
                        }}
                        placeholder="in Plastk Points"
                        prefix="%"
                        rules={[
                          { required: true, message: 'Amount is required' },

                          {
                            pattern: /^[1-9]+[0-9]*$/,
                            message: 'Enter whole numbers only',
                          },
                          { max: 100, message: 'Value should be less than or equal to 100' },
                          {
                            transform: value => +value <= 0,
                            message: `Value should be greater than $ 0`,
                          },
                        ]}>
                        <Field />
                      </Form.Item>
                    </>
                  ))}
                <Form.Item
                  type="number"
                  label="EveryDay Offer"
                  name="every_day_offer"
                  labelIcon={
                    <Icon
                      showTooltip
                      size="1rem"
                      toolTipContent="Offer when user have completed all the visits"
                      iconName="help_outline"
                    />
                  }
                  placeholder="in Plastk Points"
                  prefix="%"
                  rules={[
                    { required: true, message: 'Amount is required' },

                    {
                      pattern: /^[1-9]+[0-9]*$/,
                      message: 'Enter whole numbers only',
                    },
                    { max: 100, message: 'Value should be less than or equal to 100' },
                    {
                      transform: value => +value <= 0,
                      message: `Value should be greater than 0`,
                    },
                  ]}>
                  <Field />
                </Form.Item>
              </Grid>
            </VisitsHolder>
          )}

          {state?.duration?.startDate &&
          state?.duration?.endDate &&
          state?.offer_type?.value &&
          state?.minimum_visit &&
          state?.initial_offer[state?.minimum_visit?.value] &&
          Object.keys(state?.initial_offer)?.length === state?.minimum_visit?.value &&
          state?.selected_stores &&
          state?.selected_stores?.length ? (
            state?.offer_type?.value === 'initialOffer' ? (
              offerText()
            ) : (
              <TextWrap>{offerText()}</TextWrap>
            )
          ) : null}

          {state?.duration?.startDate &&
          state?.duration?.endDate &&
          state?.offer_type?.value &&
          state?.selected_stores &&
          state?.point_value &&
          state?.selected_stores?.length ? (
            state?.offer_type?.value === 'initialOffer' ? (
              offerText()
            ) : (
              <TextWrap>{offerText()}</TextWrap>
            )
          ) : null}
        </FieldHolder>

        <FieldHolder>
          <Heading level={2}>Step 4: Image & Preview</Heading>
          <div>
            {stores
              ?.filter(itm => selectedStores.includes(itm._id))
              .map((element, index) => (
                <div key={index}>
                  <FieldWrap>
                    <Label>{element?.name}</Label>
                    <ColorField>
                      <div className="btnColor">
                        <div
                          className="btn-text"
                          style={{ color: `${promotionInfo[element?._id]?.card_bg_color_label ?? 'black'}` }}>
                          <span className="text">Promotion Color</span>
                          <i className="icon-eyedropper" />
                        </div>
                        <Form.Item
                          className="inputbox"
                          type="color"
                          value={promotionInfo[element?._id]?.card_bg_color ?? '#ffffff'}
                          label=""
                          name={`card_bg_color_${element?._id}`}
                          onChange={event => {
                            handlePromotionInfo(event.target.value, 'card_bg_color', element._id);
                          }}>
                          <Field />
                        </Form.Item>
                      </div>
                      <ColorPicker
                        onChange={color => {
                          handlePromotionInfo(color, 'font_color', element._id);
                        }}
                      />
                    </ColorField>
                    <ImgField>
                      <div className="btn-text">
                        <span className="text">
                          {promotionInfo[element?._id]?.background_image_url?.target?.name ?? 'Upload Promotion Image'}
                        </span>
                        <i
                          className={
                            promotionInfo[element?._id]?.background_image_url?.target?.name ? '' : 'icon-upload'
                          }
                        />
                      </div>
                      <Form.Item
                        noMargin
                        type="chooseFile"
                        label=""
                        name={`background_${element?._id}`}
                        onChange={event => {
                          handlePromotionInfo(event, 'background_image_url', element._id);
                        }}>
                        <Field />
                      </Form.Item>
                    </ImgField>

                    <BtnWrap>
                      <button
                        type="button"
                        onClick={() => {
                          handlePromotionInfo(null, 'clear', element._id);
                        }}>
                        <i className="icon-trash" />
                      </button>
                      <ModalContainer
                        title="Preview"
                        width={1020}
                        onModalClose={onPreviewModalClose}
                        imgPreview
                        btnComponent={({ onClick }) => (
                          <button
                            type="button"
                            onClick={() => {
                              handlePreview(onClick, element?._id);
                            }}>
                            <i className="icon-eye-open" />
                          </button>
                        )}
                        content={({ onClose }) => <PromotionMobileView key={index} previewData={previewData} />}
                      />
                    </BtnWrap>
                  </FieldWrap>
                </div>
              ))}
          </div>
        </FieldHolder>
        {!!selectedStores?.length && (
          <ImgHolder>
            <BannerHolder>
              <BannerText>Business Banner</BannerText>
              <BannerImg>
                <img src={`${user?.attachments?.banner_img?.cloudinary_url}?${new Date().getTime()}`} alt="banner" />
              </BannerImg>
            </BannerHolder>
            <LogoHolder>
              <LogoBox>
                <Field
                  id="primary_logo"
                  type="radio"
                  label="Primary Logo"
                  value={state?.primary_logo}
                  name="radio1"
                  onChange={() => {
                    setState(prev => ({ ...prev, primary_logo: true }));
                  }}
                />
                <Img>
                  <img
                    src={
                      user?.attachments?.business_logo?.cloudinary_url
                        ? `${user?.attachments?.business_logo?.cloudinary_url}?${new Date().getTime()}`
                        : logoImg
                    }
                    alt="banner"
                  />
                </Img>
              </LogoBox>
              {user?.attachments?.alternate_logo?.cloudinary_url && (
                <LogoBox>
                  <Field
                    id="secondary_logo"
                    type="radio"
                    label="Secondary Logo"
                    value={!state.primary_logo}
                    name="radio1"
                    onChange={() => {
                      setState(prev => ({ ...prev, primary_logo: false }));
                    }}
                  />
                  <Img>
                    <img
                      src={`${user?.attachments?.alternate_logo?.cloudinary_url}?${new Date().getTime()}`}
                      alt="banner"
                    />
                  </Img>
                </LogoBox>
              )}
            </LogoHolder>
          </ImgHolder>
        )}
        <BtnHolder>
          <ModalContainer
            title="Preview"
            width={1020}
            imgPreview
            onModalClose={onPreviewModalClose}
            btnComponent={({ onClick }) => (
              <Button
                css="margin: 0 5px;"
                type="light"
                rounded
                sm
                width="175"
                onClick={() => {
                  handlePreview(onClick, 'all');
                }}>
                Preview
              </Button>
            )}
            content={({ onClose }) => <PromotionMobileView previewData={previewData} />}
          />
          <Button css="margin: 0 5px;" type="primary" rounded sm width="150" htmlType="submit" loading={loading}>
            {extend ? 'Extend' : promotion && !clone ? 'Update' : 'Create'}
          </Button>
        </BtnHolder>
      </Form>
      <div id="my-node" style={{ position: 'absolute', left: '-9999999px' }}>
        {!loadingImg &&
          stores
            ?.filter(itm => selectedStores.includes(itm._id))
            .map(element => (
              <div id={element._id}>
                <div
                  style={{
                    height: '150px',
                    width: '320px',
                    position: 'relative',
                    background: `${promotionInfo[element?._id]?.card_bg_color}`,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '16px',
                    overflow: 'hidden',
                  }}>
                  <div
                    style={{
                      height: '150px',
                      backgroundImage: `url(${promotionInfo[element?._id]?.background_image_url?.target?.value})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      width: '150px',
                      float: 'right',
                      borderBottomLeftRadius: '30px 200px',
                      borderTopLeftRadius: '30px 200px',
                    }}
                  />
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default CreatePromotionModal;
