import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { defaultProps } from '../../shared/defaultProps';

let focusColor = "";
let blurColor = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const VerticalRangeSlider = ({
  initialValue,
  min,
  max,
  decimals,
  step,
  showTicks,
  snap,
  customLabels,
  showLabel,
  prefix,
  suffix,
  labelRotation,
  primaryColorLight,
  primaryColor,
  height,
}) => {
  const rangeEl = useRef(null);
  const outputEl = useRef(null);
  const tickEl = useRef(null);
  const wrapEl = useRef(null);
  const [value, setValue] = useState(min + max);
  const [newValue, setNewValue] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [outputWidth, setOutputWidth] = useState('');
  const [maxLabelLength, setMaxLabelLength] = useState(0);
  const factor = (max - min) / 10;
  focusColor = primaryColor;
  blurColor = primaryColorLight;
  const newPosition = Number(10 - newValue * 0.2);

  useEffect(() => {
    setNewValue(Number(((value - min) * 100) / (max - min)));
    const tickList = tickEl.current.children;
    let labelList = [];
    for (let i = 0; i < tickList.length; i++) {
      labelList.push(tickList[i].firstChild.innerText.length);
    }
    console.log(Math.max(...labelList));
    setMaxLabelLength(Math.max(...labelList));
    setOutputWidth(outputEl.current.clientHeight);
  }, [min, max, value]);

  let markers = [];

  if (customLabels.length !== 0) {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let customTickText = null;
        let tickText = numberWithCommas(i.toFixed(decimals));
        let labelLength = tickText.toString().length;
        customLabels.map(label => {
          if (parseInt(tickText, 10) === parseInt(Object.keys(label), 10)) {
            customTickText = Object.values(label);
          }
          return null;
        });
        if (customTickText !== null) labelLength = customTickText[0].length;
        markers.push(
          <Tick
            key={i}
            length={labelLength}
            showLabel={showLabel}
            labelRotation={parseInt(labelRotation, 10)}
          >
            {showLabel && <div>{customTickText}</div>}
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
            labelRotation={parseInt(labelRotation, 10)}
          >
            {showLabel && <div>{tickText}</div>}
          </Tick>
        );
      }
    }
  }

  const marks = markers.map(marker => marker);

  function handleKeyPress(e) {
    rangeEl.current.focus();

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
  };

  return (
    <RangeWrapWrap
      ref={wrapEl}
      showTicks
      outputWidth={outputWidth}
      maxLabelLength={maxLabelLength}
    >
      <RangeWrap
        heightVal={height}
      >
        <RangeOutput
          ref={outputEl}
          focused={isFocused}
          className="disable-select"
          style={{ left: `${newValue}%` }}>
          <span>{prefix + numberWithCommas(value.toFixed(decimals)) + " " + suffix}</span>
        </RangeOutput>
        <StyledRangeSlider
          tabIndex={0}
          heightVal={300}
          ref={rangeEl}
          min={min}
          max={max}
          step={step}
          value={value > max ? max : value.toFixed(decimals)}
          onClick={() => rangeEl.current.focus()}
          onInput={(e) => { setValue(e.target.valueAsNumber); }}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          focused={isFocused}
          className="disable-select"
        />
        <Progress
          style={{
            background: isFocused ?
              `-webkit-linear-gradient(left, ${focusColor} 0%,${focusColor} calc(${newValue}% + 
              (${newPosition / 10}rem)),${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} 100%)` :
              `-webkit-linear-gradient(left, ${blurColor} 0%,${blurColor} calc(${newValue}% + 
              (${newPosition / 10}rem)),${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} 100%)`
          }}
        />
        <Ticks ref={tickEl}>
          {marks}
        </Ticks>
      </RangeWrap>
    </RangeWrapWrap>
  );
};

export default VerticalRangeSlider;

// PROPTYPES

VerticalRangeSlider.propTypes = {
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
    The invterval between ticks.
  */
  step: PropTypes.number,
  /**
    Show or hide tick  marks.
  */
  showTicks: PropTypes.bool,
  /**
    Snap to ticks or scroll smoothly.
  */
  snap: PropTypes.bool,
  /**
    For creating custom labels. 
  */
  customLabels: PropTypes.arrayOf(PropTypes.object),
  /**
    Show or hide labels.
  */
  showLabel: PropTypes.bool,
  /**
    Optional text displayed before value. 
  */
  prefix: PropTypes.string,
  /**
    Optional text displayed after value.
  */
  suffix: PropTypes.string,
  /**
    The amount in degrees to rotate the labels.
  */
  labelRotation: PropTypes.number,
  /**
    The focus color. 
  */
  primaryColorLight: PropTypes.string,
  /**
    The blur color. 
  */
  primaryColor: PropTypes.string,
  /**
    The width of the range slider.
  */
  height: PropTypes.number,
};

VerticalRangeSlider.defaultProps = {
  initialValue: 50,
  ...defaultProps,
  height: 600,
};


const whiteColor = 'white';
const blackColor = "#999";

const RangeWrapWrap = styled.div`
  text-align: ${p => console.log(p.maxLabelLength, p.outputWidth)};
  width: ${p => p.showTicks ?
    p.maxLabelLength + p.outputWidth + 125 + "px" :
    p.maxLabelLength + 60 + "px"
  };
  border: 1px dotted red;
`;

const RangeWrap = styled.div`
  width: ${p => p.heightVal + "px"};
  margin-left: ${p => (p.showTicks && `${p.maxLabelLength + 1}ch`)};
  transform: rotate(270deg);
  transform-origin: top left;
  margin-top: ${p => p.heightVal + "px"};
  left: 0;
  top: 0;
  font-family: sans-serif;
`;

const RangeOutput = styled.output`
  width: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  margin-top: 3.5rem;
  text-align: center;
  font-size: 1rem;
  user-select: none;
  span{
    writing-mode: vertical-lr;
    border: ${p => p.focused ? `1px solid ${focusColor}` : `1px solid ${blackColor}`};
    border-radius: 5px;
    color: ${p => p.focused ? whiteColor : blackColor};
    background: ${p => p.focused ? focusColor : whiteColor};
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    padding: 0.5rem 0.25rem;
    white-space: nowrap;
  }
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  cursor: pointer;
  appearance: none;
  position: absolute;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  background: transparent;
  margin: 20px 0 0 0;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    cursor: grab;
    pointer-events: all;
    position: relative;
    width: 38px;
    height: 38px;
    border: 1px solid ${blackColor};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
    z-index: 50;
    background: ${p => !p.focused ?
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
  }
  &::-moz-range-thumb {
    cursor: grab;
    pointer-events: all;
    position: relative;
    height: 38px;
    width: 38px;
    border: 1px solid ${blackColor};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    appearance: none;
    z-index: 50;
    background: ${p => !p.focused ?
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
  }
`;

const Progress = styled.div`
  z-index: -1;
  position: absolute;
  display: block;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  top: 21px;
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
  margin-left: 1rem;
  color: ${blackColor};
`;

const Tick = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  width: 1px;
  background: ${blackColor};
  height: 5px;
  cursor: default;
  div {
    white-space: nowrap;
    writing-mode: vertical-rl;
    margin-left: 0.4rem;
    margin-bottom: 0.5rem;
  }
`;