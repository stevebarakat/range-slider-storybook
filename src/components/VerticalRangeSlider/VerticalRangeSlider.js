import React, { useState, useLayoutEffect, useRef } from "react";
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";
let newValue = "";
let newPosition = "";
let marks = [];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function calcSpace(max, min, height) {
  const diff = min - max;
  const ticks = height / 50;
  return diff / ticks;
};

const VerticalRangeSlider = ({ min = 0, max = 100, decimals = 0, step = 0, tickLabel = false, ticks,
  height = "250", prefix = "", suffix = "", primaryColor = "black", primaryColorLight }) => {
  const rangeEl = useRef(null);
  const outputEl = useRef(null);
  const tickEl = useRef(null);
  const wrapEl = useRef(null);
  const [value, setValue] = useState(min + max);
  const [isFocused, setIsFocused] = useState(false);
  const [outputWidth, setOutputWidth] = useState('');
  const [tickWidth, setTickWidth] = useState('');
  const factor = (max - min) / 10;
  focusColor = primaryColor;
  blurColor = primaryColorLight;
  newValue = Number((value - min) * 100) / (max - min);
  newPosition = Number(10 - newValue * 0.2);

  useLayoutEffect(() => {
    rangeEl.current.focus();
    setTickWidth(tickEl.current.clientHeight);
    setOutputWidth(outputEl.current.clientHeight);
    setTimeout(() => setValue((max + min) / 2));
  }, [min, max]);

  const space = calcSpace(min, max, height);

  if (ticks) {
    let markers = [];
    for (let i = min; i <= max; i += step) {
      const labelLength = i.toString().length;
      markers.push(
        <Tick
          length={labelLength}
          key={i}
        >
          <div ref={tickEl} >
            {tickLabel && prefix + numberWithCommas(i.toFixed(decimals)) + " " + suffix}
          </div>
        </Tick>
      );
    }
    marks = markers.map((marker) => marker);
  }


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
      ticks
      tickWidth={tickWidth}
      outputWidth={outputWidth}
    >
      <RangeWrap
        heightVal={height}
        tickWidth={tickWidth}
      >
        <RangeOutput
          ref={outputEl}
          focused={isFocused}
          className="disable-select"
          style={{ left: `calc(${newValue}% + (${newPosition / 10}rem))` }}
        >
          <span>{prefix + numberWithCommas(value.toFixed(decimals)) + " " + suffix}</span>
        </RangeOutput>
        <StyledRangeSlider
          tabIndex={0}
          heightVal={300}
          list="tickmamrks"
          ref={rangeEl}
          min={min}
          max={max}
          step={space}
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
        <Ticks>
          {marks}
        </Ticks>
      </RangeWrap>
    </RangeWrapWrap>
  );
};

export default VerticalRangeSlider;


const whiteColor = 'white';
const blackColor = "#999";

const RangeWrapWrap = styled.div`
  width: ${p => p.ticks ?
    p.outputWidth + p.tickWidth + 65 + "px" :
    p.outputWidth + 60 + "px"
  };
  border: 1px dotted red;
`;

const RangeWrap = styled.div`
  width: ${p => p.heightVal + "px"};
  margin-left: ${p => (p.tickWidth) + "px"};
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
    width: 2.15rem;
    height: 2.15rem;
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
    height: 2.15rem;
    width: 2.15rem;
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