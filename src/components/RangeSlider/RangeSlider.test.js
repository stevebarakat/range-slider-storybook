import React from 'react';
import ReactDOM from 'react-dom';

import { RangeSlider } from './RangeSlider';

/**
 * A straightforward link wrapper that renders an <a> with the passed props.
 * What we are testing here is that the RangeSlider component passes the right props to the wrapper and itself.
 */

it('has a href attribute when rendering with linkWrapper', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RangeSlider href="https://storybook.js.org/tutorials/" LinkWrapper={LinkWrapper}>
      RangeSlider Text
    </RangeSlider>,
    div
  );

  expect(div.querySelector('a[href="https://storybook.js.org/tutorials/"]')).not.toBeNull();
  expect(div.textContent).toEqual('RangeSlider Text');

  ReactDOM.unmountComponentAtNode(div);
});