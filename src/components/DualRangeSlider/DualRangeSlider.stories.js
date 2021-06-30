import DualRangeSlider from './DualRangeSlider';

export default {
  component: DualRangeSlider,
  title: 'DualRangeSlider',
  parameters: {
    componentSubtitle: "A dual range input."
  }
};

const Template = args => <DualRangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = {
  min: 1,
  max: 11,
  decimals: 0,
  step: 1,
  ticks: true,
  tickLabels: [
    { 52: "fifty-two" },
    { 60: "sixty" }
  ], 
  tickLabel: false,
  prefix: "$",
  suffix: "lbs",
  labelRotate: "35",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  width: 1200,
};
