import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useLocalStorage from '../hooks/use-localstorage';

const peoples = ['Bill', 'Elon', 'Mark', 'Tim'];
const areas = ['Living Room', 'Kitchen', 'Backyard'];

export const generateHours = () => {
  const result = [];
  Array(24)
    .fill('')
    .map((a, index) => `${index}`.padStart(2, '0'))
    .map((h) => [`${h}:00`, `${h}:30`])
    .forEach((h) => {
      result.push(...h);
    });
  return result;
};

export const TimelineContext = createContext({});

export const TimelineContextProvider = ({ children }) => {
  const [storedValue, setStoredValue] = useLocalStorage('timeline', {});
  const [timeline, setTimeline] = useState(storedValue, storedValue);
  const hourTimeline = generateHours();

  useEffect(() => {
    setStoredValue(timeline);
  }, [timeline]);

  const addTime = (people, area, from, to) => {
    const newTimeline = _.cloneDeep(timeline);
    if (!people) return;
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
