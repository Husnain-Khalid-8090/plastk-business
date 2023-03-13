import styled from 'styled-components/macro';

const getColor = className => {
  switch (`icon-${className.split('icon-')[1].split(' ')[0]}`) {
    case 'icon-clock':
      return '#00aced';
    case 'icon-check-circle':
      return 'green';
    case 'icon-check':
      return '#f5f5f5';
    case 'icon-close':
      return 'red';
    case 'icon-times-circle':
      return 'red';
    case 'icon-error-circle':
      return 'red';
    case 'icon-warning':
      return 'yellow';
    default:
      return '#000';
  }
};
export const I = styled.span`
  font-size: ${props => props.size};
  align-self: center;
  align-items: center;
  justify-content: center;
  color: ${({ className }) => getColor(className)};
  text-align: center;
`;
export const IconHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
