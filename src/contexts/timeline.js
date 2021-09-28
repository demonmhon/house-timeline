import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

const peoples = ['Bill', 'Elon', 'Mark', 'Tim'];
const areas = ['Living Room', 'Kitchen', 'Backyard'];
const hourTimeline = [];
const hours = Array(24)
  .fill('')
  .map((a, index) => {
    return index.toString().padStart(2, '0');
  });
hours
  .map((h) => {
    return [`${h}:00`, `${h}:30`];
  })
  .forEach((h) => {
    hourTimeline.push(...h);
  });

const initTimeline = {
  '': {
    '00:00': 'Kitchen'
  },
};

export const TimelineContext = createContext({});

export const TimelineContextProvider = ({ children }) => {
  const [timeline, setTimeline] = useState(initTimeline);

  const addTime = (people, area, from, to) => {
    const newTimeline = _.cloneDeep(timeline)
    if (!newTimeline[people]) {
      newTimeline[people] = {
        [from]: area
      }
    }
    const timeIndex = [hourTimeline.indexOf(from), hourTimeline.indexOf(to)]
    const timeRange = [...hourTimeline].slice(timeIndex[0], timeIndex[1])
    for (const time of timeRange) {
      newTimeline[people][time] = area
    }
    setTimeline(newTimeline)
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
