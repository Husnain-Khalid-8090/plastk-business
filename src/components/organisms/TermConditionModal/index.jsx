/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled, { css } from 'styled-components/macro';
import { Document, Page } from 'react-pdf';
import Button from '../../atoms/Button';
import { TeamConditionModal, TextHolder, BtnHolder } from './TermConditionModal.styles';
import bapPdf from '../../../assets/pdf/bap_aggrement.pdf';

function TermConditionModal({ onClose, form }) {
  const [totalPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handlePage = type => {
    switch (type) {
      case 'prev':
        if (pageNumber >= 1) {
          setPageNumber(prev => prev - 1);
        }
        break;
      default:
        setPageNumber(prev => prev + 1);
    }
  };
  return (
    <>
      <TeamConditionModal>
        <TextHolder>
          <Document file={bapPdf} onLoadSuccess={onDocumentLoadSuccess}>
            {totalPages > 0 &&
              Array(totalPages)
                .fill(null)
                .map((_, i) => i + 1)
                .map(page => (
                  <>
                    <Page pageNumber={page} scale={1.35} />
                    <p
                      css={`
                        text-align: center;
                      `}>
                      Page {page} of {totalPages}
                    </p>
                  </>
                ))}
          </Document>
        </TextHolder>
        <BtnHolder>
          <Button
            type="primary"
            sm
            rounded
            width="120"
            onClick={() => {
              form.setFieldsValue({ readandagree: true });
              onClose();
            }}>
            Agree
          </Button>
        </BtnHolder>
      </TeamConditionModal>
    </>
  );
}

export default TermConditionModal;
