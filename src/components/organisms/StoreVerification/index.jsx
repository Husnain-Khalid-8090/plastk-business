/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import Form, { useForm } from '../Form';
import Field from '../../molecules/Field';
import { BtnHolder, TextBox, Title, Text, SubTitle, BoxHolder } from './StoreVerification.styles';
import Button from '../../atoms/Button';
import StoreService from '../../../services/storeService';
import Toast from '../../molecules/Toast';
import ConfirmationDialogueModal from '../ConfirmationDialogueModal';
import Modal from '../../molecules/Modal';
import Heading from '../../atoms/Heading';
import { AuthContext } from '../../../context/authContext';
import Paragraph from '../../atoms/Paragraph';

function StoreVerificationModal({ onClose, id, hideModal }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [transactionOptions, setTransactionOptions] = useState([]);
  const [btnLoading, setBtnLoading] = useState([]);
  const { refetch, setShowStoreModal } = useContext(AuthContext);
  const getMerchantDetails = ({ transaction_id }) => {
    setLoading(true);
    StoreService.getMerchantDetails(transaction_id)
      .then(res => {
        setTransactionOptions(res?.data);

        setLoading(false);
        setShowModal(true);
      })
      .catch(err => {
        setLoading(false);
        Toast({
          type: 'error',
          message: err?.message,
        });
      });
  };
  const verifyStore = (index, transactionId) => {
    const myLoading = [];
    setDisabledBtn(true);
    const { transaction_id } = form.getFieldsValue('transaction_id');
    myLoading[index] = true;
    setBtnLoading(myLoading);
    StoreService.verifyStore(id, { authCode: transaction_id, transactionId })
      .then(res => {
        setBtnLoading([]);
        setDisabledBtn(false);
        if (!hideModal) {
          setShowSuccessModal(true);
        }

        if (hideModal) {
          onClose();
          refetch();
        }
        Toast({
          type: 'success',
          message: res?.message,
        });
      })
      .catch(err => {
        setBtnLoading([]);
        setDisabledBtn(false);

        Toast({
          type: 'error',
          message: err?.message,
        });
      });
  };
  return (
    <>
      <Form form={form} onSubmit={getMerchantDetails}>
        <Form.Item
          gray
          type="text"
          name="transaction_id"
          label="Auth Code"
          placeholder="Auth Code"
          rules={[
            { required: true, message: 'Please Enter Auth Code' },
            { pattern: /^[0-9]{6}$/, message: 'Enter a valid Auth Code' },
          ]}>
          <Field />
        </Form.Item>
        <BtnHolder>
          <Button css="margin: 0 5px;" type="light" rounded sm width="150" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={loading} css="margin: 0 5px;" type="primary" rounded sm width="150" htmlType="submit">
            Verify
          </Button>
        </BtnHolder>
      </Form>
      <Modal isOpen={showModal} setIsOpen={setShowModal} lg isClosable>
        <ConfirmationDialogueModal
          onClose={() => setShowModal(false)}
          hideCancel
          text={
            <>
              <Heading level={2}>Are you sure you want to verify the store against these Details?</Heading>
              {transactionOptions?.length &&
                transactionOptions?.map((tran, index) => (
                  <>
                    <BoxHolder>
                      <TextBox>
                        <Title>Merchant:</Title>
                        <Text>{tran?.merchant_name ?? 'N/A'}</Text>
                        <SubTitle>Description:</SubTitle>
                        <Text>{tran?.description ?? 'N/A'}</Text>
                      </TextBox>
                      <Button
                        type="primary"
                        loading={btnLoading[index]}
                        disabled={disabledBtn}
                        sm
                        width="120"
                        onClick={() => verifyStore(index, tran.transaction_id)}>
                        Verify
                      </Button>
                    </BoxHolder>
                  </>
                ))}
            </>
          }
        />
      </Modal>

      <Modal
        isOpen={showSuccessModal}
        setIsOpen={setShowSuccessModal}
        width="550"
        title="Congratulations!"
        isClosable={false}
        onClose={() => {
          refetch();
        }}>
        <Paragraph
          sm
          css={`
            color: var(--secondary-text-color);
            font-weight: 500;
            margin-bottom: 30px;
          `}>
          Your store has been activated and is ready for the kick-off promotion. Do you want to add another store?
        </Paragraph>
        <BtnHolder>
          <Button
            css="margin: 0 5px;"
            type="light"
            rounded
            lg
            // width="150"
            onClick={() => {
              onClose();
              refetch();
            }}>
            Close
          </Button>
          <Button
            css="margin: 0 5px;"
            type="primary"
            rounded
            lg
            // width="150"
            onClick={() => {
              setShowStoreModal(true);
              onClose();
            }}>
            Add Store
          </Button>
        </BtnHolder>
      </Modal>
    </>
  );
}

export default StoreVerificationModal;
