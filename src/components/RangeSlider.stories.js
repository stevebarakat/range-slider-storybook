import RangeSlider from './RangeSlider';

export default {
  component: RangeSlider,
  title: 'RangeSlider',
};

const Template = args => <RangeSlider {...args} />;

export const Default = Template.bind({});
// Default.args = {
//   task: {
//     id: '1',
//     title: 'Test Task',
//     state: 'TASK_INBOX',
//     updatedAt: new Date(2021, 0, 1, 9, 0),
//   },
// };

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