import React from 'react';

// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { I, IconHolder } from './Icon.styles';
import Tooltip from '../Tooltip';

export default function Icon(props) {
  const { css } = props;
  if (props.showTooltip) {
    return (
      <Tooltip title={props.toolTipContent} css={css}>
        <IconHolder css={css}>
          <I {...props} />
        </IconHolder>
      </Tooltip>
    );
  }
  return (
    <IconHolder css={css}>
      <I {...props} />
    </IconHolder>
  );
}
Icon.propTypes = {
  css: PropTypes.string,
  size: PropTypes.string,
  showTooltip: PropTypes.bool,
  toolTipContent: PropTypes.string,
  className: PropTypes.string,
};
Icon.defaultProps = {
  size: '1.5rem',
  className: 'icon-check-circle',
};
Icon.displayName = 'Icon';
