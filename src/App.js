import RangeSlider from './components/RangeSlider';

let su;

function App() {
  return (
    <div>
      <RangeSlider
        min={0}
        max={100}
        decimals={0}
        step="1"
        ticks={true}
        label={false}
        labelRotate={14}
        primaryColor="hsl(196, 100%, 50%)"
        primaryColorLight="hsl(196, 100%, 70%)"
        width="800"
      />
    </div>
  );
}

export default App;
