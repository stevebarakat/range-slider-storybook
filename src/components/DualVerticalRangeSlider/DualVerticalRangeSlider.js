import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

let newValue1 = "";
let newValue2 = "";
let newPosition1 = "";
let newPosition2 = "";
let focusColor = "";
let blurColor = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export const DualVerticalRangeSlider = ({
  initialLowerValue,
  initialUpperValue,
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
  primaryColorLight,
  primaryColor,
  height,
}) => {
  const lowerRange = useRef(null);
  const upperRange = useRef(null);
  const outputEl = useRef(null);
  const tickEl = useRef(null);
  const [upperVal, setUpperVal] = useState(initialUpperValue);
  const [lowerVal, setLowerVal] = useState(initialLowerValue);
  const [upperFocused, setUpperFocused] = useState(true);
  const [lowerFocused, setLowerFocused] = useState(true);
  const [progressFocused, setProgressFocused] = useState(false);
  const [outputWidth, setOutputWidth] = useState("");
  const [maxLabelLength, setMaxLabelLength] = useState(0);
  newPosition1 = 10 - newValue1 * 0.2;
  newPosition2 = 10 - newValue2 * 0.2;

  focusColor = primaryColor;
  blurColor = primaryColorLight;

  useEffect(() => {
    let labelList = [];
    const tickList = tickEl?.current?.children;
    for (let i = 0; i < tickList?.length; i++) {
      labelList.push(tickList[i].firstChild?.innerText?.length);
    }
    setMaxLabelLength(Math.max(...labelList));
    setOutputWidth(outputEl.current.clientHeight);
  }, [min, max]);


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

  if (customLabels?.length !== 0) {
    if (step > 0) {
      for (let i = min; i <= max; i += parseInt(step, 10)) {
        let customTickText = null;
        let tickText = numberWithCommas(i.toFixed(decimals));
        customLabels.map(label => {
          if (parseInt(tickText, 10) === parseInt(Object.keys(label), 10)) {
            customTickText = Object.values(label);
          }
          return null;
        });

        markers.push(
          <Tick
            key={i}
            maxLabelLength={maxLabelLength}
            customTickText={customTickText}
            showLabels={showLabels}
          >
            {showLabels && <div>{customTickText}</div>}
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
            maxLabelLength={maxLabelLength}
            customTickText={tickText}
            showLabels={showLabels}
          >
            {showLabels && <div ref={tickEl}>{tickText}</div>}
          </Tick>
        );
      }
    }
  };

  const marks = markers.map(marker => marker);

  //If the upper value slider is LESS THAN the lower value slider.
  if (upperVal > lowerVal) {
    //Set lower slider value to equal the upper value slider.
    setLowerVal(parseFloat(upperVal));
    //If the lower value slider equals its set minimum.
    if (lowerVal === 0) {
      //Set the upper slider value to equal min.
      setUpperVal(min);
    }
  };
  //If the lower value slider is GREATER THAN the upper value slider minus one.
  if (lowerVal < upperVal - 1) {
    //Set the upper slider value equal to the lower value slider.
    setUpperVal(parseFloat(lowerVal));
    //If the upper value slider equals its set maximum.
    if (upperVal === max) {
      //Set the lower slider value to equal the upper max.
      setLowerVal(parseFloat(max));
    }
  };

  return (
    <RangeWrapWrap
      outputWidth={outputWidth}
      showTicks={showTicks}
      heightVal={height}
      maxLabelLength={maxLabelLength}
    >
      <RangeWrap
        outputWidth={outputWidth}
        showTicks={showTicks}
        heightVal={height}
        maxLabelLength={maxLabelLength}
      >
        <Progress
          style={{
            background: progressFocused ?
              `-webkit-linear-gradient(left,  
              ${whiteColor} ${`calc(${newValue2}% + ${newPosition2}px)`},
              ${focusColor} ${`calc(${newValue2}% + ${newPosition2}px)`},
              ${focusColor} ${`calc(${newValue1}% + ${newPosition1}px)`},
              ${whiteColor} ${`calc(${newValue1}% + ${newPosition1}px)`})`
              :
              `-webkit-linear-gradient(left,  
              ${whiteColor} ${`calc(${newValue2}% + ${newPosition2}px)`},
              ${blurColor} ${`calc(${newValue2}% + ${newPosition2}px)`},
              ${blurColor} ${`calc(${newValue1}% + ${newPosition1}px)`},
              ${whiteColor} ${`calc(${newValue1}% + ${newPosition1}px)`})`
          }}
        />

        {/* UPPER RANGE */}
        <RangeOutput
          ref={outputEl}
          focused={progressFocused}
          style={{ left: `calc(${newValue1}% + ${newPosition1 * 2}px)` }}>
          <span>{prefix + numberWithCommas(lowerVal.toFixed(decimals)) + " " + suffix}</span>
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="0"
          ref={upperRange}
          type="range"
          min={min}
          max={max}
          value={upperVal}
          step={snap ? parseInt(step, 10) : parseInt(0, 10)}
          focused={upperFocused}
          onFocus={() => {
            setUpperFocused(true);
            setProgressFocused(true);
          }}
          onBlur={() => setProgressFocused(false)}
          onInput={(e) => {
            setUpperVal(e.target.valueAsNumber);
          }}
        />

        {/* LOWER RANGE */}
        <RangeOutput
          focused={progressFocused}
          style={{ left: `calc(${newValue2}% + ${newPosition2 * 2}px)` }}>
          <span>{prefix + numberWithCommas(upperVal.toFixed(decimals)) + " " + suffix}</span>
        </RangeOutput>
        <StyledRangeSlider
          tabIndex="0"
          ref={lowerRange}
          type="range"
          min={min}
          max={max}
          value={lowerVal}
          step={snap ? parseInt(step, 10) : parseInt(0, 10)}
          focused={lowerFocused}
          onFocus={() => {
            setLowerFocused(true);
            setProgressFocused(true);
          }}
          onBlur={() => setProgressFocused(false)}
          onInput={(e) => {
            setLowerVal(e.target.valueAsNumber);
          }}
        />


        {showTicks && <Ticks ref={tickEl}>{marks}</Ticks>}
      </RangeWrap>
    </RangeWrapWrap>
  );
};

