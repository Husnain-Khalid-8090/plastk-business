import React, { useEffect, useState, useRef } from 'react';

import HTMLFlipBook from 'react-pageflip';
import { convertBase64PdfToImages } from '../../../helpers/common';
import Loaders from '../../atoms/Loaders';
import { PdfHolder } from './PdfViewer.styles';
import Button from '../../atoms/Button';

const PdfViewer = ({ url }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [images, setImages] = useState([]);
  const flipBook = useRef(null);
  const nextButtonClick = () => flipBook.current.pageFlip().flipNext();
  const prevButtonClick = () => flipBook.current.pageFlip().flipPrev();
  const onPage = ({ data }) => setPage(data + 1);
  useEffect(() => {
    if (url && flipBook.current) {
      setLoading(true);
      const fetchData = async () => {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          // eslint-disable-next-line no-shadow
          convertBase64PdfToImages(reader.result).then(images => {
            setImages(
              images?.map((x, i) => (
                <div key={i}>
                  <img src={x} alt="store_menu_image" />
                </div>
              )),
            );
            setTotalPage(images.length);
            setLoading(false);
          });
        };
      };
      fetchData();
    }
  }, [url]);
  return (
    <Loaders loading={loading}>
      <PdfHolder>
        <Button
          xs
          type="white"
          onClick={prevButtonClick}
          disabled={page === 1}
          prefix={<i className="icon-arrow-prev" />}>
          Previous
        </Button>
        <HTMLFlipBook
          drawShadow
          width={750}
          height={950}
          minWidth={500}
          maxWidth={1000}
          maxShadowOpacity={0.3}
          mobileScrollSupport
          onFlip={onPage}
          className="demo-book"
          ref={flipBook}>
          {loading ? [<div>Loading PDF...</div>] : images}
        </HTMLFlipBook>
        <Button
          xs
          type="white"
          onClick={nextButtonClick}
          disabled={totalPage === page}
          suffix={<i className="icon-arrow-next" />}>
          Next
        </Button>
        {/* <ButtonHolder>
          [<span>{page}</span> of
          <span>{totalPage}</span>] 
        </ButtonHolder> */}
      </PdfHolder>
    </Loaders>
  );
};
export default PdfViewer;
