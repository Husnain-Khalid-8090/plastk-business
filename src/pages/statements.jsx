/* eslint-disable no-unused-vars */
import React, { useContext, useMemo, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { format } from 'date-fns';
import DataLayout from '../components/molecules/DataLayout';
import Pagination from '../components/molecules/Pagination';
import Table from '../components/molecules/Table';
import FiltersJSX from '../components/organisms/FilterJSX';
import CampaignService from '../services/promotionsService';
import Button from '../components/atoms/Button';
import ModalContainer from '../components/molecules/ModalContainer';

import { convertToCurrencyFormat, getDateObject, no_permission } from '../helpers/common';
import StatementModal from '../components/organisms/StatementModal';
import { AuthContext } from '../context/authContext';
import Toast from '../components/molecules/Toast';
import StatementDetails from '../components/organisms/StatementDetails';
import PayInvoice from '../components/organisms/PayInvoice';

function Statements() {
  const { hasPermission, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    pageSize: 10,
    startDate: '',
    endDate: '',
    sortBy: 'created_at',
    sortOrder: -1,
  });
  const [activeKey, setActiveKey] = useState('');
  const [isCredit] = useState(user?.client_type === 'Credit');
  const { statements_data, statements_loading } = CampaignService.GetStatements(searchQuery);
  const downloadStatement = async id => {
    setLoading(true);
    try {
      const res = await CampaignService.getSingleStatement(id);
      setLoading(false);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([res]));
      a.download = 'Statement.pdf';
      a.click();
      setLoading(false);
      document.body.appendChild(a);

      document.body.removeChild(a);
    } catch (error) {
      setLoading(false);
      Toast({
        type: 'error',

        description: error.message,
      });
    }
  };
  const { statements, totalItems } = useMemo(
    () => ({
      statements: statements_data?.items
        ?.map(item => [
          format(getDateObject(new Date(item.statement_date).toString()), 'MMM yyyy'),

          item.status,
          hasPermission('bap.statements.details') ? (
            <ModalContainer
              title="Statement Details"
              xl
              btnComponent={({ onClick }) => (
                <Button
                  type="light"
                  width={75}
                  xs
                  onClick={() => {
                    onClick();
                  }}>
                  More
                </Button>
              )}
              content={({ onClose }) => <StatementDetails item={item} onClose={onClose} />}
            />
          ) : (
            no_permission
          ),
          <div
            css={`
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 10px;
            `}>
            <ModalContainer
              xl
              title="Statement"
              btnComponent={({ onClick }) => (
                <Button
                  type="light"
                  width="50"
                  css={`
                    span {
                      margin: 0 !important;
                    }
                    margin: 0 !important;

                    text-align: center;
                  `}
                  xs
                  prefix={
                    <i
                      className="material-icons-outlined"
                      css={`
                        font-size: 16px;
                        margin: 0;
                      `}>
                      visibility
                    </i>
                  }
                  onClick={() => onClick()}
                />
              )}
              content={({ onClose }) => <StatementModal id={item._id} onClose={onClose} />}
            />
            {!!hasPermission('bap.statements.download') && (
              <Button
                type="light"
                width="50"
                css={`
                  span {
                    margin: 0 !important;
                  }
                  margin: 0 !important;

                  text-align: center;
                `}
                xs
                prefix={
                  <i
                    className="material-icons-outlined"
                    css={`
                      font-size: 16px;
                      margin: 0;
                    `}>
                    download
                  </i>
                }
                onClick={() => downloadStatement(item._id)}
                loading={loading}
              />
            )}
          </div>,
          hasPermission('bap.statements.pay-invoice') ? (
            <ModalContainer
              lg
              title="Pay Invoice"
              btnComponent={({ onClick }) => (
                <Button
                  type="light"
                  width={100}
                  xs
                  onClick={() => {
                    onClick();
                  }}
                  disabled={item?.status === 'Paid'}>
                  Pay Invoice
                </Button>
              )}
              content={({ onClose }) => (
                <PayInvoice
                  onClose={onClose}
                  statementId={item._id}
                  amount={item?.total_amount_in_dollers}
                  statement={item}
                />
              )}
            />
          ) : (
            no_permission
          ),
        ])
        .reduce((prev, curr) => {
          prev.push(curr.filter(item => item !== no_permission));
          return prev;
        }, []),
      totalItems: statements_data?.totalItems ?? 0,
    }),
    [statements_data],
  );

  const columnNames = [
    { name: `${isCredit ? 'Invoices' : 'Statements'}`, sort: true, sortKey: 'statement_date' },

    { name: `Status`, sort: true, sortKey: 'status' },
    { name: `More`, sort: false, permission: hasPermission('bap.statements.details') },
    {
      name: `View/Download`,
      sort: false,
      permission: hasPermission('bap.statements.details'),
    },

    { name: `Action`, sort: false, permission: hasPermission('bap.statements.pay-invoice') },
  ];

  const columnNamesPrepaid = [
    { name: `${isCredit ? 'Invoices' : 'Statements'}`, sort: true, sortKey: 'statement_date' },
    { name: `Status`, sort: true, sortKey: 'status' },
    { name: `More`, sort: false, permission: hasPermission('bap.statements.details') },
    {
      name: `View/Download`,
      sort: false,
      permission: hasPermission('bap.statements.details'),
    },
  ];
  const { statementsPrepaid, totalItemsPrepaid } = useMemo(
    () => ({
      statementsPrepaid: statements_data?.items
        ?.map(item => [
          format(getDateObject(new Date(item.statement_date).toString()), 'MMM yyyy'),
          item?.status,
          hasPermission('bap.statements.details') ? (
            <ModalContainer
              title="Statement Details"
              xl
              btnComponent={({ onClick }) => (
                <Button
                  css={`
                    display: flex;
                    justify-content: center;
                  `}
                  type="light"
                  width={75}
                  xs
                  onClick={() => {
                    onClick();
                  }}>
                  More
                </Button>
              )}
              content={({ onClose }) => <StatementDetails item={item} onClose={onClose} />}
            />
          ) : (
            no_permission
          ),
          hasPermission('bap.statements.details') ? (
            <div
              css={`
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
              `}>
              <ModalContainer
                xl
                title="Statement"
                btnComponent={({ onClick }) => (
                  <Button
                    type="light"
                    width="50"
                    css={`
                      span {
                        margin: 0 !important;
                      }
                      margin: 0 !important;

                      text-align: center;
                    `}
                    xs
                    prefix={
                      <i
                        className="material-icons-outlined"
                        css={`
                          font-size: 16px;
                          margin: 0;
                        `}>
                        visibility
                      </i>
                    }
                    onClick={() => onClick()}
                  />
                )}
                content={({ onClose }) => <StatementModal id={item._id} onClose={onClose} />}
              />
              {!!hasPermission('bap.statements.download') && (
                <Button
                  type="light"
                  width="50"
                  css={`
                    span {
                      margin: 0 !important;
                    }
                    margin: 0 !important;

                    text-align: center;
                  `}
                  xs
                  prefix={
                    <i
                      className="material-icons-outlined"
                      css={`
                        font-size: 16px;
                        margin: 0;
                      `}>
                      download
                    </i>
                  }
                  onClick={() => downloadStatement(item._id)}
                  loading={loading}
                />
              )}
            </div>
          ) : (
            no_permission
          ),
        ])
        .reduce((prev, curr) => {
          prev.push(curr.filter(item => item !== no_permission));
          return prev;
        }, []),
      totalItemsPrepaid: statements_data?.totalItems ?? 0,
    }),
    [statements_data],
  );
  return (
    <>
      <DataLayout
        title={`All ${isCredit ? 'Invoices' : 'Statements'}`}
        filters={
          <FiltersJSX
            onFilterChange={__ => {
              setSearchQuery(_ => ({
                ..._,
                ...__,
                page: 1,
              }));
            }}
            setActiveKey={setActiveKey}
          />
        }>
        <Table
          rowsData={isCredit ? statements : statementsPrepaid}
          columnNames={isCredit ? columnNames : columnNamesPrepaid}
          loading={statements_loading}
          itemsPerPage={searchQuery.pageSize}
          onSort={(sortBy, sortOrder) => {
            setSearchQuery(_ => ({ ..._, sortBy, sortOrder }));
          }}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
        />
        <Pagination
          className="pagination-bar"
          currentPage={searchQuery.page}
          totalCount={isCredit ? totalItems : totalItemsPrepaid}
          pageSize={searchQuery.pageSize}
          onPageChange={page => {
            setSearchQuery(_ => ({ ..._, page }));
          }}
          onPageSizeChange={pageSize => {
            setSearchQuery(_ => ({ ..._, pageSize, page: 1 }));
          }}
        />
      </DataLayout>
    </>
  );
}

export default Statements;
