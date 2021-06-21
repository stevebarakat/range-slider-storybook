import VerticalRangeSlider from './VerticalRangeSlider';

export default {
  component: VerticalRangeSlider,
  title: 'VerticalRangeSlider',
};

const Template = args => <VerticalRangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = {
  min: 1,
  max: 11,
  decimals: 0,
  step: 1,
  ticks: true,
  label: false,
  labelRotate: "35",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  width: "1500px",
}