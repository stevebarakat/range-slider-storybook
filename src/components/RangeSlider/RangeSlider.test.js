import React from 'react';
import ReactDOM from 'react-dom';

import { RangeSlider } from './RangeSlider';

/**
 * Description goes here...
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