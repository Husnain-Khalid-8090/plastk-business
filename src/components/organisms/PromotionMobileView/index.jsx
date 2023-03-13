/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../../atoms/Button';
import ImgAvatar from '../../../assets/images/avtar-img.png';
import DummyImg from '../../../assets/images/dummy-img.png';
import PointImg from '../../../assets/images/points.svg';
import MapImg from '../../../assets/images/map-img.png';
import MenuImg from '../../../assets/images/bottom-menu.png';
import CardSliderVertical from '../CardSliderVertical';
import {
  MobileBlockView,
  Wrap,
  Header,
  BtnTab,
  SubHeader,
  StoreSwiperHolder,
  ImgBox,
  BrandSwiperHolder,
  CardBox,
  TextBox,
  Points,
  DetailHeader,
  StoreLogo,
  MapHolder,
  StoreDetail,
  Head,
  StorePromotionBlock,
} from './PromotionMobileView.style';
import { dummySlides } from '../../../helpers/constants';

// register();

function PromotionMobileView({ previewData }) {
  const [showScreen, setShowScreen] = useState('list');
  const [data, setData] = useState([previewData[0]]);
  const [sliderData] = useState([...previewData, ...dummySlides]);
  const [backgroundImg, setBackgroundImg] = useState(sliderData[0]?.banner_image_url);
  const [logo, setLogo] = useState(sliderData[0]?.business_logo_url);
  const [detail, setDetail] = useState(null);
  console.log({ detail });
  const onCardClick = item => {
    setDetail(item);
    setShowScreen('detail');
    const lBlock = document.getElementById('list-block');
    lBlock.classList.add('mystyle');
  };

  const onSeeAll = () => {
    setShowScreen('promotion');
  };

  const onBackClick = type => {
    setShowScreen(type);
  };
  useEffect(() => {
    if (previewData?.length && previewData.length <= 2) {
      const arr = previewData.slice(0, 2);
      const cards = [...previewData];
      if (arr.length < 2) {
        cards.push(arr[0], arr[0], arr[0]);
      } else {
        previewData.forEach(v => cards.push(v));
      }

      setData(cards);
    }
  }, []);
  return (
    <>
      <MobileBlockView id="list-block">
        <Wrap>
          {showScreen === 'list' && (
            <div className="slider-content">
              <Header>
                <div className="holder">
                  <div className="imgBox">
                    <img src={ImgAvatar} width="40" alt="img description" />
                  </div>
                  <span className="text">Home</span>
                </div>
                <Button type="primary" rounded xs width="120">
                  Spen & Earn
                </Button>
              </Header>
              <BtnTab>
                <button className="active" type="button">
                  Offers
                </button>
                <button type="button">Favourites</button>
              </BtnTab>
              <SubHeader>
                <strong className="title">Stores & Brands</strong>
                <button
                  type="button"
                  className="see-all"
                  onClick={() => {
                    onSeeAll();
                  }}>
                  See All
                </button>
              </SubHeader>
              <BrandSwiperHolder>
                <Swiper slidesPerView={5} spaceBetween={10} loop>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ImgBox type="button" className="img-box">
                      <img src={DummyImg} width="50" alt="img description" />
                    </ImgBox>
                  </SwiperSlide>
                </Swiper>
              </BrandSwiperHolder>
              <SubHeader>
                <strong className="title">Near Me</strong>
                <button
                  type="button"
                  className="see-all"
                  onClick={() => {
                    onSeeAll();
                  }}>
                  See All
                </button>
              </SubHeader>
              <StoreSwiperHolder>
                <Swiper
                  slidesPerView={1.1}
                  spaceBetween={5}
                  centeredSlides
                  observer
                  observeParents
                  loopAdditionalSlides={3}
                  loop>
                  {data.map((element, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => {
                        onCardClick(element);
                      }}>
                      <CardBox key={index} className="img-box">
                        <img className="card-img" src={element.card_image_url} width="350" alt="img description" />
                        <TextBox>
                          <Points>
                            <img src={PointImg} width="16" alt="img description" />
                            <span className="point-text">{element.plastk_points_value}</span>
                          </Points>
                          <strong style={{ color: element.font_color }} className="card-title">
                            {element.name}
                          </strong>
                          <p style={{ color: element.font_color }}> {element.offer_short_text}</p>
                        </TextBox>
                      </CardBox>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </StoreSwiperHolder>
              <SubHeader>
                <strong className="title">For Me</strong>
                <button
                  type="button"
                  className="see-all"
                  onClick={() => {
                    onSeeAll();
                  }}>
                  See All
                </button>
              </SubHeader>
              <StoreSwiperHolder>
                <Swiper slidesPerView={1.1} spaceBetween={5} centeredSlides loopAdditionalSlides={3} loop>
                  {data?.reverse()?.map((element, index) => (
                    <SwiperSlide key={index} onClick={() => onCardClick(element)}>
                      <CardBox key={index} className="img-box">
                        <img className="card-img" src={element.card_image_url} width="350" alt="img description" />
                        <TextBox>
                          <Points>
                            <img src={PointImg} width="16" alt="img description" />
                            <span className="point-text">{element.plastk_points_value}</span>
                          </Points>
                          <strong style={{ color: element.font_color }} className="card-title">
                            {element.name}
                          </strong>
                          <p style={{ color: element.font_color }}> {element.offer_short_text}</p>
                        </TextBox>
                      </CardBox>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </StoreSwiperHolder>
            </div>
          )}
          {showScreen === 'detail' && (
            <div className="detail-content">
              <DetailHeader style={{ backgroundImage: `url(${detail.background_image_url})` }}>
                <button
                  type="button"
                  className="btn-back"
                  onClick={() => {
                    onBackClick('list');
                  }}>
                  <i className="icon-arrow-left" />
                </button>
                <button type="button" className="btn-like">
                  <i className="icon-heart" />
                </button>
                <StoreLogo>
                  <img src={detail.business_logo_url} width="200" alt="img description" />
                </StoreLogo>
              </DetailHeader>
              <MapHolder>
                <img src={MapImg} alt="img description" />
                {(detail.offer_type === 'repeatVisit' || detail.offer_type === 'initailOffer') && (
                  <span className="text">1 of {detail?.minimum_visit} Visits</span>
                )}
              </MapHolder>
              <StoreDetail>
                <Head>
                  <div className="btn-point">
                    <img src={PointImg} width="16" alt="img description" />
                    {detail.offer_percent}
                    {detail?.offer_type !== 'repeatVisit' && '% Back'}
                  </div>
                  <span className="subtitle">Store Details</span>
                </Head>
                {detail.offer_type !== 'repeatVisit' && (
                  <strong className="title">Spend at Least ${detail.minimum_amount}</strong>
                )}
                {detail.offer_type === 'repeatVisit' && (
                  <strong className="title">Visit {detail.minimum_visit} times</strong>
                )}
                <p>{detail.offer_text}</p>
              </StoreDetail>
            </div>
          )}
          {showScreen === 'promotion' && (
            <StorePromotionBlock style={{ backgroundImage: `url(${backgroundImg})` }}>
              <div className="store-head">
                <button
                  type="button"
                  className="btn-back"
                  onClick={() => {
                    onBackClick('list');
                  }}>
                  <i className="icon-arrow-left" />
                </button>
                <span className="subtitle">Near Me</span>
              </div>
              <div className="logo">
                <img src={logo} alt="img description" />
              </div>
              <CardSliderVertical data={sliderData} setLogo={setLogo} setBackgroundImg={setBackgroundImg} />
            </StorePromotionBlock>
          )}
          <img className="menu-img" src={MenuImg} width="340" alt="img description" />
        </Wrap>
      </MobileBlockView>
    </>
  );
}

export default PromotionMobileView;
