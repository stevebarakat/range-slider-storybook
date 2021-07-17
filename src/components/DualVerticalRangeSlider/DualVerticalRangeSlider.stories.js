import { DualVerticalRangeSlider } from './DualVerticalRangeSlider';
import { defaultProps } from '../../shared/defaultProps';

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
  initialLowerValue: 20,
  initialUpperValue: 80,
  ...defaultProps,
  height: 600,
};
