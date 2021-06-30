import RangeSlider from './RangeSlider';

export default {
  component: RangeSlider,
  title: 'RangeSlider',
  parameters: {
    componentSubtitle: "A range input."
  }
};

const Template = args => <RangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = {
  min: 0,
  max: 100,
  decimals: 0,
  step: 2,
  ticks: true,
  tickLabels: [
    { 52: "fifty-two" },
    { 60: "sixty" }
  ],
  tickLabel: true,
  prefix: "",
  suffix: "",
  labelRotate: "35",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  width: 1200,
};
