import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

let newValue1 = "";
let newValue2 = "";
let newPosition1 = "";
let newPosition2 = "";
let focusColor = "";
let blurColor = "";
let selectedValue = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const DualRangeSlider = ({
  initialValue,
  min,
  max,
  decimals,
  step,
  ticks,
  snap,
  tickLabels,
  tickLabel,
  prefix,
  suffix,
  labelRotate,
  primaryColorLight,
  primaryColor,
  width,
}) => {
  const upperRange = useRef(null);
  const lowerRange = useRef(null);
  const [lowerVal, setLowerVal] = useState(min);
  const [upperVal, setUpperVal] = useState(max);
  const [lowerFocused, setLowerFocused] = useState(false);
  const [upperFocused, setUpperFocused] = useState(false);

  focusColor = primaryColor;
  blurColor = primaryColorLight;
  newValue1 = Number(
    ((lowerVal - min) * 100) /
    (max - min)
  );
  newPosition1 = 10 - newValue1 * 0.2;

  newValue2 = Number(
    ((upperVal - min) * 100) /
    (max - min)
  );
  newPosition2 = 10 - newValue2 * 0.2;

  let markers = [];

  if (tickLabels.length !== 0) {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let customTickText = null;
        let tickText = prefix + numberWithCommas(i.toFixed(decimals)) + suffix;
        let labelLength = tickText.toString().length;
        tickLabels.map(label => {
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
  };

  const marks = markers.map(marker => marker);

  function handleKeyPress(e) {
    lowerRange.current.focus();
    upperRange.current.focus();

    switch (e.keyCode) {
      case 27: //Esc
        upperRange.current.blur();
        lowerRange.current.blur();
        return;
      default:
        return;
    }
  }

  //If the upper value slider is LESS THAN the lower value slider.
  if (upperVal > lowerVal) {
    //The lower slider value is set to equal the upper value slider.
    setLowerVal(parseFloat(upperVal));
    //If the lower value slider equals its set minimum.
    if (lowerVal === 0) {
      //Set the upper slider value to equal min.
      setUpperVal(min);
    }
  }
  //If the lower value slider is GREATER THAN the upper value slider minus one.
  if (lowerVal < upperVal - 1) {
    //The upper slider value is set to equal the lower value slider plus one.
    setUpperVal(parseFloat(lowerVal));
    //If the upper value slider equals its set maximum.
    if (upperVal === max) {
      //Set the lower slider value to equal the upper value slider's maximum value minus one.
      setLowerVal(parseFloat(max));
    }
  }

  return (
    <RangeWrap style={{ width: width }}>

      {/* LOWER RANGE */}
      <>
        <RangeOutput
          focused={lowerFocused}
          style={{ left: `calc(${newValue1}% + (${newPosition1 / 10}rem))` }}
          className="range-value"
        >
          {lowerVal ? lowerVal.toFixed(decimals) : 0}
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="2"
          ref={lowerRange}
          type="range"
          min={min}
          max={max}
          value={lowerVal}
          step={step}
          onKeyDown={handleKeyPress}
          onFocus={() => setLowerFocused(true)}
          onBlur={() => setLowerFocused(false)}
          onInput={e => {
            setLowerVal(e.target.valueAsNumber);
          }}
          focused={lowerFocused}
        // style={lowerFocused ? { pointerEvents: "none" } : { pointerEvents: "all" }}
        />
        <Progress
          focused={lowerFocused || upperFocused}
          id="range-color"
          className="range-color"
        ></Progress>

        {/* UPPER RANGE */}
        <RangeOutput
          focused={upperFocused}
          style={{ left: `calc(${newValue2}% + (${newPosition2 / 10}rem))` }}
          className="range-value"
        >
          {upperVal ? upperVal.toFixed(decimals) : 0}
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="1"
          ref={upperRange}
          type="range"
          min={min}
          max={max}
          value={upperVal}
          step={step}
          onKeyDown={handleKeyPress}
          onFocus={() => setUpperFocused(true)}
          onBlur={() => setUpperFocused(false)}
          onInput={e => {
            setUpperVal(parseFloat(e.target.value));
          }}
          focused={upperFocused}
        // style={upperFocused ? { pointerEvents: "none" } : { pointerEvents: "all" }}
        />
      </>
      <Ticks>
        {marks}
      </Ticks>
    </RangeWrap>
  );
};

export default DualRangeSlider;

const blackColor = "#999";
const whiteColor = "white";

const RangeWrap = styled.div`
  border: 1px dotted red;
  position: relative;
  height: 7.5rem;
  padding-top: 3.75rem;
  font-family: sans-serif;
  max-width: 100%;
  user-select: none;
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  appearance: none;
  position: absolute;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  background: transparent;
  margin: 0;
      &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    pointer-events: all;
    position: relative;
    height: 2.15rem;
    width: 2.15rem;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    z-index: 999;
    background-color: white;
    background: ${p => !p.focused ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
  }

  &:focus::-webkit-slider-thumb {
    background: ${p => !p.focused ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
    transition: all 0.15s ease-out;
  }
  
  &::-moz-range-thumb {
    pointer-events: all;
    position: relative;
    height: 2.15rem;
    width: 2.15rem;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    z-index: 999;
    background: ${p => !p.focused ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`}};

  &:focus::-moz-range-thumb {
    background: ${p => !p.focused ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
    transition: all 0.15s ease-out;
  }
`;

const RangeOutput = styled.div`
  position: absolute;
  margin-top: -3.75rem;
  left: 50%;
  border: ${p => p.focused ? "none" : `1px solid ${blackColor}`};
  background: ${p => p.focused ? focusColor : whiteColor};
  color: ${p => p.focused ? whiteColor : blackColor};
  text-align: center;
  padding: 0.5rem;
  font-size: 1rem;
  display: block;
  transform: translate(-50%, 0);
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
  transition: all 0.15s ease-out;
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
`;

const Progress = styled.div`
  z-index: 0;
  position: absolute;
  background: ${p => p.focused ?
    `-webkit-linear-gradient(left,  ${whiteColor} ${`calc(${newValue2}% + (${newPosition2}px))`},${focusColor} ${`calc(${newValue2}% + 
  (${newPosition2}px))`},${focusColor} ${`calc(${newValue1}% + (${newPosition1}px))`},${whiteColor} ${`calc(${newValue1}% + (${newPosition1}px))`})` :
    `-webkit-linear-gradient(left,  ${whiteColor} ${`calc(${newValue2}% + (${newPosition2}px))`},${blurColor} ${`calc(${newValue2}% + 
    (${newPosition2}px))`},${blurColor} ${`calc(${newValue1}% + (${newPosition1}px))`},${whiteColor} ${`calc(${newValue1}% + (${newPosition1}px))`})`
  };
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25), inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
  border-radius: 15px;
  width: 100%;
  height: 15px;
  transition: width 0.15s ease-out;
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: ${1.25 + "rem"};
  margin-left: ${1.25 + "rem"};
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