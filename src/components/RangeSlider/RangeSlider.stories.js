import RangeSlider from './RangeSlider';

export default {
  component: RangeSlider,
  title: 'RangeSlider',
};

const Template = args => <RangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = {
  min: 1,
  max: 11,
  decimals: 0,
  step: "space-evenly",
  ticks: true,
  label: false,
  labelRotate: "35",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  width: 1200,
};
