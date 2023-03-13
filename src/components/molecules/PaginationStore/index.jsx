import React from 'react';
// eslint-disable-next-line no-unused-vars
import style from 'styled-components/macro';

import UsePagination from '../../atoms/UsePagination';
import DOTS from '../../atoms/PaginationDots';
import { PaginationList, PaginationButton } from './PaginationStore.styles';

function PaginationStore({ mobileView, ...props }) {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, customCss } = props;
  // const { isLoading, page, nbPages, handlePage, handleNextPage } = useGlobalContext();
  const paginationRange = UsePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || totalCount <= 10) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    // const nextPage = currentPage + 1;
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <PaginationList css={customCss} mobileView={mobileView}>
      <li>
        <PaginationButton
          css="background-color: #685cb6;"
          shape="circle"
          onClick={onPrevious}
          disabled={currentPage === 1}
          size={28}>
          <i className="icon-arrow-prev" />
        </PaginationButton>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }

        return (
          <li key={index}>
            <PaginationButton
              type="white"
              shape="circle"
              size={28}
              css="color: var(--text-color-gray)"
              onClick={() => onPageChange(pageNumber)}
              className={`${(pageNumber === currentPage && 'selected') || ''}`}
              $pageNumBtn>
              {pageNumber}
            </PaginationButton>
          </li>
        );
      })}
      <li>
        <PaginationButton
          css="background-color: #685cb6;"
          shape="circle"
          onClick={onNext}
          disabled={currentPage === lastPage}
          size={28}>
          <i className="icon-arrow-next" />
        </PaginationButton>
      </li>
    </PaginationList>
  );
}

export default PaginationStore;
