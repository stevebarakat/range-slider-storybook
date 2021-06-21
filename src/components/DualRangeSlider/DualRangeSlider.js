import React, { useState, useRef } from "react";
import styled from 'styled-components';
import Container from '../Container/Container';

let newValue1 = "";
let newValue2 = "";
let newPosition1 = "";
let newPosition2 = "";
let focusColor = "";
let blurColor = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function calcSpace(max, min, height) {
  const diff = min - max;
  const ticks = height / 50;
  return diff / ticks;
};

const DualRangeSlider = ({
  min = 0,
  max = 100,
  decimals = 0,
  step = 0,
  ticks = false,
  tickLabel = false,
  labelRotate = 45,
  primaryColor = "black",
  primaryColorLight,
  width = "250px",
}) => {
  const upperRange = useRef(null);
  const lowerRange = useRef(null);
  const [lowerVal, setLowerVal] = useState(min);
  const [upperVal, setUpperVal] = useState(max);
  const [lowerFocused, setLowerFocused] = useState(false);
  const [upperFocused, setUpperFocused] = useState(false);
  const space = calcSpace(min, max, width);

  focusColor = primaryColor;
  blurColor = primaryColorLight;

  newValue1 = Number(((lowerVal - min) * 100) / (max - min));
  newPosition1 = 10 - newValue1 * 0.2;

  newValue2 = Number(((upperVal - min) * 100) / (max - min));
  newPosition2 = 10 - newValue2 * 0.2;

  let markers = [];

  if (step === "space-evenly") {
    for (let i = min; i <= max; i += space) {
      const labelLength = i.toString().length;
      markers.push(
        <Tick
          key={i}
          length={labelLength}
          tickLabel={tickLabel}
          labelRotate={parseInt(labelRotate, 10)}
        >
          {tickLabel && <div>{numberWithCommas(i.toFixed(2))}</div>}
        </Tick>
      );
    }
  } else {
    for (let i = min; i <= max; i += parseInt(step, 10)) {
      const labelLength = i.toString().length;
      markers.push(
        <Tick
          key={i}
          length={labelLength}
          tickLabel={tickLabel}
          labelRotate={parseInt(labelRotate, 10)}
        >
          {tickLabel && <div>{numberWithCommas(i)}</div>}
        </Tick>
      );
    }
  }
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
    <Container>
      <RangeWrap style={{ width: width }}>
        <div className="multi-range">


          <RangeOutput
            primaryColor={primaryColor}
            focused={lowerFocused}
            style={{ left: `calc(${newValue1}% + (${newPosition1 / 10}rem))` }}>
            <span>{lowerVal ? lowerVal.toFixed(decimals) : 0}</span>
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
            style={lowerFocused ? { pointerEvents: "none" } : { pointerEvents: "all" }}
          />
          <Progress
            focused={lowerFocused || upperFocused}
            id="range-color"
            className="range-color"
          ></Progress>
          <RangeOutput
            primaryColor={primaryColor}
            focused={upperFocused}
            style={{ left: `calc(${newValue2}% + (${newPosition2 / 10}rem))` }}>
            <span>{upperVal ? upperVal.toFixed(decimals) : 0}</span>
          </RangeOutput>
          <StyledRangeSlider
            tabIndex="1"
            ref={upperRange}
            type="range"
            min={min}
            max={max}
            value={upperVal}
            step={step}
            onFocus={() => setUpperFocused(true)}
            onBlur={() => setUpperFocused(false)}
            onInput={e => {
              setUpperVal(parseFloat(e.target.value));
            }}
            focused={upperFocused}
            style={upperFocused ? { pointerEvents: "none" } : { pointerEvents: "all" }}
          />
        </div>
        {ticks && <Ticks>
          {marks}
        </Ticks>}
      </RangeWrap>
    </Container>
  );
};

export default DualRangeSlider;

const blackColor = "#999";
const whiteColor = "white";

const RangeWrap = styled.div`
  position: relative;
  height: 2.2rem;
  margin-top: 4rem;
  font-family: sans-serif;
  max-width: 100%;
  border: 1px dotted red;
  user-select: none;
`;

const RangeOutput = styled.div`
  margin-top: -3.5rem;
  width: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  span{
    border: ${p => p.focused ? `1px solid ${p.primaryColor}` : `1px solid ${blackColor}`};
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
      border-top: ${p => p.focused ? `12px solid ${p.primaryColor}` : `0px`};
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
  margin-right: ${newValue1 - 100 / 2 * -0.02 + "rem"};
  margin-left: ${newValue2 - 100 / 2 * -0.02 + "rem"};
`;
const Tick = styled.div`
  position: relative;
  width: ${p => p.tickLabel ? "1px" : "2px"};
  height: ${p => p.tickLabel ? "5px" : "8px"};
  background: ${blackColor};
  margin-top: 1rem;
  margin-bottom: ${p => (p.length + 2) + "ch"};
  div{
    color: ${blackColor};
    transform-origin: top center;
    margin-top: 0.5rem;
    margin-left: ${p => p.labelRotate < 15 ? p.length / 2 * -1 + "ch" : "0.5rem"};
    transform: ${p => `rotate(${p.labelRotate}deg)`};
  }
`;