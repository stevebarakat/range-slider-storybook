import VerticalRangeSlider from './VerticalRangeSlider';
import { defaultProps } from '../../shared/defaultProps';

export default {
  component: VerticalRangeSlider,
  title: 'VerticalRangeSlider',
  parameters: {
    componentSubtitle: "A vertical range input."
  }
};

const Template = args => <VerticalRangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = defaultProps;