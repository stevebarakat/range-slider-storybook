import React from 'react';
import ReactDOM from 'react-dom';
import RangeSlider from './components/RangeSlider/RangeSlider';

ReactDOM.render(
  <React.StrictMode>
    <RangeSlider
      initialValue={50}
      min={0}
      max={100}
      decimals={0}
      step={10}
      showTicks={true}
      snap={true}
      customLabels={[
        { 0: "low" },
        { 50: "medium" },
        { 100: "high" }
      ]}
      showLabels={true}
      prefix=""
      suffix=""
      labelRotation={0}
      primaryColor="hsl(196, 100%, 50%)"
      primaryColorLight="hsl(196, 100%, 70%)"
      width={1200}
    />
    

  </React.StrictMode>,
  document.getElementById('root')
);
