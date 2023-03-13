import styled from 'styled-components/macro';
import Link from '../../atoms/Link';

export const a = styled(Link)`
  font-weight: bold;
`;
export const LogoSize = styled.span`
  display: block;
  margin: 0 0 15px;
  font-size: var(--font-size-sm);
`;

export const UploadImgBusiness = styled.div`
  display: flex;
  gap: 20px;

  .upload-img {
    flex: 1;
  }
`;
