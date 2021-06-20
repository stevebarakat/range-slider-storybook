import RangeSlider from './components/RangeSlider';

let su;

function App() {
  return (
    <div>
      <RangeSlider
        min={0}
        max={100}
        decimals={0}
        step={1}
        width="800"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
        labelRotate={14}
      />
    </div>
  );
}

export default App;
