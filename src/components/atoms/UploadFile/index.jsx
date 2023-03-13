import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { compressImage, convertPdfBase64 } from '../../../helpers/common';
import Toast from '../../molecules/Toast';
import Button from '../Button';
import { InputFile, LabelText } from './UploadFile.styles';

function UploadFile({ onChange, uploadImg, value, name, image, pdf, showDel, ...props }) {
  const [fileName, setFilename] = useState('');
  const [forceChange, setForceChange] = useState(false);
  // const [name, setName] = useState('');
  const onChangeFile = React.useCallback(
    _ => {
      const file = _?.target?.files[0];
      // setName(_.target.name)
      if (file) {
        if (pdf) {
          if (!/[/.](gif|jpg|jpeg|tiff|png|pdf)$/i.test(file?.name) && pdf && image) {
            Toast({ type: 'error', message: 'Only images and pdf are allowed' });
            onChange({ target: { name: _.target.name, value: '' } });
          } else if (file?.type === 'application/pdf') {
            convertPdfBase64(file)
              .then(res => {
                setFilename(file?.name);
                onChange({ target: { name: _.target.name, value: res } });
              })
              .catch(() => {
                onChange({ target: { name: _.target.name, value: '' } });
              });
          } else {
            compressImage(file)
              .then(res => {
                setFilename(file?.name);
                onChange({ target: { name: _.target.name, value: res } });
              })
              .catch(() => {
                onChange({ target: { name: _.target.name, value: '' } });
              });
          }
        } else if (!/[/.](gif|jpg|jpeg|tiff|png)$/i.test(file?.name) && image) {
          Toast({ type: 'error', message: 'Only images are allowed' });
          onChange({ target: { name: _.target.name, value: '' } });
        } else if (file?.name) {
          compressImage(file)
            .then(res => {
              setFilename(file?.name);
              onChange({ target: { name: file?.name, value: res, type: file?.type } });
            })
            .catch(() => {
              onChange({ target: { name: file?.name, value: '' } });
            });
        } else if (!image) {
          onChange({ target: { name: _.target.name, value: file, type: file?.type } });
        } else {
          onChange({ target: { name: _.target.name, value: '' } });
        }
      } else {
        onChange({ target: { name, value: '' } });
      }
    },

    [onChange, forceChange],
  );
  return (
    <span
      css={`
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}>
      <span
        css={`
          height: '40px';
        `}>
        <InputFile uploadImg={uploadImg}>
          <LabelText>{value ? 'Change File' : 'Upload Image'}</LabelText>
          <input
            {...props}
            onChange={onChangeFile}
            type="file"
            accept="application/pdf, image/gif, image/jpeg, image/png, font/ttf"
          />
        </InputFile>
      </span>

      {value && image && !value?.includes('pdf') && (
        <img
          src={value}
          alt="images"
          style={{
            height: '40px',
          }}
        />
      )}
      {value && !image && <span>{value?.name}</span>}
      {value && !value?.includes('image') && value?.includes('application/pdf') && (
        <span className="material-icons-outlined">picture_as_pdf</span>
      )}
      {value && (
        <span
          css={`
            font-size: 12px;
            margin: 5px;
          `}>
          {fileName}
        </span>
      )}
      {value && showDel && (
        <Button
          type="danger"
          shape="circle"
          size={35}
          onClick={() => {
            onChange({ target: { name, value: '', time: new Date().getTime() } });
            onChangeFile();
            setForceChange(prev => !prev);
          }}>
          <span className="material-icons-outlined">delete</span>
        </Button>
      )}
    </span>
  );
}

export default UploadFile;
