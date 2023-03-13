import React from 'react';
import * as htmlToImage from 'html-to-image';
import './prototype.css';

import img from '../../../assets/images/coffe.png';
// eslint-disable-next-line no-unused-vars

function onButtonClick() {
  const node = document.getElementById('my-node');

  htmlToImage
    .toPng(node)
    .then(dataUrl => {
      const imgObj = new Image();
      imgObj.src = dataUrl;
      console.log(imgObj);
      document.getElementById('img-to-display').appendChild(imgObj);
      // document.body.appendChild(img);
    })
    .catch(error => {
      console.error('oops, something went wrong!', error);
    });
}

function Prototype() {
  return (
    <>
      <div
        id="my-node"
        style={{
          height: '150px',
          width: '350px',
          position: 'relative',
          background: '#07232F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
        <div style={{ color: 'white' }} />
        <img className="img-style" style={{ height: '150px', width: '150px' }} src={img} alt="" />
      </div>

      <button type="button" onClick={onButtonClick}>
        Click me
      </button>

      <div id="img-to-display" />
    </>
  );
}

export default Prototype;
