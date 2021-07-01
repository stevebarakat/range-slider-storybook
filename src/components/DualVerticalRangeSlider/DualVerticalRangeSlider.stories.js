import DualVerticalRangeSlider from './DualVerticalRangeSlider';

export default {
  component: DualVerticalRangeSlider,
  title: 'DualVerticalRangeSlider',
  parameters: {
    componentSubtitle: "A dual range input."
  }
};

const Template = args => <DualVerticalRangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = {
  initialValue: 50,
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
  height: 600,
};
