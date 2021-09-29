import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useLocalStorage from '../hooks/use-localstorage';
import { useEffect } from 'react';

const peoples = ['Bill', 'Elon', 'Mark', 'Tim'];
const areas = ['Living Room', 'Kitchen', 'Backyard'];
const hourTimeline = [];
Array(24)
  .fill('')
  .map((a, index) => `${index}`.padStart(2, '0'))
  .map((h) => [`${h}:00`, `${h}:30`])
  .forEach((h) => {
    hourTimeline.push(...h);
  });

const initTimeline = {
  '': {
    '00:00': 'Kitchen',
  },
};

export const TimelineContext = createContext({});

export const TimelineContextProvider = ({ children }) => {
  const [storedValue, setStoredValue] = useLocalStorage('timeline', { ...initTimeline });
  const [timeline, setTimeline] = useState(storedValue, storedValue);

  const addTime = (people, area, from, to) => {
    const newTimeline = _.cloneDeep(timeline);
    if (!newTimeline[people]) {
      newTimeline[people] = {
        [from]: area,
      };
    }
    const timeIndex = [hourTimeline.indexOf(from), hourTimeline.indexOf(to)];
    const timeRange = [...hourTimeline].slice(timeIndex[0], timeIndex[1]);
    for (const time of timeRange) {
      newTimeline[people][time] = area;
    }
    setTimeline(newTimeline);
    setStoredValue(newTimeline)
  };

  const store = {
    peoples,
    areas,
    hours: hourTimeline,
    timeline,
    addTime,
  };

  return (
    <TimelineContext.Provider value={store}>
      {children}
    </TimelineContext.Provider>
  );
};

TimelineContextProvider.defaultProps = {
  children: PropTypes.node.isRequired,
};

const useTimelineContext = () => useContext(TimelineContext);

export { useTimelineContext };
export default TimelineContextProvider;
