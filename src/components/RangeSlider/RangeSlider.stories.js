import RangeSlider from './RangeSlider';
import { defaultProps } from '../../shared/defaultProps';

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
  ...defaultProps,
  width: 1200,
};
