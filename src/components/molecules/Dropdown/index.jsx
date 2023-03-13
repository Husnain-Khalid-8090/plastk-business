// TODO: fix calender positioning
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import {
  StyledListboxInput,
  ReachListBoxButton,
  StyledListboxPopover,
  StyledListboxList,
  StyledListboxOption,
  Title,
} from './Dropdown.styles';

const propTypes = {
  title: PropTypes.string,
  setValue: PropTypes.func,
  filter: PropTypes.bool,
  // options: PropTypes.object,
  children: PropTypes.node,
  twoBtns: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

function Dropdown({ title, options, setValue, filter, children, value, twoBtns, type = 'light', size, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [selectedValue, setSelectedValue] = useState('');
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isExpanded && ref.current && !ref.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isExpanded]);

  const onOptionClick = e => {
    setValue(e.target.textContent);
  };

  return filter ? (
    <StyledListboxInput ref={ref}>
      <ReachListBoxButton
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        $type={type}
        $size={size}
        className={className}
        $shape="circle">
        {isExpanded ? <i className="icon-close" /> : <i className="icon-calendar" />}
      </ReachListBoxButton>
      {isExpanded && (
        <StyledListboxPopover $calendar portal={false} $twoBtns={twoBtns}>
          {title && <Title>{title}</Title>}
          {children}
          {/* was acting buggy so added hidden list to fix */}
          <StyledListboxList>
            <StyledListboxOption value="1" css="display:none;">
              hidden list
            </StyledListboxOption>
          </StyledListboxList>
        </StyledListboxPopover>
      )}
    </StyledListboxInput>
  ) : (
    <StyledListboxInput ref={ref}>
      <ReachListBoxButton
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        $type={type}
        $size={size}
        $shape="circle">
        {value}
        <i className="icon-filter" />
      </ReachListBoxButton>
      {isExpanded && (
        <StyledListboxPopover portal={false} $twoBtns={twoBtns}>
          {title && <Title sm>{title}</Title>}
          <StyledListboxList>
            {Object.keys(options).map(option => (
              <StyledListboxOption
                key={option}
                onClick={e => {
                  onOptionClick(e);
                }}
                label={options[option]}>
                {options[option]}
              </StyledListboxOption>
            ))}
          </StyledListboxList>
        </StyledListboxPopover>
      )}
    </StyledListboxInput>
  );
}

Dropdown.propTypes = propTypes;

export default Dropdown;