// PROPTYPES

DualVerticalRangeSlider.propTypes = {
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

DualVerticalRangeSlider.defaultProps = {
  initialLowerValue: 20,
  initialUpperValue: 80,
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
  { 100: "hgfddgdfdfgdfgh"}
  ],
  showLabels: true,
  prefix: "",
  suffix: "",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  rotateLabel: false,
  height: 500
}

// STYLES
const blackColor = "#999";
const whiteColor = "white";

const RangeWrapWrap = styled.div`
  width: ${p => p.showTicks ?
    p.maxLabelLength + p.outputWidth + 125 + "px" :
    p.maxLabelLength + 60 + "px"
  };
  border: 1px dotted red;
  padding-right: 200px;
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

const Progress = styled.div`
  z-index: 0;
  border-radius: 15px;
  width: 100%;
  display: block;
  height: 15px;
  position: absolute;
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
    margin: 20px 0 0 0;
  `;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  pointer-events: none;
  cursor: default;
  position: absolute;
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
    height: 3em;
    width: 3em;
    border: 1px solid ${blackColor};
    border-radius: 50%;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
    z-index: 50;
    background: ${p =>
    p.focused
      ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`
      : `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
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
    background: ${p =>
    p.focused
      ? `-moz-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`
      : `-moz-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
  }

  &:focus::-webkit-slider-thumb {
    cursor: grabbing;
    background: ${p =>
    !p.focused
      ? `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`
      : `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
  }

  &:focus::-moz-range-thumb {
    cursor: grabbing;
    background: ${p =>
    !p.focused
      ? `-moz-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`
      : `-moz-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
  }
`;

const Ticks = styled.div`
  cursor: default;
  display: flex;
  justify-content: space-between;
  margin-right: 1.2rem;
  margin-left: 1.2rem;
  color: ${blackColor};
`;

const Tick = styled.div`
  width: ${p => p.customTickText ? p.showLabels ? "1px" : "2px" : "0px"};
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  background: ${blackColor};
  height: 5px;
  div {
    writing-mode: vertical-rl;
    margin-left: 0.65em;
    margin-bottom: 0.5rem;
    white-space: nowrap;
  }
`;
