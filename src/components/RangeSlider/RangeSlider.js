import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";
let newValue = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const RangeSlider = ({
  initialValue = 50,
  min = 0,
  max = 100,
  decimals = 0,
  step = 0,
  ticks = false,
  tickLabels = [],
  tickLabel = false,
  prefix = null,
  suffix = null,
  labelRotate = 45,
  primaryColorLight = "grey",
  primaryColor = "black",
  width = 250,
}) => {
  const rangeEl = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const factor = (max - min) / 10;
  const newPosition = 10 - newValue * 0.2;
  newValue = Number(((value - min) * 100) / (max - min));
  focusColor = primaryColor;
  blurColor = primaryColorLight;


  let markers = [];

  if (tickLabels.length !== 0) {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let customTickText = null;
        let tickText = prefix + numberWithCommas(i.toFixed(decimals)) + suffix;
        let labelLength = tickText.toString().length;
        console.log(labelLength);
        tickLabels.map(label => {
          if (parseInt(tickText, 10) === parseInt(Object.keys(label), 10)) {
            customTickText = Object.values(label);
          }
          return null;
        })
        if(customTickText !== null) labelLength = customTickText[0].length
        markers.push(
          <Tick
            key={i}
            length={labelLength}
            tickLabel={tickLabel}
            labelRotate={parseInt(labelRotate, 10)}
          >
            {tickLabel && <div>{customTickText}</div>}
          </Tick>
        );
      }
    }
  } else {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let tickText = prefix + numberWithCommas(i.toFixed(decimals)) + suffix;
        const labelLength = tickText.toString().length;
        markers.push(
          Tick && <Tick
            key={i}
            length={labelLength}
            labelRotate={parseInt(labelRotate, 10)}
          >
            {tickLabel && <div>{tickText}</div>}
          </Tick>
        );
      }
    }
  }

  const marks = markers.map(marker => marker);

  function handleKeyPress(e) {
    rangeEl.current.focus();
    console.log(e);
    // Check if modifier key is pressed
    const cmd = e.metaKey;
    const ctrl = e.ctrlKey;

    switch (e.keyCode) {
      case 27: //Esc
        rangeEl.current.blur();
        return;
      case 37: //Left
        (cmd || ctrl) && setValue(value - factor);
        return;
      case 40: //Down
        (cmd || ctrl) && setValue(value - factor);
        return;
      case 38: //Up
        (cmd || ctrl) && setValue(value >= max ? max : value + factor);
        return;
      case 39: //Right
        (cmd || ctrl) && setValue(value >= max ? max : value + factor);
        return;
      default:
        return;
    }
  }
  return (
    <RangeWrap style={{ width: width + "px" }}>
      <RangeOutput
        focused={isFocused}
        style={{ left: `calc(${newValue}% + ${newPosition * 2}px)` }}>
        <span>{prefix + numberWithCommas(value.toFixed(decimals)) + suffix}</span>
      </RangeOutput>
      <StyledRangeSlider
        tabIndex="0"
        ref={rangeEl}
        min={min}
        max={max}
        step={parseInt(step, 10)}
        value={value > max ? max : value.toFixed(decimals)}
        onInput={(e) => {
          rangeEl.current.focus();
          setValue(e.target.valueAsNumber);
        }}
        onKeyDown={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        focused={isFocused}
      />
      <Progress
        focused={isFocused}
        style={isFocused ?
          {
            background: `-webkit-linear-gradient(left, ${focusColor} 0%, ${focusColor} calc(${newValue}% + 
          (${newPosition / 100}px)), ${whiteColor} calc(${newValue}% + (${newPosition / 100}px)), ${whiteColor} 100%)`
          } :
          {
            background: `-webkit-linear-gradient(left, ${blurColor} 0%, ${blurColor} calc(${newValue}% + 
          (${newPosition / 100}px)), ${whiteColor} calc(${newValue}% + (${newPosition / 100}px)), ${whiteColor} 100%)`
          }}
      />
      {console.log(marks)}
      {ticks ? <Ticks>{marks}</Ticks> : marks}
    </RangeWrap>
  );
};

export default RangeSlider;





