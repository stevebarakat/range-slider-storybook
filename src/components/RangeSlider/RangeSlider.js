import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const RangeSlider = ({
  initialValue,
  min,
  max,
  decimals,
  step,
  showTicks,
  snap,
  customLabels,
  showLabels,
  prefix,
  suffix,
  rotateLabel,
  primaryColorLight,
  primaryColor,
  width
}) => {
  const rangeEl = useRef(null);
  const ticksEl = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [newValue, setNewValue] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const factor = (max - min) / 10;
  const newPosition = 10 - newValue * 0.2;
  focusColor = primaryColor;
  blurColor = primaryColorLight;

  if (!showTicks) step = 0;

  useEffect(() => {
    setNewValue(Number(((value - min) * 100) / (max - min)));
  }, [value, min, max]);

  // Make sure min never exceds max
  if (min > max) {
    min = max;
  }
  // Make sure max is never less than min
  if (max < min) {
    max = min;
  }

  // For collecting tick marks
  let markers = [];

  if (customLabels && customLabels.length !== 0) {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let customTickText = null;
        let tickText = numberWithCommas(i.toFixed(decimals));
        let labelLength = tickText.toString().length;
        customLabels.map(label => {
          if (parseInt(tickText, 10) === parseInt(numberWithCommas(Object.keys(label)), 10)) {
            customTickText = Object.values(label);
          }
          return null;
        });
        if (customTickText !== null) labelLength = customTickText[0].length;
        markers.push(
          <div key={i}>
            <Tick
              key={i}
              length={labelLength}
              showLabels={showLabels}
              rotateLabel={rotateLabel}
              customTickText={customTickText}
              showTicks={showTicks}
            />
            {showLabels && <div>{customTickText}</div>}
          </div>
        );
      }
    }
  } else {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let tickText = prefix + numberWithCommas(i.toFixed(decimals)) + suffix;
        const labelLength = tickText.toString().length;
        console.log(labelLength);
        markers.push(
          <div key={i}>
            <Tick
              key={i}
              length={labelLength}
              showLabels={showLabels}
              rotateLabel={rotateLabel}
              customTickText={tickText}
              showTicks={showTicks}
            />
            {showLabels && <div>{tickText}</div>}
          </div>
        );
      }
    }
  }

  const marks = markers.map(marker => marker);

  function handleKeyPress(e) {
    // Check if modifier key is pressed
    const cmd = e.metaKey;
    const ctrl = e.ctrlKey;

    switch (e.keyCode) {
      case 27: //Esc
        // rangeEl.current.blur();
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
    <Wrapper
      firstLabelLength={showLabels && ticksEl.current?.firstChild?.lastChild.innerText !== null && ticksEl.current?.firstChild?.lastChild.innerText.length}
      lastLabelLength={showLabels && ticksEl.current?.lastChild?.lastChild.innerText !== null && ticksEl.current?.lastChild?.lastChild.innerText.length}
      rotateLabel={rotateLabel}
    >
      <RangeWrap style={{ width: width }}>

        <Progress
          focused={isFocused}
          style={isFocused ?
            {
              background: `-webkit-linear-gradient(left, ${focusColor} 0%, ${focusColor} calc(${newValue}% + ${newPosition * 2}px), hsl(210, 52%, 93%) calc(${newValue}% + ${newPosition * 2}px), hsl(210, 52%, 93%) 100%)`
            } :
            {
              background: `-webkit-linear-gradient(left, ${blurColor} 0%, ${blurColor} calc(${newValue}% + ${newPosition * 2}px), hsl(210, 52%, 93%) calc(${newValue}% + ${newPosition * 2}px), hsl(210, 52%, 93%) 100%)`
            }}
        />

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
          step={snap ? parseInt(step, 10) : parseInt(0, 10)}
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
        <Ticks ref={ticksEl}>{marks}</Ticks>
      </RangeWrap>
    </Wrapper>
  );
};

// PROPTYPES

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
  showLabels: PropTypes.bool,
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
  rotateLabel: PropTypes.bool,
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
  width: PropTypes.number,
};


// DEFAULT PROPS

RangeSlider.defaultProps = {
  initialValue: 50,
  min: 0,
  max: 100,
  decimals: 0,
  step: 5,
  showTicks: true,
  showTooltip: true,
  snap: true,
  customLabels: [
    { 0: "lfgdfdw" },
    { 50: "mehfium" },
    { 100: "hgfddgdfdfgdfgh" }
  ],
  showLabels: true,
  prefix: "",
  suffix: "",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  rotateLabel: false,
  width: 1200
};


// Styles

const whiteColor = "white";
const blackColor = "#999";

const Wrapper = styled.div`
  padding-top: ${p => console.log(p.rotateLabel, p.firstLabelLength, p.lastLabelLength)};
  padding-right: ${p => p.rotateLabel ? p.lastLabelLength / 1.75 + "ch" : p.lastLabelLength / 3.5 + "ch"};
  padding-left: ${p => p.rotateLabel ? p.firstLabelLength / 1.75 - "ch" : p.firstLabelLength / 3.5 + "ch"};
  border: 1px dotted red;
`;

const RangeWrap = styled.div`
  position: relative;
  padding-top: 3.75rem;
  font-family: sans-serif;
  max-width: 100%;
  user-select: none;
  text-align: ${p => console.log(p.length)}
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

const Progress = styled.div`
  position: absolute;
  border-radius: 15px;
  box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.12), inset 2px 2px 2px rgba(0, 0, 0, 0.24);  height: 15px;
  width: 100%;
  z-index: 0;
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  appearance: none;
  position: absolute;
  left: 0;
  cursor: pointer;
  margin: 0;
  width: 100%;
  height: 15px;
  z-index: 2;
  background: transparent;
  &:focus {
    outline: none;
  }
  padding-right: 2rem;

    &::-webkit-slider-thumb {
      position: relative;
      height: 3em;
      width: 3em;
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
      height: 3em;
      width: 3em;
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

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 20px 0px;
`;

const Tick = styled.div`
  position: relative;
  width: ${p => p.customTickText ? p.showLabels ? "1px" : "2px" : "0px"};
  height: 5px;
  background: ${blackColor};
  & + div{
    margin-bottom: ${p => p.rotateLabel && `${p.length / 2}ch`};
    width: 0;
    color: ${blackColor};
    transform-origin: top right;
    margin-top: ${p => p.rotateLabel ? 0 : "5px"};
    margin-left: ${p => !p.rotateLabel ? p.length / 2.5 * -1 + "ch" : "0.5rem"};
    transform: ${p => p.rotateLabel ? "rotate(35deg)" : "rotate(0deg)"};
    white-space: nowrap;
  }
`