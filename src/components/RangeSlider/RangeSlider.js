import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function calcSpace(max, min, height) {
  const diff = min - max;
  const ticks = height / 50;
  return diff / ticks;
};

let focusColor = "";
let blurColor = "";
let newValue = "";
let selectedValue = "";

const RangeSlider = ({
  min = 0,
  max = 100,
  decimals = 0,
  step = 0,
  ticks = false,
  tickLabel = false,
  labelRotate = 45,
  primaryColorLight,
  primaryColor = "black",
  width = "250",
}) => {
  const rangeEl = useRef(null);
  const [value, setValue] = useState((min + max) / 2);
  const [isFocused, setIsFocused] = useState(false);
  const factor = (max - min) / 10;
  const newPosition = 10 - newValue * 0.2;
  const space = calcSpace(min, max, width);
  let markers = [];
  newValue = Number(((value - min) * 100) / (max - min));
  focusColor = primaryColor;
  blurColor = primaryColorLight;

  useEffect(() => {
    rangeEl.current.focus();
    if (value > max) {
      setValue(max);
    } else {
      setValue(rangeEl.current.valueAsNumber);
    }
  }, [value, max]);


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
    rangeEl.current.focus();
    console.log(e);
    // Check if modifier key is pressed
    const cmd = e.metaKey;
    const ctrl = e.ctrlKey;

    switch (e.keyCode) {
      case 13: //Enter
      case 32: //Space
        selectedValue = value;
        console.log(selectedValue);
        return;
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
        style={{ left: `calc(${newValue}% + (${newPosition / 9.5}rem))` }}>
        <span>{numberWithCommas(value.toFixed(decimals))}</span>
      </RangeOutput>
      <StyledRangeSlider
        tabIndex="0"
        list="tickmamrks"
        ref={rangeEl}
        min={min}
        max={max}
        step={step}
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
      {ticks && <Ticks>{marks}</Ticks>}
      <Progress
        focused={isFocused}
        style={isFocused ?
          {
            background: `-webkit-linear-gradient(left, ${focusColor} 0%, ${focusColor} calc(${newValue}% + 
          (${newPosition / 10}rem)), ${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)), ${whiteColor} 100%)`
          } :
          {
            background: `-webkit-linear-gradient(left, ${blurColor} 0%, ${blurColor} calc(${newValue}% + 
          (${newPosition / 10}rem)), ${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)), ${whiteColor} 100%)`
          }}
      />
    </RangeWrap>
  );
};

export default RangeSlider;

const whiteColor = "white";
const blackColor = "#999";

const RangeWrap = styled.div`
  border: 1px dotted red;
  position: relative;
  height: 7.5rem;
  padding-top: 2.5rem;
  font-family: sans-serif;
  max-width: 100%;
  user-select: none;
`;

const RangeOutput = styled.output`
  margin-top: -2.5rem;
  width: 0%;
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
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
  margin: 20px 0 0 0;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  border: 0;
  position: relative;
  z-index: 2;
  background: transparent;
  &:focus {
    outline: none;
  }

    &::-webkit-slider-thumb {
      position: relative;
      height: 2.15rem;
      width: 2.15rem;
      border: 1px solid ${blackColor};
      border-radius: 50%;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
      cursor: grab;
      pointer-events: all;
      -webkit-appearance: none;
      z-index: 50;
      background: ${p => !p.focused ?
    `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
    `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`
  };
  }
    &::-moz-range-thumb {
      position: relative;
      height: 2.15rem;
      width: 2.15rem;
      border: 1px solid ${blackColor};
      border-radius: 50%;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
      cursor: grab;
      pointer-events: all;
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
  margin-top: -84px;
  cursor: pointer;
  /* transition: width 0.15s; */
  z-index: 0;
`;
const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: ${newValue - 100 / 2 * -0.02 + "rem"};
  margin-left: ${newValue - 100 / 2 * -0.02 + "rem"};
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