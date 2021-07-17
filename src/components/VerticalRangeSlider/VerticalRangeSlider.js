import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";
let labelLength = 0;

function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const VerticalRangeSlider = ({
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
  primaryColorLight,
  primaryColor,
  height,
}) => {
  const rangeEl = useRef(null);
  const outputEl = useRef(null);
  const tickEl = useRef(null);
  const wrapEl = useRef(null);
  const [value, setValue] = useState(initialValue);
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
    const tickList = showTicks && tickEl.current.children;
    let labelList = [];
    for (let i = 0; i < tickList?.length; i++) {
      showTicks && showLabel && labelList.push(tickList[i].firstChild.clientHeight);
    }
    console.log(Math.max(...labelList));
    setMaxLabelLength(Math.max(...labelList));
    setOutputWidth(outputEl.current.clientHeight);
  }, [min, max, value, showLabel, showTicks]);

  let markers = [];

  if (customLabels?.length !== 0) {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let customTickText = null;
        let tickText = numberWithCommas(i.toFixed(decimals));
        labelLength = tickText.toString().length;
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
            showLabel={showLabel}
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
        markers.push(
          Tick && <Tick
            key={i}
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
    <Wrapper maxLabelLength={maxLabelLength}>
      <RangeWrapWrap
        ref={wrapEl}
        outputWidth={outputWidth}
      >
        <RangeWrap
          heightVal={height}
          maxLabelLength={maxLabelLength}
        >
          <RangeOutput
            ref={outputEl}
            focused={isFocused}
            className="disable-select"
            style={{ left: `calc(${newValue}% + (${newPosition / 10}rem))` }}>
            <span>{prefix + numberWithCommas(value?.toFixed(decimals)) + " " + suffix}</span>
          </RangeOutput>
          <StyledRangeSlider
            tabIndex={0}
            heightVal={300}
            ref={rangeEl}
            min={min}
            max={max}
            step={snap ? parseInt(step, 10) : parseInt(0, 10)}
            value={value > max ? max : value?.toFixed(decimals)}
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
          {showTicks && <Ticks ref={tickEl}>{marks}</Ticks>}
        </RangeWrap>
      </RangeWrapWrap>
    </Wrapper>
  );
};

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

// DEFAULT PROPS

VerticalRangeSlider.defaultProps = {
  initialValue: 50,
  min: 0,
  max: 100,
  decimals: 0,
  step: 5,
  showTicks: true,
  snap: true,
  customLabels: [
    { 0: "lfgdfdw" },
    { 50: "mehfium" },
    { 100: "hgfddgdfdfgdfgh" }
  ],
  showLabel: true,
  prefix: "",
  suffix: "",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  rotateLabel: false,
  height: 500,
};


const whiteColor = 'white';
const blackColor = "#999";

const Wrapper = styled.div`
  /* border: 1px dotted red; */
  padding-left: ${p => `${p.maxLabelLength}px`};
`;

const RangeWrapWrap = styled.div`
  width: ${p => p.outputWidth + 60 + "px"};
  height: 0;
  /* background: pink; */
`;

const RangeWrap = styled.div`
  width: ${p => p.heightVal + "px"};
  transform: rotate(270deg);
  transform-origin: top left;
  margin-top: ${p => p.heightVal + "px"};
  left: 0;
  top: 0;
  font-family: sans-serif;
`;

const RangeOutput = styled.output`
  width: 0;
  user-select: none;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  margin-top: 3.75rem;
  margin-left: -1rem;
  span{
    writing-mode: vertical-lr;
    border: ${p => p.focused ? `1px solid ${focusColor}` : `1px solid ${blackColor}`};
    border-radius: 5px;
    color: ${p => p.focused ? whiteColor : blackColor};
    background: ${p => p.focused ? focusColor : whiteColor};
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    padding: 0.5rem;
    white-space: nowrap;
    &::before {
      content: "";
      position: absolute;
      border-top: ${p => p.focused ? `12px solid ${focusColor}` : `0px`};
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      bottom: 100%;
      margin-bottom: -2px;
      margin-left: 1px;
      transform: rotate(180deg);
    }
  }
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  cursor: pointer;
  position: relative;
  appearance: none;
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
    width: 3em;
    height: 3em;
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
    height: 3em;
    width: 3em;
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
  cursor: default;
  display: flex;
  justify-content: space-between;
  margin-right: 1.2rem;
  margin-left: 1.2rem;
  margin-top: -2.2rem;
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
  div {
    writing-mode: vertical-rl;
    margin-left: 1ch;
    margin-bottom: 0.5rem;
    white-space: nowrap;
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