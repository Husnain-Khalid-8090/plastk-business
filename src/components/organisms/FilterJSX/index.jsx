/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { lazy, useState, useMemo, useRef, useEffect, useContext } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import debounce from 'lodash/debounce';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { startOfDay, endOfDay } from 'date-fns';
import { useParams } from 'react-router-dom';
import Button from '../../atoms/Button';
import { FilterStatus } from './filtersData';
import { getDateObject } from '../../../helpers/common';
import { AuthContext } from '../../../context/authContext';

const Field = lazy(() => import('../../molecules/Field'));
const InputButton = lazy(() => import('../../atoms/InputButton'));
const ReactDateRange = lazy(() => import('../../molecules/ReactDateRange'));
const Dropdown = lazy(() => import('../../molecules/Dropdown'));

export default function FiltersJSX({ hideStatus = false, onFilterChange = () => {}, setActiveKey }) {
  const { view } = useParams();
  const [openSearch, setOpenSearch] = useState(false);
  const [status, setStatus] = useState('All');
  const [customKeyVal, setCustomKeyVal] = useState('All');
  const [customKey] = useState(FilterStatus[view]?.customKey?.name);
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
    key: 'selection',
  });

  const { user } = useContext(AuthContext);
  const debounceRef = useRef(0);
  const [dateState, setDateState] = useState([
    {
      startDate: getDateObject(),
      endDate: getDateObject(),
      key: 'selection',
    },
  ]);
  const MinWidth768 = useMediaPredicate('(min-width: 768px)');
  useEffect(() => {
    const filterObj = {
      searchText,
      filterText: status.toLowerCase() === 'all' ? '' : status,
      startDate: selectedDate.startDate ? startOfDay(selectedDate.startDate).toISOString() : '',
      endDate: selectedDate.endDate ? endOfDay(selectedDate.endDate).toISOString() : '',
      key: 'selection',
    };
    if (customKey) {
      filterObj[customKey] = customKeyVal;
    }
    onFilterChange(filterObj);
  }, [status, customKeyVal]);

  const onSearchCallText = useMemo(
    () =>
      debounce(value => {
        debounceRef.current += 1;
        const LocalRef = debounceRef.current;
        setTimeout(() => {
          if (LocalRef === debounceRef.current) {
            onFilterChange({
              searchText: value,
              filterText: status,
              startDate: selectedDate.startDate ? startOfDay(getDateObject(selectedDate.startDate)).toISOString() : '',
              endDate: selectedDate.endDate ? endOfDay(getDateObject(selectedDate.endDate)).toISOString() : '',
              key: 'selection',
            });
          }
        }, 1);
      }, 300),
    [],
  );

  const onReset = () => {
    setOpenSearch(false);
    setStatus('All');
    setSearchText('');
    setActiveKey('');
    setCustomKeyVal('All');
    setDateState([
      {
        startDate: getDateObject(),
        endDate: getDateObject(),
        key: 'selection',
      },
    ]);
    setSelectedDate({ startDate: '', endDate: '' });
    const filterObj = {
      searchText: '',
      filterText: '',
      startDate: '',
      endDate: '',
      sortOrder: -1,
      sortBy: null,
    };
    if (customKey) {
      filterObj[customKey] = '';
    }
    onFilterChange(filterObj);
  };

  // filter otions according to client type
  const options = FilterStatus[view]?.searchFilter;
  let modifiedOptions;

  if (view === 'payment-history' && user?.client_type === 'Prepaid') {
    modifiedOptions = { 0: options[0], 1: options[1] };
  } else {
    modifiedOptions = options;
  }
  return (
    <>
      {FilterStatus[view]?.customKey && !hideStatus && (
        <Dropdown
          title={FilterStatus[view]?.customKey?.title}
          options={FilterStatus[view]?.customKey?.options}
          value={customKeyVal}
          setValue={x => {
            setCustomKeyVal(x);
          }}
        />
      )}
      {FilterStatus[view]?.searchFilter && !hideStatus && (
        <Dropdown
          title="Status"
          options={modifiedOptions}
          value={status}
          setValue={x => {
            setStatus(x);
          }}
        />
      )}
      {FilterStatus[view]?.searchText && (
        <div>
          <Field
            type="search"
            name="search"
            placeholder={FilterStatus[view]?.placeholderText}
            value={searchText}
            onChange={({ target: { value } }) => {
              setSearchText(value);
              onSearchCallText(value.trim());
            }}
            button={
              <InputButton
                type="light"
                size={40}
                shape="circle"
                unStyled={MinWidth768}
                css={`
                  @media (max-width: 575px) {
                    position: static !important;
                    transform: none !important;
                  }
                `}
                onClick={() => setOpenSearch(!openSearch)}>
                <i className="icon-search" />
              </InputButton>
            }
            openSearch={openSearch}
            maxLength="40"
            responsive
            searchField
            noMargin
            sm
          />
        </div>
      )}
      {FilterStatus[view]?.searchDate && (
        <Dropdown title="Filter" filter>
          <ReactDateRange
            onApply={() => {
              setSelectedDate(() => dateState[0]);
              onFilterChange({
                searchText,
                filterText: status,
                startDate: dateState[0].startDate
                  ? startOfDay(getDateObject(dateState[0].startDate)).toISOString()
                  : '',
                endDate: dateState[0].endDate ? endOfDay(getDateObject(dateState[0].endDate)).toISOString() : '',
                key: 'selection',
              });
            }}
            onClear={() => {
              setDateState([
                {
                  startDate: getDateObject(),
                  endDate: getDateObject(),
                  key: 'selection',
                },
              ]);
            }}
            onChange={item => setDateState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateState}
          />
        </Dropdown>
      )}
      {(FilterStatus[view]?.searchDate || FilterStatus[view]?.searchText) && (
        <Button
          type="outline"
          size="sm"
          sm
          rounded
          css={`
            margin-left: 1rem;
            max-width: 5rem;
            @media (min-width: 768px) {
              max-width: 8rem;
            }
          `}
          onClick={onReset}>
          Reset
        </Button>
      )}
    </>
  );
}
