// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';

export const FieldHolder = styled.div`
  padding: 0 0 5px;
`;

export const VisitsHolder = styled.div`
  padding: 20px 15px 0;
  border: 1px solid #dadada;
  border-radius: 6px;
`;

export const TextWrap = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid var(--light);
  border-radius: 5px;
  margin: 0 0 20px;
  padding: 25px 30px;
  background: var(--white);
`;

export const Holder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0 30px;
`;

export const LeftColumn = styled.div`
  width: 330px;
`;

export const ImgColumn = styled.div`
  width: 250px;
  height: 250px;
  padding: 15px;
  margin: 0 0 0 20px;
  border-radius: 5px;
  border: 1px solid var(--light);
  background: #ccc;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
  }
`;

export const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
  flex-shrink: 0;
  background: var(--white);
  border: 2px solid var(--light-secondary);
  border-radius: 5px;
  margin: 0 0 20px;

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

export const RadioWrap = styled.div``;

export const BtnHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const StyledList = styled.ol`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 40px;
  text-transform: capitalize;
  li {
    width: 33.3%;
    padding: 10px;
  }
`;

export const FieldWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 28px 35px;
  border: 2px solid #ebecf3;
  border-radius: 10px;
  margin: 0 0 16px;

  label {
    display: block;
    text-transform: capitalize;
    padding: 0 10px 0 0;
    margin: 0;
    min-width: 140px;
  }
`;
export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  button {
    font-size: 18px;
    line-height: 1;
    color: #4a5568;

    .icon-trash {
      color: #d74120;
    }
  }
`;
export const ColorField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .btnColor {
    width: 180px;
    height: 40px;
    overflow: hidden;
    border-radius: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    border: 1px solid rgba(74, 85, 104, 0.1);

    .btn-text {
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 5;
      font-size: 14px;
      background: none;
      pointer-events: none;
    }

    div:nth-child(2) {
      div {
        position: initial;
        cursor: pointer;
      }
    }

    .inputbox {
      position: absolute;
      padding: 0;
      border: 0;
      outline: none;
      margin: 0;
      background: none;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      transform: scale(1.5);
      cursor: pointer;
    }
  }
`;
export const ImgField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 40px;
  background: #f9fafb;
  border-radius: 50px;
  text-align: center;
  overflow: hidden;

  div:nth-child(2) {
    div {
      position: initial;
      opacity: 0;
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    transform: scale(1.1);
    background: none;
  }

  .btn-text {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    position: relative;
    margin: 0 -25px 0 0;
    z-index: 5;
    background: none;
    pointer-events: none;
  }
`;
export const ImgHolder = styled.div`
  display: flex;
  gap: 40px;
`;
export const BannerHolder = styled.div`
  img {
    width: 150px;
    height: 150px;
  }
`;
export const BannerText = styled.div`
  margin-bottom: 26px;
`;
export const LogoHolder = styled.div`
  display: flex;
  gap: 40px;
`;
export const BannerImg = styled.div`
  width: 150px;
  height: 150px;
  background: rgba(74, 85, 104, 0.3);
  overflow: hidden;
  img {
    display: block;
    max-width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const LogoBox = styled.div``;
export const Img = styled.div`
  width: 150px;
  height: 150px;
  background: rgba(74, 85, 104, 0.3);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;
