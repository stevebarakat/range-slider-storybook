import ClampSlider from './ClampSlider';
import { defaultProps } from '../../shared/defaultProps'

export default {
  component: ClampSlider,
  title: 'ClampSlider',
  parameters: {
    componentSubtitle: "A dual range input."
  }
};

const Template = args => <ClampSlider {...args} />;

export const Default = Template.bind({});

Default.args =  {
  initialLowerValue: 20,
  initialUpperValue: 80,
  ...defaultProps,
  labelRotation: 0,
  width: 1200,
};
