import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

let newValue1 = "";
let newValue2 = "";
let focusColor = "";
let blurColor = "";

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
  const [newValue2, setNewValue2] = useState(null);
  const [newValue1, setNewValue1] = useState(null);
  const [upperFocused, setUpperFocused] = useState(false);
  const [lowerFocused, setLowerFocused] = useState(false);
  const newPosition1 = 10 - newValue1 * 0.2;
  const newPosition2 = 10 - newValue2 * 0.2;

  focusColor = primaryColor;
  blurColor = primaryColorLight;

  useEffect(() => {
    setNewValue1(Number(((upperVal - min) * 100) / (max - min)));

    setNewValue2(Number(((lowerVal - min) * 100) / (max - min)));
  }, [newValue1, newValue2, lowerVal, upperVal, min, max]);

  let markers = [];

  if (step > 0) {
    for (let i = min; i <= max; i += parseInt(step, 10)) {
      let customTickText = null;
      let tickText = prefix + numberWithCommas(i.toFixed(decimals)) + suffix;
      let labelLength = tickText.toString().length;
      markers.push(
        <Tick
          key={i}
          length={labelLength}
          tickLabel={tickLabel}
          labelRotate={parseInt(labelRotate, 10)}
        >
          {tickLabel && <div>{prefix + numberWithCommas(i.toFixed(2)) + " " + suffix}</div>}
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
  };

  //If the upper value slider is GREATER THAN the lower value slider.
  if (upperVal > lowerVal) {
    //Set lower slider value to equal the upper value slider.
    setLowerVal(parseFloat(upperVal));
    //If the lower value slider equals its set minimum.
    if (lowerVal === 0) {
      //Set the upper slider value to equal min.
      setUpperVal(min);
    }
  };
  //If the lower value slider is LESS THAN the upper value slider.
  if (lowerVal < upperVal) {
    //Set the upper slider value equal to the lower value slider.
    setUpperVal(parseFloat(lowerVal));
    //If the upper value slider equals its set maximum.
    if (upperVal === max) {
      //Set the lower slider value to equal the upper max.
      setLowerVal(max);
    }
  };

  return (
    <RangeWrap style={{ width: width }}>

      {/* LOWER RANGE */}
      <RangeOutput
        focused={lowerFocused}
        style={{ left: `calc(${newValue2}% + (${newPosition2 * 2}px))` }}>
        <span>{lowerVal ? lowerVal.toFixed(decimals) : 0}</span>
      </RangeOutput>

      <StyledRangeSlider
        tabIndex="0"
        ref={lowerRange}
        min={min}
        max={max}
        value={lowerVal}
        step={step}
        onFocus={() => setLowerFocused(true)}
        onBlur={() => setLowerFocused(false)}
        onInput={e => {
          setLowerVal(parseFloat(e.target.value));
        }}
        focused={lowerFocused}
      />

      <Progress
        style={{
          background: lowerFocused || upperFocused ?
            `-webkit-linear-gradient(left,  ${whiteColor} ${`calc(${newValue2}% + (${newPosition2}px))`},${focusColor} ${`calc(${newValue2}% + 
          (${newPosition2}px))`},${focusColor} ${`calc(${newValue1}% + (${newPosition1}px))`},${whiteColor} ${`calc(${newValue1}% + (${newPosition1}px))`})` :
            `-webkit-linear-gradient(left,  ${whiteColor} ${`calc(${newValue2}% + (${newPosition2}px))`},${blurColor} ${`calc(${newValue2}% + 
          (${newPosition2}px))`},${blurColor} ${`calc(${newValue1}% + (${newPosition1}px))`},${whiteColor} ${`calc(${newValue1}% + (${newPosition1}px))`})`
        }}
      />

      {/* UPPER RANGE */}
      <RangeOutput
        focused={upperFocused}
        style={{ left: `calc(${newValue1}% + (${newPosition1 * 2}px))` }}>
        <span>{upperVal ? upperVal.toFixed(decimals) : 0}</span>
      </RangeOutput>

      <StyledRangeSlider
        tabIndex="0"
        ref={upperRange}
        min={min}
        max={max}
        value={upperVal}
        step={step}
        onKeyDown={handleKeyPress}
        onFocus={() => setUpperFocused(true)}
        onBlur={() => setUpperFocused(false)}
        onInput={e => {
          setUpperVal(e.target.valueAsNumber);
        }}
        focused={upperFocused}
      />
      {ticks && <Ticks>
        {marks}
      </Ticks>}
    </RangeWrap>
  );
};

export default DualRangeSlider;



// Proptypes

DualRangeSlider.propTypes = {
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

DualRangeSlider.defaultProps = {
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

const blackColor = "#999";
const whiteColor = "white";

const RangeWrap = styled.div`
  /* border: 1px dotted red; */
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
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  background: transparent;
  z-index: 2;
    &:focus {
      outline: none;
    }

  &::-webkit-slider-thumb {
    pointer-events: all;
    position: relative;
    height: 38px;
    width: 38px;
    border: 1px solid ${blackColor};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25); 
    cursor: pointer;
    -webkit-appearance: none;
    z-index: 999;
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
    height: 38px;
    width: 38px;
    border: 1px solid ${blackColor};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    cursor: pointer;
    z-index: 999;
    appearance: none;
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
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25), inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
  border-radius: 15px;
  width: 100%;
  height: 15px;
  transition: width 0.15s ease-out;
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem; 
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
    white-space: nowrap;
  }
`;