// Proptypes

RangeSlider.propTypes = {
  /**
    The initial value.
  */
  initialValue: PropTypes.number.isRequired,
  /**
    The minimum value.
  */
  min: PropTypes.number.isRequired,
  /**
  The maximum value. 
*/
  max: PropTypes.number.isRequired,
  /**
  The amount of decimal points to be rounded to. 
*/
  decimals: PropTypes.number,
  /**
*/
  step: PropTypes.number,
  /**
  description 
*/
  ticks: PropTypes.bool,
  /**
  description 
*/
  tickLabels: PropTypes.arrayOf(PropTypes.object),
  /**
description 
*/
  tickLabel: PropTypes.bool,
  /**
  description 
*/
  prefix: PropTypes.string,
  /**
  description 
*/
  suffix: PropTypes.string,
  /**
  description 
*/
  labelRotate: PropTypes.number,
  /**
  description 
*/
  primaryColorLight: PropTypes.string,
  /**
  description 
*/
  primaryColor: PropTypes.string,
  /**
  description 
*/
  width: PropTypes.number,
  /**
  description 
*/
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  decimals: 0,
  step: 0,
  ticks: false,
  tickLabel: false,
  prefix: "",
  suffix: "",
  labelRotate: 45,
  primaryColorLight: "grey",
  primaryColor: "black",
  width: "250",
};

// Styles

const whiteColor = "white";
const blackColor = "#999";

const RangeWrap = styled.div`
  border: 1px dotted red;
  position: relative;
  height: 7.5rem;
  padding-top: 3.75rem;
  font-family: sans-serif;
  max-width: 100%;
  user-select: none;
`;

const RangeOutput = styled.output`
  margin-top: -3.75rem;
  width: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  white-space: nowrap;
  span{
    border: ${p => p.focused ? `1px solid ${focusColor}` : `1px solid ${blackColor}`};
    border-radius: 5px;
    color: ${p => p.focused ? whiteColor : blackColor};
    background: ${p => p.focused ? focusColor : whiteColor};
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    padding: 0.5rem 0.75rem;
    &::before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-top: ${p => p.focused ? `12px solid ${focusColor}` : `0px`};
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      top: 100%;
      left: 50%;
      margin-left: -6px;
      margin-top: -1px;
    }
  }
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  appearance: none;
  cursor: pointer;
  margin: 0;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  border: 0;
  position: absolute;
  z-index: 2;
  background: transparent;
  &:focus {
    outline: none;
  }

    &::-webkit-slider-thumb {
      position: relative;
      height: 38px;
      width: 38px;
      border: 1px solid ${blackColor};
      border-radius: 50%;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
      cursor: grab;
      -webkit-appearance: none;
      z-index: 50;
      background: ${p => !p.focused ?
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`
  };
  }
    &::-moz-range-thumb {
      position: relative;
      height: 38px;
      width: 38px;
      border: 1px solid ${blackColor};
      border-radius: 50%;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
      cursor: grab;
      appearance: none;
      margin-top: -10px;
      z-index: 50;
      background: ${p => !p.focused ?
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`
  };
  }
`;

const Progress = styled.div`
  position: absolute;
  background: ${p => p.focused ? focusColor : blurColor};
  /* border: solid 1px ${blackColor}; */
  border-radius: 15px;
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
  height: 15px;
  width: 100%;
  cursor: pointer;
  z-index: 0;
`;
const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: ${newValue - 100 / 2 * -0.022 + "rem"};
  margin-left: ${newValue - 100 / 2 * -0.022 + "rem"};
  margin-top: 1rem;
`;
const Tick = styled.div`
  position: relative;
  width: 1px;
  height: 5px;
  background: ${blackColor};
  margin-top: 1rem;
  margin-bottom: ${p => (p.length) + "ch"};
    div{
      width: 0;
      color: ${blackColor};
      transform-origin: top center;
      margin-top: 0.5rem;
      margin-left: ${p => p.labelRotate < 15 ? p.length / 2 * -1 + "ch" : "0.5rem"};
      transform: ${p => `rotate(${p.labelRotate}deg)`};
      white-space: nowrap;
    }
`;
