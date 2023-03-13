// TODO: change Carousel to swiper slider and remove react-swipeable
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';

import { useSwipeable } from 'react-swipeable';
import { StyleCarousel, Inner, StyleIndicators } from './Carousel.styles';

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = newIndex => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <StyleCarousel {...handlers} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Inner style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, child => React.cloneElement(child, { width: '100%' }))}
      </Inner>
      <StyleIndicators>
        {React.Children.map(children, (child, index) => (
          <button
            type="button"
            className={`${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              updateIndex(index);
            }}>
            {index + 1}
          </button>
        ))}
      </StyleIndicators>
    </StyleCarousel>
  );
};

export default Carousel;
