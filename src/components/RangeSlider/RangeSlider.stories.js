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
  min: 1,
  max: 11,
  decimals: 0,
  step: "space-evenly",
  ticks: true,
  tickLabel: false,
  prefix: "",
  suffix: "",
  labelRotate: "35",
  primaryColor: "hsl(196, 100%, 48%)",
  primaryColorLight: "hsl(196, 100%, 70%)",
  width: 1200,
};
