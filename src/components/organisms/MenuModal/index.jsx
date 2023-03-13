/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import StoreService from '../../../services/storeService';
import Label from '../../atoms/Label';
import Loaders from '../../atoms/Loaders';
import Field from '../../molecules/Field';
import Toast from '../../molecules/Toast';
import PdfViewer from '../PdfViewer';
import { MenuHolder, Menu } from './MenuModal.styles';

function MenuModal({ store, viewOnly }) {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState({
    menuType: '',
    menuBase64: '',
  });
  useEffect(() => {
    if (store.menu) {
      setMenu({ menuType: store?.menu.menu_type, menuBase64: store?.menu.menu_url });
    }
    return () => {
      setMenu({
        menuType: '',
        menuBase64: '',
      });
    };
  }, [store._id]);
  const onFileSelect = async ({ target: { value } }) => {
    setLoading(true);
    try {
      if (value) {
        const fileType = value.split('data:')[1].split('/')[0];
        if (fileType === 'image') {
          await StoreService.updateMenu(store._id, { menuType: 'image', menuBase64: value });
          Toast({
            type: 'success',
            message: 'Menu updated successfully',
          });
          setMenu({ menuType: 'image', menuBase64: value });
        } else {
          await StoreService.updateMenu(store._id, { menuType: 'pdf', menuBase64: value });
          Toast({
            type: 'success',
            message: 'Menu updated successfully',
          });
          setMenu({ menuType: 'pdf', menuBase64: value });
        }
        setLoading(false);
      }
    } catch (ex) {
      Toast({
        type: 'error',
        message: ex.message,
      });
      setLoading(false);
    }
  };

  return (
    <Loaders loading={loading}>
      <MenuHolder>
        <Menu>
          {menu.menuBase64 ? (
            menu?.menuType === 'jpeg' ||
            menu?.menuType === 'image' ||
            menu?.menuType === 'png' ||
            menu?.menuType === 'jpg' ? (
              <img src={menu.menuBase64} alt="store_menu_image" />
            ) : (
              <PdfViewer url={menu.menuBase64} />
            )
          ) : loading ? (
            'Loading...'
          ) : (
            'Opps Looks Like You Hav`nt Added Menu Yet'
          )}
        </Menu>
        {!viewOnly && (
          <div
            css={`
              display: flex;
              flex-direction: row;
            `}>
            <Label
              css={`
                margin: 10px;
              `}>
              Upload Menu
            </Label>
            <Field
              allow="image/*,application/pdf"
              disable
              name="menu"
              type="chooseFile"
              image
              pdf
              onChange={onFileSelect}
            />
          </div>
        )}
      </MenuHolder>
    </Loaders>
  );
}

export default MenuModal;
