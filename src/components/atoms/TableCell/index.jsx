import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { LoadingContext } from '../../../context/loadingContext';
import { Th, Td } from './TableCell.styles';

function TableCell({ heading, extraSmall, children, graphType, hasBg, ...rest }) {
  const { isLoading } = useContext(LoadingContext);
  const CellType = props => (heading ? <Th graphType={graphType} {...props} /> : <Td {...props} />);
  return (
    <CellType hasBg={hasBg} extraSmall={extraSmall} {...rest}>
      {isLoading ? <Skeleton width={100} height={15} /> : children}
    </CellType>
  );
}

export default TableCell;
