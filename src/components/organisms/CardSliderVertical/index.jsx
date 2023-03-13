/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow } from 'swiper';
import PointImg from '../../../assets/images/points.svg';
import { StoreSlider, SwiperWrapper, CardBox, Points, TextBox } from './CardSliderVertical.styles';
import { dummySlides } from '../../../helpers/constants';

const CardSliderVertical = ({ data, setLogo, setBackgroundImg }) => {
  const [slides] = useState([...data, ...dummySlides, ...dummySlides]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    SwiperCore.use([EffectCoverflow]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleLogoBackground = index => {
    const current_slide = slides[index];
    setLogo(current_slide?.business_logo_url);

    setBackgroundImg(current_slide?.banner_image_url);
  };
  return (
    <StoreSlider>
      {!loading && (
        <Swiper
          onSlideChange={e => {
            const index = e?.realIndex;
            handleLogoBackground(index);
          }}
          slidesPerView={4}
          loop
          centeredSlides
          observer
          observeParents
          modules={[EffectCoverflow]}
          effect="coverflow"
          direction="vertical"
          coverflowEffect={{
            rotate: 0,
            stretch: 2.9,
            depth: 122,
            modifier: 2,
            slideShadows: false,
          }}
          autoHeight
          className="slider-vertical">
          <SwiperWrapper>
            {slides?.length &&
              slides?.map(itm => (
                <SwiperSlide>
                  <CardBox className="img-box">
                    <img className="card-img" src={itm?.card_image_url} width="350" alt="img description" />
                    <TextBox>
                      <Points>
                        <img src={PointImg} width="16" alt="img description" />
                        <span className="point-text">{itm?.plastk_points_value}</span>
                      </Points>
                      <strong style={{ color: itm?.font_color ?? '#fff' }} className="card-title">
                        {itm?.name}
                      </strong>
                      <p style={{ color: itm?.font_color ?? '#fff' }}>{itm?.offer_short_text}</p>
                    </TextBox>
                  </CardBox>
                </SwiperSlide>
              ))}
          </SwiperWrapper>
        </Swiper>
      )}
    </StoreSlider>
  );
};
export default CardSliderVertical;
