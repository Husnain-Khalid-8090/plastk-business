/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Toast from '../../molecules/Toast';
import CampaignService from '../../../services/promotionsService';
import PdfViewer from '../PdfViewer';

const StatementModal = ({ id, onClose }) => {
  const [statement, setStatement] = useState('');
  const { statement_data, statement_error } = CampaignService.GetSingleStatement(id);
  useEffect(() => {
    if (statement_error) {
      onClose();
      Toast({
        type: 'error',
        message: 'Error while fetching statement',
      });
    } else if (statement_data) {
      setStatement(URL.createObjectURL(new Blob([statement_data])));
    }
  }, [statement_data, statement_error]);

  return (
    <>
      <PdfViewer url={statement} />
    </>
  );
};

export default StatementModal;
