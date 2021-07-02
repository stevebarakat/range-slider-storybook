import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

let newValue1 = "";
let newValue2 = "";
let newPosition1 = "";
let newPosition2 = "";
let focusColor = "";
let blurColor = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ClampSlider = ({
  initialLowerValue,
  initialUpperValue,
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
  width,
}) => {
  const lowerRange = useRef(null);
  const upperRange = useRef(null);
  const [lowerVal, setLowerVal] = useState(initialLowerValue);
  const [upperVal, setUpperVal] = useState(initialUpperValue);
  const [lowerFocused, setLowerFocused] = useState(false);
  const [upperFocused, setUpperFocused] = useState(false);
  const [newLowerVal, setNewLowerVal] = useState(null);
  const [newUpperVal, setNewUpperVal] = useState(null);

  focusColor = primaryColor;
  blurColor = primaryColorLight;

  useEffect(() => {
    setNewLowerVal(Number(((lowerVal - min) * 100) / (max - min)));
    setNewUpperVal(Number(((upperVal - min) * 100) / (max - min)));
  }, [lowerVal, upperVal, min, max]);

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
  };

  const marks = markers.map(marker => marker);

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
    <>
    <h4>Clampslider</h4>
    <RangeWrap style={{ width: width }}>
        <Progress
          focused={lowerFocused || upperFocused}
          id="range-color"
          className="range-color"
        ></Progress>

      {/* LOWER RANGE */}
      <>
        <RangeOutput
          focused={lowerFocused}
          style={{ left: `calc(${newLowerVal}% + ${newPosition1 * 2}px)` }}
          className="range-value"
        >
          <span>{lowerVal ? lowerVal.toFixed(decimals) : 0}</span>
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="2"
          ref={lowerRange}
          type="range"
          min={min}
          max={max}
          value={lowerVal}
          step={snap ? parseInt(step, 10) : parseInt(0, 10)}
          onFocus={() => setLowerFocused(true)}
          onBlur={() => setLowerFocused(false)}
          onInput={e => {
            setLowerVal(e.target.valueAsNumber);
          }}
          focused={lowerFocused}
        // style={lowerFocused ? { pointerEvents: "none" } : { pointerEvents: "all" }}
        />

        {/* UPPER RANGE */}
        <RangeOutput
          focused={upperFocused}
          style={{ left: `calc(${newUpperVal}% + ${newPosition2 * 2}px)` }}
          className="range-value"
        >
          <span>{upperVal ? upperVal.toFixed(decimals) : 0}</span>
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="1"
          ref={upperRange}
          type="range"
          min={min}
          max={max}
          value={upperVal}
          step={snap ? parseInt(step, 10) : parseInt(0, 10)}
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
    </>
  );
};

export default ClampSlider;

// PROPTYPES

ClampSlider.propTypes = {
  /**
    The initial lower value.
  */
  initialLowerValue: PropTypes.number.isRequired,
  /**
    The initial upper value.
  */
  initialUpperValue: PropTypes.number.isRequired,
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
    For making custom labels. 
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
  width: PropTypes.number,
};

// STYLES
const blackColor = "#999";
const whiteColor = "white";

const RangeWrap = styled.div`
  border: 1px dotted red;
  position: relative;
  padding-top: 3.75rem;
  font-family: sans-serif;
  max-width: 100%;
  user-select: none;
`;



const RangeOutput = styled.output`
  margin-top: -4.75rem;
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
    height: 3em;
    width: 3em;
    border: 1px solid ${blackColor};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    cursor: grab;
    -webkit-appearance: none;
    z-index: 50;
    margin-top: -2.5em;

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
    margin-top: -2.5em;
    z-index: 50;
    background: ${p => !p.focused ?
  `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)` :
  `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`
  };
}
`;

const Progress = styled.div`
  z-index: 0;
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
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: ${1.25 + "rem"};
  margin-left: ${1.25 + "rem"};
  margin-bottom: -2rem;
`;
const Tick = styled.div`
  position: relative;
  width: 1px;
  height: 5px;
  background: ${blackColor};
  margin-top: 2rem;
  margin-bottom: ${p => (p.length) + "ch"};
    div{
      width: 0;
      color: ${blackColor};
      transform-origin: top center;
      margin-top: 0.5rem;
      margin-left: ${p => p.labelRotation < 15 ? p.length / 2 * -1 + "ch" : "0.5rem"};
      transform: ${p => `rotate(${p.labelRotation}deg)`};
      white-space: nowrap;
    }
`;
