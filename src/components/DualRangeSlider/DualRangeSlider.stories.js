import DualRangeSlider from './DualRangeSlider';
import defaultProps from '../../shared/defaultProps'

export default {
  component: DualRangeSlider,
  title: 'DualRangeSlider',
  parameters: {
    componentSubtitle: "A dual range input."
  }
};

const Template = args => <DualRangeSlider {...args} />;

export const Default = Template.bind({});

Default.args = defaultProps;
