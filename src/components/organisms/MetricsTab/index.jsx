/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useMemo, useState } from 'react';
import DataLayout from '../../molecules/DataLayout';
import Pagination from '../../molecules/Pagination';
import GraphColumn from '../GraphColumn';
import Grid from '../../atoms/Grid';
import Table from '../../molecules/Table';
import StarRating from '../../molecules/StarRating';
import IconImg1 from '../../../assets/icons/ico-linegraphs.svg';
import IconImg2 from '../../../assets/icons/ico-cursor.svg';
import IconImg3 from '../../../assets/icons/ico-usergroup.svg';
import PromotionService from '../../../services/promotionsService';
import { convertToCurrencyFormat, shortenString } from '../../../helpers/common';
// import { AuthContext } from '../../../context/authContext';
import Loaders from '../../atoms/Loaders';

function MetricsTab({ searchQuery, setSearchQuery }) {
  const [activeKey, setActiveKey] = useState('');

  const {
    campaignsReviews_data: { reviews, totalItems },
    campaignsReviews_loading,
  } = PromotionService.GetReviews(searchQuery);
  const {
    metricsStats_data: { group, total_impressions, total_clicks, total_conversions, chart_data },
    metricsStats_loading,
  } = PromotionService.GetMatricsStats(searchQuery);
  const [showText, setShowText] = React.useState([false]);
  // eslint-disable-next-line no-unused-vars
  const columnNames = [
    { name: `Store Name`, sort: true, sortKey: 'name' },
    { name: `Date of Review`, sort: true, sortKey: 'details_from_google.reviews.time' },
    { name: `User`, sort: false },
    { name: `Description`, sort: false },
    { name: `Google Stars`, sort: true, sortKey: 'details_from_google.rating' },
  ];

  const rowsData = useMemo(
    () =>
      reviews.map((_, i) => [
        `${shortenString(_.store_name, 20)}`,
        _.relative_time_description,
        _.author_name,
        <>
          {_.text.length > 80 && !showText[i] ? (
            <>
              {`${shortenString(_.text, 80)}`}
              <b
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const arr = [...showText];
                  for (let j = 0; j < arr.length; j++) {
                    arr[j] = false;
                  }
                  arr[i] = true;
                  setShowText(arr);
                }}>
                show more
              </b>
            </>
          ) : !_.text.length ? (
            '---'
          ) : (
            <>
              {_.text} <br />
              <b
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const arr = [...showText];
                  arr[i] = false;
                  setShowText(arr);
                }}>
                show less
              </b>
            </>
          )}
        </>,
        <StarRating value={_.rating} />,
      ]),
    [reviews, showText],
  );
  return (
    <>
      <Grid xs={1} lg={3} gap={{ xs: 20 }}>
        <Loaders loading={metricsStats_loading}>
          <GraphColumn
            group={group}
            dateRange={{ startDate: searchQuery.startDate, endDate: searchQuery.endDate }}
            data={chart_data.impressions}
            iconImg={<img src={IconImg1} width="24" height="12" alt="img" />}
            title="Impressions"
            value={total_impressions ? convertToCurrencyFormat(total_impressions, 0, false) : 0}
            graphType="impressions"
            columnName="Impressions"
          />
        </Loaders>
        <Loaders loading={metricsStats_loading}>
          <GraphColumn
            group={group}
            dateRange={{ startDate: searchQuery.startDate, endDate: searchQuery.endDate }}
            data={chart_data.clicks}
            iconImg={<img src={IconImg2} width="22" height="22" alt="img" />}
            title="Clicks"
            value={total_clicks ? `${convertToCurrencyFormat(total_clicks, 0, false)} Clicks` : 0}
            columnName="Clicks"
            graphType="clicks"
          />
        </Loaders>
        <Loaders loading={metricsStats_loading}>
          <GraphColumn
            group={group}
            dateRange={{ startDate: searchQuery.startDate, endDate: searchQuery.endDate }}
            data={chart_data.conversions}
            iconImg={<img src={IconImg3} width="25" height="25" alt="img" />}
            title="Conversions"
            value={total_conversions ? `${convertToCurrencyFormat(total_conversions, 0, false)} User Conversion` : 0}
            graphType="conversions"
            columnName="Conversions"
          />
        </Loaders>
      </Grid>
      <DataLayout title="Reviews List View">
        <Table
          loading={campaignsReviews_loading}
          rowsData={rowsData}
          columnNames={columnNames}
          itemsPerPage={searchQuery.pageSize}
          onSort={(sortBy, sortOrder) => {
            const newSearchQuery = { ...searchQuery, sortBy, sortOrder };
            setSearchQuery(newSearchQuery);
          }}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
        />
        <Pagination
          className="pagination-bar"
          currentPage={searchQuery.page}
          totalCount={totalItems}
          pageSize={searchQuery.pageSize}
          onPageSizeChange={pageSize => {
            setSearchQuery(_ => ({ ..._, page: 1, pageSize }));
          }}
          onPageChange={page => {
            setSearchQuery(_ => ({ ..._, page }));
          }}
        />
      </DataLayout>
    </>
  );
}

export default MetricsTab;
