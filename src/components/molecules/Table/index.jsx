/* eslint-disable no-nested-ternary */

import React from 'react';

import Skeleton from 'react-loading-skeleton';
import { StyledTable, TableHolder, TBody, TableScroll, Thead, NoRecord, SortBtn } from './Table.styles';
import { TableRow } from '../../atoms/TableRow';
import TableCell from '../../atoms/TableCell';
import SortingArrows from '../../atoms/SortingArrows';

// TODO:Remove nested ternary and add loading
function Table({
  customTopRows = [],
  hideNoRow = false,
  itemsPerPage = 10,
  loading,
  columnNames,
  rowsData,
  height,
  center,
  sm,
  hasBg,
  headSm,
  onClick = () => {},
  onSort = () => {},
  noPadding,
  width,
  gray,
  hasHover,
  tooltipText,
  extraSmall,
  graphType,
  activeKey,
  setActiveKey,
  recordBtn = true,
  ...props
}) {
  return (
    <>
      <TableHolder extraSmall={extraSmall} noPadding={noPadding}>
        <TableScroll extraSmall={extraSmall}>
          <StyledTable $width={width} {...props}>
            <Thead>
              <TableRow>
                {columnNames.some(value => typeof value === 'object')
                  ? columnNames.map(
                      (item, index) =>
                        (item?.permission || item?.permission === undefined) && (
                          <TableCell
                            extraSmall={extraSmall}
                            gray={gray}
                            heading
                            hasBg={hasBg}
                            key={index}
                            center={center}
                            headSm={headSm}>
                            <SortBtn>
                              {item?.name}
                              {item?.sort && (
                                <SortingArrows
                                  name={item?.name}
                                  activeKey={activeKey}
                                  setActiveKey={setActiveKey}
                                  onClick={order => {
                                    onSort(item?.sortKey, order);
                                  }}
                                />
                              )}
                            </SortBtn>
                          </TableCell>
                        ),
                    )
                  : columnNames.map(
                      (item, index) =>
                        (item?.permission || item?.permission === undefined) && (
                          <TableCell
                            extraSmall={extraSmall}
                            graphType={graphType}
                            gray={gray}
                            hasBg={hasBg}
                            heading
                            key={index}
                            center={center}
                            headSm={headSm}>
                            {item}
                          </TableCell>
                        ),
                    )}
              </TableRow>
            </Thead>
            <TBody $height={height}>
              {customTopRows}
              {loading ? (
                Array(10)
                  .fill()
                  .map((item, i) => (
                    <TableRow key={i}>
                      {columnNames?.map((index, key) => (
                        <TableCell extraSmall={extraSmall} graphType={graphType} key={key}>
                          <Skeleton width={100} height={15} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : rowsData?.length ? (
                <>
                  {rowsData?.map((row, index) => (
                    <TableRow key={index} onClick={() => onClick(row, index)} hasHover={hasHover} title={tooltipText}>
                      {row?.map((el, i) => (
                        <TableCell
                          extraSmall={extraSmall}
                          graphType={graphType}
                          data-th={
                            columnNames.some(value => typeof value === 'object') ? columnNames[i]?.name : columnNames[i]
                          }
                          key={i}
                          center={center}
                          sm={sm}>
                          {el}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {rowsData?.length < itemsPerPage && !hideNoRow && (
                    <tr>
                      <TableCell colSpan={columnNames?.length} graphType={graphType} className="text-center">
                        {recordBtn && <NoRecord further> No Further Records</NoRecord>}
                      </TableCell>
                    </tr>
                  )}
                </>
              ) : (
                <tr>
                  <TableCell colSpan={columnNames?.length} graphType={graphType} className="text-center">
                    <NoRecord> No Record Found</NoRecord>
                  </TableCell>
                </tr>
              )}
            </TBody>
          </StyledTable>
        </TableScroll>
      </TableHolder>
    </>
  );
}

export default Table;
