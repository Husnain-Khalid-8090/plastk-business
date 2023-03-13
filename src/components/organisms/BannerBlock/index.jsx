/* eslint-disable no-unused-vars */
import React, { useState, useRef, useContext, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AvatarEditor from 'react-avatar-editor';
import { useMediaPredicate } from 'react-media-hook';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '../../atoms/Button';
import logoImg from '../../../assets/images/logo-small.svg';
import logoImg1 from '../../../assets/images/plastk-logo.svg';
import bgImg from '../../../assets/images/banner-bg.jpg';
import ModalContainer from '../../molecules/ModalContainer';
import BusinessInformationModal from '../BusinessInformationModal';
import { Banner, ImgBox, RightColumn, Logo, BtnWrap, IconHolder } from './BannerBlock.style';
import { AuthContext } from '../../../context/authContext';
import { showEditCardModal } from '../../../helpers/common';
import CardInfo from '../CardInfoForm';
import UserService from '../../../services/userService';
import Toast from '../../molecules/Toast';
import Loaders from '../../atoms/Loaders';

function BannerBlock({ profilePage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user, hasPermission, refetch } = useContext(AuthContext);
  const MaxWidth767 = useMediaPredicate('(max-width: 767px)');
  const MinWidth768 = useMediaPredicate('(min-width: 768px)');
  const [state, setState] = useState({ ...user?.cardInfo });
  const [isClosable, setIsClosable] = useState(true);
  const [reposition, setReposition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [origionalImage, setorigionalImage] = useState();
  const [myBanner, setMyBanner] = useState(
    user?.attachments?.new_banner_img
      ? `${user?.attachments?.new_banner_img?.cloudinary_url}?${new Date().getTime()}`
      : user?.attachments?.banner_img?.cloudinary_url,
  );

  const editor = useRef(null);

  const getImgBase64 = async () => {
    try {
      setLoading(true);
      const data = await UserService.getBanner();
      setorigionalImage(data?.base64);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setReposition(false);
    }
  };
  const handleReposition = async () => {
    setReposition(!reposition);
    getImgBase64();
    // setorigionalImage(newBannerImg);
  };
  const handleSave = async e => {
    const image = editor.current.getImageScaledToCanvas().toDataURL();
    setLoading(true);
    await UserService.updateBannerImage({ banner_img: image, new_banner_img: origionalImage })
      .then(res => {
        setMyBanner(res?.image);
        Toast({
          type: 'success',
          message: 'Profile updated successfully',
        });
      })
      .catch(ex => {
        Toast({
          type: 'error',
          message: ex.message,
        });
      })
      .finally(() => setLoading(false));

    setReposition(false);
  };

  useEffect(() => {
    const banner = user?.attachments?.new_banner_img
      ? `${user?.attachments?.new_banner_img?.cloudinary_url}?${new Date().getTime()}`
      : user?.attachments?.banner_img?.cloudinary_url;
    setMyBanner(banner);
  }, [user]);
  return (
    <>
      <Loaders loading={loading}>
        <Banner
          // key={Math.random()}
          profilePage={profilePage}
          css={
            !reposition &&
            `
            background-image: url(${myBanner});
            position: relative;
          `
          }>
          {reposition && (
            <AvatarEditor
              style={{ marginTop: '-1.5%' }}
              ref={editor}
              image={origionalImage}
              width={1540}
              height={210}
              border={1}
              color={[255, 255, 255, 0.6]}
              scale={1.08}
              rotate={0}
            />
          )}
          {!profilePage && !reposition && (
            <ImgBox>
              <img
                src={
                  user?.attachments?.business_logo?.cloudinary_url
                    ? `${user?.attachments?.business_logo?.cloudinary_url}?${new Date().getTime()}`
                    : logoImg
                }
                width="140"
                alt="img-description"
              />
            </ImgBox>
          )}
          {MinWidth768 && (
            <>
              {!reposition && (
                <RightColumn>
                  <Logo href="/" style={{ marginRight: '30px' }}>
                    <img src={logoImg1} width="120" height="48" alt="plastk" />
                  </Logo>
                  <BtnWrap>
                    {hasPermission('bap.dashboard.update-card-details') &&
                      user?.role === 'bp_user' &&
                      showEditCardModal(user) && (
                        <ModalContainer
                          title="Update Card Details"
                          width="1000"
                          isClosable={isClosable}
                          btnComponent={({ onClick }) => (
                            <Button
                              type="white"
                              sm
                              rounded
                              suffix={<span className="icon-pencil" />}
                              onClick={() => {
                                onClick();
                              }}>
                              Update Card Details
                            </Button>
                          )}
                          content={({ onClose }) => (
                            <CardInfo
                              onClose={onClose}
                              state={state}
                              setState={setState}
                              type="edit"
                              action="update"
                              setIsClosable={setIsClosable}
                            />
                          )}
                        />
                      )}

                    {hasPermission('bap.dashboard.edit-business-details') && user?.role === 'bp_user' && (
                      <ModalContainer
                        title="Update Business Information"
                        xl
                        btnComponent={({ onClick }) => (
                          <Button
                            type="white"
                            sm
                            rounded
                            width="220"
                            suffix={<span className="icon-pencil" />}
                            onClick={() => {
                              onClick();
                            }}>
                            Edit Business Details
                          </Button>
                        )}
                        content={({ onClose }) => <BusinessInformationModal onClose={onClose} />}
                      />
                    )}
                  </BtnWrap>
                </RightColumn>
              )}
            </>
          )}
          {reposition && (
            <IconHolder>
              <Button
                type="white"
                style={{
                  width: '15px',
                  height: '39px',
                  borderRadius: '50%',
                }}
                sm
                rounded
                suffix={<span className="icon-tick" style={{ fontSize: '14px', marginRight: '10px' }} />}
                onClick={handleSave}
              />
              <Button
                type="white"
                style={{
                  width: '15px',
                  height: '39px',

                  borderRadius: '50%',
                }}
                sm
                rounded
                suffix={<span className="material-icons-outlined">clear</span>}
                onClick={() => {
                  setReposition(false);
                }}
              />
            </IconHolder>
          )}
          {/* {!reposition && (
            <Button
              type="white"
              style={{ width: '33px', height: '33px', position: 'relative', bottom: '10px', padding: '0' }}
              sm
              rounded
              suffix={<span className="icon-pencil" style={{ fontSize: '14px', marginRight: '10px' }} />}
              onClick={handleReposition}
            />
          )} */}

          {MaxWidth767 && (
            <BtnWrap style={{ position: 'absolute', top: '40px', right: '20px', zIndex: '1' }}>
              <div>
                {/* <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{ color: '#333' }}>
                  Dashboard
                </Button> */}
                <Fab
                  color="primary"
                  aria-label="add"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>
                  <AddIcon />
                </Fab>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}>
                  <MenuItem>
                    {' '}
                    {hasPermission('bap.dashboard.update-card-details') &&
                      user?.role === 'bp_user' &&
                      showEditCardModal(user) && (
                        <ModalContainer
                          title="Update Card Details"
                          width="1000"
                          isClosable={isClosable}
                          btnComponent={({ onClick }) => (
                            <Button
                              type="white"
                              sm
                              rounded
                              suffix={<span className="icon-pencil" />}
                              onClick={() => {
                                onClick();
                              }}>
                              Update Card Details
                            </Button>
                          )}
                          content={({ onClose }) => (
                            <CardInfo
                              onClose={onClose}
                              state={state}
                              setState={setState}
                              type="edit"
                              action="update"
                              setIsClosable={setIsClosable}
                            />
                          )}
                        />
                      )}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {' '}
                    {hasPermission('bap.dashboard.edit-business-details') && user?.role === 'bp_user' && (
                      <ModalContainer
                        title="Update Business Information"
                        xl
                        btnComponent={({ onClick }) => (
                          <Button
                            type="white"
                            sm
                            rounded
                            width="220"
                            suffix={<span className="icon-pencil" />}
                            onClick={() => {
                              onClick();
                            }}>
                            Edit Business Details
                          </Button>
                        )}
                        content={({ onClose }) => <BusinessInformationModal onClose={onClose} />}
                      />
                    )}
                  </MenuItem>
                </Menu>
              </div>
            </BtnWrap>
          )}
        </Banner>
      </Loaders>
    </>
  );
}

export default BannerBlock;
