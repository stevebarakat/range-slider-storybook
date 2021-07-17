import RangeSlider from './components/RangeSlider/RangeSlider';
import DualRangeSlider from './components/DualRangeSlider/DualRangeSlider';
import VerticalRangeSlider from './components/VerticalRangeSlider/VerticalRangeSlider';
import DualVerticalRangeSlider from './components/DualVerticalRangeSlider/DualVerticalRangeSlider';
import Container from './components/Container/Container';

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "30px" }}>
        <Container>
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
              { 100: "hfghh" }
            ]}
            showLabels={true}
            prefix=""
            suffix=""
            rotateLabel={true}
            primaryColor="hsl(196, 100%, 50%)"
            primaryColorLight="hsl(196, 100%, 70%)"
            width={1200}
          />
        </Container>
        <Container>
          <DualRangeSlider
            min={0}
            max={100}
            decimals={0}
            step={10}
            showTicks={true}
            customLabels={[
              { 0: "low" },
              { 50: "mediuasdadadadadadm" },
              { 100: "high" }
            ]}
            showLabels={true}
            prefix=""
            suffix=""
            rotateLabel={false}
            primaryColor="hsl(196, 100%, 50%)"
            primaryColorLight="hsl(196, 100%, 70%)"
            width={1200}
            initialLowerValue={20}
            initialUpperValue={40}
          />
        </Container>
        {/* <Container>
          <ClampSlider
            min={0}
            max={100}
            decimals={0}
            step={10}
            showTicks={true}
            customLabels={[
              { 0: "low" },
              { 50: "medium" },
              { 100: "high" }
            ]}
            showLabels={true}
            prefix=""
            suffix=""
            rotateLabel={false}
            primaryColor="hsl(196, 100%, 50%)"
            primaryColorLight="hsl(196, 100%, 70%)"
            width={1200}
          />
        </Container> */}
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        width: "100%"
      }}>
        <Container>
          <VerticalRangeSlider
            initialValue={50}
            min={0}
            max={100}
            decimals={0}
            step={10}
            showTicks={true}
            snap={true}
            customLabels={[
              { 0: "low" },
              { 50: "mdgdfgdgdfgdfgdfgdfgdfgedium" },
              { 100: "high" }
            ]}
            showLabels={true}
            prefix=""
            suffix=""
            primaryColor="hsl(196, 100%, 50%)"
            primaryColorLight="hsl(196, 100%, 70%)"
            height={800}
          />
        </Container>
        <Container>
          <DualVerticalRangeSlider
            initialLowerValue={20}
            initialUpperValue={80}
            min={0}
            max={100}
            decimals={0}
            step={10}
            showTicks={true}
            snap={true}
            customLabels={[
              { 0: "low" },
              { 50: "dasdadadadadaddasdasdadadaasdada" },
              { 100: "high" }
            ]}
            showLabels={true}
            prefix=""
            suffix=""
            primaryColor="hsl(196, 100%, 50%)"
            primaryColorLight="hsl(196, 100%, 70%)"
            height={800}
          />
        </Container>
      </div>
    </div>
  );
}

export default App;
