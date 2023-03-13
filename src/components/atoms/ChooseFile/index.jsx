import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { compressImage, convertPdfBase64, getFileNameFromURL } from '../../../helpers/common';
import Toast from '../../molecules/Toast';
// import Button from '../Button';
import { UploadFile, InputFile, LabelText } from './ChooseFile.style';

function ChooseFile({
  onChange,
  uploadImg,
  value,
  name,
  image,
  pdf,
  showDel,
  label,
  fileReqText,
  columnBlock,
  ...props
}) {
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
    <UploadFile columnBlock={columnBlock}>
      {!value && (
        <span>
          <InputFile uploadImg={uploadImg}>
            <LabelText>
              <span className="material-icons-outlined">file_upload</span> {label}
            </LabelText>
            <input
              {...props}
              onChange={onChangeFile}
              type="file"
              accept="application/pdf, image/gif, image/jpeg, image/png, font/ttf"
            />
          </InputFile>
        </span>
      )}

      {/* {value && image && !value?.includes('pdf') && (
        <img
          src={value}
          alt="images"
          style={{
            height: '40px',
          }}
        />
      )} */}
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
          {fileName === '' ? getFileNameFromURL(value) : fileName}
        </span>
      )}
      {!value && (
        <span
          css={`
            font-size: 12px;
            margin: 5px;
          `}>
          {fileReqText}
        </span>
      )}
      {value && showDel && (
        <button
          className="btn-remove"
          type="button"
          onClick={() => {
            onChange({ target: { name, value: '', time: new Date().getTime() } });
            onChangeFile();
            setForceChange(prev => !prev);
          }}>
          Remove
        </button>
      )}
    </UploadFile>
  );
}

export default ChooseFile;
