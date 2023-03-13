import styled from 'styled-components/macro';

export const StyledProfileCard = styled.div`
  flex-shrink: 0;
  max-width: 350px;
  padding: 30px 25px;
  margin: -40px auto 20px;
  text-align: center;
  position: relative;
  border: 1px solid #fcfcfd;
  border-radius: 18px;
  box-shadow: 0px 40px 64px -32px rgba(15, 15, 15, 0.1);
  background: linear-gradient(83.59deg, #fcfcfd 36.52%, rgba(252, 252, 253, 0.83) 98.8%);
  backdrop-filter: blur(10px);

  @media (min-width: 992px) {
    max-width: 200px;
    padding: 30px 20px;
    margin: -80px 40px 0 0;
  }
  @media (min-width: 992px) {
    max-width: 261px;
    padding: 30px;
  }
`;

export const EditProfileImg = styled.label`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(82%);
  color: var(--white);
  background: rgba(0, 0, 0, 0.5);
  padding: 6px;
  transition: transform 0.4s ease-in-out;
  cursor: pointer;
  span {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.4s ease-in-out;
  }
  i {
    margin-bottom: 5px;
    display: block;
  }
`;

export const ImgBox = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 100%;
  margin: 0 auto 20px;
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }
  @media (min-width: 992px) {
    width: 160px;
    height: 160px;
  }

  &:hover {
    ${EditProfileImg} {
      transform: translateY(0);
      span {
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Title = styled.strong`
  display: block;
  font-size: var(--font-size-lg);
  line-height: 22px;
  text-transform: capitalize;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--secondary-text-color);
`;

export const TextBox = styled.div`
  overflow: hidden;
  font-size: var(--font-size-sm);
  line-height: 20px;
  color: var(--text-color-gray);

  p {
    margin-bottom: 25px;
  }
`;

export const Designation = styled.span`
  display: block;
  font-size: var(--font-size-sm);
  line-height: 16px;
  text-transform: capitalize;
  font-weight: 700;
  margin-bottom: 15px;
  color: var(--primary);
`;

export const PlaceHolder = styled.span`
  background: #edfad6;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #9dcb4c;
  font-weight: bold;
  font-size: 40px;
  line-height: 45px;
`;
