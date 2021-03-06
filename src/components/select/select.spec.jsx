import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Select from './select';

describe('<Select />', () => {
  it('should match snapshot', () => {
    const items = ['one', 'two'];
    const wrapper = shallow(
      <Select label={'Select Component'} items={items} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should rendered with options properly', () => {
    const items = ['one', 'two'];
    const wrapper = shallow(
      <Select label={'Select Component'} items={items} />
    );
    expect(wrapper.find('option').length).toBe(items.length + 1);
  });
});
