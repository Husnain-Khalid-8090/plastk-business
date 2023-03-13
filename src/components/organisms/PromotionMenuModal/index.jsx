/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Button from '../../atoms/Button';
import ModalContainer from '../../molecules/ModalContainer';
import ConfirmationDialogueModal from '../ConfirmationDialogueModal';
import CreatePromotionModal from '../CreatePromotionModal';
// import ImgPreviewModal from '../ImgPreviewModal';
import PromotionDetailModal from '../PromotionDetailModal';
import PromotionService from '../../../services/promotionsService';
import { MenuList, Li, Header, Title, BtnHolder, Holder, ParaHolder } from './PromotionMenuModal.style';
import Toast from '../../molecules/Toast';
import { AuthContext } from '../../../context/authContext';
import Paragraph from '../../atoms/Paragraph';
import Field from '../../molecules/Field';
import Form, { useForm } from '../Form';
import PromotionMobileView from '../PromotionMobileView';
import { getOfferDetailsAppView, getOfferPercent, getOfferText } from '../../../helpers/common';

function PromotionMenuModal({ onClose: onCloseParent, promotion }) {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const { refetch, hasPermission, user } = useContext(AuthContext);
  const [form] = useForm();
  const onOk = () => {
    setLoading(true);
    if (promotion.status === 'Pending')
      PromotionService.deletePromotion(promotion._id)
        .then(res => {
          refetch();
          setLoading(false);
          onCloseParent();
          Toast({
            type: 'success',
            message: res?.message,
          });
        })
        .catch(err => {
          setLoading(false);
          Toast({
            type: 'error',
            message: err.message,
          });
        });
  };

  const StopPromotionModal = ({ name, onClose }) => {
    const [state, setState] = useState('');
    const onSubmit = () => {
      PromotionService.stopPromotion(promotion._id)
        .then(res => {
          refetch();
          setLoading(false);
          onCloseParent();
          Toast({
            type: 'success',
            message: res?.message,
          });
        })
        .catch(err => {
          setLoading(false);
          Toast({
            type: 'error',
            message: err.message,
          });
        });
    };

    return (
      <Form
        form={form}
        onSubmit={onSubmit}
        onTouched={({ reason }) => {
          setState(() => reason);
        }}>
        <Header>
          <Title>
            Do you want to stop your <span>&quot;{name}&quot;</span> promotion?
          </Title>
        </Header>
        <Holder>
          <ParaHolder>
            <Paragraph sm css="margin:0 0 10px 0; color:#D74120;">
              You are about to Stop an active promotion. Once stopped, a promotion cannot be restarted. Please type{' '}
              <strong>STOP</strong> in the space below and click STOP to proceed.
            </Paragraph>
          </ParaHolder>
          <Form.Item
            type="text"
            name="reason"
            placeholder="END PROMOTION"
            rules={[
              {
                required: true,
                message: 'Please enter "STOP" to confirm',
              },
              {
                pattern: /^STOP$/,
                message: 'Please enter "STOP" to confirm',
              },
            ]}>
            <Field />
          </Form.Item>
          <BtnHolder>
            <Button
              type="white"
              sm
              rounded
              css="width:150px"
              htmlType="submit"
              disabled={state !== 'STOP'}
              loading={loading}>
              Cancel
            </Button>

            <Button type="danger2" sm rounded css="width: 150px;" onClick={() => onClose()}>
              End
            </Button>
          </BtnHolder>
        </Holder>
      </Form>
    );
  };
  const getOfferDetailsApp = useCallback(() => {
    const _ = promotion;

    const storeNames = promotion?.stores?.map(({ name }) => name);
    return getOfferDetailsAppView({
      offer_type: _?.offer_type,
      offer_details: {
        minimum_amount: _?.offer_details?.minimum_amount ?? 0,
        minimum_visit: _?.offer_details?.minimum_visit ?? 0,
        maximum_amount: _?.offer_details?.maximum_amount ?? 0.0,
        plastk_points_value: _?.offer_details?.plastk_points_value,
        plastk_points: _?.offer_details?.plastk_points ?? 0.0,
        initial_offer: _?.offer_details?.initial_offer,
      },
      duration: { startDate: _?.duration?.startDate, endDate: _?.duration?.endDate },
      stores: storeNames,
    });
  }, []);

  const offerShortText = () => {
    const _ = promotion;
    const storeNames = promotion?.stores?.map(({ name }) => name);
    return getOfferText({
      offer_type: _?.offer_type,
      offer_details: {
        minimum_amount: _?.offer_details?.minimum_amount ?? 0,
        minimum_visit: _?.offer_details?.minimum_visit ?? 0,
        maximum_amount: _?.offer_details?.maximum_amount ?? 0.0,
        plastk_points_value: promotion?.offer_details?.plastk_points_value,
        plastk_points: _?.offer_details?.plastk_points ?? 0.0,
        initial_offer: _?.offer_details?.initial_offer,
      },
      duration: { startDate: _?.duration?.startDate, endDate: _?.duration?.endDate },
      stores: storeNames,
    });
  };
  const structurePromotion = () => {
    if (promotion) {
      const arr = [];
      promotion?.stores?.forEach(itm => {
        const card_info = promotion?.promotions?.filter(v => v?.store_id === itm?._id)[0];
        const obj = {
          name: promotion?.name,
          business_logo_url: card_info?.business_logo_url,
          store_id: itm?.storeId,
          font_color: card_info?.font_color,
          card_bg_color: card_info?.card_bg_color,
          card_image_url: card_info?.card_image_url,
          banner_image_url: user?.attachments?.banner_img?.cloudinary_url,
          background_image_url: card_info?.background_image_url,
          offer_text: getOfferDetailsApp(),
          offer_short_text: offerShortText(),
          plastk_points: promotion?.offer_details?.plastk_points,
          minimum_amount: promotion?.offer_details?.minimum_amount,
          offer_percent: getOfferPercent(promotion),
          minimum_visit: promotion?.offer_details?.minimum_visit,
          offer_type: promotion?.offer_type,
          plastk_points_value: promotion?.offer_details?.plastk_points_value,
        };
        arr.push(obj);
      });
      setPreviewData(arr);
    }
  };
  useEffect(() => {
    structurePromotion();
  }, []);

  return (
    <>
      <MenuList>
        {hasPermission('bap.promotions.details') && (
          <Li>
            <ModalContainer
              xl
              title="Promotion Details"
              btnComponent={({ onClick }) => (
                <button
                  type="button"
                  onClick={() => {
                    onClick();
                  }}>
                  More Detail
                </button>
              )}
              content={({ onClose }) => <PromotionDetailModal onClose={onClose} promotion={promotion} />}
            />
          </Li>
        )}
        {hasPermission('bap.promotions.preview') && (
          <Li>
            <ModalContainer
              title="Preview"
              width={1020}
              imgPreview
              btnComponent={({ onClick }) => (
                <button
                  type="button"
                  onClick={() => {
                    onClick();
                  }}>
                  Preview
                </button>
              )}
              content={({ onClose }) => <PromotionMobileView onClose={onClose} previewData={previewData} />}
            />
          </Li>
        )}
        {hasPermission('bap.promotions.create') && (
          <Li>
            <ModalContainer
              xl
              title="Clone Promotion"
              btnComponent={({ onClick }) => (
                <button
                  type="button"
                  onClick={() => {
                    onClick();
                  }}>
                  Clone
                </button>
              )}
              content={({ onClose }) => <CreatePromotionModal onClose={onClose} promotion={promotion} clone />}
            />
          </Li>
        )}
        {hasPermission('bap.promotions.edit') &&
          user?.show_create_campaigns_button &&
          promotion?.status !== 'Active' &&
          promotion?.status !== 'Stopped' &&
          promotion?.offer_type !== 'initialOffer' && (
            <Li>
              <ModalContainer
                xl
                title="Edit Promotion"
                btnComponent={({ onClick }) => (
                  <button
                    type="button"
                    onClick={() => {
                      onClick();
                    }}
                    disabled={promotion?.status === 'Active' || promotion?.status === 'Stopped'}>
                    Edit
                  </button>
                )}
                content={({ onClose }) => <CreatePromotionModal onClose={onClose} promotion={promotion} edit />}
              />
            </Li>
          )}
        {promotion?.status === 'Active' &&
          hasPermission('bap.promotions.extend') &&
          promotion.offer_type !== 'initialOffer' && (
            <Li>
              <ModalContainer
                xl
                title="Extend Promotion"
                btnComponent={({ onClick }) => (
                  <button
                    type="button"
                    onClick={() => {
                      onClick();
                    }}>
                    Extend
                  </button>
                )}
                content={({ onClose }) => <CreatePromotionModal onClose={onClose} promotion={promotion} extend />}
              />
            </Li>
          )}
        {(promotion.status === 'Pending' || promotion.status === 'Active') &&
          promotion.offer_type !== 'initialOffer' &&
          (hasPermission('bap.promotions.stop') || hasPermission('bap.promotions.delete')) && (
            <Li>
              <ModalContainer
                title={promotion.status === 'Pending' ? 'Delete Promotion' : 'End Promotion'}
                btnComponent={({ onClick }) =>
                  promotion.status === 'Pending'
                    ? hasPermission('bap.promotions.stop') && (
                        <button
                          type="button"
                          onClick={() => {
                            onClick();
                          }}>
                          {promotion.status === 'Pending' ? 'Delete Promotion' : 'Stop Promotion'}
                        </button>
                      )
                    : hasPermission('bap.promotions.delete') && (
                        <button
                          type="button"
                          onClick={() => {
                            onClick();
                          }}>
                          {promotion.status === 'Pending' ? 'Delete Promotion' : 'Stop Promotion'}
                        </button>
                      )
                }
                content={({ onClose }) =>
                  promotion.status === 'Pending' ? (
                    <ConfirmationDialogueModal
                      onClose={onClose}
                      text={`You are about to
                    Delete
                   the Promotion. Would you like to continue?`}
                      btn={
                        <Button type="danger" onClick={onOk} loading={loading}>
                          Delete Promotion
                        </Button>
                      }
                    />
                  ) : (
                    <StopPromotionModal name={promotion.name} onClose={onClose} />
                  )
                }
              />
            </Li>
          )}
      </MenuList>
    </>
  );
}

export default PromotionMenuModal;
