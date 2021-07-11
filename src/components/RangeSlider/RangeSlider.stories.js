import { render, screen } from '@testing-library/react';
import { composeStory } from '@storybook/testing-react';
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
  rotateLabel: true,
  width: 1200,
};
