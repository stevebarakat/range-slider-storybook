import RangeSlider from './components/RangeSlider/RangeSlider';
import DualRangeSlider from './components/DualRangeSlider/DualRangeSlider';
import VerticalRangeSlider from './components/VerticalRangeSlider/VerticalRangeSlider';
import './shared/app.css';

function App() {
  return (
    <div>
      {/* <RangeSlider
        min={0}
        max={100}
        decimals={0}
        step="10"
        ticks={true}
        tickLabel={true}
        labelRotate={14}
        primaryColor="hsl(196, 100%, 50%)"
        primaryColorLight="hsl(196, 100%, 70%)"
        width={1200}
      /> */}
      <DualRangeSlider
        min={0}
        max={100}
        decimals={0}
        step={10}
        ticks={true}
        tickLabel={true}
        labelRotate={14}
        primaryColor="hsl(196, 100%, 50%)"
        primaryColorLight="hsl(196, 100%, 70%)"
        width={1200}
      />
      {/* <VerticalRangeSlider
        min={0}
        max={10000}
        decimals={0}
        step="1"
        ticks={true}
        tickLabel={true}
        labelRotate={14}
        primaryColor="hsl(196, 100%, 50%)"
        primaryColorLight="hsl(196, 100%, 70%)"
        height="800"
      /> */}
    </div>
  );
}

export default App;
