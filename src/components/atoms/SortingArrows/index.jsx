/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import { IconHolder } from './SortingArrows.styles';

const SortingArrows = ({ onClick = () => {}, name, activeKey, setActiveKey, ...rest }) => (
  <IconHolder {...rest}>
    <i
      className={`icon-arrow-up ${activeKey === `${name}-up` && 'active'}`}
      onClick={() => {
        onClick(1);
        setActiveKey(() => `${name}-up`);
      }}
    />
    <i
      className={`icon-arrow-down ${activeKey === `${name}-down` && 'active'}`}
      onClick={() => {
        onClick(-1);
        setActiveKey(() => `${name}-down`);
      }}
    />
  </IconHolder>
);
export default SortingArrows;
