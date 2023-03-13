import styled from 'styled-components/macro';

export const StoreSlider = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  .slider-vertical {
    height: 300px;
    perspective: 1200px;

    .swiper-button-prev,
    .swiper-button-next {
      display: none;
      width: 15px;
      height: 15px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: #000;
      z-index: 5;
    }
    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-slide {
      transform-style: preserve-3d;
      position: relative;
      border-radius: 10px;
      filter: blur(1px);
      /* height: 100px !important; */
      /* transform: scale(0.8);4 */
      transition: all ease-in-out 0.3s;

      &.swiper-slide-active {
        position: relative;
        filter: blur(0);
        /* height: 150px !important; */
        /* transform: scale(1); */
        z-index: 9;
      }
    }
  }
`;

export const SwiperWrapper = styled.div`
  position: relative;
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
