import VerticalRangeSlider from './VerticalRangeSlider';
import defaultProps from '../../shared/defaultProps'

export default {
  component: VerticalRangeSlider,
  title: 'VerticalRangeSlider',
};

const Template = args => <VerticalRangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = defaultProps;