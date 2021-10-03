import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { hourTimeline } from '../../contexts/timeline';
import { TimelineTable } from './timeline-table';

describe('<TimelineTable />', () => {
  it('should match snapshot', () => {
    const props = {
      hours: hourTimeline,
      peoples: ['John', 'Dan'],
      areas: ['Bed Room', 'Toilet'],
      timeline: {
        John: {
          '06:00': 'Bed Room',
          '06:30': 'Bed Room',
        },
      },
    };
    const wrapper = shallow(<TimelineTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
