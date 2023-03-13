/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { startOfWeek, endOfWeek, startOfMonth, addDays, startOfDay, subDays, endOfDay } from 'date-fns';
import ReactDateRange from '../../molecules/ReactDateRange';
import Dropdown from '../../molecules/Dropdown';
import { getDateObject } from '../../../helpers/common';
import { BtnsList, Button, FiltersHolder, SelectStyled } from './FilterBtns.style';
import { AuthContext } from '../../../context/authContext';

function FilterBtns({ loading_ps, stores, promotions, onFilterChange = () => {} }) {
  const { loading, user } = React.useContext(AuthContext);
  const [status, setStatus] = useState('Month');
  const [dateState, setDateState] = useState([
    {
      startDate: user?.created_at ? new Date(user?.created_at) : addDays(new Date(), -365),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [storePromotion, setStorePromotion] = useState({
    store: { value: '', label: 'All Stores' },
    promotion: {
      value: '',
      label: 'All Promotions',
    },
  });
  const handleStore = ({ target }) => {
    onFilterChange({ store: target.value.value });
    setStorePromotion({
      ...storePromotion,
      store: target.value,
    });
  };

  const handlePromotion = ({ target }) => {
    onFilterChange({ promotion: target.value.value, store: '' });
    setStorePromotion({
      store: { value: '', label: 'All Stores' },
      promotion: target.value,
    });
  };

  useEffect(() => {
    switch (status) {
      case 'Today':
        onFilterChange({
          startDate: startOfDay(new Date()).toISOString(),
          endDate: endOfDay(new Date()).toISOString(),
          key: 'selection',
          year: false,
        });
        break;
      case 'Week':
        onFilterChange({
          startDate: addDays(startOfWeek(new Date()), 1).toISOString(),
          endDate: endOfWeek(new Date()).toISOString(),
          key: 'selection',
          year: false,
        });
        break;
      case 'Month':
        onFilterChange({
          startDate: addDays(startOfMonth(new Date()), 1).toISOString(),
          endDate: addDays(
            startOfMonth(new Date()),
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
          ).toISOString(),
          key: 'selection',
          year: false,
        });
        break;
      case 'Custom':
        break;
      default:
        onFilterChange({
          startDate: user?.created_at ? new Date(user?.created_at).toISOString() : addDays(new Date(), -365),
          endDate: getDateObject().toISOString(),
          key: 'selection',
          year: true,
        });
        break;
    }
  }, [status]);
  const onResetAll = () => {
    setStorePromotion({
      promotion: { value: '', label: 'All Promotions' },
      store: {
        value: '',
        label: 'All Stores',
      },
    });
    setStatus('Year');
    setDateState([
      {
        startDate: user?.created_at ? new Date(user?.created_at) : addDays(new Date(), -365),
        endDate: getDateObject().toISOString(),
        key: 'selection',
      },
    ]);
    onFilterChange({
      store: '',
      promotion: '',
      searchText: '',
      filterText: '',
      year: true,
    });
  };
  return (
    <>
      <FiltersHolder>
        <SelectStyled
          disabled={loading || loading_ps}
          defaultValue={promotions[0]}
          options={promotions}
          value={storePromotion.promotion}
          onChange={handlePromotion}
          noMargin
          placeholder="Select Promotion"
          gray
        />
        <SelectStyled
          disabled={loading || loading_ps}
          defaultValue={stores[0]}
          value={storePromotion.store}
          options={stores}
          onChange={handleStore}
          noMargin
          placeholder="Select Store"
          gray
        />
        <BtnsList>
          <Button
            disabled={loading || loading_ps}
            type="button"
            onClick={() => setStatus('Today')}
            className={status === 'Today' ? 'active' : ''}>
            Today
          </Button>
          <Button
            disabled={loading || loading_ps}
            type="button"
            onClick={() => setStatus('Week')}
            className={status === 'Week' ? 'active' : ''}>
            Week
          </Button>
          <Button
            disabled={loading || loading_ps}
            type="button"
            onClick={() => setStatus('Month')}
            className={status === 'Month' ? 'active' : ''}>
            Month
          </Button>
          <Button
            disabled={loading || loading_ps}
            type="button"
            onClick={() => setStatus('Year')}
            className={status === 'Year' ? 'active' : ''}>
            Year
          </Button>
          <Dropdown
            disabled={loading || loading_ps}
            title="Filter"
            filter
            className={status === 'Custom' ? 'active' : ''}>
            <ReactDateRange
              maxDate={new Date()}
              disabled={loading || loading_ps}
              onApply={() => {
                setStatus('Custom');
                onFilterChange({
                  startDate: dateState[0].startDate
                    ? addDays(getDateObject(dateState[0].startDate), 1).toISOString()
                    : '',
                  endDate: dateState[0].endDate ? addDays(getDateObject(dateState[0].endDate), 1).toISOString() : '',
                  key: 'selection',
                });
              }}
              onClear={() => {
                setStatus('Year');
                setDateState([
                  {
                    startDate: subDays(new Date(), 10),
                    endDate: new Date(),
                    key: 'selection',
                  },
                ]);
              }}
              onChange={item => setDateState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateState}
            />
          </Dropdown>
        </BtnsList>
        <button
          className="btn-clear"
          type="button"
          css="font-size: 20px;"
          disabled={loading || loading_ps}
          onClick={onResetAll}>
          <i className="icon-reset" />
        </button>
      </FiltersHolder>
    </>
  );
}

export default FilterBtns;
