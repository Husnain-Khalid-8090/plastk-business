import React from 'react';
// eslint-disable-next-line no-unused-vars
import style from 'styled-components/macro';

import UsePagination from '../../atoms/UsePagination';
import DOTS from '../../atoms/PaginationDots';
import { PaginationList, PaginationButton, TotalItems, PaginationHolder, SelectHolder } from './Pagination.styles';
import Select from '../../atoms/Select';

function Pagination(props) {
  const {
    onPageChange = () => {},
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    customCss,
    onPageSizeChange = () => {},
  } = props;

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

  const lastPage = paginationRange[paginationRange.length - 1];

  const SelectItemsPerPage = [
    { value: '5', label: '5 / Page' },
    { value: '10', label: '10 / Page' },
    { value: '20', label: '20 / Page' },
    { value: '50', label: '50 / Page' },
    { value: '100', label: '100 / Page' },
  ];

  const selectPageSize = ({
    target: {
      value: { value },
    },
  }) => {
    onPageSizeChange(value);
  };
  return (
    <PaginationHolder>
      <TotalItems>{totalCount} Items</TotalItems>
      <SelectHolder>
        <Select
          options={SelectItemsPerPage}
          onChange={selectPageSize}
          defaultValue={{ value: pageSize, label: `${pageSize} / Page` }}
          menuPlacement="top"
          noMargin
          isSearchable={false}
        />
      </SelectHolder>
      <PaginationList css={customCss}>
        <li>
          <PaginationButton type="secondary" shape="circle" onClick={onPrevious} disabled={currentPage === 1} size={28}>
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
            type="secondary"
            shape="circle"
            onClick={onNext}
            disabled={currentPage === lastPage}
            size={28}>
            <i className="icon-arrow-next" />
          </PaginationButton>
        </li>
      </PaginationList>
    </PaginationHolder>
  );
}

export default Pagination;
