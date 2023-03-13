import styled from 'styled-components/macro';

export const ContentHolder = styled.div`
  position: relative;
  width: 100%;
  margin: 0 0 25px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
`;

export const Heading = styled.strong`
  display: block;
  font-size: 14px;
  line-height: 20px;
  text-transform: capitalize;
  margin: 0;
`;

export const TextWrap = styled.div`
  width: 100%;
  padding: 45px 32px;
  font-size: 14px;
  line-height: 20px;
  border: 2px solid #ebecf3;
  border-radius: 10px;
`;

export const Text = styled.span`
  display: block;
  margin: 0 0 15px;

  &:last-child {
    margin: 0;
  }
`;

export const StoreRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 5px;
`;

export const StoreName = styled.div`
  width: 435px;
  padding: 16px;
  margin: 0 20px 0 0;
  border-radius: 50px;
  background: var(--bg-light-grey);
`;

export const Title = styled.span`
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--primary-text-color);
  padding: 5px 15px;
  border-radius: 50px;
  background: rgba(0, 94, 255, 0.3);
`;
