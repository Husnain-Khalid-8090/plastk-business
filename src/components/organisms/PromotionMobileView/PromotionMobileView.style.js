// eslint-disable-next-line no-unused-vars
import styled, { css } from 'styled-components/macro';
import MobileImg from '../../../assets/images/mobile-img2.png';

export const MobileBlockView = styled.div`
  width: 390px;
  height: 668px;
  color: #4a5568;
  /* padding: 58px 53px 55px; */
  padding: 50px 53px 32px;
  background: url(${MobileImg}) no-repeat;
  background-size: contain;
  position: relative;
  margin: 0 auto;

  &.panel-active {
    overflow: hidden;
    &:before {
      display: block;
    }
  }

  .menu-img {
    display: block;
    max-width: 280px;
    height: auto;
    position: fixed;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }

  &:before {
    display: none;
    content: '';
    position: absolute;
    top: 34px;
    bottom: 74px;
    left: 110px;
    right: 110px;
    backdrop-filter: blur(4px);
    background: rgba(50, 59, 75, 0.3);
    z-index: 9;
  }
`;

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-radius: 0 0 30px 30px;
  /* padding: 0 3px; */
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 20px;
  padding: 0 5px;

  .holder {
    display: flex;
    align-items: center;
  }

  .text {
    display: block;
    font-size: 16px;
    line-height: 18px;
    font-weight: 600;
  }

  .imgBox {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    overflow: hidden;
    margin-right: 10px;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
`;

export const BtnTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px;
  border-radius: 46px;
  margin: 0 0 20px;
  padding: 0 5px;
  background: #f9fafb;

  button {
    width: 50%;
    font-size: 10px;
    line-height: 13px;
    font-weight: 600;
    text-transform: capitalize;
    color: #4a5568;
    padding: 12px 10px;
    text-align: center;
    border-radius: 46px;

    &.active {
      background: var(--white);
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px;
  padding: 0 10px;

  .title {
    display: block;
    font-size: 16px;
    line-height: 18px;
    font-weight: 600;
  }

  .see-all {
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    color: #4a5568;
  }
`;

export const BrandSwiperHolder = styled.div`
  position: relative;
  margin: 0 0 15px;
  padding: 0 5px;
`;

export const ImgBox = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50px;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

export const StoreSwiperHolder = styled.div`
  position: relative;
  margin: 0 0 15px;

  .slick-slide {
    padding: 0 3px;
  }
`;

export const CardBox = styled.div`
  position: relative;
  overflow: hidden;
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;
export const TextBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 122px;
  padding: 9px 13px;
  font-size: 10px;
  line-height: 13px;
  font-weight: 500;
  z-index: 5;

  .card-title {
    display: block;
    font-size: 13px;
    font-weight: 500;
    margin: 0 0 5px;
  }
`;

export const Points = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 65px;
  color: #19383a;
  padding: 7px 5px;
  margin: 0 0 8px;
  border-radius: 10px;
  background: var(--white);

  img {
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  .point-text {
    display: block;
    font-weight: 600;
  }
`;

export const DetailHeader = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .btn-back,
  .btn-like {
    position: absolute;
    top: 10px;
    left: 20px;
    color: #fff;
    font-size: 20px;
    line-height: 1;
  }
  .btn-like {
    left: auto;
    right: 20px;
  }
`;
export const StoreLogo = styled.strong`
  display: block;
  max-width: 150px;
  margin: 0 0 30px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  // background: #fff;
  z-index: 9;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;
export const MapHolder = styled.div`
  width: 100%;
  position: relative;
  margin: -50px 0 15px;
  z-index: 5;

  .text {
    display: block;
    font-size: 12px;
    line-height: 15px;
    font-weight: 600;
    text-align: center;
    margin: -10px 0 0;
  }
`;

export const StoreDetail = styled.div`
  width: 100%;
  font-size: 12px;
  line-height: 18px;
  padding: 0 24px;
  position: relative;

  .title {
    display: block;
    font-size: 18px;
    line-height: 20px;
    font-weight: 600;
    margin: 0 0 10px;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;

  .btn-point {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    padding: 5px;
    font-size: 12px;
    line-height: 15px;
    border: 1px solid #ebecf3;
    border-radius: 8px;
    background: #fff;

    img {
      flex-shrink: 0;
      width: 16px;
      margin-right: 3px;
    }
  }

  .subtitle {
    display: block;
    text-transform: capitalize;
  }
`;

export const StorePromotionBlock = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 10px 10px;
  color: var(--white);
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.3s ease-in-out;
  .logo {
    height: 80px;
    width: 175px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }

  .store-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .btn-back {
      color: var(--white);
    }

    .text {
      display: block;
      font-size: 16px;
      line-height: 19px;
      font-weight: 600;
      text-transform: capitalize;
    }
  }
`;
export const Slide = styled.div``;
