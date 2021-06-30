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
  initialValue: 50,
  min: 0,
  max: 100,
  decimals: 0,
  step: 10,
  ticks: true,
  tickLabels: [
    { 0: "low" },
    { 50: "medium" },
    { 100: "high"}
  ],
  tickLabel: true,
  prefix: "",
  suffix: "",
  labelRotate: 0,
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  width: 1200,
};
