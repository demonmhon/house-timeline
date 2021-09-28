import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

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
  '0000': {
    occupiedRoom: {
      livingRoom: [''],
      kitchen: [''],
      backyard: [''],
    },
  },
  '0030': {
    occupiedRoom: {
      livingRoom: [''],
      kitchen: [''],
      backyard: [''],
    },
  },
};

export const TimelineContext = createContext({});

export const TimelineContextProvider = ({ children }) => {
  const [timeline, setTimeline] = useState(initTimeline);

  const addTime = (people, from, to) => {
    console.log('add time', people, from, to);
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
