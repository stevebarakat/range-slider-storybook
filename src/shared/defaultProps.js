const defaultProps = {
  // initialValue: 50,
  // initialLowerValue: 20,
  // initialUpperValue: 80,
  // width: 1200,
  // height: 600,
  min: 0,
  max: 100,
  decimals: 0,
  step: 10,
  showTicks: true,
  snap: true,
  customLabels: [
    { 0: "low" },
    { 50: "medium" },
    { 100: "high"}
  ],
  showLabel: true,
  prefix: "",
  suffix: "",
  labelRotation: 0,
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
};

export default defaultProps;